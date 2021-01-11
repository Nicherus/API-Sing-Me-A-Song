import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from 'typeorm';

@Entity()
export class Genre extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

}
