const papa = require("papaparse");

const VOCAB_URL =
  "https://raw.githubusercontent.com/chrisadams/balderdash-next/main/public/rare_words.csv";
// const VOCAB_URL =
//   "https://raw.githubusercontent.com/ivan-rivera/balderdash-next/main/public/test_rare_words.csv";

const MOVIES_URL =
  "https://raw.githubusercontent.com/chrisadams/balderdash-next/main/public/movie_loglines.csv";

const FACTS_ONE_URL =
  "https://raw.githubusercontent.com/chrisadams/balderdash-next/main/public/facts_1.csv";

const IDIOMS_URL = 
"https://raw.githubusercontent.com/chrisadams/balderdash-next/main/public/japanese_idoms.csv";

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

let facts_one = {};
export async function buildFactsOne() {
  await fetch(FACTS_ONE_URL)
    .then((resp) => resp.text())
    .then((text) => {
      papa.parse(text, { delimiter: "‡", header: true }).data.forEach((row) => {
        facts_one[row.abbreviated_fact] = row.fact;
      });
    });
}

let idioms = {};
export async function buildIdioms() {
  await fetch(IDIOMS_URL)
    .then((resp) => resp.text())
    .then((text) => {
      papa.parse(text, { delimiter: "‡", header: true }).data.forEach((row) => {
        idioms[row.idiom] = row.meaning;
      });
    });
}

export async function sampleWord(category) {
  await buildVocab();
  await buildMovies();
  await buildFactsOne();
  await buildIdioms();

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
  } else if (category == "facts_one") {
    const factsonekeys = Object.keys(facts_one);
    const factsoneindex = Math.floor(Math.random() * factsonekeys.length);
    console.log(`selected facts one: ${factsonekeys[factsoneindex]}`);
    return factsonekeys[factsoneindex];
  } else if (category == "idioms") {
    const idiomskeys = Object.keys(idioms);
    const idiomsindex = Math.floor(Math.random() * idiomskeys.length);
    console.log(`selected idiom: ${idiomskeys[idiomsindex]}`);
    return idiomskeys[idiomsindex];
  }
}


export async function getWordDefinition(word) {
  if (Object.keys(vocab).length === 0) {
    await buildVocab();
  }
  if (Object.keys(movies).length === 0) {
    await buildMovies();
  }
  if (Object.keys(facts_one).length === 0) {
    await buildFactsOne();
  }
  if (Object.keys(idioms).length === 0) {
    await buildIdioms();
  }
  if (vocab[word] !== undefined) {
    return vocab[word];
  }
  if (movies[word] !== undefined) {
    return movies[word];
  }
  if (facts_one[word] !== undefined) {
    return facts_one[word];
  }
  if (idioms[word] !== undefined) {
    return idioms[word];
  }
  return undefined;
}

/*export async function getMoviePlot(title) {
  if (Object.keys(movies).length === 0) await buildMovies();
  return movies[title];
}*/
