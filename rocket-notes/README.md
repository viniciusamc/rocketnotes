#Anotações

### src - server.js
Importação e modularização de frameworks

app.use(routes) é o middleware 

express.json() pro express ler em JSON

Execução do banco de dados + verificação se tiver a tabela

## Routes - Index.js
Cria a rota /users

## Routes - users.routes.js
.post - Método Criar | Parâmetro | Função usada no parâmetro

.put - Método Editar | Parâmetro | Função usada no parâmetro

## Controllers - UsersController.js
AppError - 

bcrypt.js - API para criptografar senhas

hash - criptografa | compare - faz o esquema para trocar a senha

Função assíncrona, pega no body(POST) as informações de name, email, password

1° Verificação de email - verifica se já tem o email
2° Criptografa a senha
3° Registra no banco de dados
4° retorna com o status.json

----------update---------
Pega name, email, password, oldpassword no body
pega o id no banco de dados

1° seleciona o usuário no banco de dados
2° verifica se o email já existe
3° se o email e o id do email 


senha
compare a oldPassword com a user.password
verifica a senha, se for a mesma que a antiga criptografa e troca, se não aparece um erro

seta o name e o email, se o usuario não trocou coloca o valor padrão deles, user.name

coloca tudo no banco de dados, a hora é DATETIME('now') e retorna um status
<<<<<<< HEAD

---------JWT--------- 
TOKEN JSON PARA TROCAR 
INFORMAÇÕES

separado por pontos
ASDOIJFAOSIFJ1231. eypaisdufhdasiofhbasio32.woifjopasdjnfpasj

1° Ponto - Header - Algorítimo e tipo do token
2° Ponto - Payload - Conteúdo do Token(Geralmente é só o ID)
3° Ponto - Verify signature - Garante o token

NPM INSTALL JSONWEBTOKEN
=======
>>>>>>> 941d4b71669c2e59cc31cb8e8c9923ce5fc2e23a
