"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "../ui/button"
import { useCart } from "@/stores/cart";

export const CartButton = () => {
    const cart = useCart();

    return (
        <Button onClick={() => cart.setOpen(true)}>
            <ShoppingCart />
        </Button>
    )
}