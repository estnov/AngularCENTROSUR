import { Component } from '@angular/core';
import { ModifyService } from 'src/app/services/modify.service';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.scss']
})
export class ModificarComponent {

  public dateStart_selected:any;
  public dateEnd_selected:any;
  public date_current:any;

  orden = localStorage.getItem('orden');

  constructor(private modify: ModifyService) { }

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
}
