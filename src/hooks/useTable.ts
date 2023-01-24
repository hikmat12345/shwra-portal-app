import {  useState } from 'react'


export default function useTable(){

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<string[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(8);


  const changeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const changePage = (newPage: number) => {
    setPage(newPage);
  };


  
  return {
    page,
    order,
    selected,
    rowsPerPage,
    changeRowsPerPage,
    changePage
  }
}