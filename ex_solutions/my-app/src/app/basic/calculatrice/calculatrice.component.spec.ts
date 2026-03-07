import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs'
import { CalculatriceComponent } from './calculatrice.component';
import { ActivatedRoute } from '@angular/router';

describe('CalculatriceComponent', () => {
  let component: CalculatriceComponent;
  let fixture: ComponentFixture<CalculatriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatriceComponent],
       providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of([{mode: 'simple'}]),
          },
        },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatriceComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('5+6=11 from model', async () => {
    component.a=5;
    component.b=6; 
    component.onCalculer('+');//à ne pas oublier d'appeler si pas de dispatchEvent
    fixture.changeDetectorRef.markForCheck(); //REQUIRED in ZonzLess mode !!!

    //fixture.detectChanges(); //not OK for ZoneLess mode
    await fixture.whenStable(); //OK with async for ZoneLess mode
    expect(component.res).toBe(11);
    const compNativeElt = fixture.debugElement.nativeElement;
    let spanResElt = compNativeElt.querySelector('#spanRes');
    console.log("from model, 5+, res:"  + spanResElt.textContent);
     //spanResElt.innerTextavec jasmine+karma, spanResElt.textContent avec vitest
    expect(spanResElt.textContent).toContain('11');
    });

    it('10-3=7 from IHM', async () => {
      const compNativeElt = fixture.debugElement.nativeElement;
      let aInputElt = compNativeElt.querySelector("input[name='a']");
      aInputElt.value=10;
      aInputElt.dispatchEvent(new Event('input'));

      let bInputElt = compNativeElt.querySelector("input[name='b']");
      bInputElt.value=3;
      bInputElt.dispatchEvent(new Event('input'));

      let moinsButtonElt = 
         compNativeElt.querySelector("input[type='button'][value='-']");
      //moinsButtonElt.dispatchEvent(new Event('click'));
      moinsButtonElt.click();
     
      //fixture.detectChanges(); //not OK for ZoneLess mode
      await fixture.whenStable(); //OK with async for ZoneLess mode

      expect(component.a).toBe(10);
      expect(component.b).toBe(3);
      expect(component.res).toBe(7);
      let spanResElt = compNativeElt.querySelector('#spanRes');
      console.log("from IHM, 10-3, res:"  + spanResElt.textContent);
      expect(spanResElt.textContent).toContain('7');
      });
});

// ng test --include=**/calculatrice/*.spec.ts
