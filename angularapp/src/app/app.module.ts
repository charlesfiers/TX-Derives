import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WordsService } from './services/words.service';
import { SkeletonComponent } from './skeleton/skeleton.component';


@NgModule({
  declarations: [
    AppComponent,
    SkeletonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
  	WordsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
