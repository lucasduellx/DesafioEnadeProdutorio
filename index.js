const express = require('express');
const app = express();

app.use(express.json());

function Iterative(m, n) {
  let result = 1;
  
  for (let i = m; i <= n; i++) {
    result *= (i+1/i);
  }
  
  return result;
}

function Recursive(m, n,result = 1) {
  result *= (m+1/m);
  m +=1;	
  
  if (m > n) return result;
 
  return Recursive(m,n,result);
}

app.post('/produtorio', (req, res) => {
  const { m, n, method } = req.body;
  
  let result;
  
  if (method === 'iterative') {
    result = Iterative(m, n);
  } else if (method === 'recursive') {
    result = Recursive(m, n);
  } else {
    return res.status(400).json({ error: 'Invalid method' });
  }
  return res.json({ result });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});