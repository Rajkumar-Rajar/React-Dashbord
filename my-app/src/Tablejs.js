import React, { useState } from 'react'
import MonthPicker from 'month-year-picker';
import './App.css';
import Table from './Table';


function Tablejs() {



    const [year, setyear] = useState()
    const [month, setmonth] = useState()
    const [day, setday] = useState([])
    const [show, setshow] = useState(false)
    const [show1, setshow1] = useState(true)
    const[monthye,setmontjye]=useState()
    const[monthname,setmonthname]=useState(["january","february","march","april","may","june","july","august","september","october","november","december"])


    const getDaysInMonth = (month1, year1) => {
        // console.log(year, month)
        // setyear(monthye.split("-")[0])
        // setmonth(monthye.split("-")[1])
        console.log(monthye)
        var date = new Date(year1, month1, 1);

        var days = [];
        while (date.getMonth() === month1) {
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
        setshow1(false)
        setshow(true)
        console.log(mall)
        setday(mall.reverse())

    }

    const cmonth = (e) => {

        const a = parseInt(e)
        setmonth(a)
    }
    const cyear = (e) => {
        const b = parseInt(e)
        setyear(b)
    }
    const cmonthyear=(e)=>{
        setyear(parseInt(e.split("-")[0]))
        setmonth(parseInt(e.split("-")[1])-1)

    }
    const pp = (id, ga) => {

        var data1 = day[id - 1]

        let a = day[id - 1]
        // console.log(day[id - 1])
        // console.log(a.id)

        a.task = ga
    }


    const ll = () => {
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
            .then((json) => setshow(false), setshow1(true))
            .then(() => window.location.reload(true))
    }




    return (
        <div className='css'>



            {/* <div> */}
            <div>
                {show1 &&
                    <center className='css1'><div class="card" style={{ width: "30rem" }}>
                        <div class="card-body">
                            <h5 class="card-title">TIME SHEET</h5>
                            <div class="card text-center">
                                <div class="card-header">
                                    SELECT MONTH AND YEAR
                                </div>
                                <div class="card-body">
                                    <div>
                                        {/* <b><label>YEAR</label></b> */}
                                        <input type="month" onChange={(e)=>cmonthyear(e.target.value)}/>
                                        {/* <select id="year" name="year" style={{ marginLeft: "10px" }} onChange={(e) => (cyear(e.target.value))}>

                                            <option value={year}>{year}</option>
                                            <option value="2020">2020</option>
                                            <option value="2021">2021</option>
                                            <option value="2022">2022</option>
                                            <option value="2023">2023</option>
                                        </select>
                                        <b><label>MONTH</label></b>
                                        <select id="month" name="month" style={{ marginLeft: "10px" }} onChange={(e) => (cmonth(e.target.value))} >
                                            <option value={month}>{month}</option>
                                            <option value="0">1</option>
                                            <option value="1">2</option>
                                            <option value="2">3</option>
                                            <option value="3">4</option>
                                            <option value="4">5</option>
                                            <option value="5">6</option>
                                            <option value="6">7</option>
                                            <option value="7">8</option>
                                            <option value="8">9</option>
                                            <option value="9">10</option>
                                            <option value="10">11</option>
                                            <option value="11">12</option>
                                        </select> */}

                                    </div>
                                    <button class="btn btn-primary" style={{marginTop:"10px"}} onClick={() => getDaysInMonth(month, year)}>SHOW TABLE</button>
                                </div>
                            </div>



                        </div>
                    </div></center>
                }
            </div>

            <div className='css2'>
                {show &&

                    <div>
                        <center><h1>{monthname[month]}  Time sheet</h1></center>
                        <table className="table table-hover">
                            <thead style={{ backgroundColor: "lightblue" }}>
                                <tr>
                                    {/* <td width="200px">id</td> */}
                                    <td width="200px">DATE</td>
                                    <td width="200px">DAY</td>
                                    <td >TASK</td>

                                </tr>
                            </thead>

                            {
                                day.map((i, id1) =>
                                    <tbody >
                                        <tr key={id1} >
                                            {/* <td>{i.id}</td> */}
                                            <td>{i.data.split(",")[1]},{i.data.split(",")[2]}</td>
                                            <td>{i.data.split(",")[0]}</td>
                                            <td><input onChange={(e) => pp(i.id, e.target.value)} id='value' style={{ width: "90%", border: "none" }} /></td>
                                        </tr>

                                    </tbody>)}

                        </table>

                        <center><button onClick={ll}  type="button" class="btn btn-success">submite</button></center>
                    </div>

                }
            </div>
            {/* </div> */}




        </div>
    );
}

export default Tablejs



