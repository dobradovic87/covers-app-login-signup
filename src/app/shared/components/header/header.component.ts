import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  userLoggedIn: boolean = false;
  searchValue: string = '';
  isMobileScreen: boolean = false;
  mobileMenu: boolean = false;
  showSearch: boolean = false;
  showDropdown: boolean = false;
  query: string = '';
  menuHovered: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    event.target.innerWidth < 768
      ? (this.isMobileScreen = true)
      : (this.isMobileScreen = false);
  }

  ngOnInit(): void {
    document.body.style.overflow = 'auto';
    this.userLoggedIn = this.authService.isSignedIn();
    if (window.innerWidth < 768) this.isMobileScreen = true;
  }

  onEnter(value: string, event: KeyboardEvent): void {
    if (event.key === 'Enter' && !/^\s+$/.test(value)) {
      this.router.navigate(['/covers/list'], {
        queryParams: { searchTitle: value.trim() },
      });
    }
  }

  openMobileMenu(): void {
    this.mobileMenu = true;
    document.body.style.overflow = 'hidden';
  }

  closeMobileMenu(): void {
    this.mobileMenu = false;
    document.body.style.overflow = 'auto';
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
  }

  dropdownOpen(): void {
    this.showDropdown = true;
  }

  dropdownClose(): void {
    this.showDropdown = false;
    this.menuHovered = false;
  }

  onSignOut(): void {
    this.authService.signOut();
    this.userLoggedIn = false;
    document.body.style.overflow = 'auto';
    if (this.router.url === '/') {
      window.location.reload();
    } else this.router.navigate(['/']);
  }
}
