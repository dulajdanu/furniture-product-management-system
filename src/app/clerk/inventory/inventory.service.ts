import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore/';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private itemCollection: AngularFirestoreCollection<Item>; //reference to the appointment document collection
  items: Observable<Item[]>;

  constructor(private afs: AngularFirestore, private toastrService: NbToastrService) { }

  showToast(status: NbComponentStatus, message: string) { //function used to show toast messages
    this.toastrService.show(status, message, { status });
  }



  addItem(val) {
    this.afs.collection("inventory").doc(val['id']).set(val).then(res => {
      this.showToast('success', "Item added successfully");

    }).catch(res => {
      this.showToast('danger', res);

    });
  }

  editItem(val) {
    this.afs.collection("inventory").doc(val['id']).update(val).then(res => {
      this.showToast('success', "Item Edited successfully");

    }).catch(res => {
      this.showToast('danger', res);

    });
  }

  delteItem(val) {
    this.afs.collection("inventory").doc(val).delete().then(res => {
      this.showToast('success', "Item deleted successfully");

    }).catch(res => {
      this.showToast('danger', res);

    });

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




