
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GuardService } from './guard';

export const recordEditGuard: CanActivateFn = () => {
  const guardService = inject(GuardService);
  const router = inject(Router);

  if (guardService.guardEnabled()) {
    return router.parseUrl('/records');
  }

  return true;
};
