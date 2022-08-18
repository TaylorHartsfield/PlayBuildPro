function WhosWho() {


    const [castList, setCastList] = React.useState([]);
    const [pageNumber, setPageNumber] = React.useState(0);

    const ITEMS_PER_PAGE = 5;

    const pageStartIndex = pageNumber * ITEMS_PER_PAGE;
    const pageEndIndex = pageStartIndex + ITEMS_PER_PAGE;
    
    const pageItems = castList.slice(pageStartIndex, pageEndIndex)
    
    React.useEffect(() => {
        fetch('/api/getCast')
        .then((response)=> response.json())
        .then((result)=> {
        setCastList(result.cast)
     
    });
    }, []);
    
   function handleNext(){
        setPageNumber(pageNumber+1)
   }

   function handleBack() {
    if (pageNumber === 0){
        setPageNumber(0)
    } else {
    setPageNumber(pageNumber-1)
    }}

   function CastInfoCard({fname, lname, role, headshot, bio}) {
            return (
                <React.Fragment>
                
                <div className="row whoswho" draggable>
                    <div className="col-4 head">
                        <img src={headshot}></img>
                    </div>
                    <div className="col-8">
                        <div className="row">
                            <div className="col" style={{textAlign: 'left'}}>
                                <h6>{fname} {lname} (<i>{role}</i>)</h6>
                            </div>
                        </div>
                        <div className="row" style={{textAlign: 'right'}}>
                            <p>{bio}</p>
                        </div>
                    </div>
                </div>
        
                </React.Fragment>
            )

   }
   function NextPage() {
    return (<div>
        <button type="button" onClick={handleNext}>Next</button>
    </div>)
   }

    function PrevPage() {
        return(<div>
            <button type="button" onClick={handleBack}>Previous</button>
        </div>)
    }


    // function EndOfCast() {
    //     if (pageItems.length <= 0) {
    //         return (
    //             <div className="row">
    //                 <h4>ACKNOWLEDGEMENTS</h4>
    //                 <div className="row">
    //                     <p>Thank you for coming to our show!</p>
    //                 </div>  
    //             </div>
    //         )
    //     } else {
    //         return (
    //             <div>Hello</div>
    //         )
    //     }
    // }
        return (
            <React.Fragment>
                 <h3>Who's Who</h3>
                <div className="castList">

                    {pageItems.map((item)=> 
                        {return <CastInfoCard
                            fname={item.fname}
                            lname={item.lname}
                            role={item.role}
                            headshot={item.headshot}
                            bio={item.bio}
                            key={item.id}
                            />})}
                </div>
                <NextPage />
                <PrevPage />
           </React.Fragment>
        )
}
    

ReactDOM.render(<WhosWho />, document.querySelector('#cast'))