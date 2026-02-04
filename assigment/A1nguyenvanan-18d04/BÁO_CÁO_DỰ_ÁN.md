# BÁO CÁO DỰ ÁN: NEWS MANAGEMENT SYSTEM (NMS)

**Tên dự án**: FUNewsManagementSystem  
**Mã lớp**: SBA301  
**Sinh viên**: Nguyễn Văn An  
**Mã sinh viên**: 18D04  
**Ngày nộp**: 04/02/2026  

---

## I. GIỚI THIỆU DỰ ÁN

### 1.1 Tổng quan
News Management System (NMS) là một ứng dụng quản lý tin tức dành cho các trường đại học và tổ chức giáo dục. Hệ thống giúp quản lý, tổ chức và xuất bản nội dung tin tức lên website và các kênh khác.

### 1.2 Mục đích dự án
- Xây dựng giao diện quản trị (Backend) cho hệ thống quản lý tin tức
- Hỗ trợ các chức năng CRUD (Create, Read, Update, Delete) cho tin tức, danh mục, tài khoản
- Cung cấp chức năng tìm kiếm và lọc dữ liệu
- Xây dựng hệ thống xác thực người dùng

### 1.3 Yêu cầu chính
- Sử dụng ReactJS để xây dựng frontend
- Hỗ trợ hai vai trò: Admin (vai trò 1) và Staff (vai trò 2)
- Chức năng CRUD cho News, Category, Users
- Xác thực người dùng (Authentication)
- Giao diện thân thiện và dễ sử dụng

---

## II. PHÂN TÍCH THIẾT KẾ CƠ SỞ DỮ LIỆU

### 2.1 Mô hình Entity-Relationship (ER)

```
┌─────────────┐         ┌─────────────┐
│  Category   │◄────────│  NewsArticle│
│  (1)        │ (n)     │  (n)        │
└─────────────┘         └─────────────┘
      │                       │
      │                       │◄───────────┐
      │                       │            │
      │                  ┌─────────────┐   │
      │                  │    Tags     │   │
      │                  │   (m)       │◄──┤
      │                  └─────────────┘   │
      │                                    │
      │                  ┌────────────────┘
      │                  │
      │            ┌──────────────┐
      │            │ SystemAccount│
      │            │  (n)         │
      │            └──────────────┘
      │                    │
      │                    │
      └────────────────────┘
```

### 2.2 Bảng dữ liệu chính

#### 2.2.1 SystemAccount (Tài khoản hệ thống)
| Cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
|-----|------------|----------|-------|
| id | INT | PK | ID tài khoản |
| accountName | VARCHAR(100) | NOT NULL | Tên tài khoản |
| accountEmail | VARCHAR(100) | NOT NULL, UNIQUE | Email tài khoản |
| accountRole | INT | NOT NULL | Vai trò (1=Admin, 2=Staff) |
| accountPassword | VARCHAR(255) | NOT NULL | Mật khẩu (mã hóa) |

#### 2.2.2 Category (Danh mục)
| Cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
|-----|------------|----------|-------|
| id | INT | PK | ID danh mục |
| categoryName | VARCHAR(100) | NOT NULL | Tên danh mục |
| categoryDescription | TEXT | NOT NULL | Mô tả danh mục |
| parentCategoryID | INT | FK, NULL | Danh mục cha (có thể NULL) |
| isActive | BOOLEAN | DEFAULT(1) | Trạng thái (1=Active, 0=Inactive) |

#### 2.2.3 NewsArticle (Bài viết tin tức)
| Cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
|-----|------------|----------|-------|
| newArticleId | INT | PK | ID bài viết |
| newsTitle | VARCHAR(200) | NOT NULL | Tiêu đề tin tức |
| headline | TEXT | NOT NULL | Tiêu đề phụ |
| newsContent | TEXT | NOT NULL | Nội dung tin tức |
| newsSource | VARCHAR(100) | NOT NULL | Nguồn tin |
| categoryId | INT | FK | ID danh mục |
| newsStatus | VARCHAR(20) | NOT NULL | Trạng thái (Active/Draft/Published) |
| createdByID | INT | FK | ID người tạo |
| updatedByID | INT | FK | ID người cập nhật |
| createdDate | DATETIME | NOT NULL | Ngày tạo |
| modifiedDate | DATETIME | NOT NULL | Ngày chỉnh sửa |

#### 2.2.4 Tags (Thẻ)
| Cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
|-----|------------|----------|-------|
| id | INT | PK | ID thẻ |
| tagName | VARCHAR(50) | NOT NULL, UNIQUE | Tên thẻ |
| note | TEXT | | Ghi chú |

#### 2.2.5 NewsTags (Liên kết tin tức - thẻ)
| Cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
|-----|------------|----------|-------|
| id | INT | PK | ID |
| newsArticleID | INT | FK | ID bài viết |
| tagID | INT | FK | ID thẻ |

---

## III. KIẾN TRÚC ỨNG DỤNG

### 3.1 Cấu trúc thư mục dự án

```
A1nguyenvanan-18d04/
├── public/                          # Thư mục tài nguyên công khai
│   └── vite.svg
├── src/                             # Thư mục mã nguồn
│   ├── assets/                      # Tài nguyên (ảnh, icon)
│   ├── components/                  # Các component tái sử dụng
│   │   └── ConfirmModal.jsx         # Modal xác nhận xoá
│   ├── features/                    # Tính năng chính
│   │   ├── auth/
│   │   │   └── components/
│   │   │       └── LoginForm.jsx
│   │   ├── categories/
│   │   │   └── components/
│   │   │       ├── CategoryForm.jsx
│   │   │       └── CategoryTable.jsx
│   │   ├── news/
│   │   │   └── components/
│   │   │       ├── NewsForm.jsx
│   │   │       └── NewsTable.jsx
│   │   ├── users/
│   │   │   └── components/
│   │   │       ├── UserForm.jsx
│   │   │       └── UserTable.jsx
│   │   └── dashboard/
│   │       └── pages/
│   │           └── DashboardPage.jsx
│   ├── layouts/                     # Layout chính
│   │   └── AdminLayout/
│   │       ├── AdminLayout.jsx
│   │       ├── Header.jsx
│   │       ├── Sidebar.jsx
│   │       ├── Footer.jsx
│   │       └── AdminLayout.css
│   ├── pages/                       # Các trang chính
│   │   ├── auth/
│   │   │   └── LoginPage.jsx
│   │   ├── category/
│   │   │   └── CategoryManagementPage.jsx
│   │   ├── news/
│   │   │   ├── NewsManagementPage.jsx
│   │   │   └── NewsHistoryPage.jsx
│   │   ├── users/
│   │   │   └── UserManagementPage.jsx
│   │   ├── public/
│   │   │   └── PublicNewsPage.jsx
│   │   └── setting/
│   │       └── SettingsPage.jsx
│   ├── router/                      # Routing
│   │   ├── AppRouter.jsx
│   │   └── ProtectedRoute.jsx
│   ├── services/                    # Service API
│   │   ├── apiClient.js
│   │   ├── authService.js
│   │   ├── categoryService.js
│   │   ├── newsService.js
│   │   └── userService.js
│   ├── App.jsx                      # Component gốc
│   ├── App.css
│   ├── main.jsx                     # Entry point
│   └── index.css
├── db.json                          # Mock database
├── server.cjs                       # Mock server (JSON Server)
├── vite.config.js                   # Cấu hình Vite
├── eslint.config.js                 # Cấu hình ESLint
├── package.json                     # Dependencies
└── README.md                        # Hướng dẫn dự án
```

### 3.2 Kiến trúc thành phần (Component Architecture)

```
App
├── AppRouter
│   ├── LoginPage (Public)
│   ├── ProtectedRoute
│   │   ├── AdminLayout
│   │   │   ├── Header
│   │   │   ├── Sidebar
│   │   │   ├── DashboardPage
│   │   │   ├── CategoryManagementPage
│   │   │   │   ├── CategoryTable
│   │   │   │   └── CategoryForm (Modal)
│   │   │   ├── NewsManagementPage
│   │   │   │   ├── NewsTable
│   │   │   │   └── NewsForm (Modal)
│   │   │   ├── UserManagementPage
│   │   │   │   ├── UserTable
│   │   │   │   └── UserForm (Modal)
│   │   │   ├── NewsHistoryPage
│   │   │   ├── SettingsPage
│   │   │   └── Footer
│   │   └── ProtectedRoute (End)
│   └── PublicNewsPage
└── AppRouter (End)
```

### 3.3 Luồng dữ liệu (Data Flow)

```
Frontend (React)
    ↓
Services Layer (apiClient, categoryService, newsService, etc.)
    ↓
Axios Interceptor (Token, Headers)
    ↓
Backend API (http://localhost:8081)
    ↓
Database
```

---

## IV. CÁC TÍNH NĂNG CHÍNH

### 4.1 Authentication (Xác thực)

#### 4.1.1 Đăng nhập
- **Endpoint**: POST /api/auth/login
- **Tham số**: email, password
- **Xử lý**:
  - Kiểm tra email và password
  - Trả về token JWT
  - Lưu token vào localStorage
  - Redirect tới Dashboard nếu thành công

#### 4.1.2 Phân quyền
- Admin (Role = 1): Có quyền truy cập tất cả chức năng
- Staff (Role = 2): Có quyền tạo và quản lý tin tức của mình

### 4.2 Dashboard

- **Mô tả**: Trang chính hiển thị thống kê tổng quan
- **Chức năng**: Hiển thị số lượng tin tức, danh mục, người dùng
- **Quyền hạn**: Chỉ Admin mới có thể truy cập

### 4.3 Category Management (Quản lý Danh mục)

#### 4.3.1 Chức năng chính

| Chức năng | Mô tả | API Endpoint |
|----------|-------|--------------|
| Read | Xem danh sách danh mục | GET /api/categories |
| Create | Thêm danh mục mới | POST /api/categories |
| Update | Cập nhật thông tin danh mục | PUT /api/categories/:id |
| Delete | Xoá danh mục | DELETE /api/categories/:id |
| Search | Tìm kiếm danh mục theo tên | GET /api/categories?name=... |

#### 4.3.2 Các trường dữ liệu
- Category Name (Tên danh mục) - Bắt buộc
- Category Description (Mô tả) - Bắt buộc
- Parent Category ID (Danh mục cha) - Tùy chọn
- Is Active (Trạng thái) - Mặc định = true

#### 4.3.3 Luồng xử lý
1. Nhấn "Add New Category" → Mở Modal
2. Điền thông tin → Validate form
3. Nhấn "Save" → Gửi API
4. Nếu thành công → Refresh list → Toast success
5. Nếu lỗi → Hiển thị lỗi → Toast error

### 4.4 News Management (Quản lý Tin tức)

#### 4.4.1 Chức năng chính

| Chức năng | Mô tả | API Endpoint |
|----------|-------|--------------|
| Read | Xem danh sách tin tức | GET /api/news |
| Create | Thêm tin tức mới | POST /api/news |
| Update | Cập nhật tin tức | PUT /api/news/:id |
| Delete | Xoá tin tức | DELETE /api/news/:id |
| Search | Tìm kiếm theo tiêu đề | GET /api/news?title=... |

#### 4.4.2 Các trường dữ liệu
- News Title (Tiêu đề) - Bắt buộc
- Headline (Tiêu đề phụ) - Bắt buộc
- Content (Nội dung) - Bắt buộc
- Source (Nguồn) - Tùy chọn
- Category (Danh mục) - Bắt buộc
- Tags (Thẻ) - Tùy chọn
- Status (Trạng thái) - Draft/Published/Active
- Created Date (Ngày tạo) - Tự động

#### 4.4.3 Luồng xử lý
1. Nhấn "Add New News" → Mở Modal
2. Điền thông tin → Load danh mục từ API
3. Thêm tags → Nhấn "Add" → Hiển thị dưới dạng Badge
4. Nhấn "Save" → Gửi API kèm tags
5. Nếu thành công → Refresh list → Toast success

### 4.5 User Management (Quản lý Người dùng)

#### 4.5.1 Chức năng chính

| Chức năng | Mô tả | API Endpoint |
|----------|-------|--------------|
| Read | Xem danh sách người dùng | GET /api/users |
| Create | Thêm người dùng | POST /api/users |
| Update | Cập nhật người dùng | PUT /api/users/:id |
| Delete | Xoá người dùng | DELETE /api/users/:id |
| Search | Tìm kiếm theo tên/email | GET /api/users?name=... |

#### 4.5.2 Các trường dữ liệu
- Account Name (Tên tài khoản) - Bắt buộc
- Email (Email) - Bắt buộc, Unique
- Password (Mật khẩu) - Bắt buộc
- Role (Vai trò) - Admin/Staff

### 4.6 News History (Lịch sử Tin tức)

- **Mô tả**: Xem lịch sử các bài viết đã publish
- **Chức năng**: Hiển thị danh sách tin tức đã xuất bản
- **Quyền hạn**: Có thể xem lịch sử của chính mình (Staff) hoặc tất cả (Admin)

---

## V. CHI TIẾT TRIỂN KHAI (IMPLEMENTATION)

### 5.1 Công nghệ sử dụng

| Công nghệ | Phiên bản | Mục đích |
|----------|---------|---------|
| React | 18.x | Framework chính |
| Vite | 5.x | Build tool |
| Axios | 1.x | HTTP Client |
| React Router | 6.x | Routing |
| React Bootstrap | 2.x | UI Components |
| React Toastify | 9.x | Notification |
| ESLint | 8.x | Code quality |

### 5.2 Services (Tầng gọi API)

#### 5.2.1 apiClient.js
```javascript
// Cấu hình Axios interceptor
- Base URL: http://localhost:8081
- Headers mặc định: Content-Type: application/json
- Request interceptor: Thêm token vào header
- Response interceptor: Xử lý lỗi global
```

#### 5.2.2 authService.js
```javascript
// Chức năng:
- login(email, password): Đăng nhập
- logout(): Đăng xuất
- getToken(): Lấy token
- getUser(): Lấy thông tin user
```

#### 5.2.3 categoryService.js
```javascript
// CRUD operations cho Category
- getAll(): Lấy tất cả danh mục
- getById(id): Lấy danh mục theo ID
- create(data): Tạo danh mục mới
- update(id, data): Cập nhật danh mục
- remove(id): Xoá danh mục
```

#### 5.2.4 newsService.js
```javascript
// CRUD operations cho News
- getAll(): Lấy tất cả tin tức
- getById(id): Lấy tin tức theo ID
- create(data): Tạo tin tức mới
- update(id, data): Cập nhật tin tức
- remove(id): Xoá tin tức
```

#### 5.2.5 userService.js
```javascript
// CRUD operations cho User
- getAll(): Lấy tất cả người dùng
- getById(id): Lấy người dùng theo ID
- create(data): Tạo người dùng mới
- update(id, data): Cập nhật người dùng
- remove(id): Xoá người dùng
```

### 5.3 Components chính

#### 5.3.1 LoginForm.jsx
**Chức năng**: Xác thực người dùng
**Props**: onLoginSuccess (callback sau khi đăng nhập thành công)
**State**:
- email: Email người dùng
- password: Mật khẩu
- loading: Trạng thái gửi request
- error: Thông báo lỗi

**Xử lý**:
- Validate form (email, password bắt buộc)
- Gọi authService.login()
- Lưu token + thông tin user
- Redirect tới Dashboard

#### 5.3.2 CategoryForm.jsx
**Chức năng**: Tạo/Cập nhật danh mục
**Props**:
- category: Dữ liệu danh mục (null = tạo mới)
- onSave: Callback lưu
- onCancel: Callback hủy

**State**:
- formData: Dữ liệu form
- validated: Trạng thái validation
- isActive: Trạng thái active

**Xử lý**:
- Nếu category !== null → Populate form data
- Validate form trước khi submit
- onSave gửi dữ liệu lên parent component

#### 5.3.3 CategoryTable.jsx
**Chức năng**: Hiển thị danh sách danh mục
**Props**:
- categoryList: Mảng danh mục
- onEdit: Callback edit
- onDelete: Callback xoá

**Columns**:
- ID, Name, Description, Parent ID, Status, Actions

#### 5.3.4 NewsForm.jsx
**Chức năng**: Tạo/Cập nhật tin tức
**Props**:
- news: Dữ liệu tin tức (null = tạo mới)
- onSave: Callback lưu
- onCancel: Callback hủy

**State**:
- formData: Dữ liệu form
- categories: Danh sách danh mục (load từ API)
- tags: Mảng tags
- tagInput: Input thêm tag mới

**Xử lý**:
- Load danh mục khi component mount
- Thêm/Xoá tags bằng giao diện Badge
- Validate form bắt buộc
- onSave gửi dữ liệu kèm tags

#### 5.3.5 NewsTable.jsx
**Chức năng**: Hiển thị danh sách tin tức
**Props**:
- newsList: Mảng tin tức
- onEdit: Callback edit
- onDelete: Callback xoá

**Columns**:
- ID, Title, Headline, Category, Author, Tags, Status, Created Date, Actions

**Xử lý đặc biệt**:
- Load categories từ API để map categoryId → categoryName
- Hiển thị tags dưới dạng Badge
- Format ngày tháng
- Xử lý dữ liệu missing (hiển thị "-")

#### 5.3.6 ConfirmModal.jsx
**Chức năng**: Modal xác nhận xoá
**Props**:
- show: Hiển thị/ẩn modal
- title: Tiêu đề modal
- message: Thông báo xác nhận
- onConfirm: Callback xác nhận
- onCancel: Callback hủy

---

## VI. CÁC BUG ĐÃ SỬA CHỮA

### 6.1 React Warning: Missing Key Props

**Vấn đề**:
- Khi render danh sách tags, sử dụng index làm key
- React cảnh báo: "Each child in a list should have a unique 'key' prop"

**Nguyên nhân**:
```javascript
// Sai ❌
{tags.map((tag, idx) => (
  <Badge key={idx}>{tag}</Badge>
))}
```

**Giải pháp**:
```javascript
// Đúng ✅
{tags.map((tag) => (
  <Badge key={tag}>{tag}</Badge>
))}
```

**File sửa**: `src/features/news/components/NewsTable.jsx`

### 6.2 Category Edit tạo Record mới

**Vấn đề**:
- Khi edit category, hệ thống tạo ra category mới thay vì cập nhật

**Nguyên nhân**:
- Field name không nhất quán trong CategoryForm:
  - Init state: `categoryId: null`
  - Set data: `id: category.id`
  - Dẫn đến ID bị mất khi gửi form

**Giải pháp**:
```javascript
// State nhất quán sử dụng 'id'
const [formData, setFormData] = useState({
  id: null,
  categoryName: '',
  // ...
});

// Set data từ props
if (category) {
  setFormData({
    id: category.id || category.categoryId,
    // ...
  });
}
```

**File sửa**: `src/features/categories/components/CategoryForm.jsx`

### 6.3 Tags không hiển thị khi xem News

**Vấn đề**:
- Cột Tags hiển thị trống ngay cả khi có tags
- Category và Author cũng không hiển thị

**Nguyên nhân**:
- API backend không populate dữ liệu relational (category, author, tags)
- NewsTable không load categories từ API để mapping

**Giải pháp**:
```javascript
// Thêm useEffect load categories
useEffect(() => {
  const loadCategories = async () => {
    try {
      const catList = await categoryService.getAll();
      const catMap = {};
      catList.forEach(cat => {
        catMap[cat.id] = cat.categoryName;
      });
      setCategories(catMap);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoadingCategories(false);
    }
  };
  loadCategories();
}, []);

// Sử dụng map để hiển thị category name
<td>{categories[news.categoryId] || '-'}</td>
```

**File sửa**: `src/features/news/components/NewsTable.jsx`

---

## VII. HƯỚNG DẪN CÀI ĐẶT VÀ CHẠY

### 7.1 Yêu cầu hệ thống
- Node.js phiên bản 16.x trở lên
- npm hoặc yarn
- Backend API chạy trên port 8081

### 7.2 Bước cài đặt

```bash
# 1. Clone/Extract dự án
cd A1nguyenvanan-18d04

# 2. Cài đặt dependencies
npm install

# 3. Khởi động development server
npm run dev

# 4. Mở trình duyệt
# URL: http://localhost:5173
```

### 7.3 Build cho production

```bash
# Build project
npm run build

# Preview build
npm run preview
```

### 7.4 Credentials đăng nhập

**Admin**:
- Email: admin@example.com
- Password: password123
- Role: Admin (1)

**Staff**:
- Email: john.doe@example.com
- Password: password456
- Role: Staff (2)

---

## VIII. HƯỚNG DẪN SỬ DỤNG HỆ THỐNG

### 8.1 Đăng nhập

1. Mở URL http://localhost:5173
2. Nhập email và password
3. Nhấn "Login"
4. Nếu thành công → Redirect tới Dashboard

### 8.2 Quản lý Danh mục

**Xem danh sách**:
1. Menu → Category
2. Bảng hiển thị tất cả danh mục

**Thêm danh mục**:
1. Nhấn nút "Add New Category"
2. Điền thông tin (Name, Description, Parent Category ID)
3. Toggle "Active" nếu cần
4. Nhấn "Save"

**Sửa danh mục**:
1. Nhấn nút "Edit" trên hàng cần sửa
2. Thay đổi thông tin
3. Nhấn "Save"

**Xoá danh mục**:
1. Nhấn nút "Delete"
2. Xác nhận trong popup
3. Danh mục bị xoá

### 8.3 Quản lý Tin tức

**Xem danh sách**:
1. Menu → News Management
2. Bảng hiển thị tất cả tin tức

**Thêm tin tức**:
1. Nhấn "Add New News"
2. Điền thông tin (Title, Headline, Content, Source)
3. Chọn Category từ dropdown
4. Thêm Tags (nhập tag, nhấn Add)
5. Chọn Status (Draft/Published/Active)
6. Nhấn "Save"

**Tìm kiếm**:
1. Sử dụng search box trên trang
2. Nhập tiêu đề hoặc headline
3. Danh sách tự động lọc

**Sửa tin tức**:
1. Nhấn "Edit"
2. Thay đổi thông tin
3. Nhấn "Save"

**Xoá tin tức**:
1. Nhấn "Delete"
2. Xác nhận trong popup

### 8.4 Quản lý Người dùng

**Xem danh sách**:
1. Menu → Users
2. Bảng hiển thị tất cả người dùng

**Thêm người dùng**:
1. Nhấn "Add New User"
2. Điền Account Name, Email, Password
3. Chọn Role
4. Nhấn "Save"

**Sửa người dùng**:
1. Nhấn "Edit"
2. Thay đổi thông tin
3. Nhấn "Save"

**Xoá người dùng**:
1. Nhấn "Delete"
2. Xác nhận trong popup

---

## IX. LỖI THƯỜNG GẶP VÀ CÁCH KHẮC PHỤC

### 9.1 Không thể kết nối Backend API

**Lỗi**: Connection refused on http://localhost:8081

**Nguyên nhân**: Backend API chưa khởi động

**Cách khắc phục**:
- Chắc chắn Backend chạy trên port 8081
- Kiểm tra cấu hình trong `src/services/apiClient.js`
- Restart backend server

### 9.2 Token hết hạn

**Lỗi**: 401 Unauthorized

**Nguyên nhân**: Token trong localStorage đã hết hạn

**Cách khắc phục**:
- Đăng xuất → Đăng nhập lại
- Clear localStorage
- Refresh page

### 9.3 Form validation lỗi

**Lỗi**: Submit form không thành công, trường bắt buộc không được fill

**Nguyên nhân**: Form validation yêu cầu các trường bắt buộc

**Cách khắc phục**:
- Điền đầy đủ các trường bắt buộc (có dấu *)
- Kiểm tra format email nếu có trường email
- Nhấn Save khi form hợp lệ

---

## X. HIỆU NĂNG VÀ TỐI ƯU HÓA

### 10.1 Hiệu suất hiện tại
- Load danh sách: ~500ms
- Search/Filter: Instant (client-side)
- Modal mở/đóng: Smooth
- Form submission: ~1s

### 10.2 Tối ưu hóa trong tương lai
- Pagination cho danh sách dài
- Lazy loading cho image
- Memoization cho components
- Virtual scrolling cho danh sách lớn
- Caching dữ liệu categories

---

## XI. KẾT LUẬN

### 11.1 Thành tựu chính
✅ Xây dựng thành công giao diện quản trị NMS  
✅ Hỗ trợ đầy đủ chức năng CRUD  
✅ Hệ thống xác thực người dùng hoạt động tốt  
✅ Giao diện thân thiện, dễ sử dụng  
✅ Code clean, có cấu trúc rõ ràng  

### 11.2 Bài học rút ra
- ReactJS là framework mạnh mẽ để xây dựng UI
- Component-based architecture giúp tái sử dụng code
- Service layer tách biệt logic API
- Validation form quan trọng cho UX tốt
- Error handling cần được xử lý toàn diện

### 11.3 Hướng phát triển tương lai
- Thêm chức năng export data (CSV, PDF)
- Phân quyền chi tiết hơn (Fine-grained permissions)
- Analytics dashboard
- Notification real-time
- Multi-language support (i18n)
- Dark mode
- Mobile responsive improvement

---

## XII. TÀI LIỆU THAM KHẢO

1. **React Official Documentation**  
   https://react.dev

2. **Vite Documentation**  
   https://vitejs.dev

3. **React Router Documentation**  
   https://reactrouter.com

4. **React Bootstrap Documentation**  
   https://react-bootstrap.github.io

5. **Axios Documentation**  
   https://axios-http.com

6. **React Toastify Documentation**  
   https://fkhadra.github.io/react-toastify/introduction

---

## PHỤ LỤC A: SCREENSHOTS

### A.1 Login Page
```
[Email input]
[Password input]
[Login Button]
```

### A.2 Dashboard
```
┌─────────────────────────────────┐
│ Dashboard                       │
├─────────────────────────────────┤
│ Total News: 50                  │
│ Total Categories: 5             │
│ Total Users: 20                 │
│ Active News: 45                 │
└─────────────────────────────────┘
```

### A.3 Category Management
```
┌────────────────────────────────────────┐
│ [Add New Category]    [Search...]      │
├────────────────────────────────────────┤
│ ID │ Name │ Desc │ Parent │ Status │ Act│
├────────────────────────────────────────┤
│ 1  │ Tech │ ...  │ None   │ Active │ 🔧 │
│ 2  │ Biz  │ ...  │ None   │ Active │ 🔧 │
└────────────────────────────────────────┘
```

### A.4 News Management
```
┌──────────────────────────────────────────────┐
│ [Add New News]      [Search by title...]     │
├──────────────────────────────────────────────┤
│ ID │ Title │ Headline │ Category │ Status │ │
├──────────────────────────────────────────────┤
│ 1  │ Title1│ Head1    │ Tech     │ Active│🔧│
│ 2  │ Title2│ Head2    │ Business │Draft │🔧│
└──────────────────────────────────────────────┘
```

---

**Sinh viên**: Nguyễn Văn An (18D04)  
**Ngày nộp**: 04/02/2026  
**Giáo viên hướng dẫn**: [Tên giáo viên]

---

*Tài liệu này được tạo cho mục đích học tập và báo cáo dự án SBA301*

