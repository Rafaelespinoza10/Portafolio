import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'components-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router,) { }

  messages = [
    'Hola, soy Rafael',
    'Soy Ingeniero en Mecatrónica',
    'Soy desarrollador de software',
    'Me gusta la programación y el café'
  ];

  public animatedText = '';
  public typingSpeed: number = 50;
  public delayBetweenMessages: number = 1000; // Tiempo entre mensajes (en milisegundos)

  ngOnInit() {
    this.startTypingEffect();
  }

  startTypingEffect() {
    let messageIndex = 0;

    const typeMessage = () => {
      if (messageIndex < this.messages.length) {
        let index = 0;
        const message = this.messages[messageIndex];
        this.animatedText = ''; // Limpiar texto previo

        const interval = setInterval(() => {
          this.animatedText += message[index];
          index++;

          if (index === message.length) {
            clearInterval(interval);
            messageIndex++;

            setTimeout(() => typeMessage(), this.delayBetweenMessages);
          }
        }, this.typingSpeed);
      }
    };

    typeMessage();
  }

  onSubmit(){
      this.router.navigate(['section', 'about-me']);
  }
}
