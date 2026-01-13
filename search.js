function searchFunction() {
    // 1. Lấy giá trị nhập vào và chuyển thành chữ thường
    let input = document.getElementById('myInput');
    let filter = input.value.toLowerCase();
    
    // 2. Lấy tất cả các khối có class là 'product-item'
    let products = document.getElementsByClassName('product-item');

    // 3. Vòng lặp kiểm tra từng sản phẩm
    for (let i = 0; i < products.length; i++) {
        // Lấy toàn bộ chữ bên trong khối sản phẩm đó
        let content = products[i].textContent || products[i].innerText;

        if (content.toLowerCase().indexOf(filter) > -1) {
            // Nếu tìm thấy chữ khớp, hiển thị khối đó
            products[i].style.display = "";
        } else {
            // Nếu không thấy, ẩn khối đó đi
            products[i].style.display = "none";
        }
    }
}
