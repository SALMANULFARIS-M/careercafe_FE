import { Inject, Injectable, makeStateKey, PLATFORM_ID, TransferState } from '@angular/core';
import { State, STATES } from '../../shared/constants/states'; // Import states data
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
const backendUrl = environment.apiUrl;
const COUNTRIES_KEY = makeStateKey<Country[]>('countries');
interface Country {
  name: string;      // Common name (e.g., "Togo")
  code?: string;     // Optional: ISO 2-letter code (e.g., "TG")
  dialCode: string;  // Full dial code (e.g., "+228")
}

@Injectable({
  providedIn: 'root',
})

export class CommonService {
  private statesAndDistricts: State[] = STATES; // Use imported data
  private apiUrl = 'https://restcountries.com/v3.1/all?fields=name,idd'; // API URL


  constructor(private http: HttpClient,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: object
  ) { }

  getCountries(): Observable<Country[]> {
    if (this.transferState.hasKey(COUNTRIES_KEY)) {
      return of(this.transferState.get(COUNTRIES_KEY, []));
    }

    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data =>
        data
          .map(country => ({
            name: country.name.common,
          code: country.name.common.slice(0, 2).toUpperCase(),
            dialCode: country.idd?.root + (country.idd?.suffixes?.[0] || '')
          }))
          .filter(c => c.dialCode && c.dialCode !== '+')
      ),
      tap(countries => this.transferState.set(COUNTRIES_KEY, countries)), // Cache for SSR
      catchError(() => of([]))
    );
  }

  // Get all states
  getStates(): State[] {
    return this.statesAndDistricts
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${backendUrl}/patnerRegister`, userData);
  }
  registerappoinment(userData: any): Observable<any> {
    return this.http.post(`${backendUrl}/appointment`, userData);
  }
  contact(userData: any): Observable<any> {
    return this.http.post(`${backendUrl}/contact`, userData);
  }
}





