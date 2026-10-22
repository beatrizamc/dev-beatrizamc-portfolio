const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const themeToggleBtn = document.getElementById('theme-toggle');

const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'light') {
  document.body.classList.add('light-mode');
  themeToggleBtn.textContent = '☼';
} else {
  themeToggleBtn.textContent = '☾';
}

themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  themeToggleBtn.textContent = isLight ? '☼' : '☾';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const { name, email, message } = form.elements;

  if (!name.value.trim() || !/^\S+@\S+\.\S+$/.test(email.value) || !message.value.trim()) {
    formStatus.textContent = 'Preencha nome, e-mail válido e mensagem.';
    formStatus.style.color = '#dc2626';
    return;
  }

  formStatus.textContent = 'Enviando...';
  formStatus.style.color = '#9ca3af';

  try {
    const response = await fetch('https://formspree.io/f/xeaajndv', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        message: message.value
      })
    });

    if (response.ok) {
      formStatus.textContent = 'Mensagem enviada! Obrigada pelo contato.';
      formStatus.style.color = '#15803d';
      form.reset();
    } else {
      throw new Error('Falha no envio');
    }
  } catch (err) {
    formStatus.textContent = 'Não foi possível enviar. Tente novamente ou escreva direto para o e-mail acima.';
    formStatus.style.color = '#dc2626';
  }
});