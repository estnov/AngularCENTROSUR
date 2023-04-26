import { Component, ViewChild, ChangeDetectorRef, Input  } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ListService } from 'src/app/services/list.service';
import { ModificarComponent } from '../modificar/modificar.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

const array: any[]=[]

@Component({
  selector: 'app-b-ordenes',
  templateUrl: './b-ordenes.component.html',
  styleUrls: ['./b-ordenes.component.scss']
})


export class BOrdenesComponent {

  element: any;
@Input() data:any;
  displayedColumns: string[] = ['No. Orden', 'CI. Orden', 'Actividad PM', 'MRU-Security', 'P. Trabajo. Res.', 'Fecha Inicio', 'Canton'
                              , 'Distrito', 'Calle y No.', 'Modificar'];

  searchOptions: string[] = ['No. Orden', 'CI. Orden', 'Actividad PM', 'MRU-Security', 'P. Trabajo. Res.', 'Fecha Inicio', 'Canton'
                                , 'Distrito', 'Calle y No.'];
  
  //public ordenes: Orden[]=[];
  dataSource:any = array;
  dataFiltered:any = array;

  search:String =""
  option:String = "No. Orden"

  public items: any=[];
  public tableitems= this.dataSource;
  public pageSlice =this.tableitems.slice(0,5);
  pageSize=5;
  pageEvent!: PageEvent;
  

  constructor(private router: Router, private list : ListService, public dialog: MatDialog
    ,private cdr: ChangeDetectorRef) {
    if(localStorage.getItem('nombre')==null){
      this.router.navigate(['/', 'error-conn'])  
    }
    this.listar();
  }


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  load_data_table_pagination(data:any) {
    this.displayedColumns  = ['No. Orden', 'CI. Orden', 'Actividad PM', 'MRU-Security', 'P. Trabajo. Res.', 'Fecha Inicio', 'Canton'
    , 'Distrito', 'Calle y No.', 'Modificar'];
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.paginator = this.paginator;
  }

  async listar(){
    this.list.list().subscribe(response => {
      const parser = new DOMParser();

      const xmlDoc = parser.parseFromString(response, 'text/xml');

      // Retrieve the user attributes
      let items:any=[];

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
      }
      this.dataSource = items;

      this.dataSource = new MatTableDataSource<any>(this.dataSource);
    });
  }

  longValue: number=0;
  highValue:number=5;
  public getPaginatorData(event: PageEvent): PageEvent{
    this.longValue = event.pageIndex = event.pageSize;
    this.highValue = this.longValue + event.pageSize;
    return event;
  }

  modificar(orden:string){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    localStorage.setItem('orden', orden);


    this.dialog.open(ModificarComponent, dialogConfig);
  }

  shouldHide(data: any): boolean {
    switch (this.option) {
      case 'No. Orden':
        return !data.numOrden.includes(this.search);
      case 'CI. Orden':
        return !data.ciOrden.includes(this.search);
      case 'Actividad PM':
        return !data.actividad.includes(this.search);
      case 'MRU-Security':
        return !data.mru.includes(this.search);
      case 'P. Trabajo. Res.':
        return !data.pTrabajo.includes(this.search);
      case 'Fecha Inicio':
        return !data.fechaInic.includes(this.search);
      case 'Canton':
        return !data.canton.includes(this.search);
      case 'Distrito':
        return !data.distrito.includes(this.search);
      case 'Calle y No.':
        return !data.calleNum.includes(this.search);
      default:
        return true;
    }
  }
}
