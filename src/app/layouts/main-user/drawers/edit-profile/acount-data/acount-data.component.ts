import { Component, model } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { GetUserService } from '../services/get-user.service';
import { NgIf } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-acount-data',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzDatePickerModule,
    NzRadioModule,
    NzIconModule,
    NgIf 
  ],
  templateUrl: './acount-data.component.html',
  styleUrl: './acount-data.component.scss'
})
export class AcountDataComponent {
  id: string = '';
  userSession = {};  
  myFormAccount!: FormGroup;
  initErrorForm: boolean = false;
  showModuleEdit: boolean = false;
  acountForm = model()

  constructor(
    private getUserService: GetUserService,
    private fb: FormBuilder
  ){
    this.initForms();
  }

  ngOnInit(): void {
    this.getUserData()
    
  }

  initForms(){
   
    this.myFormAccount= this.fb.group({
      titularCard: new FormControl(''),
      IBAN: new FormControl(''),
      code: new FormControl(''),
      caducyDate: new FormControl('')
    })
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
    this.saveAcountForm()
  }

  getUserData() {
    this.getUserService.getUserData.subscribe({
      next: (user)=>{
        this.myFormAccount.setValue({
          titularCard: user.accountData?.titularCard,
          IBAN: user.accountData?.IBAN,
          caducyDate: user.accountData?.caducyDate,
          code: user.accountData?.code
        });
        this.acountForm.set(this.myFormAccount)
      }
      
      
    })
   

  }

  saveAcountForm(){
    if(this.myFormAccount.valid && this.showModuleEdit){
      this.acountForm.set(this.myFormAccount);
    }
  }

  changeshowModuleEdit(){
    this.showModuleEdit = true
  }

 
  get titular() { return this.myFormAccount?.get('titularCard')}
  get numeroCuenta() { return this.myFormAccount?.get('IBAN')}
  get fechaCad() { return this.myFormAccount?.get('caducyDate')}
  get codigo() { return this.myFormAccount?.get('code')}

  

}
