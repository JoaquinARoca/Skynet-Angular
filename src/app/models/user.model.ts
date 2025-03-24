// Interfaz que describe la estructura del usuario
export interface IUser {
  id: number;
  name: string;
  age: number;
  email: string;
}

export class UserModel implements IUser {
  id: number;
  name: string;
  age: number;
  email: string;

  constructor(id: number, name: string, age: number, email: string) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.email = email;
  }
}
