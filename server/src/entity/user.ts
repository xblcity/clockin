import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User implements IUser.Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  openid: string;
}

export default User;
