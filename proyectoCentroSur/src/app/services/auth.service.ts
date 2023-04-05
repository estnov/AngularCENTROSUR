import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { catchError, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { 

  }


  login(username: string, password: string){
    let url = environment.apiURL+""


    //Tipo de servicio SOAP (viene en XLM)

    this.http.get('assets/testdata.xml', {responseType: 'text'})
    .pipe(
      map((xmlString: string)=>{
        const asJson = this.xmlStringToJson(xmlString);
        return asJson;
      }),
      catchError((err)=> {
        console.warn('INT ERR:', err);
        return err;     
      })
    );
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
}
