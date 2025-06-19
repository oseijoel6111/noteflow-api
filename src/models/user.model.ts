import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToOne, OneToMany, JoinColumn} from 'typeorm'

@Entity({name: 'users'})
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

    @OneToMany(()=> PasswordResetCode, (resetCode)=> resetCode.user)
    passwordResetCodes!: PasswordResetCode[]
}

@Entity({name: 'password_reset_codes'})
export class PasswordResetCode{
    @PrimaryGeneratedColumn()
    id!: number
    
    @Column()
    resetCode!: number

    @Column()
    expiresAt!: Date

    @Column()
    isUsed!: boolean

    @Column()
    createdAt!: Date

    @Column()
    updatedAt!: Date

    @BeforeInsert()
    setDates():void {
        const now = new Date();
        this.createdAt = now;
        this.updatedAt = now;
        this.isUsed = false;
    }

    @BeforeUpdate()
    updateDates():void {
        this.updatedAt = new Date();
    }

    @OneToOne(()=> User, (user) => user.passwordResetCodes)
    @JoinColumn({name: 'userId'})
    user!: User
}
