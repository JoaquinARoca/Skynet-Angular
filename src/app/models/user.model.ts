// Interfaz que describe la estructura del usuario
export interface User {
  id: string;
  name: string;
  age: number;
  email: string;
}

export class UserModel implements User {
  id: string;
  name: string;
  age: number;
  email: string;

  constructor(id: string, name: string, age: number, email: string) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.email = email;
  }
}
