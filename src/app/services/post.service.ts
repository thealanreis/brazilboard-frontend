import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from "@angular/router";
import { BACKEND } from "../common/endpoints";
import { GenericService } from "./generic.service";

@Injectable({
    providedIn: 'root'
})
export class PostService extends GenericService {

    constructor(router: Router, http: HttpClient) {

        super(router, http, {});
    }

    override operation(operation, payload = null, route: ActivatedRouteSnapshot = null) {

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

        let url = this.getPostUrl(operation, forumUuid, topicUuid, postUuid);

        if (!payload) return this.callBackend(this.http.get(url));
        else return this.callBackend(this.http.post(url, payload));
    }

    getPostUrl(OPERATION, forumUuid, topicUuid, postUuid) {
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