package com.jobmate.Chat_Service.mapper;

import com.jobmate.Chat_Service.dto.request.ChatMessageRequest;
import com.jobmate.Chat_Service.dto.response.ChatMessageResponse;
import com.jobmate.Chat_Service.entity.ChatMessage;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ChatMessageMapper {
    ChatMessage toChatMessage(ChatMessageRequest request);

    ChatMessageResponse toChatMessageResponse(ChatMessage chatMessage);
}
