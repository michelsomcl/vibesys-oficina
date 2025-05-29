
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  Users, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Car,
  Phone,
  MapPin,
  Calendar
} from "lucide-react"

const Clientes = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [clientType, setClientType] = useState("all")

  // Dados mock para demonstração
  const clientes = [
    {
      id: 1,
      tipo: "PF",
      nome: "João Silva",
      documento: "123.456.789-00",
      telefone: "(11) 98765-4321",
      endereco: "Rua das Flores, 123",
      aniversario: "15/06",
      veiculos: [
        { marca: "Honda", modelo: "Civic", ano: "2020", placa: "ABC-1234", km: "45000" }
      ]
    },
    {
      id: 2,
      tipo: "PJ",
      nome: "Auto Peças Ltda",
      documento: "12.345.678/0001-90",
      telefone: "(11) 91234-5678",
      endereco: "Av. Principal, 456",
      aniversario: "22/03",
      veiculos: [
        { marca: "Ford", modelo: "Transit", ano: "2019", placa: "XYZ-5678", km: "78000" }
      ]
    }
  ]

  const filteredClientes = clientes.filter(cliente => {
    const matchesSearch = cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cliente.documento.includes(searchTerm) ||
                         cliente.veiculos.some(v => v.placa.includes(searchTerm))
    
    const matchesType = clientType === "all" || cliente.tipo === clientType
    
    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Clientes</h1>
          <p className="text-muted-foreground">Gerencie seus clientes e veículos</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Novo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Cliente</DialogTitle>
            </DialogHeader>
            <ClientForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, CPF/CNPJ ou placa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={clientType} onValueChange={setClientType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Tipo de cliente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="PF">Pessoa Física</SelectItem>
                <SelectItem value="PJ">Pessoa Jurídica</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Clientes */}
      <div className="grid gap-6">
        {filteredClientes.map((cliente) => (
          <Card key={cliente.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-xl">{cliente.nome}</CardTitle>
                    <Badge variant={cliente.tipo === "PF" ? "default" : "secondary"}>
                      {cliente.tipo}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {cliente.documento}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      {cliente.telefone}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {cliente.aniversario}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {cliente.endereco}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <Car className="w-4 h-4" />
                  Veículos
                </h4>
                {cliente.veiculos.map((veiculo, index) => (
                  <div key={index} className="flex flex-wrap gap-4 p-3 bg-muted rounded-lg text-sm">
                    <span><strong>Marca:</strong> {veiculo.marca}</span>
                    <span><strong>Modelo:</strong> {veiculo.modelo}</span>
                    <span><strong>Ano:</strong> {veiculo.ano}</span>
                    <span><strong>Placa:</strong> {veiculo.placa}</span>
                    <span><strong>KM:</strong> {veiculo.km}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

const ClientForm = () => {
  return (
    <form className="space-y-6">
      <Tabs defaultValue="dados" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="dados">Dados Pessoais</TabsTrigger>
          <TabsTrigger value="veiculo">Veículo</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dados" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tipo">Tipo</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PF">Pessoa Física</SelectItem>
                  <SelectItem value="PJ">Pessoa Jurídica</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="nome">Nome</Label>
              <Input id="nome" placeholder="Nome completo" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="documento">CPF/CNPJ</Label>
              <Input id="documento" placeholder="000.000.000-00" />
            </div>
            <div>
              <Label htmlFor="telefone">Telefone</Label>
              <Input id="telefone" placeholder="(11) 99999-9999" />
            </div>
          </div>
          
          <div>
            <Label htmlFor="endereco">Endereço</Label>
            <Input id="endereco" placeholder="Endereço completo" />
          </div>
          
          <div>
            <Label htmlFor="aniversario">Data de Aniversário</Label>
            <Input id="aniversario" placeholder="DD/MM" />
          </div>
        </TabsContent>
        
        <TabsContent value="veiculo" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="marca">Marca</Label>
              <Input id="marca" placeholder="Ex: Honda" />
            </div>
            <div>
              <Label htmlFor="modelo">Modelo</Label>
              <Input id="modelo" placeholder="Ex: Civic" />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="ano">Ano</Label>
              <Input id="ano" placeholder="2020" />
            </div>
            <div>
              <Label htmlFor="placa">Placa</Label>
              <Input id="placa" placeholder="ABC-1234" />
            </div>
            <div>
              <Label htmlFor="km">Quilometragem</Label>
              <Input id="km" placeholder="50000" />
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancelar</Button>
        <Button className="bg-primary hover:bg-primary/90">Salvar</Button>
      </div>
    </form>
  )
}

export default Clientes
