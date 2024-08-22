import { useEffect, useState } from "react"
import { Badge, Button, Container } from "react-bootstrap"
import axios from "axios"
import Navbar from "./navbar"

const Dashboard = ({title}) => {
    const [absensiList, setAbsensiList] = useState([])
    const [updateAbsent, setUpdateAbsent] = useState(false)
    const [lastAttendance, setLastAttendance] = useState("checkout")

    useEffect(() => {
        if(!localStorage.getItem("username") && !localStorage.getItem("id")){
            window.location.replace("/login")
        }
        axios({
            method: "GET",
            url: "http://localhost:3001/api/v1/absensi"
        }).then((result) => {
            setAbsensiList(result.data.absensi)
        }).catch((e) => {
            console.log("oh no, error message from absensi (GET)")
        })
    }, [updateAbsent])

    const DataAbsenList = () => {
        return absensiList?.map((absensi, i) => {
        const {users_id, status, updatedAt } = absensi
        const d = new Date(updatedAt);
        const dateTime = `${d.getUTCFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate()}     ${d.getUTCHours() + 7}:${d.getUTCMinutes()}:${d.getUTCSeconds()}`
            return (
                <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{users_id}</td>
                    <td>{status}</td>
                    <td>{dateTime}</td>
                </tr>
            )
        })
    }

    const attendance = (params) => {
        const d = new Date
        // hanya bisa checkin dan checkout dalam jam 07:00 - 16:00
        if (d.getHours() > 7 && d.getHours() < 18){

            // hanya bisa checkin dan checkout 1x dalam 1 hari
            if ((lastAttendance == "checkout" && params == "checkin") || (lastAttendance == "checkin" && params == "checkout")){
                const requestingData = {
                    users_id: localStorage.getItem("id")
                }

                axios({
                    method: "POST",
                    url: `http://localhost:3001/api/v1/absensi/${params}`,
                    data: requestingData
                }).then((result) => {
                    if(result) {
                        setUpdateAbsent(!updateAbsent)
                        setLastAttendance(params)
                    }
                }).catch((e) => {
                    console.log("error from attendance")
                    console.log(e)
                })
                console.log(`${params} berhasil`)
            }else{
                if(params == "checkin"){
                    console.log("Silahkan Checkout Dahulu")
                }else{
                    console.log("Silahkan Checkin Dahulu")
                }
            }
        }else{
            console.log("Diluar Jam Kerja")
        }
    }

    return (
        <Container>
            <main className="col-md-9 ms-sm-auto col-lg-12 px-md-4">
                <Navbar />
                <h2>{title}</h2>
                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Nama</th>
                            <th scope="col">Status</th>
                            <th scope="col">Tanggal</th>
                        </tr>
                    </thead>
                    <tbody>
                        <DataAbsenList/>
                    </tbody>
                    </table>
                </div>
                <div className="d-flex justify-content-center gap-4 my-4">
                    <h4>
                        <Badge pill bg="primary" style={{ cursor: "pointer"}} onClick={() => {attendance("checkin") }}>Checkin</Badge>
                    </h4>
                    <h4>
                        <Badge pill bg="danger" style={{ cursor: "pointer"}} onClick={() => {attendance("checkout") }} >Checkout</Badge>
                    </h4>
                </div>
            </main>
        </Container>
    )
}

export default Dashboard;