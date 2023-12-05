import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AppStateService} from "../services/app-state.service";

export const authenticationGuard: CanActivateFn = (route, state) => {
  let appState = inject(AppStateService);
  let router = inject(Router);
  if(appState.authState.isAuthenticated)
    return true;
  else
    router.navigateByUrl('/login');
    return false;
};
