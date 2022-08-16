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

    function HeadshotPending({ headshot, user_id, hpend }) {
        if (hpend) {
        return (
                <div className="col-4">
                    <img src={headshot}></img>
                    <form action='/approveheadshot' method="POST">
                        <input type="hidden" name="user_id" value={user_id}></input>
                        <button type="submit">Approve</button>
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

        if (bpend) {
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
                        <button type="submit">Approve</button>
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
             <h3>Who's Who</h3>
             <div className="castList">
                <div className="row">
                    {pendingCastRows}
                </div>
            </div>
        </React.Fragment>
    )



}

ReactDOM.render(<WhosWhoApproval />, document.querySelector("#approvals"))