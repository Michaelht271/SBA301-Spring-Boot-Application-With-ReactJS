package com.michael.a2nguyenvanan18d04.dto;

import com.michael.a2nguyenvanan18d04.models.Tag;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NewsArticleDTO {
    private Long newArticleId;
    private String newsTitle;
    private String headLine;
    private String newsContent;
    private String newsSource;
    private String newsStatus;
    private Long categoryId;
    private Long createdByID;
    private Long updatedByID;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private List<Tag> tags  ;
}
