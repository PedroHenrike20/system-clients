import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ClientDTO, ReqClientListDTO, ResClientDTO } from '../../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getClients(req: ReqClientListDTO): Observable<ResClientDTO> {
    return this.http.get<ResClientDTO>(`${this.apiUrl}?page=${req.page}&limit=${req.limit}`, { headers: { 'Cache-Control': 'no-cache' }}).pipe(
      catchError((error) => {
        let errorMessage = 'Erro desconhecido ao buscar os clientes!';
        
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        } else if (error.statusCode === 0) {
          errorMessage = 'Erro de conexão com o servidor!';
        } else if (error.statusCode === 404) {
          errorMessage = 'Nenhum cliente encontrado!';
        } else if (error.statusCode === 500) {
          errorMessage = 'Erro interno do servidor!';
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  deleteClient(id: number): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/${id}`, ).pipe(
      catchError((error) => {
        if (error.status === 200) {
          return of({ status: 200, message: 'O registro foi excluído, mas houve um problema ao processar a resposta.', data: [] });
        }
        let errorMessage = 'Erro desconhecido!';
        
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        } else if (error.status === 0) {
          errorMessage = 'Erro de conexão com o servidor!';
        } else if (error.status === 404) {
          errorMessage = 'Cliente não encontrado!';
        } else if (error.status === 500) {
          errorMessage = 'Erro interno do servidor!';
        }

        return throwError(() => new Error(errorMessage));
      })
    )
  }

  updateClient(client: Partial<ClientDTO>): Observable<string> {
    return this.http.patch<string>(`${this.apiUrl}/${client.id}`, client).pipe(
      catchError((error) => {
        let errorMessage = 'Erro desconhecido ao atualizar o cliente!';
        
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        } else if (error.statusCode === 0) {
          errorMessage = 'Erro de conexão com o servidor!';
        } else if (error.statusCode === 404) {
          errorMessage = 'Cliente não encontrado!';
        } else if (error.statusCode === 500) {
          errorMessage = 'Erro interno do servidor!';
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }
  
  createClient(client: Partial<ClientDTO>): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}`, client).pipe(
      catchError((error) => {
        let errorMessage = 'Erro desconhecido ao criar um cliente!';
        
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        } else if (error.statusCode === 0) {
          errorMessage = 'Erro de conexão com o servidor!';
        } else if (error.statusCode === 500) {
          errorMessage = 'Erro interno do servidor!';
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }

}
