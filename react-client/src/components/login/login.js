import { Form, Button } from "react-bootstrap"
import ReactTypingEffect from "react-typing-effect"
import axios from "axios"
import { useEffect, useState } from "react"


const Login = ({title, description}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        if(localStorage.getItem("username") && localStorage.getItem("id")){
            window.location.replace("/dashboard")
        }
    }, [])

    const usernameHandle = (inputUsername) => {
        setUsername(inputUsername)
    }
    
    const passwordHandle = (inputPassword) => {
        setPassword(inputPassword)
    }

    const userLogin = () =>{
        // username: riohanson  ; password: 123
        const requestingData = {
            username: username,
            password: password
        }

        axios({
            method: "POST",
            url: "http://localhost:3001/api/v1/users/login",
            data: requestingData
        }).then((result) => {
            localStorage.setItem("username", result.data.users.username)
            localStorage.setItem("id", result.data.users.id)
            window.location.replace("/dashboard")
        }).catch((e) => {
            console.log("login error, tolong periksa kembali inputan anda !!")
            console.log(e)
        })
    }

    return (
        <div className="bg-dark vh-100">
            <h1 className="h3 mb-2 fw-normal text-center text-light">Please sign in</h1>
            <div className="ms-5 mb-2">
                <a href="/" role="button" className="text-light fs-4 link-offset-2 link-underline link-underline-opacity-0">Home</a>
            </div>
            <Form className="w-50 mx-auto">
                <Form.Group>
                    <Form.Label className="fw-bold text-light">Username</Form.Label>
                    <Form.Control type="text" placeholder="Masukkan Username Anda" onChange={(event) => usernameHandle(event.target.value)} required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="fw-bold text-light">Password</Form.Label>
                    <Form.Control type="password" placeholder="********" onChange={(event) => passwordHandle(event.target.value)} required/>
                </Form.Group>
                <Form.Check className="text-light my-1"// prettier-ignore
                    type="checkbox"
                    id="default-checkbox"
                    label="Stay Loged in"
                />
                <Button className="w-100 btn btn-lg btn-primary" onClick={() => userLogin()}>Login</Button>
                <div className="text-center my-3">
                    <a role="button" className="text-light fs-6 link-underline-light link-underline-opacity-0 link-underline-opacity-75-hover">Lupa kata sandi?</a>
                </div>
                <div className="text-center">
                    <Button href="/register" className="w-70 btn btn-lg mt-4" variant="success">Sign Up</Button>
                </div>
                <p className="mt-5 mb-3 text-light-emphasis text-muted">&copy; 2017–2021</p>
            </Form>
        </div>        
    )
}

export default Login