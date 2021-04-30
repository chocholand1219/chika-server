import nodemailer from 'nodemailer'
import smtpPool from 'nodemailer-smtp-pool'
import {Service} from 'typedi'
import {env} from '@src/env'

const emailAddress = env.email.address
const emailPassword = env.email.password
const fromEmail = env.email.sendEmailAddress

const poolConfig = {
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: '465',
  secure: true,
  auth: {
    user: emailAddress,
    pass: emailPassword,
  },
}

interface BasicMailParamType {
  to: string
  name: string
}

interface AuthMailParamType extends BasicMailParamType {
  token: string
}

const apiHost = env.API_HOST

@Service()
export class EmailService {
  constructor(
    private transporter: any = nodemailer.createTransport(smtpPool(poolConfig))
  ) {}

  async sendAuthMail({to, token, name}: AuthMailParamType): Promise<any> {
    return await this.transporter.sendMail({
      from: fromEmail,
      to,
      subject: '가입 확인',
      html: '',
    })
  }
}
