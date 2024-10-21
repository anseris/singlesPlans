import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { SESSION } from "../../../share/constant/session.constant";
import { ISession } from "../../interfaces/login.interface";

export const loginInterceptor = (req: HttpRequest<unknown>, next:HttpHandlerFn) => {
    const storage = localStorage.getItem(SESSION.localStorage);
    let token = '';

    if (storage) {
        const session: ISession = JSON.parse(localStorage.getItem(SESSION.localStorage) || '');
        if (session.token){
            token = session.token;
        }
    };
    // Clone el request y añade la autorizacion al header
    const authReq = req.clone({
        setHeaders:{
            Authorization: `Bearer ${token}`
        }
    });
    return next(authReq)
}