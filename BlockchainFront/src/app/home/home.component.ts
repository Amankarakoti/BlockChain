import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {Router} from '@angular/router'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dataService:DataService, private router:Router) { 
    
  }

  ngOnInit(): void {
  }
  createWallet(){
    const ethers = require('ethers');
    const wallet  = ethers.Wallet.createRandom();
    let address = wallet.address;
    let privateKey =  wallet.privateKey;
    this.dataService.putDataStream({address,privateKey});
    this.router.navigate(['./send-recieve'])
  }

}
