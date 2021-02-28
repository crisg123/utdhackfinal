import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';


const API_URL = 'http://localhost:8080/api/posts/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }
  updateWater(email1): Observable<any> {
    console.log(email1);
    return this.http.post(API_URL + 'water', {
      email: email1,
    }, httpOptions);
  }
  updatePower(email1): Observable<any>{
    return this.http.post(API_URL + 'power', {
      email: email1
    }, httpOptions);
  }
  updateToiletries(email1): Observable<any>{
    return this.http.post(API_URL + 'toiletries', {
      email: email1
    }, httpOptions);
  }
}
