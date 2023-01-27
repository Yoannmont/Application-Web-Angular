import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from "../../../../../common/communication/dialog-data"

@Component({
  selector: 'app-pending-query',
  templateUrl: './pending-query.component.html',
  styleUrls: ['./pending-query.component.css']
})
export class PendingQueryComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  public refresh(): void{
    window.location.reload();
  }

}
