import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { BACKEND } from "../common/endpoints";
import { GenericService } from "./generic.service";

@Injectable({
    providedIn: 'root'
})
export class ForumService extends GenericService {

    constructor(router: Router, http: HttpClient) {
        super(router, http, {
            'GET_FORUM': '',
            'GET_FORUMS': '',
            'CREATE_FORUM': '',
            'UPDATE_FORUM': '',
            'DELETE_FORUM': '',
        });
    }

    override getUrl(OPERATION, route) {

        let forumUuid = '';
        if (route) forumUuid = route.params['fuuid'] // Resolver
        else forumUuid = this.router.routerState.snapshot.root.children[0].params['fuuid'];

        switch (OPERATION) {

            case 'GET_FORUMS':
                return `${BACKEND}/get-forums`;

            case 'GET_FORUM':
                return `${BACKEND}/manage/forum/${forumUuid}`;

            case 'CREATE_FORUM':
                return `${BACKEND}/manage/forum/create-forum`;

            case 'UPDATE_FORUM':
                return `${BACKEND}/manage/forum/${forumUuid}/update`;

            case 'DELETE_FORUM':
                return `${BACKEND}/manage/forum/${forumUuid}/delete`;

            case 'GET_FORUM_ACL':
                return `${BACKEND}/manage/forum/${forumUuid}/get-forum-acl`;

            default:
                return null;
        }
    }
}