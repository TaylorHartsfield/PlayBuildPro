function InviteCompany() {

    const [cast, setCast] = React.useState([])
    const [add, setAdd] = React.useState({
                                        "fname" : '',
                                        "lname" : '',
                                        "email" : '',
                                        "role" : ''})
                                        
    const [show, setShow] = React.useState({})
    
    const [isEditing, setIsEditing] = React.useState(false)

    const editCastInfo =[]
    const castList = []

    React.useEffect(() => {
        
        fetch('/api/inviteCast')
        .then((response) => response.json())
        .then((result) => {
            setCast(result.company)
        });
    }, []);


    React.useEffect(() => {
        fetch('/api/showInfo')
        .then((response) => response.json())
        .then((result) => {
            setShow(result.show)
        })
    }, []);

    function handleOnChange(event) {
        setAdd({...add, [event.target.name]: event.target.value})
    }
    
 
    function handleOnClick() {
        setIsEditing(!isEditing)
    }
    
    
    function handleUpdate(id, role) {
        console.log(id)
        console.log(role)

        const formInputs ={
            "role": role,
            "id": id,
        }

        fetch('/update_actor', {
            method: "POST",
            body: JSON.stringify(formInputs),
            headers: {
                'Content-Type': 'application/json'
            },})          
            .then(setIsEditing(false))
            window.location.reload(true)
           
            
    }

    function Title(){
        return(
            <div>
                <h2 className="show-title">{show.title}</h2>
                <div className="line company"></div>
            </div>
        )
    }
    function CurrentCast({editCastInfo}) {
        if(isEditing) {
               
            return (
                <React.Fragment>
                        <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6" align="center">
                            <div className="card cast">
                            <i className="fa-solid fa-x"align="right" onClick={handleOnClick}></i>
                            <h4 className="show-title">Cast List</h4>
                                <div style={{height:"1.5px", overflow:"auto"}}className="line company"></div>
                                <div className="row castlist">
                                    
                                        {editCastInfo}
                                  
                                </div>  
                            </div>
                        </div>
            </React.Fragment>
            )
        } else {
        return (
            <React.Fragment>
                
                        <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6" align="center">
                            <div className="card cast">
                                <i align="right" className="fa-solid fa-pen-to-square" onClick={handleOnClick}></i>
                                <h4 className="show-title">Cast List</h4>
                                <div style={{height:"1.5px", overflow:"auto"}}className="line company"></div>
                                <div className="row castlist">
                                    {castList} 
                                </div>
                            </div>
                        </div>
            </React.Fragment>
        )
    }}
    
    

    function CastList({fname, lname, role}) {

        return(
            <React.Fragment>
                <div className="row castlist">
                    <div className="col-6" align="center" >
                        <strong><p style={{fontSize: "16px",fontFamily: "Raleway", float: "center", fontStyle: "italic"}}>{role}</p></strong>
                    </div>
                    <div className="col-6" align="center">
                        <strong><p style={{fontSize: "16px", fontFamily: "Raleway", float: "center"}}>{fname} {lname}</p></strong>
                    </div>
                </div>
            </React.Fragment>
        )
        }

    function EditCast({fname, lname, role, id}){

        const [newRole, setNewRole] = React.useState(`${role}`)
        const [changing, setChanging] = React.useState(false)

        function handleChange(event) {
            setNewRole(event.target.value)
            setChanging(true)
        }
        function isHandling(){
            console.log(changing)
            if(changing){
                return (
                    
                    <i style={{position: "absolute", paddingLeft: "36%", paddingTop: "1%"}}className="fa-solid fa-check" onClick={() => handleUpdate(`${id}`,newRole)}></i>
                )
        }}

        return (
        <React.Fragment>
            <div className="row castlist">
           
                 <div className="col-6" align="center">
                    {isHandling(`${changing}`)} 
                    <input type="text" className="add" style={{position: "relative", height: "14px", fontSize: "16px", float:"center"}}name="role" placeholder={newRole} onChange={handleChange} required></input>
                    <div style={{height:"1px", marginBottom: "0"}} className="line company invite"></div>
                  
                </div>
                <div className="col-6" align="center">
                    <strong><p style={{fontSize: "16px", fontFamily: "Raleway", float: "center"}}>{fname} {lname}</p></strong>
                </div>
            </div>   
        </React.Fragment>)
    }


   
    function BackOrView() {

        return (
            <React.Fragment>
                
                    <div className="row" style={{marginTop: ".5rem"}}>
                        <div style={{float:"right"}}>
                        <div className="col" style={{float:"right",justifyContent: "right", textAlign:"right"}}>
                    <form action='/updateshow'>
                        <input type="hidden" name="show_id" value={show.show_id}/>
                        <button style={{width: "fit-content"}}className="submitBio" type="submit" >Back to Show Profile</button>
                    </form>
                    </div>
                    <div className="col" style={{marginRight: "1em",float:"right",justifyContent: "left", textAlign:"left"}}>
                    <form action='/viewplaybill'>
                        <input type="hidden" name="show_id" value={show.show_id}/>
                        <button style={{width: "fit-content"}}className="submitBio" type="submit" >View Playbill</button>
                    </form>
                    </div>
                    </div>
                    
                </div>
             
                
            </React.Fragment>
        )
    }
    
    for (const member of cast){
       
        if (member.role != 'Admin'){
            editCastInfo.push(
                <EditCast
                fname={member.fname}
                lname={member.lname}
                role={member.role}
                id={member.id}
                key={member.key}
                />
            )
        }
    }
   
    for (const member of cast) {
        if (member.role != 'Admin') {

        castList.push(
            <CastList 
            fname={member.fname}
            lname={member.lname}
            role={member.role}
            email={member.email}
            key={member.email} 
            id={member.id}
            isEditing={isEditing}
            />)
        }}

    return (
        <React.Fragment>
            <Title />
            <BackOrView />
            <div className='container' style={{maxWidth: "1200px",paddingTop: "1rem", justifyContent: "center"}}>
                <div className="row">
                    <CurrentCast editCastInfo={editCastInfo} />
                    <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6" align="center">
                        <div className="card invite">
                            <div className="row castlist">
                                <h4 className="show-title">Invite Company</h4>
                                <div style={{height:"1.5px"}}className="line company"></div>
                            </div>
                                <div className="invite-content">
                                    <form action="/addcast" method="POST">
                                        <label className="add label" for="fname">First Name
                                        <input className="add" type="text" onChange={handleOnChange} name="fname" value={add.fname} placeholder="Enter First Name" required/></label><br/>
                                        <div style={{height:"1.5px"}} className="line company invite"></div>
                                        <label className="add label" for="lname">Last Name
                                        <input className="add" type="text" onChange={handleOnChange}  name="lname" value={add.lname} placeholder="Enter Last Name"required/></label><br/>
                                        <div style={{height:"1.5px"}} className="line company invite"></div>
                                        <label className="add label" for="email">Email
                                        <input className="add" type="text" onChange={handleOnChange}  name="email" value={add.email} placeholder="Enter Email"required/></label><br/>
                                        <div style={{height:"1.5px"}} className="line company invite"></div>
                                        <label className="add label" for="role">Role
                                        <input className="add" type="text" onChange={handleOnChange}  name="role" value={add.role} placeholder="Enter Role" required/></label><br/>
                                        <div style={{height:"1.5px"}} className="line company invite"></div>
                                        <button style={{marginTop: "15px",fontSize: "12px",padding: "1rem 5rem", width: "fit-content"}}className="submitBio" type="submit" >Add {add.fname} to {show.title} </button>
                                    </form>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )

}

ReactDOM.render(<InviteCompany />, document.querySelector("#inviteCompany"))
