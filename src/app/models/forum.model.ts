export interface Forum {
  id: string;
  name: string;
  comment: string;
}

export class ForumModel implements Forum {
  id = '';
  name = '';
  comment = '';

  constructor(data?: Partial<Forum>) {
    Object.assign(this, data);
  }
}
