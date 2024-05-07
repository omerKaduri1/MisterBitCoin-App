import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, OnInit, Output, inject } from '@angular/core'

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective implements OnInit {

  ngOnInit(): void {
    setTimeout(() => this.isMounting = false, 0)
  }

  @Output() clickOutside = new EventEmitter()

  hostEl = inject(ElementRef).nativeElement
  isMounting = true

  @HostListener('document:click', ['$event'])
  onClick({ target }: MouseEvent) {
    if (this.isMounting) return
    const isClickedOutside = !this.hostEl.contains(target)
    if (isClickedOutside) this.clickOutside.emit()
  }

  @HostBinding('class')
  className = 'click-outside'

}

