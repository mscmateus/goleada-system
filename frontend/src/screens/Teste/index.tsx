import React, { useEffect, useState } from 'react';
// import { useQuery } from 'react-query';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Pagination, Container } from '@mui/material';
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import LoadingPage from '../../components/LoadingPage';
import BaseLayout from '../../layouts/BaseLayout';

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

const columns: GridColDef[] = [
   { field: 'id', headerName: 'ID', width: 70 },
   { field: 'nome', headerName: 'Nome', width: 200 },
   { field: 'cargo', headerName: 'Cargo', width: 150 },
];

function DataTable() {
   const [data, setData] = useState<APIResponse>({} as APIResponse);
   const [isLoading, setIsLoading] = useState<boolean>(true);
   useEffect(() => {
      console.log("teste");
      fetchData();
   }, [])

   const fetchData = async (page: number = 1, page_size: number = 10) => {
      try {
         const response = await axios.get<APIResponse>('https://sapl.al.ac.leg.br/api/base/autor/?', { params: { page, page_size } }); // Substitua pelo endpoint do seu servidor
         console.log(response)
         setData(response.data);
         setIsLoading(false);
      } catch (error) {
         console.log(error)
      }
   };
   if (isLoading) return <LoadingPage />;

   return (
      <Container>
         <TableContainer>
            <Table>
               <TableHead>
                  <TableRow>
                     <TableCell>ID</TableCell>
                     <TableCell>Nome</TableCell>
                     <TableCell>Cargo</TableCell>
                     {/* Adicione outras colunas aqui */}
                  </TableRow>
               </TableHead>
               <TableBody>
                  {data.results.map((item) => (
                     <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.nome}</TableCell>
                        <TableCell>{item.cargo}</TableCell>
                        {/* Renderize outras colunas aqui */}
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
         {/* Adicione a paginação aqui */}
         <Pagination
            count={data.pagination.total_pages} // Número total de páginas
            page={data.pagination.page} // Página atual (ajuste conforme necessário)
            onChange={(event, page) => {
               fetchData(page)
            }}
         />
      </Container>
   );
}

export default DataTable;