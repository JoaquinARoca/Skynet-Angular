export interface Drone {
  id: string;
  ownerId: string;
  model: string;
  price: number;
  details?: string;
  category: 'venta' | 'alquiler';
  condition: 'nuevo' | 'usado';
  location: string;
  contact?: string;
  images: string[];
  createdAt: Date;
  status: 'actiu' | 'venut';
  ratings: any[];
  currency: 'EUR' | 'USD' | 'GBP' | 'JPY' | 'CHF' | 'CAD' | 'AUD' | 'CNY' | 'HKD' | 'NZD';
  buyerId?: string;
  stock: number;
}

export class DroneModel implements Drone {
  id = '';
  ownerId = '';
  model = '';
  price = 0;
  details = '';
  category: 'venta' | 'alquiler' = 'venta';
  condition: 'nuevo' | 'usado' = 'nuevo';
  location = '';
  contact = '';
  images: string[] = [];
  createdAt = new Date();
  status: 'actiu' | 'venut' = 'actiu';
  ratings: any[] = [];
  currency: 'EUR' | 'USD' | 'GBP' | 'JPY' | 'CHF' | 'CAD' | 'AUD' | 'CNY' | 'HKD' | 'NZD' = 'EUR';
  buyerId = '';
  stock = 1;

  constructor(data?: Partial<Drone>) {
    Object.assign(this, data);
  }
}
