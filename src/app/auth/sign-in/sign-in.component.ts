import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {
  isLoading: boolean = false;
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
  }

  googleLogin(): void {
    this.authService.loginWithGoogle();
  }

  onSubmit(): void {
    if (!this.loginForm.valid) return;
    this.isLoading = true;
    const user = new User();
    user.email = this.loginForm.get('email')?.value;
    user.password = this.loginForm.get('password')?.value;
    user.returnSecureToken = true;

    this.authService.signIn(user).subscribe(
      (res) => {
        this.isLoading = false;
        this.messageService.success('Login was successful');
        this.authService.saveAccessToken(res.idToken);
        this.authService.saveUser(res);
        this.location.back();
      },

      (err) => {
        this.messageService.errorHandler(err.error.error.message);
        this.isLoading = false;
      }
    );
  }
}
