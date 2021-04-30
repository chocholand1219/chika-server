import {Service} from 'typedi'
import axios from 'axios'
import {env} from '@src/env'

@Service()
export class ApiService {
  async external(url: string, data: any): Promise<any> {
    console.log('questionmentService', url, data)
    return axios
      .post(`${env.PHP_SERVER}/api${url}`, data)
      .then((res) => {
        if (res.data.status_code === 200) {
          return res
        }
        throw new Error(JSON.stringify(data) + JSON.stringify(res.data))
      })
      .catch((err) => {
        console.log('questionmentService Error:', err.response.data)
        throw new Error(JSON.stringify(err.response.data))
      })
  }

  async api(url: string, method: string, data: any = {}): Promise<any> {
    return axios({
      url: env.ZIP_API_HOST + url,
      headers: {
        authorization: '7ab2ecc9-48a1-4b9c-8e11-e6116b246071',
      },
      method,
      ...data,
    })
  }
}
