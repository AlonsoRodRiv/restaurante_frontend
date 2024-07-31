import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { ProductService } from '../../../services/product.service';
import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.page.html',
  styleUrls: ['./new-product.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class NewProductPage implements OnInit {
  productImagePreview = 'https://placehold.co/100x100';
  imageFile: File | null = null;

  constructor(
    private modalController: ModalController,
    private productService: ProductService,
    private storage: Storage
  ) {}

  onFileSelected(event: any) {
    this.imageFile = event.target.files[0];
    if (this.imageFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.productImagePreview = e.target.result;
      };
      reader.readAsDataURL(this.imageFile);
    }
  }

  ngOnInit() {}

  async onSubmit(form: any) {
    if (form.valid && this.imageFile) {
      try {
        const imageUrl = await this.uploadImage(this.imageFile);
        const productData = {
          ...form.value,
          image: imageUrl,
        };
        this.productService.createProduct(productData).subscribe(
          () => {
            this.dismissModal(true);
          },
          (error) => {
            console.error('Error al crear el producto:', error);
            this.dismissModal(false);
          }
        );
      } catch (error) {
        console.error('Error al subir la imagen:', error);
        this.dismissModal(false);
      }
    }
  }

  dismissModal(productAdded: boolean = false) {
    this.modalController.dismiss({
      productAdded: productAdded,
    });
  }
  async uploadImage(file: File): Promise<string> {
    const storageRef = ref(this.storage, 'products/' + file.name);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  }
}
