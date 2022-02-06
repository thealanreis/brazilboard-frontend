import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppService } from './services/app.service';

// const routes: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'criar-forum', component: CreateForumComponent, resolve: { r: GenericResolver }  },
//   { path: 'editar-forum/:fuuid', component: CreateForumComponent, resolve: { r: GenericResolver } },
//   { path: 'forum/:fuuid', component: ViewForumComponent, resolve: { r: GenericResolver } },
//   { path: 'forum/:fuuid/criar-topico', component: CreateTopicComponent },
//   { path: 'forum/:fuuid/topico/:tuuid', component: ViewTopicComponent, resolve: { r: GenericResolver } },
//   { path: 'forum/:fuuid/topico/:tuuid/editar-topico', component: CreateTopicComponent, resolve: { r: GenericResolver } },
//   { path: 'forum/:fuuid/topico/:tuuid/criar-post', component: CreatePostComponent },
//   { path: 'login', component: LoginComponent },
// ];

@NgModule({
  imports: [RouterModule.forRoot([])],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private app: AppService){}
 }
