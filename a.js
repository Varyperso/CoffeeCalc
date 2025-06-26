function recSum(n) {
  if (n === 1) return 1
  
  let a = recSum(n - 1)
  console.log(n);
  return n + a
}

console.log(recSum(10));