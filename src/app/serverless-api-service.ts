import { Injectable } from '@angular/core';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ServerlessApiServiceService {
  private initalized: boolean;
  public apiUrl: string;
  private client: AxiosInstance;

  constructor() {}

  async ready() {
    if (!this.initalized) {
      this.apiUrl = 'http://localhost:3000/dev/';
      this.client = this.createClient(this.apiUrl);
    }
  }

  private createClient(baseURL: string): AxiosInstance {
    return axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      responseType: 'json',
    });
  }

  async getAllRecords(): Promise<[]> {
    const data = await this.request('GET', 'records');
    return data.records;
  }

  private async request(method: 'POST' | 'GET', path: string, data: {} = {}) {
    const conf: AxiosRequestConfig = {
      url: path,
      method,
    };
    if (method === 'POST') {
      conf.data = data;
    } else {
      conf.params = data;
    }
    const response = await this.client.request(conf);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error(response);
      throw Error('request 失敗');
    }
  }
}
