import { Component, inject, OnInit } from '@angular/core';
import { DeviceService } from '../../services/device.service';
import { Auth } from '@angular/fire/auth';
import { RouterModule } from '@angular/router'; // ✅ Importar RouterModule
import { CommonModule } from '@angular/common'; // ✅ Importar CommonModule
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule,CommonModule, MaterialModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private deviceService = inject(DeviceService);
  private auth = inject(Auth);
  devices: any[] = [];
  userId: string = '';

  async ngOnInit() {
    const user = this.auth.currentUser;
    if (user) {
      this.userId = user.uid; // ✅ Obtener el userId autenticado
      this.deviceService.getUserDevices().subscribe(
        devices => {
          if (Array.isArray(devices) && typeof devices[0] === 'string') {
            this.devices = devices.map(id => ({ deviceId: id, name: id })); // ✅ Convertimos el array de strings en objetos
          } else {
            this.devices = devices; // ✅ Si ya son objetos, los dejamos igual
          }
          console.log("📡 Dispositivos recibidos:", this.devices);
        },
        error => console.error("❌ Error obteniendo dispositivos:", error)
      );
    } else {
      console.error("❌ Usuario no autenticado");
    }
  }
}
