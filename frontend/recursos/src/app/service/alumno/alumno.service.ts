import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CPanel } from 'src/app/components/admin/CPanel';


@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  [x: string]: any;

  /* URL listado de  todos los empleados en el backend */
  baseUrl = 'http://localhost:8081/datos-personales';


  constructor(private httpClient: HttpClient) { }


// Paginacion
  obtenerAlumnosPaginados(page: number, size: number): Observable<CPanel[]> {
    // Construir parámetros de la consulta para la paginación
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    // Realizar la solicitud GET con los parámetros de paginación
    return this.httpClient.get<CPanel[]>(`${this.baseUrl}/paginados`, { params });
  }

  /* Obtencion de los alumnos  */
  obtenerAlumnos():Observable<CPanel[]> {
    return this.httpClient.get<CPanel[]>(`${this.baseUrl}`);
  }

  /* Creacion de un nuevo usuario (alumno) */
  createAlumno(aspirante:CPanel):Observable<CPanel>{
    return this.httpClient.post<CPanel>(`${this.baseUrl}`, aspirante);
  }

  /* Obtencion de un solo alumno */
  getById(id: number):Observable<CPanel>{
    return this.httpClient.get<CPanel>(`${this.baseUrl}/${id}`);
  }

  /* Actualizar */
  editarAlumno (id: number, aspirante: CPanel): Observable<Object>{
    return this.httpClient.put<CPanel>(`${this.baseUrl}/${id}`, aspirante);
  }

  /* Cambiar de estado a false */
  deleted(alumno: CPanel):Observable<CPanel>{
    return this.httpClient.delete<CPanel>(`${this.baseUrl}/${alumno.id}`);
  }

  /* Cambiar de estado a true */
  deletedTrue(alumno: CPanel):Observable<CPanel>{
    return this.httpClient.delete<CPanel>(`${this.baseUrl}/recuperacion/${alumno.id}`);
  }

  eliminarAlumno(alumno: CPanel):Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl}/eliminar/${alumno.id}`);
  }

  generarPDF(): Observable<Blob> {

    return this.httpClient.get(`${this.baseUrl}/exportarPDF`, { responseType: 'blob' });
  }

  generarExcel(): Observable<Blob> {
    return this.httpClient.get(`${this.baseUrl}/exportarExcel`, { responseType: 'blob' });
  }
}
