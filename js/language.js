// ==========================================================
// TÍNH NĂNG CHỌN NGÔN NGỮ VÀ GHI NHỚ (Local Storage)
// ==========================================================

const DEFAULT_LANG = 'vi';
const langSwitcher = document.getElementById('language-switcher');
const currentPath = window.location.pathname; 

/**
 * Tải tệp JSON ngôn ngữ và áp dụng bản dịch cho trang hiện tại.
 */
async function loadLanguage(lang) {
    // ... [Phần code fetch JSON và áp dụng innerHTML vẫn giữ nguyên] ...
    try {
        const response = await fetch(`./lang/${lang}.json`);
        if (!response.ok) {
            throw new Error(`Không thể tải tệp ${lang}.json`);
        }
        const translations = await response.json();

        // 1. Áp dụng bản dịch cho các phần tử [data-i18n] (Sử dụng innerHTML)
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[key]) {
                
                // SỬ DỤNG innerHTML để bảo toàn thẻ HTML (<b>, <a>)
                if (element.tagName === 'P' || element.tagName === 'H2' || element.tagName === 'A' || element.tagName === 'DIV' || element.tagName === 'SPAN') {
                     element.innerHTML = translations[key]; 
                }
                
                // Cập nhật thuộc tính 'content' cho thẻ META
                if (element.tagName === 'META') {
                    element.setAttribute('content', translations[key]);
                }
            }
        });
        
        // 2. Cập nhật title và thuộc tính lang
        document.documentElement.lang = lang;
        if (translations['page_title']) {
            document.title = translations['page_title'];
        }

        // 3. Cập nhật liên kết menu để giữ ngôn ngữ đã chọn khi chuyển trang
        document.querySelectorAll('.menu-link').forEach(link => {
            const originalHref = link.getAttribute('data-original-href');
            // Gắn parameter ngôn ngữ vào URL (ví dụ: /games.html?lang=en)
            link.href = `${originalHref}?lang=${lang}`; 
        });

    } catch (error) {
        console.error(`Lỗi hệ thống đa ngôn ngữ:`, error);
    }
}

/**
 * Hàm khởi tạo: Kiểm tra ngôn ngữ đã lưu và tải nó.
 */
function initializeLanguage() {
    // 1. Ưu tiên ngôn ngữ từ URL parameter (?lang=en)
    const urlParams = new URLSearchParams(window.location.search);
    let currentLang = urlParams.get('lang');

    // 2. Nếu không có trong URL, lấy từ Local Storage (Đây là bước ghi nhớ)
    if (!currentLang) {
        currentLang = localStorage.getItem('lang');
    }

    // 3. Nếu không có đâu cả, dùng ngôn ngữ mặc định
    if (!currentLang) {
        currentLang = DEFAULT_LANG;
    }

    // 4. Thiết lập giá trị cho dropdown switcher
    if (langSwitcher) {
         langSwitcher.value = currentLang;
    }
    
    // 5. Tải ngôn ngữ
    loadLanguage(currentLang);
}


// Lắng nghe sự kiện chuyển đổi ngôn ngữ
if (langSwitcher) {
    langSwitcher.addEventListener('change', (event) => {
        const newLang = event.target.value;
        // Lưu ngôn ngữ mới vào Local Storage (Đây là bước ghi nhớ)
        localStorage.setItem('lang', newLang);
        // Tải và hiển thị ngôn ngữ mới
        loadLanguage(newLang);

        // Chuyển hướng người dùng về trang hiện tại với parameter ngôn ngữ mới
        // Điều này buộc trang phải tải lại với URL mới, giúp menu links hoạt động
        window.location.href = `${currentPath}?lang=${newLang}`; 
    });
}


// Chạy hàm khởi tạo khi trang được tải
document.addEventListener('DOMContentLoaded', initializeLanguage);