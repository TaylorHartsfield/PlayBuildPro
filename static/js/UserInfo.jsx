function ShowUserInfo() {

    const [fName, setFName] = React.useState('');
    const [lName, setLName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [isEditing, setIsEditing] = React.useState(false);

    React.useEffect(()=> {
        fetch('/api/userinfo')
        .then((response) => response.json())
        .then((result) => {
            setFName(result['fname']);
            setLName(result['lname']);
            setEmail(result['email']);
        });
    }, []);

    function handleSumbission() {

        const updateInputs ={
            fname: `${fName}`,
            lname: `${lName}`
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
        setFName(event.target.value);
    }

    function handleLNameChange(event) {
        setLName(event.target.value);
    }

    
    function renderViewUserInfo(){
        return (
        <div>
        <h1>User Name: {fName} {lName}</h1>
        <h4>User Email: {email} </h4>
        <button type="button" onClick={handleOnClick}>Edit User Info</button>
    </div>
    )
    }

  
    function renderEditUserInfo(){
        return (
            <div>
                <input type="text" placeholder={fName} value={fName} onChange={handleFNameChange}/>
                <input type="text" placeholder={lName} value={lName} onChange={handleLNameChange}/>
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