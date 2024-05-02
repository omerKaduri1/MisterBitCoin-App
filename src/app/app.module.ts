import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ContactIndexComponent } from './pages/contact-index/contact-index.component';
import { ContactIndexdetailsComponent } from './pages/contact-indexdetails/contact-indexdetails.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { StatisticPageComponent } from './pages/statistic-page/statistic-page.component';
import { ContactListComponent } from './cmps/contact-list/contact-list.component';
import { ContactPreviewComponent } from './cmps/contact-preview/contact-preview.component';
import { ChartComponent } from './cmps/chart/chart.component';
import { ContactFilterComponent } from './cmps/contact-filter/contact-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactIndexComponent,
    ContactIndexdetailsComponent,
    HomePageComponent,
    StatisticPageComponent,
    ContactListComponent,
    ContactPreviewComponent,
    ChartComponent,
    ContactFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
