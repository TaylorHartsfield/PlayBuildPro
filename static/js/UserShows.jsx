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


    function ShowInfoCard({title, role, admin, show_id, active}) {
       
        if (active) {
            if (admin) {
                return (
                <div className="showCard">
                    <p>Title: {title}</p>
                    <p>Role: {role}</p>
                    <form action='/updateshow'>
                        <input type="hidden" name="show_id" value={show_id}/>
                        <input type="submit" placeholder="View/Edit Show Info" />
                    </form>
                </div> )
                } else {
                return (
                    <div className="showCard">
                        <p>Title: {title}</p>
                        <p>Role: {role}</p>
                        <form action='/updateshow'>
                            <input type="hidden" name="show_id" value={show_id}/>
                            <input type="submit" placeholder="View/Edit Show Info" />
                        </form>
                    </div>
                )
             }
        } else {
            console.log("Returning falsey")
            return (
                <div className="notActive">
                    <p>Title: {title}</p>
                    <p>Role: {role}</p>
                    <a href='/viewplaybill'>View Playbill</a>
                </div>
            )
        }
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
            />
        )
    }}
    
    return (
        <React.Fragment>
            <div className="row">
           
                <div className="col-6">
                    <h3>Active Shows:</h3>
                    <div className="showInfoCards">
                        {showInfoCards}
                        </div>
                    </div>
                
            <div className="col-6">
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