import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { ClientDTO } from 'src/app/app-home/models/client.model';

@Component({
  selector: 'app-chart-bar-data',
  templateUrl: './chart-bar-data.component.html',
  styleUrls: ['./chart-bar-data.component.scss'],
})
export class ChartBarDataComponent implements OnChanges {
  @Input() data: ClientDTO[] = [];

  private dataMonth: {
    [key: string]: { customerQuantity: number; profit: number };
  } = {};

  private months: string[] = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];


  public barChartData: ChartData<'bar'> = {
    labels: this.months,
    datasets: [
      {
        label: 'Lucro Obtido (20% Capital)',
        data: [],
        backgroundColor: '#ffc6a9',
        borderColor: '#ffc6a9',
        hoverBorderColor: '#ee7d46',
        hoverBackgroundColor: '#ee7d46',
        borderWidth: 1,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          display: true,
          font: {
            weight: '700',
          },
        },
      },
      y: {
        beginAtZero: true,
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        displayColors: false,
        bodyFont: {
          weight: 'bold',
        },
        callbacks: {
          label: (context) => {
            const index = context.dataIndex as number;
            const profit = context.raw as number;
            const quantity = this.dataMonth[`${index + 1}-${new Date().getFullYear()}`]?.customerQuantity || 0;
            return `Lucro: ${Intl.NumberFormat('pt-BR', {
              currency: 'BRL',
              style: 'currency',

            }).format(profit)} | Quantidade: ${quantity}`;
          },
          title: () => [],
        },
      },
    },
  };

  private groupCustomersByMonth(clients: ClientDTO[]) {
    const dataMonth: {
      [key: string]: { customerQuantity: number; profit: number };
    } = {};

    clients.forEach((client) => {
      if (typeof client.createdAt === 'string') {
        client.createdAt = new Date(client.createdAt);
      }

      const monthYear = `${client.createdAt.getMonth() + 1}-${client.createdAt.getFullYear()}`;

      if (!dataMonth[monthYear]) {
        dataMonth[monthYear] = {
          customerQuantity: 0,
          profit: 0,
        };
      }

      dataMonth[monthYear].customerQuantity++;
      dataMonth[monthYear].profit += client.companyValuation * 0.2 || 0;
    });

    return dataMonth;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      this.dataMonth = this.groupCustomersByMonth(this.data);

      const profits = this.months.map((month, index) => {
        const monthYear = `${index + 1}-${new Date().getFullYear()}`;
        return this.dataMonth[monthYear]?.profit || 0;
      });
       
      this.barChartData.datasets[0].data = profits;
    }
  }
}
