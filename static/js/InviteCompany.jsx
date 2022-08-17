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

    

    function CastList({fname, lname, role}) {
        return (
            <div className="row">
                <div className="col-6">
                    <h5>{fname} {lname}</h5>
                </div>
                <div className="col-6">
                    <h5><i>{role}</i></h5>
                </div>
            </div>
        )
    }

    for (const member of cast) {

        castList.push(
            <CastList 
            fname={member.fname}
            lanme={member.lname}
            role={member.role}
            key={member.email} 
            />
        )
    }


    return (
        <React.Fragment>
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
                                    <input type="text" onChange={handleOnChange} className="form-control" name="fname" value={add.fname}/></label>
                                    <label for="lname">Last Name:
                                    <input type="text" onChange={handleOnChange} className="form-control" name="lname" value={add.lname}/></label>
                                    <label for="email">Email:
                                    <input type="text" onChange={handleOnChange} className="form-control" name="email" value={add.email}/></label>
                                    <label for="role">Role:
                                    <input type="text" onChange={handleOnChange} className="form-control" name="role" value={add.role}/></label>
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
