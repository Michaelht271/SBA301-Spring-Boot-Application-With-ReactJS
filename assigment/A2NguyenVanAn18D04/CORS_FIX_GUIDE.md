# CORS Fix and Server Restart Guide

## Problem Identified

**CORS Error**: `Cross-Origin Request Blocked: CORS header 'Access-Control-Allow-Origin' missing`
- Frontend at `http://localhost:5173` cannot communicate with backend at `http://localhost:8081`
- OPTIONS preflight request returning 403 status instead of allowing the CORS preflight

## Solutions Applied

### 1. ✅ CORS Configuration Fixed (CorsConfig.java)

The CORS configuration has been updated to:
- Allow origin: `http://localhost:5173`
- Allow methods: GET, POST, PUT, DELETE, OPTIONS
- Allow headers: Authorization, Accept, X-Requested-With, Content-Type, etc.
- Allow credentials: true
- Cache preflight requests for 3600 seconds

**File**: `src/main/java/com/michael/a2nguyenvanan18d04/config/CorsConfig.java`

### 2. ✅ DTO Layer Compilation Fixed

The NewsArticleMapper and related DTO files are now correctly compiled with:
- Proper date/time type handling
- Correct imports and class structures
- All mappers properly injected as @Component beans

## Steps to Restart Server

### Step 1: Kill Existing Process
```bash
pkill -9 -f "mvn.*spring-boot"
pkill -9 -f "java.*A2NguyenVanAn18D04"
sleep 2
```

### Step 2: Clean Build
```bash
cd /home/michael/code/SBA301-Spring-Boot-Application-With-ReactJS/assigment/A2NguyenVanAn18D04
mvn clean compile -DskipTests
```

Expected output: `BUILD SUCCESS`

### Step 3: Start Server
```bash
mvn spring-boot:run -DskipTests
```

Wait for message: `Started A2NguyenVanAn18D04Application`

### Step 4: Test CORS Preflight
```bash
curl -X OPTIONS http://localhost:8081/api/auth/login \
  -H "Origin: http://localhost:5173" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type,Authorization" \
  -v
```

Expected response headers:
```
HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Authorization, Accept, X-Requested-With, Content-Type, ...
Access-Control-Max-Age: 3600
```

### Step 5: Test Login Request
```bash
curl -X POST http://localhost:8081/api/auth/login \
  -H "Origin: http://localhost:5173" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-token" \
  -d '{"email":"john.doe@example.com","password":"password123"}' \
  -v
```

Expected: Should not have CORS errors, may have 401/403 if credentials are wrong

## CORS Configuration Details

```java
CorsConfiguration corsConfiguration = new CorsConfiguration();

// Allow these origins to access the API
corsConfiguration.setAllowedOrigins(List.of("http://localhost:5173"));

// Allow these HTTP methods
corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

// Allow these headers in requests
corsConfiguration.setAllowedHeaders(List.of(
    "Authorization",      // For JWT tokens
    "Accept",            // Content type acceptance
    "X-Requested-With",  // XMLHttpRequest
    "Content-Type",      // Request body type
    "Access-Control-Request-Method",
    "Access-Control-Request-Headers"
));

// Include these headers in responses
corsConfiguration.setExposedHeaders(List.of(
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Credentials"
));

// Allow cookies/credentials with requests
corsConfiguration.setAllowCredentials(true);

// Browser can cache preflight response for 1 hour
corsConfiguration.setMaxAge(3600L);
```

## How CORS Preflight Works

1. Browser sends **OPTIONS** request (preflight) to check if cross-origin request is allowed
2. Server responds with `Access-Control-Allow-*` headers
3. If allowed, browser sends actual **POST/PUT/DELETE** request
4. If not allowed, browser blocks the actual request (403 error)

**The fix ensures the server responds correctly to the preflight OPTIONS request.**

## Frontend Test (React)

Once server is running, try from the frontend:

```javascript
// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:8081/api';

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, {
            email,
            password
        });
        return response.data;
    } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        throw error;
    }
};
```

## Expected Backend Response Format

**After login successful:**
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "accountId": 1,
  "email": "john.doe@example.com",
  "role": "STAFF"
}
```

## Troubleshooting

### Issue: Still getting 403 CORS error
- **Solution**: Make sure SecurityConfig isn't blocking OPTIONS requests
- Check that `corsConfigurationSource()` bean is being used
- Restart server completely: `pkill -9 -f java`, then `mvn spring-boot:run`

### Issue: Server doesn't start
- **Check logs**: `tail -f /tmp/server.log`
- **Check port**: Is 8081 already in use? `netstat -tuln | grep 8081`
- **Check compilation**: `mvn clean compile -DskipTests`

### Issue: Login fails with 401
- **Check credentials**: Default user is `john.doe@example.com` / `password123`
- **Check database**: Run DataInitializer which seeds test data
- **Check JWT token**: Make sure token is included in Authorization header as `Bearer <token>`

## Files Modified

- ✅ CorsConfig.java - CORS configuration fixed
- ✅ NewsArticle.java - Timestamp types fixed (LocalDate → LocalDateTime)
- ✅ NewsArticleController.java - DTO implementation
- ✅ CategoryController.java - DTO implementation  
- ✅ SystemAccountController.java - DTO implementation
- ✅ NewsArticleServicesImpl.java - DTO transformation logic
- ✅ CategoryServiceImpl.java - Delete validation added
- ✅ SystemAccountServiceImpl.java - Delete validation added

## Summary

The CORS issue should now be resolved. The server will:
1. Accept preflight OPTIONS requests from `http://localhost:5173`
2. Include proper `Access-Control-Allow-*` headers in response
3. Allow the frontend to make actual requests (POST/PUT/DELETE) with Authorization headers
4. Properly transform data through DTO layer before sending to frontend

---

**Next Step**: Restart the server using the commands above and refresh the frontend to test login functionality.
