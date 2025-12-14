// src/pages/News.jsx
import { useEffect, useState } from "react";
import { fetchContent } from "../services/api";

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent("news")
      .then(setNews)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center">กำลังโหลดข่าว...</p>;
  if (!news.length) return <p className="text-center">ยังไม่มีข่าว</p>;

  return (
    <div className="max-w-6xl mx-auto p-4 grid md:grid-cols-3 gap-6">
      {news.map(item => (
        <div key={item.id} className="bg-white rounded shadow">
          <img src={item.image} className="h-48 w-full object-cover" />
          <div className="p-4">
            <h3 className="font-bold">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
