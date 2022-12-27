import { Component, OnInit } from '@angular/core';
import { DataTransferServiceService } from '../services/data-transfer-service.service';
import crowdFundContract from '../crowdFunding';
import { ethers } from 'ethers';
import { NgxUiLoaderService } from 'ngx-ui-loader';
// import { CountdownModule } from 'ngx-countdown';



@Component({
  selector: 'app-campaign-setter',
  templateUrl: './campaign-setter.component.html',
  styleUrls: ['./campaign-setter.component.css']
})
export class CampaignSetterComponent implements OnInit {

  account:any;
  signer:any;
  CFContract:any;
  err:any;

  constructor(private subjectService:DataTransferServiceService, public _loader:NgxUiLoaderService) {
    
   }
  ngOnInit(): void {
  }

  async createCampaign(obj:any){
    const fundDeadline = obj.fundDeadline;
    const voteDeadline = obj.voteDeadline;
    const target = BigInt(obj.target*(10**18));
    const receipent = obj.receipent;
    const description = obj.description;
    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      this.signer = provider.getSigner();
      this.CFContract = crowdFundContract(provider);
      const CFContractWithSigner = this.CFContract.connect(this.signer) ;
      const setContractResp = await CFContractWithSigner.contractSetter(target, fundDeadline,voteDeadline ,receipent, description);
      console.log(setContractResp);
      this._loader.start();
      await setContractResp.wait();
      this._loader.stop();
    }
    catch(error:any){
      this.err = error.reason;
    } finally{
      this.subjectService.putDataToStream('true');
    }
  }

}
