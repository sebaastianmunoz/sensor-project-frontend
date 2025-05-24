import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private http = inject(HttpClient);
  private auth = inject(Auth);
  private apiUrl = 'http://localhost:8000/devices'; // ✅ URL de FastAPI

  /** 🔹 Obtiene los dispositivos del usuario autenticado desde FastAPI */
  getUserDevices(): Observable<any[]> {
    return this.getAuthToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<any[]>(this.apiUrl, { headers });
      })
    );
  }

  /** 🔹 Obtiene los datos del sensor de un dispositivo */
  getSensorData(deviceId: string): Observable<any[]> {
    return this.getAuthToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const url = `${this.apiUrl}/${deviceId}/sensor_data`;
        console.log("📡 Solicitando datos de sensores desde:", url);
        return this.http.get<any[]>(url, { headers });
      })
    );
  }

  /** 🔹 Obtiene el token de autenticación del usuario actual */
  private getAuthToken(): Observable<string> {
    return new Observable(observer => {
      onAuthStateChanged(this.auth, async (user: User | null) => {
        if (user) {
          const token = await user.getIdToken();
          observer.next(token);
          observer.complete();
        } else {
          observer.error("❌ Usuario no autenticado");
        }
      });
    });
  }
}
