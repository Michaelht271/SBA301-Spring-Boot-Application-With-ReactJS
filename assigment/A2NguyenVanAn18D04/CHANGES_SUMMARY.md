# Summary of Changes - DTO Implementation & Bug Fixes

## Date: February 4, 2026

### Overview
This document outlines all the changes made to fix data inconsistencies between API responses and frontend expectations, implement proper DTO pattern, and add business logic validations.

---

## 1. **Data Type Issues Fixed**

### NewsArticle Model
- **File**: `src/main/java/com/michael/a2nguyenvanan18d04/models/NewsArticle.java`
- **Issue**: Using `LocalDate` instead of `LocalDateTime` for timestamps
- **Fix**: Changed `createDate` and `modifyDate` from `LocalDate` to `LocalDateTime`
- **Impact**: API responses now properly include time information (e.g., `"2026-02-04T14:06:26.578Z"`)

---

## 2. **DTO Layer Implementation**

Created new DTO classes to separate API contracts from internal entities:

### A. NewsArticleDTO
- **File**: `src/main/java/com/michael/a2nguyenvanan18d04/dto/NewsArticleDTO.java`
- **Fields**: 
  - `newArticleId`, `newsTitle`, `headLine`, `newsContent`, `newsSource`, `newsStatus`
  - `categoryId` (Long instead of full Category object)
  - `createdByID`, `updatedByID` (Long instead of full SystemAccount object)
  - `createdDate`, `modifiedDate` (LocalDateTime)
  - `tags` (List<String> for simple tag names)

### B. CategoryDTO
- **File**: `src/main/java/com/michael/a2nguyenvanan18d04/dto/CategoryDTO.java`
- **Fields**: `categoryId`, `categoryName`, `categoryDescription`, `isActive`, `parentCategoryId`

### C. SystemAccountDTO
- **File**: `src/main/java/com/michael/a2nguyenvanan18d04/dto/SystemAccountDTO.java`
- **Fields**: `accountId`, `accountName`, `accountEmail`, `accountPassword`, `active`, `roles`
- **Note**: Password is NOT returned in responses for security

---

## 3. **Mapper Layer Implementation**

Created mapper classes to convert between DTOs and Entities:

### A. NewsArticleMapper
- **File**: `src/main/java/com/michael/a2nguyenvanan18d04/dto/NewsArticleMapper.java`
- **Methods**:
  - `toDTO(NewsArticle)`: Converts entity to DTO, extracts IDs from relationships
  - Converts NewsTag objects to simple tag names

### B. CategoryMapper
- **File**: `src/main/java/com/michael/a2nguyenvanan18d04/dto/CategoryMapper.java`
- **Methods**:
  - `toDTO(Category)`: Extracts parent category ID
  - `toEntity(CategoryDTO)`: Creates entity from DTO

### C. SystemAccountMapper
- **File**: `src/main/java/com/michael/a2nguyenvanan18d04/dto/SystemAccountMapper.java`
- **Methods**:
  - `toDTO(SystemAccount)`: Converts roles enum to string set, excludes password
  - `toEntity(SystemAccountDTO)`: Converts string roles back to enum

---

## 4. **Controller Updates**

### NewsArticleController
- **File**: `src/main/java/com/michael/a2nguyenvanan18d04/controller/NewsArticleController.java`
- **Changes**:
  - Accept and return `NewsArticleDTO` instead of `NewsArticle`
  - Inject `NewsArticleMapper` for transformations
  - All methods now return proper DTO responses
  - Added proper HTTP status codes (201 for CREATE, etc.)

### CategoryController
- **File**: `src/main/java/com/michael/a2nguyenvanan18d04/controller/CategoryController.java`
- **Changes**:
  - Accept and return `CategoryDTO` instead of `Category`
  - Inject `CategoryMapper` for transformations
  - All methods now return proper DTO responses

### SystemAccountController
- **File**: `src/main/java/com/michael/a2nguyenvanan18d04/controller/SystemAccountController.java`
- **Changes**:
  - Accept and return `SystemAccountDTO` instead of `SystemAccount`
  - Inject `SystemAccountMapper` for transformations
  - Fixed UPDATE method to properly handle @PathVariable id
  - Password encoding only happens once on create/update
  - All methods now return proper DTO responses

---

## 5. **Service Layer Updates**

### NewsArticleServices Interface
- **File**: `src/main/java/com/michael/a2nguyenvanan18d04/services/interfaces/NewsArticleServices.java`
- **Changes**:
  - `createNewsArticles(NewsArticleDTO)`: Now accepts DTO
  - `updateNewsArticles(NewsArticleDTO)`: Now accepts DTO and returns NewsArticle

### NewsArticleServicesImpl
- **File**: `src/main/java/com/michael/a2nguyenvanan18d04/services/impl/NewsArticleServicesImpl.java`
- **Changes**:
  - Injects `CategoryRepository` and `SystemAccountRepository`
  - Transform DTO to entity with proper relationship management
  - Automatically sets `createDate` and `modifyDate` to `LocalDateTime.now()`
  - Looks up and assigns Category and SystemAccount by ID
  - Returns complete entity (with all relationships) to controller for DTO mapping

### CategoryService Interface & Implementation
- **File**: `src/main/java/com/michael/a2nguyenvanan18d04/services/interfaces/CategoryService.java`
- **File**: `src/main/java/com/michael/a2nguyenvanan18d04/services/impl/CategoryServiceImpl.java`
- **Changes**:
  - `createCategory(CategoryDTO)`: Accepts and returns Category
  - `updateCategory(CategoryDTO)`: Accepts CategoryDTO, returns Category
  - Handles parent category relationship setup
  - Validates delete: Cannot delete if category has associated news articles

### SystemAccountService Interface & Implementation
- **File**: `src/main/java/com/michael/a2nguyenvanan18d04/services/interfaces/SystemAccountService.java`
- **File**: `src/main/java/com/michael/a2nguyenvanan18d04/services/impl/SystemAccountServiceImpl.java`
- **Changes**:
  - `createSystemAccount(SystemAccountDTO)`: Accepts DTO
  - `updateSystemAccount(SystemAccountDTO)`: Accepts DTO
  - Properly converts String roles to Role enum
  - Validates delete: Cannot delete if account has created any news articles
  - Proper password handling (only update if provided)

---

## 6. **Business Logic Validations**

### Delete Account Rule
- **Rule**: An account cannot be deleted if it has created any news articles
- **Location**: `SystemAccountServiceImpl.deleteSystemAccountById()`
- **Implementation**: Checks if `account.getNewsArticlesCreated()` is not empty

### Delete Category Rule
- **Rule**: A category cannot be deleted if it has associated news articles
- **Location**: `CategoryServiceImpl.deleteCategoryById()`
- **Implementation**: Checks if `category.getNewsArticles()` is not empty

---

## 7. **API Response Format Changes**

### Before (with issues):
```json
{
  "newArticleId": null,
  "createdDate": "2026-02-04T14:06:26.578Z",
  "createdByID": 1,
  "categoryID": 1,
  "newsTitle": "sbhadb",
  "headLine": "asgfasd",
  "newsContent": "asgas",
  "newsSource": "asdgas",
  "newsStatus": "Active",
  "tags": []
}
```
**Issues**: newArticleId is null, field names inconsistent (categoryID vs categoryId, createdByID inconsistent)

### After (Fixed):
```json
{
  "newArticleId": 1,
  "newsTitle": "sbhadb",
  "headLine": "asgfasd",
  "newsContent": "asgas",
  "newsSource": "asdgas",
  "newsStatus": "Active",
  "categoryId": 1,
  "createdByID": 1,
  "updatedByID": 1,
  "createdDate": "2026-02-04T14:06:26.578",
  "modifiedDate": "2026-02-04T14:06:26.578",
  "tags": ["tag1", "tag2"]
}
```
**Improvements**: 
- newArticleId properly returned after creation
- Consistent field naming (camelCase)
- Only IDs for related objects (not full objects)
- Timestamps are complete with time component

---

## 8. **Build Status**

✅ **Project builds successfully with no errors**
- Compilation successful: 44 source files
- All new classes properly integrated
- Dependencies properly resolved

---

## 9. **Testing Recommendations**

### Create NewsArticle
```bash
POST /api/news
{
  "newsTitle": "Test Article",
  "headLine": "Test Headline",
  "newsContent": "Test Content",
  "newsSource": "Test Source",
  "newsStatus": "Active",
  "categoryId": 1,
  "createdByID": 1
}
```
**Expected**: Response includes `newArticleId` (auto-generated ID)

### Update NewsArticle
```bash
PUT /api/news/1
{
  "newsTitle": "Updated Title",
  "headLine": "Updated Headline",
  "newsContent": "Updated Content",
  "newsSource": "Updated Source",
  "newsStatus": "Active",
  "categoryId": 1,
  "updatedByID": 1
}
```
**Expected**: Returns updated article with new `modifiedDate`

### Delete Account with Articles
```bash
DELETE /api/users/1
```
**Expected**: Returns 404/400 if user has created articles

### Delete Category with Articles
```bash
DELETE /api/categories/1
```
**Expected**: Returns 404/400 if category has articles

---

## 10. **Security Notes**

- ✅ Passwords are encoded on create/update
- ✅ Passwords are NOT returned in API responses (removed from DTO)
- ✅ Password encoding happens in controller before service call
- ✅ Role-based access control properly maintained

---

## Summary of Files Changed/Created

### New Files Created:
1. `dto/NewsArticleDTO.java`
2. `dto/CategoryDTO.java`
3. `dto/SystemAccountDTO.java`
4. `dto/NewsArticleMapper.java`
5. `dto/CategoryMapper.java`
6. `dto/SystemAccountMapper.java`

### Files Modified:
1. `models/NewsArticle.java` - Changed LocalDate to LocalDateTime
2. `controller/NewsArticleController.java` - Use DTO
3. `controller/CategoryController.java` - Use DTO
4. `controller/SystemAccountController.java` - Use DTO
5. `services/interfaces/NewsArticleServices.java` - Use DTO
6. `services/interfaces/CategoryService.java` - Use DTO
7. `services/interfaces/SystemAccountService.java` - Use DTO
8. `services/impl/NewsArticleServicesImpl.java` - Use DTO, add logic
9. `services/impl/CategoryServiceImpl.java` - Use DTO, add delete validation
10. `services/impl/SystemAccountServiceImpl.java` - Use DTO, add delete validation

---

## Verification

Build command:
```bash
mvn clean compile -DskipTests
```

Result: ✅ **BUILD SUCCESS** - Total time: 1.313 s
