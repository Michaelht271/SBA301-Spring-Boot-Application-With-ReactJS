# API Documentation

## Base URL
`http://localhost:8081`

---

## Authentication Service

### 1. Get CSRF Token
- **Endpoint:** `GET /api/auth/csrf`
- **Description:** Retrieves a CSRF token necessary for certain state-changing operations (POST, PUT, DELETE).
- **Responses:**
    - `200 OK`:
        ```json
        {
            "token": "a-csrf-token-string"
        }
        ```

### 2. User Login
- **Endpoint:** `POST /login`
- **Description:** Authenticates a user with their credentials. This endpoint expects `application/x-www-form-urlencoded` content.
- **Request Body:** (Form Data)
    - `username`: (string) User's email or username.
    - `password`: (string) User's password.
- **Headers:**
    - `Content-Type`: `application/x-www-form-urlencoded`
    - `X-CSRF-TOKEN`: (string) CSRF token obtained from `GET /api/auth/csrf`.
- **Responses:**
    - `200 OK`:
        - (No direct response body, successful login is indicated by session cookie and subsequent `GET /api/auth/me` call for user details.)
    - `401 Unauthorized`:
        - `Error: Login failed`
        - Or a specific error message from the backend.

### 3. User Logout
- **Endpoint:** `POST /logout`
- **Description:** Logs out the current authenticated user.
- **Headers:**
    - `X-CSRF-TOKEN`: (string) CSRF token obtained from `GET /api/auth/csrf`.
- **Responses:**
    - `200 OK`:
        - (No specific response body)
    - `401 Unauthorized`:
        - If the user is not authenticated.

### 4. Get Current User
- **Endpoint:** `GET /api/auth/me`
- **Description:** Retrieves the details of the currently authenticated user.
- **Responses:**
    - `200 OK`:
        ```json
        {
            "id": 1,
            "email": "user@example.com",
            "firstName": "John",
            "lastName": "Doe",
            "roles": ["ROLE_USER"],
            // ... other user-specific fields
        }
        ```
        (Note: The exact structure of the user object is inferred and may vary.)
    - `401 Unauthorized`:
        - If no user is authenticated or the session has expired. Returns `null` on the client side.

---

## Category Service

### Base Endpoint
`/categories`

### 1. Get All Categories
- **Endpoint:** `GET /categories`
- **Description:** Retrieves a list of all available categories.
- **Responses:**
    - `200 OK`:
        ```json
        [
            {
                "id": 1,
                "name": "Technology",
                "description": "News related to technology."
            },
            {
                "id": 2,
                "name": "Sports",
                "description": "Latest sports updates."
            }
        ]
        ```
        (Note: The exact structure of a category object is inferred and may vary.)

### 2. Get Category by ID
- **Endpoint:** `GET /categories/{id}`
- **Description:** Retrieves a single category by its unique ID.
- **Path Parameters:**
    - `id`: (number) The unique identifier of the category.
- **Responses:**
    - `200 OK`:
        ```json
        {
            "id": 1,
            "name": "Technology",
            "description": "News related to technology."
        }
        ```
    - `404 Not Found`:
        - If no category with the given ID exists.

### 3. Create New Category
- **Endpoint:** `POST /categories`
- **Description:** Creates a new category.
- **Request Body:** (JSON)
    ```json
    {
        "name": "New Category Name",
        "description": "Description of the new category."
    }
    ```
    (Note: The exact fields required in the request body are inferred and may vary.)
- **Responses:**
    - `201 Created`:
        - Returns the newly created category object, including its assigned ID.
    - `400 Bad Request`:
        - If the request body is invalid or missing required fields.

### 4. Update Category
- **Endpoint:** `PUT /categories/{id}`
- **Description:** Updates an existing category identified by its ID.
- **Path Parameters:**
    - `id`: (number) The unique identifier of the category to update.
- **Request Body:** (JSON)
    ```json
    {
        "name": "Updated Category Name",
        "description": "Updated description of the category."
    }
    ```
    (Note: The exact fields that can be updated are inferred and may vary.)
- **Responses:**
    - `200 OK`:
        - Returns the updated category object.
    - `400 Bad Request`:
        - If the request body is invalid.
    - `404 Not Found`:
        - If no category with the given ID exists.

### 5. Delete Category
- **Endpoint:** `DELETE /categories/{id}`
- **Description:** Deletes a category by its unique ID.
- **Path Parameters:**
    - `id`: (number) The unique identifier of the category to delete.
- **Responses:**
    - `204 No Content`:
        - If the category was successfully deleted.
    - `404 Not Found`:
        - If no category with the given ID exists.

---

## News Service

### Base Endpoint
`/news`

### 1. Get All News Articles
- **Endpoint:** `GET /news`
- **Description:** Retrieves a list of all news articles.
- **Responses:**
    - `200 OK`:
        ```json
        [
            {
                "id": 101,
                "title": "Breaking News: New Tech Released",
                "content": "Lorem ipsum dolor sit amet...",
                "categoryId": 1,
                "authorId": 1,
                "createdAt": "2023-01-15T10:00:00Z"
            },
            {
                "id": 102,
                "title": "Local Sports Event",
                "content": "Consectetur adipiscing elit...",
                "categoryId": 2,
                "authorId": 2,
                "createdAt": "2023-01-14T15:30:00Z"
            }
        ]
        ```
        (Note: The exact structure of a news object is inferred and may vary.)

### 2. Get News Article by ID
- **Endpoint:** `GET /news/{id}`
- **Description:** Retrieves a single news article by its unique ID.
- **Path Parameters:**
    - `id`: (number) The unique identifier of the news article.
- **Responses:**
    - `200 OK`:
        ```json
        {
            "id": 101,
            "title": "Breaking News: New Tech Released",
            "content": "Lorem ipsum dolor sit amet...",
            "categoryId": 1,
            "authorId": 1,
            "createdAt": "2023-01-15T10:00:00Z"
        }
        ```
    - `404 Not Found`:
        - If no news article with the given ID exists.

### 3. Create New News Article
- **Endpoint:** `POST /news`
- **Description:** Creates a new news article.
- **Request Body:** (JSON)
    ```json
    {
        "title": "New Article Title",
        "content": "Content of the new article.",
        "categoryId": 1,
        // ... other fields like authorId, etc.
    }
    ```
    (Note: The exact fields required in the request body are inferred and may vary.)
- **Responses:**
    - `201 Created`:
        - Returns the newly created news article object, including its assigned ID.
    - `400 Bad Request`:
        - If the request body is invalid or missing required fields.

### 4. Update News Article
- **Endpoint:** `PUT /news/{id}`
- **Description:** Updates an existing news article identified by its ID.
- **Path Parameters:**
    - `id`: (number) The unique identifier of the news article to update.
- **Request Body:** (JSON)
    ```json
    {
        "title": "Updated Article Title",
        "content": "Updated content of the article.",
        "categoryId": 2
    }
    ```
    (Note: The exact fields that can be updated are inferred and may vary.)
- **Responses:**
    - `200 OK`:
        - Returns the updated news article object.
    - `400 Bad Request`:
        - If the request body is invalid.
    - `404 Not Found`:
        - If no news article with the given ID exists.

### 5. Delete News Article
- **Endpoint:** `DELETE /news/{id}`
- **Description:** Deletes a news article by its unique ID.
- **Path Parameters:**
    - `id`: (number) The unique identifier of the news article to delete.
- **Responses:**
    - `204 No Content`:
        - If the news article was successfully deleted.
    - `404 Not Found`:
        - If no news article with the given ID exists.

---

## User Service

### Base Endpoint
`/users`

### 1. Get All Users
- **Endpoint:** `GET /users`
- **Description:** Retrieves a list of all registered users.
- **Responses:**
    - `200 OK`:
        ```json
        [
            {
                "id": 1,
                "email": "user1@example.com",
                "firstName": "Alice",
                "lastName": "Smith",
                "roles": ["ROLE_USER"]
            },
            {
                "id": 2,
                "email": "admin@example.com",
                "firstName": "Bob",
                "lastName": "Johnson",
                "roles": ["ROLE_ADMIN"]
            }
        ]
        ```
        (Note: The exact structure of a user object is inferred and may vary.)

### 2. Get User by ID
- **Endpoint:** `GET /users/{id}`
- **Description:** Retrieves a single user by their unique ID.
- **Path Parameters:**
    - `id`: (number) The unique identifier of the user.
- **Responses:**
    - `200 OK`:
        ```json
        {
            "id": 1,
            "email": "user1@example.com",
            "firstName": "Alice",
            "lastName": "Smith",
            "roles": ["ROLE_USER"]
        }
        ```
    - `404 Not Found`:
        - If no user with the given ID exists.

### 3. Create New User
- **Endpoint:** `POST /users`
- **Description:** Creates a new user account.
- **Request Body:** (JSON)
    ```json
    {
        "email": "newuser@example.com",
        "password": "securepassword",
        "firstName": "New",
        "lastName": "User",
        "roles": ["ROLE_USER"]
    }
    ```
    (Note: The exact fields required in the request body are inferred and may vary, especially for roles and password handling.)
- **Responses:**
    - `201 Created`:
        - Returns the newly created user object, including its assigned ID.
    - `400 Bad Request`:
        - If the request body is invalid, e.g., email already exists, or missing required fields.

### 4. Update User
- **Endpoint:** `PUT /users/{id}`
- **Description:** Updates an existing user identified by their ID.
- **Path Parameters:**
    - `id`: (number) The unique identifier of the user to update.
- **Request Body:** (JSON)
    ```json
    {
        "email": "updateduser@example.com",
        "firstName": "Updated",
        "lastName": "Name",
        "roles": ["ROLE_USER", "ROLE_EDITOR"]
    }
    ```
    (Note: Password updates might be handled separately or require current password for security.)
- **Responses:**
    - `200 OK`:
        - Returns the updated user object.
    - `400 Bad Request`:
        - If the request body is invalid.
    - `404 Not Found`:
        - If no user with the given ID exists.

### 5. Delete User
- **Endpoint:** `DELETE /users/{id}`
- **Description:** Deletes a user by their unique ID.
- **Path Parameters:**
    - `id`: (number) The unique identifier of the user to delete.
- **Responses:**
    - `204 No Content`:
        - If the user was successfully deleted.
    - `404 Not Found`:
        - If no user with the given ID exists.