import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomePageComponent } from './pages/home-page/home-page.component'
import { ContactIndexComponent } from './pages/contact-index/contact-index.component'
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component'
import { contactResolver } from './resolvers/contact.resolver'
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component'
import { SignupPageComponent } from './pages/signup-page/signup-page.component'
import { noAuthGuard } from './guards/no-auth.guard'
import { authGuard } from './guards/auth.guard'

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [authGuard]
  },
  {
    path: 'contact', component: ContactIndexComponent, canActivate: [authGuard], children: [
      { path: 'edit', component: ContactEditComponent },
      { path: 'edit/:id', component: ContactEditComponent, resolve: { contact: contactResolver } }
    ]
  },
  {
    path: 'signup',
    component: SignupPageComponent,
    canActivate: [noAuthGuard]
  },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'contact/:id',
    component: ContactDetailsComponent,
    resolve: { contact: contactResolver },
    canActivate: [authGuard]
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
