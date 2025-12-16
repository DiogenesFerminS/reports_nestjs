import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Continent {
  AFRICA = 'Africa',
  ANTARCTICA = 'Antarctica',
  ASIA = 'Asia',
  EUROPE = 'Europe',
  OCEANIA = 'Oceania',
  NORTH_AMERICA = 'North America',
  SOUTH_AMERICA = 'South Americas',
}

@Entity({ name: 'countries' })
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  iso2: string;

  @Column({ type: 'text', nullable: false })
  iso3: string;

  @Column({ type: 'text', nullable: true })
  local_name: string | null;

  @Column({
    type: 'enum',
    enum: Continent,
    nullable: true,
  })
  continent: string | null;
}
