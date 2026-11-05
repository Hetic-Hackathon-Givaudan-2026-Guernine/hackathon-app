type Health = { status: string; db: string };
type Question = { id: number; question: string; answer: string };

const healthElement = document.querySelector<HTMLElement>('#health');
const questionsElement = document.querySelector<HTMLUListElement>('#questions');

if (!healthElement || !questionsElement) {
  throw new Error('The page is missing the health or questions element');
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${url} returned HTTP ${response.status}`);
  }
  return response.json() as Promise<T>;
}

async function refresh() {
  try {
    const health = await fetchJson<Health>('/api/health');
    healthElement.textContent = `API OK · ${health.db}`;

    const questions = await fetchJson<Question[]>('/api/questions');
    questionsElement.replaceChildren(
      ...questions.map((question) => {
        const item = document.createElement('li');
        item.textContent = `${question.question} → ${question.answer}`;
        return item;
      }),
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    healthElement.textContent = `Connexion impossible · ${message}`;
    questionsElement.replaceChildren();
  }
}

void refresh();
