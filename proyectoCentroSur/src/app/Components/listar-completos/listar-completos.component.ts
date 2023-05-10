import { Component, ViewChild, ChangeDetectorRef, Input, AfterViewInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ListFullService } from 'src/app/services/list-full.service';
import { ListService } from 'src/app/services/list.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';


const array: any[]=[]


@Component({
  selector: 'app-listar-completos',
  templateUrl: './listar-completos.component.html',
  styleUrls: ['./listar-completos.component.scss']
})

export class ListarCompletosComponent implements AfterViewInit{

  
  element: any;
  @Input() data:any;

  displayedColumns: string[] = ['No. Orden', 'CI. Orden', 'Actividad PM', 'Ejecutado por', 'Revisado por', 'Fecha ejecución'];

  dataSource:any = array;


  public tableitems= this.dataSource;
  public pageSlice =this.tableitems.slice(0,5);
  pageSize=5;
  pageEvent!: PageEvent;

  constructor(public snackBar: MatSnackBar, 
    private dialogRef: MatDialogRef<ListarCompletosComponent>, 
    private listFull: ListFullService) {
      this.listar();
     }


    @ViewChild(MatPaginator) paginator!: MatPaginator;
  load_data_table_pagination(data:any) {
    this.displayedColumns  = ['No. Orden', 'CI. Orden', 'Actividad PM', 'Ejecutado por', 'Revisado por', 'Fecha ejecución'];
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.paginator = this.paginator;
  }

    ngAfterViewInit(): void {
        this.listar
        this.dataSource.paginator = this.paginator;
    }

    async listar(){
      this.listFull.listCompletos().subscribe(response => {
        let items:any=[]

        const parser = new DOMParser();

  
        const xmlDoc = parser.parseFromString(response, 'text/xml');
  
        // Retrieve the user attributes
        
  
        for (let i = 0; i < xmlDoc.getElementsByTagName('item').length; i++) {
  
          const item: any = {
            numOrden: xmlDoc.getElementsByTagName('item')[i].getElementsByTagName('ORDEN')[0].textContent,
            ciOrden: xmlDoc.getElementsByTagName('item')[i].getElementsByTagName('AUART')[0].textContent,
            actividad: xmlDoc.getElementsByTagName('item')[i].getElementsByTagName('ILART')[0].textContent,
            ejecutado_por: xmlDoc.getElementsByTagName('item')[i].getElementsByTagName('EJECUTADO_POR')[0].textContent,
            revisado_por: xmlDoc.getElementsByTagName('item')[i].getElementsByTagName('REVISADO_POR')[0].textContent,
            fecha_ejec: xmlDoc.getElementsByTagName('item')[i].getElementsByTagName('FEC_EJEC_TRAB')[0].textContent
          };

          const dateString = item.fecha_ejec;
          const year = dateString.slice(0, 4);
          const month = dateString.slice(4, 6);
          const day = dateString.slice(6, 8);

          const date = new Date(`${year}-${month}-${day}`);
          const formattedDateString = date.toLocaleDateString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          });

          item.fecha_ejec = formattedDateString
            
          items.push(item);

          

        }

        //se personaliza el CSS
        const box = document.getElementById('foot');

        if (box != null) {
          console.log("Personalizando")
          box.style.backgroundColor = 'white';
          box.style.height= 'fit-content';
        }


        console.log("Total ordenes: "+items.length);
        this.dataSource = items;

        this.load_data_table_pagination(this.dataSource);
        console.log(this.dataSource);
        
      });


      
    }
    
    

    longValue: number=0;
    highValue:number=5;
    public getPaginatorData(event: PageEvent): PageEvent{
      this.longValue = event.pageIndex = event.pageSize;
      this.highValue = this.longValue + event.pageSize;
      return event;
    }

}
