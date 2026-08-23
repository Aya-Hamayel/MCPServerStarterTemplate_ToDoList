// Checks the hero checkbox shortly after load — the one deliberate
// motion moment on the page, echoing what the server itself does
// when complete_task runs.
document.addEventListener("DOMContentLoaded", () => {
  const box = document.querySelector(".check");
  if (!box) return;

  window.setTimeout(() => {
    box.classList.add("done");
  }, 300);
});
