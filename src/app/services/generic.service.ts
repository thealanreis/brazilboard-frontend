import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";


export interface URLS {
    [OTHER: string]: string;
}

export class GenericService {

    constructor(protected router: Router, protected http: HttpClient, public urls: URLS) { }

    operation(operation, payload = null, route = null) {

        let url = this.replaceParameters(this.urls[operation], route);
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

        let regexp = /\[(.*?)\]/g; // Se existem parâmetros entre parenthesis
        let matches = url.match(regexp);
        if (matches) {
            let params = {}
            
            if (route) params = route.params; // Parametros da URL vem do resolver
            else params = this.router.routerState.snapshot.root.children[0].params; // Parametros da URL vem do Router no componente

            matches.forEach(
                match => {
                    let cleanMatch = match.replace(/[\[\]]/g, ''); // Remove os parentesis para encontrar o objeto correspondente no dict
                    url = url.replace(match, params[cleanMatch]);
                }
            );
        }
        return url;
    }

    

}