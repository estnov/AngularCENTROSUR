import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { 

  }


  login(username: string, password: string){
    let url = environment.apiURL+"";

    //Falta armar el paquete para consumir el servicio web


    this.http.post<any>(url,"").subscribe(
      data => {
        //Metodos para inicio de sesion positiva o negativa
        if(data){
          
          //Se debe permitir la navegacion
          this.router.navigate(['']);
        } else{

          
        }

      }
    );
  }
}
