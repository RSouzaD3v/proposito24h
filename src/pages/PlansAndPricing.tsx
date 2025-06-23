
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const planFeatures = {
  free: [
    "Acesso a devocionais básicos",
    "2 planos de leitura",
    "Anotações limitadas",
    "Aplicativo móvel"
  ],
  premium: [
    "Acesso completo à biblioteca de devocionais",
    "Todos os planos de leitura",
    "Anotações ilimitadas",
    "Aplicativo móvel",
    "Conteúdo offline",
    "Sem anúncios",
    "Quizzes e desafios bíblicos",
    "Suporte prioritário"
  ],
  family: [
    "Todos os benefícios Premium",
    "Até 5 perfis de usuário",
    "Controles parentais",
    "Compartilhamento de anotações",
    "Desafios em grupo",
    "Planos de leitura em família",
    "Suporte premium 24/7"
  ],
};

type BillingInterval = "monthly" | "yearly";
type PlanTier = "free" | "premium" | "family";

const PlansAndPricing = () => {
  const [billingInterval, setBillingInterval] = useState<BillingInterval>("monthly");
  const { toast } = useToast();

  const handlePlanSelect = (plan: PlanTier) => {
    if (plan === "free") {
      toast({
        title: "Plano Gratuito Selecionado",
        description: "Você será redirecionado para a página de cadastro.",
      });
    } else {
      toast({
        title: `Plano ${plan === "premium" ? "Premium" : "Família"} Selecionado`,
        description: `Você será redirecionado para o checkout (${billingInterval === "monthly" ? "mensal" : "anual"}).`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b">
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

      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Planos e Preços</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Escolha o plano perfeito para fortalecer sua jornada espiritual e aprofundar seu relacionamento com Deus.
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <Tabs
              defaultValue="monthly"
              value={billingInterval}
              onValueChange={(value) => setBillingInterval(value as BillingInterval)}
              className="w-full max-w-md"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="monthly">Mensal</TabsTrigger>
                <TabsTrigger value="yearly">
                  Anual <span className="ml-1.5 rounded-full bg-success/20 px-2 py-0.5 text-xs font-medium text-success">20% OFF</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Plano Gratuito */}
            <div className="border rounded-lg overflow-hidden bg-card">
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Básico</h3>
                <p className="text-muted-foreground mb-4">Perfeito para iniciantes</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">R$ 0</span>
                  <span className="text-muted-foreground">/para sempre</span>
                </div>
                <Button 
                  onClick={() => handlePlanSelect("free")} 
                  className="w-full" 
                  variant="outline"
                >
                  Começar Grátis
                </Button>
              </div>
              <div className="border-t p-6">
                <h4 className="font-semibold mb-4">O que está incluído:</h4>
                <ul className="space-y-3">
                  {planFeatures.free.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Plano Premium */}
            <div className="border rounded-lg overflow-hidden bg-card relative">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-sm font-medium rounded-bl-lg">
                Popular
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Premium</h3>
                <p className="text-muted-foreground mb-4">Para crescimento espiritual contínuo</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    {billingInterval === "monthly" ? "R$ 19,90" : "R$ 191,04"}
                  </span>
                  <span className="text-muted-foreground">
                    /{billingInterval === "monthly" ? "mês" : "ano"}
                  </span>
                </div>
                <Button 
                  onClick={() => handlePlanSelect("premium")} 
                  className="w-full"
                >
                  Escolher Premium
                </Button>
              </div>
              <div className="border-t p-6">
                <h4 className="font-semibold mb-4">O que está incluído:</h4>
                <ul className="space-y-3">
                  {planFeatures.premium.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Plano Família */}
            <div className="border rounded-lg overflow-hidden bg-card">
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Família</h3>
                <p className="text-muted-foreground mb-4">Ideal para toda a família</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    {billingInterval === "monthly" ? "R$ 34,90" : "R$ 335,04"}
                  </span>
                  <span className="text-muted-foreground">
                    /{billingInterval === "monthly" ? "mês" : "ano"}
                  </span>
                </div>
                <Button 
                  onClick={() => handlePlanSelect("family")} 
                  className="w-full"
                >
                  Escolher Família
                </Button>
              </div>
              <div className="border-t p-6">
                <h4 className="font-semibold mb-4">O que está incluído:</h4>
                <ul className="space-y-3">
                  {planFeatures.family.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Perguntas Frequentes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Como funciona a cobrança?</h3>
                <p className="text-muted-foreground">
                  A cobrança é feita automaticamente na data de assinatura. Você pode cancelar a qualquer momento antes da próxima renovação.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Posso mudar de plano?</h3>
                <p className="text-muted-foreground">
                  Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As mudanças entram em vigor imediatamente.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Existe período de teste?</h3>
                <p className="text-muted-foreground">
                  Sim! Oferecemos 7 dias de teste gratuito para os planos Premium e Família. Você pode cancelar a qualquer momento durante esse período.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Como funciona o plano Família?</h3>
                <p className="text-muted-foreground">
                  O plano Família permite até 5 perfis de usuário, cada um com suas próprias preferências, anotações e progresso.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Posso cancelar a qualquer momento?</h3>
                <p className="text-muted-foreground">
                  Sim! Você pode cancelar sua assinatura a qualquer momento através da sua conta. O acesso continua até o final do período pago.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Qual forma de pagamento é aceita?</h3>
                <p className="text-muted-foreground">
                  Aceitamos cartões de crédito, débito, PayPal e, para planos anuais, também oferecemos opção de boleto bancário.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Ainda tem dúvidas?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Nossa equipe está pronta para ajudar. Entre em contato conosco e responderemos todas as suas perguntas.
            </p>
            <Button variant="outline" size="lg">
              Fale Conosco
            </Button>
          </div>
        </div>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 Devocionais. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default PlansAndPricing;
