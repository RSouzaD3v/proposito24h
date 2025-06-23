import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, BookOpen, Clock, Target } from "lucide-react";

interface Page {
  id: string;
  title: string;
  introText: string;
  mainVerse: string;
  textVerse: string;
  verseGuide: string;
  referenceDay: number;
  contentMain: string;
  practicalApplication: string;
  prayer: string;
  pageOrder: number;
}

interface Book {
  id: string;
  title: string;
  description: string;
  verseGuide: string;
  category: string;
  authorName: string;
  bookPrice: number;
  readingTime: number;
  difficultyLevel: string;
  mode: string;
  pages: Page[];
}

// const bookMock: Book = {
//   id: "1",
//   title: "Encontrando Paz nas Tempestades da Vida",
//   description: "Um livro devocional que ajuda a encontrar tranquilidade mesmo em momentos difíceis.",
//   verseGuide: "Salmos 23:4",
//   category: "Paz Interior",
//   authorName: "Autor Exemplo",
//   bookPrice: 29.90,
//   readingTime: 21,
//   difficultyLevel: "EASY",
//   mode: "SKETCH",
//   pages: [
//     {
//       id: "1",
//       title: "O Vale da Sombra da Morte",
//       introText: "Mesmo quando atravessamos os momentos mais difíceis da vida, podemos encontrar paz e segurança na presença de Deus.",
//       mainVerse: "Salmos 23:4",
//       textVerse: "Ainda que eu ande pelo vale da sombra da morte, não temerei mal nenhum, porque tu estás comigo; a tua vara e o teu cajado me consolam.",
//       verseGuide: "Salmos 23:4",
//       referenceDay: 1,
//       contentMain: "A vida é cheia de vales escuros e tempestades inesperadas. Há momentos em que nos sentimos perdidos, assustados e sozinhos. O salmista Davi conhecia bem esses sentimentos. Como pastor, ele havia enfrentado leões e ursos para proteger suas ovelhas. Como rei, enfrentou inimigos e traições. Mas em meio a todas essas dificuldades, ele aprendeu uma verdade fundamental: Deus está sempre conosco.\n\nO 'vale da sombra da morte' representa todos os momentos difíceis que enfrentamos: doenças, perdas, decepções, medos e incertezas. Mas note que o versículo não diz 'se' eu andar pelo vale, mas 'ainda que' - reconhecendo que todos passaremos por dificuldades. A diferença está em como atravessamos esses vales.",
//       practicalApplication: "Hoje, identifique uma área da sua vida onde você está enfrentando dificuldades. Em vez de focar no problema, pratique reconhecer a presença de Deus nessa situação. Anote três maneiras específicas de como você pode confiar em Deus nesta circunstância.",
//       prayer: "Senhor, obrigado porque mesmo nos momentos mais difíceis da minha vida, Tu estás comigo. Ajuda-me a não temer, mas a confiar na Tua presença constante. Que eu possa sentir o Teu consolo e direção em cada passo do meu caminho. Em nome de Jesus, amém.",
//       pageOrder: 1
//     },
//     {
//       id: "2", 
//       title: "A Vara e o Cajado do Pastor",
//       introText: "Os instrumentos do pastor representam a proteção e direção que Deus oferece em nossa jornada.",
//       mainVerse: "Salmos 23:4",
//       textVerse: "a tua vara e o teu cajado me consolam.",
//       verseGuide: "Salmos 23:4",
//       referenceDay: 2,
//       contentMain: "A vara e o cajado eram ferramentas essenciais de um pastor. A vara era usada para defender as ovelhas de predadores, enquanto o cajado servia para guiar e resgatar ovelhas que se perdiam ou caíam em buracos. Essas imagens nos falam do cuidado detalhado que Deus tem por nós.\n\nA vara representa a proteção divina. Assim como o pastor protegia suas ovelhas dos lobos, Deus nos protege dos perigos espirituais e físicos. O cajado simboliza a direção suave mas firme de Deus em nossas vidas. Quando nos desviamos do caminho certo, Ele nos puxa de volta com amor.",
//       practicalApplication: "Reflita sobre uma situação recente onde você sentiu a proteção ou direção de Deus. Como você pode ser mais sensível à Sua orientação em suas decisões diárias? Pratique pausar antes de decisões importantes para buscar a direção divina.",
//       prayer: "Pai celestial, obrigado por me proteger e me guiar como um pastor cuida de suas ovelhas. Ajuda-me a reconhecer Tua vara de proteção e Teu cajado de direção em minha vida. Torna-me mais sensível à Tua voz e mais obediente à Tua orientação. Amém.",
//       pageOrder: 2
//     }
//   ]
// };

const WriterDevotionalPreview = () => {
  const { id } = useParams<{ id: string }>();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [book, setBook] = useState<Book | null>(null);

  const currentPage = book?.pages?.[currentPageIndex];

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token de autenticação não encontrado.");

        const response = await fetch(`${import.meta.env.VITE_API_URL}/devocional/get/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        });
        if (!response.ok) {
          throw new Error("Erro ao buscar o livro");
        }
        const data = await response.json();
        setBook(data);
        setCurrentPageIndex(0);
      } catch (error) {
        console.error("Erro ao buscar o livro:", error);
      }
    };

    if (id) fetchBook();
  }, [id]);

  const nextPage = () => {
    if (book && currentPageIndex < book.pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const prevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const getDifficultyText = (level: string) => {
    switch (level) {
      case "EASY": return "Fácil";
      case "MEDIUM": return "Intermediário";
      case "HARD": return "Avançado";
      default: return level;
    }
  };

  if (!book) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span>Carregando...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to={`/writer/devotionals/${id}/edit`}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{book.title}</h1>
              <p className="text-muted-foreground">Visualização do Livro</p>
            </div>
          </div>
          <Badge variant={book.mode === "PUBLISHED" ? "default" : "outline"}>
            {book.mode === "PUBLISHED" ? "Publicado" : "Rascunho"}
          </Badge>
        </div>

        {/* Book Info */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <span className="text-sm">Categoria: {book.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm">{book.readingTime} min de leitura</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                <span className="text-sm">{getDifficultyText(book.difficultyLevel)}</span>
              </div>
            </div>
            <p className="text-muted-foreground">{book.description}</p>
            {book.verseGuide && (
              <p className="text-sm italic text-primary mt-2">"{book.verseGuide}"</p>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            onClick={prevPage}
            disabled={currentPageIndex === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Anterior
          </Button>
          
          <span className="text-sm text-muted-foreground">
            Página {currentPageIndex + 1} de {book.pages.length}
          </span>
          
          <Button
            variant="outline"
            onClick={nextPage}
            disabled={currentPageIndex === book.pages.length - 1}
          >
            Próxima
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {/* Current Page Content */}
        {currentPage && (
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">
                    Dia {currentPage.referenceDay}: {currentPage.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none p-6">
                {/* Intro Text */}
                {currentPage.introText && (
                  <div className="mb-6">
                    <p className="text-lg text-muted-foreground italic">
                      {currentPage.introText}
                    </p>
                  </div>
                )}

                {/* Main Verse */}
                {currentPage.textVerse && (
                  <div className="bg-primary/5 border-l-4 border-primary p-4 mb-6">
                    <p className="text-lg font-medium mb-2">"{currentPage.textVerse}"</p>
                    <p className="text-sm text-primary font-semibold">
                      {currentPage.mainVerse}
                    </p>
                  </div>
                )}

                {/* Main Content */}
                {currentPage.contentMain && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">Reflexão</h3>
                    <div className="whitespace-pre-line text-gray-700">
                      {currentPage.contentMain}
                    </div>
                  </div>
                )}

                {/* Practical Application */}
                {currentPage.practicalApplication && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">Aplicação Prática</h3>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-gray-700">
                        {currentPage.practicalApplication}
                      </p>
                    </div>
                  </div>
                )}

                {/* Prayer */}
                {currentPage.prayer && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">Oração</h3>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <p className="text-gray-700 italic">
                        {currentPage.prayer}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Page Indicator */}
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            {book.pages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPageIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentPageIndex
                    ? "bg-primary"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriterDevotionalPreview;
