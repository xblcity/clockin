import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User implements IUser.Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ select: false })
  password: string;
}

export default User;
