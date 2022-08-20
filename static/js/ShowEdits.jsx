function ShowEdits() {

    const[show, setShow] = React.useState({})
    const[isEditingShow, setIsEditingShow] = React.useState(false)
    const[admin, setAdmin] = React.useState('')

    
    React.useEffect(() => {
        fetch('/api/showInfo')
        .then((response) => response.json())
        .then((result) => {
            setShow(result.show)
            
        });
    }, []);

    React.useEffect(()=> {
        fetch('/api/usershowinfo')
        .then((response) => response.json())
        .then((result) => {
            setAdmin(result.user.admin)
        });
    }, []);
    

    function handleEditInfo() {
        setIsEditingShow(!isEditingShow)
    }

    function handleOnChange(event) {
        setShow({...show, [event.target.name]: event.target.value})
    }
       

    function handleSubmission() {
        
        const formInputs = {
            title: `${show.title}`,
            company: `${show.company}`,
            closing_night: `${show.closing_night}`,
            opening_night: `${show.opening_night}`,
            theater_name: `${show.theater_name}`,
            tickets: `${show.tickets}`
        }

        fetch('/updateShowInfo', {
            method: "POST",
            body: JSON.stringify(formInputs),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            setIsEditingShow(false)
        })
    
    }



    function renderShowInfo() {
        
        if (show.image === "None"){
            return(
                <div>
                <div className="slideBase">
                    <div className="cover">
                        <div className="cover-head">
                            <div className="cover_head_text">
                                <p><strong>{show.company}</strong><br/>
                                {show.theater_name}<br/>
                                {show.opening_night} - {show.opening_night}</p>
                            </div>
                        </div>
                    </div>
                    <div className="body_base">
                    </div>
                </div>
            </div>)
               
            } else {
                return (
                    <div>
                <div className="slideBase">
                    <div className="cover">
                        <div className="cover-head">
                            <div className="cover_head_text">
                                <p><strong>{show.company}</strong><br/>
                                {show.theater_name}<br/>
                                {show.opening_night} - {show.opening_night}</p>
                            </div>
                        </div>
                    </div>
                    <div className="body_base">
                    <img id="playBillImg" src={show.image}></img>
                    </div>
                </div>
            </div>)
                }
    }


    function IsAdmin() {
        if (admin) {
            return (
                <button type="button" onClick={handleEditInfo}>Update Show Info</button>
            )
        }
    }

    function editShowInfo() {
        return (
            <div className="container">
                  <h4>Show Title: <input type="text" placeholer={show.title} name="title" value={show.title} onChange={handleOnChange}/></h4>
                 <div className="slideBase">
                    <div className="cover">
                        <div className="cover-head">
                            <div className="cover_head_text">
                                <p><strong>Company: <input type="text" placeholder={show.company} name="company" value={show.company} onChange={handleOnChange}/></strong><br/>
                                Theater Name:<input type="text" placeholder={show.theater_name} name="theater_name" value={show.theater_name} onChange={handleOnChange}/><br/>
                                Opening Night: <input type="date" placeholder={show.opening_night} name="opening_night" value={show.opening_night} onChange={handleOnChange}/> - 
                                Closing Night: <input type="date" placeholder={show.closing_night} name="closing_night" value={show.closing_night} onChange={handleOnChange}/></p>
                                <button type="button" onClick={handleSubmission}>Submit Changes</button>
                            </div>
                        </div>
                    </div>
                    <div className="body_base">
                    <img id="playBillImg" src={show.image}></img>
                    <label for="updateShowImage">Update Show Image:</label>
                <form id="updateShowImage" action="/editplaybillimage" method="POST" encType="multipart/form-data">
                    <input id="image" type="file" name="image" required/>
                    <input type="submit"/>
                </form>  
                    </div>
                </div>              
            </div>
        )

    }

    function renderShowCard() {
        if (isEditingShow) {
            return editShowInfo();
        } else {
            return (
                <div>
                    {renderShowInfo()} 
                    {IsAdmin()}
                </div>)
        }};


    return (
        <React.Fragment>
        
            {renderShowCard()}  
       
        </React.Fragment>
    )


}


function UserShowProfile() {


    const [user, setUser] = React.useState({})

    React.useEffect(()=> {
        fetch('/api/usershowinfo')
        .then((response) => response.json())
        .then((result) => {
            setUser(result.user)
        });
    }, [user.headshot, user.bio]);


    function UserInformation() {
        return (
            <div className="card">
                <h3>{user.fname} {user.lname}</h3>
                <h5>Role: {user.role}</h5>
                {isAdmin()}
            </div>    
         
        )
    }      
   

    function AdminUser() {
        
        if (user.submissions){
           return (
            <React.Fragment>
            <div className="row">
                <a href="/approvesubmits">New Submissions Need Review!</a>
            </div>
            <div className="row">
                <a href="/invitecompany">Invite/Edit Members</a>
            </div>
            <div className="row">
                <a href="/viewplaybill">View Playbill</a>
            </div>
            
            </React.Fragment>
           )
        } else {

        return (
            <React.Fragment>
            <div className="row">
                <a href="/invitecompany">Invite/Edit Company</a>
            </div>
            <div className="row">
                <a href="/viewplaybill">View Playbill</a>
            </div>
           
            </React.Fragment>
          
        )
    }
    }

    function NotAdminUser() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-4">
                        <img src={user.headshot}></img>
                    </div>
                    <div className="col-4">
                        <p>{user.bio}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <form action="/update_headshot" id="update_headshot" method="POST" encType="multipart/form-data">
                            <input id="add_headshot" type="file" name="headshot" required />
                            <input type="submit" />
                        </form>
                    </div>
                    <div className="col-6">
                    <form action="/update_bio" id="add_bio" method="POST">
                        <textarea name="update" maxLength="375" cols="33" required/> 
                        <input type="submit" />
                    </form>
                    
                    </div>
                    <div className="row">
                        <a href="/viewplaybill">View Playbill</a>
                    </div>
                </div>

            </React.Fragment>
        )
    }


    function isAdmin(){
        if (user.admin){
            return <AdminUser />
        } else {
            return <NotAdminUser />
        }
    }
    return (
        <React.Fragment>
            
            <div className="row">
            <div className="col-6">
                <UserInformation />
            </div>
            <div className='col-6'>
                <ShowEdits />
                </div>
            </div>
      
        </React.Fragment>
    )
}
ReactDOM.render(<UserShowProfile />, document.querySelector("#showEdits"))
