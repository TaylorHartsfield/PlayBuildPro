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

    console.log(pending)
    

    function PendingCast({fname, lname, role, headshot, bio, user_id}) {

        return (
            <React.Fragment>
           
            <div className="row whoswho">
                <div className="col-4">
                    <img src={headshot}></img>
                    <form action='/approveheadshot' method="POST">
                        <input type="hidden" name="user_id" value={user_id}></input>
                        <button type="submit">Approve</button>
                    </form>
                   
                </div>
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
                        <button type="submit">Approve</button>
                    </form>
                </div>
            </div>
    
            </React.Fragment>
        
        )}

   
    
    for (const pend of pending) {

        if ((pend.hpend) | (pend.bpend)){
            console.log(pend.fname)

            pendingCastRows.push(
                <PendingCast
                fname={pend.fname}
                lname={pend.lname}
                role={pend.role}
                headshot={pend.headshot}
                bio={pend.bio}
                user_id={pend.id} />
            )
        }
    }

    

    return (
        <React.Fragment>
             <h3>Who's Who</h3>
             <div className="castList">
           
            {pendingCastRows}
            
            </div>
        </React.Fragment>
    )



}

ReactDOM.render(<WhosWhoApproval />, document.querySelector("#approvals"))