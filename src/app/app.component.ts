import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { BehaviorSubject, debounceTime, distinctUntilChanged, EMPTY, filter, map, Observable, Subscription, switchMap } from 'rxjs';

import { User } from './model';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'demo-angular';
  search = new FormControl('');
  search$ = new Subscription();
  users$: Observable<User[]> = EMPTY;

  usersSubscription$: Subscription = new Subscription();
  currentPage$ = new BehaviorSubject<number>(1);

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.trackSearchChanges();
    // this.loadUsersPaginated();
  }

  private trackSearchChanges(): void {
    this.usersSubscription$ = this.search.valueChanges.pipe(
      map((searchTerm: string) => {
        return searchTerm?.trim() && '';
      }),
      debounceTime(500),
      distinctUntilChanged(),
      filter((searchTerm: string) => {
        return !searchTerm.startsWith('*');
      }),
      switchMap((searchTerm: string) => {
        this.users$ = this.usersService.getApiUsers(searchTerm);
        return this.users$;
      })
    )
    .subscribe();
  }

  private loadUsersPaginated(): void {
    this.users$ = this.currentPage$.pipe(
      switchMap((currentPage) =>
        this.usersService.getApiPaginatedUsers(currentPage)
      ),
    );
  }

  public previousPage(): void {
    if (this.currentPage$.value > 1) {
      this.currentPage$.next(this.currentPage$.value - 1);
    }
  }

  public nextPage(): void {
    this.currentPage$.next(this.currentPage$.value + 1);
  }

  // private getAllUsers(): void {
  //   this.usersService.getUsers().pipe(
  //     switchMap((user: User): string => {
  //       if (user) {
  //         return user.firstName;
  //       }
  //       return '';
  //     }),
  //     catchError((reason): Observable<never> => {
  //       console.log(reason);
  //       return EMPTY;
  //     }),
  //     retry(2),
  //     share()
  //   ).subscribe();
  //   // this.getUsers$ = this.usersService.getUsers()
  //   //   .pipe(switchMap((users: User[]) => {
  //   //     this.users = users;
  //   //   }))
  //   //   .subscribe();
  // }

  public stopSubscription(): void {
    if (this.usersSubscription$ && !this.usersSubscription$.closed) {
      this.usersSubscription$.unsubscribe();
    }
  }

  public stopTimer(): void {
    return;
  }
}
