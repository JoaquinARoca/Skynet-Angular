import { HttpClient } from '@angular/common/http';

import { UserService } from './user.service';
import { CommentService } from './comment.service';
import { DroneService } from './drones.services';
import { ForumService } from './forum.service';
import { NotificationService } from './notification.service';
import { OrderService } from './order.service';
import { PaymentService } from './payment.service';
import { PostService } from './post.service';
import { SessionService } from './session.service';

export const ServicioFactory: Record<string, (http: HttpClient) => any> = {
  users: (http) => new UserService(http),
  comments: (http) => new CommentService(http),
  drones: (http) => new DroneService(http),
  forum: (http) => new ForumService(http),
  notifications: (http) => new NotificationService(http),
  orders: (http) => new OrderService(http),
  payments: (http) => new PaymentService(http),
  posts: (http) => new PostService(http),
  sessions: (http) => new SessionService(http),
};
