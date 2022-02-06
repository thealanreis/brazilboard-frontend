import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";


export interface URLS {
    CREATE?: string;
    GET?: string;
    GET_ONE?: string;
    DELETE?: string;
    UPDATE?: string;
    [OTHER: string]: string;
}


export class GenericService {

    constructor(protected router: Router, protected http: HttpClient, protected urls: URLS) { }

    operation(operation, payload = null,) {
        if (!payload) return this.callBackend(this.http.get(this.urls[operation]));
        else return this.callBackend(this.http.post(this.urls[operation], payload));
    }

    callBackend(observable: Observable<any>) {
        return observable.pipe(
            map(response => this.handleEventResponse(response)))
    }

    handleEventResponse(r) {
        if (!environment.production) console.log(r);
        if (r['code'] == 1) {
            return r['result']
        }
        else if (r['code'] == 3) {
            // this.alertService.msg$.next({ type: 'error', text: r['error'] });
            return null;
        }
        else if (r['code'] == 4) {
            this.router.navigate(['/']);
            // this.alertService.errorMSg('Não autorizado');
        }
    }

}