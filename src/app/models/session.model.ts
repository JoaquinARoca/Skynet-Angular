export interface Participant {
  user: string;
  status: 'PENDING' | 'ACCEPTED';
}

export interface Session {
  id: string;
  scenario: any[];
  mode: string;
  host: string;
  participants: Participant[];
  state: 'WAITING' | 'RUNNING' | 'ENDED';
  createdAt: Date;
}

export class SessionModel implements Session {
  id = '';
  scenario: any[] = [];
  mode = '';
  host = '';
  participants: Participant[] = [];
  state: 'WAITING' | 'RUNNING' | 'ENDED' = 'WAITING';
  createdAt = new Date();

  constructor(data?: Partial<Session>) {
    Object.assign(this, data);
  }
}
