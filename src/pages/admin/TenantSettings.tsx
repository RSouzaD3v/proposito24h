
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Palette, Globe, Image, Type, Check, RefreshCw } from "lucide-react";

const TenantSettings = () => {
  const { toast } = useToast();
  const [logoPreview, setLogoPreview] = useState("/placeholder.svg");
  const [faviconPreview, setFaviconPreview] = useState("/favicon.ico");
  const [primaryColor, setPrimaryColor] = useState("#0F766E");
  const [secondaryColor, setSecondaryColor] = useState("#33C3F0");
  const [accentColor, setAccentColor] = useState("#ECFEFF");

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setLogoPreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFaviconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setFaviconPreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAppearance = () => {
    toast({
      title: "Aparência salva",
      description: "As configurações de aparência foram atualizadas com sucesso.",
    });
  };

  const handleSaveDomain = () => {
    toast({
      title: "Configurações de domínio salvas",
      description: "As configurações de domínio foram atualizadas com sucesso.",
    });
  };

  const handleSaveFeatures = () => {
    toast({
      title: "Funcionalidades atualizadas",
      description: "As configurações de funcionalidades foram atualizadas com sucesso.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configurações do Tenant</h1>
        <p className="text-muted-foreground">
          Personalize a aparência e configurações do tenant.
        </p>
      </div>

      <Tabs defaultValue="appearance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="appearance">Aparência</TabsTrigger>
          <TabsTrigger value="domain">Domínio</TabsTrigger>
          <TabsTrigger value="texts">Textos</TabsTrigger>
          <TabsTrigger value="features">Funcionalidades</TabsTrigger>
        </TabsList>
        
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Identidade Visual</CardTitle>
              <CardDescription>
                Personalize a aparência do tenant para refletir a identidade da sua marca.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="logo">Logo</Label>
                    <div className="mt-2 flex items-center gap-4">
                      <img 
                        src={logoPreview} 
                        alt="Logo Preview" 
                        className="h-16 w-16 rounded-md object-contain border" 
                      />
                      <div className="flex-1">
                        <Input 
                          id="logo" 
                          type="file" 
                          accept="image/*" 
                          onChange={handleLogoChange}
                        />
                        <p className="mt-1 text-xs text-muted-foreground">
                          Recomendado: 200x200px, formato PNG ou SVG
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="favicon">Favicon</Label>
                    <div className="mt-2 flex items-center gap-4">
                      <img 
                        src={faviconPreview} 
                        alt="Favicon Preview" 
                        className="h-8 w-8 rounded-md object-contain border" 
                      />
                      <div className="flex-1">
                        <Input 
                          id="favicon" 
                          type="file" 
                          accept="image/x-icon,image/png" 
                          onChange={handleFaviconChange}
                        />
                        <p className="mt-1 text-xs text-muted-foreground">
                          Recomendado: 32x32px, formato ICO ou PNG
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="appName">Nome da Aplicação</Label>
                    <Input 
                      id="appName" 
                      defaultValue="Devocionais Diários" 
                      placeholder="Devocionais Diários" 
                      className="mt-2"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      Nome que aparecerá no título do navegador e em várias partes da aplicação.
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="appDescription">Descrição da Aplicação</Label>
                    <Input 
                      id="appDescription" 
                      defaultValue="Sua dose diária de inspiração espiritual" 
                      placeholder="Descrição curta da aplicação" 
                      className="mt-2"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      Descrição curta usada em metadados e SEO.
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <Label>Cores</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <div 
                        className="h-6 w-6 rounded border" 
                        style={{ backgroundColor: primaryColor }}
                      ></div>
                      <Label htmlFor="primaryColor">Cor Primária</Label>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Input 
                        id="primaryColor" 
                        type="color" 
                        value={primaryColor} 
                        onChange={(e) => setPrimaryColor(e.target.value)} 
                        className="w-10 h-10 p-1"
                      />
                      <Input 
                        value={primaryColor} 
                        onChange={(e) => setPrimaryColor(e.target.value)} 
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <div 
                        className="h-6 w-6 rounded border" 
                        style={{ backgroundColor: secondaryColor }}
                      ></div>
                      <Label htmlFor="secondaryColor">Cor Secundária</Label>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Input 
                        id="secondaryColor" 
                        type="color" 
                        value={secondaryColor} 
                        onChange={(e) => setSecondaryColor(e.target.value)} 
                        className="w-10 h-10 p-1"
                      />
                      <Input 
                        value={secondaryColor} 
                        onChange={(e) => setSecondaryColor(e.target.value)} 
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <div 
                        className="h-6 w-6 rounded border" 
                        style={{ backgroundColor: accentColor }}
                      ></div>
                      <Label htmlFor="accentColor">Cor de Destaque</Label>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Input 
                        id="accentColor" 
                        type="color" 
                        value={accentColor} 
                        onChange={(e) => setAccentColor(e.target.value)} 
                        className="w-10 h-10 p-1"
                      />
                      <Input 
                        value={accentColor} 
                        onChange={(e) => setAccentColor(e.target.value)} 
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <Label>Tipografia</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label htmlFor="headingFont">Fonte para Títulos</Label>
                    <Select defaultValue="playfair">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Selecione uma fonte" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="playfair">Playfair Display</SelectItem>
                        <SelectItem value="merriweather">Merriweather</SelectItem>
                        <SelectItem value="roboto">Roboto Slab</SelectItem>
                        <SelectItem value="lora">Lora</SelectItem>
                        <SelectItem value="montserrat">Montserrat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="bodyFont">Fonte para Corpo de Texto</Label>
                    <Select defaultValue="inter">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Selecione uma fonte" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inter">Inter</SelectItem>
                        <SelectItem value="roboto">Roboto</SelectItem>
                        <SelectItem value="openSans">Open Sans</SelectItem>
                        <SelectItem value="lato">Lato</SelectItem>
                        <SelectItem value="nunito">Nunito</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <Label>Prévia</Label>
                <div className="mt-2 border rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <img 
                      src={logoPreview} 
                      alt="Logo" 
                      className="h-8 w-8 rounded-md object-contain" 
                    />
                    <span className="font-serif text-xl font-bold" style={{ color: primaryColor }}>
                      Devocionais Diários
                    </span>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-serif text-xl font-bold" style={{ color: primaryColor }}>
                      Título do Devocional
                    </h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu
                      tincidunt consectetur, nisi nunc ultricies nisi.
                    </p>
                    <div className="flex gap-2">
                      <Button style={{ backgroundColor: primaryColor, color: "white" }}>
                        Botão Primário
                      </Button>
                      <Button variant="outline" style={{ borderColor: primaryColor, color: primaryColor }}>
                        Botão Secundário
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Restaurar Padrões</Button>
              <Button onClick={handleSaveAppearance}>
                <Check className="mr-2 h-4 w-4" />
                Salvar Alterações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="domain" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Domínio</CardTitle>
              <CardDescription>
                Configure o domínio personalizado para sua instância.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currentDomain">Domínio Atual</Label>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">devocionais-tenant.exemplo.com.br</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="customDomain">Domínio Personalizado</Label>
                <Input 
                  id="customDomain" 
                  placeholder="devocionais.suaigreja.com.br" 
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Insira o domínio personalizado sem 'https://' ou 'www.'.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Instruções de DNS</h3>
                <div className="bg-muted p-4 rounded-md">
                  <p className="text-sm mb-2">Para conectar seu domínio, adicione o seguinte registro DNS:</p>
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="font-medium">Tipo</div>
                      <div className="font-medium">Nome</div>
                      <div className="font-medium">Valor</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm pb-2 border-b">
                      <div>CNAME</div>
                      <div>@</div>
                      <div>tenant-proxy.devocionais.com.br</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>CNAME</div>
                      <div>www</div>
                      <div>tenant-proxy.devocionais.com.br</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Status da Verificação</h3>
                <div className="p-4 rounded-md bg-yellow-50 border border-yellow-200">
                  <div className="flex items-center">
                    <RefreshCw className="h-4 w-4 text-yellow-700 mr-2 animate-spin" />
                    <span className="text-sm text-yellow-700">Verificação pendente</span>
                  </div>
                  <p className="text-xs text-yellow-600 mt-1">
                    Aguardando propagação de DNS. Isso pode levar até 48 horas.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch id="ssl" defaultChecked />
                  <Label htmlFor="ssl">Certificado SSL</Label>
                </div>
                <p className="text-xs text-muted-foreground ml-6">
                  Gerar automaticamente um certificado SSL para o domínio personalizado.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancelar</Button>
              <Button onClick={handleSaveDomain}>
                <Check className="mr-2 h-4 w-4" />
                Salvar Configurações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="texts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Textos e Traduções</CardTitle>
              <CardDescription>
                Personalize os textos da plataforma.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center bg-muted/20 rounded-md">
                <p className="text-sm text-muted-foreground">Editor de Textos (em desenvolvimento)</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Feature Flags</CardTitle>
              <CardDescription>
                Ative ou desative funcionalidades específicas da plataforma.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b">
                  <div>
                    <h3 className="text-sm font-medium">Sistema de Quiz</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Permite a criação e participação em quizzes relacionados aos devocionais.
                    </p>
                  </div>
                  <Switch id="quiz-feature" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between pb-4 border-b">
                  <div>
                    <h3 className="text-sm font-medium">Comunidade e Comentários</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Permite que usuários comentem em devocionais e interajam entre si.
                    </p>
                  </div>
                  <Switch id="community-feature" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between pb-4 border-b">
                  <div>
                    <h3 className="text-sm font-medium">Anotações Pessoais</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Permite que usuários criem e gerenciem anotações pessoais durante a leitura.
                    </p>
                  </div>
                  <Switch id="notes-feature" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between pb-4 border-b">
                  <div>
                    <h3 className="text-sm font-medium">Planos de Leitura Bíblica</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Habilita a funcionalidade de planos de leitura bíblica estruturados.
                    </p>
                  </div>
                  <Switch id="reading-plans-feature" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between pb-4 border-b">
                  <div>
                    <h3 className="text-sm font-medium">Assinaturas Premium</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Ativa o sistema de assinaturas premium e conteúdo exclusivo.
                    </p>
                  </div>
                  <Switch id="premium-feature" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Áudios dos Devocionais</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Permite a inclusão e reprodução de versões em áudio dos devocionais.
                    </p>
                  </div>
                  <Switch id="audio-feature" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Restaurar Padrões</Button>
              <Button onClick={handleSaveFeatures}>
                <Check className="mr-2 h-4 w-4" />
                Salvar Configurações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TenantSettings;
