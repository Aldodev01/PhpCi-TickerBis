export function UserActivity() {
  var lastMove = Date.now();

  document.onmousemove = function () {
    lastMove = Date.now();
  };

  setInterval(function () {
    var diff = Date.now() - lastMove;
    if (diff > 10000) {
      console.log("Inactive for " + diff + " ms");
      console.log("User is inactive", lastMove);
    }
  }, 1000);
}
