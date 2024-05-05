import React, { useEffect, useState } from 'react';
// import { useQuery } from 'react-query';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Pagination, Container, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import LoadingPage from '../LoadingPage';
import BaseLayout from '../../layouts/BaseLayout';
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables';

type PaginationLinks = {
   next: string;
   previous: string;
};

type Pagination = {
   links: PaginationLinks;
   previous_page: number;
   next_page: number;
   start_index: number;
   end_index: number;
   total_entries: number;
   total_pages: number;
   page: number;
};

type Metadata = {
   additionalProp1: string;
   additionalProp2: string;
   additionalProp3: string;
};

type ResultItem = {
   id: number;
   __str__: string;
   metadata: Metadata;
   autor_related: string;
   object_id: number;
   nome: string;
   cargo: string;
   tipo: number;
   content_type: number;
   operadores: number[];
};

type APIResponse = {
   pagination: Pagination;
   results: ResultItem[];
};

const columns: string[] = [
   'id',
   'nome',
   'cargo'
];

function TesteDataTable() {
   const [data, setData] = useState<APIResponse>({} as APIResponse);
   const [page, setPage] = useState<number>(0);
   const [rowsPerPage, setRowsPerPage] = useState<number>(10)
   const [isLoading, setIsLoading] = useState<boolean>(true);
   useEffect(() => {
      console.log("teste");
      fetchData();
   }, [])

   const fetchData = async (page: number = 1, page_size: number = 10) => {
      try {
         const response = await axios.get<APIResponse>('https://sapl.al.ac.leg.br/api/base/autor/?', { params: { page, page_size } }); // Substitua pelo endpoint do seu servidor
         setData(response.data);
         setRowsPerPage(page_size)
         setPage(response.data.pagination.page - 1)
         setIsLoading(false);
         console.log(response.data)
      } catch (error) {
         console.log(error)
      }
   };

   const getEntidades = async (page: number = 1, page_size: number = 10) => {
      try {
         const response = await axios.get<APIResponse>('http://localhost/public/?', { params: { page, page_size } }); // Substitua pelo endpoint do seu servidor
         setData(response.data);
         setRowsPerPage(page_size)
         setPage(response.data.pagination.page - 1)
         setIsLoading(false);
         console.log(response.data)
      } catch (error) {
         console.log(error)
      }
   };

   if (isLoading) return <LoadingPage />;

   const options: MUIDataTableOptions = {
      responsive: "vertical",
      rowsPerPage: rowsPerPage,
      onColumnSortChange(changedColumn, direction) {
          console.log(changedColumn, direction)
      },
      rowsPerPageOptions: [10, 20, 30],
      onChangeRowsPerPage(numberOfRows) {
         setRowsPerPage(numberOfRows);
         fetchData(1, numberOfRows);
      },
      serverSide: true,
      //count, // Use total number of items
      count: data.pagination.total_entries, // Unknown number of items
      page: page,
      onChangePage(page) {
         console.log(page)
         setPage(page);
         fetchData(page + 1, rowsPerPage);
      },
   };

   return (
      <Container>
         <MUIDataTable
            title={
               <Typography variant="h6">
                  Autores
                  {isLoading && (
                     <CircularProgress
                        size={24}
                        style={{ marginLeft: 15, position: "relative", top: 4 }}
                     />
                  )}
               </Typography>
            }
            data={data.results}
            columns={columns}
            options={options}
         />
      </Container>
   );
}

export default TesteDataTable;