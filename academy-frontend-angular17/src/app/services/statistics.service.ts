import { Injectable } from '@angular/core';
import { API_ROOT } from '../general/api-config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private apiUrl = `${API_ROOT}/statistics`; 

  constructor(private http: HttpClient) { }

  getTopCourses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/top-courses`);
  }

  getTopStudents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/top-students`);
  }

  getTotalCourses(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/total-courses`);
  }

  getTotalStudents(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/total-students`);
  }
}
