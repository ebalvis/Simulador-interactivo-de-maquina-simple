/**
 * assembler.js - Ensamblador de la maquina simple
 * Convierte codigo fuente ASM en instrucciones ejecutables
 */

var EXAMPLE_NAMES = ["Suma de 2 numeros", "Factorial de 5", "Cuenta atras", "Fibonacci"];
var EXAMPLE_CODE = {};
EXAMPLE_CODE["Suma de 2 numeros"] = "; Suma de dos numeros\nLOADI R0, 5\nLOADI R1, 3\nADD R2, R0, R1\nOUT R2\nHALT";
EXAMPLE_CODE["Factorial de 5"] = "; Factorial de 5\nLOADI R0, 5\nLOADI R1, 1\nLOADI R3, 1\n; Bucle\nCMP R0, R3\nJZ 10\nMUL R1, R1, R0\nSUB R0, R0, R3\nJMP 4\n; Resultado\nOUT R1\nHALT";
EXAMPLE_CODE["Cuenta atras"] = "; Cuenta atras desde 10\nLOADI R0, 10\nLOADI R1, 1\nLOADI R2, 0\n; Bucle\nOUT R0\nCMP R0, R2\nJZ 10\nSUB R0, R0, R1\nJMP 4\n; Fin\nHALT";
EXAMPLE_CODE["Fibonacci"] = "; Fibonacci: primeros 8\nLOADI R0, 0\nLOADI R1, 1\nLOADI R3, 8\nOUT R0\nOUT R1\n; Bucle\nADD R2, R0, R1\nOUT R2\nLOADI R0, 0\nADD R0, R1, R0\nLOADI R1, 0\nADD R1, R2, R1\nLOADI R2, 1\nSUB R3, R3, R2\nLOADI R2, 2\nCMP R3, R2\nJNZ 6\nHALT";

function parseRegister(s) {
  var m = s.match(/^R(\d)$/i);
  if (!m) return null;
  var n = parseInt(m[1]);
  return (n >= 0 && n < NUM_REGISTERS) ? n : null;
}

function assemble(source) {
  var lines = source.split("\n");
  var program = [], errors = [];
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].replace(/;.*$/, "").trim();
    if (!line) continue;
    var tokens = line.split(/[\s,]+/).filter(Boolean);
    var mnemonic = tokens[0].toUpperCase();
    if (!(mnemonic in OPCODES)) {
      errors.push("Linea " + (i + 1) + ": instruccion desconocida '" + tokens[0] + "'");
      continue;
    }
    var opcode = OPCODES[mnemonic];
    try {
      switch (mnemonic) {
        case "NOP": case "HALT":
          program.push({ opcode: opcode, args: [], line: i, src: line }); break;
        case "LOADI": {
          var r = parseRegister(tokens[1]), v = parseInt(tokens[2]);
          if (r === null) throw "registro invalido '" + tokens[1] + "'";
          if (isNaN(v)) throw "valor invalido '" + tokens[2] + "'";
          program.push({ opcode: opcode, args: [r, v], line: i, src: line }); break;
        }
        case "LOAD": case "STORE": case "NOT": case "CMP": {
          var r1 = parseRegister(tokens[1]);
          var r2 = (mnemonic === "LOAD" || mnemonic === "STORE") ? parseInt(tokens[2]) : parseRegister(tokens[2]);
          if (r1 === null) throw "registro invalido '" + tokens[1] + "'";
          if (r2 === null || isNaN(r2)) throw "argumento invalido '" + tokens[2] + "'";
          program.push({ opcode: opcode, args: [r1, r2], line: i, src: line }); break;
        }
        case "ADD": case "SUB": case "MUL": case "DIV": case "AND": case "OR": {
          var rx = parseRegister(tokens[1]), ry = parseRegister(tokens[2]), rz = parseRegister(tokens[3]);
          if (rx === null) throw "registro invalido '" + tokens[1] + "'";
          if (ry === null) throw "registro invalido '" + tokens[2] + "'";
          if (rz === null) throw "registro invalido '" + tokens[3] + "'";
          program.push({ opcode: opcode, args: [rx, ry, rz], line: i, src: line }); break;
        }
        case "JMP": case "JZ": case "JNZ": case "JG": case "JL": {
          var addr = parseInt(tokens[1]);
          if (isNaN(addr)) throw "direccion invalida '" + tokens[1] + "'";
          program.push({ opcode: opcode, args: [addr], line: i, src: line }); break;
        }
        case "IN": case "OUT": {
          var rr = parseRegister(tokens[1]);
          if (rr === null) throw "registro invalido '" + tokens[1] + "'";
          program.push({ opcode: opcode, args: [rr], line: i, src: line }); break;
        }
      }
    } catch (e) { errors.push("Linea " + (i + 1) + ": " + e); }
  }
  return { program: program, errors: errors };
}
