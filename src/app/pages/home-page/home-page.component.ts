import { Component, inject } from '@angular/core';
import { BitcoinService } from '../../services/bitcoin.service'
import { UserService } from '../../services/user.service';
@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  private bitcoinService = inject(BitcoinService)
  private userService = inject(UserService)
  user!: any
  bitcoinRate!: any

  async ngOnInit() {
    this.user = this.userService.getUser()
    this.bitcoinRate = await this.bitcoinService.getRate(this.user.coins)
  }

}
