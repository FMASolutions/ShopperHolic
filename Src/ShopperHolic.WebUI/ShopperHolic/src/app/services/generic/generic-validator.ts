import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { visitSiblingRenderNodes } from '@angular/core/src/view/util';

@Injectable({
    providedIn: 'root'
})
export class GenericValidator {
    //Return null if validation successful.
    //Return an object with property isError : true
    public validateCodeForCreate(control: AbstractControl) {
        if (control) {
            if (control.value == null || control.value == "") {
                return { isError: true, failedPopulation: true }
            }
            let currentValue: string = control.value;
            if (currentValue.length < 2) {
                return { isError: true, failedMinLength: true }
            }
            if (currentValue.length > 7) {
                return { isError: true, failedMaxLength: true }
            }
        }
        return null;
    }

    public basicValidation(control: AbstractControl) {
        if (control) {
            if (control.value == null || control.value == "") {
                return { isError: true, failedPopulation: true }
            }
        }
        return null;
    }

    public minLength3(control: AbstractControl){
        if(control){
            if(control.value != null && control.value.length < 3)
                return { isError: true, failedMinLength: true}
        }

        return null;
    }
    
    public checkPasswords(group: FormGroup){
        let password = group.controls["password"].value;
        let confirmPassword = group.controls["confirmPassword"].value;
    
        return password === confirmPassword ? null : { isError:true, failedMatch: true}
      }
    
    public compareToUnitPrice(control: AbstractControl){
        //TODO Ensure orderitemunitpriceafter discount isn't less than the orderitemunit price
        //the orderitemunit price is actually the itemunitpriceaftermaxdiscount, used to make sure employees don't sell things too cheap while allowing
        //them the ability to give customers a discount. TP to the MAX!
        return null;
    }
}