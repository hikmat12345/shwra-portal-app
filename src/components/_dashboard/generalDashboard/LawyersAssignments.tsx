import moment from 'moment/moment';
import Label from 'components/Label';
import { useTheme } from '@mui/material/styles';
import LoadingTable from 'components/LoadingTable';
import Scrollbar from 'components/Scrollbar';
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

import { colorizeLawyerStatus } from 'utils/functions';
import { RequestListHead } from '../request/list';

import { lawyerStatusConst } from '../../../utils/constants';
import { useLawyerAssignmentsQuery } from '../../../queries/lawyer';
import EmptyTable from '../../EmptyTable';

export default function LawyersAssignments({
  TABLE_HEAD
}: {
  TABLE_HEAD: { id: string; label: string; alignRight: boolean }[];
}) {
  const theme = useTheme();
  const { data, isLoading } = useLawyerAssignmentsQuery();
  return (
    <>
      <Scrollbar
        sx={{
          width: '100%',
          maxWidth: '100%',
          overflowY: 'auto',
          overflowX: 'hidden',
          height: '300px'
        }}
        // @ts-ignore
        scrollStyles={{
          bar: {
            backgroundColor: '#d49e24'
          },
          track: {
            backgroundColor: '#F4F6F8',
            width: 8
          }
        }}
      >
        <TableContainer sx={{ minWidth: '100%', margin: '1rem 0.5rem' }}>
          <Table>
            <RequestListHead headLabel={TABLE_HEAD} />

            {isLoading ? (
              <LoadingTable />
            ) : data?.length ? (
              <TableBody>
                {data?.map((item) => {
                  return (
                    <TableRow key={item?.lawyerId}>
                      <TableCell
                        sx={{
                          fontSize: '12px',
                          color: '#637381'
                        }}
                      >
                        {item?.lawyerName}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: '12px'
                        }}
                      >
                        {item?.totalAppointments}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: '12px'
                        }}
                      >
                        {/*{item?.lastAppointment}*/}
                        {moment(item.lastAppointment).locale('en').format('hh:mm DD-MM-YYYY')}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: '12px'
                        }}
                      >
                        {Intl.NumberFormat('ar-AE', {
                          style: 'currency',
                          currency: 'SAR'
                        }).format(item.income)}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: '12px'
                        }}
                      >
                        <Label
                          sx={{
                            width: '80%',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                          color={colorizeLawyerStatus(item?.lawyerStatusId)}
                        >
                          {lawyerStatusConst[item.lawyerStatus]}
                        </Label>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            ) : (
              <EmptyTable message="لا يوجد تعيينات فى الوقت الحالى" />
            )}
            {/* {true && <EmptyTable message="لا يوجد مواعيد فى الوقت الحالى" />} */}
          </Table>
        </TableContainer>
      </Scrollbar>
    </>
  );
}
