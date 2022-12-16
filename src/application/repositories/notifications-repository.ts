import { Notification } from '../entitites/notification';

export abstract class NotificationsRepository {
  abstract create(notificaion: Notification): Promise<void>;
}
