import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoadingSpinnerComponent } from 'src/app/components/generic/loading-spinner/loading-spinner.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {

  currentRef: MatDialogRef<LoadingSpinnerComponent>;
  constructor(public matDialog: MatDialog) { }

  showSpinner(message: string) {
    let customDialogSettings = {
      width: "175px",
      disableClose: true,
      data: message
    }

    this.currentRef = this.matDialog.open(LoadingSpinnerComponent, customDialogSettings);
  }

  hideSpinner() { if (this.currentRef) { this.currentRef.close(); } }
}
