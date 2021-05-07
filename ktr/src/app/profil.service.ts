import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Profil } from '../app/profil.model';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  constructor(private firestore: AngularFirestore) {}

  getProfils() {
    return this.firestore.collection('profils').snapshotChanges();
  }

  createProfils(profil: Profil) {
    return this.firestore.collection('profils').add(profil);
  }

  updateProfils(profil: Profil) {
    delete profil.id;
    this.firestore.doc('profils/' + profil.id).update(profil);
  }

  deleteProfil(profilId: Profil) {
    this.firestore.doc('profils/' + profilId).delete();
  }
}
