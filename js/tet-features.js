/*
Copyright © 2026 [Tên của bạn]. All rights reserved.
Bạn có thể sử dụng, chỉnh sửa, chia sẻ mã nguồn này cho mục đích cá nhân hoặc học tập.
Không được sử dụng cho mục đích thương mại khi chưa có sự đồng ý của tác giả.
*/

// Trang chào mừng và các tính năng Tết
(function() {
    'use strict';

    // Danh sách lời chúc Tết
    const greetings = [
        "Chúc Mừng Năm Mới 2026",
        "An Khang Thịnh Vượng",
        "Vạn Sự Như Ý",
        "Sức Khỏe Dồi Dào",
        "Tài Lộc Dồi Dào",
        "Phúc Lộc Thọ",
        "Hạnh Phúc Viên Mãn",
        "Tiền Vào Như Nước",
        "Công Danh Thăng Tiến",
        "Gia Đình Hạnh Phúc",
        "Học Tập Tiến Bộ",
        "Công Việc Thuận Lợi",
        "Tiền Tài Dồi Dào",
        "May Mắn Quanh Năm",
        "Luôn Bình An",
        "Gặp Nhiều Điều May",
        "Cát Tường Như Ý",
        "Vui Vẻ Mỗi Ngày",
        "Tình Duyên Viên Mãn",
        "Sống Lâu Trăm Tuổi"
    ];

    let greetingInterval = null;
    let backgroundMusic = null;
    let musicPlaying = false;
    let fireworksStartTime = null;
    const FIREWORKS_DURATION = 120000; // 2 phút (120000ms)

    // Khởi tạo nhạc nền
    function initBackgroundMusic() {
        backgroundMusic = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
        backgroundMusic.volume = 0.3;
        backgroundMusic.loop = false; // Chỉ chạy 1 lần
    }

    // Bật/tắt nhạc nền
    function toggleBackgroundMusic() {
        const musicBtn = document.getElementById('musicBtn');
        if (!backgroundMusic) {
            initBackgroundMusic();
        }

        if (musicPlaying) {
            backgroundMusic.pause();
            musicPlaying = false;
            musicBtn.querySelector('use').setAttribute('href', '#icon-sound-off');
            musicBtn.querySelector('use').setAttribute('xlink:href', '#icon-sound-off');
        } else {
            backgroundMusic.play().catch(e => console.log('Không thể phát nhạc:', e));
            musicPlaying = true;
            musicBtn.querySelector('use').setAttribute('href', '#icon-sound-on');
            musicBtn.querySelector('use').setAttribute('xlink:href', '#icon-sound-on');
        }
    }

    // Hiển thị lời chúc ngẫu nhiên
    function showRandomGreeting() {
        const greetingText = document.getElementById('greetingText');
        if (!greetingText) return;

        const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        greetingText.textContent = randomGreeting;
        greetingText.classList.add('show');

        setTimeout(() => {
            greetingText.classList.remove('show');
        }, 3000); // Hiển thị 3 giây
    }

    // Bắt đầu hiển thị lời chúc
    function startGreetings() {
        // Hiển thị lời chúc đầu tiên ngay lập tức
        showRandomGreeting();

        // Sau đó hiển thị mỗi 4 giây
        greetingInterval = setInterval(showRandomGreeting, 4000);
    }

    // Dừng hiển thị lời chúc
    function stopGreetings() {
        if (greetingInterval) {
            clearInterval(greetingInterval);
            greetingInterval = null;
        }
    }

    // Kiểm tra thời gian pháo hoa
    function checkFireworksTime() {
        if (!fireworksStartTime) return;

        const elapsed = Date.now() - fireworksStartTime;
        if (elapsed >= FIREWORKS_DURATION) {
            // Chuyển sang trang celebration
            window.location.href = 'celebration.html';
        }
    }

    // Khởi động pháo hoa
    function startFireworks() {
        const welcomeScreen = document.getElementById('welcomeScreen');
        welcomeScreen.classList.add('fade-out');

        setTimeout(() => {
            welcomeScreen.style.display = 'none';
            
            // Khởi động nhạc nền
            if (!backgroundMusic) {
                initBackgroundMusic();
            }
            backgroundMusic.play().catch(e => console.log('Không thể phát nhạc:', e));
            musicPlaying = true;

            // Bắt đầu hiển thị lời chúc
            startGreetings();

            // Bắt đầu đếm thời gian
            fireworksStartTime = Date.now();
            setInterval(checkFireworksTime, 1000); // Kiểm tra mỗi giây

        }, 1000);
    }

    // Khởi tạo khi DOM đã sẵn sàng
    document.addEventListener('DOMContentLoaded', function() {
        // Xử lý nút bắt đầu
        const startBtn = document.getElementById('startBtn');
        if (startBtn) {
            startBtn.addEventListener('click', startFireworks);
        }

        // Xử lý nút nhạc nền
        const musicBtn = document.getElementById('musicBtn');
        if (musicBtn) {
            musicBtn.addEventListener('click', toggleBackgroundMusic);
        }
    });

})();
