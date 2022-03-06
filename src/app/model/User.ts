export type Gender = 'male' | 'female';

export interface User {
  gender: Gender;
  name: {
    title: string;
    first: string;
    last: string;
  },
  location: {
    street: {
      number: number;
      name: string;
    };
  },
  email: string;
}
