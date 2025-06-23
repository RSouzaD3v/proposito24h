
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, ChevronLeft, ChevronRight, Heart, Share2, Sun, Moon, Type, BookmarkPlus, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const SampleDevotional = () => {
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { toast } = useToast();

  const getFontSizeClass = () => {
    switch (fontSize) {
      case "small": return "text-base";
      case "medium": return "text-lg";
      case "large": return "text-xl";
      default: return "text-lg";
    }
  };

  const handleFavorite = () => {
    toast({
      title: "Funcionalidade Premium",
      description: "Faça upgrade para adicionar devocionais aos favoritos.",
    });
    setIsFavorite(!isFavorite);
  };

  const handleBookmark = () => {
    toast({
      title: "Funcionalidade Premium",
      description: "Faça upgrade para adicionar marcadores aos devocionais.",
    });
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    toast({
      title: "Compartilhado!",
      description: "Link para o devocional copiado para a área de transferência.",
    });
  };

  const handleNextDevotional = () => {
    toast({
      title: "Funcionalidade Premium",
      description: "Faça upgrade para acessar mais devocionais.",
    });
  };

  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-10">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              Devocionais
            </Link>
            <div className="flex gap-4">
              <Link to="/login">
                <Button variant="ghost">Entrar</Button>
              </Link>
              <Link to="/signup">
                <Button>Registrar</Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 py-8">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold">Série:</span> Paz Diária
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                  {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                </Button>
                <div className="relative group">
                  <Button 
                    variant="ghost" 
                    size="icon"
                  >
                    <Type className="h-5 w-5" />
                  </Button>
                  <div className="absolute right-0 mt-2 bg-background border rounded-md shadow-md p-2 hidden group-hover:block z-20">
                    <div className="flex flex-col gap-2">
                      <Button 
                        variant={fontSize === "small" ? "default" : "ghost"} 
                        size="sm" 
                        onClick={() => setFontSize("small")}
                      >
                        Pequeno
                      </Button>
                      <Button 
                        variant={fontSize === "medium" ? "default" : "ghost"} 
                        size="sm" 
                        onClick={() => setFontSize("medium")}
                      >
                        Médio
                      </Button>
                      <Button 
                        variant={fontSize === "large" ? "default" : "ghost"} 
                        size="sm" 
                        onClick={() => setFontSize("large")}
                      >
                        Grande
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
              Encontrando Paz nas Tempestades da Vida
            </h1>
            
            <div className="flex items-center gap-3 mb-8">
              <div className="flex-1 flex items-center">
                <img 
                  src="https://randomuser.me/api/portraits/men/42.jpg" 
                  alt="Pastor João Silva"
                  className="h-10 w-10 rounded-full mr-3"
                />
                <div>
                  <div className="font-medium">Pastor João Silva</div>
                  <div className="text-sm text-muted-foreground">14 de Junho, 2024</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleFavorite}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleBookmark}
                >
                  {isBookmarked ? 
                    <Bookmark className="h-5 w-5 fill-primary text-primary" /> : 
                    <BookmarkPlus className="h-5 w-5" />
                  }
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleShare}
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="mb-8">
              <div className="bg-primary/10 p-4 rounded-lg mb-6 bible-quote">
                <p className="text-lg italic mb-2">
                  "Deixo com vocês a paz. É a minha paz que eu lhes dou; não lhes dou a paz como o mundo a dá. Não fiquem aflitos nem tenham medo."
                </p>
                <p className="text-right font-medium">João 14:27</p>
              </div>

              <div className={`prose prose-lg dark:prose-invert max-w-none ${getFontSizeClass()}`}>
                <p>
                  Em um mundo repleto de incertezas e desafios constantes, encontrar paz parece uma tarefa cada vez mais difícil. Vivemos em uma era de informações instantâneas, notificações incessantes e expectativas crescentes. Como podemos experimentar a verdadeira paz em meio a tanta agitação?
                </p>

                <p>
                  A passagem de João 14:27 nos oferece uma perspectiva profunda. Jesus faz uma distinção crucial entre a paz que Ele oferece e a paz que o mundo proporciona. A paz do mundo é frequentemente temporária, superficial e dependente de circunstâncias favoráveis. Em contraste, a paz de Cristo é permanente, profunda e transcende qualquer situação.
                </p>

                <h2 className="text-xl font-bold mt-6 mb-3">A Natureza da Paz Divina</h2>

                <p>
                  A paz que Jesus oferece não é apenas a ausência de problemas, mas a presença de algo maior. É a certeza de que, independentemente das tempestades que enfrentamos, não estamos sozinhos. É a convicção de que há um propósito maior em nossa jornada, mesmo quando não conseguimos enxergá-lo claramente.
                </p>

                <p>
                  Quando Jesus diz "Não fiquem aflitos nem tenham medo", Ele reconhece nossa tendência natural à preocupação. No entanto, Ele nos convida a uma perspectiva diferente — uma que está ancorada em Sua presença constante e em Suas promessas eternas.
                </p>

                <div className="bg-accent/30 p-4 rounded-lg my-6">
                  <h3 className="font-bold mb-2">Reflexão</h3>
                  <p>
                    Em quais áreas da sua vida você está buscando paz? Você tem procurado essa paz nas fontes certas? Como seria sua vida se você experimentasse plenamente a paz que Jesus oferece?
                  </p>
                </div>

                <h2 className="text-xl font-bold mt-6 mb-3">Cultivando Paz em Tempos Difíceis</h2>

                <p>
                  Existem práticas espirituais que nos ajudam a experimentar a paz de Cristo em nosso dia a dia:
                </p>

                <ul>
                  <li><strong>Meditação nas Escrituras:</strong> Dedicar tempo para ler e refletir sobre a Palavra de Deus.</li>
                  <li><strong>Oração Constante:</strong> Manter um diálogo aberto com Deus, compartilhando nossas alegrias e preocupações.</li>
                  <li><strong>Gratidão:</strong> Reconhecer e agradecer pelas bênçãos em nossa vida, mesmo em meio às dificuldades.</li>
                  <li><strong>Comunhão:</strong> Participar de uma comunidade de fé que nos apoie e nos incentive.</li>
                </ul>

                <p>
                  A paz que Jesus oferece não nos isenta de problemas, mas nos capacita a enfrentá-los com uma perspectiva renovada. É uma paz que permanece mesmo quando tudo ao nosso redor parece desmoronar.
                </p>

                <div className="mt-6 text-center text-muted-foreground">
                  <p>
                    <strong>Este é um devocional de amostra.</strong> 
                    <br/>
                    Para acessar nossa biblioteca completa com mais de 1.000 devocionais, assine agora.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-12 border-t pt-6">
              <h3 className="text-xl font-bold mb-4">Oração do Dia</h3>
              <div className="bg-accent/20 p-4 rounded-lg bible-quote">
                <p className="italic">
                  "Senhor, em meio às tempestades da vida, ajuda-me a experimentar Tua paz que excede todo entendimento. Que eu possa descansar na certeza do Teu amor e da Tua presença constante. Ensina-me a buscar a verdadeira paz que só Tu podes dar. Em nome de Jesus, amém."
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center border-t pt-6 pb-8">
              <Button variant="outline" disabled>
                <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
              </Button>
              <Link to="/plans">
                <Button>
                  Ver todos os planos
                </Button>
              </Link>
              <Button onClick={handleNextDevotional}>
                Próximo <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="bg-primary/5 rounded-lg p-6 mb-12">
              <h3 className="text-xl font-bold mb-4 text-center">Acesse conteúdo exclusivo</h3>
              <p className="text-center mb-6">
                Desbloqueie nossa biblioteca completa de devocionais, planos de leitura e recursos exclusivos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <Button>
                    Criar Conta Gratuita
                  </Button>
                </Link>
                <Link to="/plans">
                  <Button variant="outline">
                    Conhecer Planos Premium
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </main>

        <footer className="border-t py-8">
          <div className="container mx-auto px-4 text-center text-muted-foreground">
            <p>&copy; 2024 Devocionais. Todos os direitos reservados.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SampleDevotional;
