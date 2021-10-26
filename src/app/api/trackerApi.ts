/* eslint-disable no-underscore-dangle */
import axios, { Axios } from 'axios';

import ClientInfo from 'app/util/clientInfo';

import Guest from './models/guest';

import IPStackAPI from './ipStackApi';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

/**
 * Guest query params.
 */
export interface GuestQueryParams {
  offset?: number;
  limit?: number;
  userAgent?: string;
  platform?: string;
  language?: string;
  country?: string;
}

/**
 * Tracker API proxy service.
 */
export default class TrackerApi {

  private static instance: TrackerApi;

  private readonly _axios: Axios;

  private constructor() {
    this._axios = axios.create({
      baseURL: API_BASE_URL,
    });

    this._axios.defaults.headers.post['Content-Type'] = 'application/json';
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): TrackerApi {
    if (!TrackerApi.instance) {
      TrackerApi.instance = new TrackerApi();
    }

    return TrackerApi.instance;
  }
  
  /**
   * Register the guest visit.
   */
  async register(): Promise<Guest> {
    const data = await IPStackAPI
      .getInstance()
      .fetchData();

    const guest: Guest = {
      ip: data.ip,
      ipType: data.type,
      userAgent: ClientInfo.browser,
      platform: ClientInfo.platform,
      language: navigator.language,
      country: data.country_code,
      countryName: data.country_name,
      region: data.region_code,
      regionName: data.region_name,
      continent: data.continent_code,
      continentName: data.continent_name
    }

    const url = `/tracker/visit`;
    const res = await this._axios.post<Guest>(url, guest);
    return res.data;
  }

  /**
   * Fetches individual print and digital comic issues, collections and graphic novels. For example: Amazing Fantasy #15.
   * 
   * @param offset
   * @param limit
   * @return {AxiosPromise<Comic[]>}
   */
  async fetchGuests(params?: GuestQueryParams): Promise<Guest[]> {
    const query = Object
      .keys(params ?? {})
      .filter(key => !!(params as any)[key])
      .map(key => `${key}=${(params as any)[key]}`)
      .join('&')

    const url = `/tracker/visit?${query}`;
    const res = await this._axios.get<Guest[]>(url);
    return res.data;
  }

}

