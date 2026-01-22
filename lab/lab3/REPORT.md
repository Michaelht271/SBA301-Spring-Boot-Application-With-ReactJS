# Báo cáo dự án Lab 3: Fething and Catching Data

## 1. Thông tin project
- **Tên project:** `lab3-react`
- **Tác giả:** Michael Dev
- **Link Github:** `(Chưa có)`

## 2. Cấu trúc project

```
.
├───.gitignore
├───eslint.config.js
├───index.html
├───package-lock.json
├───package.json
├───README.md
├───vite.config.js
├───node_modules/
├───public/
│   ├───vite.svg
│   ├───assets/
│   │   └───react.svg
│   ├───images/
│   │   ├───1.jpg
│   │   ├───...
│   │   └───Orchid.jpg
│   └───img/
│       └───avatar.jpeg
└───src/
    ├───index.css
    ├───main.jsx
    ├───Router.jsx
    ├───components/
    │   ├───layout/
    │   │   ├───Footer.jsx
    │   │   ├───Header.jsx
    │   │   └───MainLayout.jsx
    │   ├───modal/
    │   │   └───ConfirmModal.jsx
    │   └───ui/
    │       ├───...
    ├───constants/
    │   └───paths.js
    ├───context/
    │   └───AuthContext.jsx
    ├───data/
    ├───features/
    │   ├───authentication/
    │   │   ├───form-login.jsx
    │   │   ├───loginRules.js
    │   │   └───ProtectedRoute.jsx
    │   └───orchids/
    │       ├───index.jsx
    │       └───components/
    │           ├───...
    │           └───OrchidManagement.jsx
    ├───hooks/
    │   └───useLoginLogic.js
    ├───pages/
    │   ├───...
    │   └───admin/
    │       └───orchids/
    │           └───index.jsx
    ├───reducers/
    │   └───auth-reducer.js
    ├───services/
    │   └───apis.js
    └───utils/
        └───validator.js
```

## 3. Cài đặt cấu hình json-server

1.  **Cài đặt `json-server`:**
    ```bash
    npm install -D json-server
    ```

2.  **Thêm script vào `package.json`:**
    Mở file `package.json` và thêm một script mới để chạy `json-server`.
    ```json
    "scripts": {
      "dev": "vite",
      "build": "vite build",
      "lint": "eslint .",
      "preview": "vite preview",
      "json-server": "json-server --watch public/db.json --port 3001"
    },
    ```

3.  **Chạy `json-server`:**
    ```bash
    npm run json-server
    ```

## 4. Cài đặt cấu hình dùng package axios

1.  **Cài đặt `axios`:**
    ```bash
    npm install axios
    ```

2.  **Tạo file service API:**
    Tạo file `src/services/apis.js` để quản lý tất cả các lời gọi API.

    ```javascript
    import axios from 'axios';

    const api = axios.create({
        baseURL: 'http://localhost:3001',
    });

    export const getAuthors = () => api.get('/authors').then(res => res.data);
    export const getBanners = () => api.get('/banners').then(res => res.data);
    export const getAllOrchids = () => api.get('/orchids').then(res => res.data);
    export const getOrchidById = (id) => api.get(`/orchids/${id}`).then(res => res.data);
    export const getUsers = () => api.get('/users').then(res => res.data);
    export const createOrchid = (orchid) => api.post('/orchids', orchid).then(res => res.data);
    export const updateOrchid = (id, orchid) => api.put(`/orchids/${id}`, orchid).then(res => res.data);
    export const deleteOrchid = (id) => api.delete(`/orchids/${id}`).then(res => res.data);

    const apis = {
        getAuthors,
        getBanners,
        getAllOrchids,
        getOrchidById,
        getUsers,
        createOrchid,
        updateOrchid,
        deleteOrchid,
    };

    export default apis;
    ```

## 5. Cập nhật trên giao diện (Thao tác CRUD)

### 5.1. Tạo trang quản lý hoa lan
- Tạo một trang mới tại `src/pages/admin/orchids/index.jsx` để hiển thị component quản lý.
- Tạo component `OrchidManagement.jsx` tại `src/features/orchids/components/` để chứa logic và giao diện CRUD.

### 5.2. Chức năng đọc (Read)
-   Sử dụng `useEffect` để gọi hàm `getAllOrchids` từ `apis.js` khi component được mount.
-   Hiển thị danh sách hoa lan trong một bảng.

### 5.3. Chức năng tạo (Create)
-   Thêm nút "Add Orchid" để mở một modal.
-   Tạo component `OrchidForm.jsx` để làm form nhập liệu.
-   Khi người dùng submit form, gọi hàm `createOrchid` từ `apis.js`.

### 5.4. Chức năng cập nhật (Update)
-   Thêm nút "Edit" cho mỗi hoa lan trong bảng.
-   Khi nhấn nút "Edit", mở modal với form được điền sẵn thông tin của hoa lan đó.
-   Khi người dùng submit form, gọi hàm `updateOrchid` từ `apis.js`.

### 5.5. Chức năng xóa (Delete)
-   Thêm nút "Delete" cho mỗi hoa lan.
-   Sử dụng một modal xác nhận để tránh xóa nhầm.
-   Khi người dùng xác nhận, gọi hàm `deleteOrchid` từ `apis.js`.

## 6. Cập nhật `Router.jsx`

-   Thêm một route mới cho trang quản lý hoa lan và bảo vệ nó bằng `ProtectedRoute`.

```javascript
import { Routes, Route } from 'react-router-dom'
import About from './pages/about/index.jsx'
import Contact from './pages/contact/index.jsx'
import Home from './pages/home/index.jsx'
import OrchidDetail from './pages/orchid/index.jsx'
import Login from './pages/login/index.jsx'
import OrchidManagementPage from './pages/admin/orchids/index.jsx'
import ProtectedRoute from './features/authentication/ProtectedRoute.jsx'
import MainLayout from './components/layout/MainLayout.jsx'
import { PATHS } from './constants/paths.js'

function Router() {
    return (
        <Routes>
            <Route path={PATHS.LOGIN} element={<Login />} />
            <Route path={PATHS.HOME} element={
                <ProtectedRoute>
                    <MainLayout />
                </ProtectedRoute>
            }>
                <Route index element={<Home />} />
                <Route path={PATHS.ABOUT.substring(1)} element={<About />} />
                <Route path={PATHS.CONTACT.substring(1)} element={<Contact />} />
                <Route path={PATHS.ORCHID_DETAIL.substring(1)} element={<OrchidDetail />} />
                <Route path="admin/orchids" element={<OrchidManagementPage />} />
            </Route>
        </Routes>
    )
}
export default Router
```

## 7. Kết quả thực hiện CRUD

-   **Create:** Sau khi thêm một hoa lan mới qua modal, danh sách sẽ tự động cập nhật và hiển thị hoa lan mới.
-   **Read:** Dữ liệu hoa lan được tải từ `json-server` và hiển thị trong bảng.
-   **Update:** Sau khi chỉnh sửa thông tin của một hoa lan, dữ liệu trên bảng sẽ được cập nhật.
-   **Delete:** Sau khi xác nhận xóa, hoa lan sẽ biến mất khỏi danh sách.
