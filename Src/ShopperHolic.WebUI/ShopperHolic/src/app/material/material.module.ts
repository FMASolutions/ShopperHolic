import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from "@angular/material";
import {MatSortModule} from '@angular/material/sort';
import {MatRadioModule} from '@angular/material/radio'

@NgModule({
  imports: [
    CommonModule,
    Material.MatToolbarModule,
    Material.MatGridListModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatRadioModule,
    Material.MatSelectModule,
    Material.MatCheckboxModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatButtonModule,
    Material.MatSnackBarModule,
    Material.MatTableModule,
    Material.MatIconModule,
    Material.MatPaginatorModule,
    MatSortModule,
    Material.MatDialogModule,
    Material.MatSidenavModule,
    Material.MatListModule,    
    Material.MatMenuModule,
    Material.MatBottomSheetModule,
    Material.MatProgressSpinnerModule,
    MatRadioModule,
  ],
  exports: [
    Material.MatToolbarModule,
    Material.MatGridListModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatRadioModule,
    Material.MatSelectModule,
    Material.MatCheckboxModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatButtonModule,
    Material.MatSnackBarModule,
    Material.MatTableModule,
    Material.MatIconModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
    Material.MatDialogModule,
    Material.MatSidenavModule,
    Material.MatListModule,
    Material.MatMenuModule,
    Material.MatBottomSheetModule,
    Material.MatProgressSpinnerModule,
    MatRadioModule
  ],
  declarations: []
})
export class MaterialModule { }
