// export as namespace IUser;

// export interface Item {
//   id: number;
//   username: string;
//   password: string;
// }


declare namespace IUser {
  export interface Item {
    id: number;
    name: string;
    password: string;
  }
}