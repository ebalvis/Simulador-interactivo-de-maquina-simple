# Guía de contribución

¡Gracias por tu interés en contribuir al Simulador de Máquina Simple! Esta guía te ayudará a hacer tu primera contribución.

## Código de conducta

Este proyecto se rige por un código de conducta basado en el respeto mutuo. Al contribuir, te comprometes a mantener un ambiente constructivo y respetuoso.

## Cómo contribuir

### Reportar errores

1. Verifica que el error no haya sido reportado previamente en [Issues](../../issues)
2. Crea un nuevo issue usando la plantilla de **Bug Report**
3. Incluye: navegador y versión, pasos para reproducir, comportamiento esperado vs observado, y capturas de pantalla si aplica

### Sugerir mejoras

1. Crea un issue usando la plantilla de **Feature Request**
2. Describe la mejora con el mayor detalle posible
3. Explica el caso de uso

### Enviar cambios (Pull Requests)

1. Haz fork del repositorio
2. Crea una rama desde `main`: `git checkout -b feature/mi-mejora`
3. Realiza tus cambios
4. Verifica que funciona abriendo `index.html` en el navegador
5. Haz commit con mensajes descriptivos: `git commit -m "feat: añadir instrucción PUSH"`
6. Push a tu fork: `git push origin feature/mi-mejora`
7. Abre un Pull Request describiendo los cambios

## Convenciones

### Mensajes de commit

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

| Prefijo | Uso |
|---------|-----|
| `feat:` | Nueva funcionalidad |
| `fix:` | Corrección de error |
| `docs:` | Cambios en documentación |
| `style:` | Cambios de formato |
| `refactor:` | Refactorización |
| `test:` | Tests |
| `chore:` | Mantenimiento |

### Estilo de código

- **JavaScript ES5** compatible (sin let, const, arrow functions, template literals)
- Indentación: **2 espacios**
- Punto y coma al final de cada sentencia
- Variables y funciones en **camelCase**
- Constantes globales en **UPPER_SNAKE_CASE**

### Estructura de archivos

- CPU: `src/js/cpu.js`
- Ensamblador: `src/js/assembler.js`
- Interfaz: `src/js/ui.js`
- Controladores: `src/js/app.js`
- Estilos: `src/css/styles.css`
- Programas ejemplo: `examples/`
- Documentación: `docs/`

## Entorno de desarrollo

No se necesitan herramientas especiales:

1. Un editor de texto (VS Code, Sublime Text, Vim...)
2. Un navegador moderno
3. Git

Para recarga automática (opcional):

```bash
npm install -g live-server
live-server
```

## Ideas para primeras contribuciones

- Añadir más programas de ejemplo en `examples/`
- Mejorar documentación o traducciones
- Añadir tooltips a los botones
- Mejorar accesibilidad (atributos ARIA)
- Añadir atajos de teclado

¡Cualquier contribución, por pequeña que sea, es valiosa!
