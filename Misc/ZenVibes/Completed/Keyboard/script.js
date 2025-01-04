const keys = document.querySelectorAll('.key');

document.addEventListener('keydown', function(event) {
  // Prevent default action for Tab, Alt, and Arrow keys
  if (event.code === 'Tab' || event.code.startsWith('Arrow') || event.code.startsWith('Alt')) {
    event.preventDefault();
  }

  const keyElement = document.querySelector(`button[data-key="${event.code}"]`);
  if (keyElement) {
    keyElement.classList.add('active');
  }
});

document.addEventListener('keyup', function(event) {
  const keyElement = document.querySelector(`button[data-key="${event.code}"]`);
  if (keyElement) {
    keyElement.classList.remove('active');
  }
});
