import makeStyles from '@mui/styles/makeStyles';

 export const useStyles = makeStyles({
    root: {
      display: 'flex',
      width:'100%',
      height:'100vh',
      justifyContent:'center',
      fontFamily:'Kanit',
      alignItems:'center',
      background:'#95afc0'
    },

    box:{
        width:1000,
        height:'auto',
        background:'#fff',
        borderRadius:10,
        padding:10,
    },
    boxDisplay:{
        width:1200,
        height:'auto',
        background:'#fff',
        borderRadius:10,
        padding:10,

    }
});