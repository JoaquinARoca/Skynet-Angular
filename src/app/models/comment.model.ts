export interface Comment {
  id: string;
  droneId: string;
  userId: string;
  text: string;
  rating: number;
  parentCommentId: string | null;
  createdAt: Date;
}

export class CommentModel implements Comment {
  id = '';
  droneId = '';
  userId = '';
  text = '';
  rating = 0;
  parentCommentId: string | null = null;
  createdAt = new Date();

  constructor(data?: Partial<Comment>) {
    Object.assign(this, data);
  }
}
