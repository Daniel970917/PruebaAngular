import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ApiService } from '../Compartir/api.service';
import { EmployeeModel } from './pantalla1 board.model';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { animate, style } from '@angular/animations';

@Component({
  selector: 'app-pantalla1',
  templateUrl: './pantalla1.component.html',
  styleUrls: ['./pantalla1.component.css']
})
export class Pantalla1Component implements OnInit {
  

  formValue !: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;

  constructor(private formbuilder: FormBuilder,
    private api: ApiService,
    private http: HttpClient) { }

    pageActual: number = 1;
    filterEmpleados = '';
    
    
  get Nombre() {
    return this.formValue.get('Nombre');
  }

  get ApellidoP() {
    return this.formValue.get('ApellidoP');
  }
  get ApellidoM() {
    return this.formValue.get('ApellidoM');
  }

  get Correo() {
    return this.formValue.get('Correo');
  }
  get Permisos() {
    return this.formValue.get('Permisos');
  }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      Nombre: ['', {
        validators: [Validators.required]
      }],
      ApellidoP: ['', {
        validators: [Validators.required],
      }],
      ApellidoM: ['', {
        validators: [Validators.required],
      }],
      Correo: ['', {
        validators: [Validators.required],
      }],
      Permisos: ['', {
        validators: [Validators.required],
      }]
    })
    this.getAllEmployee();
  }

  clickAddEmployee() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails() {
    this.employeeModelObj.Nombre = this.formValue.value.Nombre;
    this.employeeModelObj.ApellidoP = this.formValue.value.ApellidoP;
    this.employeeModelObj.ApellidoM = this.formValue.value.ApellidoM;
    this.employeeModelObj.Correo = this.formValue.value.Correo;
    this.employeeModelObj.Permisos = this.formValue.value.Permisos;

    this.http.get<any>("http://localhost:3000/Usuarios")
      .subscribe(res => {
        const Correo = res.find((a: any) => {
          return a.Correo === this.formValue.value.Correo
        });
        if (Correo) {
          Swal.fire({
            icon: 'error',
            text: 'El correo no puede ser el mismo'
          })
        }
        else {
          this.api.MostrarEmpleados(this.employeeModelObj)
            .subscribe(res => {
              console.log(res);
              Swal.fire({
                icon: 'success',
                text: 'Usuario Agregado'
              })
              let ref = document.getElementById('cancel')
              ref?.click();
              this.formValue.reset();
              this.getAllEmployee();
            },
              err => {
                Swal.fire({
                  icon: 'error',
                  text: 'Algo salio mal'
                });
              })
        }
      })
  }

  getAllEmployee() {
    
    this.api.ObtenerEmpleados()
      .subscribe(res => {
        this.employeeData = res;
      })
  }

  BorrarEmpleados(row: any) {

    Swal.fire({
      title: '¿Estas Seguro?',
      text: 'Si Eliminas el usuario ya no se podra recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.BorrarEmpleados(row.id)
          .subscribe(res => {
            Swal.fire({
              icon: 'success',
              text: 'Eliminado correctamente'
            })
            this.getAllEmployee();
          })
      }
    })

  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.idE = row.id;
    this.formValue.controls['Nombre'].setValue(row.Nombre);
    this.formValue.controls['ApellidoP'].setValue(row.ApellidoP);
    this.formValue.controls['ApellidoM'].setValue(row.ApellidoM);
    this.formValue.controls['Correo'].setValue(row.Correo);
    this.formValue.controls['Permisos'].setValue(row.Permisos);
  }

  ActualizarEmpleadosDetalles() {

    this.employeeModelObj.Nombre = this.formValue.value.Nombre;
    this.employeeModelObj.ApellidoP = this.formValue.value.ApellidoP;
    this.employeeModelObj.ApellidoM = this.formValue.value.ApellidoM;
    this.employeeModelObj.Correo = this.formValue.value.Correo;
    this.employeeModelObj.Permisos = this.formValue.value.Permisos;

    this.api.ActualizarEmpleados(this.employeeModelObj, this.employeeModelObj.idE)
      .subscribe(res => {
        Swal.fire({
          icon: 'success',
          text: 'Actualizacion exitosa'
        })
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      })
  }

}
