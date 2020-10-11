import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListComponent} from "./list/list.component";
import {CreateComponent} from "./create/create.component";

import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [
  {path: '', component: ListComponent},
  {path: 'create', component: CreateComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
