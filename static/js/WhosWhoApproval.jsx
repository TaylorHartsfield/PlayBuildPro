function WhosWhoApproval () {

    const [pending, setPending] = React.useState([])

    const pendingCastRows = []

    React.useEffect(() => {
        fetch('/api/getCast')
        .then((response) => response.json())
        .then((result) => {
            setPending(result.pending)
        })
    }, [])

   
    function HeadshotPending({ headshot, user_id, hpend }) {
        if (hpend && headshot != '/static/img/download.png') {
        return (
                <div className="col-4">
                    <img src={headshot}></img>
                    <form action='/approveheadshot' method="POST">
                        <input type="hidden" name="user_id" value={user_id}></input>
                        <button className="submitBio"style={{marginTop: "5px"}} type="submit">Approve</button>
                    </form>
                </div>
       
        )} else {
           
           return (
                <div className="col-4">
                    <img src={headshot}></img>
                </div>)

        }
    }

    function BioPending({fname, lname, role, bio, user_id, bpend}) {
        console.log(user_id)

        if (bpend && bio != 'No Bio Submitted') {
            return (
                <div className="col-8">
                    <div className="row">
                        <div className="col" style={{textAlign: 'left'}}>
                            <h6>{fname} {lname} (<i>{role}</i>)</h6>
                        </div>
                    </div>
                    <div className="row" style={{textAlign: 'right'}} >
                        <p>{bio}</p>
                    </div>
                    <form action='/approvebio' method="POST">
                        <input type="hidden" name="user_id" value={user_id}></input>
                        <button className="submitBio" style={{bottom: "0"}}type="submit">Approve</button>
                    </form>
                </div>
            )
        } else {
            return (
                <div className="col-8">
                    <div className="row">
                        <div className="col" style={{textAlign: 'left'}}>
                            <h6>{fname} {lname} (<i>{role}</i>)</h6>
                        </div>
                    </div>
                    <div className="row" style={{textAlign: 'right'}} >
                        <p>{bio}</p>
                    </div>
                </div>
            )
        }
    }
    
      
    
    for (const pend of pending) {

            pendingCastRows.push(
                <HeadshotPending 
                headshot={pend.headshot}
                user_id={pend.id} 
                hpend={pend.hpend}
                key={pend.id} 
                />,
                <BioPending
                fname={pend.fname}
                lname={pend.lname} 
                role={pend.role}
                bio={pend.bio} 
                user_id={pend.id} 
                bpend={pend.bpend}
                key={pend.id} 
                />

            )
        }
            

    return (
        <React.Fragment>
           <div className="row">
            <h3 style={{marginBottom: "2px", marginTop: "10px"}}>Who's Who</h3>
            <div className="row" style={{justifyContent:"center", alignContent:"center"}}>
                    <a href="/updateshow"  style={{margin: "2px", width:"fit-content", textAlign:"center", display: "flex", alignContent: "center",justifyContent:"center"}}className="submitBio">Back to Show Profile</a>
                    <a href="/viewplaybill"  style={{margin: "2px", width:"fit-content"}} className="submitBio">View Playbill</a>
                </div> 
            </div>
            <div className="playbillBase">
                <div className="slideBase">
                    <div className="castList">
                        <div className="row">
                            {pendingCastRows}
                        </div>
                    </div>  
                   
                </div>                   
            </div>

          
            
            
         
             
        </React.Fragment>
    )



}

ReactDOM.render(<WhosWhoApproval />, document.querySelector("#approvals"))