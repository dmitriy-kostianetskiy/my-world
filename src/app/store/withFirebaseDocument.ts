import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DocumentReference, docData, setDoc } from '@angular/fire/firestore';
import { patchState, signalStoreFeature, withHooks, withMethods, withState } from '@ngrx/signals';

export type DocumentRefFactory<T> = DocumentReference<T> | (() => DocumentReference<T>);
export type DocumentState<T> = { documentRef: DocumentReference<T> | undefined; data: T | undefined };

export function withFirebaseDocument<T>(documentRefFactory: DocumentRefFactory<T>) {
  return signalStoreFeature(
    withState<DocumentState<T>>({ documentRef: undefined, data: undefined }),
    withHooks({
      onInit(store) {
        const documentRef = createDocumentRef(documentRefFactory);

        patchState(store, () => ({ documentRef }));

        docData(documentRef)
          .pipe(takeUntilDestroyed())
          .subscribe({
            next: data => patchState(store, () => ({ data })),
          });
      },
    }),
    withMethods(store => ({
      async set(newValue: T) {
        const documentRef = store.documentRef();

        if (!documentRef) {
          return;
        }

        await setDoc(documentRef, newValue);
      },
    })),
  );
}

function createDocumentRef<T>(documentRefFactory: DocumentRefFactory<T>): DocumentReference<T> {
  if (typeof documentRefFactory === 'function') {
    return documentRefFactory();
  }

  return documentRefFactory;
}
