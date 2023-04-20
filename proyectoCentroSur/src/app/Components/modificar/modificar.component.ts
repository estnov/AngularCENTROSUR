import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModifyService } from 'src/app/services/modify.service';
import { formatDate } from '@angular/common';

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

  public orden = localStorage.getItem('orden');

  constructor(private modify: ModifyService, private dialogRef: MatDialogRef<ModificarComponent>) { }

  ngOnInit() {
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
    console.log(this.hora_inicio);
    console.log(this.hora_fin);
    this.modify.mod(this.actividad, this.cod_cierre, this.cod_grupo, this.contrato, this.ejecutado_por, formattedDate, this.hora_fin, this.hora_inicio, this.ingresado, this.observaciones, this.orden+'');
   
    this.dialogRef.close();

  }
}
