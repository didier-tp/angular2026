import { AsyncPipe } from '@angular/common';
import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, firstValueFrom } from 'rxjs';
import { Devise } from '../common/data/devise';
import { DeviseService } from '../common/service/devise.service';

@Component({
  selector: 'app-devise',
  imports: [FormsModule,AsyncPipe],
  templateUrl: './devise.component.html',
  styleUrl: './devise.component.css',
})
export class DeviseComponent {
private _deviseService =inject(DeviseService);
changeDetectorRef = inject(ChangeDetectorRef);


message=signal("");
codeToUpdate="?";
changeToUpdate=1;

devises$! : Observable<Devise[]>;

async onRefresh() {
  this.devises$ = this._deviseService.getAllDevises$();
}
ngOnInit(){
  this.onRefresh();
}

async onUpdate() {
    try {
      let d:Devise;
      let deviseTemp : Devise|undefined;
      deviseTemp = await firstValueFrom(
                     this._deviseService.getDeviseByCode$(this.codeToUpdate));
      deviseTemp.change=this.changeToUpdate;
      await firstValueFrom(this._deviseService.putDevise$(deviseTemp));
      this.message.set("mise à jour ok");
      this.onRefresh(); 
      this.changeDetectorRef.markForCheck();
    } catch (err) {  console.log(err);    this.message.set(<string> JSON.stringify(err));
    }
  }
}
