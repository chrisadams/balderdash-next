const papa = require("papaparse");

const VOCAB_URL =
  "https://raw.githubusercontent.com/chrisadams/balderdash-next/main/public/rare_words.csv";
// const VOCAB_URL =
//   "https://raw.githubusercontent.com/ivan-rivera/balderdash-next/main/public/test_rare_words.csv";

const MOVIES_URL =
  "https://raw.githubusercontent.com/chrisadams/balderdash-next/main/public/movie_loglines.csv";

let vocab = {};
export async function buildVocab() {
  await fetch(VOCAB_URL)
    .then((resp) => resp.text())
    .then((text) => {
      papa.parse(text, { header: true }).data.forEach((row) => {
        vocab[row.word] = row.definition;
      });
    });
}


let movies = {};
export async function buildMovies() {
  await fetch(MOVIES_URL)
    .then((resp) => resp.text())
    .then((text) => {
      papa.parse(text, { delimiter: "‡", header: true }).data.forEach((row) => {
        movies[row.title] = row.logline;
      });
    });
}

export async function sampleWord(category) {
  await buildVocab();
  await buildMovies();

  if (category == "word") {
    const keys = Object.keys(vocab);
    const index = Math.floor(Math.random() * keys.length);
    console.log(`selected word: ${keys[index]}`);
    return keys[index];  
  } else if (category == "movie") {
    const moviekeys = Object.keys(movies);
    const movieindex = Math.floor(Math.random() * moviekeys.length);
    console.log(`selected movie: ${moviekeys[movieindex]}`);
    return moviekeys[movieindex];
  
  }
}


export async function getWordDefinition(word) {
  if (Object.keys(vocab).length === 0) {
    await buildVocab();
  }
  if (Object.keys(movies).length === 0) {
    await buildMovies();
  }
  if (vocab[word] !== undefined) {
    return vocab[word];
  }
  if (movies[word] !== undefined) {
    return movies[word];
  }
  return undefined;
}

/*export async function getMoviePlot(title) {
  if (Object.keys(movies).length === 0) await buildMovies();
  return movies[title];
}*/
