import MaterialTable from "@material-table/core";
import { useStyles } from "./ClientCss";
import { useState,useEffect } from "react";
import { getData,postData,serverURL } from "./services/FetchNodeServices";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Swal from "sweetalert2";
import { Grid,Button,TextField,Avatar } from "@mui/material";

// import { InputLabel,FormControl,Select,MenuItem } from "@mui/material"
import { useNavigate } from "react-router-dom";

export default function DisplayAllClients(){
    var classes = useStyles()
    var navigate = useNavigate()

    const [name,setName]=useState([])
    const [lastname,setLastName]=useState('')
    const [open,setOpen]=useState(false)
    const [email,setEmail]=useState('')
    const [mobileno,setMobileNo]=useState('')
    const [project,setProject]=useState('')
    const [clientId,setClientId]=useState('')
    const [error,setError]=useState('')
    const [clientData,setClientData]=useState([])

    



    const fetchAllClients=async()=>{
        var result = await getData("clients/display_all_client")
        if(result.status)
        {
            setClientData(result.data)
        }
    }
    useEffect(function(){fetchAllClients()},[])




    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))
    }
    



   const handleClose=()=>{
        setOpen(false)
    }


    const handleOpen=(rowData)=>{
        setOpen(true)
        setName(rowData.clientname)
        setLastName(rowData.lastname)
        setEmail(rowData.email)
        setMobileNo(rowData.mobileno)
        setProject(rowData.projectname)
        setClientId(rowData.clientid)
  
    }


    const handleEditClientData=async()=>{
        var submit = true
        if(name.length==0)
        {
            handleError("name","Plz input Client name....")
            submit = false
        }
        if(lastname.length==0)
        {
            handleError("lastname","Plz input Client Last Name....")
            submit = false
        }
        if(email.length==0)
        {
            handleError("email","Plz input Client Email....")
            submit = false
        }
        if(mobileno.length==0)
        {
            handleError("mobileno","Plz input Client Mobile No....")
            submit = false
        }
        if(project.length==0)
        {
            handleError("project","Plz input Project....")
            submit = false
        }
       
        if(submit)
        {
            var body = {clientid:clientId, clientname:name, lastname:lastname, email:email, mobileno:mobileno, projectname:project}
            var result = await postData("clients/edit_client_data",body)
            console.log(result)
            if(result.status)
            {
                Swal.fire({
                    icon: 'Success',
                    title: result.message,
                    timer: 1500,
                    toast: true
                })
            }
            else
            {
                Swal.fire({
                    icon: 'Error',
                    title: result.message,
                    timer: 1500,
                    toast: true
                })
            }
            fetchAllClients()
        }
    }




    const handleDeleteClient=async(rowData)=>{
        Swal.fire({
            title: "Do you want to Delete Client?",
            showDenyButton: true,
            showCancelButton: true,
            toast: true,
            confirmButtonText: "Delete",
            denyButtonText: `Don't Delete`
          }).then(async(result) => {
      
            if (result.isConfirmed) {
                var body = {clientid:rowData.clientId}
                var result = await postData("clients/delete_client",body)
                if(result.status)
                Swal.fire({toast:true,title:"Deleted!", icon:"success"});
                else
                Swal.fire({toast:true,title:"Cancel!", icon:"info"});
                } else if (result.isDenied) {
                Swal.fire({toast:true,title:"Your Record Is Safe!", icon:"info"});
            }
            fetchAllClients()
          });
    }

   const showClientsForm=()=>{
    return(
        <Dialog open={open} onClose={handleClose} maxWidth="md" >
            <DialogContent>
            <div className={classes.boxsubmit} >

                <Grid container spacing={1} >

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


                </Grid>
            </div>
            </DialogContent>
            <DialogActions>
                    <Button onClick={handleEditClientData} >Edit</Button>
                    <Button onClick={handleClose} >Close</Button>
                </DialogActions>
        </Dialog>
    )
   }
   






    function showAllClients(){
        return(
            <MaterialTable
            title="Clients"
            columns={[
                 {title:'ClientId', field:'clientid'},
                 {title:'Name', field:'clientname'},
                 {title:'Last Name', field:'lastname'},
                 {title:'Email', field:'email'},
                {title:'Mobileno', field:'mobileno'},
                 {title:'Project', field:'projectname'}
            ]}


            options={{
                paging:true,
                pageSize:3,
                emptyRowsWhenPaging:false,
                pageSizeOptions:[3,5,10]
              }}
            
            data={clientData}        
              actions={[
                {
                  icon: 'edit',
                  tooltip: 'Edit Client',
                  onClick: (event, rowData) => handleOpen(rowData)
                },

                {
                    icon: 'delete',
                    tooltip: 'Delete Client',
                    onClick: (event, rowData) => handleDeleteClient(rowData)
                  },

                  {
                    icon: 'add',
                    tooltip: 'Add Product',
                    isFreeAction:true,
                    onClick: (event) => navigate('/client')
                  },
              ]} 
            
            />

        )
    }



    return(<div className={classes.root} >
        <div className={classes.boxDisplay} >
        {showAllClients()}
        </div>
       {showClientsForm()} 
    </div>)
}