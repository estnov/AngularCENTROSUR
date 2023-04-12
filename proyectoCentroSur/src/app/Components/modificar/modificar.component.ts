import { Component } from '@angular/core';
import { ModifyService } from 'src/app/services/modify.service';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.scss']
})
export class ModificarComponent {
  orden = localStorage.getItem('orden');

  constructor(private modify: ModifyService) { }

  ngOnInit() {
  }

  async modificar(){
    //this.modify.mod();
  }

}
