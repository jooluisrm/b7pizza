"use client";

import { useCart } from "@/stores/cart";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export const Cart = () => {
    const cart = useCart();

    return (
        <Sheet open={cart.open} onOpenChange={cart.setOpen}>
            <SheetContent side="right" className="">
                <SheetHeader>
                    <SheetTitle>Carrinho</SheetTitle>
                </SheetHeader>
                {/* Conteúdo do carrinho */}
                ...
            </SheetContent>
        </Sheet>
    );
}
