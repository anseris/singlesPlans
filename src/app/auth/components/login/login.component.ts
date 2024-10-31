import { RecoverService } from './../../services/recover.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { SESSION } from '../../../share/constant/session.constant';
import { ISession, IUser, IUserSession } from '../../interfaces/login.interface';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ISendMail, ISendMailResponse } from '../../interfaces/recover.interface';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzFormModule,
    NzIconModule,
    NzMessageModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  myForm!: FormGroup;
  initErrorForm: boolean = false;
  initErrorEmailForm: boolean = false;
  initCheckForm: boolean = false;
  passwordVisible: boolean = false;

  constructor(
    private loginService: LoginService,
    private recoverService: RecoverService,
    private message: NzMessageService,
    private router: Router,
    private fb: NonNullableFormBuilder
  ){
    this.initForm()
  }

  initForm(){
    this.myForm = this.fb.group({
      email: new FormControl('',[
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ])
      // remember: new FormControl(true)
    })
  }

  
  login(){
    this.initErrorForm = true;
    if(this.myForm.valid){
      this.loginService.loginUser(this.myForm.value).subscribe((resultLogin:ISession)=>{
        localStorage.setItem(SESSION.localStorage, JSON.stringify(resultLogin));
        if(resultLogin?.token){
          this.getAndCheckUser();
        }
      })
    }
  }

  getAndCheckUser(){
    let session: ISession = JSON.parse(localStorage.getItem(SESSION.localStorage) || '');
    this.loginService.getAndCheckUser().subscribe((user:IUserSession)=>{
      if (user) {
        const userChoosed = user.users;
        session.user = userChoosed;
        this.router.navigate(['/logado'])
      } else{
        session.token = '';
      }
      localStorage.setItem(SESSION.localStorage, JSON.stringify(session))
     

    })
  }

  recoverPassword(){
    this.initErrorEmailForm = true;
    if(this.myForm.value.email){
      this.recoverService.getUserRecover({email:this.myForm.value.email}).subscribe((user:IUser)=>{
        if (user) {
          const id: string = user._id || ''
          this.sendEmail(id)
        } else{
          // session.token = '';
        }
      })
       
     
    }
  }

  sendEmail(id:string){
    const linkAcces = `http://localhost:4200/recuperar-contraseña?id=${id}`;
    const payload: ISendMail = {
      to: this.myForm.value.email,
      title: 'Recuperacion de password singlesPlans',
      link: linkAcces
    }
    this.recoverService.sendEmail(payload).subscribe((response)=>{
      if (response) {
        this.okMessage()
      } else{
        // session.token = '';
      } 
    })
  }

  okMessage(): void {
    this.message.success(`Se ha enviado un email de recuperación de contraseña a ${this.myForm.value.email}`, {
      nzDuration: 100000
    });
  }

  showCheck(){
  
      this.initCheckForm = true;
  }
  backToHome(){
  
    this.router.navigate(['/'])
  }

  goToRegistro(){
    this.router.navigate(['/nuevo-usuario'])
  }
 
  get mail() { return this.myForm?.get('email')}
  get pass() { return this.myForm?.get('password')}  

}


