# HƯỚNG DẪN CHI TIẾT: CÁC BƯỚC THỰC HIỆN DỰ ÁN NMS

**Tên dự án**: News Management System (NMS)  
**Khóa lớp**: SBA301  
**Sinh viên**: Nguyễn Văn An - 18D04  

---

## PHẦN 1: CHUẨN BỊ MÔIQI TRƯỜNG

### Bước 1.1: Cài đặt Node.js và npm

```bash
# Kiểm tra version Node.js (yêu cầu v16+)
node --version

# Kiểm tra version npm
npm --version
```

### Bước 1.2: Tạo React Project với Vite

```bash
# Tạo dự án mới
npm create vite@latest A1nguyenvanan-18d04 -- --template react

# Vào thư mục dự án
cd A1nguyenvanan-18d04

# Cài đặt dependencies
npm install
```

### Bước 1.3: Cài đặt các package cần thiết

```bash
# React Router để routing
npm install react-router-dom

# Bootstrap components
npm install react-bootstrap bootstrap

# HTTP client
npm install axios

# Toast notification
npm install react-toastify

# Icon library (tùy chọn)
npm install react-icons
```

---

## PHẦN 2: PHÂN TÍCH YÊU CẦU VÀ THIẾT KẾ

### Bước 2.1: Phân tích Database Schema

**Bảng chính cần có**:
1. SystemAccount (Tài khoản)
2. Category (Danh mục)
3. NewsArticle (Bài viết)
4. Tags (Thẻ)
5. NewsTags (Liên kết bài viết - thẻ)

### Bước 2.2: Thiết kế Component Structure

```
App
├── AppRouter
│   ├── LoginPage (Public)
│   ├── ProtectedRoute
│   │   └── AdminLayout
│   │       ├── Header
│   │       ├── Sidebar
│   │       ├── Main Routes
│   │       │   ├── DashboardPage
│   │       │   ├── CategoryManagementPage
│   │       │   ├── NewsManagementPage
│   │       │   ├── UserManagementPage
│   │       │   └── SettingsPage
│   │       └── Footer
│   └── PublicNewsPage
```

### Bước 2.3: Lập kế hoạch thực hiện

**Tuần 1-2**: Setup dự án, tạo Layout  
**Tuần 3**: Xây dựng tính năng Authentication  
**Tuần 4**: Quản lý Category CRUD  
**Tuần 5**: Quản lý News CRUD  
**Tuần 6**: Quản lý Users CRUD  
**Tuần 7**: Testing và Fix bug  
**Tuần 8**: Tối ưu hóa và hoàn thiện  

---

## PHẦN 3: PHÁT TRIỂN DỰ ÁN

### Bước 3.1: Tạo cấu trúc thư mục

```bash
# Tạo các thư mục chính
mkdir -p src/components
mkdir -p src/features/{auth,categories,dashboard,news,users}
mkdir -p src/layouts/AdminLayout
mkdir -p src/pages/{auth,category,news,users,public,setting}
mkdir -p src/router
mkdir -p src/services
mkdir -p src/assets

# Tạo các thư mục con
mkdir -p src/features/auth/components
mkdir -p src/features/categories/components
mkdir -p src/features/news/components
mkdir -p src/features/users/components
mkdir -p src/features/dashboard/pages
```

### Bước 3.2: Tạo Service Layer (Lớp gọi API)

**File: src/services/apiClient.js**
```javascript
import axios from 'axios';
import authService from './authService';

const API_USE_COOKIES = false;
const TOKEN_PREFIX = 'Bearer ';

const apiClient = axios.create({
    baseURL: 'http://localhost:8081',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    async (config) => {
        config.headers = config.headers || {};
        const token = authService.getToken();
        if (token) {
            config.headers['Authorization'] = TOKEN_PREFIX + token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default apiClient;
```

**File: src/services/authService.js**
```javascript
import apiClient from './apiClient';

const AUTH_ENDPOINT = '/api/auth';

const authService = {
    login: async (email, password) => {
        const response = await apiClient.post(`${AUTH_ENDPOINT}/login`, {
            email,
            password,
        });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getToken: () => localStorage.getItem('token'),

    getUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    isAuthenticated: () => !!localStorage.getItem('token'),
};

export default authService;
```

**File: src/services/categoryService.js**
```javascript
import apiClient from './apiClient';

const API_ENDPOINT = '/api/categories';

const categoryService = {
    getAll: async () => {
        const response = await apiClient.get(API_ENDPOINT);
        return response.data;
    },

    getById: async (id) => {
        const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
        return response.data;
    },

    create: async (categoryData) => {
        const response = await apiClient.post(API_ENDPOINT, categoryData);
        return response.data;
    },

    update: async (id, categoryData) => {
        const response = await apiClient.put(
            `${API_ENDPOINT}/${id}`,
            categoryData
        );
        return response.data;
    },

    remove: async (id) => {
        const response = await apiClient.delete(`${API_ENDPOINT}/${id}`);
        return response.data;
    },
};

export default categoryService;
```

**Tương tự**: Tạo `newsService.js` và `userService.js` theo pattern trên

### Bước 3.3: Tạo Components tái sử dụng

**File: src/components/ConfirmModal.jsx**
```javascript
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmModal = ({ show, title, message, onConfirm, onCancel }) => {
    return (
        <Modal show={show} onHide={onCancel} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={onConfirm}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmModal;
```

### Bước 3.4: Tạo Login Page

**File: src/pages/auth/LoginPage.jsx**
```javascript
import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoginForm from '../../features/auth/components/LoginForm';
import authService from '../../services/authService';

const LoginPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogin = async (email, password) => {
        setLoading(true);
        try {
            await authService.login(email, password);
            toast.success('Login successful!');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" 
                   style={{ minHeight: '100vh' }}>
            <Row className="w-100">
                <Col md={6} className="mx-auto">
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">
                                FU News Management System
                            </h2>
                            <LoginForm 
                                onLoginSuccess={handleLogin}
                                loading={loading}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;
```

**File: src/features/auth/components/LoginForm.jsx**
```javascript
import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';

const LoginForm = ({ onLoginSuccess, loading }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validated, setValidated] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
        } else {
            onLoginSuccess(email, password);
        }
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Please provide a valid email.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Please provide a password.
                </Form.Control.Feedback>
            </Form.Group>

            <Button 
                variant="primary" 
                type="submit" 
                className="w-100"
                disabled={loading}
            >
                {loading && <Spinner size="sm" className="me-2" />}
                Login
            </Button>
        </Form>
    );
};

export default LoginForm;
```

### Bước 3.5: Tạo Layout chính

**File: src/layouts/AdminLayout/AdminLayout.jsx**
```javascript
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import './AdminLayout.css';

const AdminLayout = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className="flex-grow-1">
                <Container fluid>
                    <Row>
                        <Col md={2}>
                            <Sidebar />
                        </Col>
                        <Col md={10}>
                            <Outlet />
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </div>
    );
};

export default AdminLayout;
```

**File: src/layouts/AdminLayout/Header.jsx**
```javascript
import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

const Header = () => {
    const navigate = useNavigate();
    const user = authService.getUser();

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    return (
        <Navbar bg="dark" variant="dark" className="mb-4">
            <Navbar.Brand href="/dashboard">
                FU News Management
            </Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    <span className="text-white me-3">
                        Hello, {user?.accountName}
                    </span>
                    <Button 
                        variant="outline-light" 
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;
```

**File: src/layouts/AdminLayout/Sidebar.jsx**
```javascript
import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <Nav className="flex-column">
            <Nav.Link as={Link} to="/dashboard">
                Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/categories">
                Categories
            </Nav.Link>
            <Nav.Link as={Link} to="/news">
                News
            </Nav.Link>
            <Nav.Link as={Link} to="/users">
                Users
            </Nav.Link>
            <Nav.Link as={Link} to="/settings">
                Settings
            </Nav.Link>
        </Nav>
    );
};

export default Sidebar;
```

**File: src/layouts/AdminLayout/Footer.jsx**
```javascript
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark text-white text-center py-3 mt-4">
            <p>&copy; 2026 FU News Management System. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
```

### Bước 3.6: Tạo Router

**File: src/router/ProtectedRoute.jsx**
```javascript
import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

const ProtectedRoute = ({ element }) => {
    return authService.isAuthenticated() ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
```

**File: src/router/AppRouter.jsx**
```javascript
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import AdminLayout from '../layouts/AdminLayout/AdminLayout';
import ProtectedRoute from './ProtectedRoute';
import DashboardPage from '../features/dashboard/pages/DashboardPage';
import CategoryManagementPage from '../pages/category/CategoryManagementPage';
import NewsManagementPage from '../pages/news/NewsManagementPage';
import UserManagementPage from '../pages/users/UserManagementPage';
import SettingsPage from '../pages/setting/SettingsPage';
import PublicNewsPage from '../pages/public/PublicNewsPage';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/public-news" element={<PublicNewsPage />} />

                {/* Protected Routes */}
                <Route 
                    element={<ProtectedRoute element={<AdminLayout />} />}
                >
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/categories" 
                           element={<CategoryManagementPage />} 
                    />
                    <Route path="/news" element={<NewsManagementPage />} />
                    <Route path="/users" element={<UserManagementPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                </Route>

                {/* Default Route */}
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
```

### Bước 3.7: Tạo Pages và Components CRUD

**File: src/pages/category/CategoryManagementPage.jsx**
```javascript
import React, { useState, useEffect } from 'react';
import { Button, Modal, FormControl, InputGroup, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import CategoryForm from '../../features/categories/components/CategoryForm';
import CategoryTable from '../../features/categories/components/CategoryTable';
import categoryService from '../../services/categoryService';

const CategoryManagementPage = () => {
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const data = await categoryService.getAll();
            setCategoryList(data);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            toast.error('Failed to fetch categories.');
        } finally {
            setLoading(false);
        }
    };

    const handleShowModal = (category = null) => {
        setCurrentCategory(category);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentCategory(null);
    };

    const handleSaveCategory = async (category) => {
        try {
            if (category.id) {
                await categoryService.update(category.id, category);
                toast.success('Category updated successfully!');
            } else {
                await categoryService.create(category);
                toast.success('Category created successfully!');
            }
            fetchCategories();
        } catch (error) {
            console.error('Failed to save category:', error);
            toast.error('Failed to save category.');
        }
        handleCloseModal();
    };

    const handleDeleteCategory = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await categoryService.remove(id);
                toast.success('Category deleted successfully!');
                fetchCategories();
            } catch (error) {
                console.error('Failed to delete category:', error);
                toast.error('Failed to delete category.');
            }
        }
    };

    const filteredCategories = categoryList.filter((cat) =>
        cat.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1 className="mb-4">Category Management</h1>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <Button 
                    variant="primary" 
                    onClick={() => handleShowModal(null)}
                >
                    Add New Category
                </Button>
                <InputGroup className="w-25">
                    <FormControl
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </InputGroup>
            </div>

            {loading ? (
                <div className="text-center mt-5">
                    <Spinner animation="border" />
                </div>
            ) : (
                <CategoryTable
                    categoryList={filteredCategories}
                    onEdit={handleShowModal}
                    onDelete={handleDeleteCategory}
                />
            )}

            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        {currentCategory ? 'Edit Category' : 'Add Category'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CategoryForm
                        category={currentCategory}
                        onSave={handleSaveCategory}
                        onCancel={handleCloseModal}
                    />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default CategoryManagementPage;
```

**Tương tự**: Tạo NewsManagementPage, UserManagementPage, DashboardPage

### Bước 3.8: Tạo Components Form và Table

**File: src/features/categories/components/CategoryForm.jsx**
```javascript
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const CategoryForm = ({ category, onSave, onCancel }) => {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        id: null,
        categoryName: '',
        categoryDescription: '',
        parentCategoryID: '',
        isActive: true,
    });

    useEffect(() => {
        if (category) {
            setFormData({
                id: category.id,
                categoryName: category.categoryName || '',
                categoryDescription: category.categoryDescription || '',
                parentCategoryID: category.parentCategoryID || '',
                isActive: category.isActive,
            });
        } else {
            setFormData({
                id: null,
                categoryName: '',
                categoryDescription: '',
                parentCategoryID: '',
                isActive: true,
            });
        }
        setValidated(false);
    }, [category]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            const dataToSend = {
                ...formData,
                parentCategoryID: 
                    formData.parentCategoryID === '' 
                        ? null 
                        : Number(formData.parentCategoryID),
            };
            onSave(dataToSend);
        }
        setValidated(true);
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                    type="text"
                    name="categoryName"
                    value={formData.categoryName}
                    onChange={handleChange}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Please provide a category name.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Category Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    name="categoryDescription"
                    value={formData.categoryDescription}
                    onChange={handleChange}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Please provide a description.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Parent Category ID</Form.Label>
                <Form.Control
                    type="number"
                    name="parentCategoryID"
                    value={formData.parentCategoryID}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Check
                    type="switch"
                    id="is-active-switch"
                    label="Active"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                />
            </Form.Group>

            <div className="d-flex justify-content-end">
                <Button 
                    variant="secondary" 
                    onClick={onCancel} 
                    className="me-2"
                >
                    Cancel
                </Button>
                <Button variant="primary" type="submit">
                    Save
                </Button>
            </div>
        </Form>
    );
};

export default CategoryForm;
```

**File: src/features/categories/components/CategoryTable.jsx**
```javascript
import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';

const CategoryTable = ({ categoryList, onEdit, onDelete }) => {
    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Parent ID</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {categoryList.map((category) => (
                    <tr key={category.id}>
                        <td>{category.id}</td>
                        <td>{category.categoryName}</td>
                        <td>{category.categoryDescription}</td>
                        <td>{category.parentCategoryID || 'None'}</td>
                        <td>
                            {category.isActive ? (
                                <Badge bg="success">Active</Badge>
                            ) : (
                                <Badge bg="secondary">Inactive</Badge>
                            )}
                        </td>
                        <td>
                            <Button 
                                variant="info" 
                                size="sm" 
                                className="me-2"
                                onClick={() => onEdit(category)}
                            >
                                Edit
                            </Button>
                            <Button 
                                variant="danger" 
                                size="sm"
                                onClick={() => onDelete(category.id)}
                            >
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default CategoryTable;
```

---

## PHẦN 4: TỐI ƯU HÓA VÀ TESTING

### Bước 4.1: Xử lý lỗi phổ biến

**Lỗi 1**: Missing Key in List
```javascript
// SAI ❌
{items.map((item, index) => (
    <div key={index}>{item.name}</div>
))}

// ĐÚNG ✅
{items.map((item) => (
    <div key={item.id}>{item.name}</div>
))}
```

**Lỗi 2**: State không được cập nhật khi edit
```javascript
// SAI ❌
const [formData] = useState({
    categoryId: null,  // Không nhất quán
    name: '',
});

// ĐÚNG ✅
const [formData, setFormData] = useState({
    id: null,  // Nhất quán
    name: '',
});
```

### Bước 4.2: Testing các chức năng

**Test Checklist**:
- [ ] Đăng nhập thành công
- [ ] Đăng xuất
- [ ] Tạo category mới
- [ ] Edit category (không tạo mới)
- [ ] Delete category (có confirm)
- [ ] Search category
- [ ] Tạo tin tức mới
- [ ] Edit tin tức
- [ ] Delete tin tức
- [ ] Thêm tags vào tin tức
- [ ] Hiển thị category name (mapping từ ID)
- [ ] Hiển thị author name
- [ ] Format ngày tháng
- [ ] Form validation
- [ ] Error handling

### Bước 4.3: Build cho production

```bash
# Build dự án
npm run build

# Preview build
npm run preview

# Deploy lên server
# (Tùy theo platform: Netlify, Vercel, GitHub Pages, etc.)
```

---

## PHẦN 5: CHẠY DEMO CUỐI CÙNG

### Bước 5.1: Chuẩn bị trước khi demo

```bash
# 1. Chắc chắn backend API chạy trên port 8081
# 2. Kiểm tra database có dữ liệu test

# 3. Start development server
npm run dev

# 4. Mở browser: http://localhost:5173
```

### Bước 5.2: Quy trình demo

**Demo cho Giáo viên**:

1. **Đăng nhập**
   - Sử dụng Email: admin@example.com, Password: password123
   - Hiển thị Dashboard

2. **Quản lý Category**
   - Add: Tạo category mới (Tech, Business, Sport)
   - Read: Hiển thị danh sách
   - Update: Edit tên category
   - Delete: Xoá category (có confirm)
   - Search: Tìm kiếm theo tên

3. **Quản lý News**
   - Add: Tạo tin tức mới
     - Chọn category
     - Thêm tags
     - Chọn status
   - Read: Hiển thị danh sách
     - Hiển thị category name
     - Hiển thị author name
     - Hiển thị tags
   - Update: Edit tin tức
   - Delete: Xoá tin tức
   - Search: Tìm kiếm

4. **Quản lý Users**
   - Add: Tạo user mới
   - Chọn role (Admin/Staff)
   - Edit user
   - Delete user

5. **UI/UX**
   - Layout responsive
   - Modal dialog
   - Form validation
   - Toast notification
   - Loading spinner

---

## PHẦN 6: CHEAT SHEET - NHỮNG KIẾN THỨC QUAN TRỌNG

### 6.1 React Hooks

```javascript
// useState - Quản lý state
const [count, setCount] = useState(0);

// useEffect - Side effect
useEffect(() => {
    console.log('Component mounted');
}, []);

// useContext - Chia sẻ state
const value = useContext(MyContext);

// useReducer - State phức tạp
const [state, dispatch] = useReducer(reducer, initialState);
```

### 6.2 React Router

```javascript
// Routing
<BrowserRouter>
    <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
</BrowserRouter>

// Navigate
const navigate = useNavigate();
navigate('/dashboard');

// Link
<Link to="/dashboard">Dashboard</Link>
```

### 6.3 Axios

```javascript
// GET
axios.get('/api/categories');

// POST
axios.post('/api/categories', { name: 'Tech' });

// PUT
axios.put('/api/categories/1', { name: 'Technology' });

// DELETE
axios.delete('/api/categories/1');
```

### 6.4 React Bootstrap

```javascript
// Button
<Button variant="primary">Click me</Button>

// Form
<Form>
    <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" />
    </Form.Group>
</Form>

// Modal
<Modal show={show}>
    <Modal.Body>Content</Modal.Body>
</Modal>

// Table
<Table striped bordered>
    <tbody>
        <tr>
            <td>Cell</td>
        </tr>
    </tbody>
</Table>
```

### 6.5 Form Validation

```javascript
const [validated, setValidated] = useState(false);

const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
    }
    setValidated(true);
};

// Form Control
<Form.Control required />
<Form.Control.Feedback type="invalid">
    Vui lòng điền trường này
</Form.Control.Feedback>
```

---

## PHẦN 7: Q&A - CÂU HỎI THƯỜNG GẶP

### Q1: Dữ liệu không cập nhật sau khi edit?
**A**: Kiểm tra:
- ID có được gửi trong request không?
- API endpoint PUT đúng chưa?
- Response từ API có chứa dữ liệu cập nhật không?
- Gọi fetchData() để refresh UI?

### Q2: Lỗi "Token is undefined"?
**A**: 
- Kiểm tra authService.getToken() có trả về token?
- Token được lưu trong localStorage?
- Request interceptor có thêm token vào header?

### Q3: Modal không hiển thị?
**A**:
- State show có đúng không?
- Có gọi setShowModal(true)?
- React Bootstrap modal code đúng?

### Q4: Form không validate?
**A**:
- Có set validated state?
- Form có Form.Control.Feedback type="invalid"?
- Field có required attribute?

### Q5: Tags không lưu?
**A**:
- Tags được thêm vào state array?
- Khi submit, tags có được gửi?
- Backend có xử lý tags relation?

---

## TÀI LIỆU THAM KHẢO

- React: https://react.dev
- React Router: https://reactrouter.com
- React Bootstrap: https://react-bootstrap.github.io
- Axios: https://axios-http.com
- React Toastify: https://fkhadra.github.io/react-toastify

---

**Chúc bạn thực hiện dự án thành công! 🎉**

*Tài liệu được cập nhật lần cuối: 04/02/2026*

