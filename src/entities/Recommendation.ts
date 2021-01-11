import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable} from 'typeorm';
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
    youtube_link: string;

    @Column()
    score: number;

}
