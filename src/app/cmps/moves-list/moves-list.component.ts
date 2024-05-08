import { Component, Input, OnChanges } from '@angular/core'
import { Move } from '../../models/move.model'
import { Observable } from 'rxjs'
import { Contact } from '../../models/contact.model'

@Component({
  selector: 'moves-list',
  templateUrl: './moves-list.component.html',
  styleUrl: './moves-list.component.scss'
})
export class MovesListComponent implements OnChanges {
  _contact!: Contact
  title: string = ''

  @Input() moves!: Move[] | any
  @Input() set contact(contact: Contact | null) {
    if (contact) {
      this.title = 'Your Transfers to ' + contact.name.substring(0, contact.name.indexOf(' ') + 1)
    } else {
      this.title = 'Your last 3 Transfers'
    }
  }

  ngOnChanges(changes: any) {
    if (changes.moves) {
      console.log('this.moves:', this.moves)
    }
    console.log('this.moves:', this.moves)
    console.log('changes:', changes)
  }

}
