import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'signup-page',
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss'
})
export class SignupPageComponent {
  userName: string = '';
  private userService = inject(UserService)
  private router = inject(Router)

  onSignup() {
    this.userService.signup(this.userName)
    this.router.navigateByUrl('/home')
  }
}
