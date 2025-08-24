import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
    selector: 'app-profile',
    imports: [AsyncPipe],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css'
})
export class ProfileComponent {
  private auth = inject(AuthService);

  isAuthenticated$ = this.auth.isAuthenticated$;
}
