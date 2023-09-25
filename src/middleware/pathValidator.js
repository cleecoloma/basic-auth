'use strict';

// Checks to make sure request.path includes correct endpoints
function pathValidator(request, response, next) {
  if (request.path.includes('/signup')) {
    next();
  } else if (request.path.includes('/signin')) {
    next();
  } else {
    next({ path: 'Error 404 - Incorrect Path' });
  }
}

module.exports = pathValidator;
