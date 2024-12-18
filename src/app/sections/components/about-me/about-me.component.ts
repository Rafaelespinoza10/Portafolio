import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'component-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit{

  public name= 'Rafael Moreno'
  public description =  'Ingeniero en Mecatrónica apasionado por el desarrollo de software, especialmente en el ámbito web y móvil. Disfruto creando aplicaciones innovadoras y resolviendo problemas complejos para ofrecer soluciones efectivas.'
  public animatedTextName = '';
  public animatedTexDescription = '';
  public typingSpeed:number = 50;

  constructor() { }

  ngOnInit(): void {
      this.startTyppingEffect('name', this.name);
      this.startTyppingEffect( 'description', this.description);
  }

  startTyppingEffect(target: 'name' | 'description', text: string){
    let index = 0;
    const interval = setInterval(() =>{
      if(target === 'name'){
        this.animatedTextName += text[index];
      }else{
        this.animatedTexDescription += text[index];
      }
      index++;
      if(index === text.length){
        clearInterval(interval);
      }
    }, this.typingSpeed);
  }
}
