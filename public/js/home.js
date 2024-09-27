const date = new Date()
const month = date.toLocaleString('default', { month: 'long' });
const monthHeader = document.querySelector('.month');
monthHeader.prepend(month + `'s `)

