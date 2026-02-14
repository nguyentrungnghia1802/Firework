# Hướng dẫn thêm ảnh nền

Để thêm ảnh nền cho trang pháo hoa:

1. Chọn ảnh phù hợp (gợi ý: 2 đứa trẻ chỉ tay lên trời nhìn pháo hoa)
2. Đổi tên thành `background.jpg` hoặc `background.png`
3. Copy vào thư mục này (`images/`)
4. Mở file `css/style.css`
5. Tìm class `.background-image` (dòng ~490) và sửa:

```css
.background-image {
    background-image: url('../images/background.jpg');
}
```

## Gợi ý ảnh:
- Kích thước: 1920x1080px (Full HD)
- Format: JPG hoặc PNG
- Chủ đề: Trẻ em nhìn pháo hoa, gia đình đón Tết, không gian lễ hội
- Lưu ý: Sẽ hiển thị với độ trong suốt (opacity) 0.15

Hiện tại đang dùng ảnh demo từ Unsplash.
