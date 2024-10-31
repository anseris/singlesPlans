export interface ILoginUser{
    email: String,
    password: String,
}

export interface ISession{
    success: boolean,
    msg: string,
    token: string,
    user: IUser
}

export interface IUser{
    _id?: string,
    nickName: string,
    email: string,
    password: string,
}

export interface IUserSession{
    users: {
        _id?: string,
        nickName: string,
        email: string,
        password: string,
    }
   
}

export interface IUserCreated{
    success: boolean,
    msg: string
}