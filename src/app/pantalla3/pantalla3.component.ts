import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../Compartir/api.service';

@Component({
  selector: 'app-pantalla3',
  templateUrl: './pantalla3.component.html',
  styleUrls: ['./pantalla3.component.css']
})
export class Pantalla3Component implements OnInit {

  formValue !: FormGroup;
  ProductosData : any =[];

  constructor(private formbuilder: FormBuilder,
    private api: ApiService) { }
    

    pageActual: number = 1;
    ngDropdown = 1;

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      Nombre: [''],
      Precio: [''],
      Imagen: ['']
    })
    this.getAllProductos();
  }
 
  getAllProductos() {
    this.api.ObtenerProductosNombreAsc()
      .subscribe(res => {
        this.ProductosData = res;
      })
  }
PrecioDesc() {
    this.api.ObtenerProductosNombreDesc()
    .subscribe(res => {
      this.ProductosData = res;
    })
}
}
