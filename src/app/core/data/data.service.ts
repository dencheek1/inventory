import { Injectable } from '@angular/core';
import { Container } from '../interface/container/container';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  flatDataNodes(data: Container): Container[] {
    let nodes = [data];
    let i = 0;
    while(i < nodes.length){
      if(nodes[i].children.length > 0){
        nodes.push(...nodes[i].children);
      }
      i++;
    }
    return nodes;
  }

  findWithId(data: Container, id:string){
    let arr = this.flatDataNodes(data);
    return arr.find( el => el.id == id);
  }
}
