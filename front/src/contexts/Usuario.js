import { createContext, useContext, useState } from "react";

export const UsuarioContext = createContext();
UsuarioContext.displayName = "Usuário";

export default function UsuarioProvider({ children }) {

    const [usuario, setUsuario] = useState([]);

    return (
        <UsuarioContext.Provider value={{usuario, setUsuario}}>
            {children}
        </UsuarioContext.Provider>
    )
}

export function useUsuarioContext() {

    const {usuario, setUsuario} = useContext(UsuarioContext);

    function login(usuarioLogin) {

        if(!usuario){
            return setUsuario(usuario);
        }

        return setUsuario(usuarioLogin)

    }

    function logout() {
        setUsuario([]);
    }

    return {
        usuario,
        login,
        logout
    }

}