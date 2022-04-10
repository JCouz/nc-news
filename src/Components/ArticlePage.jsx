import timeAgo from "../utils";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as api from "../api";
import ArticleVoter from "./ArticleVoter";
import Comments from "./Comments";
import AddComment from "./AddComment";

export default function ArticlePage() {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [singleArticle, setSingleArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { title, body, topic, author, created_at, comment_count } = singleArticle;
  const [articleVotes, setArticleVotes] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    api.fetchArticlePage(article_id).then((article) => {
      setSingleArticle(article);
      setIsLoading(false);
      setArticleVotes(article.votes);
    });
  }, [article_id]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <section className="article-page m-3 py-2">
        <dl>
          <dt>
            <strong>{title}</strong>
          </dt>
          <ArticleVoter article_id={article_id} articleVotes={articleVotes} />

          <dt>{author}</dt>
          <dt>{body}</dt>
          <dt className="inner-text">{topic[0].toUpperCase() + topic.substring(1)}</dt>
          <dt className="inner-text">Created: {timeAgo.format(new Date(created_at))}</dt>
          <dt>Comments: {comment_count}</dt>
        </dl>
      </section>
      <section>
        <h3 id="comments-header">Comments</h3>
        <AddComment article_id={article_id} setComments={setComments} />

        <Comments comments={comments} setComments={setComments} article_id={article_id} />
      </section>
    </>
  );
}
