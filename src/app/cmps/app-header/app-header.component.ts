import { Component, EventEmitter, Output, output } from '@angular/core'

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss'
})
export class AppHeaderComponent {

  @Output() changePage = new EventEmitter<string>()

  onChangePage = (page: string) => {
    this.changePage.emit(page)
  }

}
