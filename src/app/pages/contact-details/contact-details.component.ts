import { Component, Input, inject } from '@angular/core'
import { ContactService } from '../../services/contact.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, map, of, switchMap } from 'rxjs'
import { Contact } from '../../models/contact.model'
import { UserService } from '../../services/user.service'
import { Move } from '../../models/move.model'
@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss'
})
export class ContactDetailsComponent {
  @Input() contactId!: string

  private contactService = inject(ContactService)
  private userService = inject(UserService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  maxCoins$: Observable<number> = this.userService.getUserCoins()
  contact$: Observable<Contact> = this.route.data.pipe(map(data => data['contact']))
  moves$: Observable<Move[]> = this.contact$.pipe(
    switchMap(contact => {
      if (!contact) {
        return of([])
      }
      return this.userService.loggedInUser$.pipe(
        map(user => user.moves.filter(move => move.toId === contact._id))
      )
    })
  )

  onBack() {
    this.router.navigateByUrl('/contact')
  }

  onTransferCoins = (contact: Contact, amount: number) => {
    this.userService.addMove(contact, amount)
    this.userService.reduceCoins(amount)
  }
}
