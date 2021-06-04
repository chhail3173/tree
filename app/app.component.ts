// import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import {Component, NgModule,Input,ComponentFactory,ComponentRef, ComponentFactoryResolver, ViewContainerRef, ChangeDetectorRef, TemplateRef, ViewChild, Output, EventEmitter} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser';
import {AlertComponent} from './alert/alert.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: `
    <template #alertContainer></template>
    <button (click)="createComponent('success')">Create success alert</button>
    <button (click)="createComponent('danger')">Create danger alert</button>
  `,
})
export class AppComponent {
  title = 'my-app';
  componentRef: any;
  @ViewChild('loadComponent', { read: ViewContainerRef }) entry:any = ViewContainerRef;
  constructor(private resolver: ComponentFactoryResolver) { }
  createComponent() {
    this.entry.clear();

      const factory = this.resolver.resolveComponentFactory(AlertComponent);
      this.componentRef = this.entry.createComponent(factory);
    this.componentRef.instance.message = "Called by appComponent";
  }
  destroyComponent() {
    this.componentRef.destroy();
  }
  data = [
    {
      "Id": 1,
      "Name": "Student Info"
    },
    {
      "Id": 2,
      "Name": "Parent Info"
    }
  ]
  selectName() {
    this.createComponent();
  }
 
}
