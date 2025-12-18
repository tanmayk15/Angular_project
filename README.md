# Expense Tracker Application

## Project Overview

The Expense Tracker is a modern Angular-based web application designed to help users record, manage, and analyze their daily expenses. The application allows users to add, view, edit, and delete expenses, and also provides graphical visualizations to understand spending patterns over time.

This project demonstrates core Angular concepts such as component-based architecture, reactive forms, state management using services, and dynamic data visualization using charts.

## Features

### Expense Management (CRUD Operations)
- Add new expenses with title, amount, category, and date
- Edit existing expenses using a pre-filled form
- Delete expenses with confirmation
- Display all expenses in a structured table
- Automatic calculation of total expenses

### Form Validation
- All fields are mandatory
- Amount must be greater than zero
- Date selection does not allow future dates
- User-friendly validation messages are displayed in real time

### Data Visualization
- Bar chart visualization of expenses
- Multiple chart views:
  - Category-wise expense totals
  - Daily expense totals
  - Monthly category-wise expense comparison
  - Yearly category-wise expense comparison
- Charts update automatically whenever expense data changes
- Consistent category colors across table and charts

### User Interface
- Clean and modern dark-themed user interface
- Responsive layout suitable for desktop screens
- Real-time synchronization between form, table, and charts
- Easy-to-use and readable design

### Category System
The application uses predefined categories:
- Food (Orange)
- Travel (Blue)
- Rent (Red)
- Shopping (Purple)
- Other (Gray)

Each category is visually distinguished using a consistent color scheme.

## Technologies Used
- Angular 18 or later
- TypeScript
- RxJS BehaviorSubject for state management
- Reactive Forms module for form handling and validation
- ngx-charts for data visualization
- HTML and CSS for layout and styling
- Google Fonts for typography

## Application Architecture

### Expense Service
- Acts as a central data store
- Manages all expense data in memory
- Provides methods for create, read, update, and delete operations
- Uses BehaviorSubject to notify components of data changes
- Supplies processed data for charts

### Expense Form Component
- Handles adding and editing expenses
- Uses reactive forms with validators
- Displays validation errors clearly
- Supports both create and update functionality in a single form

### Expense Table Component
- Displays all expenses in tabular format
- Provides edit and delete actions
- Shows category labels and total expense calculation

### Expense Chart Component
- Displays bar charts based on expense data
- Supports multiple view modes
- Automatically updates when expense data changes

## How Data Is Managed

The application stores expense data in memory using an Angular service. This means:
- Data is available during the current session
- Data is lost when the browser is refreshed

This approach keeps the project frontend-focused and simple. The architecture is designed so that a backend API or database can be added later without major changes.

## How to Run the Project

### Prerequisites
- Node.js version 18 or higher
- npm version 9 or higher
- Angular CLI version 18 or higher

### Steps to Run
1. Clone the repository
2. Install dependencies using `npm install`
3. Start the development server using `ng serve`
4. Open the application in a browser at `http://localhost:4200`

The application reloads automatically when changes are made to the source code.

## Build for Production

To create a production build, run:

```bash
ng build --configuration production
```

The optimized build files will be generated in the dist directory.

## Testing

Unit tests can be executed using:

```bash
ng test
```

End-to-end testing is not configured by default and can be added later if required.

## Upcoming Enhancements (Future Scope)
- Persistent storage using LocalStorage or backend database
- User authentication and login system
- Monthly budget limits and alerts
- Export expenses to CSV or PDF
- Mobile-friendly responsive layout
- Backend integration using REST APIs

## Conclusion

This Expense Tracker application is a complete Angular CRUD project that combines form handling, data management, and data visualization. It is suitable for academic assignments, portfolio projects, and interview demonstrations, as it clearly showcases modern Angular development practices.

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
