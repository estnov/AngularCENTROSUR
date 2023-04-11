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


  login(username: string, password: string){

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa('jperalta:Jfps.4095')
      })

    };
  

    let url = "http://p15isudessap1.cisnergia.gob.ec:8000/sap/bc/srt/wsdl/flv_10002A111AD1/srvc_url/sap/bc/srt/rfc/sap/zws_web_login/110/zws_web_login/zws_web_login?sap-client=110"

    const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };

    const body = { title: 'Angular POST Request Example' };

    
/*
    //Tipo de servicio SOAP (viene en XLM)

    this.http.post(url, {responseType: 'text', headers: httpOptions.headers})
    .pipe(
      map((xmlString: string)=>{
        const asJson = this.xmlStringToJson(xmlString);
        return asJson;
      }),
      catchError((err)=> {
        console.warn('INT ERR:', err);
        return err;     
      })
    );*/
  }

  postLogin(username : String, password : String) {

    //Credenciales:
    //Usuario: ADMIN
    //Password: Israel123

    let url = "http://p16isudessap2.cisnergia.gob.ec:8010/sap/bc/srt/rfc/sap/zws_web_login/110/zws_web_login/zws_web_login"

    let parser = new DOMParser();
    let xmlString = '<?xml version="1.0" encoding="utf-8"?><soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">  <soapenv:Header/>   <soapenv:Body><urn:ZISUWM_WEB_LOGIN><PASSWORD>'+password+'</PASSWORD><USUARIO>'+username+'</USUARIO></urn:ZISUWM_WEB_LOGIN></soapenv:Body> </soapenv:Envelope>';
    
    let doc = parser.parseFromString(xmlString, "application/xml");
    console.log(doc);

    let headers = new HttpHeaders()
      .set('Content-Type', 'text/xml')
      .set('charset', 'utf-8')    
      ;

    //console.log(this.http.post('http://p15isudessap1.cisnergia.gob.ec:8000/sap/bc/srt/rfc/sap/zws_web_login/110/zws_web_login/zws_web_login', doc, { headers: headers, responseType: 'text' }));

    
    return new Promise(resolve => {
      this.http.post(url, doc, {headers: headers, responseType: 'text' }).subscribe(data => {
        resolve(data);
        console.log(data);
        console.log(this.xmlStringToJson(data.toString()));
      }, err => {
        console.log(err);
      });
    });

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


  post(){
    //const soapUrl = 'http://p16isudessap2.cisnergia.gob.ec:8010/sap/bc/srt/rfc/sap/zws_web_login/110/zws_web_login/zws_web_login';
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
