import { CartItem } from './cart-item.model';

export type OrderStatus =
  | 'Confirmed'
  | 'Processing'
  | 'Shipped'
  | 'Delivered';

export interface Order {
  id: string;
  status: OrderStatus;
  createdAt: string;
  items: readonly CartItem[];
  total: number;
  deliveryName: string;
  deliveryAddress: string;
}
