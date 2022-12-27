import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { SendRecieveComponent } from './send-recieve/send-recieve.component';


const routes: Routes = [
  // {path:"sendOrRecieve",component:SendRecieveComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
