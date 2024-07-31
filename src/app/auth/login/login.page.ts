import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  type FormGroup,
} from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Auth, getAuth, signInWithCustomToken } from '@angular/fire/auth';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  changeState: boolean = true;

  get titleText(): string {
    return this.changeState ? 'Iniciar sesión' : 'Registrarse';
  }
  toggleChange(): void {
    this.changeState = !this.changeState;
  }
  loginForm!: FormGroup;
  registroForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.registroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    if (this.changeState) {
      if (this.loginForm.valid) {
        await this.authService.login(
          this.loginForm.get('email')?.value,
          this.loginForm.get('password')?.value
        );
      }
    } else {
      if (this.registroForm.valid) {
        await this.authService.register(
          this.registroForm.get('email')?.value,
          this.registroForm.get('password')?.value
        );
      }
    }
  }
}
