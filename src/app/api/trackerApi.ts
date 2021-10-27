/* eslint-disable no-underscore-dangle */
import axios, { Axios } from 'axios';

import ClientInfo from 'app/util/clientInfo';

import Guest from './models/guest';
import PagesResponse from './models/pagedResponse';

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

    const url = `/visit`;
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
  async fetchGuests(params?: GuestQueryParams): Promise<PagesResponse<Guest>> {
    const query = Object
      .keys(params ?? {})
      .filter(key => !!(params as any)[key])
      .map(key => `${key}=${(params as any)[key]}`)
      .join('&')

    const url = `/visits/show?${query}`;
    const res = await this._axios.get<PagesResponse<Guest>>(url);
    return res.data;
  }

  async populate(): Promise<void> {
    const IPS = [
      '84.38.103.209',
      '77.6.251.224',
      '201.220.153.161',
      '31.157.135.54',
      '101.170.71.103',
      '35.244.52.179',
      '159.239.17.179',
      '54.66.155.20',
      '12.17.179.75',
      '154.20.147.64',
      '76.12.249.180',
      '156.101.208.148',
      '216.251.52.17',
      '197.26.123.3',
      '83.183.242.156',
      '60.212.5.84',
      '179.13.169.184',
      '34.234.251.90',
      '197.59.186.169',
      '122.120.127.59',
      '61.135.179.5',
      '69.172.14.4',
      '219.76.9.70',
      '95.233.33.130',
      '12.247.79.16',
      '243.133.37.65',
      '41.44.3.172',
      '70.251.19.56',
      '84.120.144.119',
      '181.45.241.79',
      '244.204.204.43',
    ];

    const PLATFORMS = [
      'ios',
      'android',
      'windows-phone',
      'desktop'
    ];

    const BROWSERS = [
      'chrome',
      'edge',
      'edge-chromium',
      'firefox',
      'ie',
      'safari',
      'opera'
    ];

    const REGIONS = [
      { countryCode: 'ES', countryName: 'Spain', continentCode: 'EU', continentName: 'Europe', regionCode: 'CN', regionName: 'Canary Islands' },
      { countryCode: 'GB', countryName: 'United Kingdom', continentCode: 'EU', continentName: 'Europe', regionCode: 'FL', regionName: 'Florida' },
      { countryCode: 'US', countryName: 'United States', continentCode: 'NA', continentName: 'North america', regionCode: 'BIR', regionName: 'Birmingham' }
    ]

    // eslint-disable-next-line no-plusplus
    IPS.forEach(async (ip) => {
      const userAgent = BROWSERS[Math.floor(Math.random() * BROWSERS.length)];
      const platform = PLATFORMS[Math.floor(Math.random() * PLATFORMS.length)];
      const region = REGIONS[Math.floor(Math.random() * REGIONS.length)];

      const guest: Guest = {
        ip,
        ipType: 'ipv4',
        userAgent,
        platform,
        language: 'en',
        country: region.countryCode,
        countryName: region.countryName,
        region: region.regionCode,
        regionName: region.regionName,
        continent: region.continentCode,
        continentName: region.continentName
      }
  
      const url = `/visit`;
      await this._axios.post<Guest>(url, guest);
    });
  }

}

