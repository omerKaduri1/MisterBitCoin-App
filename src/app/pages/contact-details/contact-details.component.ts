import { Component, OnDestroy, OnInit, inject } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, Subscription, combineLatest, filter, map } from 'rxjs'
import { Contact } from '../../models/contact.model'
import { UserService } from '../../services/user.service'
import { MsgService } from '../../services/msg.service'
import { Move } from '../../models/move.model'
@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit, OnDestroy {

  private msgService = inject(MsgService)
  private userService = inject(UserService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  contactSubscription!: Subscription
  // movesSubscription!: Subscription
  contact!: Contact

  contact$ = this.route.data.pipe(map(data => data['contact']))
  user$ = this.userService.loggedInUser$
  contactMoves$: Observable<Move[]> = combineLatest([this.user$, this.contact$]).pipe(
    filter(([user]) => !!user),
    map(([user, contact]) => user?.moves.filter(move => move.toId === contact._id))
  )

  ngOnInit(): void {
    this.contactSubscription = this.contact$.subscribe(contact => this.contact = contact)
    // this.movesSubscription = this.contactMoves$.subscribe
    this.contactMoves$.subscribe((moves: Move[]) => {
      console.log('moves:', moves)
    })
  }

  onTransferCoins(amount: number) {
    this.userService.addMove(this.contact, amount)
    this.msgService.setSuccessMsg(`Transferred ${amount} coins to ${this.contact?.name}`)
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
    this.contactSubscription.unsubscribe()
  }

}
