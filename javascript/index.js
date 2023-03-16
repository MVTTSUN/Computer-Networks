const socket = io();
const inputMessage = document.querySelector('#input-message');
const form = document.querySelector('#form-message');
const nameLabel = document.querySelector('#name');
const buttonSubmit = document.querySelector('#button-submit');
const allMessage = document.querySelector('#all-message');

const isEmptyMessage = () => {
  if (!inputMessage.value) {
    buttonSubmit.setAttribute('disabled', true);
  } else {
    buttonSubmit.removeAttribute('disabled');
  }
}

isEmptyMessage();

const userName = prompt('Ваше имя:');
nameLabel.textContent = `Ваше имя: ${userName}`;

inputMessage.addEventListener('input', () => {
  isEmptyMessage();
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if(inputMessage.value) {
    socket.emit('chat message', {
      message: inputMessage.value,
      name: userName
    })
    inputMessage.value = '';
  }
});

socket.on('chat message', ({ message, name }) => {
  allMessage.insertAdjacentHTML('afterBegin', `<p>${name}: ${message}</p>`);
})