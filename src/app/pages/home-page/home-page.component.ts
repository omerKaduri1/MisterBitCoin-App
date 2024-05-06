import { Component, inject } from '@angular/core'
import { BitcoinService } from '../../services/bitcoin.service'
import { UserService } from '../../services/user.service'
import { User } from '../../models/user.model'
import { Observable, map, switchMap } from 'rxjs'
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

  moves$: Observable<Move[]> = this.userService.loggedInUser$.pipe(
    map(user => user.moves),
    map(moves =>
      moves.sort((a, b) => {
        const timeA = typeof a.at === 'number' ? new Date(a.at) : a.at
        const timeB = typeof b.at === 'number' ? new Date(b.at) : b.at
        return timeB.getTime() - timeA.getTime();
      })
    ),
    map(sortedMoves => sortedMoves.slice(0, 3)),
  )

}
