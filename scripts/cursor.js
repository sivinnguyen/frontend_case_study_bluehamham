function cursor() {
  var glob = this; // global variables
  glob.$cursor = document.querySelector("#cursor");
  glob.$cursor.classList.add("is-active");
  glob.$cursorInner = document.querySelector("#cursor__inner");
  glob.$links = document.querySelectorAll("a, .cursor__target");
  glob.cursorPositionX = 0;
  glob.cursorPositionY = 0;
  glob.oldCursorPositionX = 0;
  glob.oldCursorPositionY = 0;

  for (let i = 0; i < glob.$links.length; i++) {
    glob.$links[i].addEventListener("mouseenter", function() {
      gsap.to(glob.$cursorInner, {
        duration: 0.6,
        ease: "power3.out",
        scale: 2
      });
    });

    glob.$links[i].addEventListener("mouseleave", function() {
      gsap.to(glob.$cursorInner, {
        duration: 0.6,
        ease: "power3.out",
        scale: 1
      });
    });
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
  // passive: A Boolean that, if true, indicates that the function specified by listener will never call preventDefault()
  // https://viblo.asia/p/tim-hieu-ve-eventpreventdefault-eventstoppropagation-va-eventstopimmediatepropagation-4P85637OKY3
  window.addEventListener(
    "mousemove",
    function(e) {
      (glob.cursorPositionX = e.clientX), (glob.cursorPositionY = e.clientY);
    },
    { passive: true }
  );

  (function move() {
    var dx = glob.oldCursorPositionX - glob.cursorPositionX,
      dy = glob.oldCursorPositionY - glob.cursorPositionY,
      d = Math.min(20, Math.sqrt(dx * dx + dy * dy)) / 10,
      r = (180 * Math.atan2(dy, dx)) / Math.PI;

    gsap.set(glob.$cursor, {
      x: glob.cursorPositionX,
      y: glob.cursorPositionY,
      scaleX: 1 + d,
      rotation: r
    });

    glob.oldCursorPositionX = glob.cursorPositionX;
    glob.oldCursorPositionY = glob.cursorPositionY;

    requestAnimationFrame(move);
  })();
}

document.addEventListener("DOMContentLoaded", () => {
  cursor();
});
