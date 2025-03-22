import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private isPageLoadingSubject = new BehaviorSubject<boolean>(false);
  public isPageLoading$ = this.isPageLoadingSubject.asObservable();

  show() {
    this.loadingSubject.next(true);
  }

  hide() {
    this.loadingSubject.next(false);
  }

  showPageLoader() {
    this.isPageLoadingSubject.next(true);
  }
}
