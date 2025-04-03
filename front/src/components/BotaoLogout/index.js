import {UsuarioContext, useUsuarioContext } from "../../contexts/Usuario";


export default function BotaoLogout() {

    const {logout} = useUsuarioContext(UsuarioContext);

    return (
    <button type="button" className="btn btn-light ms-auto" onClick={
        (e) => {e.preventDefault()
        logout();
        }}>
        Logout
    </button>
    );

}
