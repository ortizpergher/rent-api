# rent-api

# Requisitos Funcionais **RF**
# Requisitos não Funcionais **RNF**
# Regra de negócio **RN**

# Cadastro de carros
**RF**
Deve ser possível cadastrar um novo carro.
Deve ser possível listar todas as categories.

**RN**
A placa do carro deve ser uníca.
Não é possível alterar a placa do carro já cadastrados.
Por padrão a disponibilidade do carro deve serhabilitada.
Apenas usuários administradores podem cadastrar carros.
# Listagem de carros
**RF**
Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
Deve ser possível listar todos os carros disponíveis pelo nome da marca.
Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RN**
Listagem de carros não precisa estar logado no sistema.

# Cadastro de especificação no carro
**RF**
Deve ser possível cadastrar uma especificação para um carro.
Deve ser possível listar todas as especifiações.
Deve ser possível listar todos os carros.
Apenas usuários administradores podem cadastrar especificação.

**RN**
Não deve ser possível uma especificação se o carro não existe.
Não deve ser possível cadastrar uma especifícação já existente para o mesmo carro.


# Cadastro de imagens do carro
**RF**
Deve ser possível adicionar imagens para o carro.
Deve ser possível listar todos os carros.
Apenas usuários administradores podem adicionar imagens.

**RNF**
Utilizar o multer para upload dos arquivos.

**RN**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.

# Aluguel de carro

**RF**
Deve ser possível cadastrar um aluguel

**RN**
O aluguel deve ter duração mínima de 24 horas.
Não deve ser possível cadastra um novo aluguel caso já exista um aberto para mesmo usuário.
Não deve ser possível cadastra um novo aluguel caso já exista um aberto para mesmo carro.