import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModifyService } from 'src/app/services/modify.service';
import { formatDate } from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.scss']
})
export class ModificarComponent {

  public dateStart_selected:any;
  public dateEnd_selected:any;
  public date_current:any;
  public actividad: string = '';
  public contrato: string = '';
  public cod_cierre: string = '';
  public cod_grupo: string = '';
  public ejecutado_por: string = '';
  public hora_inicio: string = '';
  public hora_fin: string = '';
  public ingresado: string = '';
  public observaciones: string = '';

  public codigosGrupo:any = [];
  public codigosCierre:any = [];
  public contratos:any = [];
  public actividades:any = [];

  public inhabilitarCodCierre: boolean = true;
  public inhabilitarActividades: boolean = true;

  public orden = localStorage.getItem('orden');

  constructor(private modify: ModifyService, private dialogRef: MatDialogRef<ModificarComponent>, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.listCodGrupo();
    this.listContratos();
  }

  async modificar(){
    //this.modify.mod();
  }
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  add_zero_date(data:any) {
    return (data < 10) ? '0' + data.toString() : data;
  }
  
  get_date_current() {
    const hoy = new Date();
    const dd = hoy.getDate();
    const mm = hoy.getMonth() + 1;
    const yyyy = hoy.getFullYear();
    this.dateEnd_selected = yyyy + '-' + this.add_zero_date(mm) + '-' + this.add_zero_date(dd);
    this.dateStart_selected = yyyy + '-' + this.add_zero_date(mm) + '-' + this.add_zero_date(dd);
    this.date_current = yyyy + '-' + this.add_zero_date(mm) + '-' + this.add_zero_date(dd);
    
  }

  save(){
    const formattedDate = formatDate(this.dateStart_selected, 'yyyy-MM-dd', 'en-US');
    console.log(formattedDate);
    this.hora_fin=this.hora_fin+':00';
    this.hora_inicio=this.hora_inicio+':00';
    this.modify.mod(this.actividad, this.cod_cierre, this.cod_grupo, this.contrato, this.ejecutado_por, formattedDate, this.hora_fin, this.hora_inicio, this.ingresado, this.observaciones, this.orden+'');
   
    this.dialogRef.close();

  }

  listCodGrupo(){
    let ciOrden = localStorage.getItem('ciOrden')+"";
    this.modify.getCodGrupo(ciOrden).subscribe(response => {
      const parser = new DOMParser();

      const xmlDoc = parser.parseFromString(response, 'text/xml');

      for (let i = 0; i < xmlDoc.getElementsByTagName('item').length; i++) {

        const item: any = {
          codGrupo: xmlDoc.getElementsByTagName('item')[i].getElementsByTagName('CODEGRUPPE')[0].textContent,
          descripcion: xmlDoc.getElementsByTagName('item')[i].getElementsByTagName('KURZTEXT')[0].textContent
        };

        this.codigosGrupo.push(item);
      }
    });
  }

  
  listCodCierre(){
    let ciOrden = localStorage.getItem('ciOrden')+"";
    let codGrupo = localStorage.getItem('codGrupo')+"";
    this.modify.getCodCierre(ciOrden,codGrupo).subscribe(response => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response, 'text/xml');

      for (let i = 0; i < xmlDoc.getElementsByTagName('item').length; i++) {

        const item: any = {
          code: xmlDoc.getElementsByTagName('item')[i].getElementsByTagName('CODE')[0].textContent,
          descripcion: xmlDoc.getElementsByTagName('item')[i].getElementsByTagName('KURZTEXT')[0].textContent
        };

        this.codigosCierre.push(item);
      }
    });
  }

  listContratos(){
    let orden = localStorage.getItem('orden')+"";
    this.modify.getContrato(orden).subscribe(response => {
      const parser = new DOMParser();

      const xmlDoc = parser.parseFromString(response, 'text/xml');

      for (let i = 0; i < xmlDoc.getElementsByTagName('item').length; i++) {

        const item: any = {
          codContrato: xmlDoc.getElementsByTagName('item')[i].getElementsByTagName('EBELN')[0].textContent,
          descripcion: xmlDoc.getElementsByTagName('item')[i].getElementsByTagName('TXZ01')[0].textContent
        };

        this.contratos.push(item);
      }
    });
  }

  listActividades(){
    this.modify.getActividad(this.contrato).subscribe(response => {
      const parser = new DOMParser();

      const xmlDoc = parser.parseFromString(response, 'text/xml');

      for (let i = 0; i < xmlDoc.getElementsByTagName('item').length; i++) {

        const item: any = {
          codActividad: xmlDoc.getElementsByTagName('item')[i].getElementsByTagName('SRVPOS')[0].textContent,
          descripcion: xmlDoc.getElementsByTagName('item')[i].getElementsByTagName('KTEXT1')[0].textContent
        };

        this.actividades.push(item);
      }
    });
  }


  onCodigoGrupoSelected(event: any) {
    console.log(event.value);
    localStorage.setItem('codGrupo', event.value);
    this.listCodCierre();
    this.cod_grupo = event.value;
    this.inhabilitarCodCierre = false;
  }

  onCodigoCierreSelected(event: any) {
    console.log(event.value);
    localStorage.setItem('codCierre', event.value);
    this.cod_cierre = event.value;
  }
  onContratoSelected(event: any) {
    console.log(event.value);
    localStorage.setItem('contrato', event.value);
    this.contrato = event.value;
    this.inhabilitarActividades = false;
    this.listActividades();
  }
  onActividadSelected(event: any) {
    console.log(event.value);
    localStorage.setItem('actividad', event.value);
    this.actividad = event.value;
  }
}
