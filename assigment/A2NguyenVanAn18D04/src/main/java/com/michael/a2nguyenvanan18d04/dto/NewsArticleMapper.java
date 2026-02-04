package com.michael.a2nguyenvanan18d04.dto;

import com.michael.a2nguyenvanan18d04.models.NewsArticle;
import com.michael.a2nguyenvanan18d04.models.NewsTag;
import com.michael.a2nguyenvanan18d04.models.Tag;
import org.springframework.stereotype.Component;


import java.util.List;


@Component
public class NewsArticleMapper {

    public NewsArticleDTO toDTO(NewsArticle newsArticle) {
        if (newsArticle == null) {
            return null;
        }
        
        NewsArticleDTO dto = new NewsArticleDTO();
        dto.setNewArticleId(newsArticle.getNewArticleId());
        dto.setNewsTitle(newsArticle.getNewsTitle());
        dto.setHeadLine(newsArticle.getHeadLine());
        dto.setNewsContent(newsArticle.getNewsContent());
        dto.setNewsSource(newsArticle.getNewsSource());
        dto.setNewsStatus(newsArticle.getNewsStatus());
        dto.setCategoryId(newsArticle.getCategory() != null ? newsArticle.getCategory().getCategoryId() : null);
        dto.setCreatedByID(newsArticle.getCreatedBy() != null ? newsArticle.getCreatedBy().getAccountId() : null);
        dto.setUpdatedByID(newsArticle.getUpdatedBy() != null ? newsArticle.getUpdatedBy().getAccountId() : null);
        dto.setCreatedDate(newsArticle.getCreateDate());
        dto.setModifiedDate(newsArticle.getModifyDate());
        
        // Convert tags
        if (newsArticle.getNewsTags() != null) {
            List<Tag> tagNames = newsArticle.getNewsTags().stream()
                                            .map(NewsTag::getTag)
                                            .toList();
            dto.setTags(tagNames);
        }
        
        return dto;
    }
}
