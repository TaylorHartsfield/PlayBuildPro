export default function CastList() {

    const [list, setList] = React.useState([])

    const allCast = []

    React.useEffect(()=>{
        fetch('/api/getCast')
        .then((response)=> response.json())
        .then((result) => {
        setList(result.cast)
        })
    }, []);

    function CastList({fname, lname, role}) {
        return (
            <React.Fragment>
                <div className="row"  draggable='true'>
                    <div className="col-4" >
                    <strong><p>{role}</p></strong>
                    </div>
                    <div className="col-4">
                       <p>..........................................</p> 
                    </div>
                    <div className="col-4">
                    <strong><p>{fname} {lname}</p></strong>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    for (const member of list) {
       
        allCast.push(
            <CastList
            fname={member.fname}
            lname={member.lname}
            role={member.role}
            key={member.id}
            />
        )
    }

    return (
        <div className="allCast">
            <h3>Cast</h3>
            {allCast}
        </div>
    )

}

// ReactDOM.render(<CastList />, document.querySelector("#castlist"))