import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../Login';
import Administrador from '../Administrador';

function Router() {
    return (
        <BrowserRouter>
        <Routes>

<Route path="/" element={<Navigate to={"/login"}></Navigate>}>
</Route>
<Route path="/login" element={<Login></Login>}>
</Route>
<Route path="/admin" element={<Administrador></Administrador>}>
</Route>


        </Routes>
        </BrowserRouter>
    )
}

export default Router;