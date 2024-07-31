import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule, ModalController } from '@ionic/angular';
import type { Product } from 'src/app/interfaces/product';
import { CartSaleService } from 'src/app/services/cart-sale.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CartModalPage implements OnInit {
  cart: Product[] = [];
  constructor(
    private cartSaleService: CartSaleService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.cartSaleService.getCart().subscribe((cart) => {
      this.cart = cart;
    });
  }

  removeCartItem(product: Product) {
    this.cartSaleService.removeProduct(product);
  }
  getTotal() {
    return this.cartSaleService.getTotal();
  }

  getSubTotal() {
    return this.cartSaleService.getSubtotal();
  }

  getImpuesto() {
    return this.cartSaleService.getTax();
  }

  close() {
    this.modalCtrl.dismiss();
  }

  async pagar() {
    // Completar la venta
    this.cartSaleService.completeSale();

    // Mostrar alerta de confirmación
    let alert = await this.alertCtrl.create({
      header: '¡Gracias por su pedido!',
      message: 'Entregaremos su comida lo antes posible.',
      buttons: ['OK'],
    });

    // Mostrar la alerta y cerrar el modal
    await alert.present();
    await alert.onDidDismiss();
    this.modalCtrl.dismiss();
  }
}
