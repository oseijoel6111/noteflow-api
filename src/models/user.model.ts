import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate} from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    username!: string

    @Column()
    email!: string

    @Column()
    password!: string

    @Column()
    isVerified!: boolean

    @Column()
    verificationCode!: string

    @Column()
    createdAt!: Date

    @Column()
    updatedAt!: Date

    @BeforeInsert()
    setDates():void {
        const now = new Date();
        this.createdAt = now;
        this.updatedAt = now;
        this.isVerified = false;
    }

    @BeforeUpdate()
    updateDates():void {
        this.updatedAt = new Date();
    }
}