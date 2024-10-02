// The NotificationService will handle showing error messages to the user.
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new BehaviorSubject<string | null>(null);
  notification$ = this.notificationSubject.asObservable();

  showNotification(message: string) {
    this.notificationSubject.next(message);

    // Clear the notification after 3 seconds (or adjust as needed)
    setTimeout(() => {
      this.clearNotification();
    }, 3000);
  }

  clearNotification() {
    this.notificationSubject.next(null);
  }
}

