import { Component, inject } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { Observable, take } from 'rxjs';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'contact-index',
  templateUrl: './contact-index.component.html',
  styleUrl: './contact-index.component.scss'
})
export class ContactIndexComponent {
  private contactService = inject(ContactService)
  private loaderService = inject(LoaderService)
  isLoading$: Observable<boolean> = this.loaderService.isLoading$
  contacts$!: Observable<Contact[]>

  ngOnInit(): void {
    this.contacts$ = this.contactService.contacts$
  }

  onRemoveContact(contactId: string) {
    this.loaderService.setIsLoading(true)
    this.contactService.deleteContact(contactId)
      .pipe(take(1))
      .subscribe({
        next: () => this.loaderService.setIsLoading(false),
        error: err => console.log('err:', err)
      })
  }

}
