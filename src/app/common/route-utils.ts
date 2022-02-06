import { ActivatedRoute } from "@angular/router";

export function getResolverData(route: ActivatedRoute, key: string, acl?: boolean){
    if(acl) return route.snapshot.data['r'][key]['acl'];
    else return route.snapshot.data['r'][key]['items'];
    
}