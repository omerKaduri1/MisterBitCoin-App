import { Component, OnDestroy, OnInit, inject } from '@angular/core'
import { ContactService } from '../../services/contact.service'
import { ContactFilter } from '../../models/contact.model'
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs'

@Component({
  selector: 'contact-filter',
  templateUrl: './contact-filter.component.html',
  styleUrl: './contact-filter.component.scss'
})
export class ContactFilterComponent implements OnInit, OnDestroy{

  private contactService = inject(ContactService)
  private filterSubject$ = new Subject()
  private destroySubject$ = new Subject()
  filterBy!: ContactFilter

  ngOnInit() {
    this.contactService.filterBy$
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(filterBy => {
        this.filterBy = filterBy
      })

    this.filterSubject$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroySubject$)
      )
      .subscribe(() => {
        this.contactService.setFilter(this.filterBy)
      })
  }

  onSetFilter(term: string) {
    this.filterSubject$.next(term)
  }

  ngOnDestroy(): void {
    this.destroySubject$.next(null)
    this.destroySubject$.complete()
  }
}
