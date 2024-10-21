import { ISession, IUser } from './../../../interfaces/login.interface';
import { Component, input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { UsuariosService } from '../../services/usuarios.service';
import { IFullUser } from '../../../interfaces/users.interface';
import { AvatarEditComponent } from './avatar-edit/avatar-edit.component';
import { LoginDataComponent } from './login-data/login-data.component';
import { PersonalDataComponent } from './personal-data/personal-data.component';
import { AcountDataComponent } from './acount-data/acount-data.component';
import { RegistroService } from '../../../main/services/registro.service';
import { SESSION } from '../../../../share/constant/session.constant';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [   
    NzDrawerModule,
    NzCollapseModule,
    NzInputModule,
    NzButtonModule,
    NzDatePickerModule,
    NzRadioModule,
    AvatarEditComponent,
    LoginDataComponent,
    PersonalDataComponent,
    AcountDataComponent
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {
  visible: boolean = true;

  

  
  myFormPersonal!: FormGroup;
  myFormAccount!: FormGroup;
  initErrorForm: boolean = false;

  userSession = {};  

  panels = [
    {
      active: false,
      name: 'Nick y email',
      disabled: false,
      type: 'loginData'
    },
    {
      active: false,
      disabled: false,
      name: 'Datos personales',
      type: 'personalData'
    },
    {
      active: false,
      disabled: false,
      name: 'Datos bancarios',
      type: 'accountData'
    }
  ];
  loginForm!: any;
  personalForm!:any;
  acountForm!:any;
  nicKnameAvatar!: string;
  id!: string;

  loginUser!:any;
  personalData!:any;
  acountData!:any
  onFormChange = input<IUser>()

  constructor(
    private usuariosService: UsuariosService,
    private registroService: RegistroService
  ){
  }

  ngOnInit(): void {
    // this.getUserData()
    
  }


  // ngOnChanges(changes: SimpleChanges): void {
  //   //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
  //   //Add '${implements OnChanges}' to the class.
  //   console.log('onChange: ', changes);
    
  // }

  // onChange(){
  //   console.log('onChange: ', this.loginForm);
  // }

  

  // prueba(){
  //   const payload: IFullUser = {
  //     idLogin: this.id || '',
  //     loginUser: this.loginForm,
  //     personalData: this.personalForm,
  //     accountData: this.acountForm

  //   }
  //   // this.updateUser(payload)
  // }

  saveProfile(){
    // this.initErrorForm = true;
    // if(this.myFormLogin.valid && this.myFormPersonal.valid && this.myFormAccount.valid){
      this.updateUser()
      // this.isVisibleEdit = false;
    // }
  }
 

  updateUser() {

    this.registroService.updateUser(this.loginForm, this.id).subscribe(_=>{
      // this.message.success('Usuario editado');
      this.changeSession();
      this.updateFullUser();

    })    
  }

 
  


  updateFullUser(){
    const payload : IFullUser = this.getPayload();
    this.usuariosService.updateUser(payload, this.id).subscribe(_=>{
      console.log('Usuario editado');
      // this.message.success('Usuario editado');

    })

  }

  changeSession(){
    const userSession = localStorage.getItem(SESSION.localStorage);

    if (userSession) {
        const session: ISession = JSON.parse(localStorage.getItem(SESSION.localStorage) || '');
        if (session.user){
          const user = session.user;
          user.nickName = this.loginForm.nickName;
          user.email = this.loginForm.email;
          user.password = this.loginForm.password;

          localStorage.setItem(SESSION.localStorage, JSON.stringify(session))
        }
    };

  }

  getPayload(){
    return {
      idLogin: this.id || '',
      loginUser: this.loginForm,
      personalData: this.personalForm,
      accountData: this.acountForm
    }
   }

  close(): void {
    this.visible = false;
  }

  

}
