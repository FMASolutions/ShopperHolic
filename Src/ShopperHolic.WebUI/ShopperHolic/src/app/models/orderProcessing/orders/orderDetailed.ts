import { Order } from './order';
import { OrderItem } from './orderItem';
import { DeliveryNotePreview } from '../deliveryNotes/deliveryNotePreview';
import { InvoicePreview } from '../invoices/invoicePreview';
import { RMAPreview } from '../rmas/rmaPreview';
import { ReturnNotePreview } from '../returnNotes/returnNotePreview';
import { CreditNotePreview } from '../creditNotes/creditNotePreview';

export class OrderDetailed {
    header: Order = new Order();
    items: OrderItem[] = [];
    deliveryNotes: DeliveryNotePreview[] = [];
    invoices: InvoicePreview[] = [];
    rmas: RMAPreview[] = [];
    returnNotes: ReturnNotePreview[] = [];
    creditNotes: CreditNotePreview[] = [];
}