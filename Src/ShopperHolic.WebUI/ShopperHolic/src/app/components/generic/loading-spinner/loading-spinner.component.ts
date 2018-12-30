import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { LoadingSpinnerService } from 'src/app/services/generic/loading-spinner.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public messageData: any, public dialogRef: MatDialogRef<LoadingSpinnerComponent>) { }

  getLoadingMessage(): string { return this.messageData; }
  
  ngOnInit() {
  }

}
