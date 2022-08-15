// import ShowEdits from "ShowEdits.jsx";
function UserShowProfile() {


    const [user, setUser] = React.useState({})

    React.useEffect(()=> {
        fetch('/api/usershowinfo')
        .then((response) => response.json())
        .then((result) => {
            setUser(result.user)
        });
    }, [user.headshot, user.bio]);



    function UserInformation() {
        return (
            <div className="card">
                <h3>{user.fname} {user.lname}</h3>
                <h5>Role: {user.role}</h5>
                {isAdmin()}
            </div>    
         
        )
    }
    console.log(user)
    function AdminUser() {
        if (user.submissions){
            console.log(user.submissions)
           return (
            <React.Fragment>
            <div className="row">
                <a href="/approvesubmits">New Submissions Need Review!</a>
            </div>
            <div className="row">
                <a href="/invitecompany">Invite Company Members</a>
            </div>
            <div className="row">
                <a href="/editPlaybill">Edit Playbill</a>
            </div>
            <div className="row">
                <a href="/viewplaybill">View Playbill</a>
            </div>
            
            </React.Fragment>
           )
        } else {
            console.log('no submission')
        return (
            <React.Fragment>
            <div className="row">
                <a href="/invitecompany">Invite Company Members</a>
            </div>
            <div className="row">
                <a href="/editPlaybill">Edit Playbill</a>
            </div>
            <div className="row">
                <a href="/viewplaybill">View Playbill</a>
            </div>
           
            </React.Fragment>
          
        )
    }
    }

    function NotAdminUser() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-4">
                        <img src={user.headshot}></img>
                    </div>
                    <div className="col-4">
                        <p>{user.bio}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <form action="/update_headshot" id="update_headshot" method="POST" encType="multipart/form-data">
                            <input id="add_headshot" type="file" name="headshot" required />
                            <input type="submit" />
                        </form>
                    </div>
                    <div className="col-6">
                    <form action="/update_bio" id="add_bio" method="POST">
                        <textarea name="update" maxLength="375" cols="33" required/> 
                        <input type="submit" />
                    </form>
                    
                    </div>
                    <div className="row">
                        <a href="/viewplaybill">View Playbill</a>
                    </div>
                </div>

            </React.Fragment>
        )
    }


    function isAdmin(){
        if (user.admin){
            return <AdminUser />
        } else {
            return <NotAdminUser />
        }
    }
    return (
        <React.Fragment>
            <div className="col-6">
                <UserInformation />
            </div>
      
        </React.Fragment>
    )
}

// ReactDOM.render(<UserShowProfile />, document.querySelector('#userShowProfile'))