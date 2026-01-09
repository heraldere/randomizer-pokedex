import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokedexService } from './pokedex.service';
import { merge, Observable, of, timer } from 'rxjs';
import { debounce, debounceTime, map, skip, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-pokedex';
  dexService: PokedexService;
  readonly delayedLoading$!: Observable<boolean>;

  constructor(dexService: PokedexService) {
    this.dexService = dexService;
    this.delayedLoading$ = this.dexService.loadingStatus.pipe(
      switchMap((isLoading) => {
        if (isLoading) {
          return timer(100).pipe(map(() => true)); // emit immediately
        } else {
          return timer(500).pipe(map(() => false)); // delay false by 500ms
        }
      })
    );
  }

  ngOnInit(): void {
    window.addEventListener('beforeunload', () => this.dexService.cacheDex());
    this.dexService.initializeData();

    merge(
      this.dexService.dexChanges,
      this.dexService.individualChanges
    )
      .pipe(skip(1), debounceTime(10000))
      .subscribe(() => {
        this.dexService.cacheDex();
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('beforeunload', () =>
      this.dexService.cacheDex()
    );
  }
}
