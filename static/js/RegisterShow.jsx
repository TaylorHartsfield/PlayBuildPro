function RegisterShow() {

    const [editing, setEditing] = React.useState(false)
    const [state, setState] = React.useState({
        "title": "",
        "company": '',
        "openingNight": '',
        "closingNight": '',
        "theater": '',
        "image": null,
        "city": '',
        "state": '',
        "zipcode": '',
    })
   
   
    function handleOnChange(event) {
        setState({...state, [event.target.name]:event.target.value}) 
        
    }

    function handleEditing(event){
        setState({...state, [event.target.name]:event.target.value}) 
        setEditing(true)
    }

    function handleImageChange(event) {
        setState({...state, 'image': URL.createObjectURL(event.target.files[0])})
    }


    function PlayBillView() {
        return (
            <div>
                <div className="slideBase">
                    <div className="cover">
                        <div className="cover-head">
                            <div className="cover_head_text">
                                <p style={{fontSize: "16px"}}><strong>{state.company}</strong><br/>
                                {state.theater}<br/></p>
                            </div>
                        </div>
                    </div>
                    <div className="body_base">
                        <img id="playBillImg" src={state.image}></img>
                    </div>
                </div>
            </div>
        )
    }

    function Title({editing}){
        if(editing){
            return(
                <h1 style={{marginTop:"5px", marginBottom: "1px"}}>{state.title}</h1>
            )
        } else {
            return (
                <h1 style={{marginTop:"5px", marginBottom: "1px"}}>Register A New Show</h1>
            )
        }
    }
   return (
     <React.Fragment>
        <Title editing={editing}/>

          <div style={{height:"3px", marginBottom: "1rem",overflow:"auto"}}className="line company"></div>
        <div className="row">
            <div className="col-sm-12 col-xs-12 col-md-6 col-lg-6 col-xl-6" align="center" style={{fontFamily: "Raleway", paddingTop: ".5rem"}}>
                    <h4 align="center">Company Information</h4>
                    
                    <form align="left" action='/register_show' method="POST" encType="multipart/form-data">
                        <label className="add label register" for="company">Company Name</label>
                        <input id="company" className="add register" type="text" name="company" value={state.company} onChange={handleOnChange} placeholder="Company Name" required/>
                        <div style={{height:"1px"}} className="line company register"></div>

                        <label className="add label register" for="city">City</label>
                        <input id="city" className="add register" type="text" name="city" value={state.city} onChange={handleOnChange} placeholder="City"required/>
                        <div style={{height:"1px"}} className="line company register"></div>
                        
                        <label className="add label register" for="state">State</label>
                        <input id="state" className="add register" type="text" name="state" value={state.state} onChange={handleOnChange} placeholder="State" required/>
                        <div style={{height:"1px"}} className="line company register"></div>
                        
                        <label className="add label register" for="zipcode">Zip Code</label>
                        <input id="zipcode" className="add register" type="number" name="zipcode" value={state.zipcode} onChange={handleOnChange} placeholder="Zipcode" required/>
                        <div style={{height:"1px", marginBottom: "10px"}} className="line company register"></div>
                        
                      
                    <h4 align="center">Show and Performance Information</h4>
                        <label className="add label register" for="title">Show Title</label>
                        <input id="title" className="add register" type="text" name="title" value={state.title} onChange={handleEditing} placeholder="Show Title" required/>
                        <div style={{height:"1px"}} className="line company register"></div>
                        
                        <label className="add label register" for="theater">Performances at <i>(Theater Name)</i></label>
                        <input type="text" id="theater" className="add register" name="theater" value={state.theater} onChange={handleOnChange} placeholder="Theater Name"required/>
                        <div style={{height:"1px"}} className="line company register"></div>
                       
                        <label className="add label register" for="openingNight">Opening Night</label>
                        <input style={{fontSize: "14px"}} id="openingNight" className="add register" type="date" name="openingNight" value={state.openingNight} onChange={handleOnChange} required/>
                        <div style={{height:"1px"}} className="line company register"></div>
                        
                        <label className="add label register" for="closingNight">Closing Night</label>
                        <input style={{fontSize: "14px"}}id="closingNight" className="add register" type="date" name="closingNight" value={state.closingNight} onChange={handleOnChange} required/>
                        <div style={{height:"1px"}} className="line company register"></div>
                        
                        
                        <label className="add label register" style={{marginBottom: "1px"}}for="image">Preview Your Playbill Cover Image<br/></label>
                        <input id="image" onChange={handleImageChange} className="form-control" type="file" name="image" style={{marginTop:"3px"}}/>
                        
                        <button  className="submitBio" type="submit" style={{fontSize: "20px", marginTop: "12px",fontSize: "12px",padding: "1rem 5rem", width: "fit-content", marginLeft: "25%"}}>Looks Good!</button>
                        </form>
                   
                    </div>
                   
                    
          

            <div className="col-sm-12 col-xs-12 col-md-6 col-lg-6 col-xl-6" align="center">
                <PlayBillView />
            </div>

        </div>
    </React.Fragment>
   )
}

ReactDOM.render(<RegisterShow />, document.querySelector('#registerShow'))