import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Facts, User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  authToken = '';

  base_url: string = environment.baseApiURL;
  
  constructor(private http: HttpClient) { }

  getUserFacts(): Observable<User>{
    this.authToken = `Bearer ${localStorage.getItem('usertoken')}`;
    return this.http.get<User>(this.base_url + 'User/GetFacts/',
    {
      headers: {Authorization: this.authToken}
    })
  }

  postFact(fact: Facts, user_id: number): Observable<User>{
    this.authToken = `Bearer ${localStorage.getItem('usertoken')}`;
    return this.http.post<User>(
      this.base_url + `User/${user_id}/Facts/`,
      fact,
    {
      headers: {Authorization: this.authToken}
    })
  }

  deleteFact(user_id: number, fact_id:number): Observable<any>{
    this.authToken = `Bearer ${localStorage.getItem('usertoken')}`;
    return this.http.delete<any>(
      this.base_url + `User/${user_id}/Facts/${fact_id}/`,
    {
      headers: {Authorization: this.authToken}
    })
  }
}
