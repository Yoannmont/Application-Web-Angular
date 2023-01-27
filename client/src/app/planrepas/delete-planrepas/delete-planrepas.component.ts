import { Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../../../../common/communication/dialog-data';
import { Fournisseur } from '../../../../../common/tables/Fournisseur';
import { Planrepas } from '../../../../../common/tables/Planrepas';
import { CommunicationService } from '../../services/communication.service';
import { PendingQueryComponent } from '../pending-query/pending-query.component';


@Component({
  selector: 'app-delete-planrepas',
  templateUrl: './delete-planrepas.component.html',
  styleUrls: ['./delete-planrepas.component.css']
})
export class DeletePlanrepasComponent implements OnInit {
  
  plansrepas : Planrepas[] = [];
  fournisseurs : Fournisseur[] = [];

  firstFormGroup: FormGroup;

  numeroplan: number = -1;
  categorie: string = '';
  frequence: number = 1;
  nbrpersonnes: number = 1;
  nbrcalories: (string|number) = '';
  prix : (string|number) ='';
  numerofournisseur: (string|number) ='';

  pending: boolean = true;
  success: boolean = false;
  update: boolean = false;
  delete: boolean = true;

  public constructor(public dialog: MatDialog, private _formBuilder:FormBuilder, private communicationService: CommunicationService, @Inject (MAT_DIALOG_DATA) public data:DialogData) { }


  public ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      zerothCtrl: new FormControl( {value:'', disabled: true}),
      firstCtrl:new FormControl( {value:'', disabled: true}),
      secondCtrl:new FormControl( {value:'', disabled: true}),
      thirdCtrl:new FormControl( {value:'', disabled: true}),
      fourthCtrl:new FormControl( {value:'', disabled: true}),
      fifthCtrl:new FormControl( {value:'', disabled: true}),
      sixthCtrl:new FormControl( {value:'', disabled: true})
    })
    this.getPlansrepas();
    this.getFournisseurs();
    setTimeout(()=> {this.loadValues()},250)
    
  }

  public openDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '650px';
    dialogConfig.data = {
      pending: this.pending,
      success: this.success,
      update : this.update,
      delete : this.delete
    };
    this.dialog.closeAll();
    this.dialog.open(PendingQueryComponent, dialogConfig);
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


  public loadValues(): void{
    if (!this.data || !this.data.planrepas) return;
    for (const planrepas of this.plansrepas){
      if (planrepas.numeroplan === this.data.planrepas.numeroplan){
        this.numeroplan = this.data.planrepas.numeroplan;
        this.categorie = this.data.planrepas.categorie;
        this.frequence = this.data.planrepas.frequence;
        this.nbrpersonnes = this.data.planrepas.nbrpersonnes;
        this.nbrcalories = this.data.planrepas.nbrcalories;
        this.prix = this.data.planrepas.nbrcalories;
        this.numerofournisseur = this.data.planrepas.numerofournisseur;

      }
    }
  }

  public deletePlanrepas(): void {
    this.openDialog();
    this.communicationService.deletePlanrepas(this.numeroplan).subscribe((resDeletePlan: number) => {
      if (resDeletePlan !== -1 && resDeletePlan !== 0){
        this.success = true;
    }
      else {
        this.success = false;
      }
    setTimeout(() => {
      this.pending = false;
      this.openDialog();
      }, 500);
    })
    this.getPlansrepas();
  }
}

