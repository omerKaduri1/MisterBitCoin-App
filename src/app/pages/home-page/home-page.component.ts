import { Component, inject } from '@angular/core'
import { BitcoinService } from '../../services/bitcoin.service'
import { UserService } from '../../services/user.service'
import { User } from '../../models/user.model'
import { Observable, switchMap } from 'rxjs'
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

}
