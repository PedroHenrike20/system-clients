import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  ClientDTO,
  ReqClientListDTO,
  ResClientDTO,
} from '../../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getClients(req: ReqClientListDTO): Observable<ResClientDTO> {
    return this.http
      .get<ResClientDTO>(`${this.apiUrl}?page=${req.page}&limit=${req.limit}`, {
        headers: { 'Cache-Control': 'no-cache' },
      })
      .pipe(
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

  getAllClients(): Observable<ClientDTO[]> {
    let page = 1;
    let limit = 50;
    let allClients: ClientDTO[] = [];

    return new Observable((observer) => {
      const getPage = (page: number) => {
        const params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());

        this.http.get<ResClientDTO>(`${this.apiUrl}`, { params }).pipe(
          map((res) => {
            allClients = [...allClients, ...res.clients];

            if (page < res.totalPages) {
              getPage(page + 1);
            } else {
              observer.next(allClients);
              observer.complete();
            }
          }),
          
        ).subscribe()
      };
      getPage(page);
    });
  }

  calculateCustomersPerMonth(clients: ClientDTO[], month: string): number {
    return clients.filter((client) => {
      const clientMonth = new Date(client.createdAt).toISOString().slice(0, 7);
      return clientMonth === month;
    }).length;
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        if (error.status === 200) {
          return of({
            status: 200,
            message:
              'O registro foi excluído, mas houve um problema ao processar a resposta.',
            data: [],
          });
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
    );
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
