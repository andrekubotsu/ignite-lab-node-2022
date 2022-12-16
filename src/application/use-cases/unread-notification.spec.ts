import { Notification } from '@application/entities/notification';
import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notifications-not-found-error';
import { UnreadNotification } from './unread-notification';

describe('Unread notification', () => {
  it('should unread to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    const notification = new Notification(
      makeNotification({
        readAt: new Date(),
      }),
    );

    notificationsRepository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not unread to cancel a notification when it does not exists', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    expect(
      async () =>
        await unreadNotification.execute({
          notificationId: 'fake-notification-id',
        }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
