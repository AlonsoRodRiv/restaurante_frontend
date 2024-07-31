import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import type { Sale } from 'src/app/interfaces/sale';

@Component({
  selector: 'app-sale-details-modal',
  templateUrl: './sale-details-modal.page.html',
  styleUrls: ['./sale-details-modal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class SaleDetailsModalPage implements OnInit {
  @Input() sale!: Sale;

  constructor(private modalCtrl: ModalController) {}

  dismiss() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {}
}
