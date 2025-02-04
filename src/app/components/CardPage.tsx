'use client'
import { useEffect, useState } from "react";

interface Card {
    id: number;
    name: String;
    email: String
    phone: String
    company: String
    title: String
}

export default function CardsPage() {
    const [cards, setCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch("/api/cards");
                if (!response.ok) {
                    throw new Error("Failed to fetch cards");
                }
                const data = await response.json();
                setCards(data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCards();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between pb-8">
            <h1 className="text-2xl font-bold mb-4">Cards</h1>
            <button className="bg-gray-500 p-3 rounded-md">Add Contact</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cards.map((card) => (
                    <div key={card.id} className="border p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">{card.name}</h2>
                        <p className="text-white-600">{card.title} at {card.company}</p>
                        <p className="text-white-600">{card.phone}</p>
                        <p className="text-white-600">{card.email}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
