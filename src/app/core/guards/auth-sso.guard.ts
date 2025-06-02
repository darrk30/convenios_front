import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { KeycloakService } from '../services/Keycloak.service';

@Injectable({
    providedIn: 'root'
})
export class KeycloakSsoGuard implements CanActivate {

    constructor(private keycloakService: KeycloakService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
        const currentUser = this.keycloakService.currentUsuarioValue;

        if (!currentUser || !currentUser.token) {
            return Promise.resolve(this.router.parseUrl('/auth/sso'));
        }

        const token = currentUser.token;
        const helper = new JwtHelperService();

        if (!helper.isTokenExpired(token)) {
            return Promise.resolve(true);
        }

        console.warn('🔁 Token expirado detectado. Intentando renovar...');

        return this.keycloakService.getKeycloakInstance().updateToken(60)
            .then(refreshed => {
                if (refreshed) {
                    const newToken = this.keycloakService.getKeycloakInstance().token??"null";
                    const updatedUser = { ...currentUser, token: newToken };
                    localStorage.setItem('token', newToken);
                    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
                    this.keycloakService.currentUsuarioSubject.next(updatedUser);
                    return true;
                } else {
                    localStorage.removeItem('token');
                    localStorage.removeItem('currentUser');
                    return this.router.parseUrl('/auth/sso');
                }
            })
            .catch(() => {
                localStorage.removeItem('token');
                localStorage.removeItem('currentUser');
                return this.router.parseUrl('/auth/sso');
            });
    }

}