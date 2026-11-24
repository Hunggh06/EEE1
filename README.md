# EEE5 Learning Studio

Ứng dụng web học **Tiếng Anh Chuyên ngành Điện – Điện tử 5 (HaUI EEE5)** đầy đủ 6 kỹ năng cho cả 8 Units:

- **Vocabulary:** Flashcard 3D lật thẻ, phát âm Web Speech (`en-US` / `en-GB`, `0.8x` / `1.0x`), luyện tập tăng cấp (Nhận diện -> Chính tả -> Điền khuyết) và thuật toán lặp lại ngắt quãng **5-Level Leitner SRS**.
- **Grammar:** Lý thuyết trọng tâm + bài tập thực hành có giải thích cho cả 8 Units.
- **Cards (Speaking Cue Cards):** Phiếu thông tin đơn vai **Student A / Student B**, hiển thị câu hỏi đối tác trước khi viết câu trả lời, chấm từng mục & toàn phiếu bằng AI và ẩn đáp án mặc định.
- **Writing:** Viết từng câu từ gợi ý tiếng Việt kèm từ khoá, chấm từng câu và nhận xét tổng thể bằng AI.
- **Listening:** Trình phát audio MP3 & Web Speech với tua nhanh/chậm, điều chỉnh tốc độ, transcript ẩn mặc định.
- **Reading:** 18 bài đọc hiểu giáo trình (113 câu hỏi MCQ, Đúng/Sai, Điền bảng & Trả lời ngắn) chia 2 cột đối chiếu tiện lợi.
- **AI Tutor:** Gia sư tiếng Anh chuyên ngành tích hợp TokenHarbor (`deepseek-v4.1-flash:free`).

## Chạy Local

```bash
npm install
npm run dev
```

*(Tùy chọn)* Tạo file `.env.local` dựa theo `.env.example` nếu muốn cấu hình sẵn `VITE_TOKENHARBOR_API_KEY`. Bạn cũng có thể nhập API Key trực tiếp trong trang **Cài đặt** trên giao diện web.

## Deploy miễn phí lên Render (Static Site)

1. Vào [Render Dashboard](https://dashboard.render.com/) → **New +** → **Static Site** (hoặc dùng **Blueprint** với file `render.yaml` có sẵn).
2. Kết nối repository GitHub `Hunggh06/EEE1`.
3. Thiết lập:
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
4. *(Tùy chọn)* Trong **Environment Variables**, thêm `VITE_TOKENHARBOR_API_KEY` nếu muốn nhúng sẵn key, hoặc để trống để người dùng tự nhập trong mục **Cài đặt**.
