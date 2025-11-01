# 📘 CFL – Course Flow Learning

**CFL** là một ứng dụng web được phát triển trong khuôn khổ dự án công nghệ giáo dục, cho phép doanh nghiệp và tổ chức quản lý **khóa học**, **người học**, và **dữ liệu liên quan** một cách hiệu quả.

## 🧩 Prerequisites

- **Hệ điều hành:** Windows 10 hoặc 11
- **React:** v19.x.x
- **NodeJS:** v22.x.x
- **Docker** và **Docker Compose** (bắt buộc cho môi trường backend)

## ⚙️ Installation

1. **Clone repository**
   ```bash
   git clone https://github.com/truongsondev/course--flow.git
   ```
2. Di chuyển vào thư mục dự án
   ```bash
   cd course--flow
   ```
3. Cài đặt dependencies

   ```bash
   cd Client
   npm install
   cd ../Server
   npm install

   ```

   🚀 Usage

4. Khởi động các dịch vụ cơ sở hạ tầng
   ```bash
   cd Server
   docker-compose up -d
   ```
5. Chạy backend (NestJS)
   ```bash
   cd Server
   npm run start:dev
   ```
6. Chạy frontend (ReactJS)
   ```bash
   cd ../Client
   npm run dev
   🌐 URLs
   ```

- Frontend (ReactJS): http://localhost:5137

- Backend (NestJS): http://localhost:3000

🔐 Environment Configuration

        DATABASE_URL=mysql://root:admin123@localhost:3306/course_db
        IMAGEKIT_PUBLIC_KEY=public_bMW1GgqTUywDdbi7kL18vJuEjQw=
        IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/mox5qz4rl
        IMAGEKIT_PRIVATE_KEY=private_2OF7V0gKc8xofijC0tw+UcokQ+w=

        MINIO_ENDPOINT=localhost
        MINIO_PORT=9000
        MINIO_ACCESS_KEY=minioadmin
        MINIO_SECRET_KEY=minioadmin
        MINIO_PUBLIC_URL=http://localhost:9000

        ELASTIC_NODE=http://localhost:9200
        ELASTIC_USER=elastic
        ELASTIC_PASS=changeme

        KAFKA_BROKER=localhost:9092
        PORT=3000

        VNPAY_TMN_CODE=9C405PJ5
        VNPAY_HASH_SECRET=C73QP97CZWEKJ3YGIMR4VZPJT67IGJR7
        VNPAY_URL=https://sandbox.vnpayment.vn/paymentv2/vpcpay.html
        VNPAY_RETURN_URL=http://localhost:5173/payment/vnpay-return
        VNPAY_NOTIFY_URL=https://semiresolute-lannie-exhaustedly.ngrok-free.dev/payment/vnpay-ipn

🗄️ Database Initialization

Sau khi container MySQL khởi động, chạy script sau trong MySQL Workbench:

        USE `course_db`;

        INSERT INTO roles (name) VALUES
        ("GUEST"),
        ("STUDENT"),
        ("INSTRUCTOR"),
        ("ADMIN");

        INSERT INTO categories (id, name) VALUES
        ('cat1', 'Development'),
        ('cat2', 'Business'),
        ('cat3', 'Design'),
        ('cat4', 'Data Science'),
        ('cat5', 'Personal Development'),
        ('cat6', 'Finance & Accounting'),
        ('cat7', 'IT & Software'),
        ('cat8', 'Health & Fitness'),
        ('cat9', 'Music'),
        ('cat10', 'Language Learning');

💡 Application Features

🔑 1. Đăng nhập (Login)

- Người dùng nhập email và mật khẩu.

- Hệ thống xác thực và trả về JWT token.

- Giao diện: form login có validate, tự động chuyển đến trang chủ sau khi đăng nhập.

<img src="./public/login.png">

🧍‍♂️ 2. Đăng ký (Register)

- Người dùng nhập email, mật khẩu.

- Backend kiểm tra trùng email và tạo tài khoản mới.
  <img src="./public/register.png">

📚 3. Thêm khóa học (Add Course)

- Instructor tạo khóa học mới: nhập tiêu đề, mô tả, danh mục, giá, ảnh bìa, và bài học.

- Ảnh upload qua minio, dữ liệu lưu trong MySQL.
  <img src="./public/addcourse.png">

🧾 4. Chi tiết khóa học (Course Detail)

- Hiển thị toàn bộ thông tin khóa học: ảnh, mô tả, bài học, đánh giá, và giảng viên.

- Có nút Mua khóa học (nếu chưa mua) hoặc Bắt đầu học (nếu đã mua).
  <img src="./public/detailcourse.png">

💳 5. Thanh toán (Payment)

- Tích hợp VNPay.

- Khi người dùng mua khóa học, hệ thống tạo đơn hàng và chuyển đến cổng VNPay.

Sau khi thanh toán thành công, khóa học được mở quyền truy cập.
<img src="./public/vnpay1.png">
<img src="./public/vnpay2.png">
<img src="./public/vnpay3.png">

▶️ 6. Xem khóa học (View Course)

- Người học xem video bài giảng, theo dõi tiến độ, và quay lại bài đang học dở.

- Mỗi bài học đánh dấu hoàn thành sau khi xem.
  <img src="./public/viewcourse.png">

⭐ 7. Đánh giá (Review)

- Người học sau khi hoàn thành khóa học có thể đánh giá bằng sao và bình luận.

- Trung bình đánh giá được tính và hiển thị trên trang khóa học.
  <img src="./public/review.png">

📝 8. Ghi chú (Note)

- Trong khi học, người dùng có thể thêm ghi chú cá nhân cho từng bài học.

- Ghi chú lưu theo tài khoản, có thể xem lại hoặc chỉnh sửa.
  <img src="./public/note.png">

🧾 Application Specifications

- Frontend: ReactJS 19, Vite, TailwindCSS, Redux Toolkit

- Backend: NestJS, Prisma ORM, MySQL, Kafka, Elasticsearch, MinIO

- DevOps Stack: Docker Compose orchestration

- Payment Gateway: VNPay Sandbox Integration

- Image Storage: ImageKit + MinIO
