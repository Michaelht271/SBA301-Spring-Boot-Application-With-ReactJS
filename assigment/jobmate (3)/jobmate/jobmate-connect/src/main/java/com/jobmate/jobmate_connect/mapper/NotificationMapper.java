package com.jobmate.jobmate_connect.mapper;

import com.jobmate.jobmate_connect.dto.request.notification.NotificationRequest;
import com.jobmate.jobmate_connect.dto.response.notification.NotificationResponse;
import com.jobmate.jobmate_connect.entity.Notification;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface NotificationMapper {

    Notification toNotification(NotificationRequest request);

    NotificationResponse toNotificationResponse(Notification notification);
}
