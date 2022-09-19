function UserShows() {

    const [userShows, setUserShows] = React.useState([])
    
    const showInfoCards = [];
    const notActive = [];

    React.useEffect(() => {
        fetch('/api/usershows')
        .then((response) => response.json())
        .then((result) => {
            setUserShows(result.shows);
        });
        }, []);

    
    function ShowInfoCard({title, role, admin, show_id, active, image, submissions, headshot, bio, waiting}) {

        return(
            <div className="card show" >
                <div className="card content">
                    <div className="row">
                    <img className="card-img" src={image}></img>
                    </div>
                    <h2 className="card-title show">{title}</h2>
                    <p className="card-body show">{role}</p>
                    <form action='/updateshow'>
                        <input type="hidden" name="show_id" value={show_id}/>
                        <button type="submit" class="submitBio">Update Show</button>
                    </form>
                    <form action='/viewplaybill'>
                        <input type="hidden" name="show_id" value={show_id}/>
                        <button type="submit" class="submitBio">View Playbill</button>
                    </form>
                    <Waiting waiting={waiting} submissions={submissions} />
                </div>
            </div>
        )
       
        if (active && admin && submissions) {
                return (
                <div className="row" style={{borderStyle: "solid", borderRadius:"5px", padding: "5px", margin: "5px"}}>
                    <div className="col-4" style={{paddingTop: "10px"}}>
                                <img src={image} style={{height: "100px", width: "100px"}}/>
                            </div>
                            <div className="col-4" style={{fontFamily: "broadway", paddingTop: "20px"}}>
                                <h6><i><strong>{title}</strong></i></h6>
                                <p><i>as {role}</i></p>
                            </div>
                            <div className="col-4" style={{paddingTop: "10px"}}>
                    <form action='/updateshow'>
                        <input type="hidden" name="show_id" value={show_id}/>
                        <button type="submit" 
                                    style={{
                                    backgroundColor: "transparent", 
                                    fontFamily: "broadway", 
                                    boxShadow: "0 3px 5px rgba(0,0,0,0.18)", 
                                    borderRadius: "8px", 
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "100px"}}>
                                    Update Playbill
                                </button>
                    </form>
                    <form action='/viewplaybill'>
                        <input type="hidden" name="show_id" value={show_id}/>
                        <button type="submit" 
                                    style={{
                                    backgroundColor: "transparent", 
                                    fontFamily: "broadway", 
                                    boxShadow: "0 3px 5px rgba(0,0,0,0.18)", 
                                    borderRadius: "8px", 
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "100px"}}>
                                    View Playbill
                                </button>
                    </form>
                    <Waiting waiting={waiting} />
                    <h6 style={{color: "blue"}}>New Submissions to Approve!</h6>
                    </div>
                </div> )
                } else if (active && !submissions && admin) {
                    return (
                        <div className="row" style={{borderStyle: "solid", borderRadius:"5px", padding: "5px", margin: "5px"}}>
                            <div className="col-4" style={{paddingTop: "10px"}}>
                                <img src={image} style={{height: "100px", width: "100px"}}/>
                            </div>
                            <div className="col-4" style={{fontFamily: "broadway", paddingTop: "20px"}}>
                                <h6><i><strong>{title}</strong></i></h6>
                                <p><i>as {role}</i></p>
                            </div>
                            <div className="col-4" style={{paddingTop: "10px"}}>
                            <form action='/updateshow'>
                                <input type="hidden" name="show_id" value={show_id}/>
                                <button type="submit" 
                                    style={{
                                    backgroundColor: "transparent", 
                                    fontFamily: "broadway", 
                                    boxShadow: "0 3px 5px rgba(0,0,0,0.18)", 
                                    borderRadius: "8px", 
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "100px"}}>
                                    Update Playbill
                                </button>
                                </form>
                            <form action='/viewplaybill'>
                                <input type="hidden" name="show_id" value={show_id}/>
                                <button type="submit"
                                    style={{
                                    backgroundColor: "transparent", 
                                    fontFamily: "broadway", 
                                    boxShadow: "0 3px 5px rgba(0,0,0,0.18)", 
                                    borderRadius: "8px", 
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "100px"}}>
                                    View Playbill
                                </button>
                            </form>
                            <Waiting waiting={waiting} />
                            </div>
                        </div>) 
                } else if (active && !admin && (bio==="No Bio Sumbitted" | headshot === "/static/img/download.png")) {
                    return (
                        <div className="row" style={{borderStyle: "solid", borderRadius:"5px", padding: "5px", margin: "5px"}}>
                           <div className="col-4" style={{paddingTop: "10px"}}>
                                <img src={image} style={{height: "100px", width: "100px"}}/>
                            </div>
                            <div className="col-4" style={{fontFamily: "broadway", paddingTop: "20px"}}>
                                <h6><i><strong>{title}</strong></i></h6>
                                <p><i>as {role}</i></p>
                            </div>
                            <div className="col-4" style={{paddingTop: "10px"}}>
                         
                            <h5>  
                            <form action='/updateshow'>
                                <input type="hidden" name="show_id" value={show_id}/>
                                <button type="submit" 
                                    style={{
                                    backgroundColor: "transparent", 
                                    fontFamily: "broadway", 
                                    boxShadow: "0 3px 5px rgba(0,0,0,0.18)", 
                                    borderRadius: "8px", 
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "100px"}}>
                                    Update Playbill
                                </button>
                            </form>
                            </h5>  
                            <h5> 
                            <form action='/viewplaybill'>
                                <input type="hidden" name="show_id" value={show_id}/>
                                <button type="submit"
                                    style={{
                                    backgroundColor: "transparent", 
                                    fontFamily: "broadway", 
                                    boxShadow: "0 3px 5px rgba(0,0,0,0.18)", 
                                    borderRadius: "8px", 
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "100px"}}>
                                    View Playbill
                                </button>
                            </form>
                            </h5> 
                            <p style={{color: "red"}}><strong>Please submit your headshot and bio!</strong></p>
                            </div>
                        </div>) 
                } else if (active && !admin) {
                    return (
                        <div className="row" style={{borderStyle: "solid", borderRadius:"5px", padding: "5px", margin: "5px"}}>
                             <div className="col-4" style={{paddingTop: "10px"}}>
                                <img src={image} style={{height: "100px", width: "100px"}}/>
                            </div>
                            <div className="col-4" style={{fontFamily: "broadway", paddingTop: "20px"}}>
                                <h6><i><strong>{title}</strong></i></h6>
                                <p><i>as {role}</i></p>
                            </div>
                            <div className="col-4" style={{paddingTop: "10px"}}>
                            <form action='/updateshow'>
                                <input type="hidden" name="show_id" value={show_id}/>
                                <button type="submit" 
                                    style={{
                                    backgroundColor: "transparent", 
                                    fontFamily: "broadway", 
                                    boxShadow: "0 3px 5px rgba(0,0,0,0.18)", 
                                    borderRadius: "8px", 
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "100px"}}>
                                    Update Playbill
                                </button>
                            </form>
                            <form action='/viewplaybill'>
                                <input type="hidden" name="show_id" value={show_id}/>
                                <button type="submit"
                                    style={{
                                    backgroundColor: "transparent", 
                                    fontFamily: "broadway", 
                                    boxShadow: "0 3px 5px rgba(0,0,0,0.18)", 
                                    borderRadius: "8px", 
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "100px"}}>
                                    View Playbill
                                </button>
                            </form>
                            </div>
                        </div>) 
                } else if (admin && !active) {
                    return (
                        <div className="row" style={{borderStyle: "solid", borderRadius:"5px", padding: "5px", margin: "5px"}}>
                            <div className="col-4">
                                <img src={image} style={{height: "100px", width:"100px"}}/>
                            </div>
                        <div className="col-4">
                                    <h6><i>{title}</i></h6>
                                    <p><i>as {role}</i></p>
                                </div>
                                <div className="col-4" style={{paddingTop: "20px"}}>
                                    <form action='/viewplaybill'>
                                        <input type="hidden" value={show_id} name='show_id'></input>
                                        <button type="submit"
                                    style={{
                                    backgroundColor: "transparent", 
                                    fontFamily: "broadway", 
                                    boxShadow: "0 3px 5px rgba(0,0,0,0.18)", 
                                    borderRadius: "8px", 
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "100px"}}>
                                    View Playbill
                                </button>
                                    </form>
                                    <form action='/archive'>
                                        <input type="hidden" value={show_id} name='show_id'></input>
                                        <button type="submit"
                                    style={{
                                    backgroundColor: "transparent", 
                                    fontFamily: "broadway", 
                                    boxShadow: "0 3px 5px rgba(0,0,0,0.18)", 
                                    borderRadius: "8px", 
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "100px"}}>
                                    Unarchive
                                </button>
                                </form>
                                </div>
                            </div>)
                } else if(!admin && !active) {
                    return (
                        <div className="row" style={{borderStyle: "solid", borderRadius:"5px", padding: "5px", margin: "5px"}}>
                            <div className="col-4" style={{paddingTop: "10px"}}>
                                <img src={image} style={{height: "100px", width: "100px"}}/>
                            </div>
                            <div className="col-4" style={{fontFamily: "broadway", paddingTop: "20px"}}>
                                <h6><i><strong>{title}</strong></i></h6>
                                <p><i>as {role}</i></p>
                            </div>
                            <div className="col-4" style={{paddingTop: "10px"}}>
                                <form action='/viewplaybill'>
                                    <input type="hidden" value={show_id} name='show_id'></input>
                                    <button type="submit"
                                    style={{
                                    backgroundColor: "transparent", 
                                    fontFamily: "broadway", 
                                    boxShadow: "0 3px 5px rgba(0,0,0,0.18)", 
                                    borderRadius: "8px", 
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "100px"}}>
                                    View Playbill
                                </button>
                                </form>
                            </div>
                        </div>)
                }}
                    

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
   
    function Waiting({waiting, submissions}) {
        if (submissions) {
            return (
                <div style={{paddingTop: "5px"}}>
                <h6 style={{color: "blue"}}>New Submissions to Approve!</h6>
            </div>
            )

        } else  if (waiting) {
            <div style={{paddingTop: "5px"}}>
            <p><i>Still waiting on some cast submissions!</i></p>
        </div>
           
        }

    }

    return (
        <React.Fragment>
            <div className="container" style={{paddingTop: "100px"}}>
                <div className="row">
                    <h3>Active Shows:</h3>
                    <div className="showInfoCards">
                        {showInfoCards}
                    </div>
                </div>
                    
                
                <div className="row">
                    <h3>Archived Shows:</h3>
                    <div className="notActive">
                        {notActive}
                    </div>
                </div>
            </div>
        </React.Fragment>
   
    )

}


ReactDOM.render(<UserShows />, document.querySelector('#userShows'))