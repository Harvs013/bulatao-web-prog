import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import articles from '../assets/article-contents.js';
import logoblackpink from '../assets/logoblackpink.png';

function ArticlePage() {
  const { name } = useParams();
  const article = articles.find(article => article.name === name);

  if (!article) {
    return (
      <div className="flex w-full flex-col gap-6">
        <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold text-zinc-900">Article not found</h1>
            <Button to="/articles" className="mt-6">Back to Articles</Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-700 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4">
            <Button to="/articles">← Back to Articles</Button>
          </div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Article Details
          </p>
          <div className="flex justify-center mb-0">
            <img src={logoblackpink} alt="Blackpink Logo" className="w-40 h-40 object-contain" />
          </div>
          <p className="mt-2 font-bold text-sm text-pink-300">
            SCROLL DOWN FOR MORE DETAILS
          </p>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-700 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-3xl">
                      {article.image ? (
                        <img src={article.image} alt={article.title} className="w-full h-full max-h-[400px] object-contain rounded-[1.25rem] mb-8" />
                      ) : (
                        <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] border-2 border-zinc-900 bg-zinc-200 mb-8">
                          <div className="h-24 w-24 border-2 border-zinc-300 bg-zinc-100" />
                        </div>
                      )}

          <div className="prose prose-sm max-w-none space-y-4 text-zinc-700">
            {article.content.map((paragraph, index) => (
              <p key={index} className="text-base leading-7 text-pink-300 whitespace-pre-wrap">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 border-t-2 border-zinc-900 pt-6">
            <Button to="/articles">Back to Articles</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ArticlePage;