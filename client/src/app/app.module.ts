import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./modules/app-routing.module";
import { AppComponent } from "./app.component";
import { CommunicationService } from "./services/communication.service";
import { AppMaterialModule } from './modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddPlanrepasPageComponent } from './planrepas/add-planrepas/add-planrepas-page.component';
import { AddPlanrepasComponent } from './planrepas/add-planrepas/add-planrepas.component';
import { PendingQueryComponent } from './planrepas/pending-query/pending-query.component';
import { UpdatePlanrepasComponent } from './planrepas/update-planrepas/update-planrepas.component';
import { DeletePlanrepasComponent } from './planrepas/delete-planrepas/delete-planrepas.component';
import { UpdatePlanrepasPageComponent } from './planrepas/update-planrepas/update-planrepas-page.component';
import { DeletePlanrepasPageComponent } from './planrepas/delete-planrepas/delete-planrepas-page.component';


@NgModule({
  declarations: [
    AppComponent,
    AddPlanrepasPageComponent,
    AddPlanrepasComponent,
    PendingQueryComponent,
    UpdatePlanrepasComponent,
    DeletePlanrepasComponent,
    UpdatePlanrepasPageComponent,
    DeletePlanrepasPageComponent,
    AddPlanrepasPageComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppMaterialModule
  ],
  providers: [CommunicationService],
  entryComponents: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
