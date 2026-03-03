/**
 * ui.js - Renderizado de la interfaz
 * Genera todo el HTML de los paneles a partir del estado
 */

function ledHtml(on, color) {
  return '<div class="led' + (on ? ' on-' + color : '') + '"></div>';
}

function escHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function pad2(n) {
  return n < 10 ? '0' + n : '' + n;
}

function renderEditor() {
  var lineCount = state.source.split("\n").length;
  var errHtml = '';
  if (state.errors.length > 0) {
    errHtml = '<div class="errors">';
    for (var i = 0; i < state.errors.length; i++) {
      errHtml += '<div>' + escHtml(state.errors[i]) + '</div>';
    }
    errHtml += '</div>';
  }

  var refItems = '';
  var infoKeys = Object.keys(INSTRUCTION_INFO);
  for (var i = 0; i < infoKeys.length; i++) {
    var name = infoKeys[i];
    refItems += '<div class="ref-item"><span class="name">' + name + '</span><span class="desc"> \u2014 ' + INSTRUCTION_INFO[name].desc + '</span></div>';
  }

  var exBtns = '';
  for (var i = 0; i < EXAMPLE_NAMES.length; i++) {
    var n = EXAMPLE_NAMES[i];
    exBtns += '<button class="example-btn" onclick="loadExample(\'' + n + '\')">' + n + '</button>';
  }

  return '<div class="content">' +
    '<div class="examples"><span>Ejemplos:</span>' + exBtns + '</div>' +
    '<div class="editor-box">' +
      '<div class="editor-header"><span>EDITOR ASM</span><span class="lines">' + lineCount + ' lineas</span></div>' +
      '<textarea id="codeEditor" spellcheck="false" oninput="onSourceChange(this)">' + escHtml(state.source) + '</textarea>' +
    '</div>' +
    errHtml +
    '<button class="btn btn-yellow btn-assemble" onclick="doAssemble()">&#9654; Ensamblar</button>' +
    '<div class="reference"><div class="reference-title">SET DE INSTRUCCIONES</div><div class="ref-grid">' + refItems + '</div></div>' +
  '</div>';
}

function renderExecution() {
  var cpu = state.cpu;
  var prog = state.program;
  var regOps = ["ADD","SUB","MUL","DIV","AND","OR"];

  // Registers
  var regsHtml = '';
  for (var i = 0; i < NUM_REGISTERS; i++) {
    var active = (cpu.lastModifiedReg === i);
    regsHtml += '<div class="reg-item' + (active ? ' active' : '') + '">' +
      ledHtml(active, 'yellow') +
      '<span class="reg-label">R' + i + '</span>' +
      '<span class="reg-value">' + cpu.registers[i] + '</span></div>';
  }

  // Program listing
  var progHtml = '';
  for (var i = 0; i < prog.length; i++) {
    var instr = prog[i];
    var cur = (i === cpu.pc && !cpu.halted);
    var opname = OPCODE_NAMES[instr.opcode];
    var argsHtml = '';
    for (var j = 0; j < instr.args.length; j++) {
      var a = instr.args[j];
      var isReg = (regOps.indexOf(opname) >= 0) ||
        (["NOT","CMP"].indexOf(opname) >= 0) ||
        (opname === "LOADI" && j === 0) ||
        ((opname === "LOAD" || opname === "STORE") && j === 0) ||
        (["IN","OUT"].indexOf(opname) >= 0);
      if (j > 0) argsHtml += '<span class="instr-sep">, </span>';
      argsHtml += '<span class="' + (isReg ? 'instr-reg' : 'instr-num') + '">' + (isReg ? 'R' + a : a) + '</span>';
    }
    progHtml += '<div class="instr-row' + (cur ? ' current' : '') + '">' +
      '<span class="instr-addr">' + pad2(i) + '</span>' +
      ledHtml(cur, 'blue') +
      '<span class="instr-text"><span class="instr-op">' + opname + '</span> ' + argsHtml + '</span></div>';
  }

  // Memory
  var cols = 8, rows = 8;
  var memCols = '28px';
  for (var c = 0; c < cols; c++) memCols += ' 1fr';
  var memHtml = '<div></div>';
  for (var c = 0; c < cols; c++) memHtml += '<div class="mem-header">+' + c + '</div>';
  for (var r = 0; r < rows; r++) {
    memHtml += '<div class="mem-row-label">' + pad2(r * cols) + '</div>';
    for (var c = 0; c < cols; c++) {
      var addr = r * cols + c;
      var v = cpu.memory[addr];
      var acc = (addr === cpu.lastAccessedMem);
      var cls = 'mem-cell';
      if (acc) cls += ' accessed';
      else if (v !== 0) cls += ' has-value';
      memHtml += '<div class="' + cls + '">' + v + '</div>';
    }
  }

  // Output
  var outHtml = '';
  if (cpu.output.length === 0) {
    outHtml = '<span class="output-empty">Sin salida...</span>';
  } else {
    for (var i = 0; i < cpu.output.length; i++) {
      outHtml += '<span class="output-val">' + cpu.output[i] + '</span>';
    }
  }

  var hd = cpu.halted || state.running;
  var nr = !state.running;

  return '<div class="content">' +
    '<div class="controls">' +
      '<button class="btn btn-gray" onclick="doBack()">&larr; Editor</button>' +
      '<button class="btn btn-blue" onclick="doStep()"' + (hd ? ' disabled' : '') + '>Paso</button>' +
      '<button class="btn btn-green" onclick="doRun()"' + (hd ? ' disabled' : '') + '>Ejecutar</button>' +
      '<button class="btn btn-yellow" onclick="doStop()"' + (nr ? ' disabled' : '') + '>Pausar</button>' +
      '<button class="btn btn-red" onclick="doReset()">Reset</button>' +
      '<div class="speed-control"><span>Velocidad:</span>' +
        '<input type="range" min="50" max="1000" step="50" value="' + (1050 - state.speed) + '" oninput="setSpeed(Number(this.value))">' +
      '</div>' +
    '</div>' +
    '<div class="exec-grid">' +
      '<div class="left-col">' +
        '<div class="panel">' +
          '<div class="panel-title" style="color:#fbbf24"><span class="bar" style="background:#fbbf24"></span> Registros</div>' +
          '<div class="reg-grid">' + regsHtml + '</div>' +
          '<div class="pc-item">' + ledHtml(true, 'green') + '<span class="pc-label">PC</span><span class="pc-value">' + cpu.pc + '</span></div>' +
          '<div class="flags-row">' +
            '<div class="flag-item' + (cpu.flags.Z ? ' z-on' : '') + '">' + ledHtml(cpu.flags.Z, 'blue') + '<span class="flag-label">Z</span><span class="flag-value">' + (cpu.flags.Z ? 1 : 0) + '</span></div>' +
            '<div class="flag-item' + (cpu.flags.N ? ' n-on' : '') + '">' + ledHtml(cpu.flags.N, 'red') + '<span class="flag-label">N</span><span class="flag-value">' + (cpu.flags.N ? 1 : 0) + '</span></div>' +
          '</div>' +
          '<div class="cycles-item"><span class="cycles-label">CICLOS</span><span class="cycles-value">' + cpu.cycles + '</span></div>' +
        '</div>' +
        '<div class="panel">' +
          '<div class="panel-title" style="color:#10b981"><span class="bar" style="background:#10b981"></span> Salida</div>' +
          '<div class="output-area">' + outHtml + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="right-col">' +
        '<div class="panel">' +
          '<div class="panel-title" style="color:#3b82f6"><span class="bar" style="background:#3b82f6"></span> Programa (' + prog.length + ' instrucciones)</div>' +
          '<div class="program-list">' + progHtml + '</div>' +
        '</div>' +
        '<div class="panel">' +
          '<div class="panel-title" style="color:#8b5cf6"><span class="bar" style="background:#8b5cf6"></span> Memoria (' + MEMORY_SIZE + ' celdas)</div>' +
          '<div class="mem-grid" style="grid-template-columns:' + memCols + '">' + memHtml + '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>';
}

function render() {
  var cpu = state.cpu;
  var statusHtml = '';
  if (cpu.halted && state.assembled) {
    statusHtml = '<span class="status halt">&#9679; HALT</span>';
  } else if (state.running) {
    statusHtml = '<span class="status running">&#9679; EJECUTANDO</span>';
  }

  var html = '<div class="header">' +
    '<div class="header-left">' +
      '<div class="leds">' + ledHtml(true, 'red') + ledHtml(state.assembled, 'yellow') + ledHtml(state.running, 'green') + '</div>' +
      '<span class="title">Maquina Simple</span>' +
      '<span class="version">v1.0</span>' +
    '</div>' +
    '<div>' + statusHtml + '</div>' +
  '</div>';

  if (state.assembled) {
    html += renderExecution();
  } else {
    html += renderEditor();
  }

  document.getElementById('app').innerHTML = html;
}

// Iniciar renderizado
render();
