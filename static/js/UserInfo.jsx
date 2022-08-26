function ShowUserInfo() {

    const[user, setUser] = React.useState({})
    const [isEditing, setIsEditing] = React.useState(false);


    React.useEffect(()=> {
       fetch('/api/userinfo')
        .then((response) => response.json())
        .then((result) => {
           setUser(result.user)
        });
    }, []);

   

    function handleSumbission() {

        const updateInputs ={
            fname: `${user.fname}`,
            lname: `${user.lname}`
        }

        fetch('/updateuser', {
            method: 'POST',
            body: JSON.stringify(updateInputs),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((responseJSon) => {
            setIsEditing(false)
        })
    }

    function handleOnClick(){
        setIsEditing(!isEditing)
    };

    function handleFNameChange(event){
        setUser({...user, "fname": event.target.value})
    }

    function handleLNameChange(event) {
        setUser({...user, "lname": event.target.value})
    }

    
    function renderViewUserInfo(){

        return (
            <React.Fragment>
        <div className="userStats">
            <div className="marqueetext">
                <div className="row">
                    <h2 style={{fontFamily: "showtime", fontSize:"65px"}}>Starring</h2>
                </div>
                <div className="row">
                    <h4><img src='/static/img/download.png' style={{height: "150px", width: "150px"}}></img></h4>
                </div>
                <div className="row">
                    <h4>{user.fname} {user.lname}</h4>
                </div>
                <div className="row">
                    <h5>She/Her</h5>
                </div>
            </div>
        </div>
        <div className="row">
            <button type="button" onClick={handleOnClick}>Edit User Info</button>
        </div>
        </React.Fragment>
     
        )
    }

  
    function renderEditUserInfo(){
        return (
            <div className="card">
                <input type="text" placeholder={user.fname} value={user.fname} onChange={handleFNameChange}/>
                <input type="text" placeholder={user.lname} value={user.lname} onChange={handleLNameChange}/>
                <button type="submit" onClick={handleSumbission}>Submit your Changes!</button>
            </div>
        )
    }
    
    function renderUserInfo() {
        if (isEditing){
            return renderEditUserInfo()
               
        } else {
            return renderViewUserInfo()
        }};

   

    return <div>
        {renderUserInfo()}
    </div>
}


ReactDOM.render(<ShowUserInfo />, document.querySelector('#userInfo'))