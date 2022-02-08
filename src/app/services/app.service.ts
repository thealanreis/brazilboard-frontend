import { HttpClient } from "@angular/common/http";
import {  Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot, Routes } from "@angular/router";
import { forkJoin } from "rxjs";
import { LOGGED_IN_URL, ROUTES_URL } from "../common/endpoints";
import { CreatePostComponent } from "../components/create-post/create-post.component";
import { User } from "../models/user";
import { CreateForumComponent } from "../pages/create-forum/create-forum.component";
import { CreateTopicComponent } from "../pages/create-topic/create-topic.component";
import { HomeComponent } from "../pages/home/home.component";
import { LoginComponent } from "../pages/login/login.component";
import { MyProfileComponent } from "../pages/my-profile/my-profile.component";
import { ViewForumComponent } from "../pages/view-forum/view-forum.component";
import { ViewTopicComponent } from "../pages/view-topic/view-topic.component";
import { GenericService } from "./generic.service";


export interface ServiceOperation {
    operation: string;
    service: GenericService;
}

export interface RouteBackend {
    path: string;
    keyword: string;
}

export interface RouteConfig {
    path: string;
    component: any;
    operations?: Array<string>;
}

@Injectable({
    providedIn: 'root'
})
export class AppService implements Resolve<any>{

    user: User;
    routeConfig: RouteConfig[] = [
        { path: '', component: HomeComponent, operations: ['GET_FORUMS'] },
        { path: 'criar-forum', component: CreateForumComponent, operations: ['GET_USERS', 'GET_ROLES'] },
        { path: 'editar-forum/:fuuid', component: CreateForumComponent, operations: ['GET_USERS', 'GET_ROLES', 'GET_FORUM'] },
        { path: 'forum/:fuuid', component: ViewForumComponent, operations: ['GET_TOPICS'] },
        { path: 'forum/:fuuid/criar-topico', component: CreateTopicComponent },
        { path: 'forum/:fuuid/topico/:tuuid', component: ViewTopicComponent, operations: ['GET_POSTS'] },
        { path: 'forum/:fuuid/topico/:tuuid/editar-topico', component: CreateTopicComponent, operations: ['GET_TOPIC'] },
        { path: 'forum/:fuuid/topico/:tuuid/criar-post', component: CreatePostComponent },
        { path: 'login', component: LoginComponent },
        { path: 'meu-perfil', component: MyProfileComponent, operations: ['GET_MY_USER'] }
    ];

    constructor(private http: HttpClient, private backend: GenericService, private router: Router) {
    }

    initialize() {
        return new Promise<boolean>(resolve => {
            /* Preenche as rotas do Angular*/
            this.router.config = this.routeConfig.map(
                route => {
                    if (route.operations) return { path: route.path, component: route.component, resolve: { r: AppService } }
                    else return { path: route.path, component: route.component }
                }
            );


            forkJoin([
                this.http.get<any>(ROUTES_URL),
                this.http.get<any>(LOGGED_IN_URL)
            ]).subscribe(
                result => {
                    this.backend.routes = result[0]['items'];
                    if (result[1]) this.user = result[1]['result']['items'];
                    resolve(true);
                }
            )
        });

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log('resolving');
        let url = route.routeConfig.path; // Coleta a url atual
        let routeCfg = this.routeConfig.find(route => route.path == url); // Extrai a url das rotas configuradas
        let operations = routeCfg.operations; // Extrai as operações para aquela rota

        let svcs = {};
        operations.forEach(
            operation => {
                svcs[operation] = this.backend.operation(operation.toLowerCase(), null, route);
            }
        );

        return forkJoin(svcs); // Retorna uma array com o resultado dos serviços
    }
}