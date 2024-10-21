import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoginUser, ISession, IUser, IUserSession } from '../../interfaces/login.interface';
import { ENDPOINTS } from '../../../share/constant/endpoints.constant';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private http: HttpClient
  ) { }

  loginUser(payload:ILoginUser): Observable<ISession>{
    return this.http.post<ISession>(`${ENDPOINTS.login}`, payload)
  }

  getAndCheckUser(): Observable<IUserSession>{
    return this.http.get<IUserSession>(`${ENDPOINTS.getAndCheckUser}`)
  }


}
