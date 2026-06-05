import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button.jsx';
import logoblackpink from '../../assets/logoblackpink.png';
import axios from 'axios';
import constants from '../../constant';

function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data } = await axios.get(`${constants.HOST}/api/articles/${id}`);
        setArticle(data);
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  if (loading) return <div className="text-zinc-400 p-8">Loading...</div>;

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

          <h1 className="text-2xl font-bold text-pink-300 mb-2">{article.title}</h1>
          <p className="text-sm text-zinc-400 mb-6">By {article.author} · {article.category}</p>

          <p className="text-base leading-7 text-pink-300 whitespace-pre-wrap">
            {article.body}
          </p>

          <div className="mt-8 border-t-2 border-zinc-900 pt-6">
            <Button to="/articles">Back to Articles</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ArticlePage;