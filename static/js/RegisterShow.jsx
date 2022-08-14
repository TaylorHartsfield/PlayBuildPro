function RegisterShow() {

    const [state, setState] = React.useState({
        "title": '',
        "company": '',
        "openingNight": '',
        "closingNight": '',
        "theater": '',
        "image": "static/img/broadway.jpeg"
    })
    const [company, setCompany] = React.useState('');
    // const [title, setTitle] = React.useState('');

    function handleOnChange(event) {
        setState({...state, [event.target.name]:event.target.value})
    }

    function RegisterForm(){

        return (
            <div>
                
            </div>
        )
    };

    function PlayBillView() {
        return (
            <div>
                <div className="slideBase">
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
        <h3>{state.title}</h3>
            <div className="col-6">
                <RegisterForm />
                <form action='/register_show' method="POST" encType="multipart/form-data">
                <label for="company">Company Name:</label>
                <input id="company" className="form-control" type="text" name="company" value={state.company} onChange={handleOnChange}/>
                <label for="theater">Theater:</label>
                <input type="text" id="theater" className="form-control" name="theater" value={state.theater} onChange={handleOnChange} />
                <label for="openingNight">Opening Night:</label>
                <input id="openingNight" className="form-control" type="date" name="openingNight" value={state.openingNight} onChange={handleOnChange} />
                <label for="closingNight">Closing Night:</label>
                <input id="closingNight" className="form-control" type="date" name="closingNight" value={state.closingNight} onChange={handleOnChange} />
                <label for="title">Show Title:</label>
                <input id="title" className="form-control" type="text" name="title" value={state.title} onChange={handleOnChange}/>
                <label for="image">Upload Playbill Cover Image:</label>
                <input id="image" className="form-control" type="file" name="image" />
                </form>
                <label for="image">Upload Playbill Cover Image:</label>
                <form action="/editplaybillimage" method="POST" encType="multipart/form-data">
                            <input id="image" className="form-control" type="file" name="image" />
                            <input type="submit" />
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