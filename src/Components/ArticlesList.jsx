import * as api from "../api";
import { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { ArrowDownCircle, ArrowUpCircle } from "react-feather";

export default function ArticlesList() {
  const [articlesList, setArticlesList] = useState([]);
  const [topicsList, setTopicsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [topic, setTopic] = useState();
  const [sort_by, setSortBy] = useState();
  const [order, setOrder] = useState();

  useEffect(() => {
    setIsLoading(true);

    api.fetchTopics().then((topics) => {
      setTopicsList(topics);
    });

    api.fetchArticles(topic, sort_by, order).then((articles) => {
      setArticlesList(articles);
    });

    setIsLoading(false);
  }, [topic, sort_by, order]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div id="article-list">
      <Container>
        <Row className="topic-sorter-box">
          <Col>
            <Stack direction="horizontal" gap={3}>
              <div forecolor="white">Topic:</div>
              <select className="topic-sorter" value={topic} onChange={(e) => setTopic(e.target.value)}>
                <option value="">All</option>
                {topicsList.map((t, index) => (
                  <option key={index} value={t.slug}>
                    {t.slug}
                  </option>
                ))}
              </select>
              <div forecolor="white">Sort by:</div>
              <select className="topic-sorter" value={sort_by} onChange={(e) => setSortBy(e.target.value)}>
                <option value="">Date/Time</option>
                <option value="title">Title</option>
                <option value="topic">Topic</option>
                <option value="author">Author</option>
                <option value="votes">Votes</option>
              </select>
              <Button variant="outline-danger" size="sm" onClick={() => setOrder("ASC")}>
                <ArrowUpCircle />
              </Button>
              <Button variant="outline-danger" size="sm" onClick={() => setOrder("DESC")}>
                <ArrowDownCircle />
              </Button>
            </Stack>
          </Col>
        </Row>

        {articlesList.map(({ article_id, title, topic, created_at, votes }) => {
          return (
            <Row>
              <Col>
                <ArticleCard
                  key={article_id}
                  article_id={article_id}
                  title={title}
                  topic={topic}
                  votes={votes}
                  created_at={created_at}
                />
              </Col>
            </Row>
          );
        })}
      </Container>
    </div>
  );
}
