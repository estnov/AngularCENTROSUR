import { Component } from '@angular/core';
import { Router } from '@angular/router';

const array: any[]=[]

@Component({
  selector: 'app-b-ordenes',
  templateUrl: './b-ordenes.component.html',
  styleUrls: ['./b-ordenes.component.scss']
})


export class BOrdenesComponent {
  displayedColumns: string[] = ['No. Orden', 'CI. Orden', 'Actividad PM', 'MRU-Security', 'P. Trabajo. Res.', 'Fecha Inicio', 'Canton'
                                , 'Distrito', 'Calle y No.', 'Ver', 'Modificar'];
  dataSource:any = array;

  constructor(private router: Router){
    console.log(localStorage.getItem('nombre'))
    if(localStorage.getItem('nombre')==null){
      this.router.navigate(['/', 'error-conn'])  
    }
  }

}
