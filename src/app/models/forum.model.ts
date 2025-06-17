export interface Forum{
    id:string,
    name:string,
    comment:string,
}

export class ForumModel implements Forum {
  id: string;
  name: string;
  comment: string;

  constructor(id: string, name: string, comment: string) {
    this.id = id;
    this.name = name;
    this.comment = comment;
  }
}
