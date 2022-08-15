function RegisterShow() {

    const [state, setState] = React.useState({
        "title": '',
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


    function handleImageChange(event) {
        setState({...state, 'image': URL.createObjectURL(event.target.files[0])})
    }

    function handleSubmission(){

        const formInputs = {
            title: `${state.title}`,
            company: `${state.company}`,
            openingNight: `${state.openingNight}`,
            closingNight: `${state.closingNight}`,
            theater: `${state.theater}`,
            image: `${state.image}`,
            city: `${state.city}`,
            state: `${state.state}`,
            zipcode: `${state.zipcode}`,

        }

        console.log(formInputs)

        fetch('/register_show', {
            method: "POST",
            body: JSON.stringify(formInputs),
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: "follow",
        })
        .then((response) => response.text())
        .then((jsonresponse) => {
            
            console.log(jsonresponse)
        })       

    }

    function PlayBillView() {
        return (
            <div>
                <div className="slideBase">
                <h3>{state.title}</h3>
                    <div className="cover">
                        <div className="cover-head">
                            <div className="cover_head_text">
                                <p><strong>{state.company}</strong><br/>
                                {state.theater}<br/>
                                {state.openingNight} - {state.closingNight}</p>
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
   return (
     <React.Fragment>
        <div className="row">
            <div className="col-6">
                <form method="POST" encType="multipart/form-data">
                    <h4>Company Information</h4>
                        <label for="company">Company Name:</label>
                        <input id="company" className="form-control" type="text" name="company" value={state.company} onChange={handleOnChange}/>
                        <label for="city">City:</label>
                        <input id="city" className="form-control" type="text" name="city" value={state.city} onChange={handleOnChange}/>
                        <label for="state">State:</label>
                        <input id="state" className="form-control" type="text" name="state" value={state.state} onChange={handleOnChange}/>
                        <label for="zipcode">Zip Code:</label>
                        <input id="zipcode" className="form-control" type="number" name="zipcode" value={state.zipcode} onChange={handleOnChange}/>
                    <h4>Show and Performance Information</h4>
                        <label for="title">Show Title:</label>
                        <input id="title" className="form-control" type="text" name="title" value={state.title} onChange={handleOnChange}/>
                        <label for="theater">Performances at: <i>(Theater Name)</i></label>
                        <input type="text" id="theater" className="form-control" name="theater" value={state.theater} onChange={handleOnChange} />
                        <label for="openingNight">Opening Night:</label>
                        <input id="openingNight" className="form-control" type="date" name="openingNight" value={state.openingNight} onChange={handleOnChange} />
                        <label for="closingNight">Closing Night:</label>
                        <input id="closingNight" className="form-control" type="date" name="closingNight" value={state.closingNight} onChange={handleOnChange} />
                        <label for="image">Preview Your Playbill Cover Image:<br/><i>You will upload your final image at a later step</i></label>
                        <input id="image" onChange={handleImageChange} className="form-control" type="file" name="image" /><br/>
                    <button type="button" onClick={handleSubmission}>Looks Good!</button>
                    <p><i>Don't worry! You can edit this information later!</i></p>
                </form>
            </div>

            <div className="col-6">
                <PlayBillView />
            </div>

        </div>
    </React.Fragment>
   )
}

ReactDOM.render(<RegisterShow />, document.querySelector('#registerShow'))