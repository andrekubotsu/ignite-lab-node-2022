import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { NotificationNotFound } from './errors/notifications-not-found-error';

interface UnreadNotificationRequest {
  notificationId: string;
}
type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotification {
  constructor(private noticiationsRepository: NotificationsRepository) {}

  async execute(
    request: UnreadNotificationRequest,
  ): Promise<UnreadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.noticiationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.unread();

    await this.noticiationsRepository.save(notification);
  }
}
