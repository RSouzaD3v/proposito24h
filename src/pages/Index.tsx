
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, UserCircle2, BookText, Star, Users, BookMarked, Award } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const { toast } = useToast();

  const handlePlanClick = () => {
    toast({
      title: "Plano selecionado",
      description: "Você será notificado quando o plano estiver disponível.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Devocionais</h1>
          <div className="flex gap-4">
            <Link to="/login">
              <Button variant="ghost" className="flex items-center gap-2">
                <UserCircle2 className="h-5 w-5" />
                Entrar
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="default" className="flex items-center gap-2">
                Registrar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-accent/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Fortaleça sua jornada espiritual
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Descubra devocionais diários inspiradores e aprofunde sua conexão com Deus
            através de reflexões significativas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="gap-2">
                <BookOpen className="h-5 w-5" />
                Começar Agora
              </Button>
            </Link>
            <Link to="/plans">
              <Button size="lg" variant="outline" className="gap-2">
                <BookText className="h-5 w-5" />
                Ver Planos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-12 text-center">
            Recursos que transformam sua vida espiritual
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="h-7 w-7 text-primary" />
              </div>
              <h4 className="text-xl font-bold mb-2">Devocionais Diários</h4>
              <p className="text-muted-foreground">Reflexões elaboradas por escritores experientes para cada dia do ano.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BookMarked className="h-7 w-7 text-primary" />
              </div>
              <h4 className="text-xl font-bold mb-2">Planos de Leitura</h4>
              <p className="text-muted-foreground">Planos temáticos para ajudar em sua caminhada espiritual e aprofundamento bíblico.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Star className="h-7 w-7 text-primary" />
              </div>
              <h4 className="text-xl font-bold mb-2">Anotações Pessoais</h4>
              <p className="text-muted-foreground">Registre suas reflexões e insights para consultar posteriormente.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <h4 className="text-xl font-bold mb-2">Comunidade</h4>
              <p className="text-muted-foreground">Compartilhe suas experiências e cresça junto com outros leitores.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Plans */}
      <section className="py-16 bg-accent/20">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-8 text-center">
            Planos em Destaque
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Plano 1 */}
            <Card>
              <CardHeader>
                <CardTitle>21 Dias de Oração</CardTitle>
                <CardDescription>Fortaleça sua vida de oração</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Um guia diário para desenvolver o hábito da oração e aprofundar sua
                  conexão espiritual.
                </p>
              </CardContent>
              <CardFooter>
                <Button onClick={handlePlanClick} className="w-full">
                  Começar Plano
                </Button>
              </CardFooter>
            </Card>

            {/* Plano 2 */}
            <Card>
              <CardHeader>
                <CardTitle>Sabedoria dos Provérbios</CardTitle>
                <CardDescription>Aplicando sabedoria antiga hoje</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Explore os ensinamentos práticos do livro de Provérbios para sua
                  vida diária.
                </p>
              </CardContent>
              <CardFooter>
                <Button onClick={handlePlanClick} className="w-full">
                  Começar Plano
                </Button>
              </CardFooter>
            </Card>

            {/* Plano 3 */}
            <Card>
              <CardHeader>
                <CardTitle>Salmos para a Vida</CardTitle>
                <CardDescription>Encontre paz e direção</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Meditações diárias baseadas nos Salmos para trazer conforto e
                  orientação.
                </p>
              </CardContent>
              <CardFooter>
                <Button onClick={handlePlanClick} className="w-full">
                  Começar Plano
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-12 text-center">
            O que nossos usuários dizem
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-accent/10 border-none">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Award className="h-5 w-5 text-yellow-500 mr-1" />
                  <Award className="h-5 w-5 text-yellow-500 mr-1" />
                  <Award className="h-5 w-5 text-yellow-500 mr-1" />
                  <Award className="h-5 w-5 text-yellow-500 mr-1" />
                  <Award className="h-5 w-5 text-yellow-500" />
                </div>
                <blockquote className="text-lg mb-4 italic">
                  "Os devocionais diários transformaram minha rotina matinal. Agora tenho um momento especial de reflexão todos os dias."
                </blockquote>
                <div className="font-semibold">Maria S.</div>
                <div className="text-sm text-muted-foreground">Usuária há 8 meses</div>
              </CardContent>
            </Card>
            
            <Card className="bg-accent/10 border-none">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Award className="h-5 w-5 text-yellow-500 mr-1" />
                  <Award className="h-5 w-5 text-yellow-500 mr-1" />
                  <Award className="h-5 w-5 text-yellow-500 mr-1" />
                  <Award className="h-5 w-5 text-yellow-500 mr-1" />
                  <Award className="h-5 w-5 text-yellow-500" />
                </div>
                <blockquote className="text-lg mb-4 italic">
                  "Os planos de leitura me ajudaram a explorar a Bíblia de forma estruturada e significativa. Recomendo muito!"
                </blockquote>
                <div className="font-semibold">João P.</div>
                <div className="text-sm text-muted-foreground">Usuário há 1 ano</div>
              </CardContent>
            </Card>
            
            <Card className="bg-accent/10 border-none">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Award className="h-5 w-5 text-yellow-500 mr-1" />
                  <Award className="h-5 w-5 text-yellow-500 mr-1" />
                  <Award className="h-5 w-5 text-yellow-500 mr-1" />
                  <Award className="h-5 w-5 text-yellow-500 mr-1" />
                  <Award className="h-5 w-5 text-yellow-500" />
                </div>
                <blockquote className="text-lg mb-4 italic">
                  "A funcionalidade de anotações pessoais me permite registrar insights e reflexões que surgem durante a leitura."
                </blockquote>
                <div className="font-semibold">Ana C.</div>
                <div className="text-sm text-muted-foreground">Usuária há 6 meses</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Bible Quote Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <blockquote className="bible-quote text-2xl md:text-3xl italic mb-4">
            "Lâmpada para os meus pés é a tua palavra, e luz para o meu caminho."
          </blockquote>
          <p className="text-lg">Salmos 119:105</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent/30">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-6">
            Comece sua jornada espiritual hoje
          </h3>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que estão transformando sua vida através de devocionais diários e planos de leitura.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="gap-2">
                Criar Conta Gratuita
              </Button>
            </Link>
            <Link to="/sample">
              <Button size="lg" variant="outline" className="gap-2">
                Experimentar Devocional
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-4">Devocionais</h4>
              <p className="text-muted-foreground">Fortalecendo sua jornada espiritual com reflexões diárias e planos de leitura.</p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-muted-foreground hover:text-primary">Início</Link></li>
                <li><Link to="/plans" className="text-muted-foreground hover:text-primary">Planos</Link></li>
                <li><Link to="/sample" className="text-muted-foreground hover:text-primary">Experimentar</Link></li>
                <li><Link to="/login" className="text-muted-foreground hover:text-primary">Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Suporte</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary">FAQ</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Contato</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Termos de Uso</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Privacidade</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Inscreva-se</h4>
              <p className="text-muted-foreground mb-4">Receba novidades e devocionais inspiradores em seu email.</p>
              <div className="flex">
                <input type="email" placeholder="Seu email" className="flex h-10 w-full rounded-l-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                <Button className="rounded-l-none">Inscrever</Button>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Devocionais. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
