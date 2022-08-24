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

    function Admin({admin, show_id}){
        
        if(admin) {
            return (
                <div>
                    <form action='/archive'>
                        <input type="hidden" value={show_id} name='show_id'></input>
                        <button type="submit">Unarchive</button>
                    </form>
                </div>
            )
        }


    }

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
            return (
                <div className="notActive">
                    <p>Title: {title}</p>
                    <p>Role: {role}</p>
                    <form action='/viewplaybill'>
                        <input type="hidden" value={show_id} name='show_id'></input>
                        <button type="submit">View Playbill</button>
                    </form>
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
            />,
            <Admin admin={show.is_admin} show_id={show.show_id} />
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