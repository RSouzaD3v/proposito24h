import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, Eye, ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const WriterReadingPlanEdit = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchReadPlan = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/read-plan/findunique-by-id/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) throw new Error("Erro ao buscar plano");
        const data = await response.json();
        setTitle(data.readPlan.title);
        setDescription(data.readPlan.description);
        setDuration(data.readPlan.duration?.toString() || "");
        setDays(data.readPlan.readingShedules);
      } catch (error) {
        console.error("Erro ao buscar plano:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReadPlan();
  }, [id]);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/devocional/books`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) throw new Error("Erro ao buscar livros");
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const addDay = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/read-plan/create-newday/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          titleDay: "",
          bookId: books[0]?.id || "",
          referenceDay: days.length + 1
        })
      });
      if (!response.ok) throw new Error("Erro ao criar dia");
      const data = await response.json();
      setDays([...days, data.newDay]);
    } catch (e) {
      console.error(e);
    }
  };

  const removeDay = async (dayId: string) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/read-plan/day/delete/${dayId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setDays(days.filter(d => d.id !== dayId));
    } catch (e) {
      console.error(e);
    }
  };

  const handleDayChange = (dayId: string, field: string, value: string) => {
    setDays(prev =>
      prev.map(day =>
        day.id === dayId ? { ...day, [field]: value } : day
      )
    );
  };

  const updateDay = async (dayId: string, titleDay: string, bookId: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/read-plan/update-day/${dayId}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ titleDay, bookId })
      });
      if (!response.ok) throw new Error("Erro ao atualizar dia");
      console.log("Dia atualizado com sucesso");
    } catch (e) {
      console.error(e);
    }
  };

  const updatePlan = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${import.meta.env.VITE_API_URL}/read-plan/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          description,
          duration
        })
      });
      console.log("Plano atualizado com sucesso");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/writer/reading-plans">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Editor de Plano de Leitura</h1>
            <p className="text-muted-foreground">Crie ou edite seu plano de leitura</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Visualizar
          </Button>
          <Button onClick={updatePlan}>
            <Save className="mr-2 h-4 w-4" />
            Atualizar
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Plano</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                placeholder="Digite o título do plano"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duração</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a duração" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 dias</SelectItem>
                  <SelectItem value="14">14 dias</SelectItem>
                  <SelectItem value="21">21 dias</SelectItem>
                  <SelectItem value="30">30 dias</SelectItem>
                  <SelectItem value="custom">Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Descreva o objetivo do plano de leitura"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Cronograma de Leitura</h2>
          <Button onClick={addDay}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Dia
          </Button>
        </div>

        {days.map((day) => (
          <Card key={day.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Dia {day.referenceDay}</CardTitle>
                <div className="flex gap-2">
                  <Button onClick={() => updateDay(day.id, day.titleDay, day.bookId)}>
                    <Save className="mr-2 h-4 w-4" />Salvar
                  </Button>
                  {days.length > 1 && (
                    <Button variant="outline" size="sm" onClick={() => removeDay(day.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Título do Dia</Label>
                  <Input
                    placeholder="Ex: Descobrindo a Graça"
                    value={day.titleDay}
                    onChange={(e) => handleDayChange(day.id, 'titleDay', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Devocional</Label>
                  <Select
                    value={day.bookId}
                    onValueChange={(value) => handleDayChange(day.id, 'bookId', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um devocional" />
                    </SelectTrigger>
                    <SelectContent>
                      {books.map((v) => (
                        <SelectItem key={v.id} value={v.id}>
                          {v.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WriterReadingPlanEdit;
