import { Component, type OnInit } from '@angular/core';
import type { Product } from '../interfaces/product';
import { BehaviorSubject } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { IonicModule, ModalController } from '@ionic/angular';
import { Platform } from '@ionic/angular/standalone';
import { ProductService } from '../services/product.service';
import { CartSaleService } from '../services/cart-sale.service';
import { CartModalPage } from '../components/modals/cart-modal/cart-modal.page';
import { NewProductPage } from '../components/modals/new-product/new-product.page';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class HomePage implements OnInit {
  menuItems: any;
  isMobile: boolean;
  cart: Product[] = [];
  products: Product[] = [];
  cartItemCount: BehaviorSubject<number> | undefined;
  constructor(
    private platform: Platform,
    private productService: ProductService,
    private toastController: ToastController,
    private modalController: ModalController,
    private cartSaleService: CartSaleService
  ) {
    this.isMobile = this.platform.is('mobile');
  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.menuItems = data.productos;
      },
      error: (err) => {
        console.error('Error fetching products', err);
      },
    });

    this.cartItemCount = this.cartSaleService.getCartItemCount();
  }

  async addToCart(item: Product) {
    this.cartSaleService.addProduct(item);
    const toast = await this.toastController.create({
      message: `Added  ${item.name}(s) to Cart`,
      duration: 2000,
    });
    toast.present();
  }
  async openCart() {
    let modal = await this.modalController.create({
      component: CartModalPage,
    });
    await modal.present();
  }
  async AddNewProduct() {
    let modal = await this.modalController.create({
      component: NewProductPage,
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data && data.productAdded) {
      this.updateProducts();
    }
  }

  updateProducts() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.menuItems = data.productos;
      },
      error: (err) => {
        console.error('Error fetching products', err);
      },
    });
  }
}
