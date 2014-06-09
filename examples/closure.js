(let add
  (lambda (x)
    (lambda (y)
      (+ x y))))


(let makeCounter
  (lambda (n)
    (lambda ()
      (set! n (+ n 1))
      n)))

(let count (makeCounter 0))

(print (count))
(print (count))
(print (count))
(print (count))
(print (count))