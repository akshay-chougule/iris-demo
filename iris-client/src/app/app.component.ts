import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private router: Router,
    private el: ElementRef,
    private renderer: Renderer2
  ) {

    // this.router.events.subscribe(event => console.log(event));
    // const o = Observable.fromEvent(this.el.nativeElement, 'click');
    // o.subscribe(event => console.log(event));
    // this.renderer.setElementStyle(this.el.nativeElement, 'border', '1px solid red');
    // const arr = [1, 2, 3];
    // const a = Observable.from(arr);
    // a.subscribe(r => console.log(r));
  }

  // @HostListener('mouseover')
  // onMouseOver() {
  //   const part = this.el.nativeElement.querySelector('.container');
  //   this.renderer.setElementStyle(part, 'display', 'block');
  // }

  // @HostListener('window:resize')
  // onPageScroll() {
  //   console.log(this.el.nativeElement);
  // }
}
