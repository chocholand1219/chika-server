import jwt from 'jsonwebtoken'
import {auth} from './config'

export const getToken = (email: string): any => {
  return jwt.sign({email}, auth.secret)
}

export const getDecodedToken = (token: string): any => {
  return jwt.verify(token, auth.secret)
}
