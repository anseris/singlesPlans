import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINTS } from '../../../share/constant/endpoints.constant';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/usuarios.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private http: HttpClient 
  ) { }

  getUsers(): Observable<IUser[]>{
    return this.http.get<IUser[]>(`${ENDPOINTS.api}/users`)
  }
}
