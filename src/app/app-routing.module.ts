import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateGuard } from './can-activate.guard';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { Pantalla1Component } from './pantalla1/pantalla1.component';
import { Pantalla2Component } from './pantalla2/pantalla2.component';
import { Pantalla3Component } from './pantalla3/pantalla3.component';
import { Pantalla4Component } from './pantalla4/pantalla4.component';

const routes: Routes = [
  {path: 'pantalla1',component: Pantalla1Component,canActivate:[CanActivateGuard]},
  {path: 'pantalla2',component: Pantalla2Component,canActivate:[CanActivateGuard]},
  {path: 'pantalla3',component: Pantalla3Component},
  {path: 'pantalla4',component: Pantalla4Component},
  {path: 'registro',component: LoginComponent},
  {path: '',component: InicioComponent},
  {path: '**', pathMatch: 'full',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
