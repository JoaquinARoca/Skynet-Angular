export interface Notification {
  id: string;
  to: string;
  from: string;
  type: 'like' | 'comment' | 'follow' | 'new_post';
  post?: string;
  read: boolean;
  createdAt: Date;
}

export class NotificationModel implements Notification {
  id = '';
  to = '';
  from = '';
  type: 'like' | 'comment' | 'follow' | 'new_post' = 'like';
  post = '';
  read = false;
  createdAt = new Date();

  constructor(data?: Partial<Notification>) {
    Object.assign(this, data);
  }
}
