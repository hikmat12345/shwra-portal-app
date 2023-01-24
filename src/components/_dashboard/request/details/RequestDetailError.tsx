import {
  Alert,
  AlertTitle
} from '@mui/material';

type RequestDetailErrorProps = {
  error?: any;
}

export default function RequestDetailError({ error }: RequestDetailErrorProps) {

    return (
      <Alert severity="error">
        <AlertTitle> حدث خظأ ما</AlertTitle>
         {error}
      </Alert>
    )
}
