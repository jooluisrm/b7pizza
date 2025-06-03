import { NextResponse } from "next/server";

export async function POST(request: Request) {

    console.log('ok');

    return NextResponse.json({bla: true});
}