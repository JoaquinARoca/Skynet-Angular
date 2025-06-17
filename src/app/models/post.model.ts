import { Comment } from './comment.model';

export interface Post {
  id: string;
  author: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  description?: string;
  location?: string;
  tags: string[];
  likes: string[];
  comments: Comment[];
  createdAt?: Date;
  updatedAt?: Date;
}

export class PostModel implements Post {
  id = '';
  author = '';
  mediaUrl = '';
  mediaType: 'image' | 'video' = 'image';
  description = '';
  location = '';
  tags: string[] = [];
  likes: string[] = [];
  comments: Comment[] = [];
  createdAt = new Date();
  updatedAt = new Date();

  constructor(data?: Partial<Post>) {
    Object.assign(this, data);
  }
}
