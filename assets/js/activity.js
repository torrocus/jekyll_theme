function detectUserActivity(document, window, methodAfterUserActivity, minimumNumberOfUserActivity) {
  const eventNames = [
    'DOMMouseScroll',
    'keypress',
    'mousedown',
    'mousemove',
    'mousewheel',
    'MSPointerMove',
    'touchmove'
  ];
  let object = document;
  let userActivityCounter = 0;

  function markUserActivity(event) {
    userActivityCounter += 1;
    if (userActivityCounter >= minimumNumberOfUserActivity) {
      methodAfterUserActivity();
      resetUserActivity(object, markUserActivity);
    }
  }

  function setupUserActivity(object, method) {
    for (var i = 0; i < eventNames.length; i++) {
      object.addEventListener(eventNames[i], method, false);
    }
  }

  function resetUserActivity(object, method) {
    for (var i = 0; i < eventNames.length; i++) {
      object.removeEventListener(eventNames[i], method, false);
    }
  }

  setupUserActivity(object, markUserActivity);
}
