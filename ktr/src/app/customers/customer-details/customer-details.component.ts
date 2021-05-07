import { Component, OnInit, Input } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Profil } from '../../profil.model';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  @Input() customer: Profil;

  constructor(private customerService: CustomerService) {}

  ngOnInit() {}

  updateActive(isActive: boolean) {
    this.customerService
      .updateCustomer(this.customer.id, { active: isActive })
      .catch(err => console.log(err));
  }

  deleteCustomer() {
    this.customerService
      .deleteCustomer(this.customer.id)
      .catch(err => console.log(err));
  }
}
