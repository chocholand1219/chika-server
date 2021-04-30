import {Service} from 'typedi'
import {env} from '@src/env'
import axios from 'axios'

const apiHost = env.API_HOST

@Service()
export class StibeeService {
  constructor() {}

  async subscribers(listId: number): Promise<any> {
    return axios.post(`/lists/${listId}/subscribers`)
  }

  async removeSubscribers(listId: number): Promise<any> {
    return axios.delete(`/lists/${listId}/subscribers`)
  }

  async unsubscribers(listId: number): Promise<any> {
    return axios.put(`/lists/${listId}/subscribers/unsubscribe`)
  }
}
