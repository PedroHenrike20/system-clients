import { Component } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-chart-doughnut-data',
  templateUrl: './chart-doughnut-data.component.html',
  styleUrls: ['./chart-doughnut-data.component.scss']
})
export class ChartDoughnutDataComponent {
  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 0.85,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            return tooltipItem.raw + ' unidades';
          },
        },
      },
    },
    events: ['mousemove', 'click', 'mouseout'],
    elements: {
      arc: {
        hoverOffset: 2,
      },
    },
  };
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Grupo A', 'Grupo B', 'Grupo C', 'Grupo D'],
    datasets: [
      {
        data: [300, 500, 100, 200],
        backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A8'],
        hoverBackgroundColor: ['#FF6F61', '#61FF6F', '#6173FF', '#FF61B0'],
        hoverBorderColor: ['#FF6F61', '#61FF6F', '#6173FF', '#FF61B0'],
        borderWidth: 3,
      },
    ],
  };

  public centerText: string = 'INFO_INFO';
}
