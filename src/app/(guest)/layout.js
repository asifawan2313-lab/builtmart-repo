import BmNavbar from "../../component/guest/Bmnavbar/Bmnavbar";
import BmFooter from "../../component/guest/Bmfooter/Bmfooter";
import { CartProvider } from "../../component/shared/cart/CartProvider";

// Navbar aur footer har guest page par aate hain.
// CartProvider sab ko wrap karta hai, taake navbar ka cart count har page par sync rahe.
const GuestLayout = ({ children }) => (
  <CartProvider>
    <BmNavbar />
    {children}
    <BmFooter />
  </CartProvider>
);

export default GuestLayout;