# FIX: NewsArticle Gắn Đúng Với SystemAccount - Bidirectional Relationship

## Vấn đề Ban Đầu
❌ Khi tạo news article, nó không được gắn đúng với SystemAccount  
❌ Vẫn có thể xóa user dù đã tạo bài báo  
❌ `systemAccount.newsArticlesCreated` list không được update

## Nguyên Nhân
Relationship giữa NewsArticle và SystemAccount là **bidirectional**:

```java
// SystemAccount.java
@OneToMany(mappedBy = "createdBy")
private List<NewsArticle> newsArticlesCreated;

// NewsArticle.java
@ManyToOne
private SystemAccount createdBy;
```

Khi chỉ set một chiều → Hibernate không tự động update chiều còn lại

## Giải Pháp - Thêm Helper Methods

### SystemAccount.java
Thêm 2 method để quản lý bidirectional relationship:

```java
// Thêm article được tạo bởi account này
public void addNewsArticleCreated(NewsArticle newsArticle) {
    if (this.newsArticlesCreated == null) {
        this.newsArticlesCreated = new ArrayList<>();
    }
    newsArticle.setCreatedBy(this);           // ← Set chiều 1
    this.newsArticlesCreated.add(newsArticle); // ← Update chiều 2
}

// Thêm article được update bởi account này
public void addNewsArticleUpdated(NewsArticle newsArticle) {
    if (this.newsArticlesUpdated == null) {
        this.newsArticlesUpdated = new ArrayList<>();
    }
    newsArticle.setUpdatedBy(this);            // ← Set chiều 1
    this.newsArticlesUpdated.add(newsArticle);  // ← Update chiều 2
}
```

### NewsArticleServicesImpl.java
Sử dụng method helper thay vì set trực tiếp:

**Trước:**
```java
Optional<SystemAccount> creator = systemAccountRepository.findById(createdByID);
creator.ifPresent(newsArticle::setCreatedBy);  // ❌ Chỉ set một chiều
```

**Sau:**
```java
systemAccountRepository.findById(createdByID)
    .ifPresent(account -> account.addNewsArticleCreated(newsArticle));  // ✅ Set cả 2 chiều
```

## Kết Quả
✅ NewsArticle được gắn đúng với SystemAccount  
✅ `systemAccount.newsArticlesCreated` được update tự động  
✅ **Điều kiện xóa user hoạt động chính xác** - không cho xóa nếu có bài báo  

## Test

### Tạo News Article
```bash
POST /api/news
{
  "newsTitle": "Test",
  "newsContent": "Content",
  "newsSource": "Source",
  "newsStatus": "Active",
  "categoryId": 1,
  "createdByID": 2
}
```

### Thử Xóa User
```bash
DELETE /api/users/2
```

**Kết quả:**
- ❌ HTTP 400/409 - Cannot delete (có bài báo)
- ✅ HTTP 204 - Success (không có bài báo)

---

**Status**: ✅ Fixed & Compiled Successfully
