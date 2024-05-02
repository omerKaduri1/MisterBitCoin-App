import { Component, OnInit, inject } from '@angular/core'
import { ContactService } from './services/contact.service'
import { take } from 'rxjs'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private contactService = inject(ContactService)
  currPage: string = 'home'

  onChangePage = (page: string) => {
    this.currPage = page
  }

  ngOnInit() {
    this.contactService.loadContacts()
      .pipe(take(1))
      .subscribe({
        error: err => console.log('err:', err)
      })
  }
}
