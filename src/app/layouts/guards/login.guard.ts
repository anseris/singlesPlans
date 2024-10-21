import { CanActivateFn, Router } from '@angular/router';
import { SESSION } from '../../share/constant/session.constant';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router)
  const session = localStorage.getItem(SESSION.localStorage);
  if (session){
    const token = JSON.parse(session).token;
    if(token){
      return true;
    }
    router.navigate(['/']);
    return false;
  }
  router.navigate(['/']);
  return false;
};
