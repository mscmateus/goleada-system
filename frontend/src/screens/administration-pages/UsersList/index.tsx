import { useCallback, useEffect, useMemo, useState } from "react";
import withReactContent from "sweetalert2-react-content";
import UsuarioService from "../../../services/user.service";
import Swal from "sweetalert2";
import DataTable, { TableColumn } from "react-data-table-component";
import { Box, Button, Container, Grid, TextField } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UserListItem from "../../../models/listDto/userListItem";
import { SearchPaper } from "../../../components/CardContainer";

function UsersList() {
    const [data, setData] = useState<UserListItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [busca, setBusca] = useState('');
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        fetchData(busca, 0, perPage);
    }, [])

    const fetchData = async (busca: string = '', page: number = 0, size: number = 10, sort: string = '', direction: 'ASC' | 'DESC' | '' = '') => {
        let resposta = await UsuarioService.buscaUsuarios(busca, sort, page ? (page - 1).toString() : '', size ? size.toString() : '', direction);
        setData(resposta.content);
        setTotalRows(resposta.totalElements);
        setLoading(false);
    }

    function formatCpf(value: string) {
        return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    const handleDelete = useCallback(
        (row: UserListItem) => async () => {
            MySwal.fire({
                title: `Você realmente deseja excluir o usuário ${row.nomeCompleto}?`,
                showConfirmButton: false,
                showCancelButton: true,
                showDenyButton: true,
                allowOutsideClick: false,
                denyButtonText: `Excluir`,
            }).then((result: any) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isDenied) {
                    setLoading(true)
                    UsuarioService.deletaUsuario(row.id)
                        .then((e: any) => {
                            setLoading(false)
                            fetchData(busca, currentPage, perPage)
                            MySwal.fire('Sucesso', 'Usuário excluído com sucesso!', 'success')
                        })
                        .catch((e) => {
                            Swal.fire('Erro ao excluir', e, 'error')
                            setLoading(false)
                        })
                }
            })
        },
        [currentPage, perPage, totalRows]
    );

    const columns: TableColumn<UserListItem>[] = useMemo<any>(
        () => [
            {
                name: "Id",
                selector: (usuario: UserListItem) => usuario.id,
                sortable: true
            },
            {
                name: "Nome Completo",
                selector: (usuario: UserListItem) => usuario.nomeCompleto,
                sortable: true
            },
            {
                name: "CPF",
                selector: (usuario: UserListItem) => usuario.cpf,
                sortable: false,
                cell: (usuario: UserListItem) => formatCpf(usuario.cpf)
            },
            // {
            //     name: "Administrador",
            //     selector: (usuario: UserListItem) => usuario.administrador,
            //     sortable: false,
            //     cell: (usuario: UserListItem) => usuario.administrador ? <CheckCircleIcon color="action"></CheckCircleIcon> : <RadioButtonUncheckedIcon color="action"></RadioButtonUncheckedIcon>
            // },
            {
                // eslint-disable-next-line react/button-has-type
                cell: (usuario: UserListItem) => <Grid container spacing={1} sx={{ width: '100%' }}>
                    <Grid item xs={12} md={6} lg={6}><Button variant='contained'><EditIcon></EditIcon></Button></Grid >
                    <Grid item xs={12} md={6} lg={6}><Button variant='contained' color='error' onClick={handleDelete(usuario)}><DeleteIcon></DeleteIcon></Button></Grid >
                </Grid >
            }
        ],
        [handleDelete]
    );

    const handlePageChange = (page: number) => {
        fetchData(busca, page, perPage);
        setCurrentPage(page);
    };

    const handlePerRowsChange = async (newPerPage: number, page: number) => {
        fetchData(busca, page, newPerPage);
        setPerPage(newPerPage);
    };

    const handlerPesquisa = async () => {
        fetchData(busca, currentPage, perPage);
    }

    return (
        <Container>
            <SearchPaper>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={4}>
                        <TextField id="outlined-basic" label="Buscar por Nome" variant="outlined" fullWidth onChange={(e) => setBusca(e.target.value)} onKeyDown={(ev) => {
                            if (ev.key === 'Enter') {
                                handlerPesquisa()
                            }
                        }} />
                    </Grid>
                </Grid>
                <Box sx={{ marginBlock: '0.5em', display: 'flex', justifyContent: 'right' }}>
                    <Button variant='contained' onClick={handlerPesquisa}>Buscar</Button>
                </Box>
            </SearchPaper>
            <SearchPaper>
                <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                    <Button variant='contained'>Novo Usuário</Button>
                </Box>
                <DataTable
                    columns={columns}
                    data={data}
                    progressPending={loading}
                    pagination
                    paginationServer
                    paginationPerPage={perPage}
                    paginationTotalRows={totalRows}
                    paginationDefaultPage={currentPage}
                    onColumnOrderChange={(e: any) => console.log(e)}
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={handlePageChange}
                    selectableRows={false}
                // onSelectedRowsChange={({ selectedRows }) => console.log(selectedRows)}
                />
            </SearchPaper>
        </Container>
    );

}

export default UsersList;