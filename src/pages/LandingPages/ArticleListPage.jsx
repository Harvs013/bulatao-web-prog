import { useState, useEffect } from "react";
import Button from "../../components/Button.jsx";
import ArticleList from "../../components/ArticleList.jsx";
import { fetchArticles } from "../../service/articleService";
import coverbp from '../../assets/coverbp.jpg';

const ArticleListPage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const { data } = await fetchArticles();
        setArticles(data); // data is already an array
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    loadArticles();
  }, []);

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-pink-300 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Articles
        </p>
        <img src={coverbp} alt="BLACKPINK" className="mb-2 w-full h-full max-h-[400px] object-cover rounded-2xl" />
        <div className="flex justify-center">
          <p className="mt-4 max-w-lg text-sm leading-7 tracking-[0.28em] text-zinc-700 sm:text-base text-center">
            What's happening with Pinks?
          </p>
        </div>
        <div className="mt-6">
          <Button to="/">Back Home</Button>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-pink-300 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Featured Articles
          </p>
        </div>
        <ArticleList articles={articles} />
      </section>
    </div>
  );
};

export default ArticleListPage;