import { Inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot, Routes } from "@angular/router";
import { forkJoin, tap } from "rxjs";
import { findInArray } from "../common/arrayUtils";
import { CreatePostComponent } from "../components/create-post/create-post.component";
import { User } from "../models/user";
import { CreateForumComponent } from "../pages/create-forum/create-forum.component";
import { CreateTopicComponent } from "../pages/create-topic/create-topic.component";
import { HomeComponent } from "../pages/home/home.component";
import { LoginComponent } from "../pages/login/login.component";
import { ViewForumComponent } from "../pages/view-forum/view-forum.component";
import { ViewTopicComponent } from "../pages/view-topic/view-topic.component";
import { GenericService } from "./generic.service";
import { UserService } from "./user.service";


export interface ServiceOperation {
    operation: string;
    service: GenericService;
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
        { path: '', component: HomeComponent },
        { path: 'criar-forum', component: CreateForumComponent, operations: ['GET_USERS', 'GET_ROLES'] },
        { path: 'editar-forum/:fuuid', component: CreateForumComponent, operations: ['GET_USERS', 'GET_ROLES', 'GET_FORUM'] },
        { path: 'forum/:fuuid', component: ViewForumComponent, operations: ['GET_TOPICS'] },
        { path: 'forum/:fuuid/criar-topico', component: CreateTopicComponent },
        { path: 'forum/:fuuid/topico/:tuuid', component: ViewTopicComponent, operations: ['GET_POSTS'] },
        { path: 'forum/:fuuid/topico/:tuuid/editar-topico', component: CreateTopicComponent, operations: ['GET_TOPIC'] },
        { path: 'forum/:fuuid/topico/:tuuid/criar-post', component: CreatePostComponent },
        { path: 'login', component: LoginComponent },
    ];
    routes: Routes = []
    serviceOperations: ServiceOperation[] = [];

    constructor(private userService: UserService, private router: Router, @Inject('GenericService') private services: GenericService[]) {
    }

    initialize() {
        /* Preenche as rotas do Angular*/
        this.router.config = this.routeConfig.map(
            route => {
                if (route.operations) return { path: route.path, component: route.component, resolve: { r: AppService } }
                else return { path: route.path, component: route.component }
            }
        );
        /* Preenche a operação e o serviço relacionado */
        this.services.forEach(
            svc => {
                Object.keys(svc.urls).forEach(
                    operation => this.serviceOperations.push({ operation: operation, service: svc })
                )
            }
        );
        /* Retorna o usuário logado, se existente */
        return this.userService.operation('LOGGED_IN').pipe(tap(
            r => { if (r) this.user = r['items'] }
        ));
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let url = route.routeConfig.path; // Coleta a url atual
        let routeCfg = this.routeConfig.find(route => route.path == url); // Extrai a url das rotas configuradas
        let operations = routeCfg.operations; // Extrai as operações para aquela rota

        let svcs = {};
        operations.forEach(
            operation => {
                let svcOperation: ServiceOperation = findInArray(this.serviceOperations, 'operation', operation);
                svcs[operation] = svcOperation.service.operation(operation, null, route); // Para cada operação, extrai o serviço relacionado
            }
        );

        return forkJoin(svcs); // Retorna uma array com o resultado dos serviços
    }
}