import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommunicationService } from 'src/app/services/communication.service';
import { DialogData } from '../../../../../common/communication/dialog-data';
import { Fournisseur } from '../../../../../common/tables/Fournisseur';
import { Planrepas } from '../../../../../common/tables/Planrepas';
import { PendingQueryComponent } from '../pending-query/pending-query.component';

@Component({
  selector: 'app-update-planrepas',
  templateUrl: './update-planrepas.component.html',
  styleUrls: ['./update-planrepas.component.css']
})
export class UpdatePlanrepasComponent implements OnInit {


  plansrepas: Planrepas[] = [];
  fournisseurs: Fournisseur[] = [];
  categorielist: String[] = [];

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
  update: boolean = true;
  delete: boolean = false;

  public constructor(public dialog: MatDialog, private _formBuilder:FormBuilder, private communicationService: CommunicationService, @Inject (MAT_DIALOG_DATA) public data:DialogData) { }


  public ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      zerothCtrl: new FormControl( {value:'', disabled: true}),
      firstCtrl:['',Validators.required],
      secondCtrl:['',Validators.required],
      thirdCtrl:['',Validators.required],
      fourthCtrl:['',Validators.required],
      fifthCtrl:['',Validators.required],
      sixthCtrl:['',Validators.required]
    })
    this.getPlansrepas();
    this.getFournisseurs();
    this.getCategories();
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

  public getCategories() : void{
    this.communicationService.getCategories().subscribe((categories: String[])=>{
      this.categorielist = categories;
    })
  }

  public randomizer(): void{
    if (!this.plansrepas) return;
    const randomPlanrepas: Planrepas = this.plansrepas[this.getRandomIndex(this.plansrepas.length)];
    this.categorie = randomPlanrepas.categorie;
    this.frequence = randomPlanrepas.frequence;
    this.nbrpersonnes = randomPlanrepas.nbrpersonnes;
    this.nbrcalories = String(randomPlanrepas.nbrcalories);
    this.prix = String(randomPlanrepas.prix);
    this.numerofournisseur = randomPlanrepas.numerofournisseur;
  }
  
  private getRandomIndex(tableSizeCeil: number): number {
    return Math.floor(Math.random() * tableSizeCeil);
  }

  public counter(max: number){
    return new Array(max);
  }

  public updatePlanrepas(){
    this.openDialog();
    this.communicationService.updatePlanrepas({
      numeroplan: this.numeroplan,
      categorie:this.categorie,
      frequence : this.frequence,
      nbrpersonnes : this.nbrpersonnes,
      nbrcalories: this.nbrcalories as number,
      prix:this.prix as number,
      numerofournisseur:this.numerofournisseur as number
    } as Planrepas).subscribe((resModifPlan:number) =>{
      if (resModifPlan !== -1 && resModifPlan !== 0){
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
