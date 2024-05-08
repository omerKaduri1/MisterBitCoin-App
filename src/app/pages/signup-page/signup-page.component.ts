import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'signup-page',
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss'
})
export class SignupPageComponent {
  userName: string = ''

  private userService = inject(UserService)
  private router = inject(Router)

  onSignup() {
    // this.userService.signup(this.userName)
    // this.router.navigateByUrl('/home')
    this.userService.signup(this.userName)
      .pipe(take(1))
      .subscribe(() => {
        this.router.navigate(['/home'])
      })
  }
}
