// import { Component, Input, inject } from '@angular/core'
// import { ContactService } from '../../services/contact.service'
// import { ActivatedRoute, Router } from '@angular/router'
// import { Observable, Subscription, combineLatest, filter, map, of, switchMap, take } from 'rxjs'
// import { Contact } from '../../models/contact.model'
// import { UserService } from '../../services/user.service'
// import { Move } from '../../models/move.model'
// @Component({
//   selector: 'contact-details',
//   templateUrl: './contact-details.component.html',
//   styleUrl: './contact-details.component.scss'
// })
// export class ContactDetailsComponent {
//   // @Input() contactId!: string

//   private contactService = inject(ContactService)
//   private userService = inject(UserService)
//   private route = inject(ActivatedRoute)
//   private router = inject(Router)

//   contact: Contact | null = null
//   subscription!: Subscription

//   // maxCoins$: Observable<number> = this.userService.getUserCoins()
//   contact$ = this.route.data.pipe(map(data => data['contact']))
//   user$ = this.userService.loggedInUser$
//   // moves$: Observable<Move[]> = this.contact$.pipe(
//   //   switchMap(contact => {
//   //     if (!contact) {
//   //       return of([])
//   //     }
//   //     return this.userService.loggedInUser$.pipe(
//   //       map(user => user.moves.filter(move => move.toId === contact._id))
//   //     )
//   //   })
//   // )

//   contactMoves$ = combineLatest([this.user$, this.contact$]).pipe(
//     filter(([user]) => !!user),
//     map(([user, contact]) => user?.moves.filter(move => move.toId === contact._id))
//   )

//   ngOnInit(): void {
//     this.subscription = this.contact$.subscribe(contact => this.contact = contact)
//   }

//   onBack() {
//     this.router.navigateByUrl('/contact')
//   }

//   onTransferCoins(amount: number) {
//     this.userService.addMove(this.contact, amount)
//       .pipe(take(1))
//       .subscribe({
//         next: () => {
//           // this.msgService.setSuccessMsg(`Transferred ${amount} coins to ${this.contact?.name}`)
//         },
//         error: (err) => console.log(err)
//       })
//   }

//   ngOnDestroy(): void {
//     this.subscription.unsubscribe()
//   }

// }

import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, Subscription, combineLatest, filter, map, of, take, tap } from 'rxjs'
import { Contact } from '../../models/contact.model'
// import { MsgService } from 'src/app/services/msg.service'
import { UserService } from '../../services/user.service'
import { ContactService } from '../../services/contact.service'

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit, OnDestroy {

  private contactService = inject(ContactService)
  private userService = inject(UserService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  subscription!: Subscription
  contact!: Contact

  contact$ = this.route.data.pipe(map(data => data['contact']))
  user$ = this.userService.loggedInUser$
  contactMoves$ = combineLatest([this.user$, this.contact$]).pipe(
    filter(([user]) => !!user),
    map(([user, contact]) => user?.moves.filter(move => move.toId === contact._id))
  )

  ngOnInit(): void {
    this.subscription = this.contact$.subscribe(contact => this.contact = contact)
    console.log('contact:', this.contact)
  }

  onTransferCoins(amount: number) {
    this.userService.addMove(this.contact, amount)
    // .pipe(take(1))
    // .subscribe({
    //   next: () => {
    //     console.log('hi')
    //     // this.msgService.setSuccessMsg(`Transferred ${amount} coins to ${this.contact?.name}`)
    //   },
    //   error: (err) => console.log(err)
    // })

  }

  onBack() {
    this.router.navigateByUrl('/contacts')
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
