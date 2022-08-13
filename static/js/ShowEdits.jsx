function ShowEdits() {

    const [title, setTitle] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [theater, setTheater] = React.useState('');
    const [openingNight, setOpeningNight] = React.useState('');
    const [closingNight, setClosingNight] = React.useState(null);
    const [showImage, setShowImage] = React.useState('');
    const [tickets, setTickets] = React.useState('');
    const [showId, setShowId] = React.useState('');
    const [activeShow, setActiveShow] = React.useState(true)
    const [isEditingShow, setIsEditingShow] = React.useState(false);


    if (showImage === ''){
        setShowImage(null)
    }
    React.useEffect(() => {
        fetch('/api/showInfo')
        .then((response) => response.json())
        .then((result) => {
            console.log(result)
            setTitle(result['title'])
            setCompany(result['company'])
            setOpeningNight(result['opening_night'])
            setClosingNight(result['closing_night'])
            setShowImage(result['image'])
            setTheater(result['theater_name'])
            setTickets(result['tickets'])
            setActiveShow(result['active'])
            setShowId(result['show_id'])
        });
    }, []);

  
    function handleEditInfo() {
        setIsEditingShow(!isEditingShow)
    }

    function handleChangeCompany(event){
        setCompany(event.target.value)
    }
    
    function handleChangeTitle(event) {
        setTitle(event.target.value)
    }
    
    function handleClosingNightChange(event) {
        setClosingNight(event.target.value)
    }

    function handleOpeningNightChange(event) {
        setOpeningNight(event.target.value)
    }

    function handleChangeTheater(event) {
        setTheater(event.target.value)
    }

    function handleChangeTickets(event) {
        setTickets(event.target.value)
    }

    function handleSubmission() {
        
        const formInputs = {
            title: `${title}`,
            company: `${company}`,
            closing_night: `${closingNight}`,
            opening_night: `${openingNight}`,
            theater_name: `${theater}`,
            tickets: `${tickets}`
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
        console.log(showImage)
        if (showImage === "None"){
            return (
                <div className="card">
                    <h3>{title}</h3>
                    <p>{company}</p>
                    <p>{theater}</p>
                    <p>{openingNight} - {closingNight}</p>
                    
                    <button type="button" onClick={handleEditInfo}>Update Show Info</button>
                    <a href="/viewplaybill">View Playbill</a>
                </div>)
            } else {
                return (
                    <div className="card">
                        <h3>{title}</h3>
                        <p>{company}</p>
                        <p>{theater}</p>
                        <p>{openingNight} - {closingNight}</p>
                        
                        <img src={showImage} disabled="true"></img>
                        <button type="button" onClick={handleEditInfo}>Update Show Info</button>
                        <a href="/viewplaybill">View Playbill</a>
                    </div>)
                }
    }

    function editShowInfo() {
        return (
            <div className="card">
                <h3>
                <input type="text" placeholer={title} name={title} value={title} onChange={handleChangeTitle}/>
                </h3>
                <p>
                <input type="text" placeholder={company} name={company} value={company} onChange={handleChangeCompany}/>
                <input type="text" placeholder={theater} value={theater} onChange={handleChangeTheater}/>
                <input type="date" placeholder={openingNight} value={openingNight} onChange={handleOpeningNightChange}/>
                <input type="date" placeholder={closingNight} value={closingNight} onChange={handleClosingNightChange}/>
                <input type="url"  placeholder={tickets} value={tickets} onChange={handleChangeTickets}/>
                </p>
                <button type="button" onClick={handleSubmission}>Submit Changes</button>
                <label for="updateShowImage">Update Show Image:</label>
                <form id="updateShowImage" action="/editplaybillimage" method="POST" enctype="multipart/form-data">
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