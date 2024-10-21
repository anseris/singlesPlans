import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const nzMessageService: NzMessageService = inject(NzMessageService)
  return next(req).pipe(catchError((err: any) => {
    if (err instanceof HttpErrorResponse){
      // handle HTTP errors
      if(err.status === 401){
        console.log('unauthorized request', err);
        nzMessageService.error('No estás Autorizado');
        // You miigh trigger re-authentification flow or redirect the user here
      } else {
        nzMessageService.error(err.message)
      }
    } else{
      console.log('unauthorized request', err);
      nzMessageService.error('Error Desconocido');
    }
    return throwError(()=> err)
  }))
};
