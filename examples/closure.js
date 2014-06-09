(let add
  (lambda (x)
    (lambda (y)
      (+ x y))))

(print (+ "4 plus 5 is " ((add 4) 5)))

(let makeCounter
  (lambda ()
    (let n 0)
    (lambda ()
      (set! n (+ n 1))
      n)))

(let count (makeCounter))

(print (count))
(print (count))
(print (count))
(print (count))
(print (count))