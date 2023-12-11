import { HttpInterceptorFn } from '@angular/common/http';

export const productInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(`request is on its way to: ${req.url}`);
  return next(req);
};
