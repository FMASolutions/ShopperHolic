import { Component, OnInit, ViewChild } from '@angular/core';
import { CreditNotesComponent } from '../credit-notes.component';
import { CreditNoteService } from 'src/app/services/orderProcessing/credit-note.service';

@Component({
  selector: 'app-all-credit-notes',
  templateUrl: './all-credit-notes.component.html',
  styleUrls: ['./all-credit-notes.component.css']
})
export class AllCreditNotesComponent implements OnInit {

  @ViewChild(CreditNotesComponent) childCreditNotes;

  constructor(public service: CreditNoteService) { }

  ngOnInit() {
    setTimeout(() => {
      let obs = this.service.getAll().subscribe(modelResp => {
        this.childCreditNotes.refreshCreditNoteTableData(modelResp);
        obs.unsubscribe();
      })
    }, 1);
  }

}
