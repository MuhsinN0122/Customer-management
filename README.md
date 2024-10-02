# Before running the application, ensure you have the following installed:
Node.js (v14 or higher)
Angular CLI (v16 or higher)
npm (comes with Node.js)


# Instructions on how to run the application.
# command for running the application
`ng serve` or `ng serve `
# Once the development server is running, open your browser and navigate to:
`http://localhost:4200`
The application will automatically reload if you change any source files.


# Command for check angular version
`ng version`


# Features
List customer details including name, username, email, phone number, website and company information.
Search functionality to filter customers by name.
Pagination to navigate through customer lists.
Error handling for API requests using HTTP interceptors.
Angular Material and Bootstrap for styling.


# Development Choices
Angular Material and Bootstrap: We chose to use both Angular Material and Bootstrap for a modern, responsive UI. Bootstrap provides the grid system, and Angular Material is used for form controls like the search field and pagination and mat-icons are used.

Reactive Forms: Reactive forms were used for their scalability and validation capabilities, especially with complex form fields like the customer configuration form.
Form group is used to read values in various text boxes.

HTTP Interceptor: An interceptor was added to globally handle API request errors, improving code maintainability by reducing redundant error-handling code in multiple services or components.

# Application Structure
src/
├── app/
│   ├── add-customer/  # Component for creating new customer.
│   │   ├── add-customer.component.ts
│   │   ├── add-customer.component.html
│   │   ├── add-customer.component.css
│   │   ├── add-customer.component.spec.ts
│   ├── customer-detail/  # Component for view the details of a customer.
│   │   ├── customer-detail.component.ts
│   │   ├── customer-detail.component.html
│   │   ├── customer-detail.component.css
│   │   ├── customer-detail.component.spec.ts
│   ├── customer-list/   # Component for listing and listing , searching customers and paginated with 5 records.
│   │   ├── customer-list.component.ts
│   │   ├── customer-list.component.html
│   │   ├── customer-list.component.css
│   │   ├── customer-list.component.spec.ts
│   ├── top-menu/        # component for view the top menu of entire application.
│   │   ├── top-menu.component.ts
│   │   ├── top-menu.component.html
│   │   ├── top-menu.component.css
│   │   ├── top-menu.component.spec.ts
│   ├── app.component.ts # Root component
│   ├── app.component.html
│   ├── app.component.css
│   ├── app.component.spec.ts
│   ├── app.config.server.ts
│   ├── app.config.ts
│   ├── app.routes.ts # routing file of an application
│   ├── customer.service.spec.ts
│   ├── customer.service.ts # Service to interact with the API
│   ├── notification.service.spec.ts
│   ├── notification.service.ts
├── index.html
├── main.server.ts
├── main.ts
├── style.css





# CustomerManagement

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
