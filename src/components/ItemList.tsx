import { ReactElement } from 'react';

function ItemList<T>({ header, rows, mapper }: ItemListProps<T>) {
  return (
    <ul className='list bg-base-100 rounded-box shadow-md'>
      <li className='p-4 pb-2 text-xs opacity-60 tracking-wide'>{header}</li>
      {rows.map((row, index) => (
        <li key={index} className='list-row'>
          {mapper(row)}
        </li>
      ))}
    </ul>
  );
}

interface ItemListProps<T> {
  header?: string;
  rows: T[];
  mapper: (row: T) => ReactElement;
}

export default ItemList;
