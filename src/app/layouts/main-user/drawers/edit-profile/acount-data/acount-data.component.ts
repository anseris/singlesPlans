import { Component, model } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { GetUserService } from '../services/get-user.service';

@Component({
  selector: 'app-acount-data',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzDatePickerModule,
    NzRadioModule
  ],
  templateUrl: './acount-data.component.html',
  styleUrl: './acount-data.component.scss'
})
export class AcountDataComponent {
  id: string = '';
  userSession = {};  
  myFormAccount!: FormGroup;
  initErrorForm: boolean = false;
  acountForm = model()

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
   
    this.myFormAccount= this.fb.group({
      titularCard: new FormControl(''),
      IBAN: new FormControl(''),
      code: new FormControl(''),
      caducyDate: new FormControl('')
    })
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
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
        this.acountForm.set(this.myFormAccount.value)
      }
      
      
    })
   

  }

  saveAcountForm(){

    this.acountForm.set(this.myFormAccount.value)
  }

 
  get titular() { return this.myFormAccount?.get('titularCard')}
  get numeroCuenta() { return this.myFormAccount?.get('IBAN')}
  get fechaCad() { return this.myFormAccount?.get('caducyDate')}
  get codigo() { return this.myFormAccount?.get('code')}

  

}
