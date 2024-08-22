import { Form, Button } from "react-bootstrap"
import axios from "axios"
import { useState } from "react"


const Register = ({title, description}) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const usernameHandle = (inputUsername) => {
        setUsername(inputUsername)
    }
    
    const passwordHandle = (inputPassword) => {
        setPassword(inputPassword)
    }

    const userRegister = () =>{
        // const wrongWords = ["&", "=", "+", "'", `"`, ",", "<", ">", ".", "*", "%", "$", "#", "@", "!", "^", "`", "|", "(", ")"]
        // if(username.length > 4 && username.length <= 20){
            // username: riohanson  ; password: 123
        const requestingData = {
            username: username,
            password: password
        }

        axios({
            method: "POST",
            url: "http://localhost:3001/api/v1/users/register",
            data: requestingData
        }).then((result) => {
            console.log(result.data.registered)
            console.log('ini result')
            // window.location.replace("/login")
        }).catch((e) => {
            console.log("error from trying to register")
            console.log(e)
        })
        // }else if(username.length < 5 && username.length > 20){
        //     console.log("Minimal Karakter Username 5 Dan Maksimal 20")
        // }else if(wrongWords.some(word => username.includes(word))){
        //     console.log(`tidak boleh menggunakan ${wrongWords}`)
        // }
    }

    return (
        <div className="bg-dark vh-100">
            <div className="ms-5 pt-5">
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
                <Button className="w-100 btn btn-lg btn-primary mt-4" onClick={() => userRegister()}>Register</Button>
                <div className="text-end my-3">
                    <a href="/login" role="button" className="text-light fs-6 link-underline-light link-underline-opacity-0 link-underline-opacity-75-hover">Sign in &rarr;</a>
                </div>
                <p className="mt-5 mb-3 text-light-emphasis text-muted">&copy; 2017–2021</p>
            </Form>
        </div>
    )
}

export default Register