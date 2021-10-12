import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private toastr: ToastrService) {}

  errorHandler(error: string): void {
    let errorMessage: string = '';
    if (error) {
      switch (error) {
        case 'EMAIL_EXISTS':
          errorMessage = 'The email address is already registered';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          errorMessage = 'Too many attempts, try again later';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'There is no user with this email';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'Invalid password';
          break;
        case 'USER_DISABLED':
          errorMessage =
            'The user account has been disabled by an administrator';
          break;
        default:
          errorMessage = 'An error occured';
      }
    }
    this.toastr.error(errorMessage);
  }

  success(message: string) {
    this.toastr.success(message);
  }

  error(message: string) {
    this.toastr.error(message);
  }

  info(message: string) {
    this.toastr.info(message);
  }

  warning(message: string) {
    this.toastr.warning(message);
  }
}
