import {Service} from 'typedi'
import axios from 'axios'
import {env} from '@src/env'
import qs from 'qs'

const ALIGO_API_KEY = 'dzis9csvvgb89gqe4wes0ea8und1tqfn'

@Service()
export class SMSService {
  async send(receiver: string, msg: string): Promise<any> {
    return await axios
      .post(
        env.SMS_HOST + '/send/',
        qs.stringify({
          key: ALIGO_API_KEY,
          user_id: 'chika',
          sender: '010-2249-3851',
          receiver,
          msg,
          testmode_yn: env.SMS_TESTMODE,
        }),
        {
          headers: {'content-type': 'application/x-www-form-urlencoded'},
        }
      )
      .then(({data}) => {
        console.log('data', data)
      })
  }
}
