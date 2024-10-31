import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRecoverPass, IUser } from '../interfaces/login.interface';
import { ENDPOINTS } from '../../share/constant/endpoints.constant';
import { Observable } from 'rxjs';
import { ISendMail, ISendMailResponse, IUpdatePassword } from '../interfaces/recover.interface';
import { IFullUser } from '../../layouts/interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})
export class RecoverService {

  constructor(
    private http: HttpClient
  ) { }

  getUserRecover(payload:IRecoverPass): Observable<IUser>{
    return this.http.post<IUser>(`${ENDPOINTS.recoverPass}`, payload)
  }
  sendEmail(payload:ISendMail): Observable<ISendMail>{
    return this.http.post<ISendMail>(`${ENDPOINTS.sendMail}`, payload)
  }

  getUser(id:string): Observable<IFullUser>{
    return this.http.get<IFullUser>(`${ENDPOINTS.getUser}/${id}`)
  }

  updatePassword(id:string, payload:IUpdatePassword): Observable<IUpdatePassword>{
    return this.http.put<IUpdatePassword>(`${ENDPOINTS.updatePassword}/${id}`, payload)
  }

  
}
