// material
import { Box } from '@mui/material';
// import { Image } from 'mui-image'
import { styled } from '@mui/system';


// ----------------------------------------------------------------------



const Image = styled('img')({
    position: 'relative',
    width: '100%',
    height:' 100%',
    objectFit: 'cover',
    transitionProperty: 'opacity',
    transitionDuration: '1500ms',
    transitionTimingFunction: 'cubic-bezier(0.7, 0, 0.6, 1)',
    opacity: 1,
    animation: '3000ms cubic-bezier(0.7, 0, 0.6, 1) 0s 1 normal none running materialize'
});


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


type WordFileProps = {
   src: string
}

export default function WordFile({ src }: WordFileProps ) {
  

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

        <Image
            src={src}
            alt="test200"
            loading="lazy"
        />

        <ShapeContainer>
          <Shape />
        </ShapeContainer>

    </Box>
  );
}
