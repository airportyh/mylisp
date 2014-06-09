(let sq
  (lambda (x) (* x x)))

(print "The square of 2 is" (sq 2))

(let hello
  (lambda (name)
    (print "Hello," name "!")))

(hello "world")