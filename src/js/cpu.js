/**
 * cpu.js - Nucleo de la CPU simulada
 * Arquitectura: 4 registros, 64 celdas memoria, flags Z/N, 20 instrucciones
 */
var MEMORY_SIZE = 64;
var NUM_REGISTERS = 4;

var OPCODES = {
  NOP: 0x00, LOAD: 0x01, STORE: 0x02, ADD: 0x03, SUB: 0x04,
  MUL: 0x05, DIV: 0x06, AND: 0x07, OR: 0x08, NOT: 0x09,
  CMP: 0x0A, JMP: 0x0B, JZ: 0x0C, JNZ: 0x0D, JG: 0x0E,
  JL: 0x0F, LOADI: 0x10, IN: 0x11, OUT: 0x12, HALT: 0x1F
};

var OPCODE_NAMES = {};
for (var k in OPCODES) {
  if (OPCODES.hasOwnProperty(k)) OPCODE_NAMES[OPCODES[k]] = k;
}

var INSTRUCTION_INFO = {
  NOP:   { args: 0, desc: "No operacion" },
  LOADI: { args: 2, desc: "LOADI Rx, val \u2192 Rx = val" },
  LOAD:  { args: 2, desc: "LOAD Rx, dir \u2192 Rx = MEM[dir]" },
  STORE: { args: 2, desc: "STORE Rx, dir \u2192 MEM[dir] = Rx" },
  ADD:   { args: 3, desc: "ADD Rx, Ry, Rz \u2192 Rx = Ry + Rz" },
  SUB:   { args: 3, desc: "SUB Rx, Ry, Rz \u2192 Rx = Ry - Rz" },
  MUL:   { args: 3, desc: "MUL Rx, Ry, Rz \u2192 Rx = Ry * Rz" },
  DIV:   { args: 3, desc: "DIV Rx, Ry, Rz \u2192 Rx = Ry / Rz" },
  AND:   { args: 3, desc: "AND Rx, Ry, Rz \u2192 Rx = Ry \u0026 Rz" },
  OR:    { args: 3, desc: "OR Rx, Ry, Rz \u2192 Rx = Ry | Rz" },
  NOT:   { args: 2, desc: "NOT Rx, Ry \u2192 Rx = ~Ry" },
  CMP:   { args: 2, desc: "CMP Rx, Ry \u2192 flags" },
  JMP:   { args: 1, desc: "JMP dir \u2192 PC = dir" },
  JZ:    { args: 1, desc: "JZ dir \u2192 salta si Z=1" },
  JNZ:   { args: 1, desc: "JNZ dir \u2192 salta si Z=0" },
  JG:    { args: 1, desc: "JG dir \u2192 salta si N=0,Z=0" },
  JL:    { args: 1, desc: "JL dir \u2192 salta si N=1" },
  IN:    { args: 1, desc: "IN Rx \u2192 lee entrada" },
  OUT:   { args: 1, desc: "OUT Rx \u2192 escribe salida" },
  HALT:  { args: 0, desc: "Detener ejecucion" }
};

function createCPU() {
  var regs = [], mem = [];
  for (var i = 0; i < NUM_REGISTERS; i++) regs.push(0);
  for (var j = 0; j < MEMORY_SIZE; j++) mem.push(0);
  return {
    registers: regs, memory: mem, pc: 0,
    flags: { Z: false, N: false }, halted: false,
    output: [], inputQueue: [], cycles: 0,
    lastAccessedMem: -1, lastModifiedReg: -1
  };
}

function cloneCPU(c) {
  return {
    registers: c.registers.slice(), memory: c.memory.slice(),
    pc: c.pc, flags: { Z: c.flags.Z, N: c.flags.N }, halted: c.halted,
    output: c.output.slice(), inputQueue: c.inputQueue.slice(),
    cycles: c.cycles, lastAccessedMem: c.lastAccessedMem,
    lastModifiedReg: c.lastModifiedReg
  };
}

function stepCPU(cpu, program) {
  if (cpu.halted || cpu.pc >= program.length) { cpu.halted = true; return; }
  var instr = program[cpu.pc];
  var opcode = instr.opcode, args = instr.args;
  var R = cpu.registers, M = cpu.memory, d;
  cpu.lastAccessedMem = -1; cpu.lastModifiedReg = -1; cpu.cycles++;
  switch (opcode) {
    case OPCODES.NOP: cpu.pc++; break;
    case OPCODES.LOADI: R[args[0]] = args[1]; cpu.lastModifiedReg = args[0]; cpu.pc++; break;
    case OPCODES.LOAD: R[args[0]] = M[args[1]] || 0; cpu.lastModifiedReg = args[0]; cpu.lastAccessedMem = args[1]; cpu.pc++; break;
    case OPCODES.STORE: M[args[1]] = R[args[0]]; cpu.lastAccessedMem = args[1]; cpu.pc++; break;
    case OPCODES.ADD: R[args[0]] = R[args[1]] + R[args[2]]; cpu.lastModifiedReg = args[0]; cpu.pc++; break;
    case OPCODES.SUB: R[args[0]] = R[args[1]] - R[args[2]]; cpu.lastModifiedReg = args[0]; cpu.pc++; break;
    case OPCODES.MUL: R[args[0]] = R[args[1]] * R[args[2]]; cpu.lastModifiedReg = args[0]; cpu.pc++; break;
    case OPCODES.DIV: R[args[0]] = R[args[2]] !== 0 ? Math.trunc(R[args[1]] / R[args[2]]) : 0; cpu.lastModifiedReg = args[0]; cpu.pc++; break;
    case OPCODES.AND: R[args[0]] = R[args[1]] & R[args[2]]; cpu.lastModifiedReg = args[0]; cpu.pc++; break;
    case OPCODES.OR: R[args[0]] = R[args[1]] | R[args[2]]; cpu.lastModifiedReg = args[0]; cpu.pc++; break;
    case OPCODES.NOT: R[args[0]] = ~R[args[1]]; cpu.lastModifiedReg = args[0]; cpu.pc++; break;
    case OPCODES.CMP: d = R[args[0]] - R[args[1]]; cpu.flags.Z = (d === 0); cpu.flags.N = (d < 0); cpu.pc++; break;
    case OPCODES.JMP: cpu.pc = args[0]; break;
    case OPCODES.JZ: cpu.pc = cpu.flags.Z ? args[0] : cpu.pc + 1; break;
    case OPCODES.JNZ: cpu.pc = !cpu.flags.Z ? args[0] : cpu.pc + 1; break;
    case OPCODES.JG: cpu.pc = (!cpu.flags.N && !cpu.flags.Z) ? args[0] : cpu.pc + 1; break;
    case OPCODES.JL: cpu.pc = cpu.flags.N ? args[0] : cpu.pc + 1; break;
    case OPCODES.IN: var iv = cpu.inputQueue.length > 0 ? cpu.inputQueue.shift() : 0; R[args[0]] = iv; cpu.lastModifiedReg = args[0]; cpu.pc++; break;
    case OPCODES.OUT: cpu.output.push(R[args[0]]); cpu.pc++; break;
    case OPCODES.HALT: cpu.halted = true; break;
    default: cpu.halted = true;
  }
}
