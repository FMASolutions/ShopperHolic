import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoadingSpinnerComponent } from 'src/app/components/generic/loading-spinner/loading-spinner.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {

  currentRef: MatDialogRef<LoadingSpinnerComponent>;
  private currentWindows: MatDialogRef<LoadingSpinnerComponent>[] = [];

  constructor(public matDialog: MatDialog) { }

  openNewSpinner(message: string) {
    let customDialogSettings = {
      width: "175px",
      disableClose: true,
      data: message
    }
    this.currentWindows.push(this.matDialog.open(LoadingSpinnerComponent, customDialogSettings));
  }

  closeAllSpinners() {
    if (this.currentWindows && this.currentWindows.length > 0) {
      this.currentWindows.forEach(current => {
        current.close();
      })
    }
  }

}