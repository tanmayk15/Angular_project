/**
 * Expense Model
 * Represents a single expense entry with all required fields
 */
export interface Expense {
  id: number;
  title: string;
  amount: number;
  category: string;
  date: Date;
}

/**
 * Available expense categories
 */
export const EXPENSE_CATEGORIES = [
  'Food',
  'Travel',
  'Rent',
  'Shopping',
  'Other'
] as const;

export type ExpenseCategory = typeof EXPENSE_CATEGORIES[number];
