import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-recieve-page',
  templateUrl: './recieve-page.component.html',
  styleUrls: ['./recieve-page.component.css']
})
export class RecievePageComponent implements OnInit {

  address!:string;
  
  constructor(private dataService: DataService) { 
    
    const data = this.dataService.getDataStream();
    data.subscribe({
      next:(data:any)=>{
        this.address = data.address;
      },error(err:any){
        console.log(err);
      }
    })

  

}
ngOnInit(): void {
  console.log(this.address);
}
}
