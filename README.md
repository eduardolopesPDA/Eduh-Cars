# 🚗 Sistema de Gestão de Estoque de Veículos

Uma API REST robusta, de nível intermediário/acadêmico, desenvolvida para otimizar o gerenciamento de inventário de veículos em concessionárias e agências automotivas. Este projeto resolve ineficiências operacionais — como dados desatualizados, informações fragmentadas e erros de digitação manual — utilizando uma arquitetura limpa em camadas, validações estritas de domínio e padrões de projeto baseados em Programação Orientada a Objetos (POO).

---

## 📌 Contexto e Problema
Nos fluxos de trabalho tradicionais de concessionárias, o controle de estoque por meio de planilhas ou papel causa uma grande assimetria de informações entre a equipe de vendas e a administração. Essa latência frequentemente resulta em venda em duplicidade de veículos, preços desatualizados e insatisfação dos clientes.

Este sistema fornece um repositório centralizado que rastreia os veículos juntamente com suas taxonomias estruturais (**Marcas** e **Modelos**), garantindo a integridade dos dados, o monitoramento de disponibilidade em tempo real e consultas de alta performance.

---

## 🛠️ Stack Tecnológica e Infraestrutura
* **Linguagem:** Java 17+ (Tipagem estática forte e suporte robusto a POO)
* **Framework:** Spring Boot 3.x
  * *Spring Web:* Roteamento RESTful, controllers e serialização JSON.
  * *Spring Data JPA:* Mapeamento Objeto-Relacional (ORM) e abstração automatizada de banco de dados.
* **Banco de Dados:** MySQL / H2 Database (Configuração em memória inclusa para testes rápidos).
* **Arquitetura:** Padrão em Camadas (Controller ➔ Service ➔ Repository ➔ Model).

---

## 📂 Arquitetura do Projeto e Pacotes
O projeto segue estritamente uma estrutura de pacotes em camadas altamente coesa e com baixo acoplamento:

```text
📁 src/main/java/com/concessionaria/estoque
│
├── 📁 controller      # RestControllers que expõem os Endpoints HTTP (Camada de API)
│   └── VeiculoController.java
│
├── 📁 service         # Lógica de Negócio, Regras de Domínio e Validações
│   └── VeiculoService.java
│
├── 📁 repository      # Objetos de Acesso a Dados que herdam de JpaRepository (Persistência)
│   └── VeiculoRepository.java
│
└── 📁 model           # Entidades de Domínio e Mapeamentos JPA (Entities & Enums)
    ├── Veiculo.java
    ├── Marca.java
    ├── Modelo.java
    └── StatusVeiculo.java (Enum: DISPONIVEL, VENDIDO)
