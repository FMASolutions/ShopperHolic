import { Component, OnInit, ViewChild } from '@angular/core';
import { ReturnNotesComponent } from '../return-notes.component';
import { ReturnNoteService } from 'src/app/services/orderProcessing/return-note.service';

@Component({
  selector: 'app-all-return-notes',
  templateUrl: './all-return-notes.component.html',
  styleUrls: ['./all-return-notes.component.css']
})
export class AllReturnNotesComponent implements OnInit {

  @ViewChild(ReturnNotesComponent) childReturnNotes;

  constructor(public service: ReturnNoteService) { }

  ngOnInit() {
    setTimeout(() => {
      let obs = this.service.getAll().subscribe(modelResp => {
        this.childReturnNotes.refreshReturnNoteTableData(modelResp);
        obs.unsubscribe();
      })
    }, 1);
  }

}
