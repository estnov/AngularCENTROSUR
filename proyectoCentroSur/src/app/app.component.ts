import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'proyectoCentroSur';


  constructor(private router: Router) {}

  goInicio(){
    this.router.navigate(['/']);
  }
}


