import {Entity, PrimaryGeneratedColumn, Column, Generated, BaseEntity, ManyToMany, JoinTable} from 'typeorm';
import { Genre } from './Genre';

@Entity()
export class Recommendation extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToMany(() => Genre)
    @JoinTable()
    genres: Genre[];

    @Column()
    youtubeLink: string;

    @Column()
    score: number;

}
