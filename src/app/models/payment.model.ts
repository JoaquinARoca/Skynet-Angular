export interface Payment {
  id: string;
  orderId: string;
  userId: string;
  amount: number;
  status: 'pendiente' | 'completado' | 'fallido';
  createdAt: Date;
}

export class PaymentModel implements Payment {
  id = '';
  orderId = '';
  userId = '';
  amount = 0;
  status: 'pendiente' | 'completado' | 'fallido' = 'pendiente';
  createdAt = new Date();

  constructor(data?: Partial<Payment>) {
    Object.assign(this, data);
  }
}
