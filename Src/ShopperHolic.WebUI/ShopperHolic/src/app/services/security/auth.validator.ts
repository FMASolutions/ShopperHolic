import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})

export class AuthValidator {

    public ValidateUsername(control: AbstractControl) {
        if (control) {
            if (control.value == null || control.value == "") {
                return { isError: true, failedPopulation: true }
            }
            let currentValue: string = control.value;
            if (currentValue.length < 3) {
                return { isError: true, failedMinLength: true }
            }
        }
        return null; //Pass auth
    }

    public ValidatePassword(control: AbstractControl) {
        if (control) {
            if (control.value == null || control.value == "") {
                return { isError: true, failedPopulation: true }
            }
            let currentValue: string = control.value;
            if (currentValue.length < 5) {
                return { isError: true, failedMinLength: true }
            }
        }
        return null; //Pass auth
    }
}