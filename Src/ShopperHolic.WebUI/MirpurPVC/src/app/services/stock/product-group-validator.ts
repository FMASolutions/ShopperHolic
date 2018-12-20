import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})

export class ProductGroupValidator {
    //Return null if validation successful.
    //Return an object with property isError : true
    public validateCodeForCreate(control: AbstractControl) {
        console.log(control);
        if (control) {
            if (control.value == null || control.value == "") {
                return { isError: true, failedPopulation: true }
            }
            let currentValue: string = control.value;
            if (currentValue.length < 2) {
                return { isError: true, failedMinLength: true }
            }
            if(currentValue.length > 7){
                return { isError: true, failedMaxLength: true }
            }
            //TODO Add Existing Code checks so we dont try to create a code that already exists....
        }
        return null;
    }

    public basicValidation(control: AbstractControl){
        console.log(control);
        if (control) {
            if (control.value == null || control.value == "") {
                return { isError: true, failedPopulation: true }
            }
        }
        return null;
    }
}