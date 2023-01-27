import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { Fournisseur } from '../../../../../common/tables/Fournisseur';
import { Planrepas } from '../../../../../common/tables/Planrepas'
import { CommunicationService } from '../../services/communication.service';
import { DeletePlanrepasComponent } from './delete-planrepas.component';

@Component({
  selector: 'app-delete-planrepas-page',
  templateUrl: './delete-planrepas-page.component.html',
  styleUrls: ['./delete-planrepas-page.component.css']
})
export class DeletePlanrepasPageComponent implements OnInit {
  public plansrepas : Planrepas[] = [];
  public fournisseurs : Fournisseur[] = [];
  pending : boolean = true;
  success : boolean = false;
  update : boolean = false;
  delete : boolean = true;

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

  public openDeleteDialog(plan: Planrepas){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '400px';
    dialogConfig.maxWidth = '400px';
    
    dialogConfig.data = {
      planrepas : plan,
      pending : this.pending,
      success : this.success,
      update : this.update,
      delete : this.delete
    }
    this.dialog.open(DeletePlanrepasComponent, dialogConfig);
  }
}
