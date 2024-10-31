import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-mensaje-simple',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule
  ],
  templateUrl: './mensaje-simple.component.html',
  styleUrl: './mensaje-simple.component.scss'
})
export class MensajeSimpleComponent {
  initErrorForm: boolean = false;
  
  myFormMessage!: FormGroup;
  constructor(
    private fb: FormBuilder
  ){
    this.initForms();
  }

  initForms(){
   
    this.myFormMessage= this.fb.group({
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9)
      ]),
      message: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(200)
      ]),
      
    })
  }

  sendMessage(){
    this.initErrorForm = true;
    if(this.myFormMessage.valid){
      console.log('formulario', this.myFormMessage.value)
    }
  }

  get tel() { return this.myFormMessage?.get('phone')}
  get mensaje() { return this.myFormMessage?.get('message')}
  get pass() { return this.myFormMessage?.get('password')}

}
