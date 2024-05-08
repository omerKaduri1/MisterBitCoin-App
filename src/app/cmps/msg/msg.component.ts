import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { MsgService } from '../../services/msg.service'
import { Msg } from '../../models/msg.model'

@Component({
  selector: 'msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.scss']
})
export class MsgComponent {

  constructor(private msgService: MsgService) { }
  msg$: Observable<Msg | null> = this.msgService.msg$

  onCloseMsg() {
    this.msgService.closeMsg()
  }
}
