
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, Eye, ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const WriterReadingPlanEditor = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [days, setDays] = useState([
    { id: 1, day: 1, title: "", devotionalId: "" }
  ]);

  const addDay = () => {
    const newDay = {
      id: days.length + 1,
      day: days.length + 1,
      title: "",
      devotionalId: ""
    };
    setDays([...days, newDay]);
  };

  const removeDay = (id: number) => {
    setDays(days.filter(d => d.id !== id).map((d, index) => ({ ...d, day: index + 1 })));
  };

  const updateDay = (id: number, field: string, value: any) => {
    setDays(days.map(d => 
      d.id === id ? { ...d, [field]: value } : d
    ));
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
            <p className="text-muted-foreground">
              Crie ou edite seu plano de leitura
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Visualizar
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Salvar
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
                <CardTitle className="text-lg">Dia {day.day}</CardTitle>
                {days.length > 1 && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => removeDay(day.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Título do Dia</Label>
                  <Input
                    placeholder="Ex: Descobrindo a Graça"
                    value={day.title}
                    onChange={(e) => updateDay(day.id, 'title', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Devocional</Label>
                  <Select 
                    value={day.devotionalId} 
                    onValueChange={(value) => updateDay(day.id, 'devotionalId', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um devocional" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">A Graça de Deus</SelectItem>
                      <SelectItem value="2">Fé em Tempos Difíceis</SelectItem>
                      <SelectItem value="3">O Amor de Cristo</SelectItem>
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

export default WriterReadingPlanEditor;
