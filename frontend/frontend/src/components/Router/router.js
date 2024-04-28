import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../Login';
import Administrador from '../Administrador';
import Mp from '../Mp';
import Publicacion from '../Publicacion';
import Info from '../Info';
import Tabla from '../Tabla';





function Router() {
    return (
        <BrowserRouter>
        <Routes>

<Route path="/" element={<Navigate to={"/info"}></Navigate>}>
</Route>
<Route path="/login" element={<Login></Login>}>
</Route>
<Route path="/admin" element={<Administrador></Administrador>}>
</Route>
<Route path="/menup" element={<Mp></Mp>}>
</Route>
<Route path="/createPost" element={<Publicacion></Publicacion>}>
</Route>
<Route path="/info" element={<Info></Info>}>
</Route>
<Route path="/tabla" element={<Tabla></Tabla>}>
</Route>






        </Routes>
        </BrowserRouter>
    )
}

export default Router;