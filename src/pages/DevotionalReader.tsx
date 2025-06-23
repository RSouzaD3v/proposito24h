
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  Share2, 
  Sun, 
  Moon, 
  Type, 
  BookmarkPlus, 
  Bookmark,
  MessageSquare
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Dados simulados
const devotionalData = {
  id: "1",
  title: "Encontrando Paz nas Tempestades da Vida",
  author: "Pastor João Silva",
  authorAvatar: "https://randomuser.me/api/portraits/men/42.jpg",
  date: "14 de Junho, 2024",
  series: "Paz Diária",
  bibleQuote: {
    text: "Deixo com vocês a paz. É a minha paz que eu lhes dou; não lhes dou a paz como o mundo a dá. Não fiquem aflitos nem tenham medo.",
    reference: "João 14:27"
  },
  content: [
    {
      type: "paragraph",
      text: "Em um mundo repleto de incertezas e desafios constantes, encontrar paz parece uma tarefa cada vez mais difícil. Vivemos em uma era de informações instantâneas, notificações incessantes e expectativas crescentes. Como podemos experimentar a verdadeira paz em meio a tanta agitação?"
    },
    {
      type: "paragraph",
      text: "A passagem de João 14:27 nos oferece uma perspectiva profunda. Jesus faz uma distinção crucial entre a paz que Ele oferece e a paz que o mundo proporciona. A paz do mundo é frequentemente temporária, superficial e dependente de circunstâncias favoráveis. Em contraste, a paz de Cristo é permanente, profunda e transcende qualquer situação."
    },
    {
      type: "heading",
      text: "A Natureza da Paz Divina"
    },
    {
      type: "paragraph",
      text: "A paz que Jesus oferece não é apenas a ausência de problemas, mas a presença de algo maior. É a certeza de que, independentemente das tempestades que enfrentamos, não estamos sozinhos. É a convicção de que há um propósito maior em nossa jornada, mesmo quando não conseguimos enxergá-lo claramente."
    },
    {
      type: "paragraph",
      text: "Quando Jesus diz \"Não fiquem aflitos nem tenham medo\", Ele reconhece nossa tendência natural à preocupação. No entanto, Ele nos convida a uma perspectiva diferente — uma que está ancorada em Sua presença constante e em Suas promessas eternas."
    },
    {
      type: "reflection",
      text: "Em quais áreas da sua vida você está buscando paz? Você tem procurado essa paz nas fontes certas? Como seria sua vida se você experimentasse plenamente a paz que Jesus oferece?"
    },
    {
      type: "heading",
      text: "Cultivando Paz em Tempos Difíceis"
    },
    {
      type: "paragraph",
      text: "Existem práticas espirituais que nos ajudam a experimentar a paz de Cristo em nosso dia a dia:"
    },
    {
      type: "list",
      items: [
        "Meditação nas Escrituras: Dedicar tempo para ler e refletir sobre a Palavra de Deus.",
        "Oração Constante: Manter um diálogo aberto com Deus, compartilhando nossas alegrias e preocupações.",
        "Gratidão: Reconhecer e agradecer pelas bênçãos em nossa vida, mesmo em meio às dificuldades.",
        "Comunhão: Participar de uma comunidade de fé que nos apoie e nos incentive."
      ]
    },
    {
      type: "paragraph",
      text: "A paz que Jesus oferece não nos isenta de problemas, mas nos capacita a enfrentá-los com uma perspectiva renovada. É uma paz que permanece mesmo quando tudo ao nosso redor parece desmoronar."
    }
  ],
  prayer: "Senhor, em meio às tempestades da vida, ajuda-me a experimentar Tua paz que excede todo entendimento. Que eu possa descansar na certeza do Teu amor e da Tua presença constante. Ensina-me a buscar a verdadeira paz que só Tu podes dar. Em nome de Jesus, amém.",
  nextDevotional: {
    id: "2",
    title: "Renovando sua Fé Diariamente"
  },
  prevDevotional: null,
  comments: [
    {
      id: "c1",
      user: "Maria Silva",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
      text: "Este devocional foi exatamente o que eu precisava hoje. Obrigada por compartilhar estas verdades tão profundas!",
      date: "14 de Junho, 2024",
      likes: 5
    },
    {
      id: "c2",
      user: "Roberto Santos",
      avatar: "https://randomuser.me/api/portraits/men/34.jpg",
      text: "A passagem de João 14:27 sempre me traz conforto em momentos difíceis. É bom lembrar que a paz de Jesus é diferente da paz do mundo.",
      date: "15 de Junho, 2024",
      likes: 3
    }
  ]
};

const DevotionalReader = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState("conteudo");
  
  // Simulação de carregamento de dados
  const [devotional, setDevotional] = useState(devotionalData);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simular carregamento de dados
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [id]);

  const getFontSizeClass = () => {
    switch (fontSize) {
      case "small": return "text-base";
      case "medium": return "text-lg";
      case "large": return "text-xl";
      default: return "text-lg";
    }
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removido dos favoritos" : "Adicionado aos favoritos",
      description: isFavorite ? "Este devocional foi removido da sua lista de favoritos." : "Este devocional foi adicionado à sua lista de favoritos.",
    });
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Marcador removido" : "Marcador adicionado",
      description: isBookmarked ? "O marcador foi removido deste devocional." : "Um marcador foi adicionado a este devocional.",
    });
  };

  const handleShare = () => {
    toast({
      title: "Compartilhado!",
      description: "Link para o devocional copiado para a área de transferência.",
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary/20"></div>
          <p className="mt-4 text-muted-foreground">Carregando devocional...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto px-4 py-6 md:py-8 max-w-3xl animate-fade-in">
          <div className="mb-6 flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              asChild
              className="mr-auto"
            >
              <Link to="/library">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar à Biblioteca
              </Link>
            </Button>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="text-muted-foreground hover:text-foreground"
              >
                {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
              
              <div className="relative group">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Type className="h-5 w-5" />
                </Button>
                <div className="absolute right-0 mt-2 z-50 bg-background border rounded-md shadow-md p-2 hidden group-hover:block">
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

          <div className="mb-2 text-sm text-muted-foreground">
            <span className="font-semibold">Série:</span> {devotional.series}
          </div>

          <h1 className="font-serif text-2xl font-bold md:text-3xl mb-4">
            {devotional.title}
          </h1>
          
          <div className="flex items-center gap-3 mb-8">
            <div className="flex-1 flex items-center">
              <img 
                src={devotional.authorAvatar} 
                alt={devotional.author}
                className="h-10 w-10 rounded-full mr-3"
              />
              <div>
                <div className="font-medium">{devotional.author}</div>
                <div className="text-sm text-muted-foreground">{devotional.date}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleFavorite}
                className="text-muted-foreground hover:text-foreground"
              >
                <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleBookmark}
                className="text-muted-foreground hover:text-foreground"
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
                className="text-muted-foreground hover:text-foreground"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <Tabs defaultValue="conteudo" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full mb-6">
              <TabsTrigger value="conteudo" className="flex-1">Conteúdo</TabsTrigger>
              <TabsTrigger value="comentarios" className="flex-1 relative">
                Comentários
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {devotional.comments.length}
                </span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="conteudo" className="mt-0">
              <div className="mb-8">
                <div className="bg-primary/10 p-4 rounded-lg mb-6 font-bible">
                  <p className="text-lg italic mb-2">
                    "{devotional.bibleQuote.text}"
                  </p>
                  <p className="text-right font-medium">
                    {devotional.bibleQuote.reference}
                  </p>
                </div>

                <div className={`prose prose-lg max-w-none ${getFontSizeClass()}`}>
                  {devotional.content.map((item, index) => {
                    switch (item.type) {
                      case "paragraph":
                        return <p key={index}>{item.text}</p>;
                      case "heading":
                        return <h2 key={index} className="text-xl font-bold mt-6 mb-3">{item.text}</h2>;
                      case "reflection":
                        return (
                          <div key={index} className="bg-accent/30 p-4 rounded-lg my-6">
                            <h3 className="font-bold mb-2">Reflexão</h3>
                            <p>{item.text}</p>
                          </div>
                        );
                      case "list":
                        return (
                          <ul key={index}>
                            {item.items.map((listItem, i) => (
                              <li key={i}><strong>{listItem.split(":")[0]}:</strong> {listItem.split(":")[1]}</li>
                            ))}
                          </ul>
                        );
                      default:
                        return null;
                    }
                  })}
                </div>
              </div>

              <div className="mb-12 border-t pt-6">
                <h3 className="text-xl font-bold mb-4">Oração do Dia</h3>
                <div className="bg-accent/20 p-4 rounded-lg font-bible">
                  <p className="italic">
                    "{devotional.prayer}"
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center border-t pt-6 pb-8">
                <Button 
                  variant="outline" 
                  disabled={!devotional.prevDevotional}
                  asChild={!!devotional.prevDevotional}
                >
                  {devotional.prevDevotional ? (
                    <Link to={`/devotional/${devotional.prevDevotional.id}`}>
                      <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
                    </Link>
                  ) : (
                    <>
                      <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
                    </>
                  )}
                </Button>
                
                <Button asChild>
                  <Link to="/library">
                    Ver todos
                  </Link>
                </Button>
                
                <Button 
                  asChild={!!devotional.nextDevotional}
                >
                  {devotional.nextDevotional ? (
                    <Link to={`/devotional/${devotional.nextDevotional.id}`}>
                      Próximo <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  ) : (
                    <>
                      Próximo <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="comentarios" className="mt-0">
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-4">Comentários ({devotional.comments.length})</h3>
                
                <div className="mb-6 rounded-lg border p-4">
                  <textarea 
                    className="w-full min-h-[100px] p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Compartilhe seus pensamentos sobre este devocional..."
                  />
                  <div className="mt-3 flex justify-end">
                    <Button>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Comentar
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {devotional.comments.map(comment => (
                    <div key={comment.id} className="rounded-lg border p-4">
                      <div className="flex items-start">
                        <img
                          src={comment.avatar}
                          alt={comment.user}
                          className="h-10 w-10 rounded-full mr-3"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{comment.user}</h4>
                            <span className="text-xs text-muted-foreground">{comment.date}</span>
                          </div>
                          <p className="mt-2">{comment.text}</p>
                          <div className="mt-3 flex items-center">
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <Heart className="mr-1 h-4 w-4" />
                              <span>{comment.likes}</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              Responder
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DevotionalReader;
