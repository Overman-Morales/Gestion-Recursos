import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'pdf-lib';
import { AuthService } from 'src/app/auth/auth.service';
import { Usuario } from 'src/app/auth/Usuario';
import { CPanel } from 'src/app/components/admin/CPanel';
import { Universidad } from 'src/app/datos_escolares/universidad';
import { Beca } from 'src/app/FTD/Beca';
import { Curso } from 'src/app/FTD/Curso';
import { DatosFTD } from 'src/app/FTD/ftd';
import { Grupo } from 'src/app/FTD/Grupo';
import { Tutor } from 'src/app/FTD/Tutor';
import { UniversidadService } from 'src/app/service/escolar/universidad.service';
import { FtdService } from 'src/app/service/ftd/ftd.service';
import { MatriculaService } from 'src/app/service/matricula/matricula.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-datos-ftd',
  templateUrl: './registro-datos-ftd.component.html'
})
export class RegistroDatosFtdComponent{

  /* Atributos de los datos FTD */
  datosFTD: DatosFTD = new DatosFTD();
  Ftd: DatosFTD[];
  beca: Beca[] = [];
  tutor: Tutor[] = [];
  grupo: Grupo = new Grupo();
  curso: Curso[] = [];
  group: Grupo[] = [];
  universidad: Universidad = new Universidad();
  datosAspirante = new CPanel() ;

  /* registro de un nuevo aspirante */
  user: Usuario[] = [];
  usuario: Usuario = new Usuario();

  /* Constructor */
  constructor(private datosFTDService: FtdService, private router: Router, private activateRouter: ActivatedRoute, private matriculaService: MatriculaService, private authService: AuthService) { }

  registro(){
    this.authService.registrarUsuario(this.usuario.username, this.usuario.password).subscribe(
      response => console.log(response),
      error => console.log(error)
    );
  }

  /* Obtener Beca */
  obtenerBeca(): void{
    this.datosFTDService.obtenerBecas().subscribe(beca => {
      this.beca = beca
    });
  }

  /* Obtener Tutor */
  obtenerTutor(): void{
    this.datosFTDService.obtenerTutor().subscribe(tutor => this.tutor = tutor);
  }

  /* Obtener Grupo */
  obtenerGrupo(): void{
    this.datosFTDService.obtenerGrupo().subscribe(grupo => this.group = grupo);
  }

  /* Obtener Curso */
  obtenerCurso(): void{
    this.datosFTDService.obtenerCurso().subscribe(curso => this.curso = curso);
  }

  ngOnInit(): void {
    this.obtenerBeca();
    this.obtenerTutor();
    this.obtenerGrupo();
    this.obtenerCurso();
    this.cargar();
  }

  /* Metodo que se ejecuta al iniciar el componente */
  cargar(){
    this.activateRouter.params.subscribe(e => {
      let id = e['id'];
      if(id){
        this.datosFTDService.getById(id).subscribe(data => this.datosFTD=data);
      }
    });
  }

  create():void{
    console.log(this.datosFTD);
    this.datosFTDService.createDatosFTD(this.datosFTD).subscribe(
      res=> {this.router.navigate(['/datos_ftd'])
      Swal.fire('Nuevos datos ftd', `Datos FTD de:  ${this.datosFTD.nombreProyecto} creado con Exito!`, 'success')
    },
    err => {
      console.error('Código de error desde el backend: ' + err.status);
    });
  }

  crear(): void {
    // Validar que la fecha de término sea posterior a la fecha de inicio
    if (this.datosFTD.fechaIngreso >= this.datosFTD.fechaTermino) {
      // Mostrar mensaje de error
      this.fechaInvalida = true;
      return; // Detener la ejecución del método si la validación falla
    }
    this.fechaInvalida = false;

    // Continuar con la lógica de creación si la validación pasa
    // Solo guardar si no hay errores de validación
    if (!this.fechaInvalida) {
      this.datosFTDService.createDatosFTD(this.datosFTD).subscribe(
        ftd => {
          this.router.navigate(['/datos-ftd'])
          Swal.fire('Nuevo Dato de Ingreso', `Datos Ftd: ${this.datosFTD.nombreProyecto} ha sido Creado!!!`, 'success');
        },
        err => {
          console.error('Código del error desde el backend: ' + err.status);
        }
      );
    }
  }


  // crear(): void{
  //   console.log(this.datosFTD);
  //   this.datosFTDService.createDatosFTD(this.datosFTD).subscribe(ftd => {
  //     this.router.navigate(['/datos-ftd'])
  //     Swal.fire('Nuevo Dato de Ingreso', `Datos Ftd del proyecto: ${this.datosFTD.nombreProyecto} creado con exito!!!`, 'success');
  //   },
  //   err => {
  //     console.error('Código del error desde el backend: ' + err.status);
  //   });
  // }








  fechaInvalida: boolean = false;

  update(): void {
    // Validar que la fecha de término sea posterior a la fecha de inicio
    if (this.datosFTD.fechaIngreso >= this.datosFTD.fechaTermino) {
      // Mostrar mensaje de error
      this.fechaInvalida = true;
      return; // Detener la ejecución del método si la validación falla
    }
    this.fechaInvalida = false;

    // Continuar con la lógica de actualización si la validación pasa
    this.guardarDatosFTD();
  }

  guardarDatosFTD(): void {
    // Solo guardar si no hay errores de validación
    if (!this.fechaInvalida) {
      this.datosFTDService.editarDatosFTD(this.datosFTD).subscribe(
        e => {
          this.router.navigate(['/datos-ftd']);
          Swal.fire('Datos FTD actualizados', `Datos ${this.datosFTD.nombreProyecto} actualizados!`, 'success');
        }
      );
    }
  }

    // this.datosFTDService.editarDatosFTD(this.datosFTD).subscribe(
    //   e => {
    //     this.router.navigate(['/datos-ftd']);
    //     Swal.fire('Datos FTD actualizados', `Datos ${this.datosFTD.nombreProyecto} actualizado con éxito!`, 'success');
    //   }
    // );


  // update():void{
  //   this.datosFTDService.editarDatosFTD(this.datosFTD).subscribe(
  //     e=> {
  //       this.router.navigate(['/datos-ftd'])
  //       Swal.fire('Datos FTD actualizados', `Datos ${this.datosFTD.nombreProyecto} actualizado con exito!`, 'success')
  //     }
  //   );
  // }

  compararTutorial(o1: Tutor, o2: Tutor): boolean{
    return o1 === null || o2 === null ? false: o1.id === o2.id;
  }
  compararBeca(o1: Beca, o2: Beca): boolean{
    return o1 === null || o2 === null ? false: o1.id === o2.id;
  }

  compararGrupo(o1: Grupo, o2: Grupo): boolean{
    return o1 === null || o2 === null ? false: o1.id === o2.id;
  }

  compararCurso(o1: Curso, o2: Curso): boolean{
    return o1 === null || o2 === null ? false: o1.id === o2.id;
  }


  /* Generacion automatica de la matricula ftd */

  generarMatricula(){
    const year = new Date().getFullYear();
    const day = new Date().getDate();
    const numAle= Math.round(Math.random()*1000);
    this.datosFTD.matriculaFTD = `INFO-${day}-${year}-${numAle}`;
  }

}
