import { Transaction } from 'src/transactions/domain/entities/transaction';
import { User } from 'src/users/infra/entities/user.entity';
import { TimestampedEntity } from 'src/utils/infra/entities/timestamped.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TransactionEntity extends TimestampedEntity implements Transaction {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column('numeric', { precision: 12, scale: 2 })
  amount: number;

  @ManyToOne(() => User, (user) => user.transactions, { nullable: false })
  user: User;

  @Column()
  to: string; // establishment; TODO: add establishment entity

  @Column('varchar', { nullable: true, length: 255 })
  description: string;

}
