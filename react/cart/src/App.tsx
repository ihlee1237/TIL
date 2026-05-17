import { CartButton, CartProvider } from "./Cart";

function App() {
	return (
		<CartProvider>
			<CartButton />
		</CartProvider>
	);
}

export default App;
