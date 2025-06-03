import { stripe } from "@/lib/stripe";
import { getLoggedUserFromHeader } from "@/services/auth";
import { createNewOrder } from "@/services/order";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    const headersList = await headers();
    const origin = headersList.get('origin');

    const { cart } = await request.json();
    const loggedUser = await getLoggedUserFromHeader();

    if (!loggedUser) return NextResponse.json({ error: "Usuário não logado" });
    if (!cart || (cart && cart.lenght <= 0)) return NextResponse.json({ error: "Carrinho vazio" });

    const order = await createNewOrder(loggedUser.id, cart);
    if (!order) return NextResponse.json({ error: "Ocorreu um erro" });

    // Metodo de pagamento
    const paymentSession = await stripe.checkout.sessions.create({
        mode: 'payment',
        success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}`,
        line_items: [
            {
                price_data: {
                    currency: 'BRL',
                    unit_amount: 100,
                    product_data: {
                        name: 'Produto de Teste',
                        description: 'Descriçao bobobobo'
                    }
                },
                quantity: 1
            },
            {
                price_data: {
                    currency: 'BRL',
                    unit_amount: 12345,
                    product_data: {
                        name: 'Produto de Teste 2'
                    }
                },
                quantity: 2
            }
        ]
    });

    return NextResponse.json({ order, url: paymentSession.url }, { status: 201 });
}