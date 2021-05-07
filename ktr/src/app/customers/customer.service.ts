import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Profil } from '../profil.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private dbPath = '/customers';

  customersRef: AngularFirestoreCollection<Profil> = null;

  constructor(private db: AngularFirestore) {
    this.customersRef = db.collection(this.dbPath);
  }

  createCustomer(customer: Profil): void {
    this.customersRef.add({ ...customer });
  }

  updateCustomer(key: string, value: any): Promise<void> {
    return this.customersRef.doc(key).update(value);
  }

  deleteCustomer(key: string): Promise<void> {
    return this.customersRef.doc(key).delete();
  }

  getCustomersList(): AngularFirestoreCollection<Profil> {
    return this.customersRef;
  }

  deleteAll() {
    this.customersRef.get().subscribe(
      querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.delete();
        });
      },
      error => {
        console.log('Error: ', error);
      }
    );
  }
}
