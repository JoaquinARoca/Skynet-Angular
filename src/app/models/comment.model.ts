export interface Comment {
    id:string;
    droneId: string;
    userId: string;
    text: string;
    rating: number;
    parentCommentId: string;
    createdAt: Date;
}

export class CommentModel implements Comment {
    id:string;
    droneId: string;
    userId: string;
    text: string;
    rating: number;
    parentCommentId: string;
    createdAt: Date;
    constructor(id: string,droneId:string,userId:string,text:string,rating:number,parentCommentId:string,createdAt:Date){
        this.id = id;
        this.droneId = droneId;
        this.userId = userId;
        this.text = text;
        this.rating = rating;
        this.parentCommentId = parentCommentId;
        this.createdAt = createdAt;
    }

}