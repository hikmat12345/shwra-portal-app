import { Table, TableBody, TableCell, TableContainer, TableRow, Avatar } from '@mui/material';

import LoadingTable from 'components/LoadingTable';
import Scrollbar from 'components/Scrollbar';

export default function Messages({
  isLoading,
  allMessages
}: {
  allMessages: any;
  isLoading: boolean;
}) {
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
        <TableContainer sx={{ minWidth: '100%' }}>
          <Table>
            {isLoading && allMessages.length === 0 ? (
              <LoadingTable />
            ) : (
              <TableBody>
                {allMessages?.map((data: any, index: any) => {
                  return (
                    <TableRow key={data?.id}>
                      <TableCell
                        sx={{
                          fontSize: '12px',
                          color: '#637381'
                        }}
                      >
                        <Avatar
                          alt={`${data?.img} img`}
                          src={data?.img}
                          sx={{
                            width: 30,
                            height: 30,
                            zIndex: 11
                          }}
                        />
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: '12px',
                          color: '#637381'
                        }}
                      >
                        {data?.user_name}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: '12px'
                        }}
                      >
                        {data?.number}
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
