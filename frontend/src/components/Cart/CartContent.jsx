import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { updateCartItemQuantity, removeFromCart } from "../../redux/slice/cartSlice";
function CartContents({ cart, userId, guestId }) {
  const dispatch = useDispatch();

  // handle adding or subtrating to cart quantity

  const handleAddToCart = (productId, delta, quantity, size, color) => {
    if (!productId) return; // avoid bad calls when data shape is unexpected
    const newQuantity = quantity + delta;
    if(newQuantity >= 1) {
      dispatch(updateCartItemQuantity({
        productId,
        quantity: newQuantity,
        guestId,
        userId,
        size,
        color,
      }));
    }
  };

  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(removeFromCart({productId, guestId, userId, size, color}));
  };

  return (
    <div>
      {cart?.products?.map((product, index) => {
        const productId = product?.id || product?.productId || product?.product?._id;
        const uniqueKey = `${productId}-${product.size}-${product.color}`;
        return (
        <div key={uniqueKey || index} className="flex items-start justify-between py-4 border-b"
         data-lenis-prevent-wheel
      data-lenis-prevent-touch>
          <div className="flex items-start">
            <img
              src={product.image}
              alt={product.name}
              className="w-24 h-28 object-cover mr-4 rounded"              loading="lazy"            />
            <div>
              <h3>{product.name}</h3>
              <p className="text-sm text-gray-500">
                size: {product.size} | color: {product.color}
              </p>
              <div className="flex items-center mt-2">
                <button onClick={() => handleAddToCart(productId, -1, product.quantity, product.size, product.color)}
                className="border rounded px-2.5 text-xl font-medium">
                  -
                </button>
                <span className="mx-4">{product.quantity}</span>
                <button onClick={() => handleAddToCart(productId, 1, product.quantity, product.size, product.color)}
                className="border rounded px-2 text-xl font-medium">
                  +
                </button>
              </div>
            </div>
          </div>
          <div>
            <p className="font-medium">${product.price.toLocaleString()}</p>
            <button onClick={() => handleRemoveFromCart(productId, product.size, product.color)}>
                <RiDeleteBin3Line className="h-6 w-6 mt-2 text-red-600" />
            </button>
            </div>
        </div>
      );})}
    </div>
  );
}

export default CartContents;