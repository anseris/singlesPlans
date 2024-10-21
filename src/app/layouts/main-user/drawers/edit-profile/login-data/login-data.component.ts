
import { Component, EventEmitter, model, Output} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { UsuariosService } from '../../../services/usuarios.service';
import { RegistroService } from '../../../../main/services/registro.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GetUserService } from '../services/get-user.service';
import { IUser } from '../../../../interfaces/login.interface';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login-data',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NgIf 
  ],
  templateUrl: './login-data.component.html',
  styleUrl: './login-data.component.scss'
})
export class LoginDataComponent {
  userSession = {};  
  myFormLogin!: FormGroup;
  initErrorForm: boolean = false;
  showModuleEdit: boolean= false
  userLogin!: IUser
  loginForm = model();
  id = model();
  nameAvatar = model();

  constructor(
    private getUserService: GetUserService,
    private fb: FormBuilder
  ){
    this.initForms();
  }

  // @Output() formChange = new EventEmitter<any>();

  ngOnInit(): void {
    this.getUserData()
    
  }

  initForms(){
   
    this.myFormLogin= this.fb.group({
      nickName: new FormControl('',[
        Validators.required
      ]),
      email: new FormControl('',[
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('',[
        Validators.required,
        Validators.minLength(4)
      ])
    })
  }

  getUserData() {
    this.getUserService.getUserData.subscribe({
      next: (user)=>{
        this.userLogin = user.loginUser
        this.myFormLogin.setValue({
          nickName: user.loginUser.nickName,
          email: user.loginUser.email,
          password: user.loginUser.password,
        });
        this.loginForm.set(this.myFormLogin.value)
        const firstLetteAvatar = user.loginUser.nickName.substring(0, 1).toUpperCase();
        this.nameAvatar.set(firstLetteAvatar);
        this.id.set(user._id)
      }
      
      
    })
   

  }

  saveLoginForm(){

    this.loginForm.set(this.myFormLogin.value)
  }

  changeshowModuleEdit(){
    this.showModuleEdit = true
  }

 
  

  

  get alias() { return this.myFormLogin?.get('nickName')}
  get mail() { return this.myFormLogin?.get('email')}
  get pass() { return this.myFormLogin?.get('password')}

}


