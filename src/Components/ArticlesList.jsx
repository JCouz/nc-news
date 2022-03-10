import * as api from '../api';
import { useState, useEffect } from 'react';
import ArticleCard from './ArticleCard';
import { useParams } from 'react-router-dom';

export default function ArticlesList() {
  const [articlesList, setArticlesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { topic } = useParams();
  console.log();
  useEffect(() => {
    setIsLoading(true);
    api.fetchArticles(topic).then((articles) => {
      setArticlesList(articles);
      setIsLoading(false);
    });
  }, [topic]);

  if (isLoading) return <p>Loading...</p>;
  return (
    <div id="article-list">
      {articlesList.map(({ article_id, title, topic, created_at, votes }) => {
        return (
          <ArticleCard
            key={article_id}
            article_id={article_id}
            title={title}
            topic={topic}
            votes={votes}
            created_at={created_at}
          />
        );
      })}
    </div>
  );
}

// in articleCard make title a link, link to params route
// route renders new component articlePage
// in article page, use params to get whichever article it came from
//  fetch api based on article id
// render whatever is required on that page
