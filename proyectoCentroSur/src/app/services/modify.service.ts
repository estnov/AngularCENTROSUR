import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModifyService {
  

  constructor(private http: HttpClient, private router: Router, public snackBar: MatSnackBar,private location: Location) { }

  mod(actividad: string, codCierre: string, codGrupo: string, contrato: string, ejecutadoPor: string, feEjecucion: string, horFin: string, horInicio: string, ingresadoPor: string, observacion: string, orden: string) {
    const soapUrl = 'modificar/post/json';
    const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
        <soapenv:Header/>
        <soapenv:Body>
          <urn:ZISU_WS_COT>
              <ACTIVIDAD>`+actividad+`</ACTIVIDAD>
              <COD_CIERRE>`+codCierre+`</COD_CIERRE>
              <COD_GRUPO>`+codGrupo+`</COD_GRUPO>
              <CONTRATO>`+contrato+`</CONTRATO>
              <EJECUTADO_POR>`+ejecutadoPor+`</EJECUTADO_POR>
              <FE_EJECUCION>`+feEjecucion+`</FE_EJECUCION>
              <HOR_FIN>`+horFin+`</HOR_FIN>
              <HOR_INICIO>`+horInicio+`</HOR_INICIO>
              <INGRESADO_POR>`+ingresadoPor+`</INGRESADO_POR>
              <OBSERVACION>`+observacion+`</OBSERVACION>
              <ORDEN>`+orden+`</ORDEN>
          </urn:ZISU_WS_COT>
        </soapenv:Body>
    </soapenv:Envelope>`;

    const headers = new HttpHeaders({
      'Content-Type': 'text/xml',
      'charset': 'utf-8'
    });

    this.http.post(soapUrl, xml, { headers: headers, responseType: 'text' }).subscribe(
      (data) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'text/xml');

        // Retrieve the user attributes
        const mensaje = xmlDoc.getElementsByTagName('MENSAJERES')[0].textContent;
        const snackBarRef = this.snackBar.open(mensaje+'', 'Cerrar');
        snackBarRef.afterDismissed().subscribe(() => {
          window.location.reload();
        });
        
      },
      (error) => {
        console.log(error);
      }
    );
  }



  getCodGrupo(ciOrden:string): Observable<any>{
    const soapUrl = 'listarCodGrupo/post/json';
    const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZWMMF_QUERY_QMGRP>
          <I_AUART>`+ciOrden+`</I_AUART>
          <!--Optional:-->
          <T_QMGRP>
             <item>
             </item>
          </T_QMGRP>
       </urn:ZWMMF_QUERY_QMGRP>
    </soapenv:Body>
 </soapenv:Envelope>`;


    const headers = new HttpHeaders({
      'Content-Type': 'text/xml',
      'charset': 'utf-8'
    });

    return (this.http.post(soapUrl, xml, { headers: headers, responseType: 'text' }));

  }

  getCodCierre(ciOrden:string, codGrupo:string): Observable<any>{
    const soapUrl = 'listarCodCierre/post/json';
    const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZWMMF_QUERY_QMCOD>
          <CODEGRUPPE>`+codGrupo+`</CODEGRUPPE>
          <I_AUART>`+ciOrden+`</I_AUART>
          <T_QMCOD>
          </T_QMCOD>
       </urn:ZWMMF_QUERY_QMCOD>
    </soapenv:Body>
 </soapenv:Envelope>`;


    const headers = new HttpHeaders({
      'Content-Type': 'text/xml',
      'charset': 'utf-8'
    });

    return (this.http.post(soapUrl, xml, { headers: headers, responseType: 'text' }));

  }

  getContrato(numOrden: string): Observable<any>{
    const soapUrl = 'listarContratos/post/json';
    const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZISU_GET_CONTRATO>
          <ORDEN>`+numOrden+`</ORDEN>
          <RESPUESTA>
             <item>
             </item>
          </RESPUESTA>
       </urn:ZISU_GET_CONTRATO>
    </soapenv:Body>
 </soapenv:Envelope>`;


    const headers = new HttpHeaders({
      'Content-Type': 'text/xml',
      'charset': 'utf-8'
    });

    return (this.http.post(soapUrl, xml, { headers: headers, responseType: 'text' }));

  }


}
