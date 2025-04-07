import { useLocation, useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state;

  if (!orderData) {
    navigate("/"); // Redirect to home if no order data is found
    return null;
  }

  const { cartItems, formData, total } = orderData;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          Order Confirmation
        </h2>

        <div className="mb-4">
          <h3 className="font-semibold">Customer Details:</h3>
          <p>
            <strong>Name:</strong> {formData.fullName}
          </p>
          <p>
            <strong>Phone:</strong> {formData.phoneNumber}
          </p>
          <p>
            <strong>Email:</strong> {formData.email}
          </p>
          <p>
            <strong>Address:</strong> {formData.address}
          </p>
          <p>
            <strong>Payment Method:</strong> {formData.paymentMethod}
          </p>
          {formData.paymentMethod === "card" && (
            <p>
              <strong>Card Number:</strong> **** **** ****{" "}
              {formData.cardNumber.slice(-4)}
            </p>
          )}
        </div>

        <div className="mb-4">
          <h3 className="font-semibold">Order Items:</h3>
          {cartItems.map((item: any) => (
            <div key={item.id} className="flex justify-between border-b py-2">
              <span>
                {item.name} (x{item.quantity})
              </span>
              <span>${(item.discountPrice || item.price) * item.quantity}</span>
            </div>
          ))}
        </div>

        <div className="text-lg font-bold mb-4">Total: ${total.toFixed(2)}</div>

        <div className="flex justify-between">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => alert("Order Confirmed!")}
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
