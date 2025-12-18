import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ExpenseService } from '../../services/expense.service';
import { EXPENSE_CATEGORIES } from '../../models/expense.model';

/**
 * ExpenseFormComponent
 * Handles both adding new expenses and editing existing ones using a reactive form.
 * The form validates all inputs and provides user-friendly error messages.
 */
@Component({
  selector: 'app-expense-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './expense-form.html',
  styleUrl: './expense-form.css',
  standalone: true
})
export class ExpenseForm implements OnInit, OnDestroy {
  expenseForm!: FormGroup;
  categories = EXPENSE_CATEGORIES;
  isEditMode = false;
  editingExpenseId: number | null = null;
  maxDate: string; // Maximum date user can select (today)
  
  // Subject for managing subscriptions
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService
  ) {
    // Set max date to today in YYYY-MM-DD format
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Initialize the reactive form with validators
   */
  private initializeForm(): void {
    this.expenseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  /**
   * Submit handler for both Add and Edit operations
   */
  onSubmit(): void {
    if (this.expenseForm.valid) {
      const formValue = this.expenseForm.value;
      const expenseData = {
        title: formValue.title,
        amount: parseFloat(formValue.amount),
        category: formValue.category,
        date: new Date(formValue.date)
      };

      if (this.isEditMode && this.editingExpenseId !== null) {
        // Update existing expense
        this.expenseService.updateExpense(this.editingExpenseId, expenseData);
      } else {
        // Add new expense
        this.expenseService.addExpense(expenseData);
      }

      // Reset form after submission
      this.resetForm();
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.expenseForm.controls).forEach(key => {
        this.expenseForm.get(key)?.markAsTouched();
      });
    }
  }

  /**
   * Populate form with expense data for editing
   * @param id - Expense ID to edit
   */
  editExpense(id: number): void {
    const expense = this.expenseService.getExpenseById(id);
    if (expense) {
      this.isEditMode = true;
      this.editingExpenseId = id;
      
      // Format date for input field (YYYY-MM-DD)
      const dateStr = expense.date.toISOString().split('T')[0];
      
      this.expenseForm.patchValue({
        title: expense.title,
        amount: expense.amount,
        category: expense.category,
        date: dateStr
      });
    }
  }

  /**
   * Reset form to initial state
   */
  resetForm(): void {
    this.expenseForm.reset();
    this.isEditMode = false;
    this.editingExpenseId = null;
  }

  /**
   * Check if a field has validation errors and has been touched
   */
  hasError(fieldName: string, errorType: string): boolean {
    const field = this.expenseForm.get(fieldName);
    return !!(field?.hasError(errorType) && field?.touched);
  }

  /**
   * Check if a field is invalid and touched
   */
  isFieldInvalid(fieldName: string): boolean {
    const field = this.expenseForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }
}
