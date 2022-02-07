import {  HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForumComponent } from './components/forum/forum.component';
import { HomeComponent } from './pages/home/home.component';
import { TopicComponent } from './components/topic/topic.component';
import { ViewForumComponent } from './pages/view-forum/view-forum.component';
import { PostComponent } from './components/post/post.component';
import { ViewTopicComponent } from './pages/view-topic/view-topic.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateForumComponent } from './pages/create-forum/create-forum.component';
import { CreateTopicComponent } from './pages/create-topic/create-topic.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppService } from './services/app.service';
import { initializeApp } from 'src/app-initializer';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TopbarComponent } from './components/topbar/topbar.component';
import { MatListModule} from '@angular/material/list';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AclTableComponent } from './common/acl-table/acl-table.component';
import { TopicService } from './services/topic.service';
import { ForumService } from './services/forum.service';
import { PostService } from './services/post.service';
import { UserService } from './services/user.service';
import { LoremPipe } from './common/pipe-lorem';
import { RandomPipe } from './common/pipe-random';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ForumComponent,
    HomeComponent,
    TopicComponent,
    ViewForumComponent,
    PostComponent,
    ViewTopicComponent,
    LoginComponent,
    CreateForumComponent,
    CreateTopicComponent,
    CreatePostComponent,
    TopbarComponent,
    AclTableComponent,
    LoremPipe,
    RandomPipe,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
    MatListModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
  ],
  providers: [
    {provide: APP_INITIALIZER, useFactory: initializeApp, multi: true, deps: [AppService]},
    {provide: 'GenericService', useClass: TopicService, multi: true },
    {provide: 'GenericService', useClass: ForumService, multi: true },
    {provide: 'GenericService', useClass: PostService, multi: true },
    {provide: 'GenericService', useClass: UserService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
