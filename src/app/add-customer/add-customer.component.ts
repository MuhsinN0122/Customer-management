import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';
import { TopMenuComponent } from '../top-menu/top-menu.component';
@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [ReactiveFormsModule,TopMenuComponent],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css'
})
export class AddCustomerComponent {
  customerForm!: FormGroup;
  constructor(private fb: FormBuilder,private api:CustomerService,private router: Router) {}
  customerId:any = sessionStorage.getItem("customerId");
  ngOnInit(): void {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      website: [''],
      address: this.fb.group({
        city: ['', Validators.required],
        street: ['', Validators.required],
        suite: [''],
        zipcode: ['', Validators.required],
        geo: this.fb.group({
          lat: ['', Validators.required],
          lng: ['', Validators.required],
        }),
      }),
      company: this.fb.group({
        name: ['', Validators.required],
        catchPhrase: [''],
        bs: [''],
      })
    });
  }

  // setFormValues() {
  //   this.customerForm.patchValue({
  //     name: 'John Doe',
  //     username: 'johndoe',
  //     phone: '1234567890',
  //     email: 'johndoe@example.com',
  //     website: 'www.johndoe.com',
  //     address: {
  //       city: 'New York',
  //       street: '123 Main St',
  //       suite: 'Apt 1',
  //       zipcode: '10001',
  //       geo: {
  //         lat: '40.7128',
  //         lng: '-74.0060',
  //       }
  //     }
  //   });
  // }
  addCustomer() {
    if (this.customerForm.valid) {
      this.api.addCustomer(this.customerForm.value).subscribe((data)=>{
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Customer added successfully!',
          showConfirmButton: true,
          timer: 2000
        });
        this.router.navigateByUrl('/customer-list');
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: "Ensure all required fields are filled",
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Close'
      });
    }
  }
}
