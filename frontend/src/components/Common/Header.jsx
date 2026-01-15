import Topbar from '../Layout/Topbar'
import Navbar from './Navbar'
function Header() {
  return (
    <header className="border-b border-gray-200 sticky top-0 bg-white z-50">
    {/* Top bar */}
    <Topbar/>
    {/* Navbar */}
    <Navbar/>
    {/* Cart*/}
    </header>
  )
}

export default Header