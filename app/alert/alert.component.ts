import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  template: `
  <section [@fadeInOut]>
   <h1 (click)="output.next('output')">Alert {{type}}</h1>
  <section>
`,
animations: [
  trigger('fadeInOut', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate(500, style({ opacity: 1 }))
    ]),
    transition(':leave', [
      animate(500, style({ opacity: 0 }))
    ])
  ])
],
  
})
export class AlertComponent implements OnInit {
  @Input() type: string = "success";

  constructor() { }

  ngOnInit(): void {
  }

}
