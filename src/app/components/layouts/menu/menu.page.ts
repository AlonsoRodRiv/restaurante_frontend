import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class MenuPage implements OnInit {
  @Input() isMobile: boolean = false;
  @Input() role: string = '';
  constructor() {}

  ngOnInit() {
    this.extractRoleFromToken();
  }

  extractRoleFromToken(): void {
    if (localStorage.getItem('Idtoken')) {
      const token = localStorage.getItem('Idtoken');
      if (token) {
        const decodedToken: { email: string; role: string } = jwtDecode(token);

        console.log('decodedjwt', decodedToken);

        if (decodedToken.role) {
          this.role = decodedToken.role;
        }
      }
    }
  }
}
