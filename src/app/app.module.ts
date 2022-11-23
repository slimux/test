import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleUpdateComponent } from './article-update/article-update.component';

@NgModule({
  declarations: [
    AppComponent,
    AddArticleComponent,
    ArticleDetailsComponent,
    ArticleListComponent,
    ArticleUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
