import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomePageComponent } from './pages/home-page/home-page.component'
import { ContactIndexComponent } from './pages/contact-index/contact-index.component'

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'contact', component: ContactIndexComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
