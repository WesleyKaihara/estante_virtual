# Estante Virtual

O sistema deve ser capaz de cadastrar os dados de um usuário para que ele possa ser acessado posteriormente pelo usuário. O sistema deve ser capaz de permitir o cadastro de livros, os livros podem ser separados por categorias, onde posso cadastrar um livro que estou lendo, que quero ler (lista de desejos) e dos livros que eu já concluí a leitura. É interessante que também tenha uma página de quem somos, para identificar o objetivo geral do site solicitado. Há, já estava me esquecendo, o sistema é de uso pessoal.

## Suite tests:

### Users
- should throw an exception if email, full name or password attributes are not provided
- should throw an exception when attempting to register a user with an existing email
- should throw an exception when attempting to register a user with an existing name
- should throw an exception when password is not strong enough
- should not throw an exception when password is safe

### Books
- should be allow filters by category
- should return the status of "Reading in progress", "Finished reading" and "Reading interest"
- should receive the start and end date of the reading if the reading status for "Complete Reading"
- should receive the start date of reading and should not receive the end date for the status "Reading in progress"
