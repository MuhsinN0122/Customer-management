// The NotificationService will handle showing error messages to the user.
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new BehaviorSubject<string | null>(null);
  notification$ = this.notificationSubject.asObservable();

  showNotification(message: string) {
    // this.notificationSubject.next(message);

    // // Clear the notification after 3 seconds (or adjust as needed)
    // setTimeout(() => {
    //   this.clearNotification();
    // }, 3000);
    Swal.fire({
      title: 'Error!',
      text: " Error found ",
      icon: 'error',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Close'
    });
  }

  clearNotification() {
    this.notificationSubject.next(null);
  }
}

