import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser, IUserCreated } from '../interfaces/login.interface';
import { ENDPOINTS } from '../../share/constant/endpoints.constant';
import { IFullUser } from '../../layouts/interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(
    private http: HttpClient
  ) { }

  registerUser(payload:IUser): Observable<IUserCreated>{
    return this.http.post<IUserCreated>(`${ENDPOINTS.registerUser}`, payload)
  }

  createUser(payload:IFullUser): Observable<IUserCreated>{
    return this.http.post<IUserCreated>(`${ENDPOINTS.createUser}`, payload)
  }

  updateUser(payload:IUser, id: string): Observable<IUser>{
    return this.http.put<IUser>(`${ENDPOINTS.updateLoginUser}/${id}`, payload)
  }
  
}
