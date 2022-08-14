function ShowEdits() {

    const[show, setShow] = React.useState({})
    const[isEditingShow, setIsEditingShow] = React.useState(false)

    
    React.useEffect(() => {
        fetch('/api/showInfo')
        .then((response) => response.json())
        .then((result) => {
            setShow(result.show)
            
        });
    }, []);

    
    function handleEditInfo() {
        setIsEditingShow(!isEditingShow)
    }


    function handleChangeCompany(event){
        setShow({...show, "company": event.target.value})}
    
    function handleChangeTitle(event) {
        setShow({...show, "title": event.target.value})
    
    }
    
    function handleClosingNightChange(event) {
        setShow({...show, "closing_night": event.target.value})
    
    }

    function handleOpeningNightChange(event) {
        setShow({...show, "opening_night": event.target.value})
    
    }

    function handleChangeTheater(event) {
        setShow({...show, "theater_name": event.target.value})
    
    }

    function handleChangeTickets(event) {
        setShow({...show, "tickets": event.target.value})}
    

    function handleSubmission() {
        
        const formInputs = {
            title: `${show.title}`,
            company: `${show.company}`,
            closing_night: `${show.closing_night}`,
            opening_night: `${show.opening_night}`,
            theater_name: `${show.theater_name}`,
            tickets: `${show.tickets}`
        }

        fetch('/updateShowInfo', {
            method: "POST",
            body: JSON.stringify(formInputs),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            setIsEditingShow(false)
        })
    
    }
    function renderShowInfo() {
        
        if (show.image === "None"){
            return (
                <div className="card">
                    <h3>{show.title}</h3>
                    <p>{show.company}</p>
                    <p>{show.theater_name}</p>
                    <p>{show.opening_night} - {show.closing_night}</p>
                    <button type="button" onClick={handleEditInfo}>Update Show Info</button>
                </div>)
            } else {
                return (
                    <div className="card">
                        <h3>{show.title}</h3>
                        <p>{show.company}</p>
                        <p>{show.theater_name}</p>
                        <p>{show.opening_night} - {show.closing_night}</p>
                        
                        <img src={show.image}></img>
                        <button type="button" onClick={handleEditInfo}>Update Show Info</button>
                    
                    </div>)
                }
    }

    function editShowInfo() {
        return (
            <div className="card">
                <h3>
                <input type="text" placeholer={show.title} name={show.title} value={show.title} onChange={handleChangeTitle}/>
                </h3>
                <p>
                <input type="text" placeholder={show.company} name={show.company} value={show.company} onChange={handleChangeCompany}/>
                <input type="text" placeholder={show.theater_name} value={show.theater_name} onChange={handleChangeTheater}/>
                <input type="date" placeholder={show.opening_night} value={show.opening_night} onChange={handleOpeningNightChange}/>
                <input type="date" placeholder={show.closing_night} value={show.closing_night} onChange={handleClosingNightChange}/>
                <input type="url"  placeholder={show.tickets} value={show.tickets} onChange={handleChangeTickets}/>
                </p>
                <button type="button" onClick={handleSubmission}>Submit Changes</button>
                <label for="updateShowImage">Update Show Image:</label>
                <form id="updateShowImage" action="/editplaybillimage" method="POST" encType="multipart/form-data">
                    <input id="image" type="file" name="image" required/>
                    <input type="submit"/>
                </form>                
            </div>
        )

    }

    function renderShowCard() {
        if (isEditingShow) {
            return editShowInfo();
        } else {
            return renderShowInfo();
        }};


    return (
        <div className="col-6 offset-6">
            {renderShowCard()}  
        </div>
    )


}

ReactDOM.render(<ShowEdits />, document.querySelector("#showEdits"))