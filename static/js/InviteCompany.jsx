function InviteCompany() {

    const [cast, setCast] = React.useState([])
    const [add, setAdd] = React.useState({
                                        "fname" : '',
                                        "lname" : '',
                                        "email" : '',
                                        "role" : ''})
                                        
    const [show, setShow] = React.useState({})

    const [isEditing, setIsEditing] = React.useState(false)

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

    function Title(){
        return(
            <div>
                <h2 className="show-title">{show.title}</h2>
                <div className="line company"></div>
            </div>
        )
    }
    function CurrentCast() {
        return (
            <React.Fragment>
                        <div className="col-6">
                            <div className="card cast">
                            <h4 className="show-title">Cast List</h4>
                            <div style={{height:"1.5px"}}className="line company"></div>
                                {castList}
                        </div>
                        </div>
            </React.Fragment>
        )
    }
    
    

    function CastList({fname, lname, role, email, id, isEditing}) {

        return(
            <React.Fragment>
                <div className="row castlist">
                    <div className="col-4 offset-2" >
                        <strong><p style={{fontFamily: "Raleway", float: "center", fontStyle: "italic"}}>{role}</p></strong>
                    </div>
                    <div className="col-4">
                        <strong><p style={{fontFamily: "Raleway", float: "center"}}>{fname} {lname}</p></strong>
                    </div>
                </div>
            </React.Fragment>
        )

        if (isEditing){
            return (
            <React.Fragment>
               <div className="card">
                <div className="row">
                    <div className="col-6">
                        <h5>{fname} {lname}</h5>
                        <h5></h5>
                    </div>
                    <div className="col-6">
                        <h6>
                        <i>{role}</i>
                        <form action='/update_actor' method="POST">
                            <input type="hidden" value={id} name="id"></input>
                            <input type="text" name="role" placeholder={role} required></input>
                            <button type="submit">Submit</button>
                        </form>
                        </h6>
                    </div>
                </div>
                </div>
              
            </React.Fragment>
            )
        } else
        return (
           <React.Fragment>
            <div className="card">
                <div className="row">
                    <div className="col-4">
                        <p><strong>{fname} {lname}</strong></p>
                        <p>{email}</p>
                    </div>
                    <div className="col-4">
                        <p><i>{role}</i></p> 
                    </div>
                    <div className="col-4">
                        <button onClick={handleOnClick} type="button" value={id}>Update Role</button>
                        <form action='/delete_from_cast' method="POST">
                            <input type="hidden" value={id} name="id"></input>
                            <button type="submit">Remove From Cast</button>
                        </form>
                    </div>
                </div>
            </div>
            </React.Fragment>
            
        )
    }


    function BackOrView() {

        return (
            <React.Fragment>
                
                    <div className="row" style={{justifyContent: "center", display: "flex", marginTop: ".5rem"}}>
                        <div className="col" style={{justifyContent: "right", textAlign:"right"}}>
                    <form action='/updateshow'>
                        <input type="hidden" name="show_id" value={show.show_id}/>
                        <button style={{width: "fit-content"}}className="submitBio" type="submit" >Back to Show Profile</button>
                    </form>
                    </div>
                    <div className="col" style={{justifyContent: "left", textAlign:"left"}}>
                    <form action='/viewplaybill'>
                        <input type="hidden" name="show_id" value={show.show_id}/>
                        <button style={{width: "fit-content"}}className="submitBio" type="submit" >View Playbill</button>
                    </form>
                    </div>
                    
                </div>
             
                
            </React.Fragment>
        )
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
            <div className='container'>
                    <div className="row">

                        <CurrentCast />
                        
                        <div className="col-6">
                            <div className="card invite">
                        <div className="row">
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
                                <div style={{height:"1.5px"} }className="line company invite"></div>
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
