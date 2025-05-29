"use client";

import { useCart } from "@/stores/cart";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CartEmpty } from "./cart-empty";
import { CartList } from "./cart-list";

export const Cart = () => {
    const cart = useCart();

    return (
        <Sheet open={cart.open} onOpenChange={cart.setOpen}>
            <SheetContent side="right" className="p-4 flex flex-col justify-between">
                <SheetHeader>
                    <SheetTitle>Carrinho</SheetTitle>
                </SheetHeader>
                <div>
                    {cart.items.length <= 0 && <CartEmpty />}
                    {cart.items.length >= 0 && <CartList />}
                </div>

            </SheetContent>
        </Sheet>
    );
}
