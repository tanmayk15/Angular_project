# 💰 Expense Tracker

A modern, full-featured expense tracking application built with Angular 18+ that helps you manage your finances and visualize spending patterns through interactive charts.

![Angular](https://img.shields.io/badge/Angular-18+-DD0031?style=flat&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green.svg)

## 📸 Screenshot

![Expense Tracker Application](screenshots/Screenshot%202025-12-18%20185138.png)

## ✨ Features

### 📝 Expense Management
- **Create** new expenses with title, amount, category, and date
- **Edit** existing expenses with pre-populated form
- **Delete** expenses with confirmation dialog
- **Validate** form inputs (required fields, minimum values)
- **Date restriction** - prevents future date selection

### 📊 Data Visualization
- **Category View** - Bar chart showing total expenses by category
- **Daily View** - Bar chart showing expenses grouped by date
- **Monthly View** - Grouped bar chart showing category breakdown per month
- **Yearly View** - Grouped bar chart showing category breakdown per year
- **Interactive Charts** - Built with ngx-charts library
- **Consistent Colors** - Category-specific color scheme across all views

### 🎨 User Interface
- **Dark Theme** - Modern dark UI with #0a0a0a background
- **Responsive Design** - Three-section layout optimized for desktop
- **Real-time Updates** - Automatic chart and table synchronization
- **Custom Scrollbars** - Styled scrollbars for better aesthetics
- **Modern Typography** - Poppins font for headings, Open Sans for body

### 📦 Category System
- 🍔 **Food** - Orange (#ffb84d)
- ✈️ **Travel** - Blue (#5fc3e4)
- 🏠 **Rent** - Red (#ff6b6b)
- 🛍️ **Shopping** - Purple (#a893ff)
- 📌 **Other** - Gray (#b8b8d1)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v18 or higher)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd expense-tracker
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
ng serve
```

4. **Open in browser**
Navigate to `http://localhost:4200/`

The application will automatically reload when you modify source files.

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── expense-form/       # Add/Edit expense form
│   │   ├── expense-table/      # Expense list with actions
│   │   └── expense-chart/      # Interactive visualizations
│   ├── models/
│   │   └── expense.model.ts    # Expense interface & categories
│   ├── services/
│   │   └── expense.service.ts  # State management with BehaviorSubject
│   ├── app.ts                  # Main app component
│   ├── app.html                # Main app template
│   └── app.css                 # Main app styles
├── index.html                  # HTML entry point
└── styles.css                  # Global styles

```

## 🛠️ Technologies

- **Framework**: Angular 18+ (Standalone Components)
- **Language**: TypeScript 5.0+
- **State Management**: RxJS BehaviorSubject
- **Charts**: @swimlane/ngx-charts
- **Forms**: Reactive Forms with Validators
- **Styling**: CSS3 with custom properties
- **Fonts**: Google Fonts (Poppins, Open Sans)

## 📱 Component Architecture

### ExpenseService
- Centralized state management using BehaviorSubject
- CRUD operations (Create, Read, Update, Delete)
- Data aggregation methods for charts
- 20 pre-loaded dummy expenses for demo

### ExpenseForm Component
- Reactive form with validation
- Add new or edit existing expenses
- Date picker with max date constraint
- Real-time error messages

### ExpenseTable Component
- Displays all expenses in tabular format
- Edit and delete actions
- Category badges with color coding
- Total amount calculation
- Sticky header and custom scrollbar

### ExpenseChart Component
- Four view modes (Category, Daily, Monthly, Yearly)
- Dynamic chart data updates
- Consistent color scheme
- Grouped bar charts for time-based views
- Legend for multi-category views

## 🎯 Key Features Explained

### Reactive State Management
The application uses RxJS BehaviorSubject for reactive state management. When any expense is added, updated, or deleted, all subscribed components automatically receive the updated data and re-render.

### Chart Synchronization
Charts automatically update when expenses change. The service emits new data through an Observable, and the chart component subscribes to these changes, ensuring real-time visualization updates.

### Color Consistency
All categories maintain consistent colors across:
- Table category badges
- Chart visualizations (all view modes)
- Grouped bar segments

### Form Validation
- Title: Required
- Amount: Required, minimum value 1
- Category: Required selection
- Date: Required, cannot be future date

## 📊 Chart View Modes

1. **Category View**: Shows total expenses per category
2. **Daily View**: Shows total expenses per day
3. **Monthly View**: Grouped bar chart showing category breakdown for each month
4. **Yearly View**: Grouped bar chart showing category breakdown for each year

## 🔧 Building for Production

```bash
ng build --configuration production
```

Build artifacts will be stored in the `dist/` directory, optimized for performance.

## 🧪 Running Tests

```bash
ng test
```

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

For questions or feedback, please open an issue in the repository.

---

**Built with ❤️ using Angular**

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
