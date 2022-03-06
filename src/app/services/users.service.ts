import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, EMPTY, map, Observable, retry } from 'rxjs';

import { User, UserResult } from '../model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private readonly http: HttpClient) { }

  public getApiUsers(searchTerm: string): Observable<User[]> {
    return this.http.get<UserResult>('zhttps://randomuser.me/api/?nat=us&results=5')
      .pipe(
        retry(3),
        map((apiResult: UserResult) => {
          return apiResult?.results || [];
        }),
        catchError((reason: Error) => {
          console.log('Error: ', reason.message);
          return EMPTY;
        })
      );
  }

  public getApiPaginatedUsers(page: number): Observable<User[]> {
    const result = this.http.get<UserResult>(`https://randomuser.me/api/?page=${page}&nat=us&results=5`)
       .pipe(
        map((apiResult: UserResult) => {
          return apiResult?.results || [];
        })
     );
    return result;
  }

  // public getStreamOfRandomUsers(searchTerm: string): Observable<User[]> {
  //   const result = interval(1000).pipe(
  //     switchMap((value: number) => {
  //       return this.getApiUsers(searchTerm);
  //     }),
  //     map((apiResult: UserResult) => {
  //       return apiResult.results || [];
  //     })
  //   );
  //   return result;
  // }

  // public getApiUsers2(searchTerm: string): Observable<User[]> {
  //   const result = this.http.get<UserResult>('https://randomuser.me/api/??nat=us&results=50')
  //     .pipe(
  //       switchMap((result: UserResult): Observable<User[]> => {
  //         const x = from(result.results || []);
  //         const y = of(result.results || []);
  //         return x;
  //       }),
  //     );
  //   return result;
  // }

  public getUsers(): Observable<User> {

    const observable = new Observable<User>((subscriber) => {
      subscriber.next({ gender: 'male', name: { title: 'Mr', first: 'John', last: 'Smith' } } as User);
      subscriber.next({ gender: 'female', name: { title: 'Mrs', first: 'Marianna', last: 'Montana' } } as User);
      subscriber.error(new Error('Something went wrong'));
      subscriber.complete();
    });

    const subscription = observable.subscribe({
      next: (user: User) => {
        console.log('NEXT | User', user);
      },
      error: (reason): void => {
        console.log('ERROR |', reason);
      },
      complete: (): void => {
        console.log('COMPLETE | getUsers: completed');
      }
    });

    return observable;
  }
}
