import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { forkJoin, of } from "rxjs";
import { ForumService } from "../services/forum.service";
import { PostService } from "../services/post.service";
import { TopicService } from "../services/topic.service";
import { UserService } from "../services/user.service";

@Injectable({
    providedIn: 'root'
})
export class GenericResolver implements Resolve<any>{

    constructor(private topicService: TopicService, private postService: PostService, private forumServie: ForumService, private userService: UserService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let url = route.routeConfig.path; //forum/:fuuid/topico/:tuuid

        switch (url) {
            case 'criar-forum':
                return forkJoin([
                    this.userService.operation('GET_USERS'),
                    this.userService.operation('GET_ROLES')
                ])

            case 'editar-forum/:fuuid':
                return forkJoin([
                    this.userService.operation('GET_USERS'),
                    this.userService.operation('GET_ROLES'),
                    this.forumServie.operation('GET_FORUM', null, route),
                ]);

            case 'forum/:fuuid':
                return this.topicService.operation('GET_TOPICS', null, route);

            case 'forum/:fuuid/topico/:tuuid':
                return this.postService.operation('GET_POSTS', null, route);

            case 'forum/:fuuid/topico/:tuuid/editar-topico':
                return this.topicService.operation('GET_TOPIC', null, route);

            default:
                return of('fu');

        }

    }

}