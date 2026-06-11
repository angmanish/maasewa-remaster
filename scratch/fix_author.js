const fs = require('fs');
const path = 'src/lib/blogData.ts';
let data = fs.readFileSync(path, 'utf8');
data = data.replace(/author:\s*"[^"]+"/g, 'author: "Maasewa Medical Team"');
fs.writeFileSync(path, data);
console.log('Authors updated successfully.');
