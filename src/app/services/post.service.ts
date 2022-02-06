import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { BACKEND } from "../common/endpoints";
import { GenericService } from "./generic.service";

@Injectable({
    providedIn: 'root'
})
export class PostService extends GenericService {

    constructor(router: Router, http: HttpClient) {
        super(router, http, {
            'GET_POST': '',
            'GET_POSTS': '',
            'CREATE_POST': '',
            'UPDATE_POST': '',
            'DELETE_POST': ''
        });
    }

    override getUrl(OPERATION, route) {
        let forumUuid = ''
        let topicUuid = ''
        let postUuid = ''

        if (route) {
            forumUuid = route.params['fuuid'] // Resolver
            topicUuid = route.params['tuuid'] // Resolver
            postUuid = route.params['puuid'] // Resolver
        }
        else {
            forumUuid = this.router.routerState.snapshot.root.children[0].params['fuuid'];
            topicUuid = this.router.routerState.snapshot.root.children[0].params['tuuid'];
            postUuid = this.router.routerState.snapshot.root.children[0].params['puuid']
        }

        switch (OPERATION) {
            case 'GET_POST':
                return `${BACKEND}/forum/${forumUuid}/topic/${topicUuid}/post/${postUuid}`;

            case 'GET_POSTS':
                return `${BACKEND}/forum/${forumUuid}/topic/${topicUuid}/post`;

            case 'CREATE_POST':
                return `${BACKEND}/forum/${forumUuid}/topic/${topicUuid}/post/create`;

            case 'UPDATE_POST':
                return `${BACKEND}/forum/${forumUuid}/topic/${topicUuid}/post/${postUuid}/update`;

            case 'DELETE_POST':
                return `${BACKEND}/forum/${forumUuid}/topic/${topicUuid}/post/${postUuid}/delete`;

            default:
                return null;
        }
    }

}