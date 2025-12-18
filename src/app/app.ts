import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseForm } from './components/expense-form/expense-form';
import { ExpenseTable } from './components/expense-table/expense-table';
import { ExpenseChart } from './components/expense-chart/expense-chart';

/**
 * AppComponent
 * Main application component that orchestrates all child components.
 * Handles communication between ExpenseTable and ExpenseForm for edit functionality.
 */
@Component({
  selector: 'app-root',
  imports: [CommonModule, ExpenseForm, ExpenseTable, ExpenseChart],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true
})
export class App implements OnInit {
  title = 'Expense Tracker with Visualization';
  
  @ViewChild(ExpenseForm) expenseFormComponent!: ExpenseForm;

  ngOnInit(): void {
    // Listen for edit events from table component
    window.addEventListener('editExpense', this.handleEditExpense.bind(this));
  }

  /**
   * Handle edit event from table component
   * Passes the expense ID to the form component for editing
   */
  handleEditExpense(event: any): void {
    const expenseId = event.detail;
    if (this.expenseFormComponent) {
      this.expenseFormComponent.editExpense(expenseId);
    }
  }
}
