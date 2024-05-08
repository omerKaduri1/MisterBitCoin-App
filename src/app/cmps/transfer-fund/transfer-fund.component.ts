import { Component, EventEmitter, Input, Output, inject } from '@angular/core'
import { Contact } from '../../models/contact.model'
import { User } from '../../models/user.model'
import { MsgService } from '../../services/msg.service'

@Component({
  selector: 'transfer-fund',
  templateUrl: './transfer-fund.component.html',
  styleUrl: './transfer-fund.component.scss'
})
export class TransferFundComponent {
  @Input() contact$!: Contact
  @Input() maxCoins!: number
  @Output() transferCoins = new EventEmitter()

  private msgService = inject(MsgService)

  amount!: number
  user!: User

  onTransfer(): void {
    if (this.maxCoins < this.amount) {
      this.msgService.setErrorMsg('Not enough coins!')
    } else {
      this.transferCoins.emit(this.amount)
    }
  }

}
