import { Component, OnInit } from '@angular/core';
import {ContentServiceService} from '../../service/content-service.service'

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  constructor(private contentServiceService : ContentServiceService) { }

  ngOnInit() {
    
  }

}
