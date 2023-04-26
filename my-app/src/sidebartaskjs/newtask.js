import React, { useEffect, useState } from 'react'
import Chart from "chart.js/auto";
import { Line, Bar, Pie } from "react-chartjs-2";
import { json, Link } from 'react-router-dom';
// import './App.css';
import Sidebar from './Sideb';
import Highcharts, { color } from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icon from '@fortawesome/free-solid-svg-icons'



function Newtask() {

    const [chart, setchart] = useState([])
    const [buttonname, setbuttonname] = useState("use name filter")
    const [firstname, setfirstname] = useState()
    const [birthday, setbirthday] = useState()
    const [gendername, setgendername] = useState(["Male", "Female"])
    const [gender, setgender] = useState()
    const [gender1, setgender1] = useState()
    const [time, settime] = useState()
    const [searchid, setsearchid] = useState('')
    const [serachname, setsearchname] = useState('')
    const [serachbirthday, setsearchbirthday] = useState('')
    const [checked, setchecked] = useState('')



    useEffect(() => {
        fetch("https://63a96e89100b7737b991cd4b.mockapi.io/api/ap2")
            .then((res) => res.json())
            .then((cal) => {
                setchart(cal)

                let a = []
                let b = []
                let c = []
                let s = []

                let countm = 0
                let countf = 0

                for (var i = 0; i < cal.length; i++) {
                    // -------------------------------birthday--------
                    // a.push(cal[i].birthday)
                    let g = cal[i].birthday.split("-")
                    a.push(g[0])
                    // a.push(g[0])
                    // -------------------------------birthday--------
                    // -------------------------------firstname--------

                    b.push(cal[i].firstName)
                    // -------------------------------firstname--------
                    // -------------------------------time--------

                    let zx = cal[i].time
                    // let time2 = zx.getHours() + ":" + zx.getMinutes() + ":" + zx.getSeconds();

                    c.push(zx)
                    // -------------------------------time--------


                    // -------------------------------gender--------
                    // s.push(cal[i].gender)
                    if (cal[i].gender == "Male") {
                        countm = countm + 1
                    } else {
                        countf = countf + 1
                    }
                    // -------------------------------gender--------

                }
                setbirthday(a)
                setfirstname(b)
                settime(c)
                s.push(countm)
                s.push(countf)
                setgender(s)
                // -------------------------------gender--------
                let dictionary1 = []
                for (var i = 0; i < s.length; i++) {
                    let dictionary = {}
                    if (i == 0) {
                        dictionary["name"] = "Male"
                        dictionary["y"] = s[i]

                        dictionary1.push(dictionary)

                    }
                    else if (i > 0) {

                        dictionary["name"] = "Female"
                        dictionary["y"] = s[i]

                        dictionary1.push(dictionary)

                    }
                }
                console.log(dictionary1)
                setgender1(dictionary1)
                // -------------------------------gender--------

            })
    }, [])

    const piechart = (e, q, w) => {

        // console.log(e)
        // console.log(q)
        // console.log(w)
        setsearchid(e)
        setsearchname(q)
        setbuttonname(q)
        setsearchbirthday(w)
        // =====================================================================pie

        let gen = []
        chart.map((indexid) => {
            if (indexid.firstName == chart[e - 1].firstName) {
                gen.push(indexid.gender)
            }
        })
        // console.log(gen.length,"gender")

        let pie = {}
        let pie1 = []
        pie["name"] = gen[0]
        pie["y"] = gen.length
        pie1.push(pie)
        // console.log(pie1)
        setgender1(pie1)
        // =====================================================================line

        // =====================================================================line


    }
    const refresh = () => {
        // console.log("lslkcsfwefuiwyedwejhdwedhiwuydweydwuidwiud")
        if (checked == "") {
            setchecked("checked")
        }
        else {
            setchecked("")
        }
        setbuttonname('use name filter')
        setsearchid('')
        setsearchname('')
        setsearchbirthday('')
        let countm = []
        let countf = []
        let countmf = []
        for (var i = 0; i < chart.length; i++) {
            if (chart[i].gender == "Male") {
                countm.push(chart[i].gender)
            }
            else {
                countf.push(chart[i].gender)
            }
        }
        let pie = {}
        let pie1 = {}
        for (var i = 0; i < 1; i++) {

            pie["name"] = "Male"
            pie["y"] = countm.length
            countmf.push(pie)
            pie1["name"] = "Female"
            pie1["y"] = countf.length
            countmf.push(pie1)
        }
        setgender1(countmf)
        // console.log(countmf)

    }

    const options = {
        title: {
            text: 'employees-dob-year'
        },
        xAxis: {
            categories:
                // chart.map((i) => i.firstName)
                chart.filter((linefilter) =>
                    linefilter.firstName.toLowerCase().includes(serachname)
                ).map((i) => i.firstName)
        },
        series: [{
            type: 'line',
            data:
                chart.filter((linefilter) =>
                    linefilter.birthday.toLowerCase().includes(serachbirthday)
                ).map((i) => parseInt(i.birthday)),
            // chart.map((i) => parseInt(i.birthday))
            // color:"red"
        }]
    }

    const options1 = {
        title: {
            text: 'employees'
        },
        series: [{
            type: 'pie',
            data: gender1
        }]
    }
    const options2 = {
        title: {
            text: 'employees-attedance',
            style: {
                color: "darkblue"
            }
        },
        chart: {
            type: 'column'
        },
        xAxis: {
            categories: chart.filter((barfilter) => barfilter.firstName.toLowerCase().includes(serachname))
                .map((i) => i.firstName),
            labels: {
                style: {
                    color: 'darkgreen'
                }
            },
            title: {
                text: 'employes name',
                style: {
                    color: 'darkGreen'
                }
            }
        },
        yAxis: {
            title: {
                text: 'employes id'
            },

        },
        series: [{
            name: "employees-attedance",
            type: 'bar',
            data: searchid ?


                chart.filter((barfilter) => barfilter.id.toLowerCase().includes(searchid))
                    .map((i) =>
                        (i.id).length == searchid.length ? parseInt(searchid) :
                            null

                    ) :
                chart.filter((barfilter) => barfilter.id.toLowerCase().includes(searchid))
                    .map((i) =>
                        (i.id).length == searchid.length ? parseInt(searchid) :
                            parseInt(i.id))
            // parseInt(i.id))
        }]
    }
    return (

        <div style={{ display: "flex" }}>

            <div class="d-none d-md-block">
                <Sidebar />
            </div>
            <div className='row row-cols-sm-1 row-cols-md-2  row-cols-lg-2 me-5 ' style={{ width: "100%" }}>
                <div className="col">
                    {/* ===============================================navebar============================================ */}
                    <div className='d-block d-md-none '>
                        <button class="btn btn-light w-100" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            <h3>Navbar<span><FontAwesomeIcon icon={icon.faNavicon} className="ms-3" /></span></h3>
                        </button>

                        <div class="collapse" id="collapseExample">
                            <div class="row">
                                <div className='col m-5'>
                                    <Link to="/Newtask" class="text-decoration-none"> <h3 className=' text-info'>dashboard<span><FontAwesomeIcon icon={icon.faDashboard} className="ms-3" /></span></h3></Link>

                                </div>
                                <div className='col m-5'>
                                    <Link to="/Tablesidebar" class="text-decoration-none"><h3 className='text-info'>table<span><FontAwesomeIcon icon={icon.faTable} className="ms-2" /></span></h3></Link >
                                </div>

                            </div>
                        </div>

                    </div>
                    {/* =======================================================navebar========================================= */}
                    {/* ========================================================filter dropdown filter============================================ */}
                    <div class="dropdown d-flex justify-content-center" style={{ marginTop: "25%" }}>


                        {/* <div className=''> */}
                        <ul class="pagination">
                            <li class="page-item">
                                <div class="dropdown" >
                                    <button style={{ width: "150px" }} class="btn btn-outline-secondary border border-info dropdown-toggle text-dark" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {buttonname} 
                                    </button>
                                    <FontAwesomeIcon icon={icon.faRecycle} onClick={refresh} className=' ms-4 text-info' />
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        {
                                            chart.map((searchid) =>
                                                <a class="dropdown-item" onClick={() => piechart(searchid.id, searchid.firstName, searchid.birthday)}>{searchid.firstName}</a>
                                            )
                                        }
                                    </div>
                                </div>
                            </li>
                            <li class="page-item">
                                {/* <input type="radio" className='m-3 border border-info' checked={checked} onClick={refresh} /> */}
                                {/* <FontAwesomeIcon icon={icon.faRecycle} onClick={refresh} className='m-3 text-info' /> */}
                            </li>
                        </ul>
                        {/* </div> */}
                    </div>

                </div>
                {/* =====================================================filter dropdown filter====================================================== */}

                <div className="col">
                    < div  >
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={options} />
                    </div>
                </div>

                <div className="col">
                    < div  >
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={options1} />

                    </div>
                </div>

                <div className="col">
                    < div  >
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={options2} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Newtask