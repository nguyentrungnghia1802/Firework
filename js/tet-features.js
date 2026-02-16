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
      "Lại một năm mới đến rồi,",
      "năm nay tôi và bạn cùng ngắm pháo hoa nhé!",
      "vẫn giữ liên lạc thường xuyên nhé!",
      "chúc bạn thật nhiều sức khoẻ",
      "chúc bạn thật nhiều niềm vui",
      "chúc bạn sẽ có thật nhiều kỉ niệm đẹp",
      "chúc bạn tất cả ᰔᩚ",
    ];

    let greetingInterval = null;
    let backgroundMusic = null;
    let musicPlaying = false;
    let fireworksStartTime = null;
    let currentGreetingIndex = 0; // Theo dõi câu chúc hiện tại
    let hasShownLixiMessage = false; // Đã hiển thị câu lì xì chưa
    const FIREWORKS_DURATION = 106000; // 1 phút 46 giây (106000ms)

    // Config ảnh nền động - Hiển thị lần lượt từ 1 đến 12
    const backgroundImages = [];
    const imageExtensions = ['jpg', 'webp', 'png', 'avif', 'jpeg', 'gif']; // Sắp xếp theo độ phổ biến
    let imagesLoaded = false;

    // Hàm kiểm tra file có tồn tại không
    async function checkImageExists(url) {
        return new Promise((resolve) => {
            const img = new Image();
            
            const cleanup = () => {
                img.onload = null;
                img.onerror = null;
            };
            
            img.onload = () => {
                cleanup();
                resolve(true);
            };
            
            img.onerror = () => {
                cleanup();
                resolve(false);
            };
            
            // Timeout sau 2 giây
            setTimeout(() => {
                cleanup();
                resolve(false);
            }, 2000);
            
            img.src = url;
        });
    }

    // Tự động load danh sách ảnh từ 1 đến hết (tối đa 12 ảnh)
    async function loadBackgroundImages() {
        backgroundImages.length = 0; // Clear array
        let imageIndex = 1;
        const maxImages = 12; // Giới hạn 12 ảnh
        
        console.log('🔍 Tự động tìm ảnh nền (tối đa 12 ảnh)...');
        console.log('ℹ️ Các 404 error dưới đây là bình thường trong quá trình tìm kiếm...');
        
        while (imageIndex <= maxImages) {
            let foundImage = false;
            
            // Thử từng đuôi file cho số hiện tại
            for (const ext of imageExtensions) {
                const imagePath = `./images/background/firework/${imageIndex}.${ext}`;
                
                if (await checkImageExists(imagePath)) {
                    backgroundImages.push(imagePath);
                    console.log(`✅ Tìm thấy: ${imagePath}`);
                    foundImage = true;
                    break; // Tìm thấy rồi thì dừng thử các extension khác
                }
            }
            
            if (!foundImage) {
                console.log(`⚠️ Không tìm thấy ảnh số ${imageIndex}, dừng tìm kiếm`);
                break; // Không tìm thấy file nào với số này, dừng tìm kiếm
            }
            
            imageIndex++;
        }
        
        console.log(`🎨 Loaded ${backgroundImages.length} ảnh nền:`, backgroundImages);
        imagesLoaded = true;
        return backgroundImages.length > 0;
    }
    
    let currentImageIndex = 0;
    let imageChangeInterval = null;

    // Khởi tạo nhạc nền
    function initBackgroundMusic() {
        backgroundMusic = new Audio('./audio/Tet-music-1.mp3');
        backgroundMusic.volume = 0.3;
        backgroundMusic.loop = true; // Lặp lại liên tục
        
        // Event listeners cho debug
        backgroundMusic.addEventListener('loadstart', () => console.log('🎵 Bắt đầu tải nhạc nền'));
        backgroundMusic.addEventListener('canplay', () => console.log('🎵 Nhạc nền sẵn sàng phát'));
        backgroundMusic.addEventListener('play', () => console.log('🎵 Nhạc nền đang phát'));
        backgroundMusic.addEventListener('error', (e) => console.error('❌ Lỗi nhạc nền:', e));
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

    // Hiển thị lời chúc theo thứ tự
    function showSequentialGreeting() {
        const greetingText = document.getElementById('greetingText');
        if (!greetingText) return;

        if (currentGreetingIndex < greetings.length) {
            // Hiển thị các câu chúc bình thường
            const greeting = greetings[currentGreetingIndex];
            greetingText.textContent = greeting;
            greetingText.classList.add('show');

            setTimeout(() => {
                greetingText.classList.remove('show');
            }, 3000); // Hiển thị 3 giây

            currentGreetingIndex++;

            // Nếu vừa hết danh sách chính, dừng interval và đặt timeout cho câu lì xì
            if (currentGreetingIndex >= greetings.length) {
                console.log('🎊 Đã hết 7 câu chúc, sẽ hiển thị câu lì xì sau 6 giây...');
                if (greetingInterval) {
                    clearInterval(greetingInterval);
                    greetingInterval = null;
                }
                
                // Sau 6 giây hiển thị câu lì xì
                setTimeout(() => {
                    if (!hasShownLixiMessage) {
                        console.log('🧧 Hiển thị câu lì xì!');
                        greetingText.textContent = "Nhớ nhận lì xì sau khi xem pháo hoa xong nhé!";
                        greetingText.classList.add('show');
                        hasShownLixiMessage = true;
                        
                        setTimeout(() => {
                            greetingText.classList.remove('show');
                        }, 4000); // Hiển thị lâu hơn một chút
                    }
                }, 6000);
            }
        }
    }

    // Bắt đầu hiển thị lời chúc theo thứ tự
    function startGreetings() {
        // Reset index và flag
        currentGreetingIndex = 0;
        hasShownLixiMessage = false;
        
        // Hiển thị lời chúc đầu tiên ngay lập tức
        showSequentialGreeting();

        // Sau đó hiển thị mỗi 4 giây cho đến hết danh sách
        greetingInterval = setInterval(showSequentialGreeting, 4000);
    }

    // Dừng hiển thị lời chúc
    function stopGreetings() {
        if (greetingInterval) {
            clearInterval(greetingInterval);
            greetingInterval = null;
        }
    }

    // Thay đổi ảnh nền theo thứ tự
    function changeBackgroundImage() {
        const backgroundDiv = document.querySelector('.background-image');
        if (!backgroundDiv || !imagesLoaded || backgroundImages.length === 0) return;

        const selectedImageUrl = backgroundImages[currentImageIndex];
        
        console.log(`🖼️ Hiển thị ảnh ${currentImageIndex + 1}/${backgroundImages.length}: ${selectedImageUrl}`);
        
        // Đổi ảnh nền (luôn căn giữa)
        backgroundDiv.style.backgroundImage = `url('${selectedImageUrl}')`;

        // Chuyển sang ảnh tiếp theo
        currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
    }

    // Bắt đầu chu trình thay đổi ảnh nền theo thứ tự
    async function startBackgroundImageCycle() {
        // Load danh sách ảnh trước
        const hasImages = await loadBackgroundImages();
        
        if (!hasImages) {
            console.warn('⚠️ Không tìm thấy ảnh nền nào!');
            return;
        }
        
        // Tính thời gian hiển thị: 106 giây / số ảnh
        const displayTime = Math.floor(106000 / backgroundImages.length); // ms mỗi ảnh
        console.log(`⏱️ Mỗi ảnh hiển thị ${displayTime}ms (${displayTime/1000}s)`);
        
        // Reset về ảnh đầu tiên
        currentImageIndex = 0;
        
        // Đổi ảnh ngay lập tức lần đầu
        changeBackgroundImage();
        
        // Sau đó đổi theo chu kỳ cố định
        imageChangeInterval = setInterval(() => {
            changeBackgroundImage();
        }, displayTime);
    }

    // Dừng chu trình thay đổi ảnh nền
    function stopBackgroundImageCycle() {
        if (imageChangeInterval) {
            clearInterval(imageChangeInterval);
            imageChangeInterval = null;
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
            
            // Bắt đầu pháo hoa (QUAN TRỌNG!)
            if (typeof togglePause === 'function') {
                togglePause(false);
            }
            
            // Khởi động nhạc nền với volume fade-in
            if (!backgroundMusic) {
                initBackgroundMusic();
            }
            
            // Phát nhạc với fade-in để bypass autoplay restrictions
            backgroundMusic.volume = 0.01;
            backgroundMusic.play().then(() => {
                console.log('✅ Nhạc nền bắt đầu phát');
                // Tăng dần volume
                let volume = 0.01;
                const fadeIn = setInterval(() => {
                    volume += 0.02;
                    if (volume >= 0.3) {
                        volume = 0.3;
                        clearInterval(fadeIn);
                    }
                    backgroundMusic.volume = volume;
                }, 50);
                musicPlaying = true;
            }).catch(e => {
                console.log('❌ Không thể phát nhạc (autoplay blocked):', e);
                // Thử lại sau khi user đã tương tác
                setTimeout(() => {
                    backgroundMusic.play().then(() => {
                        backgroundMusic.volume = 0.3;
                        musicPlaying = true;
                    }).catch(e2 => console.error('❌ Vẫn lỗi:', e2));
                }, 500);
            });

            // Bắt đầu hiển thị lời chúc sau 2 giây
            setTimeout(() => {
                startGreetings();
            }, 2000);

            // Bắt đầu chu trình thay đổi ảnh nền (async)
            startBackgroundImageCycle();

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
