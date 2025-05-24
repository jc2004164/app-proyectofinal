import { Routes } from '@angular/router';
import { ListaProveedorComponent } from './components/proveedores/lista-proveedor/lista-proveedor.component';
import { PageNotFoundComponent } from './components/errors/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home/home.component';
import { ProveedorAddComponent } from './components/proveedores/proveedor-add/proveedor-add.component';

export const routes: Routes = [
  {
  path:'home',
  component: HomeComponent
  },
/*
{
  path:'proveedores/lista',
  component: ListaProveedorComponent
},*/
{
    path:'proveedores/lista',
    loadComponent: () => import('./components/proveedores/lista-proveedor/lista-proveedor.component').then(m => m.ListaProveedorComponent),
  },
/*{
  path:'proveedores/add/:id',
  component: ProveedorAddComponent
},*/
{
    path:'proveedores/add/:id',
    loadComponent: () => import('./components/proveedores/proveedor-add/proveedor-add.component').then(m => m.ProveedorAddComponent),
},
/*{
  path:'proveedores/add',
  component: ProveedorAddComponent
},*/

{
    path:'proveedores/add',
    loadComponent: () => import('./components/proveedores/proveedor-add/proveedor-add.component').then(m => m.ProveedorAddComponent),
},
{ path: '',
  redirectTo: '/home',
  pathMatch: 'full'
},
{
  path: '**',
  component: PageNotFoundComponent
}

];
