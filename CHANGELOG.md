# Changelog

Todos los cambios notables de este proyecto se documentan en este archivo.

El formato se basa en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto sigue [Semantic Versioning](https://semver.org/lang/es/).

## [1.0.0] - 2025-03-03

### Añadido

- Editor de ensamblador con detección de errores
- Ensamblador completo con 20 instrucciones
- CPU simulada con 4 registros, 64 celdas de memoria, flags Z/N
- Ejecución paso a paso (Step)
- Ejecución continua (Run) con velocidad ajustable
- Visualización en tiempo real de registros, memoria y flags
- Panel de salida para instrucción OUT
- 4 programas de ejemplo precargados (Suma, Factorial, Cuenta atrás, Fibonacci)
- Interfaz retro-industrial con LEDs indicadores
- Diseño responsivo para escritorio y móvil
- Documentación completa del set de instrucciones
- Tutorial paso a paso para principiantes
- Plantillas de issues para GitHub
- Workflow de GitHub Actions para despliegue en GitHub Pages

### Instrucciones implementadas

- **Transferencia**: LOADI, LOAD, STORE
- **Aritmética**: ADD, SUB, MUL, DIV
- **Lógica**: AND, OR, NOT
- **Comparación**: CMP
- **Saltos**: JMP, JZ, JNZ, JG, JL
- **Control**: NOP, HALT
- **E/S**: IN, OUT

## [Unreleased]

### Pendiente

- Soporte para etiquetas (labels) en el ensamblador
- Instrucciones de pila (PUSH/POP)
- Subrutinas (CALL/RET)
- Breakpoints
- Exportar/importar archivos .asm
