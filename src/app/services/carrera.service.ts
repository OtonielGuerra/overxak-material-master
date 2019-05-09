import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {
  endpoint = 'http://localhost:3000/v2/';
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

  getCarreras() : Observable<any>{
    return this.http.get(this.endpoint + 'carreras', this.httpOptions).pipe(map(this.extractData))
  }

  setCarrera(carrera) : Observable<any>{
    let params = JSON.stringify(carrera)
    return this.http.post(this.endpoint + 'saveCarrera', params, this.httpOptions).pipe(map(this.extractData))
  }

  getCarrera(id:any){
    return this.http.get(this.endpoint + 'getCarrera/'+id, this.httpOptions).pipe(map(this.extractData))
  }

  updateCarrera(carrera){
    let params = JSON.stringify(carrera) 
    console.log(params)
    return this.http.put(this.endpoint + 'updateCarrera/'+carrera._id, params, this.httpOptions).pipe(map(this.extractData))
  }

  deleteCarrera(carrera){
    return this.http.put(this.endpoint + 'deleteCarrera/'+carrera._id, this.httpOptions).pipe(map(this.extractData))
  }
}
