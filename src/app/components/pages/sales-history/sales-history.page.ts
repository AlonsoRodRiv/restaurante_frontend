import { SaleDetailsModalPage } from './../../modals/sale-details-modal/sale-details-modal.page';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { SalesResponse } from 'src/app/interfaces/salesResponse';
import type { Sale } from 'src/app/interfaces/sale';
import { CartSaleService } from 'src/app/services/cart-sale.service';
import { Platform } from '@ionic/angular/standalone';
@Component({
  selector: 'app-sales-history',
  templateUrl: './sales-history.page.html',
  styleUrls: ['./sales-history.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class SalesHistoryPage implements OnInit {
  async verDetalle(venta: Sale) {
    const modal = await this.modalCtrl.create({
      component: SaleDetailsModalPage,
      componentProps: {
        sale: venta,
      },
    });

    await modal.present();
  }
  isMobile: boolean;

  sales: Sale[] = [];
  constructor(
    private platform: Platform,
    private cartSaleService: CartSaleService,
    private modalCtrl: ModalController
  ) {
    this.isMobile = this.platform.is('mobile');
  }

  ngOnInit() {
    this.loadSales();
  }
  loadSales() {
    this.cartSaleService.getSalesHistory().subscribe({
      next: (response: SalesResponse) => {
        console.log(response);
        this.sales = response.sales;
        this.sales.forEach((sale) => {
          sale.date = new Date(sale.date).toISOString();
        });
      },
      error: (err) => {
        console.error('Error fetching sales history', err);
      },
    });
  }
}
