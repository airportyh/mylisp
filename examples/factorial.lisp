(let factorial
  (lambda (x)
    (if (= x 0)
      1
      (* (factorial (- x 1)) x))))

(print (factorial 1))
(print (factorial 2))
(print (factorial 3))
(print (factorial 4))
(print (factorial 10))