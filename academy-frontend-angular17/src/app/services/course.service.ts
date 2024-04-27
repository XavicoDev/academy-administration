import { Injectable } from '@angular/core';
import { API_ROOT } from '../general/api-config';
import { ResponseList, ResponseRegister } from '../general/data.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = `${API_ROOT}/courses/`; 

  constructor(private http: HttpClient) { }
  
  getCourses(): Observable<ResponseList> {
    return this.http.get<ResponseList>(this.apiUrl);
  }

  createCourse(user: any): Observable<ResponseRegister> {
    return this.http.post<ResponseRegister>(this.apiUrl, user);
  }

}
