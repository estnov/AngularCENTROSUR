import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ListarCompletosComponent } from '../Components/listar-completos/listar-completos.component';

@Injectable({
  providedIn: 'root'
})
export class ListFullService {

  public items:any=[];

  constructor(private http: HttpClient) { }
  /*
  listCompletos(): any []{
    const url = 'finalizadas/post/json';
    const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
          <soapenv:Header/>
          <soapenv:Body>
            <urn:ZISUWM_GET_ORDENES_CTEC>
                <!--Optional:-->
                <ORDEN>
                  <item>
                  </item>
                </ORDEN>
                <PASSWORD>Jdavid.222</PASSWORD>
                <USUARIO>0105970222-Z3GIRON</USUARIO>
            </urn:ZISUWM_GET_ORDENES_CTEC>
          </soapenv:Body>
      </soapenv:Envelope>`;

    console.log(xml);


    const headers = new HttpHeaders({
      'Content-Type': 'text/xml',
      'charset': 'utf-8',
      'Authorization': 'Basic ' + btoa('jperalta' + ':' + 'Franjua.4095')
    });

    console.log(url);

    this.http.post(url, xml, { headers: headers, responseType: 'text' }).subscribe(response => {
      
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
  
          this.items.push(item);

        }
        console.log("Total ordenes: "+this.items.length);

        this.listarComponent.refresh();
      
    });
    return this.items;
  }*/

  listCompletos(): Observable<any>{
    const url = 'finalizadas/post/json';
    const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
          <soapenv:Header/>
          <soapenv:Body>
            <urn:ZISUWM_GET_ORDENES_CTEC>
                <!--Optional:-->
                <ORDEN>
                  <item>
                  </item>
                </ORDEN>
                <PASSWORD>Jdavid.222</PASSWORD>
                <USUARIO>0105970222-Z3GIRON</USUARIO>
            </urn:ZISUWM_GET_ORDENES_CTEC>
          </soapenv:Body>
      </soapenv:Envelope>`;



    const headers = new HttpHeaders({
      'Content-Type': 'text/xml',
      'charset': 'utf-8',
      'Authorization': 'Basic ' + btoa('jperalta' + ':' + 'Franjua.4095')
    });

    return this.http.post(url, xml, { headers: headers, responseType: 'text' })
  }
}
