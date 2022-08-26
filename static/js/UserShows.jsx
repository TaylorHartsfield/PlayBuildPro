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


    function ShowInfoCard({title, role, admin, show_id, active, image}) {
       
        if (active) {
                return (
                <div className="row" style={{borderStyle: "solid", borderRadius:"5px", padding: "5px", margin: "5px"}}>
                    <div className="col-4">
                        <img src={image} style={{height: "100px", width: "100px"}}/>
                    </div>
                    <div className="col-4">
                        <h6><i>{title}</i></h6>
                        <p><i>as {role}</i></p>
                    </div>
                    <div className="col-4">
                    <form action='/updateshow'>
                        <input type="hidden" name="show_id" value={show_id}/>
                        <button type="submit">Update Playbill</button>
                    </form>
                    <form action='/viewplaybill'>
                        <input type="hidden" name="show_id" value={show_id}/>
                        <button type="submit">View Playbill</button>
                    </form>
                    </div>
                </div> )
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
                    <div className="col-4">
                        <form action='/viewplaybill'>
                            <input type="hidden" value={show_id} name='show_id'></input>
                            <button type="submit">View Playbill</button>
                        </form>
                        <form action='/archive'>
                            <input type="hidden" value={show_id} name='show_id'></input>
                        <button type="submit">Unarchive</button>
                    </form>
                    </div>
                </div>
                )} else if(!admin && !active) {
                    return (
                        <div className="row" style={{borderStyle: "solid", borderRadius:"5px", padding: "5px", margin: "5px"}}>
                            <div className="col-4">
                                <img src={image} style={{height: "100px", width:"100px"}}/>
                            </div>
                            <div className="col-4">
                                <h6><i>{title}</i></h6>
                                <p><i>as {role}</i></p>
                            </div>
                            <div className="col-4">
                                <form action='/viewplaybill'>
                                    <input type="hidden" value={show_id} name='show_id'></input>
                                    <button type="submit">View Playbill</button>
                                </form>
                            </div>
                        </div>
                        )}
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
            />
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
            />,

        )
    }}
    
    return (
        <React.Fragment>
            <div className="container">
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