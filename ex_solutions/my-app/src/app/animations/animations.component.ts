import { AnimationCallbackEvent, Component, signal } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-animations',
  imports: [],
  templateUrl: './animations.component.html',
  styleUrl: './animations.component.css',
})
export class AnimationsComponent {
  showMessage = signal(false);
  
  toggleShow(): void {
    this.showMessage.update((v: boolean) => !v);
  }

  //************

  secouer_image_sur_demande=""; //état initial (pas d'animation au premier affichage)
  showHideImage = signal(true);

  onSecouerSurDemande(){
     if(this.secouer_image_sur_demande=="") 
         this.secouer_image_sur_demande="secouer_sur_demande"
     //console.log("secouer_image_sur_demande="+this.secouer_image_sur_demande)
     this.showHideImage.set(false);
     setTimeout( () =>  {
	       this.showHideImage.set(true);
		 } , 1); //a small delay (ex: 1 ms ) is necessary*/
  }


  //troisième partie nécessitant extension gsap 
  // npm install --save gsap @types/gsap 
  //import { gsap } from 'gsap'; )


  showElement = signal(false);

  handleEnterAnimation(event: AnimationCallbackEvent): void {
    // Using GSAP for complex enter animation
    gsap.fromTo(event.target, 
      {
        scale: 0,
        rotation: -180,
        opacity: 0
      },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        onComplete: () => {
          // Animation complete callback is automatic for enter animations
          console.log('Enter animation completed!');
        }
      }
    );
  }

  handleLeaveAnimation(event: AnimationCallbackEvent): void {
    // Complex leave animation with staggered effects
    const timeline = gsap.timeline({
      onComplete: () => {
        // Must call this to complete the removal process
        event.animationComplete();
      }
    });

    timeline
      .to(event.target, {
        scale: 1.1,
        duration: 0.1,
        ease: "power2.out"
      })
      .to(event.target, {
        scale: 0,
        rotation: 180,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in"
      });
  }

  toggleElement(): void {
    this.showElement.update((v: boolean) => !v);
  }

}
