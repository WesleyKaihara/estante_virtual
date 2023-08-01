<<<<<<< HEAD
# Virtual bookshelf (Estante Virtual)
=======
# Virtual bookshelf Estante Virtual
>>>>>>> 3fcd992 (Fixed tests and added userRepository Suite test)

O sistema deve ser capaz de cadastrar os dados de um usuário para que ele possa ser acessado posteriormente pelo usuário. O sistema deve ser capaz de permitir o cadastro de livros, os livros podem ser separados por categorias, onde posso cadastrar um livro que estou lendo, que quero ler (lista de desejos) e dos livros que eu já concluí a leitura. É interessante que também tenha uma página de quem somos, para identificar o objetivo geral do site solicitado. Há, já estava me esquecendo, o sistema é de uso pessoal.

## Suite tests:

### UserService
- [x] should throw an exception if email, full name or password attributes are not provided
- [x] should throw an exception when attempting to register a user with an existing email
- [x] should throw an exception when attempting to register a user with an existing name
- [x] should throw an exception when password is not strong enough
- [x] should not throw an exception when password is safe

<<<<<<< HEAD
=======
### UserRepository
- [x] should be return a user by id correctly
- [x] should be return empty Array when user not found
- [x] should throw an exception when fetching users with an invalid field

>>>>>>> 3fcd992 (Fixed tests and added userRepository Suite test)
### BookService
- [x] should receive the start and end date of the reading if the reading status for 'Complete Reading'
- [x] should throw an exception if dont't receive the start date of reading or don't receive the end date for the status 'Complete Reading'
- [x] should receive the start date of reading and should not receive the end date for the status 'Reading in progress'
- [x] should receive the start date of reading and should not receive the end date for the status 'Reading in progress'
- [x] should throw an exception if receive the start date of reading and receive the end date for the status 'Reading in progress'
- [x] should't receive the start date and end date for the status 'Reading interest

### BookRepository
- [x] should be return a filtered books by User correctly
- [x] should be return a book registered by the user correctly
