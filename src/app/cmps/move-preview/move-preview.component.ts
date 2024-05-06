import { Component, Input, inject } from '@angular/core';
import { Move } from '../../models/move.model';
import { Observable, switchMap } from 'rxjs';
import { UserService } from '../../services/user.service';
import { BitcoinService } from '../../services/bitcoin.service';

@Component({
  selector: 'move-preview',
  templateUrl: './move-preview.component.html',
  styleUrl: './move-preview.component.scss'
})
export class MovePreviewComponent {
  @Input() move!: Move

  private userService = inject(UserService)
  private bitcoinService = inject(BitcoinService)

  BTCValue$: Observable<string> = this.userService.loggedInUser$.pipe(
    switchMap(user => {
      return this.bitcoinService.getRateStream(this.move.amount)
    })
  )

}


