import React, { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
} from '@tanstack/react-table';
import { Song } from '../../types/song.types';
import './SongTable.css';

const columnHelper = createColumnHelper<Song>();

interface SongTableProps {
  songs: Song[];
  loading?: boolean;
}

export const SongTable: React.FC<SongTableProps> = ({ songs, loading }) => {
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'band', desc: false },
  ]);

  const columns = useMemo(
    () => [
      columnHelper.accessor('band', {
        header: 'להקה',
        cell: (info) => (
          <span className="band-cell" title={info.getValue()}>
            {info.getValue()}
          </span>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor('title', {
        header: 'שם השיר',
        cell: (info) => (
          <span className="title-cell" title={info.getValue()}>
            {info.getValue()}
          </span>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor('year', {
        header: 'שנה',
        cell: (info) => (
          <span className="year-cell">
            {info.getValue() || 'לא זמין'}
          </span>
        ),
        enableSorting: true,
      }),
    ],
    []
  );

  const table = useReactTable({
    data: songs,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (songs.length === 0 && !loading) {
    return (
      <div className="empty-state">
        <h3>לא נמצאו שירים</h3>
        <p>העלה קובץ CSV כדי להתחיל</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="song-table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="header-row">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="header-cell"
                    onClick={header.column.getToggleSortingHandler()}
                    style={{ cursor: header.column.getCanSort() ? 'pointer' : 'default' }}
                  >
                    <div className="header-content">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <span className="sort-icon">
                          {header.column.getIsSorted() === 'asc' ? ' ↑' : 
                           header.column.getIsSorted() === 'desc' ? ' ↓' : ' ↕'}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <tr 
                key={row.id} 
                className={`body-row ${index % 2 === 0 ? 'even-row' : 'odd-row'}`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="body-cell">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};