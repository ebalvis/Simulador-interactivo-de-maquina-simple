; Uso de LOAD/STORE con memoria
; Almacena valores, los recupera y opera
LOADI R0, 100
STORE R0, 0
LOADI R0, 200
STORE R0, 1
LOAD R1, 0
LOAD R2, 1
ADD R3, R1, R2
OUT R3
HALT
