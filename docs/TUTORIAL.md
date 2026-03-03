# Tutorial: Primeros pasos

## 1. Tu primer programa

Abre `index.html` en el navegador. Veras el editor de ensamblador con un programa de ejemplo cargado.

Borra el contenido y escribe:

```asm
LOADI R0, 7
OUT R0
HALT
```

Este programa:
1. Carga el valor 7 en el registro R0
2. Muestra el valor de R0 en la salida
3. Detiene la ejecucion

Pulsa **Ensamblar** y luego **Paso** tres veces para ver como se ejecuta instruccion a instruccion.

## 2. Operaciones aritmeticas

```asm
LOADI R0, 10
LOADI R1, 3
ADD R2, R0, R1
SUB R3, R0, R1
OUT R2
OUT R3
HALT
```

Observa como los registros R2 y R3 toman los valores 13 y 7.

## 3. Tu primer bucle

```asm
LOADI R0, 5
LOADI R1, 1
LOADI R2, 0
; Bucle (instruccion 4)
OUT R0
CMP R0, R2
JZ 9
SUB R0, R0, R1
JMP 4
; Fin (instruccion 9)
HALT
```

Este programa cuenta de 5 a 0. Observa:
- `CMP R0, R2` compara R0 con 0
- `JZ 9` salta a la instruccion 9 (HALT) si son iguales
- `JMP 4` vuelve al inicio del bucle

**Importante**: Las direcciones de salto son numeros de instruccion, no de linea.
Para calcularlas, cuenta solo las instrucciones (ignora comentarios y lineas vacias).

## 4. Usar la memoria

```asm
LOADI R0, 42
STORE R0, 0
LOADI R0, 0
LOAD R1, 0
OUT R1
HALT
```

1. Almacena 42 en la celda de memoria 0
2. Borra R0 (para demostrar que el valor esta en memoria)
3. Carga el valor de la celda 0 en R1
4. Muestra R1 (deberia ser 42)

## 5. Consejos

- Usa **Paso** para depurar programas
- Observa los **LEDs** para ver que registros y celdas se modifican
- Los **flags Z y N** solo cambian con la instruccion CMP
- Las direcciones de salto empiezan en 0
- Si el programa no termina, usa **Pausar** y **Reset**
