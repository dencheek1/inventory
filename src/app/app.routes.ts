import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/pages/main/main.component').then(
        (x) => x.MainComponent
      ),
  },
  {
    path: 'edit',
    loadComponent: () =>
      import('./components/pages/edit/edit.component').then(
        (x) => x.EditComponent
      ),
  },
];
