; Cuenta atras desde 10
; Resultado esperado: 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0
LOADI R0, 10
LOADI R1, 1
LOADI R2, 0
; Bucle
OUT R0
CMP R0, R2
JZ 10
SUB R0, R0, R1
JMP 4
; Fin
HALT
