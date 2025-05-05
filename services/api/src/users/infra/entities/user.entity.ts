import { TransactionEntity } from "src/transactions/infra/entities/transaction.entity"
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    email: string

    @Column()
    password: string

    @OneToMany(type => TransactionEntity, transaction => transaction.user)
    transactions: TransactionEntity[]

}
