export interface Message{
    id:string,
    senderId:string,
    receiverId:string,
    content:string,
}

export class MessageModel implements Message{
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    constructor(id:string, senderId: string,receiverId: string,content:string){
        this.id = id;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.content = content;
    }
}