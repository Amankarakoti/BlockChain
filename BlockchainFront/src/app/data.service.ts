import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn:"root"
})
export class DataService {
private _dataStream = new BehaviorSubject({}); 
  constructor() { };
  getDataStream() {      
    return this._dataStream.asObservable();
  }  
  putDataStream(data:any){
    this._dataStream.next(data)
  }
}
