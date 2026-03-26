package com.jobmate.Chat_Service.mapper;
import com.jobmate.Chat_Service.dto.response.ConversationResponse;
import com.jobmate.Chat_Service.entity.Conversation;
import org.mapstruct.Mapper;
@Mapper(componentModel = "spring")
public interface ConversationMapper {
    ConversationResponse toConversationResponse(Conversation conversation);
}
