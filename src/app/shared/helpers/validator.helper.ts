import { FormGroup, AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class CustomValidator {
  passwordMatch(key: string, confirmationKey: string): Function {
    return (group: FormGroup) => {
      const input: AbstractControl = group.controls[key];
      const confirmationInput: AbstractControl =
        group.controls[confirmationKey];
      if (input.value !== confirmationInput.value) {
        confirmationInput.setErrors({ NoPasswordMatch: true });
      }
    };
  }
}
