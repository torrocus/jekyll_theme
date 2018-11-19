function dua(document, window, methodAfterUserActivity, minimumNumberOfUserActivity) {
  var eventNames = [
    'DOMMouseScroll',
    'keypress',
    'mousedown',
    'mousemove',
    'mousewheel',
    'MSPointerMove',
    'touchmove'
  ];
  var object = document;
  var userActivityCounter = 0;

  function markUserActivity(event) {
    userActivityCounter += 1;
    if (userActivityCounter >= minimumNumberOfUserActivity) {
      methodAfterUserActivity();
      resetUserActivity(object, markUserActivity);
    }
  }

  function setupUserActivity(object, method) {
    for (var i = 0; i < eventNames.length; i++) {
      object.addEventListener(eventNames[i], method, { passive: true });
    }
  }

  function resetUserActivity(object, method) {
    for (var i = 0; i < eventNames.length; i++) {
      object.removeEventListener(eventNames[i], method, { passive: true });
    }
  }

  setupUserActivity(object, markUserActivity);
}
