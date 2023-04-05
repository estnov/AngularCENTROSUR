import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  error: boolean = false;
  usuario: string = "";
  password: string = "";

  constructor() { }

  ngOnInit() {

  }

  async loggin() {
    if(false){

    } else{
      this.error = true;
    }

  }

  


}
