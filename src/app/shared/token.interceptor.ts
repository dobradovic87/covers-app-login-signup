// import { User } from 'src/app/shared/models/user.model';
// import {
//   HttpHandler,
//   HttpInterceptor,
//   HttpParams,
//   HttpRequest,
// } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { AuthService } from './services/auth.service';

// @Injectable()
// export class TokenInterceptor implements HttpInterceptor {
//   constructor(private authService: AuthService) {}

//   user = new User();
//   intercept(req: HttpRequest<any>, next: HttpHandler) {
//     this.user = this.authService.getUser();
//     if (!this.user) return next.handle(req);
//     const modifiedReq = req.clone({
//       params: new HttpParams().set('auth', this.user.idToken),
//     });
//     return next.handle(modifiedReq);
//   }
// }
