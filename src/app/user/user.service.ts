import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { User } from './user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserService {

  private baseUrl = 'http://localhost:3000/';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  getUsers(): Observable<User[]> {
    return this.http.get(`${this.baseUrl}users`)
      .map(response => response.json() as User[])
      .catch(this.handleError);
  }

  update(user: User): Observable<User> {
    const url = `${this.baseUrl}users/${user.id}`;
    return this.http
      .put(url, JSON.stringify(user), { headers: this.headers })
      .map(response => response.json() as User)
      .catch(this.handleError)
  }

  add(user: User): Observable<any>{
    // Fix id
    user.id = Date.now();
    const url = `${this.baseUrl}users`;
    return this.http
      .post(url, JSON.stringify(user), { headers: this.headers })
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    let errorMessage = error.message ? error.message : error.toString();
    return Observable.throw(errorMessage);
  }
}
