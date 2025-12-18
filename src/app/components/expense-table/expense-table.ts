import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense.model';
import { ExpenseForm } from '../expense-form/expense-form';

/**
 * ExpenseTableComponent
 * Displays all expenses in a table format with Edit and Delete actions.
 * Subscribes to expense service for real-time updates.
 */
@Component({
  selector: 'app-expense-table',
  imports: [CommonModule],
  templateUrl: './expense-table.html',
  styleUrl: './expense-table.css',
  standalone: true
})
export class ExpenseTable implements OnInit, OnDestroy {
  expenses: Expense[] = [];
  
  // Reference to the form component for editing
  @ViewChild(ExpenseForm) expenseFormComponent?: ExpenseForm;
  
  // Subject for managing subscriptions
  private destroy$ = new Subject<void>();

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    // Subscribe to expense changes from service
    this.expenseService.expenses$
      .pipe(takeUntil(this.destroy$))
      .subscribe(expenses => {
        this.expenses = expenses;
      });
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Handle edit action - emit event to parent component
   * @param id - Expense ID to edit
   */
  onEdit(id: number): void {
    // Scroll to top where form is located
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Emit edit event - parent component will handle this
    // This is a simplified approach; in production, you might use a service or EventEmitter
    this.editExpense(id);
  }

  /**
   * Handle delete action with confirmation
   * @param id - Expense ID to delete
   */
  onDelete(id: number): void {
    const expense = this.expenses.find(e => e.id === id);
    if (expense && confirm(`Are you sure you want to delete "${expense.title}"?`)) {
      this.expenseService.deleteExpense(id);
    }
  }

  /**
   * Format date to readable string
   * @param date - Date object
   */
  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  /**
   * Format amount with currency symbol
   * @param amount - Numeric amount
   */
  formatAmount(amount: number): string {
    return `₹${amount.toFixed(2)}`;
  }

  /**
   * Calculate total of all expenses
   */
  getTotalAmount(): number {
    return this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  /**
   * Internal method to trigger edit
   * This will be called by parent component
   */
  private editExpense(id: number): void {
    // Create a custom event that parent component can listen to
    const event = new CustomEvent('editExpense', { detail: id });
    window.dispatchEvent(event);
  }
}
