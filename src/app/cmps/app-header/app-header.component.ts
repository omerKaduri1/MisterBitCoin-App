import { Component, inject } from '@angular/core'
import { UserService } from '../../services/user.service'
import { take } from 'rxjs'
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss'
})
export class AppHeaderComponent {
  private userService = inject(UserService)
  private router = inject(Router)
  loggedInUser$ = this.userService.loggedInUser$

  onLogout() {
    this.userService.logout()
      .pipe(take(1))
      .subscribe({
        next: () => this.router.navigateByUrl('/signup'),
        error: (err) => console.log('Error:', err),
      })
  }

}
