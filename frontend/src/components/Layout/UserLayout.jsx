import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { Outlet } from "react-router";
import ProductGrid from "../Products/ProductGrid";
const UserLayout = () => {
  return (
   <>
   {/* header */}
   <Header/>

   {/* Main Component */}
     <main>
      <Outlet/>
     </main>

   {/* footer */}
   <Footer/>
   </>
  )
}

export default UserLayout