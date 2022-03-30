import {makeStyles} from '@material-ui/core/styles'


const LoginStyles = makeStyles((theme)=>({

    signinheading:{
      paddingBottom:40
    },

    loginTextField:{
        width:'90%',
    },

    loginbtn : {
        width:'90%'
    },
    donthaveAccount:{
        float:'right',
        fontSize:15,
        cursor:'pointer'
       
    },
    loginerr :{
        marginBottom:18,
        color:'red',
        fontSize:14
    }

}))


export default LoginStyles