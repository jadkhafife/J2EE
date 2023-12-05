import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AppStateService} from "../services/app-state.service";

export const autorizationGuard: CanActivateFn = (route, state) => {
  let appState = inject(AppStateService);
  let router = inject(Router);
  if(appState.authState.roles.includes(route.data['RequiredRole']))
    return true;
  else
    router.navigateByUrl('/admin/notAuthorized');
    return false;
};
