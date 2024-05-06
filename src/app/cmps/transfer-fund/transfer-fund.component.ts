import { Component, Input, inject } from '@angular/core'
import { UserService } from '../../services/user.service'
import { Contact } from '../../models/contact.model'
import { Observable } from 'rxjs'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { isTransferValid } from '../../custom-validators/transfer.validators'

@Component({
  selector: 'transfer-fund',
  templateUrl: './transfer-fund.component.html',
  styleUrl: './transfer-fund.component.scss'
})
export class TransferFundComponent {
  @Input() contact$!: Contact
  @Input() maxCoins$!: Observable<number>
  @Input() onTransferCoins!: ((contact: Contact, amount: number) => void)
  amount!: number

  private fb = inject(FormBuilder)
  transferForm!: FormGroup

  constructor() {
    this.transferForm = this.fb.group({
      amount: ['', [Validators.required, isTransferValid]]
    })
  }

  onTransfer() {
    this.onTransferCoins(this.contact$, this.amount)
  }
}
