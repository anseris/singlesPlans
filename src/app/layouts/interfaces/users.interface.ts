export interface IFullUser{
    _id?: string,
    idLogin?: string,    
    loginUser: ILoginUser,
    personalData?: IPersonalData,
    accountData? : IAccountData
}

export interface ILoginUser{
    nickName: string,
    email: string,
    password: string
}

export interface IPersonalData{
    image: string,
    name: string,
    secondName: string,
    birthDate: string,
    gender: string,
    phone: string
}

export interface IAccountData{
    titularCard: string,
    IBAN: string,
    code: string,
    caducyDate: string,
}

