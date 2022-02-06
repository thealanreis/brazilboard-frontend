import { Observable } from "rxjs";
import { AppService } from "./app/services/app.service";

export function initializeApp(app: AppService): () => Observable<void> {
    return () => app.initialize();
   }