# Arquitectura de la Maquina Simple

## Diagrama general

```
+------------------------------------------+
|                   CPU                    |
|                                          |
|  +----------+  +--------+  +---------+  |
|  | Registros|  |  ALU   |  | Unidad  |  |
|  | R0..R3   |--|+-%*/&| |--| Control |  |
|  +----------+  +--------+  +----+----+  |
|       |             |            |       |
|  +----+-------------+------------+---+   |
|  |            Bus interno            |   |
|  +----+-------------+--------+-------+   |
|       |             |        |           |
|  +----+----+  +-----+----+  +----+---+  |
|  |   PC    |  |  Flags   |  |  E/S   |  |
|  +----+----+  +----------+  +--------+  |
+----|-----------------------------+-------+
     |                             |
+----+-----------------------------+-------+
|              Memoria (64 celdas)         |
+------------------------------------------+
```

## Registros

| Registro | Tamano | Descripcion |
|----------|--------|-------------|
| R0 | Entero | Proposito general |
| R1 | Entero | Proposito general |
| R2 | Entero | Proposito general |
| R3 | Entero | Proposito general |
| PC | Entero (0-63) | Contador de programa |
| Z | 1 bit | Flag Zero |
| N | 1 bit | Flag Negativo |

## Memoria

- 64 celdas direccionables (0x00 a 0x3F)
- Cada celda almacena un entero
- Acceso mediante instrucciones LOAD y STORE

## Ciclo de instruccion

1. **Fetch**: Leer instruccion en programa[PC]
2. **Decode**: Decodificar opcode y operandos
3. **Execute**: Ejecutar la operacion en la ALU
4. **Writeback**: Almacenar resultado en registro/memoria
5. **Update PC**: Incrementar PC o aplicar salto

## Codificacion de instrucciones

Cada instruccion se representa como un objeto con:
- `opcode`: Codigo de operacion (0x00-0x1F)
- `args`: Array de argumentos (registros, valores inmediatos, direcciones)
- `line`: Numero de linea en el codigo fuente
- `src`: Texto original de la linea

## Flags

Los flags se actualizan unicamente con la instruccion CMP:
- **Z (Zero)**: Se activa si los operandos son iguales
- **N (Negativo)**: Se activa si el primer operando es menor que el segundo
