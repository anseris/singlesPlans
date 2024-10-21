import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IUser } from '../../interfaces/login.interface';
import { ENDPOINTS } from '../../../share/constant/endpoints.constant';
import { IFullUser } from '../../interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private http: HttpClient 
  ) { }
  

  getUsers(): Observable<IFullUser[]>{
    return this.http.get<IFullUser[]>(`${ENDPOINTS.getUsers}`).pipe(
      map(users=>users.sort((a, b)=>{
        return a.loginUser.nickName.localeCompare(b.loginUser.nickName)
      }))
    )
  }

  getUser(id:string): Observable<IFullUser>{
    return this.http.get<IFullUser>(`${ENDPOINTS.getUser}/${id}`)
  }

  deleteUser(id:string): Observable<IUser>{
    return this.http.delete<IUser>(`${ENDPOINTS.deletUser}/${id}`)
  }

  updateUser(payload:IFullUser, id: string): Observable<IFullUser>{
    return this.http.put<IFullUser>(`${ENDPOINTS.updateUser}/${id}`, payload)
  }
  
}
