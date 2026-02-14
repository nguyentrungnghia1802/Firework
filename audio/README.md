# Hướng dẫn thêm nhạc nền

Để thêm nhạc nền cho trang web:

1. Tải file MP3 nhạc Tết của bạn
2. Đổi tên thành `background-music.mp3`
3. Copy vào thư mục này (`audio/`)
4. Mở file `js/tet-features.js`
5. Tìm dòng ~30 và sửa:

```javascript
backgroundMusic = new Audio('audio/background-music.mp3');
```

## Gợi ý nhạc Tết:
- Nhạc xuân truyền thống
- Nhạc Tết không lời
- Thời lượng: 2-5 phút
- Format: MP3
- Bitrate: 128-320 kbps

Hiện tại đang dùng nhạc demo từ SoundHelix.
