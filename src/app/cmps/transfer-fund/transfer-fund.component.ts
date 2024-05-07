import { Component, EventEmitter, Input, Output, inject } from '@angular/core'
import { UserService } from '../../services/user.service'
import { Contact } from '../../models/contact.model'
import { Observable } from 'rxjs'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { isTransferValid } from '../../custom-validators/transfer.validators'
import { User } from '../../models/user.model'

@Component({
  selector: 'transfer-fund',
  templateUrl: './transfer-fund.component.html',
  styleUrl: './transfer-fund.component.scss'
})
export class TransferFundComponent {
  @Input() contact$!: Contact
  @Input() maxCoins!: number
  @Output() transferCoins = new EventEmitter()

  // @Input() onTransferCoins!: ((contact: Contact, amount: number) => void)
  amount!: number
  user!: User

  // private fb = inject(FormBuilder)
  // transferForm!: FormGroup

  // constructor() {
  //   this.transferForm = this.fb.group({
  //     amount: ['', [Validators.required, isTransferValid]]
  //   })
  // }

  onTransfer(): void {
    if (this.maxCoins < this.amount) {
      return
      // this.msgService.setErrorMsg('Not enough coins!')
    } else {
      this.transferCoins.emit(this.amount)
    }
    // this.amount = null

  }
  // onTransfer() {
  //   this.onTransferCoins(this.contact$, this.amount)
  // }
}
