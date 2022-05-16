const openFormBtn = document.querySelector('.add-book-btn');
const closeFormBtn = document.querySelector('.close-form-btn');
const form = document.querySelector('form');
const submitBtn = document.querySelector('#submit-btn');
const bookContainer = document.querySelector('.books-cointainer');
let books = [];

function Book(bookTitle, bookAuthor, bookPages, read) {
    this.bookTitle = bookTitle;
    this.bookAuthor = bookAuthor;
    this.bookPages = bookPages;
    this.read = read;
}

openFormBtn.addEventListener('click', () => {
    form.style.display = 'block';
});

closeFormBtn.addEventListener('click', () => {
    form.style.display = 'none';
});

function addBook() {
   
    submitBtn.addEventListener('click', () => {
        const bookTitleText = document.querySelector('#book-title').value;
        const bookAuthorText = document.querySelector('#book-author').value;
        const bookPagesText = document.querySelector('#book-pages').value;
        const selectedOption = document.querySelector('#haveRead');

        if (bookTitleText && bookAuthorText && bookPagesText) {
            const answer = selectedOption.options[selectedOption.selectedIndex].text;
            const newBook = new Book(bookTitleText, bookAuthorText, bookPagesText, answer);
            books.push(newBook);
        } else {
            console.log(bookTitleText)
            alert('Faltam Informações');
        }
        clearScreen(); //Update page and show books on screen when a book is addes
        showBooksOnScreen();
        form.style.display = 'none';
        const clearInputs = document.querySelectorAll('input');
        clearInputs.forEach(texts => texts.value = '');
    });
}


function clearScreen() {
    const booksDiv = document.querySelectorAll('.book');
    if (booksDiv) {
        booksDiv.forEach(book => {
            book.remove();
        })
    } else {
        alert('No books')
    }
}

function showBooksOnScreen() {
    books.forEach((book, index) => {
        const bookDiv = document.createElement('div');
        const bookTitleText = document.createElement('p');
        const bookAuthorText = document.createElement('p');
        const bookPagesText = document.createElement('p');
        const bookReadText = document.createElement('p');
        const removeBookBtn = document.createElement('span');
        const removeBookBtnIcons = document.createElement('i');

        bookDiv.classList.add('book');
        bookTitleText.classList.add('book-name');
        bookAuthorText.classList.add('book-author-name');
        bookPagesText.classList.add('book-pages');
        bookReadText.classList.add('haveReadBook');
        removeBookBtn.classList.add('remove-book-btn');
        removeBookBtnIcons.classList.add('fa-solid', 'fa-trash');

        removeBookBtn.dataset.id = index;

        bookTitleText.innerText = book.bookTitle;
        bookAuthorText.innerText = book.bookAuthor;
        bookPagesText.innerText = `${book.bookPages} Pages`;
        bookReadText.innerText = `Have you read it? ${book.read}`;

        bookContainer.append(bookDiv);
        bookDiv.append(bookTitleText);
        bookDiv.append(bookAuthorText);
        bookDiv.append(bookPagesText);
        bookDiv.append(bookReadText);
        bookDiv.append(removeBookBtn);
        removeBookBtn.append(removeBookBtnIcons);
    });
    deleteBook();
}
function deleteBook() {
    const removeBookBtn = document.querySelectorAll('.remove-book-btn');
    removeBookBtn.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            books.splice(btn.dataset.id, 1);
            clearScreen();
            showBooksOnScreen();   
        });
    });
}



addBook();