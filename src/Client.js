import { useState } from "react";
import { Button,Grid,TextField,Avatar } from "@mui/material";
import { useStyles } from "./ClientCss";
import { postData } from "./services/FetchNodeServices";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";


export default function Client() {
 var classes=useStyles()
 var navigate=useNavigate()

 const [name,setName]=useState('')
 const [lastname,setLastName]=useState('')
 const [email,setEmail]=useState('')
 const [mobileno,setMobileNo]=useState('')
 const [project,setProject]=useState('')

 
  const [error,setError]=useState({})

  const handleSubmit=async()=>{
    var submit = true
    if(name.length==0)
    {
        handleError('name','Pls Input Client Name...')
        submit = false
    }
    if(lastname.length==0)
    {
        handleError('lastname','Pls Input Client Last Name...')
        submit = false
    }
    if(email.length==0)
    {
        handleError('email','Pls Input Client Email...')
        submit = false
    }
    if(mobileno.length==0)
    {
        handleError('mobileno','Pls Input Client Mobileno...')
        submit = false
    }
    if(project.length==0)
    {
        handleError('project','Pls Input Client Project...')
        submit = false
    }
   
    
    if(submit)
    {
        var body = {clientname:name, lastname:lastname, email:email, mobileno:mobileno, projectname:project}
        var result = await postData("clients/submit_client",body)
        console.log(result)
        if(result.status)
        {
            Swal.fire({
                icon: 'success',
                title: result.message,
                timer: 1500
            })
        }
        else
        {
            Swal.fire({
                icon: 'error',
                title: result.message,
                timer: 1500
            })
        }
    }
}

 

 

 const handleError =(label,msg)=>{
    setError((prev)=>({...prev,[label]:msg}))
 }

 const handleReset=()=>{
    setName('')
    setLastName('')
    setEmail('')
    setMobileNo('')
    setProject('')
   
 }


 

  return(<div className={classes.root} >
         <div className={classes.box}>
           <Grid container spacing={1}>
           <Grid item xs={12}>
                 <div style={{display:'flex',justifyContent:'space-between'}}>
                    <span style={{fontSize:20,fontWeight:'bolder'}}> Client Data</span>
                    <span style={{cursor:'pointer'}} onClick={()=>navigate("/displayallclient")}><img src={"img.png"} width="40"/></span>
                 </div>
                </Grid> 
               
                
                 <Grid item xs={6}>
                    Name
                    <TextField value={name} onFocus={()=>handleError('name',null)} error={error.name} helperText={<span style={{fontFamily:'kanit'}}>{error.name}</span>} onChange={(event)=>setName(event.target.value)} label="Name" fullWidth />
                </Grid>
                <Grid item xs={6}>
                    Last Name
                    <TextField value={lastname}  onFocus={()=>handleError('lastname',null)} error={error.lastname} helperText={<span style={{fontFamily:'kanit', fontSize:13 }} >{ error.lastname}</span>}  onChange={(event)=>setLastName(event.target.value)} label="Last Name" fullWidth/>
                </Grid>
                <Grid item xs={6}>
                    Email
                    <TextField value={email}  onFocus={()=>handleError('email',null)} error={error.setEmail} helperText={<span style={{fontFamily:'kanit', fontSize:13 }} >{ error.email}</span>}  onChange={(event)=>setEmail(event.target.value)} label="Email" fullWidth/>
                </Grid>
                <Grid item xs={6}>
                    Mobile. No
                    <TextField value={mobileno}  onFocus={()=>handleError('mobileno',null)} error={error.mobileno} helperText={<span style={{fontFamily:'kanit', fontSize:13 }} >{ error.mobileno}</span>}  onChange={(event)=>setMobileNo(event.target.value)} label=" Mobile.No" fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    Project
                    <TextField value={project}  onFocus={()=>handleError('project',null)} error={error.project} helperText={<span style={{fontFamily:'kanit', fontSize:13 }} >{ error.project}</span>}  onChange={(event)=>setProject(event.target.value)} label="Project" fullWidth/>
                </Grid>
                <Grid item xs={6}>
                   <Button variant='contained' onClick={handleSubmit} fullWidth>
                        Submit
                     </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" onClick={handleReset} fullWidth>
                        Reset
                    </Button>
                </Grid> 

            </Grid>
        </div>
  </div>)
 }