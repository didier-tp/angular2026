
import { Directive, effect, ElementRef, HostBinding, HostListener, input, Input } from '@angular/core';

@Directive({
  selector: '[borderOver]',
})
export class BorderOverDirective {

  /*
  //For old angular versions:
  @Input('border-over')
  set borderOverColor(borderOverColor:string){
    //NB: if no value specified , default value of color is empty string
    if(borderOverColor!="")
     this.borderColor=borderOverColor;
  }
  */
  borderOver = input("red");

  borderOverEffect = effect(()=>{
    let currentBorderOver = this.borderOver();
    if(currentBorderOver!="")
      this.borderColor=currentBorderOver;
  })

  @HostBinding('style.borderColor')
  borderColor = 'red'; //default color

  @HostBinding('style.borderStyle')
  borderStyle = 'hidden'; 


  constructor(el: ElementRef) {
    //always settings:
    el.nativeElement.style.borderWidth = '2px';
   }

   @HostListener('mouseenter')
   onMouseEnter(){
       this.borderStyle = 'solid';
   }

   @HostListener('mouseleave')
   onMouseLeave(){
    //this._borderStyle = 'none';
    this.borderStyle = 'hidden';
   }

}

