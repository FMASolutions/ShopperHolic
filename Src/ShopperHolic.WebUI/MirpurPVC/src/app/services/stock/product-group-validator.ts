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
        if (control && control.value !== null && control.value !== undefined) {
            if (control.touched) {
                let currentValue: string = control.value;
                console.log(currentValue);
                if(currentValue === '' || currentValue == '' || currentValue == "" || currentValue === ""){
                    return {isError: true, failedMinLength: true}
                }
                if (currentValue.length > 7) {
                    return { isError: true, failedMaxLength: true };
                }
                //TODO Add Existing Code checks so we dont try to create a code that already exists....
            }
        }
        return null;
    }
}