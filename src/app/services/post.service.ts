import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CREATE_POST_URL, DELETE_POST_URL, GET_POST_URL, GET_POSTS_URL, UPDATE_POST_URL } from "../common/endpoints";
import { GenericService } from "./generic.service";

@Injectable({
    providedIn: 'root'
})
export class PostService extends GenericService{

    constructor(router: Router, http: HttpClient) {

        super(router, http, {
            GET_POST: GET_POST_URL,
            GET_POSTS: GET_POSTS_URL,
            CREATE_POST : CREATE_POST_URL,
            UPDATE_POST: UPDATE_POST_URL,
            DELETE_POST : DELETE_POST_URL 
        });
    }
}