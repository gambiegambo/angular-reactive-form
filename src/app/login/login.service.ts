import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {

  private baseUrl = 'http://localhost:3000/';

  constructor(private http: Http) { }

  login(username: string, password: string): Observable<any> {
    return this.http.get(`${this.baseUrl}login?username=${username}&password=${password}`)
      .map(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    let errorMessage = error.message ? error.message : error.toString();
    return Observable.throw(errorMessage);
  }
}
