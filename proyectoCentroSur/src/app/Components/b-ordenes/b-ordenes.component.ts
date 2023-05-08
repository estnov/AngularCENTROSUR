import { Component, ViewChild, ChangeDetectorRef, Input, AfterViewInit  } from '@angular/core';
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


export class BOrdenesComponent implements AfterViewInit{

  element: any;
@Input() data:any;
  displayedColumns: string[] = ['No. Orden', 'CI. Orden', 'Actividad PM', 'MRU-Security', 'P. Trabajo. Res.', 'Fecha Inicio', 'Canton'
                              , 'Distrito', 'Calle y No.', 'Modificar'];

  searchOptions: string[] = ['No. Orden', 'CI. Orden', 'Actividad PM', 'MRU-Security', 'P. Trabajo. Res.', 'Fecha Inicio', 'Canton'
                                , 'Distrito', 'Calle y No.'];
  
  
  dataSource:any = array;
  dataFiltered:any = array;
  subList:any = [];

  search:String =""
  option:String = "No. Orden"


  load:boolean =false

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
    this.dataFiltered = new MatTableDataSource<any>(data);
    this.dataFiltered.paginator = this.paginator;
  }

  ngAfterViewInit(): void {
      this.listar
      this.dataFiltered.paginator = this.paginator;
  }

  filter(){
    if(!this.load){
      this.dataFiltered = this.dataSource;
      this.load = true;

    }  else{
      switch (this.option) {
        case 'No. Orden':
          this.dataFiltered = this.dataSource.data.filter((data: { numOrden: string; }) => {
            return data.numOrden.toLowerCase().includes(this.search.toLowerCase());
          });
          console.log(this.dataFiltered)
          break;
        case 'CI. Orden':
          this.dataFiltered = this.dataSource.data.filter((data: { ciOrden: string; }) => {
            return data.ciOrden.toLowerCase().includes(this.search.toLowerCase());
          });
          break;
        case 'Actividad PM':
          this.dataFiltered = this.dataSource.data.filter((data: { actividad: string; }) => {
            return data.actividad.toLowerCase().includes(this.search.toLowerCase());
          });
          break;
        case 'MRU-Security':
          this.dataFiltered = this.dataSource.data.filter((data: { mru: string; }) => {
            return data.mru.toLowerCase().includes(this.search.toLowerCase());
          });
          break;
        case 'P. Trabajo. Res.':
          this.dataFiltered = this.dataSource.data.filter((data: { pTrabajo: string; }) => {
            return data.pTrabajo.toLowerCase().includes(this.search.toLowerCase());
          });
          break;
        case 'Fecha Inicio':
          this.dataFiltered = this.dataSource.data.filter((data: { fechaInic: string; }) => {
            return data.fechaInic.toLowerCase().includes(this.search.toLowerCase());
          });
          break;
        case 'Canton':
          this.dataFiltered = this.dataSource.data.filter((data: { canton: string; }) => {
            return data.canton.toLowerCase().includes(this.search.toLowerCase());
          });
          break;
        case 'Distrito':
          this.dataFiltered = this.dataSource.data.filter((data: { distrito: string; }) => {
            return data.distrito.toLowerCase().includes(this.search.toLowerCase());
          });
          break;
        case 'Calle y No.':
          this.dataFiltered = this.dataSource.data.filter((data: { calleNum: string; }) => {
            return data.calleNum.toLowerCase().includes(this.search.toLowerCase());
          });
          break;
        default:
          console.log("No se encontro la opcion")
      }
      this.load_data_table_pagination(this.dataFiltered);

    }
    
    

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
      console.log(items.length);
      this.dataSource = items;
      this.filter();
      this.dataSource = new MatTableDataSource<any>(this.dataSource);
      this.load_data_table_pagination(this.dataFiltered);
    });
  }

  longValue: number=0;
  highValue:number=5;
  public getPaginatorData(event: PageEvent): PageEvent{
    this.longValue = event.pageIndex = event.pageSize;
    this.highValue = this.longValue + event.pageSize;
    return event;
  }

  modificar(orden:string, ciOrden:string){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    localStorage.setItem('orden', orden);
    localStorage.setItem('ciOrden', ciOrden);


    this.dialog.open(ModificarComponent, dialogConfig);
  }


}
