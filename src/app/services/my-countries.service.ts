import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Auth } from '@angular/fire/auth';

import { Firestore, doc, setDoc, docData } from '@angular/fire/firestore';
import { Observable, Subscription, from, map } from 'rxjs';

@Injectable()
export class MyCountriesService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly firestore = inject(Firestore);
  private readonly auth = inject(Auth);

  private readonly documentRef = doc(
    this.firestore,
    `my-countries/${this.auth.currentUser?.uid}`
  ).withConverter<string[]>({
    fromFirestore: (snapshot) => snapshot.get('selected') || [],
    toFirestore: (input) => ({
      selected: input || [],
    }),
  });

  readonly selectedCountryIds = toSignal(
    docData(this.documentRef).pipe(map((data) => data || []))
  );

  add(countryId: string): Subscription {
    const newValue = [
      ...new Set([...(this.selectedCountryIds() || []), countryId]),
    ];

    return this.save(newValue);
  }

  remove(countryId: string): Subscription {
    const newValue = (this.selectedCountryIds() || []).filter(
      (item) => item !== countryId
    );

    return this.save(newValue);
  }

  private save(selected: string[]): Subscription {
    return from(setDoc(this.documentRef, selected))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
