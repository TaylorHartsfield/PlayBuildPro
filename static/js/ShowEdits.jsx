function UserShowProfile() {


    const [user, setUser] = React.useState({})
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
            setUser(result.user)
        });
    }, [user.headshot, user.bio, user.show]);



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
        return (
            <React.Fragment>
               
                
                    <div className="row" style={{fontFamily: "broadway", marginTop: "10px"}}>
                        <div className="col-6" style={{marginTop: "30px", textAlign: "left"}}>
                            <h5>{show.company}</h5>
                            <div className="row" style={{fontFamily: "Raleway", marginTop: "5px"}}>
                                <h6>{show.theater_name}</h6>
                            </div>
                            <div className="row" style={{justifyContent:"center", marginTop: "5px"}}>
                        <a id="viewPlaybill" href="/viewplaybill">View Playbill</a>
                    </div> 
                        </div>
                        <div className="col-6" style={{justifyContent:"center", marginTop: "5px", marginBottom: "10px"}}>
                            <img src={show.image} style={{height:"150px", width:"190px", borderRadius:"4px"}}></img>
                        </div>
                    </div>

                    
           
            </React.Fragment>)
        
    }


    function IsAdmin() {
        if (admin) {
            return (
                <React.Fragment>
               
                <button type="button" style={{ 
                backgroundColor: "transparent", 
                fontFamily: "broadway", 
                boxShadow: "0 3px 5px rgba(0,0,0,0.18)", 
                borderRadius: "8px", 
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100px"}} onClick={handleEditInfo}>Update Show Info</button>
              
                </React.Fragment>
            )
        }
    }

    function UpdatePlaybillPhoto() {
        if (admin) {
        return (
            <React.Fragment>
           
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
                                </p>
                            </div>
                            
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


    function UserInformation() {
   
        if (!user.admin) {
        return (
            <div className="card" style={{
                boxShadow: "2px 2px 3px black",
                marginTop: "25px",
                maxWidth: "600px"
               }}>
                {isAdmin()}
            </div>    
         
        )} else {
            return <AdminView />
        }
    }
    
    function AdminView() {
        return (
           
            <div style={{marginTop: "25px"}}>
                <h3>{user.show}</h3>
                {isAdmin()}
            </div>  
            
        )
    }

    function AdminUser() {
        
        if (user.submissions){
           return (
            <React.Fragment>
                <div>
                <h3>{user.fname} {user.lname}</h3>
                <h5>Role: {user.role}</h5>
                </div>
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
                </div>
                <br/>
                <div className="row" style={{justifyContent: "center"}}>
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
                <br/>
                </div>
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
                }}  href="/viewplaybill">View Playbill</a>
          <br/>
          </div>
          <div className="row" style={{justifyContent: "center"}}>
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
            <div className="row" style={{justifyContent: "center"}}>
            <IsAdmin /> 
            </div>
            <div className="row" style={{justifyContent: "center"}}>
            <UpdatePlaybillPhoto />
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
                <br/>
                </div>
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
                }}href="/approvesubmits">View Pending Playbill Submissions</a>
                <br/>
                </div>
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
                }}href="/viewplaybill">View Playbill</a>
            <br/>
            </div>
            <div className="row" style={{justifyContent: "center"}}>
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
            <div className="row" style={{justifyContent: "center"}}>
            <IsAdmin /> 
            </div>
            <div className="row" style={{justifyContent: "center"}}>
            <UpdatePlaybillPhoto />
            </div>
           
            </React.Fragment>
          
        )
    }
    }

    function NotAdminUser() {
        return (
            <React.Fragment>
                    
                <div className="row" style={{marginTop: "10px"}}>
                        <h2 style={{fontFamily: "broadway"}}>{user.fname} {user.lname}</h2>
                        <hr style={{width: "90%", margin: "0 auto", marginBottom: "7px"}}/>
                        <div className="row" style={{marginBottom: "3px", marginTop: "5px", paddingLeft: "12px", fontFamily: "broadway", textAlign: "center"}}>
                            <h4>Role: {user.role}</h4>
                        </div>
                        <div className="col-6">
                        <div className="row" style={{marginBottom: "3px", marginTop: "5px", paddingLeft: "12px", fontFamily: "Raleway", textAlign: "left"}}>
                            <h5 style={{fontSize: "15px"}}>Company:  {show.company}</h5>  
                        </div>
                        
                        <div className="row" style={{marginBottom: "3px", marginTop: "5px", paddingLeft: "12px", fontFamily: "Raleway", textAlign: "left"}}>
                            <h5 style={{fontSize: "15px"}}>Theater: {show.theater_name}</h5>  
                        </div>

                        </div>
                        <div className="col-6" style={{paddingTop: "15px"}}>
                        
                        <a class="viewPlaybill" href="/viewplaybill" >View Playbill</a>
                        <a class="viewPlaybill" href="/user_profile">Back to Profile</a>
                 
                        </div>
                </div>
                <div className="row" style={{marginTop: "5px", marginBottom: "8px"}}>
                    <div className="col-6">
                    <div className="row"> <h4 style={{float:"left", marginBottom: "8px"}}>Headshot</h4></div>
                        <img src={user.headshot}></img>
                    </div>
                    
                    <div className="col-6" style={{float:"left"}}>
                        <div className="row"> <h4 style={{float:"left", marginBottom: "8px"}}>Bio</h4></div>
                        <div className="row">
                    
                        <p style={{
                        fontSize: "14px", 
                        fontWeight: "normal", 
                        fontFamily: "Raleway", 
                        textAlign:"left", 
                        
                        }}>
                            {user.bio}
                        </p>
                        </div>
                    </div>
                    </div>
                    <hr style={{width: "90%", margin: "0 auto", marginBottom: "3px"}}/>
                
                
                <div className="row">
                    <div className="col-6">
                        <form 
                        action="/update_headshot" id="update_headshot" 
                        method="POST" 
                        encType="multipart/form-data">
                            <label for="upload_box" style={{
                                fontFamily:"Raleway",
                                fontSize: "16px"}}>Update Headshot</label><br/>
                            <input id="upload_box" type="file" name="headshot" required /><br/>
                            <input className="submitShot" type="submit" />
                        </form>
                    </div>
                    <div className="col-6">
                    <label for="update_bio" style={{
                                fontFamily:"Raleway",
                                fontSize: "16px"}}>Update Bio</label><br/>
                    <form action="/update_bio" id="add_bio" method="POST">
                        <textarea id="update_bio" name="update" maxLength="375" placeholder="Update Bio..." required/> 
                        <br/>
                        <input className="submitBio" type="submit" />
                    </form>
                    
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
            <div className="container" style={{paddingTop: "30px", justifyContent: "center"}}>
                <h1 style={{textDecoration: "underline"}}>{show.title}</h1>
                <div className="row" style={{justifyContent: "center"}}>
                <UserInformation />
                </div>
            
           
              
           
               
           
            </div>
      
        </React.Fragment>
    )}

ReactDOM.render(<UserShowProfile />, document.querySelector("#showEdits"))
