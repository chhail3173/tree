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
    // this.jsonData.forEach((element: any) => {
    //   this.obj = {
    //     name: element.name,
       
    //     children: [
    //       {
    //         name: element.name,
    //         children: element.children
    //       }
    //     ]
    //   }
    //   TREE_DATA.push(this.obj);
    //   })
    // this.dataSource.data = TREE_DATA;
    // this.dataSource.data = this.firstCase() // if Json file doesn’t have data.
    // let validate = this.secondCase(TREE_DATA); // if Json file have not valid data
    // this.dataSource.data = this.thirdCase(); // if json file have single value in an object data
    // this.dataSource.data = this.fourthCase(); //  if json file have nested data in an object data.
    //this.dataSource.data = this.fifthCase(); //  if json file have array of object in object data.
    // console.log(validate);
    

    
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
      // this.dataSource.data = TREE_DATA;
    // this.dataSource.data = this.firstCase() // if Json file doesn’t have data.
    // let validate = this.secondCase(TREE_DATA); // if Json file have not valid data
    // this.dataSource.data = this.thirdCase(); // if json file have single value in an object data
    // this.dataSource.data = this.fourthCase(); //  if json file have nested data in an object data.
    //this.dataSource.data = this.fifthCase(); //  if json file have array of object in object data.
    // console.log(validate);

      
    })
  }
  

  
  firstCase() {
    return []


  }
 
   secondCase = (val:any) => val instanceof Array || val instanceof Object ? true : false;
   thirdCase() {
    return [
      {
        "name": "Vegetables",  
        }
    ]
  }

  fourthCase() {
    return [
      {
        "name": "Vegetables",
        
        "children": [
          {
            "name": "Green",
            "id": "0003",
            "children": [
            { "name": "Broccoli" },
            { "name": "Brussels sprouts" }
            ]
          }
        ]
        }
      
    ]

  }

  fifthCase() {
    return [
      {
        "name": "Vegetables",
        
        "children": [
          {
            "name": "Green",
            "id": "0003",
            "children": [
            { "name": "Broccoli" },
            { "name": "Brussels sprouts" }
            ]
          }
        ]
        },
        {
          "name": "Fruits",
          "children": [
            {
              "name": "Mango",
              "id": "0004",
              "children": [
              { "name": "Langda" },
              { "name": "Dashahari" }
              ]
            }
          ]
        } 
    ]
  }
 
  

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
