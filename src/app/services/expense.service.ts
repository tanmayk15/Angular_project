import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Expense } from '../models/expense.model';

/**
 * ExpenseService
 * Manages in-memory expense data using BehaviorSubject for reactive updates.
 * All components subscribe to this service to get real-time data changes.
 */
@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  // Private BehaviorSubject to store and emit expense data
  private expensesSubject = new BehaviorSubject<Expense[]>([]);
  
  // Public Observable that components can subscribe to
  public expenses$: Observable<Expense[]> = this.expensesSubject.asObservable();
  
  // Counter for generating unique IDs
  private nextId = 1;

  constructor() {
    // Initialize with dummy data
    this.initializeDummyData();
  }

  /**
   * Initialize the application with dummy expense data
   */
  private initializeDummyData(): void {
    const dummyExpenses: Expense[] = [
      // December 2025
      { id: this.nextId++, title: 'Grocery Shopping', amount: 2500, category: 'Food', date: new Date('2025-12-18') },
      { id: this.nextId++, title: 'Restaurant Dinner', amount: 1200, category: 'Food', date: new Date('2025-12-17') },
      { id: this.nextId++, title: 'Monthly Rent', amount: 15000, category: 'Rent', date: new Date('2025-12-01') },
      { id: this.nextId++, title: 'Electricity Bill', amount: 800, category: 'Rent', date: new Date('2025-12-15') },
      { id: this.nextId++, title: 'New Shoes', amount: 3500, category: 'Shopping', date: new Date('2025-12-16') },
      { id: this.nextId++, title: 'Online Shopping', amount: 2200, category: 'Shopping', date: new Date('2025-12-10') },
      { id: this.nextId++, title: 'Taxi Fare', amount: 450, category: 'Travel', date: new Date('2025-12-18') },
      { id: this.nextId++, title: 'Fuel', amount: 3000, category: 'Travel', date: new Date('2025-12-12') },
      { id: this.nextId++, title: 'Coffee Shop', amount: 350, category: 'Food', date: new Date('2025-12-14') },
      { id: this.nextId++, title: 'Movie Tickets', amount: 600, category: 'Other', date: new Date('2025-12-13') },
      
      // November 2025
      { id: this.nextId++, title: 'Thanksgiving Dinner', amount: 4500, category: 'Food', date: new Date('2025-11-28') },
      { id: this.nextId++, title: 'Flight Tickets', amount: 8500, category: 'Travel', date: new Date('2025-11-25') },
      { id: this.nextId++, title: 'Hotel Stay', amount: 6000, category: 'Travel', date: new Date('2025-11-26') },
      { id: this.nextId++, title: 'November Rent', amount: 15000, category: 'Rent', date: new Date('2025-11-01') },
      { id: this.nextId++, title: 'Winter Clothes', amount: 5500, category: 'Shopping', date: new Date('2025-11-20') },
      { id: this.nextId++, title: 'Grocery', amount: 3200, category: 'Food', date: new Date('2025-11-15') },
      { id: this.nextId++, title: 'Internet Bill', amount: 999, category: 'Rent', date: new Date('2025-11-10') },
      { id: this.nextId++, title: 'Gym Membership', amount: 1500, category: 'Other', date: new Date('2025-11-05') },
      
      // October 2025
      { id: this.nextId++, title: 'Birthday Party', amount: 3500, category: 'Other', date: new Date('2025-10-22') },
      { id: this.nextId++, title: 'October Rent', amount: 15000, category: 'Rent', date: new Date('2025-10-01') }
    ];
    this.expensesSubject.next(dummyExpenses);
  }

  /**
   * Get current expenses array (non-reactive)
   */
  getExpenses(): Expense[] {
    return this.expensesSubject.value;
  }

  /**
   * Add a new expense
   * @param expense - Expense object without ID
   */
  addExpense(expense: Omit<Expense, 'id'>): void {
    const currentExpenses = this.getExpenses();
    const newExpense: Expense = {
      ...expense,
      id: this.nextId++
    };
    
    // Add new expense and emit updated array
    this.expensesSubject.next([...currentExpenses, newExpense]);
  }

  /**
   * Update an existing expense
   * @param id - Expense ID to update
   * @param updatedExpense - Updated expense data
   */
  updateExpense(id: number, updatedExpense: Omit<Expense, 'id'>): void {
    const currentExpenses = this.getExpenses();
    const updatedExpenses = currentExpenses.map(expense =>
      expense.id === id ? { ...updatedExpense, id } : expense
    );
    
    // Emit updated array
    this.expensesSubject.next(updatedExpenses);
  }

  /**
   * Delete an expense by ID
   * @param id - Expense ID to delete
   */
  deleteExpense(id: number): void {
    const currentExpenses = this.getExpenses();
    const filteredExpenses = currentExpenses.filter(expense => expense.id !== id);
    
    // Emit updated array
    this.expensesSubject.next(filteredExpenses);
  }

  /**
   * Get expense by ID
   * @param id - Expense ID
   * @returns Expense object or undefined
   */
  getExpenseById(id: number): Expense | undefined {
    return this.getExpenses().find(expense => expense.id === id);
  }

  /**
   * Calculate total amount by category
   * Used for chart visualization
   * @returns Array of objects with category name and total amount
   */
  getCategoryTotals(): { name: string; value: number }[] {
    const expenses = this.getExpenses();
    const categoryMap = new Map<string, number>();

    // Sum amounts by category
    expenses.forEach(expense => {
      const current = categoryMap.get(expense.category) || 0;
      categoryMap.set(expense.category, current + expense.amount);
    });

    // Convert to array format for ngx-charts
    return Array.from(categoryMap.entries()).map(([name, value]) => ({
      name,
      value: Math.round(value * 100) / 100 // Round to 2 decimal places
    }));
  }

  /**
   * Calculate total amount by day
   * @returns Array of objects with date and total amount
   */
  getDailyTotals(): { name: string; value: number }[] {
    const expenses = this.getExpenses();
    const dailyMap = new Map<string, number>();

    // Sum amounts by day
    expenses.forEach(expense => {
      const dateStr = new Date(expense.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      const current = dailyMap.get(dateStr) || 0;
      dailyMap.set(dateStr, current + expense.amount);
    });

    // Convert to array and sort by date
    return Array.from(dailyMap.entries())
      .map(([name, value]) => ({
        name,
        value: Math.round(value * 100) / 100
      }))
      .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());
  }

  /**
   * Calculate total amount by month
   * @returns Array of objects with month and total amount
   */
  getMonthlyTotals(): { name: string; value: number }[] {
    const expenses = this.getExpenses();
    const monthlyMap = new Map<string, number>();

    // Sum amounts by month
    expenses.forEach(expense => {
      const dateStr = new Date(expense.date).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      });
      const current = monthlyMap.get(dateStr) || 0;
      monthlyMap.set(dateStr, current + expense.amount);
    });

    // Convert to array and sort by date
    return Array.from(monthlyMap.entries())
      .map(([name, value]) => ({
        name,
        value: Math.round(value * 100) / 100
      }))
      .sort((a, b) => {
        const dateA = new Date(a.name + ' 1');
        const dateB = new Date(b.name + ' 1');
        return dateA.getTime() - dateB.getTime();
      });
  }

  /**
   * Calculate monthly totals grouped by category (for grouped bar chart)
   * @returns Array in format for ngx-charts-bar-vertical-2d
   */
  getMonthlyGroupedTotals(): any[] {
    const expenses = this.getExpenses();
    const monthMap = new Map<string, Map<string, number>>();

    // Group by month and category
    expenses.forEach(expense => {
      const monthStr = new Date(expense.date).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      });
      
      if (!monthMap.has(monthStr)) {
        monthMap.set(monthStr, new Map());
      }
      
      const categoryMap = monthMap.get(monthStr)!;
      const current = categoryMap.get(expense.category) || 0;
      categoryMap.set(expense.category, current + expense.amount);
    });

    // Convert to grouped chart format with consistent category ordering
    // Ensure all categories are present in every month for consistent color mapping
    const categoryOrder = ['Food', 'Travel', 'Rent', 'Shopping', 'Other'];
    const result = Array.from(monthMap.entries()).map(([month, categories]) => {
      // Create series with all categories, defaulting to 0 if not present
      const series = categoryOrder.map(category => ({
        name: category,
        value: Math.round((categories.get(category) || 0) * 100) / 100
      }));
      
      return {
        name: month,
        series: series
      };
    });

    // Sort by date
    return result.sort((a, b) => {
      const dateA = new Date(a.name + ' 1');
      const dateB = new Date(b.name + ' 1');
      return dateA.getTime() - dateB.getTime();
    });
  }

  /**
   * Calculate total amount by year
   * @returns Array of objects with year and total amount
   */
  getYearlyTotals(): { name: string; value: number }[] {
    const expenses = this.getExpenses();
    const yearlyMap = new Map<string, number>();

    // Sum amounts by year
    expenses.forEach(expense => {
      const year = new Date(expense.date).getFullYear().toString();
      const current = yearlyMap.get(year) || 0;
      yearlyMap.set(year, current + expense.amount);
    });

    // Convert to array and sort by year
    return Array.from(yearlyMap.entries())
      .map(([name, value]) => ({
        name,
        value: Math.round(value * 100) / 100
      }))
      .sort((a, b) => parseInt(a.name) - parseInt(b.name));
  }

  /**
   * Calculate yearly totals grouped by category (for grouped bar chart)
   * @returns Array in format for ngx-charts-bar-vertical-2d
   */
  getYearlyGroupedTotals(): any[] {
    const expenses = this.getExpenses();
    const yearMap = new Map<string, Map<string, number>>();

    // Group by year and category
    expenses.forEach(expense => {
      const year = new Date(expense.date).getFullYear().toString();
      
      if (!yearMap.has(year)) {
        yearMap.set(year, new Map());
      }
      
      const categoryMap = yearMap.get(year)!;
      const current = categoryMap.get(expense.category) || 0;
      categoryMap.set(expense.category, current + expense.amount);
    });

    // Convert to grouped chart format with consistent category ordering
    const categoryOrder = ['Food', 'Travel', 'Rent', 'Shopping', 'Other'];
    const result = Array.from(yearMap.entries()).map(([year, categories]) => {
      const series = Array.from(categories.entries())
        .map(([category, amount]) => ({
          name: category,
          value: Math.round(amount * 100) / 100
        }))
        .sort((a, b) => categoryOrder.indexOf(a.name) - categoryOrder.indexOf(b.name));
      
      return {
        name: year,
        series: series
      };
    });

    // Sort by year
    return result.sort((a, b) => parseInt(a.name) - parseInt(b.name));
  }
}
