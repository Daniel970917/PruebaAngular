import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ApiService } from '../Compartir/api.service';
import { ProductosModel } from './pantalla2 board.model';

@Component({
  selector: 'app-pantalla2',
  templateUrl: './pantalla2.component.html',
  styleUrls: ['./pantalla2.component.css']
})
export class Pantalla2Component implements OnInit {

  formValue !: FormGroup;
  ProductosModelObj: ProductosModel = new ProductosModel();
  ProductosData: any = [];
  showAdd !: boolean;
  showUpdate !: boolean;

  constructor(private formbuilder: FormBuilder,
    private api: ApiService) { }

    pageActual: number = 1;

  get Nombre() {
    return this.formValue.get('Nombre');
  }

  get Precio() {
    return this.formValue.get('Precio');
  }
  get Imagen() {
    return this.formValue.get('Imagen');
  }
  get Categoria() {
    return this.formValue.get('Categoria');
  }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      Nombre: ['', {
        validators: [Validators.required]
      }],
      Precio: ['', {
        validators: [Validators.required]
      }],
      Imagen: ['', {
        validators: [Validators.required]
      }],
      Categoria: ['', {
        validators: [Validators.required]
      }],
    })
    this.getAllProductos();
  }

  clickAddProductos() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postProductosDetails() {
    this.ProductosModelObj.Nombre = this.formValue.value.Nombre;
    this.ProductosModelObj.Precio = this.formValue.value.Precio;
    this.ProductosModelObj.Imagen = this.formValue.value.Imagen;
    this.ProductosModelObj.Categoria = this.formValue.value.Categoria;

    this.api.MostrarProductos(this.ProductosModelObj)
      .subscribe(res => {
        console.log(res);
        Swal.fire({
          icon: 'success',
          text: 'Producto Agregado'
        })
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllProductos();
      },
        err => {
          Swal.fire({
            icon: 'error',
            text: 'Algo salio mal'
          })
        })

  }

  getAllProductos() {
    this.api.ObtenerProductos()
      .subscribe(res => {
        this.ProductosData = res;
      })
  }

  BorrarProductos(row: any) {

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
        this.api.BorrarProductos(row.id)
          .subscribe(() => {
            Swal.fire({
              icon: 'success',
              text: 'Eliminado correctamente'
            })
            this.getAllProductos();
          })
      }
    })

  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.ProductosModelObj.idP = row.id;
    this.formValue.controls['Nombre'].setValue(row.Nombre);
    this.formValue.controls['Precio'].setValue(row.Precio);
    this.formValue.controls['Imagen'].setValue(row.Imagen);
    this.formValue.controls['Categoria'].setValue(row.Categoria);
  }

  ActualizarProductosDetalles() {

    this.ProductosModelObj.Nombre = this.formValue.value.Nombre;
    this.ProductosModelObj.Precio = this.formValue.value.Precio;
    this.ProductosModelObj.Imagen = this.formValue.value.Imagen;
    this.ProductosModelObj.Categoria = this.formValue.value.Categoria;

    this.api.ActualizarProductos(this.ProductosModelObj, this.ProductosModelObj.idP)
      .subscribe(() => {
        Swal.fire({
          icon: 'success',
          text: 'Actualizacion exitosa'
        })
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllProductos();
      })
  }

}
