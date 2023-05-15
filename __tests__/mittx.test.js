test("test cjs mittx", () => {
  const msg = require("../dist/cjs/index").default;

  const handle = (value) => value;
  msg.on("xxx", handle);

  expect(msg.emit("xxx", 1)).toBe(true);

  msg.off("xxx", handle);

  expect(msg.emit("xxx", 1)).toBe(false);
});


test("test esm mittx", () => {
  const msg = require("../dist/esm/index").default;

  const handle = (value) => value;
  msg.on("xxx", handle);

  expect(msg.emit("xxx", 1)).toBe(true);

  msg.off("xxx", handle);

  expect(msg.emit("xxx", 1)).toBe(false);
});
