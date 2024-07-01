document.addEventListener('DOMContentLoaded', () => {
  const bookForm = document.getElementById('book-form');
  const libraryDiv = document.querySelector('.library'); // 修改此处

  let myLibrary = [];

  function Book(title, author, pages, read) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.read = read;
  }

  Book.prototype.toggleRead = function() {
      this.read = !this.read;
  };

  function addBookToLibrary(book) {
      myLibrary.push(book);
      renderLibrary();
  }

  function renderLibrary() {
      libraryDiv.innerHTML = '';
      myLibrary.forEach((book, index) => {
          const bookDiv = document.createElement('div');
          bookDiv.classList.add('book');

          const bookInfo = document.createElement('div');
          bookInfo.classList.add('book-info');
          bookInfo.innerHTML = `
              <p><strong>Title:</strong> ${book.title}</p>
              <p><strong>Author:</strong> ${book.author}</p>
              <p><strong>Pages:</strong> ${book.pages}</p>
              <p><strong>Read:</strong> ${book.read ? 'Yes' : 'No'}</p>
          `;

          const bookActions = document.createElement('div');
          bookActions.classList.add('book-actions');

          const toggleReadBtn = document.createElement('button');
          toggleReadBtn.classList.add('toggle-read');
          toggleReadBtn.textContent = 'Toggle Read';
          toggleReadBtn.addEventListener('click', () => {
              book.toggleRead();
              renderLibrary();
          });

          const removeBtn = document.createElement('button');
          removeBtn.classList.add('remove');
          removeBtn.textContent = 'Remove';
          removeBtn.addEventListener('click', () => {
              myLibrary.splice(index, 1);
              renderLibrary();
          });

          bookActions.appendChild(toggleReadBtn);
          bookActions.appendChild(removeBtn);

          bookDiv.appendChild(bookInfo);
          bookDiv.appendChild(bookActions);

          libraryDiv.appendChild(bookDiv);
      });
  }

  bookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;
      const pages = document.getElementById('pages').value;
      const read = document.getElementById('read').checked;

      const newBook = new Book(title, author, pages, read);
      addBookToLibrary(newBook);

      bookForm.reset();
  });
});
