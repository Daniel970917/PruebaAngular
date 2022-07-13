import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BotonesComponent } from './bloques/botones/botones.component';
import { Pantalla1Component } from './pantalla1/pantalla1.component';
import { Pantalla2Component } from './pantalla2/pantalla2.component';
import { Pantalla3Component } from './pantalla3/pantalla3.component';
import { Pantalla4Component } from './pantalla4/pantalla4.component';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ImagenSlideComponent } from './bloques/imagen-slide/imagen-slide.component';
import { UsernameUnicoDirective } from './validaciones/username-unico.directive';
import { PasswordValidationDirective } from './validaciones/password-validation.directive';
import { FilterPipe } from './pipes/filter.pipe';
import { PermisosDirective } from './permisos.directive';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    BotonesComponent,
    Pantalla1Component,
    Pantalla2Component,
    Pantalla3Component,
    Pantalla4Component,
    LoginComponent,
    InicioComponent,
    ImagenSlideComponent,
    UsernameUnicoDirective,
    PasswordValidationDirective,
    FilterPipe,
    PermisosDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
