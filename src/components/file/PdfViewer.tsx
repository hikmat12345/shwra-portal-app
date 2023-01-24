import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

import PdfFile from './PdfFile';
import { useState, forwardRef } from 'react';
import { Document, Page } from 'react-pdf';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PdfViewer() {
  const [open, setOpen] = useState(false);

  const [numPages, setNumPages] = useState<any>(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess(data: any) {
    setNumPages(data.numPages);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <PdfFile src="hgf" onClick={handleClickOpen} />
      </Button>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        //TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              عرض المسنند
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              اغلاق
            </Button>
          </Toolbar>
        </AppBar>

        {/*
      <Document
        file="/testPdf.pdf"
        // file="https://arxiv.org/pdf/quant-ph/0410100.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>Page {pageNumber} of {numPages}</p>
*/}

        <Document
          file="/testPdf.pdf"
          // file="https://arxiv.org/pdf/quant-ph/0410100.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </Dialog>
    </div>
  );
}
