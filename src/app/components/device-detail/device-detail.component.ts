import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceService } from '../../services/device.service';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables); // 🔥 Registrar los componentes de Chart.js 3+

@Component({
  selector: 'app-device-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.scss']
})
export class DeviceDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private deviceService = inject(DeviceService);

  deviceId: string = '';
  sensorData: any[] = [];
  chart: any; // Referencia al gráfico para evitar duplicados

  async ngOnInit() {
    this.deviceId = this.route.snapshot.paramMap.get('deviceId') || '';

    console.log("📡 deviceId recibido:", this.deviceId);

    if (!this.deviceId) {
      console.error("❌ No se encontró deviceId en la URL.");
      return;
    }

    this.deviceService.getSensorData(this.deviceId).subscribe(
      data => {
        this.sensorData = data;
        console.log("📊 Datos del sensor:", data);
        this.createChart();
      },
      error => {
        console.error("❌ Error obteniendo datos del sensor:", error);
      }
    );
  }

  createChart() {
    if (this.sensorData.length === 0) {
      console.warn("⚠️ No hay datos del sensor para graficar.");
      return;
    }

    const ctx = document.getElementById('sensorChart') as HTMLCanvasElement;
    if (!ctx) {
      console.error("❌ No se encontró el elemento canvas para el gráfico.");
      return;
    }

    // Si ya existe un gráfico, lo destruimos antes de crear uno nuevo
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.sensorData.map(d => new Date(d.timestamp).toLocaleString('es-ES', {
          day: '2-digit', month: '2-digit', year: '2-digit',
          hour: '2-digit', minute: '2-digit', second: '2-digit'
        })), // 🕒 Formato mejorado de fecha
        datasets: [
          { label: '🌡️ Temperatura (°C)', data: this.sensorData.map(d => d.temperature), borderColor: 'red', backgroundColor: 'rgba(255,0,0,0.2)', borderWidth: 2, pointRadius: 4 },
          { label: '💧 Humedad (%)', data: this.sensorData.map(d => d.humidity), borderColor: 'blue', backgroundColor: 'rgba(0,0,255,0.2)', borderWidth: 2, pointRadius: 4 },
          { label: '🟢 CO2 (ppm)', data: this.sensorData.map(d => d.co2_level), borderColor: 'green', backgroundColor: 'rgba(0,255,0,0.2)', borderWidth: 2, pointRadius: 4 },
          { label: '🌬️ Velocidad del Viento (m/s)', data: this.sensorData.map(d => d.wind_speed), borderColor: 'purple', backgroundColor: 'rgba(128,0,128,0.2)', borderWidth: 2, pointRadius: 4 },
          { label: '🌊 Nivel de Agua (%)', data: this.sensorData.map(d => d.water_level), borderColor: 'cyan', backgroundColor: 'rgba(0,255,255,0.2)', borderWidth: 2, pointRadius: 4 },
          { label: '⚗️ pH', data: this.sensorData.map(d => d.ph_value), borderColor: 'orange', backgroundColor: 'rgba(255,165,0,0.2)', borderWidth: 2, pointRadius: 4 },
          { label: '🔌 Conductividad TDS', data: this.sensorData.map(d => d.tds_value), borderColor: 'brown', backgroundColor: 'rgba(165,42,42,0.2)', borderWidth: 2, pointRadius: 4 },
          { label: '💡 Luz (lux)', data: this.sensorData.map(d => d.light_level), borderColor: 'pink', backgroundColor: 'rgba(255,192,203,0.2)', borderWidth: 2, pointRadius: 4 }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: { display: true, text: 'Tiempo (Día Hora:Min:Seg)', font: { size: 14 } },
            ticks: { maxRotation: 45, minRotation: 45 },
          },
          y: {
            title: { display: true, text: 'Valores Sensores', font: { size: 14 } },
            beginAtZero: true
          }
        },
        plugins: {
          legend: { position: 'top', labels: { font: { size: 12 } } }
        }
      }
    });
  }
}