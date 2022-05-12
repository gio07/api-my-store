const bcrypt = require('bcrypt');

async function verifyPassword() {
  const myPassword = 'admin 123 .202';
  const hash = '$2b$10$XsRM1QwgnxTo.XvNiWnLdOpxELnEPFP9b.067FD3g6NXULIwKBs8C';
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

verifyPassword();
