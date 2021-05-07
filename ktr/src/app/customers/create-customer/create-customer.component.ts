import { Component, OnInit } from '@angular/core';

import { Profil } from '../../profil.model';
import { CustomerService } from '../customer.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  customer: Profil = new Profil();
  submitted = false;
  customers: any;

  constructor(private customerService: CustomerService) {}

  ngOnInit() {}

  newCustomer(): void {
    this.submitted = false;
    this.customer = new Profil();
  }

  save() {
    this.customerService.createCustomer(this.customer);
    this.customer = new Profil();
    console.log(this.customer);
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  getCustomersList() {
    this.customerService
      .getCustomersList()
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
        )
      )
      .subscribe(customers => {
        this.customers = customers;
      });
  }
}
