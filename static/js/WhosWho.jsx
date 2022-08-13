function WhosWho() {


    const [castList, setCastList] = React.useState([])
    
    const whosWhoRows = []

    React.useEffect(() => {
        fetch('/api/getCast')
        .then((response)=> response.json())
        .then((result)=> {
        setCastList(result.cast)
   
    });
    }, []);
    

   function CastInfoCard({fname, lname, role, headshot, bio}) {
            return (
                <React.Fragment>
                <div className="row">
                    <h5>{fname} {lname} as {role}</h5>
                    <div className="col-4">
                        <img src={headshot}></img>
                    </div>
                    <div className="col-6">
                        <p>{bio}</p>
                    </div>
                </div>
                </React.Fragment>
            )

   }

   function CastPendingCard ({fname, lname, role}) {

    return (
        <React.Fragment>
            <div className="row">
                <h5>{fname} {lname} as {role}</h5>
                <div className="col-4">
                    <h3>Submission Waiting for approval!</h3>
                </div>
                <div className="col-6">
                    <p>Submission waiting for approval!</p>
                </div>
            </div>
        </React.Fragment>
    )
   }
    
   for (const cast of castList) {
   
    whosWhoRows.push(
        <CastInfoCard
        fname={cast.fname}
        lname={cast.lname}
        role={cast.role}
        headshot={cast.headshot}
        bio={cast.bio}
        key={cast.id}
        />
    )
   }

    
        return (
            <React.Fragment>
                <div className="castList">
                    {whosWhoRows}
                </div>
           </React.Fragment>
        )
    }
    

ReactDOM.render(<WhosWho />, document.querySelector('#cast'))