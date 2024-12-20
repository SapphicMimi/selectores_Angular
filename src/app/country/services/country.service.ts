import { Injectable } from '@angular/core';
import { Country, Region, SmallCountry } from '../interfaces/country.interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private baseURL: string = 'https://restcountries.com/v3.1';

  private _regions: Region[] = [Region.Africa, Region.Americas, Region.Asia, Region.Europe, Region.Oceania];

  constructor(
    private http: HttpClient
  ) { }

  get regions(): Region[] {
    return[...this._regions];
  }

  getCountriesByRegion(region: Region): Observable<SmallCountry[]> {
    if(!region) return of([]);

    const url: string = `${this.baseURL}/region/${region}?fields=cca3,name,borders`

    return this.http.get<SmallCountry[]>(url)
      .pipe(
        tap(response => console.log({response}))
      )
  }
}
