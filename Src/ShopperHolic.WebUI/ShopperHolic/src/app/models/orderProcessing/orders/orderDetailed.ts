import { Order } from './order';
import { OrderItem } from './orderItem';
import { DeliveryNotePreview } from '../deliveryNotes/deliveryNotePreview';
import { InvoicePreview } from '../invoices/invoicePreview';

export class OrderDetailed {
    header: Order = new Order();
    items: OrderItem[] = [];
    deliveryNotes: DeliveryNotePreview[] = [];
    invoices: InvoicePreview[] = [];
}