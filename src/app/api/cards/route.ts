import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || 0;
    const perPage = searchParams.get("perPage") || 10;

    const cards = await prisma.card.findMany({
      take: Number(perPage),
      skip: Number(page) * Number(perPage),
    });

    return NextResponse.json(cards || []);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error!" },
      {
        status: 500,
      }
    );
  }
}
