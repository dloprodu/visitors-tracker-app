/* eslint-disable no-underscore-dangle */
import axios, { Axios } from 'axios';

import IPDAta from './models/ip-data';

const IP_STACK_BASE_URL = process.env.REACT_APP_IP_STACK_BASE_URL;
const IP_STACK_PUBLIC_API_KEY = process.env.REACT_APP_IP_STACK_API_KEY;

/**
 * IP STACK API proxy service.
 */
export default class IPStackAPI {

  private static instance: IPStackAPI;

  private readonly _axios: Axios;

  private constructor() {
    this._axios = axios.create({
      baseURL: IP_STACK_BASE_URL,
    });

    this._axios.defaults.headers.post['Content-Type'] = 'application/json';
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): IPStackAPI {
    if (!IPStackAPI.instance) {
      IPStackAPI.instance = new IPStackAPI();
    }

    return IPStackAPI.instance;
  }
  
  /**
   * Fetch the IP user data.
   */
  async fetchData(): Promise<IPDAta> {
    const url = `/check?access_key=${IP_STACK_PUBLIC_API_KEY}`;
    const res = await this._axios.get<IPDAta>(url);
    return res.data;
  }
}

