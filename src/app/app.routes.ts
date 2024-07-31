import { Routes } from '@angular/router';
import { LayoutPage } from './components/layouts/layout/layout.page';
import { NotFoundComponent } from './helpers/not-found/not-found.component';
import { AuthGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.page').then((m) => m.LoginPage),
  },

  {
    path: '',
    component: LayoutPage,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
      },

      {
        path: 'sales-history',
        loadComponent: () =>
          import('./components/pages/sales-history/sales-history.page').then(
            (m) => m.SalesHistoryPage
          ),
      },
    ],
  },

  {
    path: 'cart-modal',
    loadComponent: () =>
      import('./components/modals/cart-modal/cart-modal.page').then(
        (m) => m.CartModalPage
      ),
  },
  {
    path: 'new-product',
    loadComponent: () =>
      import('./components/modals/new-product/new-product.page').then(
        (m) => m.NewProductPage
      ),
  },
  {
    path: 'menu',
    loadComponent: () =>
      import('./components/layouts/menu/menu.page').then((m) => m.MenuPage),
  },
  {
    path: 'layout',
    loadComponent: () =>
      import('./components/layouts/layout/layout.page').then(
        (m) => m.LayoutPage
      ),
  },
  {
    path: 'sales-history',
    loadComponent: () =>
      import('./components/pages/sales-history/sales-history.page').then(
        (m) => m.SalesHistoryPage
      ),
  },
  {
    path: 'sale-details-modal',
    loadComponent: () =>
      import(
        './components/modals/sale-details-modal/sale-details-modal.page'
      ).then((m) => m.SaleDetailsModalPage),
  },
  {
    path: 'login',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  { path: '**', component: NotFoundComponent },
];
