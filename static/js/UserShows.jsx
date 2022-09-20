function UserShows() {

    const [userShows, setUserShows] = React.useState([])
    const[user, setUser] = React.useState({})
    const [isEditing, setIsEditing] = React.useState(false);
    const [archive, setArchive] = React.useState(false);

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
        setUser({...user, "fname": event.target.value})
    }

    function handleLNameChange(event) {
        setUser({...user, "lname": event.target.value})
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

    function renderEditUserInfo(){
        return (
       <React.Fragment>
            <div className="userStats">
                <div className="marqueetext">
                    <div className="row">
                        <h2 style={{fontFamily: "showtime", fontSize:"65px"}}>Starring</h2>
                    </div>
                    <div className="row" style={{paddingTop: "50px"}}>
                    <div className="card">
                        <input type="text" placeholder={user.fname} value={user.fname} onChange={handleFNameChange}/>
                        <input type="text" placeholder={user.lname} value={user.lname} onChange={handleLNameChange}/>
                        <div style={{paddingTop: "5px", paddingLeft: "10px"}}>
                        <button type="submit" onClick={handleSumbission} style={{
                            backgroundColor: "transparent", 
                            fontFamily: "broadway", 
                            boxShadow: "0 3px 5px rgba(0,0,0,0.18)", 
                            borderRadius: "8px", 
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100px"}}>
                            Submit your Changes!
                            </button>
                            </div>
                    </div>
                    </div>
                
                </div>
            </div>
            </React.Fragment>
         
            )

    }
    
    function Welcome({fname, lname}){

        return(
            <React.Fragment>
                <div className="header profile">
                    <div className="row">
                        <div className="col-6 offset-6">
                            <h4 className="header message">Break a leg, {fname} {lname}</h4>
                            <div className="header line"></div>
                        </div>
                    </div>
                    <div className="header actions">
                        <button type="button" className="submitBio" onClick={handleOnClick}>Edit Profile</button>
                    </div>
                </div>
            </React.Fragment>
        )

    }
    function Waiting({waiting, submission}) {

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
    function ShowInfoCard({title, role, admin, show_id, active, image, submissions, headshot, bio, waiting}) {

        return(
            <div className="col-3">
            <div className="card show">
                <div className="front">
                    <ShowImage image={image} title={title}/>
                </div>
                    <div className="back show">
                    <div className="back-content show">
                        <UpdateShow active={active} show_id={show_id} admin={admin} />
                        <ViewPlaybill show_id={show_id}/>
                        <Unarchive active={active} show_id={show_id} admin={admin}/>
                        <Waiting waiting={waiting} submission={submissions} />
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
   
   
    return (
        <React.Fragment>
            <Welcome fname={user.fname} lname={user.lname} />
            <div className="row">
                {/* {renderUserInfo()} */}
            </div>
            
                <div className="row">
                    <h3 className="active show">Active Shows:</h3>
                </div>
                    <div className="row shows">
                        {showInfoCards}
                    </div>
                
                    
                
                <div className="row">
                    <h3 className="active show">Archived Shows:</h3>
                    <div className="row shows">
                        {notActive}
                    </div>
                </div>
            
        </React.Fragment>
   
    )

}


ReactDOM.render(<UserShows />, document.querySelector('#userShows'))