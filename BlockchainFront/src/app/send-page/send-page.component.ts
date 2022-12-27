import { Component, OnInit,NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { AppComponent } from '../app.component';
import { DataService } from '../data.service';
import {Router} from '@angular/router'
// @NgModule({
//   declarations:[AppComponent],
//   imports: [

//              FormsModule
//            ],
//   providers:[],
//   bootstrap:[AppComponent]
// })
@Component({
  selector: 'app-send-page',
  templateUrl: './send-page.component.html',
  styleUrls: ['./send-page.component.css']
})

export class SendPageComponent implements OnInit {

  address!:string;
   privateKey!:string;
   
  constructor(private dataService:DataService, private router:Router) { 
    
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
  
 async sendTransaction(formValues){
    let ethers = require('ethers')
  let provider = new ethers.providers.InfuraProvider("ropsten");
            let privateKey = this.privateKey;
            let gas = formValues.gasFee;

            let wallet = new ethers.Wallet(privateKey, provider)
            // const signer = wallet.connect(provider);
            let amountInEther = formValues.amount;
            let transaction = {
                to: formValues.to,
                value: ethers.utils.parseEther(amountInEther), 
                gasPrice: ethers.utils.parseUnits(gas, 'gwei')
            }
            const estimateGasPromise = await wallet.estimateGas(transaction);
            // const signedTx = await wallet.signTransaction(transaction);
            console.log(estimateGasPromise.toString());
            transaction['gasLimit'] = estimateGasPromise;
            
            // const signedTx = await wallet.signTransaction(transaction,privateKey).then(ethers.utils.serializeTransaction(transaction));
            const sendTransactionPromise = await wallet.sendTransaction(transaction);
            console.log('txHash',sendTransactionPromise.hash);
            this.dataService.putDataStream({sendTransactionPromise});
            this.router.navigate(['./receipt'])
          
  }
 
  ngOnInit(): void {
  }

}
