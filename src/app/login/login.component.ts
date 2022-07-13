import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Compartir/api.service';
import { Router } from '@angular/router';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidation } from '../validaciones/password-validation.directive';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm !: FormGroup;
  constructor(private api: ApiService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    ) { }

  routeRedirect = '';

  get Correo(){
    return this.loginForm.get('Correo');
  }

  get Password(){
    return this.loginForm.get('Password');
  }

 

  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      Correo: ['', {
        validators: [Validators.required],
        updateOn: 'blur'
      }],
      Password: ['', { 
        validators: [Validators.required]
    }],
  });
  }
  
  
  Ingresar(){
    this.http.get<any>("http://localhost:3000/Usuarios")
    .subscribe(res =>{
      const Correo = res.find((a:any)=>{
        return a.Correo === this.loginForm.value.Correo && a.Password === this.loginForm.value.Password
      });
      if(Correo){
        this.api.login();
    this.routeRedirect = this.api.urlUsuarioIntentaAcceder;
    this.api.urlUsuarioIntentaAcceder = '';
    this.router.navigate([this.routeRedirect]);
        Swal.fire({
          icon: 'success',
          text: 'Sesion Iniciada'
        });
        this.loginForm.reset();
        this.router.navigate([''])
      }else{
        Swal.fire({
          icon: 'error',
          text: 'Usuario no encontrado'
        });
      }
    },err=>{
      Swal.fire({
        icon: 'error',
        text: 'Algo salio mal'
      });
    })
  }

  refrescar(){
    this.loginForm.patchValue({
    Correo: '',
    Password: ''
    });
  }
}