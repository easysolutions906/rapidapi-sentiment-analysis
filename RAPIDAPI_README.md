**Spotlight:** Analyze English text sentiment with scores from -1 to +1. Detects positive/negative words, handles negation and intensifiers. Single and batch support.

Analyze the sentiment of any English text. Returns a score from -1 (negative) to +1 (positive), magnitude, and the specific positive/negative words detected. Handles negation and intensifiers.

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/analyze` | Analyze sentiment of a text string |
| POST | `/analyze/batch` | Analyze up to 25 texts at once |

### Quick Start

```javascript
const response = await fetch('https://text-sentiment-analysis.p.rapidapi.com/analyze', {
  method: 'POST',
  headers: {
    'x-rapidapi-key': 'YOUR_API_KEY',
    'x-rapidapi-host': 'text-sentiment-analysis.p.rapidapi.com',
    'content-type': 'application/json'
  },
  body: JSON.stringify({ text: 'This product is absolutely amazing and works perfectly!' })
});
const data = await response.json();
// { sentiment: "positive", score: 0.75, magnitude: 1.5, wordCount: 8, positive: [{ word: "amazing", score: 3 }, ...] }
```

### Rate Limits

| Plan | Requests/month | Rate |
|------|---------------|------|
| Basic (Pay Per Use) | Unlimited | 10/min |
| Pro ($9.99/mo) | 5,000 | 50/min |
| Ultra ($29.99/mo) | 25,000 | 200/min |
| Mega ($99.99/mo) | 100,000 | 500/min |
