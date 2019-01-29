import { Order } from './order';
import { OrderItem } from './orderItem';

export class OrderDetailed {
    header: Order = new Order();
    items: OrderItem[] = [];
}