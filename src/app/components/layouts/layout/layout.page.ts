import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Platform } from '@ionic/angular/standalone';
import { IonicModule, ModalController } from '@ionic/angular';
import { MenuPage } from '../menu/menu.page';
import { HomePage } from '../../../home/home.page';
import { Router, RouterOutlet } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CartSaleService } from '../../../services/cart-sale.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.page.html',
  styleUrls: ['./layout.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MenuPage,
    HomePage,
    RouterOutlet,
  ],
})
export class LayoutPage implements OnInit {
  router = inject(Router);
  logout() {
    localStorage.removeItem('idToken');
    this.router.navigate(['/login']);
  }
  isMobile: boolean = false;
  role: string = '';
  cartItemCount: BehaviorSubject<number> | undefined;

  constructor(
    private platform: Platform,
    private cartSaleService: CartSaleService
  ) {
    this.isMobile = this.platform.is('mobile');
  }

  ngOnInit() {
    this.cartItemCount = this.cartSaleService.getCartItemCount();
    // this.extractRoleFromToken();
  }

  // email: string = '';
  // role: string = '';

  // extractRoleFromToken(): void {
  //   if (localStorage.getItem('Idtoken')) {
  //     const token = localStorage.getItem('Idtoken');
  //     if (token) {
  //       const decodedToken: { email: string; role: string } = jwtDecode(token);

  //       console.log('decodedjwt', decodedToken);
  //       if (decodedToken.email) {
  //         this.email = decodedToken.email;
  //       }
  //       if (decodedToken.role) {
  //         this.role = decodedToken.role;
  //       }
  //     }
  //   }
  // }
}
