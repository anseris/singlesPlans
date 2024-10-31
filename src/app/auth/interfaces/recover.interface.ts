export interface ISendMail{
    to: string,
    title: string,
    link: string,
}

export interface ISendMailResponse{
    message: string,
    // info: IInfo,
}

export interface IInfo{
    accepted: [],
    rejected: [],
    ehlo: [],
    envelopeTime: number,
    messageTime: number,
    messageSize: number,
    response: string,
    envelope: IEnvelope,
    messageId: string
}

export interface IEnvelope{
    from: string,
    to: [],
}

export interface IUpdatePassword{
    passwordToChange: string
}




