import { Component, OnInit } from '@angular/core';
import { ethers } from 'ethers';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import crowdFundContract from '../crowdFunding';
import { DataTransferServiceService } from '../services/data-transfer-service.service';


@Component({
  selector: 'app-contributor',
  templateUrl: './contributor.component.html',
  styleUrls: ['./contributor.component.css'],
})
export class ContributorComponent implements OnInit {
  constructor(public subjectService:DataTransferServiceService,public _loader:NgxUiLoaderService) { }
  signer: any;
  CFContract: any;
  err:any;
  ngOnInit(): void { }

  async sendEther(val: any) {
    try{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    this.signer = provider.getSigner();
    this.CFContract = crowdFundContract(provider);
    const CFContractWithSigner = this.CFContract.connect(this.signer);
    const sendEthResponse = await CFContractWithSigner.sendEther({
      value: ethers.utils.parseEther(val),
    });
    console.log(sendEthResponse);
    this._loader.start();
    await sendEthResponse.wait();
    this._loader.stop();
    console.log(await sendEthResponse.wait());}
    catch(err:any){
      console.log(err);
      if(err.reason == "invalid decimal value")
        this.err = err.reason;
      else  
        this.err = err.reason.split(":")[1];

    } finally {
    this.subjectService.putDataToStream('true');}
  }

  async vote() {
    try{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    this.signer = provider.getSigner();
    this.CFContract = crowdFundContract(provider);
    const CFContractWithSigner = this.CFContract.connect(this.signer);
    const voteResponse = await CFContractWithSigner.voteRequest();
    console.log(voteResponse);
    this._loader.start();
    await voteResponse.wait();
    this._loader.stop();
  } catch(err:any){
    this.err = err.reason.split(":")[1];
    console.log(err.message);
  } finally{
    this.subjectService.putDataToStream('true');}
  }

  
}
