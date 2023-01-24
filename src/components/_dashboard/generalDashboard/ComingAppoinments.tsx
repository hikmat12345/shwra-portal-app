import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { CSSProperties } from '@mui/system';
import LoadingTable from 'components/LoadingTable';
import Scrollbar from 'components/Scrollbar';

export default function ComingAppoinments({
  appointmentData,
  isLoading,
  style,

}: {
  appointmentData: any;
  isLoading?: boolean;
  style?: CSSProperties
}) {
  return (
    <>
      <Scrollbar
        sx={{
          width: '100%',
          maxWidth: '100%',
          overflowY: 'auto',
          overflowX: 'hidden',
          height: '300px',
          ...style
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
        <TableContainer sx={{ minWidth: '100%' }}>
          <Table>
            {isLoading && appointmentData.length === 0 ? (
              <LoadingTable />
            ) : (
              <TableBody>
                {appointmentData?.map((data: any, index: any) => {
                  return (
                    <TableRow key={data?.id}>
                      <TableCell
                        sx={{
                          fontSize: '12px',
                          color: '#637381'
                        }}
                      >
                        {data?.lawyerName}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: '12px'
                        }}
                      >
                        {data?.time}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: '12px'
                        }}
                      >
                        {data?.category}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            )}
            {/* {true && <EmptyTable message="لا يوجد مواعيد فى الوقت الحالى" />} */}
          </Table>
        </TableContainer>
      </Scrollbar>
    </>
  );
}
