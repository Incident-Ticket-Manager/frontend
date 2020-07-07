import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-timestamp-to-date',
  templateUrl: './timestamp-to-date.component.html',
  styleUrls: ['./timestamp-to-date.component.css']
})
export class TimestampToDateComponent implements OnInit {
  @Input() date: Date;
  @Input() ticketsNumber: number;

  constructor() { }

  ngOnInit(): void {
  }

}
