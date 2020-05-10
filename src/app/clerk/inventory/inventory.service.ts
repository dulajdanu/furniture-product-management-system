import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore/';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private itemCollection: AngularFirestoreCollection<Item>; //reference to the appointment document collection
  items: Observable<Item[]>;

  constructor(private afs: AngularFirestore) { }


  addItem(val) {

  }

  editItem(val) { }

  delteItem(val) {

  }
  getAllItems(): Observable<Item[]> {
    // return this.afs.collection('users').doc(this.email).collection("appointments").snapshotChanges();
    this.itemCollection = this.afs.collection<Item>('inventory');
    this.items = this.itemCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Item;
        return { ...data };
      }))
    );
    // this.appointments.subscribe(res => {
    //   console.log(res);
    // });
    return this.items;
  }
}

export interface Item {
  id: string,
  name: string,
  cost: number
}




