
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  UserCheck, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Phone,
  MapPin,
  Wrench,
  Paintbrush,
  Droplets
} from "lucide-react"

const Funcionarios = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Dados mock para demonstração
  const funcionarios = [
    {
      id: 1,
      nome: "Carlos Mecânico",
      documento: "123.456.789-00",
      telefone: "(11) 98765-4321",
      endereco: "Rua dos Trabalhadores, 123",
      categoria: "Mecânico"
    },
    {
      id: 2,
      nome: "Ana Pintora",
      documento: "987.654.321-00",
      telefone: "(11) 91234-5678",
      endereco: "Av. das Cores, 456",
      categoria: "Pintor"
    },
    {
      id: 3,
      nome: "José Lavador",
      documento: "456.789.123-00",
      telefone: "(11) 95555-0000",
      endereco: "Rua da Limpeza, 789",
      categoria: "Lavador"
    }
  ]

  const getCategoryColor = (categoria: string) => {
    switch (categoria) {
      case "Mecânico":
        return "bg-primary text-primary-foreground"
      case "Pintor":
        return "bg-secondary text-secondary-foreground"
      case "Lavador":
        return "bg-accent text-accent-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getCategoryIcon = (categoria: string) => {
    switch (categoria) {
      case "Mecânico":
        return <Wrench className="w-4 h-4" />
      case "Pintor":
        return <Paintbrush className="w-4 h-4" />
      case "Lavador":
        return <Droplets className="w-4 h-4" />
      default:
        return <UserCheck className="w-4 h-4" />
    }
  }

  const filteredFuncionarios = funcionarios.filter(funcionario => {
    const matchesSearch = funcionario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         funcionario.documento.includes(searchTerm)
    
    const matchesCategory = categoryFilter === "all" || funcionario.categoria === categoryFilter
    
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Funcionários</h1>
          <p className="text-muted-foreground">Gerencie sua equipe de trabalho</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Novo Funcionário
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Funcionário</DialogTitle>
            </DialogHeader>
            <FuncionarioForm />
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
                  placeholder="Buscar por nome ou CPF..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="Mecânico">Mecânico</SelectItem>
                <SelectItem value="Pintor">Pintor</SelectItem>
                <SelectItem value="Lavador">Lavador</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Funcionários */}
      <div className="grid gap-6">
        {filteredFuncionarios.map((funcionario) => (
          <Card key={funcionario.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-xl">{funcionario.nome}</CardTitle>
                    <Badge className={getCategoryColor(funcionario.categoria)}>
                      <div className="flex items-center gap-1">
                        {getCategoryIcon(funcionario.categoria)}
                        {funcionario.categoria}
                      </div>
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <UserCheck className="w-4 h-4" />
                      {funcionario.documento}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      {funcionario.telefone}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {funcionario.endereco}
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
          </Card>
        ))}
      </div>
    </div>
  )
}

const FuncionarioForm = () => {
  return (
    <form className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nome">Nome Completo</Label>
          <Input id="nome" placeholder="Nome do funcionário" />
        </div>
        <div>
          <Label htmlFor="categoria">Categoria</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Mecânico">Mecânico</SelectItem>
              <SelectItem value="Pintor">Pintor</SelectItem>
              <SelectItem value="Lavador">Lavador</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="documento">CPF</Label>
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
      
      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancelar</Button>
        <Button className="bg-primary hover:bg-primary/90">Salvar</Button>
      </div>
    </form>
  )
}

export default Funcionarios
