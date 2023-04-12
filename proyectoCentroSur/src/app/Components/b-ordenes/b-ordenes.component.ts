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
  
  //public ordenes: Orden[]=[];
  dataSource:any = array;
  

  constructor(private router: Router, private list : ListService) {
    if(localStorage.getItem('nombre')==null){
      this.router.navigate(['/', 'error-conn'])  
    }
    this.listar();
  }

  async listar(){
    this.list.list().subscribe(response => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response, 'text/xml');

      // Retrieve the user attributes
      let items: any=[];

      for (let i = 0; i < xmlDoc.getElementsByTagName('item').length; i++) {

        const item: any = {
          numOrden: xmlDoc.getElementsByTagName('item')[i].getElementsByTagName('ORDEN')[0].textContent,
          ciOrden: xmlDoc.getElementsByTagName('item')[i].getElementsByTagName('AUART')[0].textContent,
          actividad: xmlDoc.getElementsByTagName('item')[i].getElementsByTagName('ILATX')[0].textContent,
          mru: xmlDoc.getElementsByTagName('item')[i].getElementsByTagName('GEWRK')[0].textContent,
          pTrabajo: xmlDoc.getElementsByTagName('item')[i].getElementsByTagName('KTEXT')[0].textContent,
          fechaInic: xmlDoc.getElementsByTagName('item')[i].getElementsByTagName('GSTRP')[0].textContent,
          canton: xmlDoc.getElementsByTagName('item')[i].getElementsByTagName('CANTON')[0].textContent,
          distrito: xmlDoc.getElementsByTagName('item')[i].getElementsByTagName('DISTRITO')[0].textContent,
          calleNum: xmlDoc.getElementsByTagName('item')[i].getElementsByTagName('CALLE_NRO')[0].textContent,
        };

        items.push(item);
        console.log(item.numOrden);
      }
      this.dataSource = items;
      console.log(items);
      
    });
  }

}
