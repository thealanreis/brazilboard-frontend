import { HttpClient } from "@angular/common/http";
import {  Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { findInArray } from "../common/arrayUtils";
import { AppService } from "./app.service";


export interface URLS {
    [OTHER: string]: string;
}
@Injectable({
    providedIn: 'root'
})
export class GenericService {
    routes = [];

    constructor(protected router: Router, protected http: HttpClient, private app: AppService) {
        console.log('construindo generic service');
    }

    operation(operation, payload = null, route = null) {

        let url = findInArray(this.routes, 'keyword', operation.toLowerCase())
        url = this.replaceParameters(url.path, route);
        if (!payload) return this.callBackend(this.http.get(url));
        else return this.callBackend(this.http.post(url, payload));
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


    replaceParameters(url, route) {

        let regexp = /\<(.*?)\>/g; // Se existem parâmetros entre parenthesis
        let matches = url.match(regexp);
        if (matches) {
            let params = {}

            if (route) params = route.params; // Parametros da URL vem do resolver
            else params = this.router.routerState.snapshot.root.children[0].params; // Parametros da URL vem do Router no componente

            matches.forEach(
                match => {
                    let cleanMatch = match.replace(/[\<\>]/g, ''); // Remove os parentesis para encontrar o objeto correspondente no dict
                    url = url.replace(match, params[cleanMatch]);
                }
            );
        }
        return url;
    }



}