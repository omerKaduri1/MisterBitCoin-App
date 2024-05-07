import { Component, inject } from '@angular/core'
import { BitcoinService } from '../../services/bitcoin.service'
import { UserService } from '../../services/user.service'
import { User } from '../../models/user.model'
import { Observable, filter, map, switchMap } from 'rxjs'
import { Move } from '../../models/move.model'
@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  private bitcoinService = inject(BitcoinService)
  private userService = inject(UserService)

  user$: Observable<User> = this.userService.loggedInUser$
  BTC$: Observable<string> = this.user$.pipe(
    switchMap(user => this.bitcoinService.getRateStream(user.coins))
  )

  userMoves$: Observable<Move[]> = this.user$.pipe(
    filter(user => !!user),
    map(user => user.moves.slice(0, 3))
  )

}
