import React, { useState } from "react";

export const ModalCreateWriter = ({ onClose }: { onClose?: () => void; }) => {
    const [form, setForm] = useState({ email: "", name: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/writers`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json", 
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(form),
            });

            // if (!res.ok) throw new Error("Erro ao criar escritor");

            setForm({ email: "", name: "", password: "" });
            
            onClose();
        } catch (err) {
            setError(err || "Erro desconhecido");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="bg-white rounded shadow-lg p-6 min-w-[320px] relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-black"
                    onClick={onClose}
                    type="button"
                >
                    ×
                </button>
                <h2 className="text-lg font-bold mb-4">Criar Escritor</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="border rounded px-3 py-2"
                    />
                    <input
                        name="name"
                        type="text"
                        placeholder="Nome"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="border rounded px-3 py-2"
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Senha"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="border rounded px-3 py-2"
                    />
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white rounded px-4 py-2 mt-2 hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? "Enviando..." : "Criar"}
                    </button>
                </form>
            </div>
        </div>
    );
};