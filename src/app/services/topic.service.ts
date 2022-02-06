import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from "@angular/router";
import { BACKEND } from "../common/endpoints";
import { GenericService } from "./generic.service";

@Injectable({
    providedIn: 'root'
})
export class TopicService extends GenericService {

    constructor(router: Router, http: HttpClient) {

        super(router, http, {});
    }

    override operation(operation, payload = null, route: ActivatedRouteSnapshot = null) {

        let forumUuid = '';
        let topicUuid = '';

        if (route) {
            forumUuid = route.params['fuuid']; // Resolver
            topicUuid = route.params['tuuid']; // Resolver
        }
        else {
            forumUuid = this.router.routerState.snapshot.root.children[0].params['fuuid'];
            topicUuid = this.router.routerState.snapshot.root.children[0].params['tuuid'];
        }

        let url = this.getTopicUrl(operation, forumUuid, topicUuid);
        if (!payload) return this.callBackend(this.http.get(url));
        else return this.callBackend(this.http.post(url, payload));
    }

    getTopicUrl(OPERATION, forumUuid, topicUuid) {
        switch (OPERATION) {
            case 'GET_TOPIC':
                return `${BACKEND}/forum/${forumUuid}/topic/${topicUuid}`;

            case 'GET_TOPICS':
                return `${BACKEND}/forum/${forumUuid}/topic`;

            case 'CREATE_TOPIC':
                return `${BACKEND}/forum/${forumUuid}/topic/create`;

            case 'UPDATE_TOPIC':
                return `${BACKEND}/forum/${forumUuid}/topic/${topicUuid}/update`;

            case 'DELETE_TOPIC':
                return `${BACKEND}/forum/${forumUuid}/topic/${topicUuid}/delete`;

            default:
                return null;
        }
    }
}