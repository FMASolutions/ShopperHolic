import { Component, OnInit, ViewChild } from '@angular/core';
import { DeliveryNoteService } from 'src/app/services/orderProcessing/delivery-note.service';
import { DeliveryNotesComponent } from '../delivery-notes.component';

@Component({
  selector: 'app-all-delivery-notes',
  templateUrl: './all-delivery-notes.component.html',
  styleUrls: ['./all-delivery-notes.component.css']
})
export class AllDeliveryNotesComponent implements OnInit {

  @ViewChild(DeliveryNotesComponent) childDeliveryNotes;

  constructor(public service: DeliveryNoteService) { }

  ngOnInit() {
    setTimeout(() => {
      let obs = this.service.getAll().subscribe(modelResp => {
        this.childDeliveryNotes.refreshDeliveryNoteTableData(modelResp);
        obs.unsubscribe();
      })
    }, 1);
  }
}
