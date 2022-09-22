function UserShowProfile() {


    const [user, setUser] = React.useState({})
    const[show, setShow] = React.useState({})
    const[isEditingShow, setIsEditingShow] = React.useState(false)
    const [updatePhoto, setUpdatePhoto] = React.useState(false)
    const[admin, setAdmin] = React.useState('')
    const [submit, setSubmit] = React.useState(false)
  
    React.useEffect(() => {
        fetch('/api/showInfo')
        .then((response) => response.json())
        .then((result) => {
            setShow(result.show)    
        });
    }, [submit]);

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
            setSubmit(!submit)
        })
    
    }

    function renderShowInfo() {
        return (
            <React.Fragment>
                   
                            <div className="row">
                            <div  className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style={{fontFamily:"Raleway", fontSize:"20px"}}> 
                                <div className="row">
                                    <div className="col-8" align="right">
                                        <img src={show.image} style={{height:"230px", width:"190px", marginBottom: "8px",borderRadius:"4px"}}></img>
                                    </div>
                                    <div className="col-4" justifyContent="center" style={{padding: "0", whiteSpace:"nowrap"}}>
                                        <h5 style={{padding: "2em 0 0 0",fontFamily:"broadway"}}>{show.company}</h5>
                                        <div className="row" style={{fontFamily: "Raleway", margin: "5px 5px"}}>
                                            <h6>{show.theater_name}</h6>
                                        </div>
                                        <div className="row" style={{fontFamily: "Raleway", margin: "5px 5px"}}>
                                            <h6>Opening: {show.opening_night}</h6>
                                        </div>
                                        <div className="row" style={{fontFamily: "Raleway",margin: "5px 5px"}}>
                                            <h6>Closing: {show.closing_night}</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                          
                     
                    

            </React.Fragment>)
        
    }


    function IsAdmin() {
        if (admin) {
            return (
                <React.Fragment>
                    <button className="adminButton" onClick={handleEditInfo}>Update Show Info</button>
                </React.Fragment>
            )
        }
    }

    function UpdatePlaybillPhoto() {
        if (admin) {
        return (
            <React.Fragment>
           
            <button className="adminButton" onClick={handleChangePhoto}>
            Update Playbill Cover Photo
            </button>
           
            </React.Fragment>
            
        )}
    }

    function editShowInfo() {
        return (
            <div className="row">
            <div  className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style={{fontFamily:"Raleway", fontSize:"16px"}}> 
                <div className="row">
                    <div className="col-8" align="right">
                        <img src={show.image} style={{height:"230px", width:"190px", marginBottom: "8px",borderRadius:"4px"}}></img>
                    </div>
                    <div className="col-4" align="left" justifyContent="center" style={{padding: "0", textAlign:"center"}}>
                        
                        <label className="add label" style={{height: "12px",lineHeight: "3px",paddingTop: "1px",textAlign:"left"}}for="title">Title</label>
                        <input id="title" type="text" className="add register" placeholder={show.title} name="title" value={show.title} style={{marginBottom: "3px"}}onChange={handleOnChange}/><br/>
                        <div style={{height:"1px"}} className="line company register"></div>
                        
                        <label className="add label" style={{height: "10px",lineHeight: "3px",paddingTop: "1px",textAlign:"left"}} for="company">Company</label>
                        <input style={{marginBottom: "3px"}} className="add register" id="company" type="text" placeholder={show.company} name="company" value={show.company} onChange={handleOnChange}/><br/>
                        <div style={{height:"1px"}} className="line company register"></div>
                       
                        <label className="add label" style={{height: "10px",lineHeight: "3px",paddingTop: "1px",textAlign:"left"}} for="theater">Theater</label>
                        <input style={{marginBottom: "3px"}} id="theater" className="add register" type="text" placeholder={show.theater_name} name="theater_name" value={show.theater_name} onChange={handleOnChange}/><br/>
                        <div style={{height:"1px"}} className="line company register"></div>
                        
                        <label className="add label" style={{height: "10px",lineHeight: "3px",paddingTop: "1px",textAlign:"left"}} for="opening">Opening</label>
                        <input style={{marginBottom: "3px"}} id="opening" className="add register" type="date" placeholder={show.opening_night} name="opening_night" value={show.opening_night} onChange={handleOnChange}/><br/>
                        <div style={{height:"1px"}} className="line company register"></div>
                        
                        <label className="add label" style={{height: "10px",lineHeight: "3px",paddingTop: "1px",textAlign:"left", marginBottom: "0"}} for="closing">Closing</label>
                        <input style={{marginBottom: "3px"}} id="closing" className="add register" type="date" placeholder={show.closing_night} name="closing_night" value={show.closing_night} onChange={handleOnChange}/>
                        <div style={{height:"1px"}} className="line company register"></div>

                        <input className="submitBio" style={{height: "38px", width: "100px"}} type="submit" onClick={handleSubmission}></input>
                    </div>
                </div>
                </div>
                </div>
                                  
          
        )

    }
    function updateShowPhoto() {
        return (
            <div className="row">
            <div  className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style={{fontFamily:"Raleway", fontSize:"20px"}}> 
                <div className="row">
                    <div className="col-8" align="right">
                        <img src={show.image} style={{height:"230px", width:"190px", marginBottom: "8px",borderRadius:"4px"}}></img>
                    </div>
                    <div className="col-4" align="left" justifyContent="center" style={{padding: "2em 0", textAlign:"center"}}>
                            <form action="/editplaybillimage" 
                                  id="update_headshot" 
                                  method="POST" 
                                  encType="multipart/form-data">
                            <label for="upload_box" style={{
                                    fontFamily:"Raleway",
                                    fontSize: "16px"}}>
                                    Update Cover Photo</label>
                        <br/>
                            <input id="upload_box" type="file" name="image" required /><br/>
                            <input className="submitShot" type="submit" />
                        </form>
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
    
    function AdminView() {
        return (
           
            <div style={{marginTop: "25px"}}>
                {isAdmin()}
            </div>  
            
        )
    }


    function NewSubmissions(){
        if (user.submissions) {
            return (
               
                    <a className="adminButton" style={{color: "blue"}}  href="/approvesubmits">New Submissions Need Review!</a>
                
            )
        } else {
            return (
               <a className="adminButton" href="/approvesubmits">View Pending Submissions</a>
            )
        }
    }
    function AdminUser() {

           return (
            <React.Fragment>
                
               
                    <div className="row" style={{maxWidth: "auto", maxHeight: "auto"}}>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"> 
                            {renderShowCard()} 
                            </div>
                        <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5" style={{marginTop: "38px"}}>
                            <div className="row"  style={{alignItems: "left"}}>
                                <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5"  ><a className="adminButton" href="/invitecompany">Invite/Edit<br/> Cast Members</a></div>
                                <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5"  >{NewSubmissions()}</div>
                            </div>
                            <div className="row"  style={{alignItems: "left"}}>
                                <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5"><UpdatePlaybillPhoto /></div>
                                <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5"><IsAdmin /></div>
                            </div>
                            <div className="row"  style={{alignItems: "left"}}>
                                <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5"><a className="adminButton" href="/viewplaybill">View Playbill</a></div>
                                <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5"> <a className="adminButton archive" href="/archive">Archive Show</a></div>
                            </div>
                     
                        
                </div>     
                </div>   
            
            </React.Fragment>
           )
        } 
           
   

    function NotAdminUser() {
        return (
            <React.Fragment>
                    
                <div className="row" style={{marginTop: "10px"}}>
                        <h2 style={{fontFamily: "broadway"}}>{user.fname} {user.lname}</h2>
                        <div style={{height:"1.5px"}}className="line company"></div>
                        
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
                    <div style={{height:"1.5px"}}className="line company"></div>
                
                
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

    if(admin){
        return (
            <React.Fragment>
                <div className="container" style={{maxWidth: "1500px",paddingTop: "1rem", justifyContent: "center"}}>
                    <h1 className="show-title">{show.title}</h1>
                    <div className="line company" style={{marginTop: "10px"}}></div>
                        <div className="row" style={{justifyContent: "center"}}>
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style={{marginTop: "43px"}}>
                            {renderShowCard()} 
                            </div>
                            
                               
                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style={{marginTop: "43px"}}>
                                    <div className="row" align="center" style={{alignItems: "center"}}>
                                        <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3" align="center" style={{marginBottom: "18px"}}><a className="adminButton" href="/invitecompany">Invite/Edit<br/> Cast Members</a></div>
                                        <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3" style={{marginBottom: "18px"}}>{NewSubmissions()}</div>
                                    </div>
                                    <div className="row"  style={{alignItems: "left"}}>
                                        <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3" style={{marginBottom: "18px"}}><UpdatePlaybillPhoto /></div>
                                        <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3" style={{marginBottom: "18px"}}><IsAdmin /></div>
                                    </div>
                                    <div className="row"  style={{alignItems: "left"}}>
                                        <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3" style={{marginBottom: "18px"}}><a className="adminButton" href="/viewplaybill">View Playbill</a></div>
                                        <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3" style={{marginBottom: "18px"}}> <a className="adminButton archive" href="/archive">Archive Show</a></div>
                                    </div>
                                </div>     
                          
                    </div>
                </div>
          
            </React.Fragment>
        )
    } else {
        return(
            <div className="container" style={{maxWidth: "1200px",paddingTop: "1rem", justifyContent: "center"}}>
                <h1 className="show-title">{show.title}</h1>
                <div className="line company" style={{marginTop: "10px"}}></div>
                    <div className="row" style={{justifyContent: "center"}}>
                        <div className="card" style={{
                            boxShadow: "2px 2px 3px black",
                            marginTop: "25px",
                            maxWidth: "800px", 
                        }}>
                            <NotAdminUser/>
                        </div>   
                    </div>
            </div> )

    }
}

ReactDOM.render(<UserShowProfile />, document.querySelector("#showEdits"))
