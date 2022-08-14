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
        if (user.fname){
        return (
        <div>
            <h1>User Name: {user.fname} {user.lname}</h1>
            <h4>User Email: {user.email} </h4>
            <button type="button" onClick={handleOnClick}>Edit User Info</button>
        </div>
        )
    }else {
        return (<div>No Name</div>)
    }}

  
    function renderEditUserInfo(){
        return (
            <div>
                <input type="text" placeholder={user.fname} value={user.fname} onChange={handleFNameChange}/>
                <input type="text" placeholder={user.lname} value={user.lname} onChange={handleLNameChange}/>
                <button type="submit" onClick={handleSumbission}>Submit your Changes!</button>
            </div>
        )
    }
    
    function renderUserInfo() {
        if (isEditing){
            return renderEditUserInfo();
        } else {
            return renderViewUserInfo();
        }};

   

    return <div>
        {renderUserInfo()}
    </div>
}


ReactDOM.render(<ShowUserInfo />, document.querySelector('#userInfo'))