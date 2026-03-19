import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51Ri3h84KKdkwE2ei8tqM13H6o4CU000QGuUafO1UeZNbcgKcbPjh7XhHwaQwnNwyrgdmWXv0vnDBTiAWqenL297g00lqQcOOc5"); // Replace with your PUBLISHABLE key

export default function CheckoutButton({ cartItems }) {
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const response = await fetch("http://localhost:4242/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartItems }),
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
    >
      Pay with Stripe 💳
    </button>
  );
}
