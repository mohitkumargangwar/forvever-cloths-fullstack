import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess, onError }) => {
  return (
    <PayPalScriptProvider
      options={{
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
        intent: "capture",
        components: "buttons",
        commit: false,
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: Number(amount).toFixed(2), // ✅ NO currency here
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            if (onSuccess) {
              onSuccess(details);
            }
          });
        }}
        onError={(err) => {
          console.error("PayPal Error:", err);
          if (onError) {
            onError(err);
          }
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
