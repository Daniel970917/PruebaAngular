import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http : HttpClient) { }
  

  MostrarEmpleados(data: any){
    return this.http.post<any>("http://localhost:3000/Usuarios", data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  ObtenerEmpleados(){
    return this.http.get<any>("http://localhost:3000/Usuarios")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  ActualizarEmpleados(data: any, idE: number){
    return this.http.put<any>("http://localhost:3000/Usuarios/"+idE,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  BorrarEmpleados(idE: number){
    return this.http.delete<any>("http://localhost:3000/Usuarios/"+idE)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
/////////////////////////////////7///////////////////////////////////////////////////////////////////////////7

  MostrarProductos(data: any){
    return this.http.post<any>("http://localhost:3000/Productos", data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  ObtenerProductos(){
    return this.http.get<any>("http://localhost:3000/Productos")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  ObtenerProductosNombreAsc(){
    return this.http.get<any>("http://localhost:3000/Productos?_sort=Nombre&_order=asc")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  ObtenerProductosNombreDesc(){
    return this.http.get<any>("http://localhost:3000/Productos?_sort=Nombre&_order=asc")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  ObtenerProductosCategoria1(){
    return this.http.get<any>("http://localhost:3000/Productos?category=")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  ActualizarProductos(data: any, idP: number){
    return this.http.put<any>("http://localhost:3000/Productos/"+idP,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  BorrarProductos(idP: number){
    return this.http.delete<any>("http://localhost:3000/Productos/"+idP)
    .pipe(map((res:any)=>{
      return res;
    }))
  }


  ///////////////////////////////////////////////////////////////////////////////////////////

  readonly ISLOGGEDKEY = 'islogged';
  public urlUsuarioIntentaAcceder = '';

  public changeLoginStatusSubject = new Subject<boolean>();
  public changeLoginStatus$ = this.changeLoginStatusSubject.asObservable();

  login(){
    localStorage.setItem(this.ISLOGGEDKEY, 'true');
    this.changeLoginStatusSubject.next(true);
  }

  logout(){
    localStorage.removeItem(this.ISLOGGEDKEY);
    this.changeLoginStatusSubject.next(false);
  }

  isLoggedIn(url: string){
    const islogged = localStorage.getItem(this.ISLOGGEDKEY);
    if(!islogged){
      this.urlUsuarioIntentaAcceder = url;
      return false;
    }
    return true;
  }

}
