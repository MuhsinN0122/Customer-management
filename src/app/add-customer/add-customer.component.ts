import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';
import { TopMenuComponent } from '../top-menu/top-menu.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [ReactiveFormsModule,TopMenuComponent,CommonModule],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css'
})
export class AddCustomerComponent {
  customerForm!: FormGroup;
  customerDetails: any;
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
    if(this.customerId!='null'){
      this.customerData();
    }
  }
  customerData() {
    // api for getting customer details
    this.api.customerDetails(this.customerId).subscribe((data) => {
      this.customerDetails = data;
      this.setFormValues();
    });
  }
  setFormValues() {
    this.customerForm.patchValue({
      id:this.customerDetails.id,
      name: this.customerDetails.name,
      username: this.customerDetails.username,
      phone: this.customerDetails.phone,
      email: this.customerDetails.email,
      website: this.customerDetails.website,
      address: {
        city: this.customerDetails.address.city,
        street: this.customerDetails.address.street,
        suite: this.customerDetails.address.suite,
        zipcode: this.customerDetails.address.zipcode,
        geo: {
          lat: this.customerDetails.address.geo.lat,
          lng: this.customerDetails.address.geo.lng,
        },
      },
      company: {
        name:this.customerDetails.company.name,
        catchPhrase:this.customerDetails.company.catchPhrase,
        bs:this.customerDetails.company.bs
      }
    });
  }
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
