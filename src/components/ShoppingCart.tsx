import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext.tsx";
import { formatCurrency } from "../utilities/formatCurrency.ts";
import { CartItem } from "./CartItem.tsx";

type ShoppingCartProps = {
    isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
    const { closeCart, cartItems, products } = useShoppingCart();
    
    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map(cartItem => {
                        const item = products.find(product => product.id === cartItem.id);
                        return item ? <CartItem key={cartItem.id} {...item} quantity={cartItem.quantity} /> : null;
                    })}
                    <div className="ms-auto fw-bold fs-5">
                        Total{" "}
                        {formatCurrency(
                            cartItems.reduce((total, cartItem) => {
                                const item = products.find(product => product.id === cartItem.id);
                                return total + (item?.precio || 0) * cartItem.quantity;
                            }, 0)
                        )}
                    </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    );
}