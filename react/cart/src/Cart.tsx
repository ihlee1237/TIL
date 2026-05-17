import { createContext, useContext, useMemo, useReducer } from "react";

type CartItem = { id: number; name: string; qty: number };
type State = { items: CartItem[] };
type ContextType = State & { dispatch: React.Dispatch<Action> };
type Action =
	| { type: "ADD_ITEM"; payload: CartItem }
	| { type: "REMOVE_ITEM"; payload: number };

const CartContext = createContext<ContextType | null>(null);

function cartReducer(state: State, action: Action): State {
	switch (action.type) {
		case "ADD_ITEM": {
			const exists = state.items.find((i) => i.id === action.payload.id);

			if (exists) {
				return {
					...state,
					items: state.items.map((i) =>
						i.id === action.payload.id
							? { ...i, qty: i.qty + action.payload.qty }
							: i,
					),
				};
			}

			return { ...state, items: [...state.items, action.payload] };
		}

		case "REMOVE_ITEM":
			return {
				...state,
				items: state.items.filter((i) => i.id !== action.payload),
			};
	}
}

export function CartProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(cartReducer, { items: [] });
	const value = useMemo(() => ({ ...state, dispatch }), [state]);
	console.log(state);

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function useCart() {
	const ctx = useContext(CartContext);
	if (!ctx) throw new Error("useCart must be used within CartProvider");
	return ctx;
}

export function CartButton() {
	const ctx = useCart();
	return (
		<button
			type="button"
			onClick={() =>
				ctx.dispatch({
					type: "ADD_ITEM",
					payload: { id: 1, name: "shoes", qty: 1 },
				})
			}
		>
			담기
		</button>
	);
}
