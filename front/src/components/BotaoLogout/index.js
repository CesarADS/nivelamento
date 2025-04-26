
export default function BotaoLogout() {

    const dispatch = useDispatch();

    return (
    <button type="button" className="btn btn-light ms-auto" onClick={
        (e) => {
            e.preventDefault()
            dispatch(logout());
        }}>
        Logout
    </button>
    );
}
