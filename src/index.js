import express from 'express';

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());

const POSITIVE = {
  'amazing': 3, 'awesome': 3, 'excellent': 3, 'extraordinary': 3, 'fantastic': 3,
  'incredible': 3, 'magnificent': 3, 'outstanding': 3, 'perfect': 3, 'phenomenal': 3,
  'spectacular': 3, 'superb': 3, 'terrific': 3, 'tremendous': 3, 'wonderful': 3,
  'brilliant': 3, 'exceptional': 3, 'marvelous': 3, 'remarkable': 3, 'stellar': 3,
  'beautiful': 2, 'best': 2, 'delightful': 2, 'elegant': 2, 'enjoyable': 2,
  'exciting': 2, 'fabulous': 2, 'fun': 2, 'glorious': 2, 'gorgeous': 2,
  'graceful': 2, 'great': 2, 'happy': 2, 'impressive': 2, 'inspiring': 2,
  'joyful': 2, 'lovely': 2, 'magnificent': 2, 'nice': 2, 'pleasant': 2,
  'positive': 2, 'powerful': 2, 'refreshing': 2, 'satisfying': 2, 'splendid': 2,
  'stunning': 2, 'successful': 2, 'superior': 2, 'thrilling': 2, 'vibrant': 2,
  'accurate': 1, 'adequate': 1, 'affordable': 1, 'agreeable': 1, 'balanced': 1,
  'beneficial': 1, 'calm': 1, 'clean': 1, 'clear': 1, 'comfortable': 1,
  'convenient': 1, 'cool': 1, 'decent': 1, 'easy': 1, 'effective': 1,
  'efficient': 1, 'fair': 1, 'fast': 1, 'fine': 1, 'flexible': 1,
  'friendly': 1, 'glad': 1, 'good': 1, 'handy': 1, 'healthy': 1,
  'helpful': 1, 'honest': 1, 'ideal': 1, 'interesting': 1, 'kind': 1,
  'like': 1, 'love': 2, 'neat': 1, 'okay': 1, 'pretty': 1,
  'proper': 1, 'quality': 1, 'quick': 1, 'reasonable': 1, 'reliable': 1,
  'safe': 1, 'simple': 1, 'smart': 1, 'smooth': 1, 'solid': 1,
  'stable': 1, 'strong': 1, 'suitable': 1, 'useful': 1, 'valuable': 1,
  'recommend': 2, 'recommended': 2, 'worth': 1, 'worthy': 1, 'pleased': 2,
};

const NEGATIVE = {
  'abysmal': -3, 'appalling': -3, 'atrocious': -3, 'awful': -3, 'catastrophic': -3,
  'deplorable': -3, 'despicable': -3, 'destructive': -3, 'devastating': -3, 'dreadful': -3,
  'gruesome': -3, 'horrendous': -3, 'horrible': -3, 'horrific': -3, 'miserable': -3,
  'nightmarish': -3, 'outrageous': -3, 'repulsive': -3, 'terrible': -3, 'worst': -3,
  'abominable': -3, 'disgraceful': -3, 'disgusting': -3, 'pathetic': -3, 'revolting': -3,
  'annoying': -2, 'bad': -2, 'boring': -2, 'broken': -2, 'cheap': -2,
  'clumsy': -2, 'confusing': -2, 'costly': -2, 'damaged': -2, 'defective': -2,
  'disappointing': -2, 'disastrous': -2, 'dull': -2, 'expensive': -2, 'failing': -2,
  'faulty': -2, 'flawed': -2, 'frustrating': -2, 'hate': -2, 'inferior': -2,
  'irritating': -2, 'lousy': -2, 'mediocre': -2, 'nasty': -2, 'negative': -2,
  'offensive': -2, 'painful': -2, 'poor': -2, 'ridiculous': -2, 'rude': -2,
  'slow': -2, 'stupid': -2, 'ugly': -2, 'unacceptable': -2, 'unfair': -2,
  'unhappy': -2, 'unpleasant': -2, 'useless': -2, 'weak': -2, 'worthless': -2,
  'awkward': -1, 'bland': -1, 'cold': -1, 'complicated': -1, 'concern': -1,
  'difficult': -1, 'dirty': -1, 'dislike': -1, 'dumb': -1, 'flat': -1,
  'hard': -1, 'harsh': -1, 'heavy': -1, 'lack': -1, 'late': -1,
  'limited': -1, 'messy': -1, 'miss': -1, 'missing': -1, 'noisy': -1,
  'odd': -1, 'old': -1, 'plain': -1, 'rough': -1, 'sad': -1,
  'scary': -1, 'sick': -1, 'small': -1, 'sour': -1, 'stale': -1,
  'strange': -1, 'stuck': -1, 'tired': -1, 'tough': -1, 'trouble': -1,
  'uncomfortable': -1, 'unfortunate': -1, 'unwanted': -1, 'upset': -1, 'wrong': -1,
};

const INTENSIFIERS = new Set(['very', 'extremely', 'really', 'incredibly', 'absolutely', 'totally', 'completely', 'utterly', 'highly', 'remarkably', 'exceptionally', 'particularly', 'especially', 'seriously', 'genuinely']);
const NEGATORS = new Set(['not', 'never', 'no', 'neither', 'hardly', 'barely', 'scarcely', 'rarely', 'seldom', "don't", "doesn't", "didn't", "won't", "wouldn't", "couldn't", "shouldn't", "isn't", "aren't", "wasn't", "weren't"]);

const analyzeSentiment = (text) => {
  const words = text.toLowerCase().replace(/[^a-z'\s-]/g, '').split(/\s+/).filter(Boolean);
  const sentenceCount = (text.match(/[.!?]+/g) || []).length || 1;

  let totalScore = 0;
  const positiveWords = [];
  const negativeWords = [];
  let isNegated = false;
  let isIntensified = false;

  words.forEach((word) => {
    if (NEGATORS.has(word)) {
      isNegated = true;
      return;
    }
    if (INTENSIFIERS.has(word)) {
      isIntensified = true;
      return;
    }

    let score = POSITIVE[word] || NEGATIVE[word] || 0;

    if (score !== 0) {
      if (isIntensified) {
        score = score > 0 ? Math.min(score * 1.5, 3) : Math.max(score * 1.5, -3);
      }
      if (isNegated) {
        score = -score;
      }

      totalScore += score;

      if (score > 0) {
        positiveWords.push({ word, score });
      } else {
        negativeWords.push({ word, score });
      }
    }

    isNegated = false;
    isIntensified = false;
  });

  const maxPossible = words.length * 3 || 1;
  const normalized = Math.max(-1, Math.min(1, totalScore / maxPossible * 3));
  const magnitude = Math.abs(totalScore) / (words.length || 1);

  const sentiment = normalized > 0.05 ? 'positive' : normalized < -0.05 ? 'negative' : 'neutral';

  return {
    text: text.substring(0, 500),
    sentiment,
    score: Math.round(normalized * 1000) / 1000,
    magnitude: Math.round(magnitude * 1000) / 1000,
    wordCount: words.length,
    sentenceCount,
    positive: positiveWords.sort((a, b) => b.score - a.score).slice(0, 10),
    negative: negativeWords.sort((a, b) => a.score - b.score).slice(0, 10),
  };
};

app.get('/', (_req, res) => {
  res.json({
    name: 'Text Sentiment Analysis API',
    version: '1.0.0',
    endpoints: {
      'POST /analyze': 'Analyze sentiment of text (body: { text: "..." })',
      'POST /analyze/batch': 'Analyze multiple texts (body: { texts: [...] }, max 25)',
      'GET /health': 'Health check',
    },
  });
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/analyze', (req, res) => {
  const { text } = req.body;
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Request body must contain a "text" string' });
  }
  if (text.length > 10000) {
    return res.status(400).json({ error: 'Text must be 10,000 characters or fewer' });
  }
  res.json(analyzeSentiment(text));
});

app.post('/analyze/batch', (req, res) => {
  const { texts } = req.body;
  if (!texts || !Array.isArray(texts)) {
    return res.status(400).json({ error: 'Request body must contain a "texts" array' });
  }
  if (texts.length > 25) {
    return res.status(400).json({ error: 'Maximum 25 texts per batch request' });
  }
  const results = texts.map((t) => typeof t === 'string' ? analyzeSentiment(t) : { error: 'Invalid text' });
  res.json({ total: results.length, results });
});

app.listen(PORT, () => {
  console.log(`Text Sentiment Analysis API running on port ${PORT}`);
});
