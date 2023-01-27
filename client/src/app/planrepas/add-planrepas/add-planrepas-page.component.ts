import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { Planrepas } from '../../../../../common/tables/Planrepas'
import { Fournisseur } from '../../../../../common/tables/Fournisseur'
import { CommunicationService } from '../../services/communication.service';
import { AddPlanrepasComponent } from './add-planrepas.component';

@Component({
  selector: 'app-planrepas-page',
  templateUrl: './add-planrepas-page.component.html',
  styleUrls: ['./add-planrepas-page.component.css']
})
export class AddPlanrepasPageComponent implements OnInit {
  public plansrepas : Planrepas[] = [];
  public fournisseurs : Fournisseur[] = [];

  public constructor(public dialog: MatDialog, private communicationService: CommunicationService) { }

  public ngOnInit(): void {
    this.getPlansrepas();
    this.getFournisseurs();
  }

  public getPlansrepas(): void{
    this.communicationService.getPlansrepas().subscribe((plansrepas: Planrepas[])=>{
      this.plansrepas = plansrepas;
    })
  }

  public getFournisseurs(): void{
    this.communicationService.getFournisseurs().subscribe((fournisseurs: Fournisseur[])=>{
      this.fournisseurs = fournisseurs;
    })
  }

  public openAddDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '400px';
    dialogConfig.maxWidth = '400px';
    this.dialog.open(AddPlanrepasComponent, dialogConfig);
  }
}