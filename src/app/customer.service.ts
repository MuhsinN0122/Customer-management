import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient, private notificationService: NotificationService) { }

  // Centralized error handler
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server Error: ${error.status}\nMessage: ${error.message}`;
    }
    this.notificationService.showNotification(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  // Fetch customers with error handling
  listCustomers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Users`).pipe(
      catchError(this.handleError.bind(this)) // Bind the function for proper `this` context
    );
  }
  //delete customer
  deleteCustomer(id:any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Users/${id}`).pipe(
      catchError(this.handleError.bind(this)) // Bind the function for proper `this` context
    );
  }
  //Add customer
  addCustomer(data:any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/Users`,data).pipe(
      catchError(this.handleError.bind(this)) // Bind the function for proper `this` context
    );
  }
  //Customer details
  customerDetails(id:any): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/Users/${id}`).pipe(
      catchError(this.handleError.bind(this)) // Bind the function for proper `this` context
    );
  }

}
