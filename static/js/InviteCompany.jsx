function InviteCompany() {

    const [cast, setCast] = React.useState([])
    const [add, setAdd] = React.useState({
                                        "fname" : '',
                                        "lname" : '',
                                        "email" : '',
                                        "role" : ''})
                                        
    const [show, setShow] = React.useState({})

    const [newRole, setNewRole] = React.useState({
        "id": '',
        "role": ''
    })
        
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



    function CurrentCast() {
        return (
            <React.Fragment>
                        <div className="col-6">
                            <h4>{show.title} Cast List</h4>
                                {castList}
                        </div>
            </React.Fragment>
        )
    }
    
    

    function CastList({fname, lname, role, id, isEditing}) {

        if (isEditing){
            return (
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
                    <input type="text" name='role' placeholder={role}></input>
                    <button type="submit">Submit</button>
                </form>
                </h6>
            </div>
            
           </div>
            )
        } else
        return (
            <div className="row">
                <div className="col-6">
                    <h5>{fname} {lname}</h5>
                    <h5></h5>
                </div>
                <div className="col-6">
                    <h6>
                    <i>{role}</i>
                    <button onClick={handleOnClick} type="button" value={id}>Update Role</button>
                    </h6>
                </div>
               </div>
        )
    }


    function ViewPlaybill() {

        return (
            <React.Fragment>
                <div className = "container">
                    <form action='/viewplaybill'>
                    <input type="hidden" name="show_id" value={show.show_id}/>
                    <button type="submit" >View Playbill</button>
                    </form>
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
            key={member.email} 
            id={member.id}
            isEditing={isEditing}
            />)
        }}

    return (
        <React.Fragment>
            <ViewPlaybill />
            <div className='container'>
                    <div className="row">
                        <CurrentCast />
                        <div className="col-6">
                        <div className="row">
                            <h4>Invite Company</h4>
                        </div>
                        <div className="row">
                            <div className="col">
                                <form action="/addcast" method="POST">
                                    <label for="fname">First Name:
                                    <input type="text" onChange={handleOnChange} className="form-control" name="fname" value={add.fname} required/></label>
                                    <label for="lname">Last Name:
                                    <input type="text" onChange={handleOnChange} className="form-control" name="lname" value={add.lname} required/></label>
                                    <label for="email">Email:
                                    <input type="text" onChange={handleOnChange} className="form-control" name="email" value={add.email} required/></label>
                                    <label for="role">Role:
                                    <input type="text" onChange={handleOnChange} className="form-control" name="role" value={add.role} required/></label>
                                    <button className="form-control" type="submit" >Add {add.fname} to {show.title} </button>
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
