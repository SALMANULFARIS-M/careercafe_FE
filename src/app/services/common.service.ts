import { Injectable } from '@angular/core';
import { State, STATES } from '../constants/states'; // Import states data
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { Observable} from 'rxjs';

interface Country {
  name: string;
  dialCode: string;
}

@Injectable({
  providedIn: 'root',
})

export class CommonService {
  private statesAndDistricts: State[] = STATES; // Use imported data
  private apiUrl = 'https://restcountries.com/v3.1/all'; // API URL
  private backendUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  getCountries(): Observable<Country[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data =>
        data.map(country => ({
          name: country.cca2,
          dialCode: country.idd?.root + (country.idd?.suffixes?.[0] || '')
        })).filter(c => c.dialCode) // Remove countries without a dial code
      )
    );
  }

  // Get all states
  getStates(): State[] {
    return this.statesAndDistricts
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/api/patnerRegister`, userData);
  }
  registerappoinment(userData: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/api/appointment`, userData);
  }
  contact(userData: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/api/contact`, userData);
  }
}





