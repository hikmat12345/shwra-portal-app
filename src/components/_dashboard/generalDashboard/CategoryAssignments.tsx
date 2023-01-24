import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { Box } from '@mui/system';
import LoadingTable from 'components/LoadingTable';
import Scrollbar from 'components/Scrollbar';

import { useTheme } from '@mui/material/styles';

export default function CategoryAssignments({
  isLoading,
  categoryAssignments
}: {
  categoryAssignments: any;
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
            {isLoading && categoryAssignments.length === 0 ? (
              <LoadingTable />
            ) : (
              <TableBody>
                {categoryAssignments?.map((data: any) => {
                  return (
                    <TableRow key={data?.id}>
                      <TableCell
                        sx={{
                          fontSize: '12px',
                          color: '#637381'
                        }}
                      >
                        <Box
                          sx={{
                            padding: '5px',
                            borderRadius: '5px',
                            backgroundColor: '#f4f9fc',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {data?.icon}
                        </Box>
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: '12px',
                          color: '#637381'
                        }}
                      >
                        {data?.category}
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
