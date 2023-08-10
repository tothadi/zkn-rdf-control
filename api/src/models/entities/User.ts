import { Entity, ObjectId, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export default class Users {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    fullname: string;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    hash: string;

    @Column({ select: false })
    salt: string;
}
