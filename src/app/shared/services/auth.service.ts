import { MessageService } from 'src/app/shared/services/message.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from './../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { Location } from '@angular/common';
import { GoogleAuthProvider } from '@firebase/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user: User;
  obj: {};
  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth,
    private messageService: MessageService,
    private location: Location
  ) {}

  isSessionValid(): boolean {
    const token = localStorage.getItem('AccessToken') || undefined;
    if (token !== undefined) {
      return this.getUser().expiresIn > new Date().getTime();
    }
  }

  isSignedIn(): boolean {
    const token = localStorage.getItem('AccessToken') || undefined;
    return token !== undefined && this.isSessionValid() ? true : false;
  }

  saveAccessToken(token: string): void {
    if (token) {
      localStorage.setItem('AccessToken', token);
    }
  }

  saveUser(data: User) {
    if (data) {
      const user = new User();
      user.email = data.email;
      user.idToken = data.idToken;
      user.kind = data.kind;
      user.localId = data.localId;
      user.refreshToken = data.refreshToken;
      user.expiresIn = new Date().getTime() + 3600 * 1000;
      localStorage.setItem('User', JSON.stringify(user));
    }
  }

  getAccessToken(): string {
    return this.isSignedIn() ? localStorage.getItem('AccessToken') : undefined;
  }

  getUser(): User {
    return JSON.parse(localStorage.getItem('User'));
  }

  signUp(data: User): Observable<any> {
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDYQwmQQqbqLsbmMuwRwVdfXF46QsuDywA',
      data
    );
  }

  sendEmailVerification(token: string): Observable<any> {
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDYQwmQQqbqLsbmMuwRwVdfXF46QsuDywA',
      { requestType: 'VERIFY_EMAIL', idToken: token }
    );
  }

  loginWithGoogle(): void {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    const googleUser = new User();
    googleUser.returnSecureToken = true;
    this.afAuth.signInWithPopup(googleAuthProvider).then((res) => {
      googleUser.localId = res.user.uid;
      googleUser.refreshToken = res.user.refreshToken;
      for (const prop in res.additionalUserInfo.profile) {
        if (prop === 'email')
          googleUser.email = res.additionalUserInfo.profile[prop];
      }

      this.saveUser(googleUser);
      res.user.getIdToken(true).then((idToken) => {
        googleUser.idToken = idToken;
        this.saveAccessToken(idToken);
        this.saveUser(googleUser);
        this.messageService.success('Login was successful');
        this.location.back();
      });
    });
  }

  signIn(data: User): Observable<any> {
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDYQwmQQqbqLsbmMuwRwVdfXF46QsuDywA',
      data
    );
  }

  signOut(): boolean {
    if (this.isSignedIn()) {
      this.afAuth.signOut();
      localStorage.clear();
      return !this.isSignedIn();
    }
  }
}
