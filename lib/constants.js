/**
 * Possible game states
 */
export const GAME_STATES = {
  INITIATED: "INITIATED", // Round has been created, but not started, players can join
  STARTED: "STARTED", // Round is in progress, players ca no longer join
  INVALID: "INVALID", // The session code is invalid
};

export const ROUND_STATES = {
  SELECTING: "SELECTING", // Dasher is selecting a word
  GUESSING: "GUESSING", // Guessers are guessing
  VOTING: "VOTING", // Guessers are voting
  RESULTS: "RESULTS", // Round results are being displayed
};

/**
 * Maximum number of players per session
 * @type {number}
 */
export const MAX_PLAYERS = 20;

/**
 * Minimum number of players per session
 * @type {number}
 */
export const MIN_PLAYERS = 2;

/**
 * Minimum length (in characters) of a guessed definition
 * @type {number}
 */
export const MIN_DEF_LEN = 2;

/**
 * Maximum length (in characters) of a guessed definition
 * @type {number}
 */
/*export const MAX_DEF_LEN = 200;*/

export const MAX_DEF_LEN = 20000;


export const TRUE_DEFINITION = "True Definition";
