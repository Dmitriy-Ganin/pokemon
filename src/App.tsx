import { Routes, Route, Navigate } from "react-router";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { AuthLaout } from "./layouts/AuthLayout";
import { ROUTES } from './routes';
import { useSelector } from 'react-redux';
import type { RootState } from './store/store';

function App() {
 
  const token = useSelector((state: RootState) => state.auth.token);

  console.log('App rendered, token:', token, 'current path:', window.location.pathname);

  return (
    <Routes>
      <Route path={ROUTES.HOME} element={token ? <Home /> : <Navigate to={ROUTES.LOGIN} replace />} />
      <Route path={ROUTES.AUTH} element={<AuthLaout />}>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
      </Route>
      <Route path="*" element={<Navigate to={token ? ROUTES.HOME : ROUTES.LOGIN} replace />} />
    </Routes>
  )
}
export default App