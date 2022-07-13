import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidatorFn, Validators } from '@angular/forms';

export function PasswordValidation(): ValidatorFn {
  return (control: AbstractControl) => {
    const passwordValidationDirective = new PasswordValidationDirective();
    return passwordValidationDirective.validate(control); 
  }
}

@Directive({
  selector: '[passwordValidation]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordValidationDirective, multi: true }]

})

export class PasswordValidationDirective implements Validators {
  passwordsProhibidos = ['123','123456', 'qwerty', '123456789'];


  validate(control: import("@angular/forms").AbstractControl): import("@angular/forms").ValidationErrors  | null{
    const Password = <string>control.value;

    if (!Password) {null;}
    if (Password.length < 4) {null;}

    if (this.passwordsProhibidos.indexOf(Password) !== -1) {
      return { 'PasswordValidation': { 'message': 'Escoge un mejor password' } }
    }
    if (Password === Password.toLowerCase()) {
      return { 'PasswordValidation': { 'message': 'Tu password debe de contener mayusculas' } }
    }

    if (Password === Password.toUpperCase()) {
      return { 'PasswordValidation': { 'message': 'Tu password debe de contener minusculas' } }
    }

    if (!/\d/.test(Password)) {
      return { 'PasswordValidation': { 'message': 'Tu password debe incluir un caracter numerico' } }
    }

    return null;
  }

  constructor() { }

}
