'use client'
import { Pencil } from "lucide-react";
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
    const [editing, setEditing] = useState(false)

    function handleEditCard(){
        setEditing(true);
    }
    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch("/api/cards");
                if (!response.ok) {
                    throw new Error("Failed to fetch cards");
                }
                const data = await response.json();
                console.log(data);
                setCards(data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCards();
    }, []);

    if (loading) return <p className="text-[#202020]">Loading...</p>;
    if (error) return <p className="text-[#202020]">Error: {error}</p>;

    return (
        <div className="container mx-auto p-4">            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {cards.map((card) => (
                    <div key={card.id} className="border p-4 rounded-lg shadow-md">
                        <h2 className="text-xl text-[#202020] font-semibold">{card.name}</h2>
                        <p className="text-[#202020]">{card.title} at {card.company}</p>
                        <p className="text-[#202020]">{card.phone}</p>
                        <p className="text-[#202020]">{card.email}</p>
                        <button className="text-[#202020]" onClick={handleEditCard}>
                            <Pencil className=""/>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
