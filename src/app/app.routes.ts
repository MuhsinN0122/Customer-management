import { Routes } from '@angular/router';

// Define the routes for the application
export const routes: Routes = [
    {
        // Default route that matches an empty path
        path: '',
        // Ensures that the entire path is matched before redirecting
        pathMatch: 'full',
        // Redirects to the 'customer-list' route if the path is empty
        redirectTo: 'customer-list'
    },
    {
        // Route for the customer list component
        path: 'customer-list',
        // Dynamically load the CustomerListComponent when the route is accessed
        loadComponent: () => 
            import('./customer-list/customer-list.component')
                .then(m => m.CustomerListComponent)
    },
    {
        // Route for adding a new customer
        path: 'add-customer',
        // Dynamically load the AddCustomerComponent when this route is accessed
        loadComponent: () => 
            import('./add-customer/add-customer.component')
                .then(m => m.AddCustomerComponent)
    },
    {
        // Route for displaying customer details
        path: 'customer-details',
        // Dynamically load the CustomerDetailComponent when this route is accessed
        loadComponent: () => 
            import('./customer-detail/customer-detail.component')
                .then(m => m.CustomerDetailComponent)
    },
];
