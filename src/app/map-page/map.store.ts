import { computed, inject } from '@angular/core';
import { signalStore, withComputed } from '@ngrx/signals';
import { withFirebaseDocument } from '../store/withFirebaseDocument';
import { AuthStore } from '../store/auth.store';
import { Firestore, doc } from '@angular/fire/firestore';

export const MapStore = signalStore(
  withFirebaseDocument((authStore = inject(AuthStore), firestore = inject(Firestore)) => {
    const uid = authStore.uid();

    if (!uid) {
      throw new Error('You are not authorized');
    }

    return doc(firestore, `map/${uid}`).withConverter<string[]>({
      fromFirestore: snapshot => snapshot.get('selected') || [],
      toFirestore: input => ({
        selected: input || [],
      }),
    });
  }),
  withComputed(({ data }) => ({
    total: computed(() => data()?.length || 0),
    selected: computed(() => data() || []),
  })),
);
