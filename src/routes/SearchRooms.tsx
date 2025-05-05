import { useState } from 'react';
import RouteContainer from '../components/RouteContainer';
import SearchBar from '../components/search/SearchBar';
import lunr from 'lunr';

interface Building {
  id: string;
  name: string;
  address: string;
  rooms: Room[];
}

interface Room {
  id: string;
  name: string;
  purpose: string;
  floor: string;
  seats: number;
  tags: Tag[];
}

// only for time being to work with lunr
class PrintableRoom implements Room {
  id: string;
  name: string;
  purpose: string;
  floor: string;
  seats: number;
  tags: Tag[];

  constructor(room: Room) {
    this.id = room.id;
    this.name = room.name;
    this.purpose = room.purpose;
    this.floor = room.floor;
    this.seats = room.seats;
    this.tags = room.tags;
  }

  toString() {
    return this.name + ' ' + this.purpose + ' ' + this.floor;
  }
}

enum TagType {
  QUANTITY,
  BOOLEAN,
}

interface Tag {
  name: string;
  type: TagType;
  data: number;
}

type Entity = Building | Room;

const indexData: Entity[] = [
  new PrintableRoom({
    id: 'r1',
    name: 'D-17 1.38',
    purpose: 'wykład',
    floor: 'parter',
    seats: 280,
    tags: [
      { name: 'rzutnik', type: TagType.QUANTITY, data: 1 },
      { name: 'tablica', type: TagType.QUANTITY, data: 2 },
    ],
  }),
  new PrintableRoom({
    id: 'r2',
    name: 'D-17 2.41',
    purpose: 'wykład',
    floor: 'parter',
    seats: 180,
    tags: [
      { name: 'rzutnik', type: TagType.QUANTITY, data: 1 },
      { name: 'tablica', type: TagType.QUANTITY, data: 2 },
    ],
  }),
  new PrintableRoom({
    id: 'r3',
    name: 'D-17 3.27a',
    purpose: 'ćw. aud.',
    floor: 'parter',
    seats: 30,
    tags: [
      { name: 'rzutnik', type: TagType.QUANTITY, data: 1 },
      { name: 'tablica', type: TagType.QUANTITY, data: 1 },
    ],
  }),
  new PrintableRoom({
    id: 'r4',
    name: 'D-17 3.27b',
    purpose: 'ćw. aud.',
    floor: 'parter',
    seats: 30,
    tags: [
      { name: 'rzutnik', type: TagType.QUANTITY, data: 1 },
      { name: 'tablica', type: TagType.QUANTITY, data: 1 },
    ],
  }),
  new PrintableRoom({
    id: 'r5',
    name: 'D-17 3.27c',
    purpose: 'ćw. aud.',
    floor: 'parter',
    seats: 30,
    tags: [
      { name: 'rzutnik', type: TagType.QUANTITY, data: 1 },
      { name: 'tablica', type: TagType.QUANTITY, data: 1 },
    ],
  }),
  new PrintableRoom({
    id: 'r6',
    name: 'D-17 4.23',
    purpose: 'lab. sieciowe',
    floor: 'parter',
    seats: 20,
    tags: [
      { name: 'rzutnik', type: TagType.QUANTITY, data: 2 },
      { name: 'tablica', type: TagType.QUANTITY, data: 1 },
      { name: 'komputer_student', type: TagType.QUANTITY, data: 20 },
      { name: 'router_student', type: TagType.QUANTITY, data: 10 },
      { name: 'switch_student', type: TagType.QUANTITY, data: 10 },
    ],
  }),
  new PrintableRoom({
    id: 'r7',
    name: 'D-17 4.28',
    purpose: 'lab. komputerowe',
    floor: 'parter',
    seats: 20,
    tags: [
      { name: 'rzutnik', type: TagType.QUANTITY, data: 1 },
      { name: 'tablica', type: TagType.QUANTITY, data: 1 },
      { name: 'komputer_student', type: TagType.QUANTITY, data: 20 },
    ],
  }),
  new PrintableRoom({
    id: 'r8',
    name: 'D-10 1.1',
    purpose: 'wykład',
    floor: 'I piętro',
    seats: 140,
    tags: [{ name: 'rzutnik', type: TagType.QUANTITY, data: 1 }],
  }),
  new PrintableRoom({
    id: 'r9',
    name: 'D-10 1.2',
    purpose: 'wykład',
    floor: 'I piętro',
    seats: 140,
    tags: [{ name: 'rzutnik', type: TagType.QUANTITY, data: 1 }],
  }),
  new PrintableRoom({
    id: 'r10',
    name: 'D-10 3.1',
    purpose: 'lab. fizyczne',
    floor: 'II piętro',
    seats: 40,
    tags: [
      {
        name: 'stanowisko_laser_czerwony',
        type: TagType.QUANTITY,
        data: 1,
      },
      {
        name: 'stanowisko_test_halotronu',
        type: TagType.QUANTITY,
        data: 2,
      },
      {
        name: 'stanowisko_spektrometr_optyczny',
        type: TagType.QUANTITY,
        data: 1,
      },
      {
        name: 'stanowisko_test_konensatora',
        type: TagType.QUANTITY,
        data: 3,
      },
    ],
  }),
  new PrintableRoom({
    id: 'r11',
    name: 'C-7 3.9',
    purpose: 'ćw. aud. / lektorat',
    floor: 'parter',
    seats: 28,
    tags: [
      { name: 'klimatyzacja', type: TagType.BOOLEAN, data: 1 },
      { name: 'rzutnik', type: TagType.QUANTITY, data: 1 },
    ],
  }),
  new PrintableRoom({
    id: 'r12',
    name: 'C-7 1.38',
    purpose: 'ćw. aud. / lektorat',
    floor: 'parter',
    seats: 28,
    tags: [
      { name: 'klimatyzacja', type: TagType.BOOLEAN, data: 1 },
      { name: 'rzutnik', type: TagType.QUANTITY, data: 1 },
    ],
  }),
  {
    id: 'b1',
    name: 'D-17',
    address: 'ul. Kawiory 7',
    rooms: [],
  },
  {
    id: 'b2',
    name: 'D-10',
    address: 'ul. Reymonta 33',
    rooms: [],
  },
  {
    id: 'b3',
    name: 'C-7',
    address: 'ul. Czarnowiejska 10',
    rooms: [],
  },
];

function indexBuilder(this: lunr.Builder) {
  this.ref('id');
  this.field('name');

  for (const entity of indexData) {
    this.add(entity);
  }
}

const index = lunr(indexBuilder);

function SearchRooms() {
  const [results, setResults] = useState<lunr.Index.Result[]>([]);

  return (
    <RouteContainer>
      <div className='grid grid-cols-[1fr_4fr_1fr]'>
        <div></div>
        <div className='min-h-80'>
          <SearchBar
            onUpdate={query => {
              if (query.length > 0) setResults(index.search(query + '~1'));
            }}
          />
          <div>
            {results.map((result, index) => {
              return (
                <div key={index}>
                  {result.ref} @ {result.score} :{' '}
                  {indexData.find(e => e.id == result.ref)?.name}
                </div>
              );
            })}
          </div>
        </div>
        <div></div>
      </div>
    </RouteContainer>
  );
}

export default SearchRooms;
