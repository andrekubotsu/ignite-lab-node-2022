import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { NotificationNotFound } from './errors/notifications-not-found-error';

interface ReadNotificationRequest {
  notificationId: string;
}
type ReadNotificationResponse = void;

@Injectable()
export class ReadNotification {
  constructor(private noticiationsRepository: NotificationsRepository) {}

  async execute(
    request: ReadNotificationRequest,
  ): Promise<ReadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.noticiationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.read();

    await this.noticiationsRepository.save(notification);
  }
}
