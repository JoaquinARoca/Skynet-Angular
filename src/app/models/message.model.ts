export interface Message {
  id?: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class MessageModel implements Message {
  constructor(
    public senderId: string,
    public receiverId: string,
    public content: string,
    public id?: string,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
