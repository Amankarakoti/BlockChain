import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ethers } from 'ethers';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import crowdFundContract from '../crowdFunding';
import { DataTransferServiceService } from '../services/data-transfer-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  signer: any;
  CFContract: any;
  arr: any = [];
  err:any;

  constructor(private router: Router, public subjectService: DataTransferServiceService, public _loader:NgxUiLoaderService) { }

  ngOnInit(): void {
  }

  setCampaign() {
    this.subjectService.putDataToStream('true');
    this.router.navigate(['./admin/campaignSetter']);
  }

  async refund() {
    try{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    this.signer = provider.getSigner();
    this.CFContract = crowdFundContract(provider);
    const CFContractWithSigner = this.CFContract.connect(this.signer);
    const refundResponse = await CFContractWithSigner.adminRefund();

    this._loader.start();
    await refundResponse.wait();
    this._loader.stop();
    console.log(refundResponse);
    const refundFinalResponse = await refundResponse.wait();
    console.log(refundFinalResponse);
  }
  catch(err:any){
    console.log(this.err,"----------")
    console.log(err.reason);
    this.err =err.reason.split(":")[1];
  } finally{
      this.subjectService.putDataToStream('true');
    }
  }

  async makePayment() {
    try{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    this.signer = provider.getSigner();
    this.CFContract = crowdFundContract(provider);
    const CFContractWithSigner = this.CFContract.connect(this.signer);
    const makePaymentResponse = await CFContractWithSigner.makePayment();
    this._loader.start();
    await makePaymentResponse.wait();
    this._loader.stop();
    console.log(makePaymentResponse);
    const makePaymentFinalResponse = await makePaymentResponse.wait();
    console.log(makePaymentFinalResponse);
    this.subjectService.putDataToStream('true');}
    catch(err:any){
      this.err = err.reason.split(":")[1];
      console.log(err.message);
    } finally{
      this.subjectService.putDataToStream('true');
    }
  }

  async contributorsArr() {
    try{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    this.signer = provider.getSigner();
    this.CFContract = crowdFundContract(provider);
    const CFContractWithSigner = this.CFContract.connect(this.signer);
    const contriResponse = await CFContractWithSigner.getContributorsArr();
    console.log(contriResponse);
    for (let i = 0; i < contriResponse.length; i++) {
      const amount = await this.contributorsMap(contriResponse[i]);
      const val = contriResponse[i] + " : " + amount / 10 ** 18;
      this.arr.push(val);
    }}
    catch(err:any){
       
      this.err = err.reason;
      // console.log(err);

    } finally{
      this.subjectService.putDataToStream('true');
    }
  }

  async contributorsMap(address: any) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    this.signer = provider.getSigner();
    this.CFContract = crowdFundContract(provider);
    const CFContractWithSigner = this.CFContract.connect(this.signer);
    const contriResponse = await CFContractWithSigner.contributors(address);
    // console.log(contriResponse);
    return contriResponse.toString()
  }

}
