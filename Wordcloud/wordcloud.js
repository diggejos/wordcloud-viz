const STOP_WORDS_DE = [
  "aber","alle","als","also","am","an","auch","auf","aus","bei","bin","bis",
  "bist","da","dadurch","daher","darum","das","daß","dass","dein","deine",
  "dem","den","der","des","dessen","deshalb","die","dies","dieser","dieses",
  "doch","dort","du","durch","ein","eine","einem","einen","einer","eines",
  "er","es","etwas","euer","eure","für","hatte","hatten","hattest","hattet",
  "hier","hinter","ich","ihr","ihre","im","in","ist","ja","jede","jedem",
  "jeden","jeder","jedes","jener","jenes","jetzt","kann","kannst","können",
  "könnt","machen","mein","meine","mit","muß","musst","müssen","müßt","nach",
  "nachdem","nein","nicht","nun","oder","seid","sein","seine","sich","sie",
  "sind","soll","sollen","sollst","sollt","sonst","soweit","sowie","und",
  "unser","unsere","unter","vom","von","vor","wann","warum","was","weiter",
  "weitere","wenn","wer","werde","werden","werdet","weshalb","wie","wieder",
  "wieso","wir","wird","wirst","wo","woher","wohin","zu","zum","zur","über"
];

function removeStopWords(text) {
  return text
    .split(/\s+/)
    .filter(w => !STOP_WORDS_DE.includes(w.toLowerCase()))
    .join(" ");
}

function drawWordCloud(data) {
  const container = document.getElementById('wordcloud');
  container.innerHTML = '';

  // Convert Looker data into a single text blob
  const text = data.tables.DEFAULT.map(row => row.dimID[0]).join(' ');
  const cleanText = removeStopWords(text);

  const wordFreq = {};
  cleanText.split(/\s+/).forEach(word => {
    if (!word) return;
    wordFreq[word] = (wordFreq[word] || 0) + 1;
  });

  const words = Object.entries(wordFreq).map(([word, freq]) => [word, freq]);

  WordCloud(container, {
    list: words,
    gridSize: 8,
    weightFactor: 4,
    fontFamily: 'sans-serif',
    color: 'random-dark',
    rotateRatio: 0.3,
    backgroundColor: '#ffffff'
  });
}

function drawViz(data) {
  if (!data || !data.tables || !data.tables.DEFAULT) return;
  drawWordCloud(data);
}

dscc.subscribeToData(drawViz, {transform: dscc.tableTransform});