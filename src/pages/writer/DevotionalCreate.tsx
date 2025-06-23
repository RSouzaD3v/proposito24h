import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, Eye, ArrowLeft, Plus, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { set } from "date-fns";

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
  bookId?: string;
}

const WriterDevotionalCreate = () => {
  const { id } = useParams();
  const [bookTitle, setBookTitle] = useState("");
  const [description, setDescription] = useState("");
  const [verseGuide, setVerseGuide] = useState("");
  const [category, setCategory] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [bookPrice, setBookPrice] = useState("");
  const [readingTime, setReadingTime] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("EASY");
  const [mode, setMode] = useState("SKETCH");
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);


  const [pages, setPages] = useState<Page[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState<Page>({
    id: "",
    title: "",
    introText: "",
    mainVerse: "",
    textVerse: "",
    verseGuide: "",
    referenceDay: 1,
    contentMain: "",
    practicalApplication: "",
    prayer: "",
    pageOrder: 1
  });

  useEffect(() => {
    const fetchBook = async () => {
      if (!id || id === "new") return;

      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${import.meta.env.VITE_API_URL}/devocional/get/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) throw new Error("Erro ao buscar o livro");

        const data = await res.json();
        setBookTitle(data.title);
        setDescription(data.description);
        setVerseGuide(data.verseGuide || "");
        setCategory(data.category);
        setAuthorName(data.authorName);
        setBookPrice(data.bookPrice.toString());
        setReadingTime(data.readingTime.toString());
        setDifficultyLevel(data.difficultyLevel);
        setMode(data.mode);
        setPages(data.pages || []);
        if (data.pages?.length > 0) {
          setCurrentPage(data.pages[0]);
          setCurrentPageIndex(0);
        }

      } catch (err) {
        console.error("Erro ao carregar livro:", err);
      }
    };

    fetchBook();
  }, [id]);

  const addNewPage = () => {
    const newPage: Page = {
      id: Date.now().toString(),
      title: "",
      introText: "",
      mainVerse: "",
      textVerse: "",
      verseGuide: "",
      referenceDay: pages.length + 1,
      contentMain: "",
      practicalApplication: "",
      prayer: "",
      pageOrder: pages.length + 1
    };

    setPages([...pages, newPage]);
    setCurrentPageIndex(pages.length);
    setCurrentPage(newPage);
  };

  const updateCurrentPage = (field: string, value: string | number) => {
    const updatedPage = { ...currentPage, [field]: value };
    setCurrentPage(updatedPage);

    const updatedPages = [...pages];
    updatedPages[currentPageIndex] = updatedPage;
    setPages(updatedPages);
  };

  const deletePage = (index: number) => {
    const updatedPages = pages.filter((_, i) => i !== index);
    setPages(updatedPages);

    if (currentPageIndex >= updatedPages.length && updatedPages.length > 0) {
      setCurrentPageIndex(updatedPages.length - 1);
      setCurrentPage(updatedPages[updatedPages.length - 1]);
    } else if (updatedPages.length === 0) {
      setCurrentPageIndex(0);
      setCurrentPage({
        id: "",
        title: "",
        introText: "",
        mainVerse: "",
        textVerse: "",
        verseGuide: "",
        referenceDay: 1,
        contentMain: "",
        practicalApplication: "",
        prayer: "",
        pageOrder: 1
      });
    }
  };

  const navigateToPage = (index: number) => {
    if (index >= 0 && index < pages.length) {
      setCurrentPageIndex(index);
      setCurrentPage(pages[index]);
    }
  };

  const saveBook = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token de autenticação não encontrado.");
      const formData = new FormData();

      const payload = {
        title: bookTitle,
        description,
        verseGuide,
        category,
        authorName,
        bookPrice: parseFloat(bookPrice),
        readingTime: parseInt(readingTime, 10),
        difficultyLevel,
        mode,
        pages,
      };

      formData.append("data", JSON.stringify(payload));
      if (coverImage) formData.append("coverImage", coverImage);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/devocional/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) throw new Error("Erro ao salvar o livro");

      const data = await response.json();
      console.log("Livro salvo com sucesso:", data);

    } catch (error) {
      console.error("Erro ao salvar o livro: ", error);
    }
  };


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/writer/devotionals">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Criador de Livro</h1>
            <p className="text-muted-foreground">
              Crie ou edite seu livro página por página
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to={`/writer/devotionals/${id || 'new'}/preview`}>
              <Eye className="mr-2 h-4 w-4" />
              Visualizar
            </Link>
          </Button>
          <Button onClick={saveBook}>
            <Save className="mr-2 h-4 w-4" />
            Salvar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="book-info" className="space-y-6">
        <TabsList>
          <TabsTrigger value="book-info">Informações do Livro</TabsTrigger>
          <TabsTrigger value="pages">Páginas ({pages.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="book-info" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações do Livro</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="bookTitle">Título do Livro</Label>
                      <Input
                        id="bookTitle"
                        placeholder="Digite o título do livro"
                        value={bookTitle}
                        onChange={(e) => setBookTitle(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="authorName">Nome do Autor</Label>
                      <Input
                        id="authorName"
                        placeholder="Nome do autor"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      placeholder="Descrição do livro"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="verseGuide">Versículo Guia</Label>
                      <Input
                        id="verseGuide"
                        placeholder="Ex: João 3:16"
                        value={verseGuide}
                        onChange={(e) => setVerseGuide(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">Categoria</Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fe">Fé</SelectItem>
                          <SelectItem value="oracao">Oração</SelectItem>
                          <SelectItem value="amor">Amor</SelectItem>
                          <SelectItem value="esperanca">Esperança</SelectItem>
                          <SelectItem value="graca">Graça</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="bookPrice">Preço (R$)</Label>
                      <Input
                        id="bookPrice"
                        type="number"
                        placeholder="0.00"
                        step="0.01"
                        value={bookPrice}
                        onChange={(e) => setBookPrice(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="readingTime">Tempo de Leitura (minutos)</Label>
                      <Input
                        id="readingTime"
                        type="number"
                        placeholder="5"
                        min="1"
                        max="60"
                        value={readingTime}
                        onChange={(e) => setReadingTime(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select value={mode} onValueChange={setMode}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SKETCH">Rascunho</SelectItem>
                        <SelectItem value="PUBLISHED">Publicado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Dificuldade</Label>
                    <Select value={difficultyLevel} onValueChange={setDifficultyLevel}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EASY">Fácil</SelectItem>
                        <SelectItem value="MEDIUM">Médio</SelectItem>
                        <SelectItem value="HARD">Difícil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Imagem de Capa</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">Prévia da imagem</p>
                    </div>
                    <Input
                      id="coverImage"
                      type="file"
                      accept="image/*"
                      className="w-full"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setCoverImage(file);
                          setCoverImagePreview(URL.createObjectURL(file));
                        }
                      }}
                    />

                    {coverImagePreview && (
                      <img
                      src={coverImagePreview}
                      alt="Prévia da capa"
                      className="mt-2 rounded-md object-cover w-full aspect-video"
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pages" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold">Páginas do Livro</h2>
              {pages.length > 0 && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateToPage(currentPageIndex - 1)}
                    disabled={currentPageIndex === 0}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Página {currentPageIndex + 1} de {pages.length}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateToPage(currentPageIndex + 1)}
                    disabled={currentPageIndex === pages.length - 1}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              {pages.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deletePage(currentPageIndex)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
              <Button onClick={addNewPage}>
                <Plus className="mr-2 h-4 w-4" />
                Nova Página
              </Button>
            </div>
          </div>

          {pages.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center h-64">
                <p className="text-muted-foreground mb-4">Nenhuma página criada ainda</p>
                <Button onClick={addNewPage}>
                  <Plus className="mr-2 h-4 w-4" />
                  Criar Primeira Página
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Informações da Página</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pageTitle">Título da Página</Label>
                      <Input
                        id="pageTitle"
                        placeholder="Título da página"
                        value={currentPage.title}
                        onChange={(e) => updateCurrentPage("title", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="referenceDay">Dia de Referência</Label>
                      <Input
                        id="referenceDay"
                        type="number"
                        placeholder="1"
                        value={currentPage.referenceDay}
                        onChange={(e) => updateCurrentPage("referenceDay", parseInt(e.target.value) || 1)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="introText">Texto Introdutório</Label>
                    <Textarea
                      id="introText"
                      placeholder="Texto de introdução para a página"
                      value={currentPage.introText}
                      onChange={(e) => updateCurrentPage("introText", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="mainVerse">Versículo Principal</Label>
                      <Input
                        id="mainVerse"
                        placeholder="Ex: João 3:16"
                        value={currentPage.mainVerse}
                        onChange={(e) => updateCurrentPage("mainVerse", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="verseGuidePage">Versículo Guia</Label>
                      <Input
                        id="verseGuidePage"
                        placeholder="Versículo guia"
                        value={currentPage.verseGuide}
                        onChange={(e) => updateCurrentPage("verseGuide", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="textVerse">Texto do Versículo</Label>
                    <Textarea
                      id="textVerse"
                      placeholder="Texto completo do versículo"
                      value={currentPage.textVerse}
                      onChange={(e) => updateCurrentPage("textVerse", e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Conteúdo da Página</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contentMain">Conteúdo Principal</Label>
                    <Textarea
                      id="contentMain"
                      placeholder="Conteúdo principal da página"
                      className="min-h-[120px]"
                      value={currentPage.contentMain}
                      onChange={(e) => updateCurrentPage("contentMain", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="practicalApplication">Aplicação Prática</Label>
                    <Textarea
                      id="practicalApplication"
                      placeholder="Como aplicar essa lição no dia a dia"
                      className="min-h-[80px]"
                      value={currentPage.practicalApplication}
                      onChange={(e) => updateCurrentPage("practicalApplication", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="prayer">Oração</Label>
                    <Textarea
                      id="prayer"
                      placeholder="Oração para encerrar a página"
                      className="min-h-[80px]"
                      value={currentPage.prayer}
                      onChange={(e) => updateCurrentPage("prayer", e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WriterDevotionalCreate;
