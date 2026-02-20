import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvaSsComponent } from './tva-ss.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);

describe('TvaComponent', () => {
  let component: TvaSsComponent;
  let fixture: ComponentFixture<TvaSsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvaSsComponent],
       providers: [ provideZonelessChangeDetection() ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvaSsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('tva(200,20)=40 from model', async () => {

    component.ht=200;
    component.taux=20; 
    
    component.onCalculerTvaTtc();//ok
    fixture.changeDetectorRef.markForCheck(); //REQUIRED in ZonzLess mode !!!
    //console.log(`in model: tva=${component.tva} ttc=${component.ttc}`)  //ok --> in model: tva=40 ttc=240
    //fixture.detectChanges(); //not OK for ZoneLess mode
    await fixture.whenStable(); //OK with async for ZoneLess mode
    
    const compNativeElt = fixture.debugElement.nativeElement;
    let spanTvaElt = compNativeElt.querySelector('#spanTva');
    console.log("in html , spanTvaElt:"  + spanTvaElt);
    console.log("from model, tva in html as .textContent=" + spanTvaElt.textContent );
    expect(Number(spanTvaElt.textContent)).toBeCloseTo(40,2);
    // .toBeCloseTo(expectedValue,precision_as_nb_decimal)
    });

    it('tva(200,10)=220  from IHM', async () => {
      //Saisies de valeurs (via native_elements and DOM api):
      const compNativeElt = fixture.debugElement.nativeElement;
      let htInputElt = compNativeElt.querySelector("input[name='ht']");
      htInputElt.value=200;
      htInputElt.dispatchEvent(new Event('input'));
      /*  // Pour version simplifiée avec button et sans liste déroulante:
      let tauxTvaPctInputElt = compNativeElt.querySelector("input[name='taux']");
      tauxTvaPctInputElt.value=20;
      tauxTvaPctInputElt.dispatchEvent(new Event('input'));

      let calculButtonElt = 
         compNativeElt.querySelector("input[type='button'][value='calculer']");
      //calculButtonElt.dispatchEvent(new Event('click'));
      calculButtonElt.click();    */
       // Pour version sans button et avec liste déroulante:
      let tauxTvaPctSelectElt = compNativeElt.querySelector("select[name='taux']");
      let optionElt = null;
      for(let opt of tauxTvaPctSelectElt.children){
        if(opt.textContent=="10%"){
          optionElt=opt;
        }
      }
      console.log("from ihm, optionElt.textContent: " + optionElt.textContent 
                          + " , optionElt.value: " + optionElt.value);
      tauxTvaPctSelectElt.value=optionElt.value;
      //fixture.detectChanges(); //not OK for ZoneLess mode
      await fixture.whenStable(); //OK with async for ZoneLess mode
      console.log("from ihm, tauxTvaPctSelectElt.value:" + tauxTvaPctSelectElt.value);
      tauxTvaPctSelectElt.dispatchEvent(new Event('change'));
      //fixture.detectChanges(); //not OK for ZoneLess mode
      await fixture.whenStable(); //OK with async for ZoneLess mode
      //Vérifications des valeurs saisies et calculées dans le modèle:
      expect(Number(component.ht)).toBe(200);
      expect(component.taux).toBe(10);
      expect(component.ttc).toBeCloseTo(220,2);

      //Vérifications des valeurs calculées dans la vue (template html):
      let spanTtcElt = compNativeElt.querySelector('#spanTtc');
      console.log("from IHM, res:"  + spanTtcElt.textContent); 
      expect( Number( spanTtcElt.textContent ) ).toBeCloseTo(220,2);
      });
  
});

//ng test --include=**/tva-ss.component.spec.ts