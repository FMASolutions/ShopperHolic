import { RMA } from './rma';
import { RMAItem } from './rmaItem';
import { ReturnNotePreview } from '../returnNotes/returnNotePreview';
import { CreditNotePreview } from '../creditNotes/creditNotePreview';

export class RMADetailed {
   header: RMA = new RMA();
   items: RMAItem[] = [];
   returnNotes: ReturnNotePreview[] = [];
   creditNotes: CreditNotePreview[] = [];
}