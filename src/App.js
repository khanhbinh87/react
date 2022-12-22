import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";


export default function App() {


  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="main-container">
        <div className="sidenav-container"></div>
        <div className="app-content">
          <Outlet />
        </div>
      </div>
     
    </div>
  )
}
