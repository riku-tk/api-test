import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_URL = 'https://reqres.in';
@Injectable({
  providedIn: 'root',
})
export class ShardService {
  users: any;
  url: string;
  dataArray: Array<object>;
  constructor(private http: HttpClient) {
    this.url = 'users?page=1';
  }

  get() {
    return this.http.get(API_URL + '/api/' + this.url).toPromise();
  }

  async getData() {
    const dataList = [];
    const data = await this.get();
    data['data'].forEach((element) => {
      dataList.push(element);
      console.log(element);
    });
    console.log(dataList);
    console.log(typeof dataList);
    return dataList;
  }
}
