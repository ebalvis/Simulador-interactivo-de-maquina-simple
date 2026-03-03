/**
 * app.js - Estado global y controladores
 */
var state = {
  source: EXAMPLE_CODE["Suma de 2 numeros"],
  cpu: createCPU(),
  program: [],
  errors: [],
  assembled: false,
  running: false,
  speed: 500,
  intervalId: null
};

function doAssemble() {
  var result = assemble(state.source);
  state.errors = result.errors;
  if (result.errors.length === 0) {
    state.program = result.program;
    state.cpu = createCPU();
    state.assembled = true;
    state.running = false;
  }
  render();
}

function doStep() {
  if (state.cpu.halted || state.cpu.pc >= state.program.length) {
    state.cpu.halted = true; state.running = false; render(); return;
  }
  var c = cloneCPU(state.cpu);
  stepCPU(c, state.program);
  state.cpu = c;
  render();
}

function doRun() {
  if (state.cpu.halted) return;
  state.running = true;
  startInterval();
  render();
}

function doStop() {
  state.running = false;
  if (state.intervalId) { clearInterval(state.intervalId); state.intervalId = null; }
  render();
}

function doReset() {
  state.running = false;
  if (state.intervalId) { clearInterval(state.intervalId); state.intervalId = null; }
  state.cpu = createCPU();
  render();
}

function doBack() {
  state.assembled = false; state.running = false;
  if (state.intervalId) { clearInterval(state.intervalId); state.intervalId = null; }
  state.program = []; state.cpu = createCPU();
  render();
}

function startInterval() {
  if (state.intervalId) clearInterval(state.intervalId);
  state.intervalId = setInterval(function() {
    if (state.cpu.halted || state.cpu.pc >= state.program.length) {
      state.cpu.halted = true; state.running = false;
      clearInterval(state.intervalId); state.intervalId = null;
      render(); return;
    }
    var c = cloneCPU(state.cpu);
    stepCPU(c, state.program);
    state.cpu = c;
    render();
  }, state.speed);
}

function setSpeed(val) {
  state.speed = 1050 - val;
  if (state.running) startInterval();
}

function loadExample(name) {
  state.source = EXAMPLE_CODE[name];
  render();
}

function onSourceChange(el) {
  state.source = el.value;
}
