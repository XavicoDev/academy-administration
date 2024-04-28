import { Injectable } from '@angular/core';
import { API_ROOT } from '../general/api-config';
import { ResponseList, ResponseRegister, ResponseStudentsOfCourse } from '../general/data.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = `${API_ROOT}/courses`; 

  constructor(private http: HttpClient) { }
  
  getCourses(): Observable<ResponseList> {
    return this.http.get<ResponseList>(this.apiUrl);
  }

  createCourse(course: any): Observable<ResponseRegister> {
    return this.http.post<ResponseRegister>(this.apiUrl, course);
  }
  
  updateCourse(courseId: number, courseData: any): Observable<any> {
    const url = `${this.apiUrl}/${courseId}`;
    return this.http.put<any>(url, courseData);
  }
  
  deleteCourse(courseId: number): Observable<any> {
    const url = `${this.apiUrl}/${courseId}`;
    return this.http.delete<any>(url);
  }
  
  getStudentsOfCourse(courseId: number): Observable<ResponseStudentsOfCourse> {
    const url = `${this.apiUrl}/${courseId}/students`;
    return this.http.get<ResponseStudentsOfCourse>(url);
  }

}
