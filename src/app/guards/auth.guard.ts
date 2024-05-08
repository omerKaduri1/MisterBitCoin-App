import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { UserService } from '../services/user.service'
import { map } from 'rxjs'
import { MsgService } from '../services/msg.service'

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const msgService = inject(MsgService)

  return inject(UserService).loggedInUser$.pipe(
    map(user => {
      if (!user) {
        msgService.setErrorMsg('Please sign up!')
        return router.createUrlTree(['/signup'])
      }
      return true
    })
  )
}