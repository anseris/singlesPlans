import { Injectable } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import { SESSION } from '../../../../../share/constant/session.constant';
import { ISession } from '../../../../interfaces/login.interface';
import { IFullUser } from '../../../../interfaces/users.interface';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetUserService {

  constructor(
    private usuariosService: UsuariosService,
  ) { }

 getUserData = new Observable<IFullUser>((subscriber)=>{
    const userSession = localStorage.getItem(SESSION.localStorage);
    if (userSession) {
      const session: ISession = JSON.parse(localStorage.getItem(SESSION.localStorage) || '');
      if (session.user){
        let id = session.user._id || '';
        this.usuariosService.getUser(id).subscribe((user: IFullUser)=>{
          subscriber.next(user) 
        })
      }
    }

  })


 


}
