import {makeStyles} from '@material-ui/core/styles'

const SignupStyles = makeStyles((theme)=>({

   

    signupheading:{
        paddingBottom:40
      },
      signupTextField:{
        width:'80%'
    },
    signupbtn : {
        width:'80%'
    },

    alreadyhaveAccount:{
        float:'right',
        fontSize:15,
        cursor:'pointer'
       
    },
    errMsg:{
        marginBottom:15,
        color:'red',
        fontSize:14
    }

}))

export default SignupStyles;