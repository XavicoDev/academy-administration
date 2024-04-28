import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ROOT } from '../general/api-config';
import { ResponseList, ResponseRegister } from '../general/data.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = `${API_ROOT}/students`; 

  constructor(private http: HttpClient) { }
  
  getUsers(): Observable<ResponseList> {
    return this.http.get<ResponseList>(this.apiUrl);
  }
  
  getCoursesOfStudent(userId: number): Observable<ResponseList> {
    const url = `${this.apiUrl}/${userId}/courses`;
    return this.http.get<ResponseList>(url);
  }

  createUser(user: any): Observable<ResponseRegister> {
    return this.http.post<ResponseRegister>(this.apiUrl, user);
  }
  
  getUserById(userId: number): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<any>(url);
  }
  
  updateUser(userId: number, userData: any): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.put<any>(url, userData);
  }
  
  deleteUser(userId: number): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.delete<any>(url);
  }
  
  enrollStudentInCourse(courseId: number,studentId: number): Observable<any> {
    const url = `${this.apiUrl}/courses/enroll`;
    return this.http.post<any>(url,{studentId:studentId, courseId: courseId});
  }
  
  unenrollStudentInCourse(courseId: number,studentId: number): Observable<any> {
    const url = `${this.apiUrl}/${studentId}/courses/${courseId}`;
    return this.http.delete<any>(url);
  }

}
