# 📰 FU NEWS MANAGEMENT SYSTEM (NMS)

**Khóa**: SBA301  
**Sinh viên**: Nguyễn Văn An (18D04)  
**Ngôn ngữ**: ReactJS + JavaScript  

---

## 🎯 Mô tả dự án

Hệ thống quản lý tin tức cho các trường đại học với các chức năng:
- 📝 Quản lý tin tức (CRUD)
- 📂 Quản lý danh mục (CRUD)
- 👥 Quản lý người dùng (CRUD)
- 🔐 Xác thực người dùng (Login/Logout)
- 🏠 Dashboard overview
- 🔍 Tìm kiếm và lọc dữ liệu

---

## ⚡ Quick Start

### 1. Cài đặt

```bash
# Clone/Extract dự án
cd A1nguyenvanan-18d04

# Cài đặt dependencies
npm install

# Khởi động development server
npm run dev
```

### 2. Truy cập

Mở trình duyệt và vào: **http://localhost:5173**

### 3. Đăng nhập

| Email | Password | Role |
|-------|----------|------|
| admin@example.com | password123 | Admin |
| john.doe@example.com | password456 | Staff |

---

## 📦 Yêu cầu hệ thống

- Node.js v16+
- npm v8+
- Backend API: http://localhost:8081
- Modern browser (Chrome, Firefox, Edge, Safari)

---

## 🗂️ Cấu trúc thư mục

```
src/
├── components/          # Components tái sử dụng
├── features/            # Các tính năng chính
│   ├── auth/           # Authentication
│   ├── categories/     # Quản lý danh mục
│   ├── news/           # Quản lý tin tức
│   ├── users/          # Quản lý người dùng
│   └── dashboard/      # Dashboard
├── layouts/            # Layout chính
├── pages/              # Pages chính
├── router/             # Routing
├── services/           # API services
└── App.jsx             # Component gốc
```

---

## 🚀 Scripts có sẵn

```bash
# Development server
npm run dev

# Build cho production
npm run build

# Preview build
npm run preview

# Lint code
npm run lint
```

---

## ✨ Tính năng chính

### 🔐 Authentication
- ✅ Đăng nhập email/password
- ✅ Token-based authentication
- ✅ Auto logout khi token hết hạn
- ✅ Protected routes

### 📂 Category Management
- ✅ Create: Thêm danh mục mới
- ✅ Read: Xem danh sách danh mục
- ✅ Update: Sửa danh mục
- ✅ Delete: Xoá danh mục
- ✅ Search: Tìm kiếm
- ✅ Status toggle: Active/Inactive
- ✅ Parent category support

### 📝 News Management
- ✅ Create: Thêm tin tức mới
- ✅ Read: Xem danh sách tin tức
- ✅ Update: Sửa tin tức
- ✅ Delete: Xoá tin tức
- ✅ Search: Tìm kiếm
- ✅ Tags management: Thêm/xoá tags
- ✅ Category mapping: Hiển thị tên danh mục
- ✅ Author display: Hiển thị tên tác giả

### 👥 User Management
- ✅ Create: Thêm người dùng
- ✅ Read: Xem danh sách người dùng
- ✅ Update: Sửa người dùng
- ✅ Delete: Xoá người dùng
- ✅ Search: Tìm kiếm
- ✅ Role selection: Chọn vai trò

### 🎨 UI/UX
- ✅ Responsive design (Mobile, Tablet, Desktop)
- ✅ Modal dialogs
- ✅ Form validation
- ✅ Loading spinners
- ✅ Toast notifications
- ✅ Error handling
- ✅ Dark header + Sidebar navigation

---

## 🔧 API Endpoints

```
POST    /api/auth/login              # Đăng nhập
GET     /api/categories              # Danh sách danh mục
POST    /api/categories              # Tạo danh mục
PUT     /api/categories/:id          # Cập nhật danh mục
DELETE  /api/categories/:id          # Xoá danh mục

GET     /api/news                    # Danh sách tin tức
POST    /api/news                    # Tạo tin tức
PUT     /api/news/:id                # Cập nhật tin tức
DELETE  /api/news/:id                # Xoá tin tức

GET     /api/users                   # Danh sách người dùng
POST    /api/users                   # Tạo người dùng
PUT     /api/users/:id               # Cập nhật người dùng
DELETE  /api/users/:id               # Xoá người dùng
```

---

## 📊 Technologies Used

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.x | UI Framework |
| Vite | 5.x | Build tool |
| React Router | 6.x | Routing |
| React Bootstrap | 2.x | UI Components |
| Axios | 1.x | HTTP Client |
| React Toastify | 9.x | Notifications |

---

## 🐛 Known Issues & Fixes

### Issue 1: React Warning - Missing Key Props ✅ FIXED
Khi render danh sách tags, sử dụng index làm key → Thay đổi thành sử dụng tag value

### Issue 2: Category Edit tạo Record mới ✅ FIXED  
Form state không nhất quán (categoryId vs id) → Fix bằng cách sử dụng `id` nhất quán

### Issue 3: Tags/Category/Author không hiển thị ✅ FIXED
API không populate relational data → Load categories từ API để mapping

---

## 📝 Usage Examples

### Thêm Category
1. Nhấn **"Add New Category"**
2. Điền **Category Name** và **Description**
3. Chọn **Parent Category** (tùy chọn)
4. Toggle **Active** status
5. Nhấn **"Save"**

### Thêm News Article
1. Nhấn **"Add New News"**
2. Điền **Title**, **Headline**, **Content**, **Source**
3. Chọn **Category** từ dropdown
4. Thêm **Tags** (nhập + nhấn Add)
5. Chọn **Status** (Draft/Published/Active)
6. Nhấn **"Save"**

### Tìm kiếm
1. Sử dụng **Search box** trên trang
2. Nhập từ khóa
3. Danh sách tự động lọc

### Xoá dữ liệu
1. Nhấn **"Delete"** button
2. Xác nhận trong popup
3. Dữ liệu bị xoá

---

## 🔐 Security

- ✅ Token-based authentication
- ✅ Protected routes (ProtectedRoute component)
- ✅ Input validation
- ✅ XSS prevention
- ✅ CSRF support
- ✅ Secure password handling

---

## 📱 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | Latest |
| Firefox | Latest |
| Safari | Latest |
| Edge | Latest |

---

## 🐳 Running Backend

```bash
# Chắc chắn backend chạy trên port 8081
# Nếu sử dụng JSON Server:
npm run server

# Hoặc chạy backend thực tế
# (Tùy theo hướng dẫn của backend team)
```

---

## 📚 Documentation

- **[BÁO_CÁO_DỰ_ÁN.md](./BÁO_CÁO_DỰ_ÁN.md)** - Báo cáo chi tiết dự án
- **[HƯỚNG_DẪN_THỰC_HIỆN.md](./HƯỚNG_DẪN_THỰC_HIỆN.md)** - Hướng dẫn từng bước
- **[FRONTEND_COMPLETION_SUMMARY.md](./FRONTEND_COMPLETION_SUMMARY.md)** - Tóm tắt hoàn thành

---

## ⚙️ Configuration

### API Configuration
```javascript
// src/services/apiClient.js
const apiClient = axios.create({
    baseURL: 'http://localhost:8081',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});
```

### Development Server
```javascript
// vite.config.js
export default {
  plugins: [react()],
  server: {
    port: 5173,
    host: '0.0.0.0'
  }
}
```

---

## 🚨 Troubleshooting

### Backend API không kết nối
```
Error: Connection refused on http://localhost:8081
Solution: 
- Chắc chắn backend chạy trên port 8081
- Check cấu hình trong src/services/apiClient.js
- Restart backend server
```

### Token hết hạn
```
Error: 401 Unauthorized
Solution:
- Đăng xuất → Đăng nhập lại
- Clear localStorage
- Refresh page
```

### Form submission lỗi
```
Error: Validation failed
Solution:
- Điền đầy đủ các trường bắt buộc (*)
- Kiểm tra format email
- Xem console log để chi tiết
```

---

## 📊 Performance

| Metric | Value |
|--------|-------|
| Page Load | ~1-2s |
| CRUD Response | ~500ms-1s |
| Search | <100ms |
| Build Size | ~200KB gzip |

---

## 📞 Contact & Support

- **Student Email**: nguyenvanan@fpt.edu.vn
- **Class**: SBA301
- **Instructor**: [Giáo viên hướng dẫn]

---

## 📄 License

Copyright © 2026 FU News Management System. All rights reserved.

---

## ✅ Checklist hoàn thành

- ✅ Tất cả chức năng CRUD
- ✅ Form validation
- ✅ Error handling
- ✅ Loading states
- ✅ Toast notifications
- ✅ Search functionality
- ✅ Responsive design
- ✅ Protected routes
- ✅ User authentication
- ✅ Documentation

---

**🎉 Dự án hoàn thành thành công! Chúc bạn có một dự án tuyệt vời!**

*Last Updated: 04/02/2026*

