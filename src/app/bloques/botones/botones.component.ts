import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Compartir/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-botones',
  templateUrl: './botones.component.html',
  styleUrls: ['./botones.component.css']
})
export class BotonesComponent implements OnInit {

  usuarioLogueado = false;
  constructor(public apiService: ApiService) { }

  ngOnInit(): void {
    this.usuarioLogueado = this.apiService.isLoggedIn('');
    this.apiService.changeLoginStatus$.subscribe((Loggedstatus: boolean)=>{
      this.usuarioLogueado = Loggedstatus;
    })
  }
  logout(){
    this.apiService.logout();
    Swal.fire({
      icon: 'success',
      text: 'Sesion cerrada'
    })
  }

}
