import { Component } from '@angular/core';
import { ServerlessApiServiceService } from '../serverless-api-service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  loading: boolean;
  records: object[];
  constructor(private ApiService: ServerlessApiServiceService) {}

  async ionViewWillEnter() {
    try {
      this.loading = true;
      this.records = null;
      await this.ApiService.ready();
      this.records = await this.ApiService.getAllRecords();
      console.log(this.records);
    } catch (err) {
      console.error(err);
    } finally {
      this.loading = false;
    }
  }
}
