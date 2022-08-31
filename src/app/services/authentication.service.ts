import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token, User } from '../interfaces/user';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  base_url: string = environment.baseApiURL;

  constructor(private http: HttpClient) { }

  logIn(user: User): Observable<Token>{
    return this.http.post<Token>(this.base_url + 'auth/login/', user)
  }

  register(user: User): Observable<Token>{
    return this.http.post<Token>(this.base_url + 'auth/register/', user)
  }

  forgotPassword(user: User): Observable<any>{
    return this.http.post<any>(this.base_url + 'auth/forgot-password/', user)
  }

  resetPassword(user: User): Observable<User>{
    return this.http.post<User>(this.base_url + 'auth/reset-password/', user)
  }
  
  loggedIn() {
    return !!localStorage.getItem('usertoken')
  }
}
