import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { limparCarrinho } from "../../redux/cartSlice";

import { useNavigate } from "react-router-dom";

export default function BotaoLogout() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
    <button type="button" className="btn btn-light ms-auto" onClick={
        (e) => {
            e.preventDefault()
            dispatch(logout());
            dispatch(limparCarrinho());
            navigate("/login");
        }}>
        Logout
    </button>
    );
}
