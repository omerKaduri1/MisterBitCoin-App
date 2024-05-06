import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HttpClientModule } from '@angular/common/http'
import { ContactIndexComponent } from './pages/contact-index/contact-index.component'
import { HomePageComponent } from './pages/home-page/home-page.component'
import { StatisticPageComponent } from './pages/statistic-page/statistic-page.component'
import { ContactListComponent } from './cmps/contact-list/contact-list.component'
import { ContactPreviewComponent } from './cmps/contact-preview/contact-preview.component'
import { ChartComponent } from './cmps/chart/chart.component'
import { ContactFilterComponent } from './cmps/contact-filter/contact-filter.component'
import { FormsModule } from '@angular/forms'
import { AppHeaderComponent } from './cmps/app-header/app-header.component'
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { LoaderComponent } from './cmps/loader/loader.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component'

@NgModule({
  declarations: [
    AppComponent,
    ContactIndexComponent,
    ContactDetailsComponent,
    HomePageComponent,
    StatisticPageComponent,
    ContactListComponent,
    ContactPreviewComponent,
    ChartComponent,
    ContactFilterComponent,
    AppHeaderComponent,
    ContactEditComponent,
    LoaderComponent,
    SignupPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
