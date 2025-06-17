export interface PurchaseOrSale {
  droneId: string;
  model: string;
  price: number;
  currency: string;
  images: string[];
  details: string;
  category: string;
  condition: string;
  location: string;
  contact: string;
  date: Date;
}

export interface User {
  id: string;
  userName: string;
  email: string;
  password: string;
  isDeleted: boolean;
  role: 'Administrador' | 'Usuario' | 'Empresa' | 'Gobierno';
  favorites: string[];
  following: string[];
  balance: { [currency: string]: number };
  purchases: PurchaseOrSale[];
  sales: PurchaseOrSale[];
}

export class UserModel implements User {
  id = '';
  userName = '';
  email = '';
  password = '';
  isDeleted = false;
  role: 'Administrador' | 'Usuario' | 'Empresa' | 'Gobierno' = 'Usuario';
  favorites: string[] = [];
  following: string[] = [];
  balance: { [currency: string]: number } = {};
  purchases: PurchaseOrSale[] = [];
  sales: PurchaseOrSale[] = [];

  constructor(data?: Partial<User>) {
    Object.assign(this, data);
  }
}
