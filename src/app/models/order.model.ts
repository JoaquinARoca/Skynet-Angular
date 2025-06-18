export interface Order {
  id: string;
  droneId: string;
  buyerId: string;
  sellerId: string;
  status: 'pendiente' | 'enviado' | 'entregado';
  createdAt: Date;
}

export class OrderModel implements Order {
  id = '';
  droneId = '';
  buyerId = '';
  sellerId = '';
  status: 'pendiente' | 'enviado' | 'entregado' = 'pendiente';
  createdAt = new Date();

  constructor(data?: Partial<Order>) {
    Object.assign(this, data);
  }
}
