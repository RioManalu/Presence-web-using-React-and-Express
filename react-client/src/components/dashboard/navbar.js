import { Button, ButtonGroup } from "react-bootstrap"
import { logout } from "./logout"

const Navbar = () => {
    return (
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h4>Halo, {localStorage.getItem("username")}</h4>
            <ButtonGroup aria-label="Basic example">
                <Button href="/edit" variant="outline-secondary">Edit Password</Button>
                <Button variant="outline-secondary" onClick={ logout }>Logout</Button>
            </ButtonGroup>
        </div>
    )
}

export default Navbar