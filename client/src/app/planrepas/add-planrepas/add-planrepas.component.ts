import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../../../../common/communication/dialog-data';
import { Fournisseur } from '../../../../../common/tables/Fournisseur';
import { Planrepas } from '../../../../../common/tables/Planrepas';
import { CommunicationService } from '../../services/communication.service';
import { PendingQueryComponent } from '../pending-query/pending-query.component';

@Component({
  selector: 'app-add-planrepas',
  templateUrl: './add-planrepas.component.html',
  styleUrls: ['./add-planrepas.component.css']
})
export class AddPlanrepasComponent implements OnInit {


  plansrepas: Planrepas[] = [];
  fournisseurs: Fournisseur[] = [];
  categorielist: String[] = [];

  firstFormGroup: FormGroup;
  categorie: string = '';
  frequence: number = 1;
  nbrpersonnes: number = 1;
  nbrcalories: string = '';
  prix : string='';
  numerofournisseur: (string|number) ='';

  pending: boolean = true;
  success: boolean = false;

  constructor(public dialog: MatDialog, private _formBuilder:FormBuilder, private communicationService: CommunicationService, @Inject (MAT_DIALOG_DATA) public data:DialogData) { }


  public ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
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
    
  }
  
  public openDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '650px';
    dialogConfig.data = {
      pending: this.pending,
      success: this.success
    };
    this.dialog.closeAll();
    this.dialog.open(PendingQueryComponent, dialogConfig);
  }

  public getPlansrepas(): void{
    this.communicationService.getPlansrepas().subscribe((plansrepas: Planrepas[])=>{
      this.plansrepas = plansrepas;
    })
  }

  public addPlanrepas(): void{
    this.openDialog();
    this.communicationService.insertPlanrepas({
      numeroplan: -1,
      categorie:this.categorie,
      frequence : this.frequence,
      nbrpersonnes : this.nbrpersonnes,
      nbrcalories:parseInt(this.nbrcalories),
      prix:parseInt(this.prix),
      numerofournisseur:this.numerofournisseur as number
    } as Planrepas).subscribe((resInsertionPlan:number) =>{
      if (resInsertionPlan !== -1 && resInsertionPlan !== 0){
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



}
