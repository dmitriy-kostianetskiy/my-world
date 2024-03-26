import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

import { Firestore, doc, setDoc, docData } from '@angular/fire/firestore';
import { Subscription, from, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class CountriesService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly firestore = inject(Firestore);
  private readonly authService = inject(AuthService);

  private readonly documentRef = this.createDocumentRef(this.authService.uid());

  readonly selectedCountries$ = docData(this.documentRef).pipe(
    map((data) => data || [])
  );

  readonly selectedCountries = toSignal(this.selectedCountries$, {
    initialValue: [],
  });

  set(selectedCountries: string[]): Subscription {
    return from(setDoc(this.documentRef, selectedCountries))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  private createDocumentRef(uid: string | undefined) {
    if (!uid) {
      throw new Error('You are not authorized');
    }

    return doc(this.firestore, `my-countries/${uid}`).withConverter<string[]>({
      fromFirestore: (snapshot) => snapshot.get('selected') || [],
      toFirestore: (input) => ({
        selected: input || [],
      }),
    });
  }
}
