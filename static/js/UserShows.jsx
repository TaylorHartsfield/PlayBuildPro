function UserShows() {

    const [userShows, setUserShows] = React.useState([])
    const[user, setUser] = React.useState({})
    const [isEditing, setIsEditing] = React.useState(false);
    const [archive, setArchive] = React.useState(false);
    const [viewActive, setViewActive] = React.useState(true);


    const showInfoCards = [];
    const notActive = [];

    React.useEffect(() => {
        fetch('/api/usershows')
        .then((response) => response.json())
        .then((result) => {
            setUserShows(result.shows);
        });
        }, [archive]);
    
    React.useEffect(()=> {
        fetch('/api/userinfo')
            .then((response) => response.json())
            .then((result) => {
            setUser(result.user)
            });
        }, []);
    
    function handleSumbission() {

        const updateInputs ={
            fname: `${user.fname}`,
            lname: `${user.lname}`
        }

        fetch('/updateuser', {
            method: 'POST',
            body: JSON.stringify(updateInputs),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((responseJSon) => {
            setIsEditing(false)
        })
    }
    
    function handleOnClick(event){
        event.preventDefault();
        setIsEditing(!isEditing)

    };

    function handleFNameChange(event){
        event.preventDefault();
        setUser({...user, "fname": event.target.value})
    }

    function handleLNameChange(event) {
        event.preventDefault();
        setUser({...user, "lname": event.target.value})
    }

    function handleViewActive(event){
        event.preventDefault();
        setViewActive(!viewActive)
    }


    function handlearchive(event){
        event.preventDefault();

        const show ={
            "show": `${event.target.value}`
        }

        fetch('/archive', {
            method: "POST",
            body: JSON.stringify(show),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.text())
        .then((text) => {
            setArchive(!archive)
        })


    }


    function Waiting({waiting, submission, admin, headshot, bio}) {
        if (admin){
            if (submission) {
                return (
                    <div style={{paddingTop: "5px"}}>
                    <h6 style={{color: "blue"}}>New Submissions to Approve!</h6>
                </div>
                )
    
            } else if (waiting) {
                return (
                <div style={{paddingTop: "5px"}}>
                    <p><i>Still waiting on cast submissions!</i></p>
                    </div>)
            } else {
                return (
                    <div style={{paddingTop: "5px"}}>
                    <p><i>All Submissions Recieved!</i></p>
                    </div>
                )
            }

        } else {
            if (headshot==="/static/img/download.png" | bio==="No Bio Submitted") {
                return(
                <div style={{paddingTop: "5px"}}>
                    <h6 style={{color: "blue"}}>Headshot or Bio Needed!</h6>
                </div>
                )
            }
        }
       
    }

 

    function ShowImage({image, title}){
        if(image){
            return (
                <img className="card-img" src={image}></img>  
            )
        } else {
            return(
                <div>
                    <h4 className="noImage">{title}</h4>
                </div>
            )
        }
    }

    function Unarchive({active, show_id, admin}){
        if(active && admin){
            return(
                <button className="submitBio archive" type="button" onClick={handlearchive} value={show_id}>Archive</button>
            )
        } else if (admin && !active) {
            return(
            <button className="submitBio unarchive" type="button" onClick={handlearchive} value={show_id}>Unarchive</button>
            )
        }
    }

   function UpdateShow({active, show_id, admin}){
    if (active && admin){
        return(
            <form action='/updateshow'>
                <input type="hidden" name="show_id" value={show_id}/>
                <button type="submit" className="submitBio">Update Show</button>
            </form>
        )
    } else if (active && !admin){
        return(
        <form action='/updateshow'>
            <input type="hidden" name="show_id" value={show_id}/>
            <button type="submit" className="submitBio">Update Headshot/Bio</button>
        </form>
        )
    }
   }
   function ViewPlaybill({show_id}){
    return(
   
            <form action='/viewplaybill'>
                <input type="hidden" name="show_id" value={show_id}/>
                <button type="submit" className="submitBio">View Playbill</button>
            </form>
    )}

    function ViewActive({view}){
        if (view) {
            return (
                <React.Fragment>
                    <div className="row show">
                        <div className="col-6 show">
                        <h3 className="active show">Active Shows:</h3>
                        <div className="header line active">
                        </div>
                        <div className="view action">
                        <button type="button" className="submitBio" onClick={handleViewActive}>View Archived</button>
                        </div>
                        </div>
                    </div>
                    <div className="row shows">
                        {showInfoCards}
                    </div>
                </React.Fragment>
            )
        } else {
            return(
                <React.Fragment>
                    <div className="row show">
                        <div className="col-6 show">
                        <h3 className="active show">Archived Shows:</h3>
                        <div className="header line active">
                        </div>
                        <div className="view action">
                        <button type="button" className="submitBio" onClick={handleViewActive}>View Active</button>
                        </div>
                        </div>
                    </div>
                    <div className="row shows">
                        {notActive}
                    </div>
                    

                </React.Fragment>
                
            )
        }
    }
    function ShowInfoCard({title, admin, show_id, active, image, submissions, waiting, headshot, bio}) {

        return(
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
            <div className="card show">
                <div className="front">
                    <ShowImage image={image} title={title}/> 
                </div>
                <div className="back show">

                    <div className="back-content show">
                        <UpdateShow active={active} show_id={show_id} admin={admin} />
                        <ViewPlaybill show_id={show_id}/>
                        <Unarchive active={active} show_id={show_id} admin={admin}/>
                        <Waiting admin={admin} waiting={waiting} submission={submissions} headshot={headshot} bio={bio}/>
                    </div>
                </div>
            
            </div>
            </div>
        )
        }  

    for (const show of userShows) {
       
        if (show.active){
        showInfoCards.push(
            <ShowInfoCard 
            title={show.title}
            role={show.role}
            admin={show.is_admin}
            show_id={show.show_id}
            key={show.show_id}
            active={show.active}
            image={show.image}
            submissions={show.submissions}
            bio={show.bio}
            headshot={show.headshot}
            waiting={show.waiting}
           
            />,
        )
    } else {
        notActive.push(
            <ShowInfoCard
            title={show.title}
            role={show.role}
            admin={show.is_admin}
            show_id={show.show_id}
            key={show.show_id}
            active={show.active}
            image={show.image}
            submissions={show.submissions}
            bio={show.bio}
            headshot={show.headshot}
            waiting={show.waiting}
            />,

        )
    }}
   
    if(!isEditing) {
        return(
            <React.Fragment>
                <div className="header profile">
                        <div className="row">
                            <div className="col-6 offset-6">
                                <h4 className="header message">Break a leg, {user.fname} {user.lname}</h4>
                                <div className="header line"></div>
                            </div>
                        </div>
                        <div className="header actions">
                            <button type="button" className="submitBio" onClick={handleOnClick}>Edit Profile</button>
                        </div>
                    </div>
                 <ViewActive view={viewActive} />
                 </React.Fragment>
        )
    } else {
        return(
            <React.Fragment>
                 <div className="header profile">
                        <div className="row">
                            <div className="col-6 offset-6">
                                <label for="firstName" style={{transition:"none", fontFamily: "Raleway", fontSize: "14px"}}>First Name: </label>
                            <input style={{margin: "3px", fontFamily: "Raleway", fontSize: "14px"}} id="firstName" type="text" placeholder={user.fname} value={user.fname} onChange={handleFNameChange}/>
                            <label style={{fontFamily: "Raleway", fontSize: "14px"}}for="lastName">Last Name: </label>
                            <input style={{margin: "3px", fontFamily: "Raleway", fontSize: "14px"}} id="lastName" type="text" placeholder={user.name} value={user.lname} onChange={handleLNameChange}/>
                                <div className="header line"></div>
                                
            <button type="submit" onClick={handleSumbission} className="submitBio">
                Submit your Changes!
                </button>
              
                            </div>
                        </div>
                        
                    </div>
               
            
            
            <ViewActive view={viewActive} />
            </React.Fragment>
        )
    }}



ReactDOM.render(<UserShows />, document.querySelector('#userShows'))