import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User implements IUser.Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ select: false })
  password: string;
}

export default User;
