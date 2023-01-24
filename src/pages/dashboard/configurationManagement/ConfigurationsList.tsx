import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import {
  Card,
  Table,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  TableContainer,
  TablePagination,
  Button
} from '@mui/material';
import { Icon } from '@iconify/react';
import { RootState, useDispatch, useSelector } from '../../../redux/store';
import { PATH_DASHBOARD } from '../../../routes/paths';
import useSettings from '../../../hooks/useSettings';
import Page from '../../../components/Page';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import Scrollbar from '../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import LoadingTable from '../../../components/LoadingTable';
import EmptyTable from '../../../components/EmptyTable';
import { RequestListHead } from '../../../components/_dashboard/request/list';
import { getConfigurationsList, setDeleteConfiguration } from 'redux/slices/user';
import { Configuration } from '../../../../src/@types/user';
import ConfigurationMoreMenu from 'components/_dashboard/configuration/list/ConfigurationMoreMenu';
import DeleteConfigurationModal from './DeleteConfigurationModal';
import { useSnackbar } from 'notistack';

const TableLink = styled(Link)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1)
}));

const TABLE_HEAD = [
  { id: 'name', label: 'اسم الالإعداد', alignRight: false },
  { id: 'value', label: 'الوصف', alignRight: false },
  { id: 'type', label: 'الحالة', alignRight: false },
  { id: '' }
];

export default function ConfigurationsList() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { isLoading } = useSelector((state: RootState) => state.appointment);
  const { configurationsList, deleteConfigurationStatus } = useSelector(
    (state: RootState) => state.user
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedConfiguration, setSelectedConfiguration] = useState<{
    name?: string;
    id?: string | number;
  }>({
    name: '',
    id: ''
  });
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    dispatch(getConfigurationsList());
  }, [dispatch]);
  useEffect(() => {
    if (deleteConfigurationStatus?.status === 'success') {
      enqueueSnackbar('تم حذف الإعدادات بنجاح', {
        variant: 'success',
        onClose: () => {
          dispatch(setDeleteConfiguration({}));
        }
      });

      dispatch(getConfigurationsList());
    } else if (deleteConfigurationStatus?.status === 'error') {
      deleteConfigurationStatus?.error?.errors?.map((error: any) => {
        return enqueueSnackbar(error, {
          variant: 'error',
          onClose: () => {
            dispatch(setDeleteConfiguration({}));
          }
        });
      });
    }
  }, [deleteConfigurationStatus, enqueueSnackbar, dispatch]);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isRequestEmpty = !isLoading && configurationsList && configurationsList.length === 0;

  return (
    <Page>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={''}
          links={[]}
          action={
            <Button
              variant="contained"
              startIcon={<Icon icon={editFill} width={20} height={20} />}
              component={RouterLink}
              to={`${PATH_DASHBOARD.user.configurations}/edit`}
            >
              تعديل الإعدادات الحالية
            </Button>
          }
        />

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <RequestListHead headLabel={TABLE_HEAD} />

                {isLoading && configurationsList?.length === 0 ? (
                  <LoadingTable />
                ) : (
                  <TableBody>
                    {configurationsList &&
                      configurationsList
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((configuration: Configuration) => {
                          const { name, id, value, type, typeId } = configuration;

                          return (
                            <TableRow hover key={id} role="checkbox">
                              <TableCell padding="checkbox">
                                <Checkbox
                                // checked={isItemSelected}
                                // onClick={() => handleClick(name)}
                                />
                              </TableCell>
                              <TableCell align="left">
                                {name}
                                {/* <TableLink
                                  to={`${PATH_DASHBOARD.user.configurations}/${typeId}/details`}
                                >
                                  {name || '-'}
                                </TableLink> */}
                              </TableCell>

                              <TableCell align="left">{type}</TableCell>

                              <TableCell align="left">{value}</TableCell>
                              <TableCell
                                align="right"
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  flexDirection: 'row',
                                  flexWrap: 'nowrap'
                                }}
                              >
                                <ConfigurationMoreMenu
                                  onDelete={() => {
                                    setOpenDeleteModal(true);
                                    setSelectedConfiguration({
                                      name: name,
                                      id: id
                                    });
                                  }}
                                  configurationId={id}
                                />
                              </TableCell>
                            </TableRow>
                          );
                        })}
                  </TableBody>
                )}
                {isRequestEmpty && <EmptyTable message="لا يوجد ترتيبات فى الوقت الحالى" />}
              </Table>
            </TableContainer>
          </Scrollbar>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={configurationsList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, page) => setPage(page)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <DeleteConfigurationModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        configuration={selectedConfiguration}
      />
    </Page>
  );
}
