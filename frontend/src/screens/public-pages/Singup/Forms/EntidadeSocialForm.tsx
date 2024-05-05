import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import InputField from "../../../../components/FormikFields/InputField";
import EntidadeSocialService from "../../../../services/entidade-social.service";
import { DataGrid, GridColDef, GridValueGetterParams, nlNL } from '@mui/x-data-grid';
import MUIDataTable, { MUIDataTableColumnDef, MUIDataTableOptions } from "mui-datatables";
import Pageable from "../../../../models/pageable";
import EntidadeSocialListItem from "../../../../models/lista/entidadeSocialListItem";
import { Box, Button, FormControl, FormHelperText, Paper } from "@mui/material";
import { useFormikContext } from "formik";



export default function EntidadeSocialForm(props: any) {
  const formikContext = useFormikContext<any>();
  const [content, setContent] = useState<EntidadeSocialListItem[]>([])
  const [entidadesPage, setEntidadesPage] = useState<Pageable<EntidadeSocialListItem>>({} as Pageable<EntidadeSocialListItem>)
  entidadesPage.content = []
  const columns: MUIDataTableColumnDef[] = [
    { name: "nome", label: "Nome" },
    { name: 'classe', label: 'Classe', options: { customBodyRender: (value) => (value.titulo) } },
    { name: 'descricao', label: 'Descrição', options: { sort: false } },
    {
      name: 'id', label: 'Selecionar', options: {
        sort: false,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <Button variant="contained" onClick={() => {
              console.log(dataIndex)
              console.log(rowIndex)
              console.log(content)
              handlerRowSelect(content[dataIndex])
            }}>
              Selecionar
            </Button>
          );
        }
      }
    }
  ];
  const {
    formField: {
      entidadeSocialId
    }
  } = props;

  const options: MUIDataTableOptions = {
    filterType: 'checkbox',
    filter: false,
    print: false,
    download: false,
    selectableRows: "none",
    rowsPerPage: entidadesPage.size,
    rowsPerPageOptions: [10, 20, 30],
    count: entidadesPage.totalElements,
    onChangePage: (currentPage) => currentPage ? getEntidades('', currentPage, entidadesPage.size) : () => { },
    pagination: true,
    onSearchChange: busca => busca ? getEntidades(busca) : () => { },
    onSearchClose: () => getEntidades(),
    onChangeRowsPerPage: size => size ? getEntidades('', entidadesPage.number, size) : () => { }
  };

  useEffect(() => {
    getEntidades()
  }, [])

  const getEntidades = async (busca: string = '', page: number = 0, size: number = 10, sort: string = '', direction: 'ASC' | 'DESC' | '' = '') => {
    let resposta = await EntidadeSocialService.buscaEntidadesSociais(busca, '', sort, page ? page.toString() : '', size ? size.toString() : '', direction);
    console.log(resposta)
    setEntidadesPage(resposta)
    setContent(resposta.content)
  }

  const handlerRowSelect = (entidade: EntidadeSocialListItem) => {
    formikContext.setFieldValue('entidadeSocialId', entidade.id);
    formikContext.setFieldValue('entidadeSocialNome', entidade.nome);
    formikContext.setFieldValue('entidadeSocialDescricao', entidade.descricao);

    console.log(formikContext.values['entidadeSocialId'])
    console.log(formikContext.values['entidadeSocialNome'])
    console.log(formikContext.values['entidadeSocialDescricao'])
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Entidade Social
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
        Selecione uma entidade social para concorrer aos prêmios com você
      </Typography>
      <Typography variant="h6" gutterBottom>
        Entidade Social Selecionada *:
      </Typography>
      {formikContext.values['entidadeSocialId'] !== '' ? (
        <Paper sx={{ py: 2, px: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            {formikContext.values['entidadeSocialNome']}
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
            {formikContext.values['entidadeSocialDescricao']}
          </Typography>
        </Paper>
      ) : (
        <Box sx={{ mb: 3 }}>
          <Paper sx={{ py: 2, px: 2 }}>
            <Typography variant="h6" gutterBottom>
              Nenhuma selecionada
            </Typography>
          </Paper>
          <FormHelperText sx={{ color: theme => theme.palette.error.main }}>
            Selecione uma entidade social
          </FormHelperText>
        </Box>
      )}
      <MUIDataTable
        title={"Entidade Sociais"}
        data={content}
        columns={columns}
        options={options}
      />
    </React.Fragment>
  );
}