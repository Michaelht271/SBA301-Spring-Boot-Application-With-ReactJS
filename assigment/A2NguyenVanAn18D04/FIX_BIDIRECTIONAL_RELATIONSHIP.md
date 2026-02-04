# Fix: Gắn NewsArticle với SystemAccount - Bidirectional Relationship

## Vấn đề
Khi tạo news article, nó chưa được gắn đúng với SystemAccount tương ứng, dẫn đến:
- **Điều kiện xóa user thất bại** - vì `newsArticlesCreated` list vẫn trống
- **Dữ liệu không nhất quán** - relationship chỉ được set một chiều

## Nguyên nhân
Relationship giữa NewsArticle và SystemAccount là **bidirectional (hai chiều)**:

```java
// Trong SystemAccount.java
@OneToMany(mappedBy = "createdBy")
private List<NewsArticle> newsArticlesCreated;

// Trong NewsArticle.java
@ManyToOne
private SystemAccount createdBy;
```

Khi tạo article, chỉ set `newsArticle.setCreatedBy(account)` mà không update `account.getNewsArticlesCreated().add(newsArticle)` → Hibernate chỉ lưu một chiều.

## Giải pháp
Luôn update **cả hai phía** của relationship (bidirectional):

### Trước (Sai)
```java
Optional<SystemAccount> creator = systemAccountRepository.findById(createdByID);
creator.ifPresent(newsArticle::setCreatedBy);  // Chỉ set một chiều
```

### Sau (Đúng)
```java
if (createdByID != null) {
    Optional<SystemAccount> creator = systemAccountRepository.findById(createdByID);
    if (creator.isPresent()) {
        SystemAccount account = creator.get();
        newsArticle.setCreatedBy(account);           // ← Chiều 1
        account.getNewsArticlesCreated().add(newsArticle);  // ← Chiều 2
    }
}
```

## Thay đổi
**File**: `NewsArticleServicesImpl.java`

### 1. createNewsArticles() method
- ✅ Thêm `account.getNewsArticlesCreated().add(newsArticle)`
- ✅ Đảm bảo cập nhật cả `createdBy` relationship

### 2. updateNewsArticles() method
- ✅ Thêm `account.getNewsArticlesUpdated().add(newsArticle)`
- ✅ Đảm bảo cập nhật cả `updatedBy` relationship

## Kết quả
Sau khi fix:
1. **NewsArticle được gắn đúng** với SystemAccount (createdBy)
2. **SystemAccount.newsArticlesCreated** sẽ chứa đầy đủ danh sách articles
3. **Điều kiện xóa user hoạt động chính xác** - không cho xóa nếu có bài báo

## Test
Sau khi update, hãy test:

```bash
# 1. Tạo news article
POST /api/news
{
  "newsTitle": "Test Article",
  "headLine": "Test",
  "newsContent": "Content",
  "newsSource": "Source",
  "newsStatus": "Active",
  "categoryId": 1,
  "createdByID": 2  // User ID
}

# 2. Thử xóa user này
DELETE /api/users/2

# Kết quả: 
# - HTTP 204: Thành công (nếu không có bài báo)
# - HTTP 400/409: Lỗi (nếu có bài báo) - "Cannot delete user with articles"
```

---

## Chi tiết Bidirectional Relationship

```
SystemAccount (1) ─── (Many) NewsArticles
     │
     ├─ newsArticlesCreated  (mappedBy = "createdBy")
     └─ newsArticlesUpdated  (mappedBy = "updatedBy")

NewsArticle (Many) ─── (1) SystemAccount
     │
     ├─ createdBy
     └─ updatedBy
```

**Quy tắc**: Luôn set cả **"many side"** (NewsArticle) và **"one side"** (SystemAccount) để Hibernate sync chính xác!

---

**Status**: ✅ Fixed & Compiled Successfully
