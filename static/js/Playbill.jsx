function Playbill() {

    const [show, setShow] = React.useState({})
    const [page, setPage] = React.useState(0)
    const [cast, setCast] = React.useState([])
    const [whoPage, setWhoPage] =React.useState(0)

    const ITEMS_PER_PAGE = 4;
    const pageStartIndex = whoPage * ITEMS_PER_PAGE;
    const pageEndIndex = pageStartIndex + ITEMS_PER_PAGE;
    
    const pageItems = cast.slice(pageStartIndex, pageEndIndex)

    const castList = []

    React.useEffect(() =>{
        fetch('/api/showInfo')
        .then((response) => response.json())
        .then((result) => {
            setShow(result.show)
        })
}, [])

    React.useEffect(()=>{
        fetch('/api/getCast')
        .then((response)=> response.json())
        .then((result) => {
        setCast(result.cast)
        })
    }, []);

    for (const member of cast){
        if (member.role!="Admin") {
        castList.push(
            <CastList 
            fname={member.fname}
            lname={member.lname}
            role={member.role}
            key={member.id}
            hpend={member.hpend}
            bpend={member.bpend}
            headshot={member.headshot}
            bio={member.bio}
            /> 
        )
        }
    }
    function handleNext() {
        if (page === 2) {
            if (pageItems[(pageItems.length -1)] === cast[(cast.length -1)]) {
                setPage(page)
                setWhoPage(whoPage)
               
            } else {
                setWhoPage(whoPage+1)
        }} else {
            setPage(page+1)
        }           
       }
    

    function handlePrev() {
        if (page === 2) {
            if (whoPage === 0) {
                setPage(page - 1)
            } else {
                setWhoPage(whoPage -1)
            } 
        } else if (page <= 0) {
            setPage(0)
        } else {
            setPage(page - 1)
        }
    }
    
    function OnPage(){
        if (page === 0) {
            return (
                <Cover/>
            )
        } else if (page === 1) {
            return (
                <React.Fragment>
                    <div className="allCast">
                        <h3>Cast</h3>
                        <div style={{height:"2px", marginBottom: "1rem",overflow:"auto"}}className="line company"></div>
                        {castList}
                    </div>
                </React.Fragment>
            )
        } else if (page === 2) {

            return (
                <React.Fragment>
                 <h3>Who's Who</h3>
                 <div style={{height:"2px", marginBottom: "1rem",overflow:"auto"}}className="line company"></div>
                    <div className="castList">
                        {pageItems.map((item)=> 
                        {if(item.role!="Admin") {return <CastInfoCard
                            fname={item.fname}
                            lname={item.lname}
                            role={item.role}
                            headshot={item.headshot}
                            bio={item.bio}
                            key={item.id}
                            hpend={item.hpend}
                            bpend={item.bpend}
                            />}})}
                </div>
           </React.Fragment>
           )
        }
    }

    function Cover() {
        return (
            <React.Fragment>
                        <div className="cover">
                            <div className="cover-head">
                                <div className="cover_head_text">
                                    <p><strong>{show.company}</strong><br/>
                                        {show.theater_name}<br/>
                                        {show.city}</p>
                                </div>
                            </div>
                        </div>
                        <div className="body_base">
                            <img id="playbill-img" src={show.image}/>
                        </div>
            </React.Fragment>
        )
    }
    function CastList({fname, lname, role}) {
       return (
            <React.Fragment>
                <div className="row">
                    <div className="col-4" >
                        <strong><p style={{fontSize: "14px", float: "center"}}>{role}</p></strong>
                    </div>
                    <div className="col-4">
                        <p>............................................</p> 
                    </div>
                    <div className="col-4">
                        <strong><p style={{fontSize: "14px", float: "center"}}>{fname} {lname}</p></strong>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    function Headshot({headshot, hpend}){
        if (hpend || headshot==="/static/img/download.png") {
            return (
                <div className="col-4 head">
                
            </div>
            )
           
        } else {
            return (
                <div className="col-4 head">
                    <img src={headshot}></img>
                </div>
            )
        }
    }

    function Bio ({bio, bpend}) {
     
        if (bpend || bio === 'No Bio Submitted') {
            return (
            
                    <span></span>
              
            )
        } else {
                return(
                    <p textAlign="right">{bio}</p>
                )
        }
    }

    function CastInfoCard({fname, lname, role, headshot, bio, bpend, hpend}) {
        return (
            <React.Fragment>
            
            <div className="row whoswho">
                <Headshot headshot={headshot} hpend={hpend} />
                <div className="col-8">
                    <div className="row">
                        <div className="col" style={{textAlign: 'left'}}>
                            <h6>{fname} {lname} (<i>{role}</i>)</h6>
                        </div>
                    </div>
                    <div className="row" style={{textAlign: 'right'}}>
                    <Bio bio={bio} bpend={bpend} />
                </div>
                   
                </div>
            </div>
    
            </React.Fragment>
        )

}


    return (
        <React.Fragment>
           
            <div className="playbillBase">
                <button className="pager-prev" onClick={handlePrev}/>
                        <div className="slideBase">
                            {OnPage()}
                        </div>
                    <button className="pager-next" onClick={handleNext}/>
            </div>
         
        </React.Fragment>
    )


}

ReactDOM.render(<Playbill />, document.querySelector('#playbillContainer'))