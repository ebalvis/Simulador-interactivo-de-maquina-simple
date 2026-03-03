; Factorial de 5
; Resultado esperado: 120
LOADI R0, 5
LOADI R1, 1
LOADI R3, 1
; Bucle
CMP R0, R3
JZ 10
MUL R1, R1, R0
SUB R0, R0, R3
JMP 4
; Resultado
OUT R1
HALT
