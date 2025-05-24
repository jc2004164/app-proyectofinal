import { ProveedoresService } from './../../../services/proveedores.service';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categoria } from '../../../interfaces/proveedores/categoria';
import { Proveedor } from '../../../interfaces/proveedores/proveedor';
import { CategoriasService } from '../../../services/categorias.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
@Component({
  selector: 'app-proveedor-add',
  imports: [
    CommonModule,
    /*FormsModule,*/
   // JsonPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './proveedor-add.component.html',
  styleUrl: './proveedor-add.component.css'
})
export class ProveedorAddComponent implements OnInit {

  id:number=0;
  categorias:Categoria[]=[];
  proveedor?: Proveedor;
  frmProveedor!:FormGroup;
  errors?:string[];

  categoriaService=inject(CategoriasService);
  proveedoresService=inject(ProveedoresService);

  formBuilder = inject(FormBuilder);

  toastr= inject(ToastrService)
  activatedRoute= inject(ActivatedRoute)

  router=inject(Router)

  ngOnInit(): void {
    this.createFormProduct()
    this.getAll();
    this.activatedRoute.params.subscribe((p)=>{
      console.log(p)
      if(p['id']){
        this.id=p['id']
        console.log(this.id)
        this.findById(this.id);
      }
    }

    )
  }

  onSubmit(){

    console.log('onSumit...')
    //const _nombre=this.frmProveedor.controls['nombre'].value

    if(this.frmProveedor.invalid){
      return;

    }


    const _nombre=this.fp['nombre'].value
    const nombre_empresa=this.fp['nombre_empresa'].value
    const email=this.fp['email'].value
    const telefono=this.fp['telefono'].value
    const direccion=this.fp['direccion'].value
    const categoria=this.fp['categoria'].value
    const tipo_empresa=this.fp['tipo_empresa'].value
    console.log('proveedor...'+_nombre)

    const proveedor:Proveedor={
      nombre:_nombre,
      nombre_empresa:nombre_empresa,
      email:email,
      telefono:telefono,
      direccion:direccion,
      categoria:categoria,
      tipo_empresa:tipo_empresa
    }
    console.log(proveedor)

    if(_nombre===''){
      this.toastr.warning('Por favor ingrese el nombre del proveedor', 'Alerta')
      return;
    }
    if(nombre_empresa===''){
      this.toastr.warning('Por favor ingrese el apellido del proveedor', 'Alerta')
      return;
    }

    if(this.id>0){
      this.update(proveedor);
    }else{
      this.add(proveedor)
    }


}


add(proveedor: Proveedor) {
  this.proveedoresService.getAll().subscribe({
    next: (proveedores) => {
      const existe = proveedores.some(p =>
        p.nombre_empresa.trim().toLowerCase() === proveedor.nombre_empresa.trim().toLowerCase()
      );
      if (existe) {
        console.log(existe)
        this.toastr.warning('Ya existe un proveedor con ese nombre de empresa', 'Alerta');
        return;
      }

      // Si no existe, agregar
      this.proveedoresService.add(proveedor).subscribe({
        next: (response) => {
          this.toastr.success('Proveedor agregado con éxito', 'Aviso');
          this.irALista();
        },
        error: () => {
          this.toastr.error('Error al registrar el proveedor', 'Error');
        }
      });
    },
    error: () => {
      this.toastr.error('Error al validar nombre de empresa', 'Error');
    }
  });
}

/*add(proveedor:Proveedor){
  this.proveedoresService.add(proveedor).subscribe(
      {
        next: (response) => {
          this.proveedor = response;
          console.log(this.proveedor)
          this.toastr.success('!El proveedor fue registrado con exito!','Aviso' );
        },
        error: (error) => {
          this.toastr.error('Error al registrar el proveedor','Error');
          this.irALista();
        }

      }
)}*/

update(proveedor:Proveedor){
  this.proveedoresService.update(this.id,proveedor).subscribe(
      {
        next: (response) => {
          this.proveedor = response;
          console.log(this.proveedor)
          this.toastr.success('!El proveedor fue actualizado con exito!','Aviso' );
          this.irALista();
        },
        error: (error) => {
          this.toastr.error('Error al actualizar el proveedor','Error');
        }

      }
)}

cancelar(){
  this.router.navigate(['home'])
}

irALista(){
  this.router.navigate(['proveedores/lista'])
}

findById(id:number){
    this.proveedoresService.findById(id).subscribe(
      {
        next: (response) => {
        console.log(response);
          //setear valores
          /*this.frmProveedor.controls['nombre'].setValue(response.nombre)
          this.frmProveedor.controls['nombre_empresa'].setValue(response.nombre_empresa)
          this.frmProveedor.controls['email'].setValue(response.email)
          this.frmProveedor.controls['telefono'].setValue(response.telefono)
          this.frmProveedor.controls['direccion'].setValue(response.direccion)
          this.frmProveedor.controls['tipo_empresa'].setValue(response.tipo_empresa)
          this.frmProveedor.controls['categoria'].setValue(response.categoria)
          */
          this.frmProveedor.patchValue(response);
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        },
      }
    )
}



  getAll(){
    this.categoriaService.getAll().subscribe(
      {
        next: (response) => {
        this.categorias = response;
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        },
        complete: ()=> {
          console.log('Data fetching completed');
        }
      }
    )
  }

  createFormProduct(){
    this.frmProveedor= this.formBuilder.group(
      {
        nombre: ['',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]
        ],
        nombre_empresa: ['',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(120),
          ]],
        email: ['',
          [
            Validators.required,
            Validators.email
          ]],
        telefono: ['',
          [
            Validators.required,
            Validators.minLength(12),
            Validators.maxLength(20),
            Validators.pattern(/^\+\d{11,19}$/)
          ]],
        direccion: ['',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(120),
          ]],
        categoria:['',
          [
            Validators.required,
          ]],
        tipo_empresa: ['',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(120),
          ]]
      }
    )
  }

  // Alias del formulario
  get fp(): { [key: string]: AbstractControl } {
    return this.frmProveedor.controls;
  }

}
