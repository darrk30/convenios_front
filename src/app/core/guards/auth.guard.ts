import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// Auth Services
import { environment } from '../../../environments/environment';
import { AutenticacionService } from '../services/autenticacion.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private autenticacionService: AutenticacionService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const currentUser = this.autenticacionService.currentUsuarioValue;
        if (currentUser) {
            // logged in so return true
            const helper = new JwtHelperService();
            const token = localStorage.getItem('token');
            if (helper.isTokenExpired(token)) {
                localStorage.removeItem('token');
                localStorage.removeItem('currentUser');
                this.router.navigate(['/auth/login']);
                return false;
            }
        }
        // check if user data is in storage is logged in via API.
        if (localStorage.getItem('currentUser')) {
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
