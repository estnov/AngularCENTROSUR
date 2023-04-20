import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ModifyService {
  

  constructor(private http: HttpClient, private router: Router) { }

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

    console.log(xml);
    this.http.post(soapUrl, xml, { headers: headers, responseType: 'text' }).subscribe(
      (data) => {
        console.log(data);
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'text/xml');

        // Retrieve the user attributes
        const mensaje = xmlDoc.getElementsByTagName('MENSAJERES')[0].textContent;
        alert(mensaje);
        this.router.navigate(['/ordenes']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
