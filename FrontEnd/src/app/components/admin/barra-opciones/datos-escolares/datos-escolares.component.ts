import { jsPDF } from 'jspdf';
import { Component, ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosEscolares } from 'src/app/datos_escolares/escolares';
import { Universidad } from 'src/app/datos_escolares/universidad';
import { EscolaresService } from 'src/app/service/escolar/escolares.service';
import Swal from 'sweetalert2';
import { CPanel } from '../../CPanel';


@Component({
  selector: 'app-datos-escolares',
  templateUrl: './datos-escolares.component.html'
})
export class DatosEscolaresComponent {
  /* Atributos */
  escolares: DatosEscolares[] = [];
  escolar = new DatosEscolares();
  universidad: Universidad[] = [];

  searchTerm: string = '';

  @ViewChild('content') content!: ElementRef;

  students = [
    {
      id: 2,
      correoEscolar: "juan1234@outlook.com",
      carrera: "Tecnologias de la Informacion",
      universidad: "UNAM",
      matriculaEscolar: "j201223434i",
      modalidadEscolar: "A Distancia",
      planEducativo: "Ciberseguridad",
      periodo: "[object Object]"
    },
    {
      id: 3,
      correoEscolar: "pedro@unam.com",
      carrera: "Ciberseguridad",
      universidad: "Tecnologico de Monterrey",
      matriculaEscolar: "5637383829",
      modalidadEscolar: "Home Office",
      planEducativo: "Ciberseguridad",
      periodo: "[object Object]"
    },
    {
      id: 4,
      correoEscolar: "jolsi@tecnm.mx",
      carrera: "Ciencia de Datos",
      universidad: "Tecnologico de Monterrey",
      matriculaEscolar: "jos3434232",
      modalidadEscolar: "Individual",
      planEducativo: "Ciencia de Datos",
      periodo: "[object Object]"
    },
    {
      id: 5,
      correoEscolar: "jorgevargas@live.com",
      carrera: "Tics",
      universidad: "UNAM",
      matriculaEscolar: "42544252",
      modalidadEscolar: "Presencial",
      planEducativo: "Ciberseguridad",
      periodo: "[object Object]"
    },
    {
      id: 6,
      correoEscolar: "Yesi@gmail.com",
      carrera: "Linux",
      universidad: "Harvard",
      matriculaEscolar: "yes123456",
      modalidadEscolar: "Hibrida",
      planEducativo: "Ciberseguridad",
      periodo: "[object Object]"
    },
    {
      id: 7,
      correoEscolar: "Miguel@gmail.com",
      carrera: "Desarrollo Web",
      universidad: "La Salle",
      matriculaEscolar: "254353ff3",
      modalidadEscolar: "Presencial",
      planEducativo: "Aplicaciones Moviles",
      periodo: "[object Object]"
    },
    {
      id: 8,
      correoEscolar: "Ericka@gmail.com",
      carrera: "Desarollo de Software",
      universidad: "Tecnologico Nacional de Mexico",
      matriculaEscolar: "ericka352342",
      modalidadEscolar: "Hibrida",
      planEducativo: "Aplicaciones Moviles",
      periodo: "[object Object]"
    },
    {
      id: 9,
      correoEscolar: "Prisi@gmail.com",
      carrera: "Red Hat",
      universidad: "Harvard",
      matriculaEscolar: "4215454tr",
      modalidadEscolar: "Individual",
      planEducativo: "Ciberseguridad",
      periodo: "[object Object]"
    },
    {
      id: 10,
      correoEscolar: "vivi@gmail.com",
      carrera: "Informatica",
      universidad: "UNAM",
      matriculaEscolar: "vivi123454",
      modalidadEscolar: "A Distancia",
      planEducativo: "Desarrollo de Software",
      periodo: "[object Object]"
    },
    {
      id: 11,
      correoEscolar: "carina@gmail.com",
      carrera: "Software Enginner",
      universidad: "UNAM",
      matriculaEscolar: "vivi15454",
      modalidadEscolar: "A Distancia",
      planEducativo: "Ciberseguridad",
      periodo: "[object Object]"
    },
    {
      id: 12,
      correoEscolar: "Mariana@gmail.com",
      carrera: "Software Enginner",
      universidad: "Harvard",
      matriculaEscolar: "mari83432",
      modalidadEscolar: "Home Office",
      planEducativo: "Aplicaciones Moviles",
      periodo: "[object Object]"
    },
    {
      id: 13,
      correoEscolar: "anamaria@gmail.com",
      carrera: "Full Stack",
      universidad: "Tecnologico de Monterrey",
      matriculaEscolar: "Ana23456",
      modalidadEscolar: "Home Office",
      planEducativo: "Desarrollo de Software",
      periodo: "[object Object]"
    },
    {
      id: 14,
      correoEscolar: "Maria@gmail.com",
      carrera: "Tics",
      universidad: "Tecnologico Nacional de Mexico",
      matriculaEscolar: "mari35565",
      modalidadEscolar: "Individual",
      planEducativo: "Ciberseguridad",
      periodo: "[object Object]"
    },
    {
      id: 15,
      correoEscolar: "Laura@gmail.com",
      carrera: "Marketing Digital",
      universidad: "UNAM",
      matriculaEscolar: "laura13434",
      modalidadEscolar: "Presencial",
      planEducativo: "Ciencia de Datos",
      periodo: "[object Object]"
    },
    {
      id: 16,
      correoEscolar: "ale@gmail.com",
      carrera: "Ciencia de Datos",
      universidad: "La Salle",
      matriculaEscolar: "ale28347",
      modalidadEscolar: "Home Office",
      planEducativo: "Aplicaciones Moviles",
      periodo: "[object Object]"
    },
    {
      id: 17,
      correoEscolar: "Luis@gmail.com",
      carrera: "Tecnologias de La Informacion",
      universidad: "Harvard",
      matriculaEscolar: "l20120059",
      modalidadEscolar: "Individual",
      planEducativo: "Desarrollo de Software",
      periodo: "[object Object]"
    },
    {
      id: 18,
      correoEscolar: "jose@gmail.com",
      carrera: "Informatica",
      universidad: "Tecnologico de Monterrey",
      matriculaEscolar: "jose14325",
      modalidadEscolar: "A Distancia",
      planEducativo: "Aplicaciones Moviles",
      periodo: "[object Object]"
    },
    {
      id: 19,
      correoEscolar: "gabi@gmail.com",
      carrera: "Sistemas",
      universidad: "UNAM",
      matriculaEscolar: "gabi52353",
      modalidadEscolar: "Presencial",
      planEducativo: "Ciberseguridad",
      periodo: "[object Object]"
    },
    {
      id: 20,
      correoEscolar: "magali@gmail.com",
      carrera: "Desarrollo De Software",
      universidad: "La Salle",
      matriculaEscolar: "ma1234523",
      modalidadEscolar: "Home Office",
      planEducativo: "Aplicaciones Moviles",
      periodo: "[object Object]"
    },
    {
      id: 1,
      correoEscolar: "l201200040@tlalpan.tecnm.mx",
      carrera: "Desarrollo de Software",
      universidad: "Tecnologico Nacional de Mexico",
      matriculaEscolar: "201200040",
      modalidadEscolar: "Presencial",
      planEducativo: "Desarrollo de Software",
      periodo: "[object Object]"
    }
  ];





  constructor(private serviceEstudiante:EscolaresService, private  activateRouter: ActivatedRoute, private route: Router) { }


  generarReportePDF(): void {
    // Crea un nuevo documento PDF
    const doc = new jsPDF();

    // Agrega contenido al PDF
    doc.text('Reporte de Datos Escolares', 10, 10);
    doc.text('----------------------------------------', 10, 20);

    // Itera sobre los datos y agrega cada fila al PDF
    this.escolares.forEach((escolar, index) => {
      const y = 30 + (index * 10); // Incrementa la posición Y para cada fila
      doc.text(`ID: ${escolar.id}`, 10, y);
      doc.text(`Correo: ${escolar.correoEscolar}`, 40, y);
      doc.text(`Carrera: ${escolar.carrera}`, 80, y);
      doc.text(`Modalidad Escolar: ${escolar.modalidadEscolar.nombre}`, 120, y);
    });

    // Guarda el documento como un archivo PDF
    doc.save('reporte_datos_escolares.pdf');
  }



  ngOnInit(): void {
    this.getEscolar();
    this.cargar();
  }


  /* Mostrar los datos Escolares */
  getEscolar(){
    this.serviceEstudiante.obtenerEscolar().subscribe(data => {
      this.escolares = data;
    });
  }

  /* Modificacion de estos datos personales */
  cargar(){
    this.activateRouter.params.subscribe(e => {
      let id = e['id'];
      if(id){
        this.serviceEstudiante.getById(id).subscribe(data => this.escolar=data);
      }
    });
  }

  /* Actializacion */
  update():void{
    this.serviceEstudiante.editarEscolar(this.escolar.id, this.escolar).subscribe(
      e=> this.route.navigate(['/registro-datos-personales'])
    );
  }

  /* Eliminacion de los datos escolares */
  delete(escolar: DatosEscolares): void{
    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que deseas desactivar al alumno con el id: ${escolar.id} y la carrera de: ${escolar.carrera}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, desactivar',
      cancelButtonText: 'No, cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if(result.value){
        escolar.activo = true;
        this.serviceEstudiante.deleted(escolar).subscribe(
          res => {
            this.escolares = this.escolares.filter(b => b !== escolar)
            Swal.fire('Alumno Activado', `Carrea ${escolar.carrera} desactivado con éxito`, 'success');
          }
        )
      }
    })
  }

  obtenerEscolares(): void{
    this.getEscolar();
    this.route.navigate(['/detalle-escolares']);
  }
}
