import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { GET_ROLES_URL, GET_USERS_URL, LOGGED_IN_URL, LOGIN_URL, REGISTER_USER_URL } from "../common/endpoints";
import { User } from "../models/user";
import { GenericService } from "./generic.service";

@Injectable({
    providedIn: 'root'
})
export class UserService extends GenericService {


    constructor(router: Router, http: HttpClient) {

        super(router, http, {
            REGISTER: REGISTER_USER_URL,
            LOGIN: LOGIN_URL,
            LOGGED_IN: LOGGED_IN_URL,
            GET_ROLES: GET_ROLES_URL,
            GET_USERS: GET_USERS_URL
        });
    }

}