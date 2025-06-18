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

import { MessageService } from './message.service';

export const ServicioFactory: Record<string, (http: HttpClient) => any> = {
  users: (http) => new UserService(http),
  drones: (http) => new DroneService(http),
  comment: (http) => new CommentService(http),
  forum: (http) => new ForumService(http),
  order: (http) => new OrderService(http),
  payment: (http) => new PaymentService(http),
  post: (http) => new PostService(http),
  notification: (http) => new NotificationService(http),
  session: (http) => new SessionService(http),
  messages: (http) => new MessageService(http) 
};
