import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-send-recieve',
  templateUrl: './send-recieve.component.html',
  styleUrls: ['./send-recieve.component.css']
})
export class SendRecieveComponent implements OnInit {
   address!:string;
   privateKey!:string;
  constructor(private dataService: DataService) { 
    
    const data = this.dataService.getDataStream();
    data.subscribe({
      next:(data:any)=>{
        this.address = data.address;
        this.privateKey = data.privateKey;
      },error(err:any){
        console.log(err);
      }
    })
  }
  ngOnInit(): void {
    console.log(this.address , this.privateKey)
  }

}
