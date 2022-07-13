import { Directive, Injectable } from '@angular/core';
import { NG_ASYNC_VALIDATORS } from '@angular/forms';
import { ApiService } from '../Compartir/api.service';

@Directive({
  selector: '[CorreoUnico]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: UsernameUnicoDirective, multi: true}]
})
export class UsernameUnicoDirective {

  constructor(private api: ApiService) { }

  
}

