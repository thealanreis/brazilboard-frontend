import { Observable } from "rxjs";
import { AppService } from "./app/services/app.service";

export function initializeApp(app: AppService): () => Promise<boolean> {
    return () => app.initialize();
   }