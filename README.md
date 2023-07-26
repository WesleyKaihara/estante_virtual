# Estante Virtual

O sistema deve ser capaz de cadastrar os dados de um usuário para que ele possa ser acessado posteriormente pelo usuário. O sistema deve ser capaz de permitir o cadastro de livros, os livros podem ser separados por categorias, onde posso cadastrar um livro que estou lendo, que quero ler (lista de desejos) e dos livros que eu já concluí a leitura. É interessante que também tenha uma página de quem somos, para identificar o objetivo geral do site solicitado. Há, já estava me esquecendo, o sistema é de uso pessoal.

## Suite tests:

### Users
- should't allow the registration of two users with the same email
- should be allow only safe passwords
- should receive email, full name and password information

### Books
- should be allow filters by category
- should return the status of "Reading in progress", "Finished reading" and "Reading interest"
- should receive the start and end date of the reading if the reading status for "Complete Reading"
- should receive the start date of reading and should not receive the end date for the status "Reading in progress"

