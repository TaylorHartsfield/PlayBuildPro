function RegisterShow() {

    const opening = {year: 'numeric', month: 'long', day: 'numeric'};
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
            <div className="col-sm-12 col-xs-12 col-md-6 col-lg-6 col-xl-6">
                <br/>
                
                    <h4>Company Information</h4>
                    
                    <form action='/register_show' method="POST" encType="multipart/form-data">
                        <label for="company">Company Name:</label>
                        <input id="company" className="form-control" type="text" name="company" value={state.company} onChange={handleOnChange} required/>
                        <label for="city">City:</label>
                        <input id="city" className="form-control" type="text" name="city" value={state.city} onChange={handleOnChange} required/>
                        <label for="state">State:</label>
                        <input id="state" className="form-control" type="text" name="state" value={state.state} onChange={handleOnChange} required/>
                        <label for="zipcode">Zip Code:</label>
                        <input id="zipcode" className="form-control" type="number" name="zipcode" value={state.zipcode} onChange={handleOnChange} required/>
                        <br/>
                    <h4>Show and Performance Information</h4>
                        <label for="title">Show Title:</label>
                        <input id="title" className="form-control" type="text" name="title" value={state.title} onChange={handleEditing} required/>
                        <label for="theater">Performances at: <i>(Theater Name)</i></label>
                        <input type="text" id="theater" className="form-control" name="theater" value={state.theater} onChange={handleOnChange} required/>

                        <label for="openingNight">Opening Night:</label>
                        <input id="openingNight" className="form-control" type="date" name="openingNight" value={state.openingNight} onChange={handleOnChange} required/>
                        <label for="closingNight">Closing Night:</label>
                        <input id="closingNight" className="form-control" type="date" name="closingNight" value={state.closingNight} onChange={handleOnChange} required/>


                        <label for="image">Preview Your Playbill Cover Image:<br/><i>You will upload your final image at a later step</i></label>
                        <input id="image" onChange={handleImageChange} className="form-control" type="file" name="image" style={{marginTop:"3px"}}/>
                        <button className="submitBio" type="submit" style={{marginTop:"5px", marginBottom: "3px"}}>Looks Good!</button>
                    </form>
                    <p style={{marginTop:"3px"}}><i>Don't worry! You can edit this information later!</i></p>
            </div>

            <div className="col-sm-12 col-xs-12 col-md-6 col-lg-6 col-xl-6">
                <PlayBillView />
            </div>

        </div>
    </React.Fragment>
   )
}

ReactDOM.render(<RegisterShow />, document.querySelector('#registerShow'))