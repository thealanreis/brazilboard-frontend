import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map, tap } from "rxjs";
import { LOGGED_IN_URL } from "../common/endpoints";
import { User } from "../models/user";
import { UserService } from "./user.service";

@Injectable({
    providedIn: 'root'
})
export class AppService {

    user : User;
    constructor(private userService: UserService) {
    }

    initialize(){
        
        return this.userService.operation('LOGGED_IN').pipe(tap(
            r => {if(r) this.user = r['items']}
        ))
    }
}