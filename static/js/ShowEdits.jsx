function ShowEdits() {

    const[show, setShow] = React.useState({})
    const[isEditingShow, setIsEditingShow] = React.useState(false)
    const [updatePhoto, setUpdatePhoto] = React.useState(false)
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

    function handleChangePhoto() {
        setUpdatePhoto(!updatePhoto)
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
                            <IsAdmin /> 
                            <UpdatePlaybillPhoto />
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
                            <IsAdmin /> 
                            <UpdatePlaybillPhoto />
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
                <React.Fragment>
                <div style={{paddingLeft: "540px", paddingBottom: "100px"}}>
                <button type="button" style={{ 
                backgroundColor: "transparent", 
                fontFamily: "broadway", 
                boxShadow: "0 3px 5px rgba(0,0,0,0.18)", 
                borderRadius: "8px", 
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100px"}} onClick={handleEditInfo}>Update Show Info</button>
                </div>
                </React.Fragment>
            )
        }
    }

    function UpdatePlaybillPhoto() {
        if (admin) {
        return (
            <React.Fragment>
           <div style={{paddingLeft: "540px", paddingBottom: "100px"}}>
            <button type="button" style={{
            backgroundColor: "transparent", 
            fontFamily: "broadway", 
            boxShadow: "0 3px 5px rgba(0,0,0,0.18)", 
            borderRadius: "8px", 
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100px"}} onClick={handleChangePhoto}>
            Update Playbill Cover Photo
            </button>
            </div>
            </React.Fragment>
            
        )}
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
                                <button type="button" onClick={handleSubmission} style={{
                                 backgroundColor: "#ffffff", 
                                 fontFamily: "broadway", 
                                 boxShadow: "0 3px 5px rgba(0,0,0,0.18)", 
                                 borderRadius: "8px", 
                                 alignItems: "center",
                                 justifyContent: "center",
                                 width: "100px"}}>
                                Submit Changes</button>
                            </div>
                        </div>
                    </div>
                    <div className="body_base">
                        <img id="playBillImg" src={show.image}></img>
                    </div>
                </div>
            </div>              
          
        )

    }
    function updateShowPhoto() {
        return (
            <div className="container">
                <div className="slideBase">
                    <div className="cover">
                        <div className="cover-head">
                            <div className="cover_head_text">
                                <p><strong>{show.company}</strong><br/>
                                {show.theater_name}<br/>
                                {show.opening_night} - {show.opening_night}</p>
                            </div>
                            
                            <div style={{paddingLeft: "540px", paddingBottom: "100px"}}>
                            <label for="updateShowImage" style={{
                                backgroundColor: "transparent", 
                                fontFamily: "broadway", 
                                boxShadow: "0 3px 5px rgba(0,0,0,0.18)", 
                                borderRadius: "8px", 
                                alignItems: "center",
                                justifyContent: "center",
                                width: "100px"}}>Update Show Image:</label>

                            <form id="updateShowImage" action="/editplaybillimage" method="POST" encType="multipart/form-data" style={{
                                fontFamily: "broadway", 
                                boxShadow: "0 3px 5px rgba(0,0,0,0.18)", 
                                borderRadius: "8px", 
                                alignItems: "center",
                                justifyContent: "center",
                                marginpadding: "20px"
                            }}>
                                <input id="image" type="file" name="image" required/>
                                <input type="submit" />
                            </form>
                                    </div>
                           
                            
                        </div>
                     <div className="body_base">
                        <img id="playBillImg" src={show.image}></img>
                    </div>
                </div>
            </div>
            </div>

        )
    }
  
    function renderShowCard() {
        if (isEditingShow) {

            return editShowInfo();

        } else if (updatePhoto) {

            return updateShowPhoto();

        } else {
            return (
                <div>
                    {renderShowInfo()} 
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
    }, [user.headshot, user.bio, user.show]);


    function UserInformation() {
   
        if (!user.admin) {
        return (
            <div className="card" style={{marginTop: "25px"}}>
                <h3>{user.fname} {user.lname}</h3>
                <h5>Role: {user.role}</h5>
                {isAdmin()}
            </div>    
         
        )} else {
            return <AdminView />
        }
    }
    
    function AdminView() {
        return (
           
            <div className="card" style={{marginTop: "25px"}}>
                <h3>{user.show}</h3>
                {isAdmin()}
            </div>  
            
        )
    }

    function AdminUser() {
        
        if (user.submissions){
           return (
            <React.Fragment>
            <div className="row" style={{justifyContent: "center"}}>
                <a style={{
                    color: "black",
                     backgroundColor: "transparent", 
                     fontFamily: "broadway", 
                     boxShadow: "0 3px 5px rgba(0,0,0,0.18)", 
                     borderRadius: "8px", 
                     display: "inline-flex",
                     alignItems: "center",
                     justifyContent: "center",
                     width: "100px"
                }} href="/invitecompany">Invite/Edit Members</a>
           
           <a style={{
                    color: "blue",
                     backgroundColor: "transparent", 
                     fontFamily: "broadway", 
                     boxShadow: "0 3px 5px rgba(0,0,0,0.18)", 
                     borderRadius: "8px", 
                     display: "inline-flex",
                     alignItems: "center",
                     justifyContent: "center",
                     width: "100px"
                }}  href="/approvesubmits">New Submissions Need Review!</a>
           
           <a style={{
                    color: "black",
                     backgroundColor: "transparent", 
                     fontFamily: "broadway", 
                     boxShadow: "0 3px 5px rgba(0,0,0,0.18)", 
                     borderRadius: "8px", 
                     display: "inline-flex",
                     alignItems: "center",
                     justifyContent: "center",
                     width: "100px"
                }}  href="/viewplaybill">View Playbill</a>
          <br/>
          <a style={{
                     color: "red",
                     backgroundColor: "transparent", 
                     fontFamily: "broadway", 
                     boxShadow: "0 3px 5px rgba(0,0,0,0.18)", 
                     borderRadius: "8px", 
                     display: "inline-flex",
                     alignItems: "center",
                     justifyContent: "center",
                     width: "100px"
                }}  href="/archive">Archive Show</a>
            </div>
            
            </React.Fragment>
           )
        } else {

        return (
            <React.Fragment>
              <div className="row" style={{justifyContent: "center"}}>
                <a style={{
                    color: "black",
                     backgroundColor: "transparent", 
                     fontFamily: "broadway", 
                     boxShadow: "0 3px 5px rgba(0,0,0,0.18)", 
                     borderRadius: "8px", 
                     display: "inline-flex",
                     alignItems: "center",
                     justifyContent: "center",
                     width: "100px"
                }}href="/invitecompany">Invite and Edit Company</a>
           
           
                <a style={{
                    color: "black",
                     backgroundColor: "transparent", 
                     fontFamily: "broadway", 
                     boxShadow: "0 3px 5px rgba(0,0,0,0.18)", 
                     borderRadius: "8px", 
                     display: "inline-flex",
                     alignItems: "center",
                     justifyContent: "center",
                     width: "100px"
                }}href="/approvesubmits">View Pending Playbill Submissions</a>
          
                <a style={{
                    color: "black",
                     backgroundColor: "transparent", 
                     fontFamily: "broadway", 
                     boxShadow: "0 3px 5px rgba(0,0,0,0.18)", 
                     borderRadius: "8px", 
                     display: "inline-flex",
                     alignItems: "center",
                     justifyContent: "center",
                     width: "100px"
                }}href="/viewplaybill">View Playbill</a>
            <br/>
            <a style={{
                    color: "red",
                     backgroundColor: "transparent", 
                     fontFamily: "broadway", 
                     boxShadow: "0 3px 5px rgba(0,0,0,0.18)", 
                     borderRadius: "8px", 
                     display: "inline-flex",
                     alignItems: "center",
                     justifyContent: "center",
                     width: "100px"
                }}href="/archive" >Archive Show</a>
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
            <div className="container" style={{paddingTop: "30px"}}>
            <div className="row">
                <div className="col-6" >
                    <UserInformation />
                </div>
                <div className='col-6'>
                    <ShowEdits />
                </div>
            </div>
            </div>
      
        </React.Fragment>
    )
}
ReactDOM.render(<UserShowProfile />, document.querySelector("#showEdits"))
