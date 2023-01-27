// À DÉCOMMENTER ET À UTILISER LORSQUE VOTRE COMMUNICATION EST IMPLÉMENTÉE
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of,Observable, Subject } from "rxjs";
import { Planrepas } from "../../../../common/tables/Planrepas";
import { catchError } from "rxjs";
import { Fournisseur } from "../../../../common/tables/Fournisseur";

@Injectable()
export class CommunicationService {
  private readonly BASE_URL: string = "http://localhost:3000/database";
  public constructor(private readonly http: HttpClient) {}

  private _listeners: any = new Subject<any>();

  public listen(): Observable<any> {
    return this._listeners.asObservable();
  }

  public filter(filterBy: string): void {
    this._listeners.next(filterBy);
  }


  // ==== PLANS REPAS ====
  public getPlansrepas():Observable<Planrepas[]>{
    return this.http
      .get<Planrepas[]>(this.BASE_URL + '/planrepas')
      .pipe(catchError(this.handleError<Planrepas[]>("getPlansrepas")));
  }

  public insertPlanrepas(planrepas: Planrepas):Observable<number>{
    return this.http
      .post<number>(this.BASE_URL + "/insert",planrepas)
      .pipe(catchError(this.handleError<number>("insertPlanrepas")));
  }

  // ==== CATEGORIES des PLANS REPAS ====
  public getCategories():Observable<String[]>{
    return this.http
      .get<String[]>(this.BASE_URL + '/categories')
      .pipe(catchError(this.handleError<String[]>("getCategories")));
  }
  
 // ==== FOURNISSEURS ====
  public getFournisseurs():Observable<Fournisseur[]>{
    return this.http
      .get<Fournisseur[]>(this.BASE_URL + '/fournisseur')
      .pipe(catchError(this.handleError<Fournisseur[]>("getFournisseurs")));
  }

  public updatePlanrepas(planrepas: Planrepas):Observable<number>{
    return this.http
      .put<number>(this.BASE_URL + "/update",planrepas)
      .pipe(catchError(this.handleError<number>("updatePlanrepas")));
  }

  public deletePlanrepas(numeroplan: number): Observable<number> {
    return this.http
      .delete<number>(this.BASE_URL + `/delete/${numeroplan}`)
      .pipe(catchError(this.handleError<number>("deletePlanrepas")));
  }

  private handleError<T>(
    request: string,
    result?: T
  ): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      return of(result as T);
    };
  }
}
