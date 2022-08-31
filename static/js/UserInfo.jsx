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
                <div className="row" style={{paddingTop: "50px"}}>
                    <h3>{user.fname} {user.lname}</h3>
                    <div style={{paddingTop: "30px", paddingLeft: "190px"}}>
                        <button type="button" onClick={handleOnClick} style={{
                            backgroundColor: "transparent", 
                            fontFamily: "broadway", 
                            boxShadow: "0 3px 5px rgba(0,0,0,0.18)", 
                            borderRadius: "8px", 
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100px",}}>
                            Edit Info
                        </button>
                    </div>
                </div>
            
            </div>
        </div>
       
        </React.Fragment>
     
        )
    }

    function renderEditUserInfo(){
        return (
       <React.Fragment>
            <div className="userStats">
                <div className="marqueetext">
                    <div className="row">
                        <h2 style={{fontFamily: "showtime", fontSize:"65px"}}>Starring</h2>
                    </div>
                    <div className="row" style={{paddingTop: "50px"}}>
                    <div className="card">
                <input type="text" placeholder={user.fname} value={user.fname} onChange={handleFNameChange}/>
                <input type="text" placeholder={user.lname} value={user.lname} onChange={handleLNameChange}/>
                <button type="submit" onClick={handleSumbission}>Submit your Changes!</button>
            </div>
                    </div>
                
                </div>
            </div>
            </React.Fragment>
         
            )
    

    }
    
    function renderUserInfo() {
        if (isEditing){
            return renderEditUserInfo()
               
        } else {
            return renderViewUserInfo()
        }};

   

    return (
    <div style={{paddingTop: "200px"}}>
        {renderUserInfo()}
    </div>)
}


ReactDOM.render(<ShowUserInfo />, document.querySelector('#userInfo'))