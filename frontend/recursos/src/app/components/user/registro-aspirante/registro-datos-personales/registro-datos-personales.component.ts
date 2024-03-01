import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosEscolares } from 'src/app/datos_escolares/escolares';
import { modalidadEscolar } from 'src/app/datos_escolares/ModalidadEscolar';
import { Periodo } from 'src/app/datos_escolares/Periodo';
import { planEducativo } from 'src/app/datos_escolares/planEducativo';
import { Universidad } from 'src/app/datos_escolares/universidad';
import { EscolaresService } from 'src/app/service/escolar/escolares.service';
import { ModalidadService } from 'src/app/service/escolar/modalidad.service';
import { PeriodoService } from 'src/app/service/escolar/periodo.service';
import { PlanEducativoService } from 'src/app/service/escolar/plan-educativo.service';
import { UniversidadService } from 'src/app/service/escolar/universidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-datos-personales',
  templateUrl: './registro-datos-personales.component.html'
})
export class RegistroDatosPersonalesComponent {
  escolares = new DatosEscolares();
  escolar : DatosEscolares[];
  modalidad: modalidadEscolar[];
  modalidades: modalidadEscolar = new modalidadEscolar();
  planEducativo: planEducativo[];
  planes: planEducativo = new planEducativo();
  universidad: Universidad[];
  universidades: Universidad = new Universidad();
  periodo: Periodo[];
  periodos: Periodo = new Periodo();

  /* Constructor */
  constructor(private ecolarService: EscolaresService, private route: Router, private activateRouter: ActivatedRoute, private univerSe: UniversidadService, private modEscService: ModalidadService, private planService: PlanEducativoService, private periodoService: PeriodoService) { }

  getAll():void{
    this.ecolarService.obtenerEscolar().subscribe(
      e=> this.escolar = e
    )
  }

  /* obtener Perfilamiento */
  getPlanEducativo(): void{
    this.planService.getPlanEducativo().subscribe(planEduca =>
      this.planEducativo = planEduca);
  }

  getModalidadEscolar(): void{
    this.modEscService.getModalidad().subscribe(mod =>
      this.modalidad = mod);
  }

  getUniversidad(): void{
    this.univerSe.getUniversidad().subscribe(university =>
      this.universidad = university)
  }

  getPeriodo(): void{
    this.periodoService.getPeriodo().subscribe(periodo =>
      this.periodo = periodo)
  }


  ngOnInit(): void {
    this.cargar();
    this.getPlanEducativo();
    this.getModalidadEscolar();
    this.getUniversidad();
    this.getPeriodo();
  }

  /* Cargar los datos escolares */
  cargar(){
    this.activateRouter.params.subscribe(e => {
      let id = e['id'];
      if(id){
        this.ecolarService.getById(id).subscribe(data => this.escolares=data);
      }
    });
  }

  regresarAspirante() {
    this.route.navigate(['/crear']);
  }

  /* GGuardar los datos escolares */
  create():void{
    console.log(this.escolares);
    this.ecolarService.createEscolar(this.escolares).subscribe(
      res=> {
        this.route.navigate(['/registro-datos-ingreso'])
        Swal.fire('Nuevo Dato Escolar', 'success');
      }
    );
  }

  update():void{
    this.ecolarService.editarEscolar(this.escolares.id, this.escolares).subscribe(
      e=> this.route.navigate(['/datos-escolares'])
    );
  }

  compararModalidad(modalida1: modalidadEscolar, modalidad2: modalidadEscolar): boolean{
    if(modalida1 === undefined && modalidad2 === undefined){
      return true;
    }
    return modalida1 === null || modalidad2 === null || modalida1 === undefined || modalidad2 === undefined ? false : modalida1.id === modalidad2.id;
  }

  compararPlanEducativo(plan1: planEducativo, plan2: modalidadEscolar): boolean{
    if(plan1 === undefined && plan2 === undefined){
      return true;
    }
    return plan1 === null || plan2 === null || plan1 === undefined || plan2 === undefined ? false : plan1.id === plan2.id;
  }

  compararUniversidad(uni1: Universidad, uni2: Universidad): boolean{
    if(uni1 === undefined && uni2 === undefined){
      return true;
    }
    return uni1 === null || uni2 === null || uni1 === undefined || uni2 === undefined ? false : uni1.id === uni2.id;
  }

  compararPeriodo(per1: Periodo, per2: Periodo): boolean{
    if(per1 === undefined && per2 === undefined){
      return true;
    }
    return per1 === null || per2 === null || per1 === undefined || per2 === undefined ? false : per1.id === per2.id;
  }
}
