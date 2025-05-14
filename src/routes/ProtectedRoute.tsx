import { Navigate, Outlet } from "react-router";
import authStore from "../stores/auth.store";
import { observer } from "mobx-react-lite";

const ProtectedRoute = observer(() => {
    if(!authStore.user){
        <Navigate to='/login' replace />
    }

    return <Outlet/>
})

export default ProtectedRoute