import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { CreateForumComponent } from './pages/create-forum/create-forum.component';
import { CreateTopicComponent } from './pages/create-topic/create-topic.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ViewTopicComponent } from './pages/view-topic/view-topic.component';
import { ViewForumComponent } from './pages/view-forum/view-forum.component';
import { GenericResolver } from './common/generic-resolver';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'criar-forum', component: CreateForumComponent, resolve: { r: GenericResolver }  },
  { path: 'editar-forum/:fuuid', component: CreateForumComponent, resolve: { r: GenericResolver } },
  { path: 'forum/:fuuid', component: ViewForumComponent, resolve: { r: GenericResolver } },
  { path: 'forum/:fuuid/criar-topico', component: CreateTopicComponent },
  { path: 'forum/:fuuid/topico/:tuuid', component: ViewTopicComponent, resolve: { r: GenericResolver } },
  { path: 'forum/:fuuid/topico/:tuuid/editar-topico', component: CreateTopicComponent, resolve: { r: GenericResolver } },
  { path: 'forum/:fuuid/topico/:tuuid/criar-post', component: CreatePostComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
