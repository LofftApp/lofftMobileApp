export const logWithLocation = (...messages: unknown[]) => {
  const err = new Error();
  const stack = err.stack ? err.stack.split('\n') : [];

  let caller = stack[2] || stack[1] || stack[0];

  if (caller) {
    caller = caller.trim();
  } else {
    caller = 'unknown location';
  }

  console.log(`${caller}:`, ...messages);
};
