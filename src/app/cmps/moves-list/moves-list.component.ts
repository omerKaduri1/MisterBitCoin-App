import { Component, Input } from '@angular/core'
import { Move } from '../../models/move.model'
import { Observable } from 'rxjs'

@Component({
  selector: 'moves-list',
  templateUrl: './moves-list.component.html',
  styleUrl: './moves-list.component.scss'
})
export class MovesListComponent {
  @Input() title!: string
  @Input() moves$!: Observable<Move[]>

}
