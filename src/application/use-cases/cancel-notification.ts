import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { NotificationNotFound } from './errors/notifications-not-found-error';

interface CancelNotificationRequest {
  notificationId: string;
}
type CancelNotificationResponse = void;

@Injectable()
export class CancelNotification {
  constructor(private noticiationsRepository: NotificationsRepository) {}

  async execute(
    request: CancelNotificationRequest,
  ): Promise<CancelNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.noticiationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.cancel();

    await this.noticiationsRepository.save(notification);
  }
}
