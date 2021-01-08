import {Entity, PrimaryGeneratedColumn, Column, Generated, BaseEntity} from 'typeorm';

@Entity()
export class Genre extends BaseEntity {

    @PrimaryGeneratedColumn()
    @Generated('uuid')
    id: string;

    @Column()
    name: string;

}
