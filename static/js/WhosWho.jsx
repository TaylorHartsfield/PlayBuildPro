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
                
                <div className="row whoswho" draggable>
                    <div className="col-4">
                        <img src={headshot}></img>
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
                    </div>
                </div>
        
                </React.Fragment>
            )

   }

   
    
   for (const cast of castList) {
  
    if (cast.role != "Admin"){
   
    whosWhoRows.push(
        <CastInfoCard
        fname={cast.fname}
        lname={cast.lname}
        role={cast.role}
        headshot={cast.headshot}
        bio={cast.bio}
        key={cast.id}
        />
    )}
   }




    
        return (
            <React.Fragment>
                 <h3>Who's Who</h3>
                <div className="castList">
                   {whosWhoRows}
                </div>
           </React.Fragment>
        )
}
    

ReactDOM.render(<WhosWho />, document.querySelector('#cast'))