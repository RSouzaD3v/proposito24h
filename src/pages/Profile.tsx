import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Calendar, Clock, Star, Download, Receipt, ShoppingCart, LucideIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
}

const StatCard = ({ title, value, icon: Icon, description }: StatCardProps) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-center">
        <Icon className="h-5 w-5 mr-2 text-primary" />
        <span className="text-2xl font-bold">{value}</span>
      </div>
      {description && (
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      )}
    </CardContent>
  </Card>
);

// Mock data for purchased books
const purchasedBooks = [
  {
    id: "1",
    title: "Encontrando Paz nas Tempestades da Vida",
    author: "Pastor João Silva",
    price: "R$ 29,90",
    purchaseDate: "2024-01-15",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop"
  },
  {
    id: "2",
    title: "O Poder da Gratidão",
    author: "Pr. Roberto Mendes",
    price: "R$ 24,90",
    purchaseDate: "2023-12-10",
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop"
  },
  {
    id: "3",
    title: "Renovando sua Fé Diariamente",
    author: "Dra. Maria Oliveira",
    price: "R$ 34,90",
    purchaseDate: "2024-01-05",
    coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop"
  }
];

// Mock data for purchase receipts
const purchaseReceipts = [
  {
    id: "receipt-001",
    date: "2024-01-15",
    items: [
      { title: "Encontrando Paz nas Tempestades da Vida", price: "R$ 29,90" }
    ],
    total: "R$ 29,90",
    paymentMethod: "Cartão de Crédito **** 1234"
  },
  {
    id: "receipt-002",
    date: "2023-12-10",
    items: [
      { title: "O Poder da Gratidão", price: "R$ 24,90" }
    ],
    total: "R$ 24,90",
    paymentMethod: "PIX"
  },
  {
    id: "receipt-003",
    date: "2024-01-05",
    items: [
      { title: "Renovando sua Fé Diariamente", price: "R$ 34,90" }
    ],
    total: "R$ 34,90",
    paymentMethod: "Cartão de Débito **** 5678"
  }
];

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [isPremium, setIsPremium] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveProfile = () => {
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram atualizadas com sucesso.",
    });
    setIsEditing(false);
  };

  const handleDownloadReceipt = (receiptId: string) => {
    toast({
      title: "Download iniciado",
      description: "O comprovante será baixado em breve.",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-0.5">
        <h1 className="text-2xl font-bold md:text-3xl">Perfil</h1>
        <p className="text-muted-foreground">
          Gerencie suas informações pessoais e compras
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="statistics">Estatísticas</TabsTrigger>
          <TabsTrigger value="purchased-books">Livros Comprados</TabsTrigger>
          <TabsTrigger value="receipts">Comprovante de Compra</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col items-center sm:flex-row sm:items-start sm:justify-between">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user?.avatar} alt={user?.name || "Avatar"} />
                    <AvatarFallback className="text-2xl">{user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <div className="text-center sm:text-left">
                    <h2 className="text-xl font-bold">{user?.name}</h2>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                    <div className="mt-1">
                      {isPremium ? (
                        <Badge variant="default">Premium</Badge>
                      ) : (
                        <Badge variant="outline">Plano Básico</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0">
                  <Button
                    variant={isEditing ? "ghost" : "outline"}
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? "Cancelar" : "Editar Perfil"}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button onClick={handleSaveProfile}>Salvar Alterações</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Sobre</h3>
                  <p className="text-muted-foreground">
                    Membro desde {new Date().toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
                  </p>
                  
                  <h3 className="text-lg font-medium pt-4">Interesses</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Oração</Badge>
                    <Badge variant="secondary">Estudo Bíblico</Badge>
                    <Badge variant="secondary">Vida Familiar</Badge>
                    <Badge variant="secondary">Superação</Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Completou o devocional "Paz em Tempos Difíceis"</p>
                    <p className="text-sm text-muted-foreground">Ontem às 19:45</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Star className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Atingiu 7 dias consecutivos de leitura</p>
                    <p className="text-sm text-muted-foreground">3 dias atrás</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Iniciou o plano "21 Dias de Oração"</p>
                    <p className="text-sm text-muted-foreground">5 dias atrás</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistics" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            <StatCard 
              title="Devocionais Concluídos" 
              value="12" 
              icon={BookOpen} 
            />
            <StatCard 
              title="Sequência Atual" 
              value="7 dias" 
              icon={Star} 
              description="Seu recorde: 14 dias" 
            />
            <StatCard 
              title="Tempo Total de Leitura" 
              value="4h 25m" 
              icon={Clock} 
            />
            <StatCard 
              title="Planos de Leitura" 
              value="2" 
              icon={Calendar} 
              description="1 em andamento, 1 concluído" 
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Hábitos de Leitura</CardTitle>
              <CardDescription>
                Seu padrão de leitura nas últimas semanas
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p>Gráfico de estatísticas seria renderizado aqui.</p>
                <p className="text-sm mt-2">
                  (Implementação futura com biblioteca de gráficos)
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Categorias Mais Lidas</CardTitle>
              <CardDescription>
                Seus interesses com base nos devocionais lidos
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[200px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p>Gráfico de categorias seria renderizado aqui.</p>
                <p className="text-sm mt-2">
                  (Implementação futura com biblioteca de gráficos)
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="purchased-books" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Livros Comprados</CardTitle>
              <CardDescription>
                Todos os livros que você adquiriu
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {purchasedBooks.map((book) => (
                  <div key={book.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-16 h-20 bg-muted rounded flex-shrink-0">
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="h-full w-full object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif font-semibold">{book.title}</h3>
                      <p className="text-sm text-muted-foreground">por {book.author}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm font-medium text-primary">{book.price}</span>
                        <span className="text-sm text-muted-foreground">
                          Comprado em {formatDate(book.purchaseDate)}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Ler Agora
                    </Button>
                  </div>
                ))}
              </div>
              
              {purchasedBooks.length === 0 && (
                <div className="text-center py-8">
                  <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Nenhum livro comprado</h3>
                  <p className="mt-2 text-muted-foreground">
                    Explore nossa biblioteca e adquira seus primeiros livros
                  </p>
                  <Button className="mt-4">
                    Explorar Livros
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="receipts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Comprovantes de Compra</CardTitle>
              <CardDescription>
                Histórico completo de suas transações
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {purchaseReceipts.map((receipt) => (
                  <div key={receipt.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium">Comprovante #{receipt.id}</h3>
                        <p className="text-sm text-muted-foreground">
                          Data: {formatDate(receipt.date)}
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownloadReceipt(receipt.id)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Baixar
                      </Button>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      {receipt.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{item.title}</span>
                          <span>{item.price}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t pt-2 space-y-1">
                      <div className="flex justify-between font-medium">
                        <span>Total:</span>
                        <span>{receipt.total}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Pagamento: {receipt.paymentMethod}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {purchaseReceipts.length === 0 && (
                <div className="text-center py-8">
                  <Receipt className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Nenhum comprovante encontrado</h3>
                  <p className="mt-2 text-muted-foreground">
                    Seus comprovantes de compra aparecerão aqui
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
