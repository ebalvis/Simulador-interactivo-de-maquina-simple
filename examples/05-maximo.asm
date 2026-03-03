; Maximo de dos numeros
; Resultado esperado: 42
LOADI R0, 27
LOADI R1, 42
CMP R0, R1
JG 6
; R1 es mayor o igual
OUT R1
JMP 7
; R0 es mayor
OUT R0
HALT
