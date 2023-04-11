import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListService } from 'src/app/services/list.service';

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

  constructor(private router: Router, private list : ListService) {
    
    if(localStorage.getItem('nombre')==null){
      this.router.navigate(['/', 'error-conn'])  
    }

    this.list.list();
  }

}
