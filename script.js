const API_URL = "https://script.google.com/macros/s/AKfycbwd79CuVIMIFw95kY5LjP0qsmlj7Ua5sChmMwqCO3RjGYYuVeJo3hLjzVekOn3SUiHTSw/exec?action=read_all";
document.getElementById('btnFetch').addEventListener('click', function() {
    const btn = this;
    const loading = document.getElementById('loading');
    const container = document.getElementById('card-container');

    btn.disabled = true;
    loading.style.display = "block";
    container.innerHTML = ""; // Xóa các card cũ (nếu có)

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            // Kiểm tra nếu data là mảng, nếu không hãy ép về mảng để lặp
            const items = Array.isArray(data) ? data : [data];

            items.forEach(item => {
                // Tạo mã HTML cho từng card
                // Lưu ý: Thay đổi item.Name, item.Value... cho đúng với tên cột trong Google Sheet của bạn
                const cardHTML = `
                    <div class="card-item">
                        <span class="status-badge">ID: ${item.id || 'N/A'}</span>
                        <h3>${item.title || item.Name || 'Không có tiêu đề'}</h3>
                        <p><strong>Thông tin:</strong> ${item.description || item.Content || '...'}</p>
                        <p style="color: #888; font-size: 12px;">Cập nhật: ${new Date().toLocaleDateString()}</p>
                    </div>
                `;
                container.innerHTML += cardHTML;
            });
        })
        .catch(error => {
            container.innerHTML = `<p style="color:red">Lỗi: ${error.message}</p>`;
        })
        .finally(() => {
            loading.style.display = "none";
            btn.disabled = false;
        });
});