import Swal from 'sweetalert2';
import { Proveedor } from '../../../interfaces/proveedores/proveedor';
import { ProveedoresService } from '../../../services/proveedores.service';
import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe, DatePipe, JsonPipe, LowerCasePipe, UpperCasePipe } from '@angular/common';
import { ShortDireccionPipe } from "../../../pipes/short-direccion.pipe";
import { PaginatorModule, PaginatorState  } from 'primeng/paginator';
import { Dialog, DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Categoria } from '../../../interfaces/proveedores/categoria';
import { CategoriasService } from '../../../services/categorias.service';
@Component({
  selector: 'app-lista-proveedor',
  imports: [
    ReactiveFormsModule,
    UpperCasePipe,
    LowerCasePipe,
    DatePipe,
    ShortDireccionPipe,
    PaginatorModule,
    DialogModule,
    FormsModule,
    Dialog,
    ButtonModule,
   // JsonPipe,
    TableModule
],
  templateUrl: './lista-proveedor.component.html',
  styleUrl: './lista-proveedor.component.css'
})
export class ListaProveedorComponent implements OnInit{

  idCategoria:number = 0;
  first: number = 0;

  rows: number = 5;

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 5;
    this.actualizarPaginados();
  }


  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  actualizarPaginados() {
    const start = this.first;
    const end = this.first + this.rows;
    this.pagedItems = this.proveedores.slice(start, end);
  }

  pagedItems:Proveedor[]=[];
  proveedores:Proveedor[]=[];
  proveedoresVisualizar?:Proveedor;

  categorias:Categoria[]=[];
  categoriaService=inject(CategoriasService);

  frmProveedor!:FormGroup;
  hoy:Date=new Date();

  proveedorService=inject(ProveedoresService);

  toastr= inject(ToastrService)
  router=inject(Router)

  formBuilder = inject(FormBuilder);


  modificar(proveedores:Proveedor){
    this.router.navigate(['proveedores/add', proveedores.id]);
  }

  visualizar(proveedor:Proveedor){
    this.proveedoresVisualizar=proveedor
    this.idCategoria=this.proveedoresVisualizar.categoria
    this.showDialog();
  }

  nuevo(){
    this.router.navigate(['proveedores/add']);
  }

  buscar(){
    this.findByNombre_empresa();
  }

  limpiar(){
    this.frmProveedor.get('nombre_empresa')?.setValue('');
    this.findByNombre_empresa()
    //this.proveedores=[]
  }

  eliminar(proveedores:Proveedor){
    Swal.fire({
          title: "Alerta",
          text: "Confirma la eliminacion del proveedor: "+proveedores.nombre_empresa,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si!"
        }).then((result) => {
          if (result.isConfirmed) {
            this.proveedorService.delete(proveedores.id).subscribe(
          {
            next: (response) => {
              console.log(response)
              if(response){
                this.toastr.success('El proveedor '+proveedores.nombre_empresa +', fue eliminado exitosamente','Aviso');
                this.proveedores = this.proveedores.filter(p => p.id != proveedores.id);
                this.actualizarPaginados();
              }
              else{
                this.toastr.warning('Error al eliminar el producto','Error');
                console.log(response)
              }
            },
            error: (error) => {
              this.toastr.error('Error al eliminar al proveedor','Error');
            }
          }
          )

          }
        });
  }
  ngOnInit(): void {
   //this.getAll();
    this.actualizarPaginados();
    this.createFormProduct();
    this.findByNombre_empresa();
  }

  findByNombre_empresa(){
    const nombre_empresa=this.frmProveedor.get('nombre_empresa')?.value
    console.log(nombre_empresa)
    this.proveedorService.findByNombre_empresa(nombre_empresa).subscribe(
      {
        next: (response) => {
          this.proveedores = response;
          this.pagedItems=this.proveedores.slice(0,this.rows)
        },
        error: (error) => {
          console.error('Error fetching data - proveedores:', error);
        },
      }
    )
  }


  getAll(){
    this.proveedorService.getAll().subscribe(
      {
        next: (response) => {
          this.proveedores = response;
          this.pagedItems=this.proveedores.slice(0,this.rows)
        },
        error: (error) => {
          console.error('Error fetching data - proveedores:', error);
        },

      }
    )
  }

  createFormProduct(){
    this.frmProveedor= this.formBuilder.group(
      {

        nombre_empresa: ['']

      }
    )
  }

}
