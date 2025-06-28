import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { GlobalService } from '@/app/core/services/global.service';
import { Rol } from '@/app/features/private/maintenance/perfiles/data/perfil.model';

@Injectable({ providedIn: 'root' })
export class NegocioGuard implements CanActivate {
    constructor(
        private router: Router,
        private globalService: GlobalService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const rol = this.globalService.getCurrentRol(); 
        if ((rol === Rol.Administrador) || (rol === Rol.Coordinador)){
            return true;
        }       

        this.router.navigate(['']);
    }
}
