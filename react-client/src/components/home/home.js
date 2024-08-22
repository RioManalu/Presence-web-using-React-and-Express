import { useEffect, useState } from "react"
import "./index.css"

const Home = () => {

    const [name, setName] = useState("")

    useEffect(() => {
        if(localStorage.getItem("username") && localStorage.getItem("id")){
            console.log("homepage : anda sudah login!!")
            setName(localStorage.getItem("username"))
        }
    }, [])

    const SayName = () => {
        return(
            <h6>halo {name}</h6>
        )
    }

    return (
        <div className="d-flex text-center text-white bg-dark satu">
            <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
                <header className="">
                    <div>
                        <a href="/" className="float-md-start fs-3 fw-bold text-white link-underline-light link-underline-opacity-0" role="button">Presence Web</a>
                    </div>
                </header>
                <div className="mt-2 mb-auto text-start">
                    <SayName/>
                </div>
            
                <main className="px-3">
                    <p className="lead">
                    <a href="/login" className="btn btn-lg btn-secondary fw-bold border-white">Login</a>
                    </p>
                </main>
            
                <footer className="mt-auto text-white-50">
                    <p>&copy; copyright 2024 </p>
                </footer>
            </div>
        </div>
    )
}

export default Home