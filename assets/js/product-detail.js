lucide.createIcons();

function updateQty(change) {
    const input = document.getElementById('qty-input');
    let val = parseInt(input.value);
    val += change;
    if (val < 1) val = 1;
    input.value = val;
}

function selectSize(element) {
    const options = document.querySelectorAll('.size-option');
    options.forEach(opt => opt.classList.remove('active'));
    element.classList.add('active');
}

function selectThumbnail(element) {
    const thumbs = document.querySelectorAll('.thumbnail');
    thumbs.forEach(t => t.classList.remove('active'));
    element.classList.add('active');
}

function switchTab(tabId, element) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(t => t.classList.remove('active'));
    element.classList.add('active');

    const content = document.getElementById('tab-content');
    if (tabId === 'description') {
        content.innerHTML = 'Cà phê kem là sự kết hợp hoàn hảo giữa vị đắng nhẹ của cà phê và vị béo ngọt của kem tươi, mang đến trải nghiệm thưởng thức cân bằng và đầy cuốn hút. Thích hợp để bắt đầu ngày mới hoặc thư giãn vào buổi chiều.';
    } else if (tabId === 'ingredients') {
        content.innerHTML = 'Cà phê nguyên chất, kem tươi cao cấp, sữa đặc, đá viên, và một chút syrup vanilla.';
    } else if (tabId === 'guide') {
        content.innerHTML = 'Khuấy đều kem và cà phê trước khi uống để cảm nhận hương vị hòa quyện. Ngon nhất khi dùng lạnh.';
    }
}
//------------------------------------------------------------------------------
