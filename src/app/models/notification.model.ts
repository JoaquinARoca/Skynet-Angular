export interface Notification{
    id:string;
    to:string;
    from:string;
    type:string;
    post:string;
    read:boolean;
    createAt:Date;    
}

export class NotificationModel implements Notification{
    id:string;
    to:string;
    from:string;
    type:string;
    post:string;
    read:boolean;
    createAt:Date;
    constructor(id:string,to:string,from:string,type:string,post:string,read:boolean,createAt:Date){
        this.id = id;
        this.to = to;
        this.from = from;
        this.type = type;
        this.post = post;
        this.read = read;
        this.createAt = createAt;
    }
}