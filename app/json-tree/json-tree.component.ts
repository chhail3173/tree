import {FlatTreeControl} from '@angular/cdk/tree';
import { HttpClient } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
// import jsonData from '../json-tree/new.json'



interface FoodNode {
   
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
]

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}


@Component({
  selector: 'app-json-tree',
  templateUrl: './json-tree.component.html',
  styleUrls: ['./json-tree.component.css']
})
export class JsonTreeComponent implements OnInit {
   jsonData:any; 
   obj:any={}

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private httpClient:HttpClient) {  
  }
  ngOnInit() {
    this.httpClient.get("assets/new.json").subscribe(data=>{
      this.jsonData = data;
      console.log(this.jsonData);
       this.jsonData.forEach((element: any) => {
      this.obj = {
        name: element.name,
       
        children: [
          {
            name: element.name,
            children: element.children
          }
        ]
      }
      TREE_DATA.push(this.obj);
      })
      this.dataSource.data = TREE_DATA;
    // this.dataSource.data = this.firstCase(TREE_DATA) 
   

      
    })
  }
  
  // firstCase(value:any) {
  //   if(!value) {
  //     console.log('json file is empty');
      
  //   }else {
  //     return value;
  //     console.log(value);
  //   }
  // }
 
  //  firstCase(val:any){
  //    if(val instanceof Array || val instanceof Object) {
  //      console.log("json is valid");
  //      return val;
  //    }else {
  //      console.log("json is not valid");
  //    }
  // }

  //  firstCase(val:any){
  //   if(val.length === 1) {
  //     console.log('json has single object');      
  //     return val;
  //   }
  //  }

  firstCase(value:any) {
    for(let v of value){
      if(v.children) {
        console.log('json file is nested');
        return value;
      }else {
        console.log('json file is not nested'+value);
      }
    }
  }
 
  

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
