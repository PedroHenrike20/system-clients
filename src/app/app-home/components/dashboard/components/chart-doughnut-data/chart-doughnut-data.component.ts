import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { ClientDTO } from 'src/app/app-home/models/client.model';

@Component({
  selector: 'app-chart-doughnut-data',
  templateUrl: './chart-doughnut-data.component.html',
  styleUrls: ['./chart-doughnut-data.component.scss'],
})
export class ChartDoughnutDataComponent implements OnChanges {
  @Input() data: ClientDTO[] = [];

  public percentageCenter: number = 0;
  public labelPercentageCenter: string = '';

  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    onHover: (event, chartElement) => {
      const hoverDiv = document.getElementById('hoverDiv') as HTMLElement;
      if (hoverDiv) {
        if (chartElement.length > 0) {
          hoverDiv.style.opacity = '0.2'; 
        } else {
          hoverDiv.style.opacity = '1'; 
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        padding: 10,
        boxPadding: 5,
        callbacks: {
          label: (tooltipItem: any) => {
            const label = tooltipItem.label;
            const value = tooltipItem.raw;
            const percentage =
              (tooltipItem.raw /
                tooltipItem.dataset.data.reduce(
                  (a: number, b: number) => a + b,
                  0
                )) *
              100;
            if (tooltipItem.label === 'Sem informações') {
              return `${label}`;
            }
            return `${label}: ${value} clientes (${percentage
              .toFixed(2)
              .replace('.', ',')}%)`;
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
    labels: [
      'Acima de 500k',
      'Entre 101k e 299k',
      'Entre 300k e 499k',
      'Abaixo de 100k',
      'Sem informações',
    ],
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#FF7C07',
          '#FE9229',
          '#F6AA59',
          '#F9DDC3',
          '#d1d1d1',
        ],
        hoverBackgroundColor: [
          '#FF7C07',
          '#FE9229',
          '#F6AA59',
          '#F9DDC3',
          '#d1d1d1',
        ],
        hoverBorderColor: [
          '#FF7C07',
          '#FE9229',
          '#F6AA59',
          '#F9DDC3',
          '#d1d1d1',
        ],
        borderWidth: 3,
      },
    ],
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      this.updateChartData(this.data);
    }
  }

  updateChartData(clients: ClientDTO[]) {
    let below100k = 0;
    let between101kAnd299k = 0;
    let between300kAnd499k = 0;
    let above500k = 0;

    const canvas = document.getElementById('graphDoughnut') as HTMLElement;
    canvas.style.zIndex = '9999';

    clients.forEach((client) => {
      if (client.companyValuation < 100000) {
        below100k++;
      } else if (
        client.companyValuation >= 100000 &&
        client.companyValuation <= 299999
      ) {
        between101kAnd299k++;
      } else if (
        client.companyValuation >= 300000 &&
        client.companyValuation <= 499999
      ) {
        between300kAnd499k++;
      } else {
        above500k++;
      }
    });

    const totalClients = clients.length;

    if (totalClients === 0) {
      this.percentageCenter = 0;
      this.labelPercentageCenter = 'Sem informações';
      this.doughnutChartData.datasets[0].data = [0, 0, 0, 0, 1];
      return;
    }

    const below100kPercentage = (below100k / totalClients) * 100;
    const between101kAnd299kPercentage =
      (between101kAnd299k / totalClients) * 100;
    const between300kAnd499kPercentage =
      (between300kAnd499k / totalClients) * 100;
    const above500kPercentage = (above500k / totalClients) * 100;

    const percentages = [
      { label: 'Acima de 500k', percentage: above500kPercentage },
      { label: 'Entre 101k e 299k', percentage: between101kAnd299kPercentage },
      { label: 'Entre 300k e 499k', percentage: between300kAnd499kPercentage },
      { label: 'Abaixo de 100k', percentage: below100kPercentage },
    ];

    const maxPercentageData = percentages.reduce((max, current) =>
      current.percentage > max.percentage ? current : max
    );

    this.percentageCenter = maxPercentageData.percentage;
    this.labelPercentageCenter = maxPercentageData.label;

    this.doughnutChartData.datasets[0].data = [
      above500k,
      between101kAnd299k,
      between300kAnd499k,
      below100k,
    ];
  }
}
