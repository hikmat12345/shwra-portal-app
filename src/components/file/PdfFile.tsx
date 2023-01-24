import { useState } from 'react';
import { Document, Page } from 'react-pdf';
// material
import { Box } from '@mui/material';
import { styled } from '@mui/system';


// ----------------------------------------------------------------------


const PDFprevew = styled('div')(({ theme }) => ({

  '& .react-pdf__Page canvas':{
    height: '120px !important',
    width: '180px !important',
   }
  
}))


const ShapeContainer = styled('div')({
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 3,
    height: 20,
    width: 20,
    borderRight: 'solid 20px transparent',
    '&::before': {
        content: "''",
        fontsize: 0,
        position: 'absolute',
        bottom: 19,
        right: -20,
        width: 20,
        borderTop: '1px #e5e5e5 solid',
        zIndex: 4,
        opacity: 0.2
    },

    '&::after': {
        content: "''",
        fontSize: 0,
        position: 'absolute',
        bottom: 0,
        right: -20,
        background: 'no-repeat url(https://ssl.gstatic.com/mail/sprites/newattachmentcards-ff2ce2bea04dec2bf32f2ebbfa0834ff.png) -41px -88px',
        height: 20,
        width: 40,
        zIndex: 4
    }

});

const Shape = styled('div')({
    borderColor: '#fff',
    opacity: 0.5,
    position: 'absolute',
    width: 0,
    height: 0,
    bottom: 0,
    right: -20,
    borderWidth: 10,
    borderStyle: 'solid',
    zIndex: 3
})


type PdfFileProps = {
   src: string;
   onClick: VoidFunction;
}

export default function PdfFile({ src }: PdfFileProps ) {

  const [ numPages, setNumPages ] = useState<any>(null);
  const [ pageNumber, setPageNumber ] = useState(1);

  function onDocumentLoadSuccess(data: any) {
    setNumPages(data.numPages);
  }
  

  return (
    <Box
        sx={{
            width: 180,
            height: 120,
           // m: 3,
            borderRadius: '5px',
            backgroundColor: '#f1eeec',
            position: 'relative',
            '&:hover': {
            backgroundColor: 'primary.main',
            opacity: [0.9, 0.8, 0.7],
          }
        }}
    >

        <Document
          file="/testPdf.pdf"
          //file="https://arxiv.org/pdf/quant-ph/0410100.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <PDFprevew>
            <Page 
              pageNumber={1}
            />
          </PDFprevew>

        </Document>


        <ShapeContainer>
          <Shape />
        </ShapeContainer>

    </Box>
  );
}
