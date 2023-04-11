import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { catchError, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  constructor(private http: HttpClient, private router: Router) { 

  }


  
  xmlStringToJson(xml: string)
  {
    // Convert the XML string to an XML Document.
    const oParser = new DOMParser();
    const oDOM = oParser.parseFromString(xml, "application/xml");
    // Convert the XML Document to a JSON Object.
    return this.xmlToJson(oDOM);
  }

  xmlToJson(xml:any)
  {
    // Create the return object
    var obj : any = {};

    if (xml.nodeType == 1) { // element
      // do attributes
      if (xml.attributes.length > 0) {
        obj["@attributes"] = {};
          for (var j = 0; j < xml.attributes.length; j++) {
            var attribute = xml.attributes.item(j);
            obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType == 3) { // text
      obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
      for(var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;
        if (typeof(obj[nodeName]) == "undefined") {
          obj[nodeName] = this.xmlToJson(item);
        } else {
          if (typeof(obj[nodeName].push) == "undefined") {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(this.xmlToJson(item));
        }
      }
    }
    return obj;
  }


  post(user: string, password: string){
    const soapUrl = 'api/post/json';
    const xml = `<?xml version="1.0" encoding="utf-8"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
       <soapenv:Header/>
       <soapenv:Body>
          <urn:ZISUWM_WEB_LOGIN>
             <PASSWORD>Pruebas.2023</PASSWORD>
             <USUARIO>0107216194-A</USUARIO>
          </urn:ZISUWM_WEB_LOGIN>
       </soapenv:Body>
    </soapenv:Envelope>`;


    const headers = new HttpHeaders({
      'Content-Type': 'text/xml',
      'charset': 'utf-8'
    });

    console.log(xml);
    this.http.post(soapUrl, xml, { headers: headers, responseType: 'text' }).subscribe(response => {
      console.log(response);
      let json = this.xmlStringToJson(response.toString());
      console.log(json);
      console.log(json['soapenv:Envelope']['soapenv:Body']);
    });
  }




} 
