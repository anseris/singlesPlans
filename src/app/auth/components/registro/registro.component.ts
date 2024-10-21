import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { RegistroService } from '../../services/registro.service';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ILoginUser, ISession, IUserCreated, IUserSession } from '../../interfaces/login.interface';
import { SESSION } from '../../../share/constant/session.constant';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzModalModule
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  initErrorForm: boolean = false;

  myForm!: FormGroup;

  constructor(
    private registroService: RegistroService,
    private loginService: LoginService,
    // private message: NzMessageService,
    private router: Router,
    private fb: FormBuilder
  ){
    this.initForm()
  }

  initForm(){
    this.myForm = this.fb.group({
      nickName: new FormControl('', [Validators.required]),
      email: new FormControl('',[
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ])
    })
  } 

  registrar(){
    this.initErrorForm = true;
    if(this.myForm.valid){
      this.registroService.registerUser(this.myForm.value).subscribe((res:IUserCreated)=>{
        console.log('YYYYYY', res)
        if (res.success){
          this.loginUser()
        }
      })
    }
    
  
  }

  loginUser(){
    const payload: ILoginUser = {
      email: this.myForm.value.email,
      password: this.myForm.value.password
    }
    this.loginService.loginUser(payload).subscribe((resultLogin:ISession)=>{
      localStorage.setItem(SESSION.localStorage, JSON.stringify(resultLogin));
      if(resultLogin?.token){
        this.getAndCheckUser();
      }
    })
  }

  getAndCheckUser(){
    let session: ISession = JSON.parse(localStorage.getItem(SESSION.localStorage) || '');
    this.loginService.getAndCheckUser().subscribe((user:IUserSession)=>{
      if (user) {
        const userChoosed = user.users;
        session.user = userChoosed;
        this.createUser(user);
        
      } else{
        session.token = '';
      }
      localStorage.setItem(SESSION.localStorage, JSON.stringify(session))
     

    })
  }

  createUser(user: IUserSession ){
    const userForm = user.users
    const payload = {
      _id: userForm._id || '',
      idLogin: userForm._id || '',
      loginUser: {
          nickName: userForm.nickName,
          email: userForm.email,
          password: userForm.password
      },
      personalData: {
          image: '',
          name: '',
          secondName: '',
          birthDate: '',
          gender: '',
          phone: ''
          
      },
      accountData: {
          titularCard: '',
          IBAN: '',
          code: '',
          caducyDate: '' 
          
      }
    }
    this.registroService.createUser(payload).subscribe((res:IUserCreated)=>{
      if (res.success){
        this.router.navigate(['/logado'])
      }
    })
  }

  get nick() { return this.myForm?.get('nickName')}
  get mail() { return this.myForm?.get('email')}
  get pass() { return this.myForm?.get('password')}


}






