import axios from "axios"
import { useState } from "react"
import { Form, Button, CloseButton } from "react-bootstrap"
import { logout } from "../dashboard/logout"

const Edit = ({title}) => {

    const [username, setUsername] = useState(localStorage.getItem("username"))
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const usernameHandle = (inputUsername) => {
        setUsername(inputUsername)
    }
    const newPasswordHandle = (inputNewPassword) => {
        setNewPassword(inputNewPassword)
    }
    const confirmPasswordHandle = (inputConfirmPassword) => {
        setConfirmPassword(inputConfirmPassword)
    }

    const changePassword = () => {
        const requestingData = {
            id: localStorage.getItem("id"),
            username: username,
            password: confirmPassword,
            passwordBaru: newPassword
        }

        axios({
            method: "PUT",
            url: "http://localhost:3001/api/v1/users",
            data: requestingData
        }).then(() => {
            logout()
            window.location.replace("/login")
        }).catch((e) => {
            console.log("error from trying change password")
            console.log(e)
        })
    }

    const close = () => {
        window.location.replace("/dashboard")
    }

    return (
        <div className="bg-dark vh-100">
            <Form className="w-50 mx-auto">
                <CloseButton className="text-light mt-5 mb-1" variant="white" onClick={close}/>
                <h3 className="text-light text-center fw-bold">{title}</h3>
                <Form.Group>
                    <Form.Label className="fw-bold text-light">Username</Form.Label>
                    <Form.Control placeholder="Masukkan Username Anda" onChange={(event) => usernameHandle(event.target.value)} defaultValue={localStorage.getItem("username")} required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="fw-bold text-light">New Password</Form.Label>
                    <Form.Control type="password" placeholder="Masukkan Password Baru Anda" onChange={(event) => newPasswordHandle(event.target.value)} required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="fw-bold text-light">Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Masukkan Password Lama Anda" onChange={(event) => confirmPasswordHandle(event.target.value)} required/>
                <Form.Text className="text-muted">Isi password lama anda sebagai password konfirmasi</Form.Text>
                </Form.Group>
                <Button className="w-100 btn btn-lg btn-primary" onClick={changePassword}>Update Profile</Button>
            </Form>
        </div>
    )
}

export default Edit