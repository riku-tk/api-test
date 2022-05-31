import {
  Component,
  OnInit,
} from '@angular/core';
import { ShardService } from '../shard.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  dataList: Array<object>;
  constructor(private service: ShardService) {}

  async ngOnInit() {
    this.dataList = await this.service.getData();
    console.log(this.dataList);
  }
}
