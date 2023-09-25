'use strict';

// Checks to make sure request method is correct
function methodValidator(request, response, next) {
  if (request.method === 'POST') {
    next();
  } else {
    next({ method: 'Error 404 - Incorrect Method' });
  }
}
module.exports = methodValidator;
