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

## 📂 Arquitetura do Projeto, Pacotes, Requisitos e instruções
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

## 📋 Requisitos do Sistema e Funcionalidades

### 🔹 Requisitos Funcionais (RF)
* **RF01 – Persistência de Veículos:** CRUD completo para registrar modelo, marca, ano, cor, preço e quilometragem.
* **RF02 – Separação Taxonômica:** Cadastro independente para Marcas (Fabricantes) e Modelos para eliminar a redundância de dados.
* **RF03 – Consultas com Filtros Dinâmicos:** Busca multiparamétrica (filtrar por marca, modelo, teto de preço máximo, ano ou disponibilidade).
* **RF04 – Mutabilidade de Campos:** Atualização segura de dados comerciais voláteis (ajustes de preço, alteração de status de disponibilidade e progressão de quilometragem).
* **RF05 – Expurgar Registros:** Remoção física de instâncias de veículos do banco de dados através de identificadores primários únicos (ID).

### 🔹 Requisitos Não Funcionais (RNF)
* **RNF01 – Baixa Latência em Consultas:** Acesso indexado ao banco de dados para retornar dados filtrados de forma eficiente, mesmo sob alta concorrência.
* **RNF02 – Restrições Sanitárias de Domínio:** Camada de negócio com barreiras estritas que rejeitam entradas corrompidas (ex: valores negativos para preço ou quilometragem).
* **RNF03 – Alinhamento com o Protocolo REST:** Payloads JSON unificados e semânticos, integrados aos códigos de status HTTP corretos (200 OK, 201 Created, 204 No Content, 400 Bad Request).

---

## 🧬 Princípios de Orientação a Objetos Aplicados
* **Abstração e Modelagem:** Transposição de entidades do mundo real da concessionária em definições lógicas de software.
* **Encapsulamento:** As variáveis de classe são explicitamente marcadas como `private`. A modificação e leitura dos estados dos objetos são governadas por métodos assessores públicos (Getters/Setters), prevenindo estados inválidos no domínio.
* **Herança de Interface:** A camada de repositório estende `JpaRepository`, herdando operações padronizadas de banco de dados nativamente, sem inflar o código fonte.

---

## 🚀 Como Começar e Configuração

### Pré-requisitos
* Java Development Kit (JDK) 17 ou superior instalado.
* Visual Studio Code com o **Extension Pack for Java** e o **Spring Boot Extension Pack** ativados.

### Ambiente de Banco de Dados (`application.properties`)
Para testar a aplicação imediatamente sem configurações externas, configure o seu arquivo `src/main/resources/application.properties` para utilizar uma instância automatizada do H2 em memória:

```properties
spring.application.name=estoque
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.h2.console.enabled=true
spring.jpa.hibernate.ddl-auto=update



Checklist de Endpoints da API
Com a aplicação rodando, você pode testar a API no endereço http://localhost:8080/veiculos utilizando o Thunder Client, Postman ou rodando a aplicação com a interface pelo seu navegador:

Método	Endpoint	Descrição
POST	/veiculos	Registra um novo veículo no estoque
GET	/veiculos	Lista todos os veículos ou aceita parâmetros de busca (?marca=...&precoMax=...)
PUT	/veiculos/{id}	Atualiza preço, quilometragem ou status de disponibilidade
DELETE	/veiculos/{id}	Remove permanentemente um veículo do banco de dados pelo seu ID único
