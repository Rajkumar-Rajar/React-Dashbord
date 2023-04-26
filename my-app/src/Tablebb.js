import React, { useEffect } from 'react'
import { Routes, Route,Link  } from "react-router-dom"
import { useState } from 'react' 
import { useLocation } from 'react-router-dom'

function Tablebb( props) {
  const info =useLocation();

  const [year, setyear] = useState(props.b)
  const [month, setmonth] = useState(props.a)
  // const [year, setyear] = useState(info.state.year1)
  // const [month, setmonth] = useState(info.state.month1)
  const [day, setday] = useState([])
  


  useEffect(() => {
    var date = new Date(year, month, 1);

    var days = [];
    while (date.getMonth() === month) {
        days.push(new Date(date).toLocaleDateString('en-US', { weekday: "long", year: "numeric", month: "short", day: "numeric" }));
        date.setDate(date.getDate() + 1);
    }
    console.log(days);
    var mall = []
    var n = 1
    for (var i = 0; i < days.length; i++) {
        var id = "id"
        var data = "data"
        var task = "task"
        var f = {}
        console.log(days[i])
        f[id] = n;
        f[data] = days[i]
        f[task] = ""
        mall.unshift(f)
        n = n + 1
    }
    // setshow1(false)
    // setshow(true)
    console.log(mall)
    setday(mall.reverse())
  },[]);



const pp1 = (id, ga) => {
  console.log(ga,id)

  var data1 = day[id - 1]

  let a = day[id - 1]
  // console.log(day[id - 1])
  // console.log(a.id)

  a.task = ga
}

const ll11 = () => {
  console.log(day)
  fetch(`https://63a96e89100b7737b991cd4b.mockapi.io/api/api`, {
      method: "post",
      headers: {
          'Content-type': 'application/json'
      },
      body: JSON.stringify(
          {
              day
          }
      )
  })
      // .then((json) => setshow(false), setshow1(true))
      // .then(() => window.location.reload(true))
}

  return (
    <div>
      
            <h1>Tablebb</h1>
     <div>
                        <center><h1>time sheet</h1></center>
                        <table className="table table-hover">
                            <thead style={{ backgroundColor: "lightblue" }}>
                                <tr>
                                    <td width="200px">id</td>
                                    <td width="200px">DATE</td>
                                    <td width="200px">DAY</td>
                                    <td >TASK</td>

                                </tr>
                            </thead>

                            {
                                day.map((i, id1) =>
                                    <tbody >
                                        <tr key={id1} >
                                            <td>{i.id}</td>
                                            <td>{i.data.split(",")[1]},{i.data.split(",")[2]}</td>
                                            <td>{i.data.split(",")[0]}</td>
                                            <td><input onChange={(e) => pp1(i.id, e.target.value)} id='value' style={{ width: "70%", border: "none" }} /></td>
                                        </tr>

                                    </tbody>)}

                        </table>

                        <center><Link to="/"><button onClick={ll11} type="button" class="btn btn-success">submite</button></Link></center>
                    </div>
        <Link to="/">b</Link>

    </div>
  )
}

export default Tablebb