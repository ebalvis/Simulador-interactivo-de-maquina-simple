# ISA - Set de Instrucciones

## Resumen de opcodes

| Opcode | Hex  | Instruccion | Categoria |
|--------|------|-------------|-----------|
| 0x00   | 00   | NOP         | Control   |
| 0x01   | 01   | LOAD        | Datos     |
| 0x02   | 02   | STORE       | Datos     |
| 0x03   | 03   | ADD         | Aritmetica|
| 0x04   | 04   | SUB         | Aritmetica|
| 0x05   | 05   | MUL         | Aritmetica|
| 0x06   | 06   | DIV         | Aritmetica|
| 0x07   | 07   | AND         | Logica    |
| 0x08   | 08   | OR          | Logica    |
| 0x09   | 09   | NOT         | Logica    |
| 0x0A   | 0A   | CMP         | Comparacion|
| 0x0B   | 0B   | JMP         | Salto     |
| 0x0C   | 0C   | JZ          | Salto     |
| 0x0D   | 0D   | JNZ         | Salto     |
| 0x0E   | 0E   | JG          | Salto     |
| 0x0F   | 0F   | JL          | Salto     |
| 0x10   | 10   | LOADI       | Datos     |
| 0x11   | 11   | IN          | E/S       |
| 0x12   | 12   | OUT         | E/S       |
| 0x1F   | 1F   | HALT        | Control   |

## Detalle por instruccion

### NOP (0x00)
- **Formato**: `NOP`
- **Operacion**: Ninguna. Avanza PC.
- **Flags**: No modifica

### LOADI (0x10)
- **Formato**: `LOADI Rx, valor`
- **Operacion**: Rx <- valor
- **Flags**: No modifica

### LOAD (0x01)
- **Formato**: `LOAD Rx, direccion`
- **Operacion**: Rx <- MEM[direccion]
- **Flags**: No modifica

### STORE (0x02)
- **Formato**: `STORE Rx, direccion`
- **Operacion**: MEM[direccion] <- Rx
- **Flags**: No modifica

### ADD (0x03)
- **Formato**: `ADD Rx, Ry, Rz`
- **Operacion**: Rx <- Ry + Rz
- **Flags**: No modifica

### SUB (0x04)
- **Formato**: `SUB Rx, Ry, Rz`
- **Operacion**: Rx <- Ry - Rz
- **Flags**: No modifica

### MUL (0x05)
- **Formato**: `MUL Rx, Ry, Rz`
- **Operacion**: Rx <- Ry * Rz
- **Flags**: No modifica

### DIV (0x06)
- **Formato**: `DIV Rx, Ry, Rz`
- **Operacion**: Rx <- Ry / Rz (division entera). Si Rz=0, Rx=0.
- **Flags**: No modifica

### AND (0x07)
- **Formato**: `AND Rx, Ry, Rz`
- **Operacion**: Rx <- Ry AND Rz (bit a bit)
- **Flags**: No modifica

### OR (0x08)
- **Formato**: `OR Rx, Ry, Rz`
- **Operacion**: Rx <- Ry OR Rz (bit a bit)
- **Flags**: No modifica

### NOT (0x09)
- **Formato**: `NOT Rx, Ry`
- **Operacion**: Rx <- NOT Ry (complemento a 1)
- **Flags**: No modifica

### CMP (0x0A)
- **Formato**: `CMP Rx, Ry`
- **Operacion**: Compara Rx con Ry
- **Flags**: Z=1 si Rx==Ry; N=1 si Rx<Ry

### JMP (0x0B)
- **Formato**: `JMP direccion`
- **Operacion**: PC <- direccion
- **Flags**: No modifica

### JZ (0x0C)
- **Formato**: `JZ direccion`
- **Operacion**: Si Z=1 entonces PC <- direccion
- **Flags**: No modifica

### JNZ (0x0D)
- **Formato**: `JNZ direccion`
- **Operacion**: Si Z=0 entonces PC <- direccion
- **Flags**: No modifica

### JG (0x0E)
- **Formato**: `JG direccion`
- **Operacion**: Si N=0 y Z=0 entonces PC <- direccion
- **Flags**: No modifica

### JL (0x0F)
- **Formato**: `JL direccion`
- **Operacion**: Si N=1 entonces PC <- direccion
- **Flags**: No modifica

### IN (0x11)
- **Formato**: `IN Rx`
- **Operacion**: Rx <- valor de la cola de entrada (0 si vacia)
- **Flags**: No modifica

### OUT (0x12)
- **Formato**: `OUT Rx`
- **Operacion**: Escribe Rx en el buffer de salida
- **Flags**: No modifica

### HALT (0x1F)
- **Formato**: `HALT`
- **Operacion**: Detiene la ejecucion
- **Flags**: No modifica
