import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  endpoint = 'http://localhost:3000/v1/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  private extractData(res) {
    let body = res;
    return body || {} || [];
  }

  getPersonas() :  Observable<any>{
    return this.http.get(this.endpoint + 'personas', this.httpOptions).pipe(map(this.extractData))
  }

  setPersona(persona) : Observable<any>{
    let params = JSON.stringify(persona)
    return this.http.post(this.endpoint + 'savePersona', params, this.httpOptions).pipe(map(this.extractData));
  }

  setFamilia(familia) {
    let params = JSON.stringify(familia);
    return this.http.post(this.endpoint + 'saveFamilia', params, this.httpOptions).pipe(map(this.extractData));
  }

  getOne(id:any){
    return this.http.get(this.endpoint + 'getPersona/'+id, this.httpOptions).pipe(map(this.extractData))
  }

  updatePersona(persona){
    let params = JSON.stringify(persona)
    console.log(params)
    return this.http.put(this.endpoint + 'updatePersona/'+persona._id, params, this.httpOptions).pipe(map(this.extractData))
  }

  deletePersona(persona){
    return this.http.put(this.endpoint + 'deletePersona/'+persona._id, this.httpOptions).pipe(map(this.extractData))
  }

  getPadres() : Observable<any>{
    return this.http.get(this.endpoint + 'getPadres/', this.httpOptions).pipe(map(this.extractData))
  }

  getMadres(): Observable<any>{
    return this.http.get(this.endpoint + 'getMadres/', this.httpOptions).pipe(map(this.extractData))
  }

  getEncargados(): Observable<any>{
    return this.http.get(this.endpoint + 'getEncargados/', this.httpOptions).pipe(map(this.extractData))
  }

  getHijos(): Observable<any>{
    return this.http.get(this.endpoint + 'getHijos/', this.httpOptions).pipe(map(this.extractData))
  }
}
