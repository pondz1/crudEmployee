import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HomeComponent } from './page/home/home.component';
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import { CreateComponent } from './component/create/create.component';
import { DetailsComponent } from './component/details/details.component';
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from "primeng/calendar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import {CardModule} from "primeng/card";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    ButtonModule,
    TableModule,
    DialogModule,
    InputTextModule,
    CalendarModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
