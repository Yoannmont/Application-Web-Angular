import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "../app.component";
import { AddPlanrepasPageComponent } from "../planrepas/add-planrepas/add-planrepas-page.component";
import { UpdatePlanrepasPageComponent } from "../planrepas/update-planrepas/update-planrepas-page.component";
import { DeletePlanrepasPageComponent } from "../planrepas/delete-planrepas/delete-planrepas-page.component";

const routes: Routes = [
  { path: "app", component: AppComponent},
  { path: "planrepas/add", component:AddPlanrepasPageComponent},
  { path: "planrepas/update", component:UpdatePlanrepasPageComponent},
  { path: "planrepas/delete", component:DeletePlanrepasPageComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
