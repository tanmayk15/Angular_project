import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Subject, takeUntil } from 'rxjs';
import { ExpenseService } from '../../services/expense.service';

/**
 * ExpenseChartComponent
 * Displays a bar chart visualization of expenses with multiple view modes:
 * - Category: Group by expense category
 * - Daily: Group by day
 * - Monthly: Group by month
 * - Yearly: Group by year
 * The chart automatically updates whenever expense data changes (add/edit/delete).
 * Uses ngx-charts library for rendering.
 */
@Component({
  selector: 'app-expense-chart',
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './expense-chart.html',
  styleUrl: './expense-chart.css',
  standalone: true
})
export class ExpenseChart implements OnInit, OnDestroy {
  // Chart data in format: [{ name: 'Category', value: amount }]
  chartData: any[] = [];
  
  // View mode: 'category', 'day', 'month', 'year'
  viewMode: 'category' | 'day' | 'month' | 'year' = 'category';

  // Chart configuration options - responsive sizing
  view: any;
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Category';
  showYAxisLabel = true;
  yAxisLabel = 'Amount (₹)';
  
  // Color mapping for categories to match badges
  private categoryColors: { [key: string]: string } = {
    'Food': '#ffb84d',
    'Travel': '#5fc3e4',
    'Rent': '#ff6b6b',
    'Shopping': '#a893ff',
    'Other': '#b8b8d1'
  };
  
  colorScheme: any = {
    domain: ['#ffb84d', '#5fc3e4', '#ff6b6b', '#a893ff', '#b8b8d1']
  };

  // Subject for managing subscriptions
  private destroy$ = new Subject<void>();

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    // Subscribe to expense changes and update chart data
    // This is the key to automatic synchronization - whenever expenses change,
    // the service emits new data, and we recalculate totals based on view mode
    this.expenseService.expenses$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateChartData();
      });
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Change the chart view mode
   */
  changeViewMode(mode: 'category' | 'day' | 'month' | 'year'): void {
    this.viewMode = mode;
    this.updateAxisLabels();
    this.updateLegendVisibility();
    this.updateChartData();
  }

  /**
   * Update axis labels based on view mode
   */
  private updateAxisLabels(): void {
    switch (this.viewMode) {
      case 'category':
        this.xAxisLabel = 'Category';
        break;
      case 'day':
        this.xAxisLabel = 'Date';
        break;
      case 'month':
        this.xAxisLabel = 'Month';
        break;
      case 'year':
        this.xAxisLabel = 'Year';
        break;
    }
  }

  /**
   * Update legend visibility based on view mode
   */
  private updateLegendVisibility(): void {
    // Show legend only for grouped charts (monthly and yearly)
    this.showLegend = this.viewMode === 'month' || this.viewMode === 'year';
  }

  /**
   * Update chart data based on selected view mode
   * This method is called automatically whenever expense data changes
   */
  private updateChartData(): void {
    switch (this.viewMode) {
      case 'category':
        const categoryData = this.expenseService.getCategoryTotals();
        // Sort data to maintain consistent color mapping
        const categoryOrder = ['Food', 'Travel', 'Rent', 'Shopping', 'Other'];
        this.chartData = categoryData.sort((a, b) => {
          return categoryOrder.indexOf(a.name) - categoryOrder.indexOf(b.name);
        });
        // Use category colors
        this.colorScheme = {
          domain: ['#ffb84d', '#5fc3e4', '#ff6b6b', '#a893ff', '#b8b8d1']
        };
        break;

      case 'day':
        this.chartData = this.expenseService.getDailyTotals();
        // Use category colors for consistency
        this.colorScheme = {
          domain: ['#ffb84d', '#5fc3e4', '#ff6b6b', '#a893ff', '#b8b8d1']
        };
        break;

      case 'month':
        // Get grouped data by month and category
        this.chartData = this.expenseService.getMonthlyGroupedTotals();
        // Use category colors for grouped chart
        this.colorScheme = {
          domain: ['#ffb84d', '#5fc3e4', '#ff6b6b', '#a893ff', '#b8b8d1']
        };
        break;

      case 'year':
        // Get grouped data by year and category
        this.chartData = this.expenseService.getYearlyGroupedTotals();
        // Use category colors for grouped chart
        this.colorScheme = {
          domain: ['#ffb84d', '#5fc3e4', '#ff6b6b', '#a893ff', '#b8b8d1']
        };
        break;
    }
  }

  /**
   * Handle chart select event (optional - for future enhancements)
   */
  onSelect(event: any): void {
    console.log('Chart item selected:', event);
  }
}

/**
 * HOW CHART SYNCHRONIZATION WORKS:
 * 
 * 1. ExpenseService uses BehaviorSubject to store expense data
 * 2. When any CRUD operation occurs (add/update/delete), the service
 *    emits the updated expense array through the Observable
 * 3. ExpenseChartComponent subscribes to this Observable in ngOnInit
 * 4. Whenever new data is emitted, the subscription callback runs
 * 5. updateChartData() is called, which fetches fresh category totals
 * 6. Angular change detection updates the chart view automatically
 * 
 * This reactive pattern ensures the chart always reflects current data
 * without manual refresh or explicit communication between components.
 */
