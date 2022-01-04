/**
 * Formats back-end errors and invokes an onError handler.
 * @param {Array} errors The errors returned by the backend when submitting.
 * @param {Function} onError The handler to call with the formatted errors.
 */
const submissionError = (errors, onError) => {
  // For now, simply pass them straight through as we don't yet know
  // what the errors will look like.
  onError(errors);
};

export default submissionError;
