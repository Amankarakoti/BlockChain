import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  transaction!:any;

  constructor(private dataService:DataService) { 
    const data = this.dataService.getDataStream();
    // console.log("data",data);
    data.subscribe({
      next:(data:any)=>{
        this.transaction = data.sendTransactionPromise;
        // console.log(this.transaction);
      },error(err:any){
        console.log(err);
      }
    })
  }

  ngOnInit(): void {
    
  }

}
