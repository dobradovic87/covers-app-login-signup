import { CustomValidator } from './../../shared/helpers/validator.helper';
import { MessageService } from './../../shared/services/message.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent implements OnInit {
  isLoading: boolean = false;
  signupForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
    private customValidator: CustomValidator
  ) {}

  ngOnInit(): void {
    if (this.authService.isSignedIn()) this.router.navigate(['/']);
    this.signupForm = this.fb.group(
      {
        email: [
          '',
          Validators.compose([Validators.required, Validators.email]),
        ],
        password: [
          '',
          Validators.compose([Validators.required, Validators.minLength(6)]),
        ],
        passwordConfirm: [
          '',
          Validators.compose([Validators.required, Validators.minLength(6)]),
        ],
      },
      {
        validator: this.customValidator.passwordMatch(
          'password',
          'passwordConfirm'
        ),
      }
    );
  }

  googleLogin(): void {
    this.authService.loginWithGoogle();
  }

  onSubmit(): void {
    if (!this.signupForm.valid) return;
    this.isLoading = true;
    const user = new User();
    user.email = this.signupForm.get('email')?.value;
    user.password = this.signupForm.get('password')?.value;
    user.returnSecureToken = true;
    this.authService.signUp(user).subscribe(
      (res) => {
        this.isLoading = false;
        this.signupForm.reset();
        this.router.navigate(['/auth/signin']);
        this.messageService.success(
          'Successufully created account. Please log in'
        );
      },

      (err) => {
        this.messageService.errorHandler(err.error.error.message);
        this.isLoading = false;
      }
    );
  }
}
