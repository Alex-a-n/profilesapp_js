// src/pages/HomePage.jsx
import React, {useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {get} from "aws-amplify/api";
import {fetchBooks} from "../hooks/fetchBooks.jsx";

function HomePage() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { titles, summaries, images} = fetchBooks()

    const newBookData = titles.slice(0, 10).map((title, index) => ({
        id: index + 1,
        title,
        summary: summaries[index],
        cover: images[index],
        cat: 'literature', // 默认分类，你可以根据需要替换
    }));
    console.log('response = ', newBookData);

    // ---------- 新书速递 ----------
    const catLinks = [
        { key: 'all', label: t('homePage.categoryAll') },
        { key: 'literature', label: t('homePage.categoryLiterature') },
        { key: 'fiction', label: t('homePage.categoryFiction') },
        { key: 'history', label: t('homePage.categoryHistory') },
        { key: 'society', label: t('homePage.categorySociety') },
        { key: 'science', label: t('homePage.categoryScience') },
        { key: 'art', label: t('homePage.categoryArt') },
        { key: 'business', label: t('homePage.categoryBusiness') },
        { key: 'comics', label: t('homePage.categoryComics') },
    ];
    const [selectedCat, setSelectedCat] = useState('all');
    /*const newBookData = [
        { id: 1, title: 'Book1', cover: 'https://via.placeholder.com/120x160?text=Book1', cat: 'literature' },
        { id: 2, title: 'Book2', cover: 'https://via.placeholder.com/120x160?text=Book2', cat: 'fiction' },
        { id: 3, title: 'Book3', cover: 'https://via.placeholder.com/120x160?text=Book3', cat: 'fiction' },
        { id: 4, title: 'Book4', cover: 'https://via.placeholder.com/120x160?text=Book4', cat: 'history' },
        { id: 5, title: 'Book5', cover: 'https://via.placeholder.com/120x160?text=Book5', cat: 'science' },
        { id: 6, title: 'Book6', cover: 'https://via.placeholder.com/120x160?text=Book6', cat: 'art' },
        { id: 7, title: 'Book7', cover: 'https://via.placeholder.com/120x160?text=Book7', cat: 'business' },
        { id: 8, title: 'Book8', cover: 'https://via.placeholder.com/120x160?text=Book8', cat: 'comics' },
        { id: 9, title: 'Book9', cover: 'https://via.placeholder.com/120x160?text=Book9', cat: 'history' },
        { id: 10, title: 'Book10', cover: 'https://via.placeholder.com/120x160?text=Book10', cat: 'literature' },
    ];*/
    const filteredBooks = selectedCat === 'all'
        ? newBookData
        : newBookData.filter(b => b.cat === selectedCat);

    // 点击书封面/标题 => 跳转详情
    const handleBookClick = (id) => {
        navigate(`/subject/${id}`);
    };

    // ---------- 读书活动(Reading Activities) ----------
    const readingCats = [
        { key: 'all', label: 'All' },
        { key: 'topics', label: 'Reading Topics' },
        { key: 'live', label: 'Live' },
        { key: 'qa', label: 'Q&A' },
        { key: 'group', label: 'Group Reading' },
        { key: 'club', label: 'Book Club' },
    ];
    const [selectedReadingCat, setSelectedReadingCat] = useState('all');

    const readingBannerData = [
        {
            title: '2025 Reading Marathon',
            image: 'https://via.placeholder.com/400x150?text=Reading+Marathon+Banner',
            date: '2025-02-27 ~ 03-24',
        },
        {
            title: 'Which New Books to Expect?',
            image: 'https://via.placeholder.com/400x150?text=New+Books+Banner',
            date: '2025-02-19 ~ 02-28',
        },
    ];

    // ---------- 热门图书榜(Hot Book Ranking) 2列 ----------
    const rankingCats = [
        { key: 'all', label: 'All' },
        { key: 'literature', label: 'Literature' },
        { key: 'fiction', label: 'Fiction' },
        { key: 'history', label: 'History & Culture' },
        { key: 'society', label: 'Society' },
        { key: 'science', label: 'Science' },
        { key: 'art', label: 'Art & Design' },
        { key: 'business', label: 'Business' },
    ];
    const [selectedRankCat, setSelectedRankCat] = useState('all');
    const hotBooks = [
        { rank: 1, title: 'Room in Rome', author: '[US] John Smith', rating: 8.2, cat: 'fiction' },
        { rank: 2, title: 'A Strange Life', author: '[JP] Taro Miura', rating: 8.4, cat: 'fiction' },
        { rank: 3, title: 'The Lighthouse Keeper', author: '[JP] Yuko Ito', rating: 8.3, cat: 'fiction' },
        { rank: 4, title: 'Spring in the Village', author: '[JP] Haruki Mura', rating: 8.0, cat: 'fiction' },
        { rank: 5, title: 'Blood & Honey', author: '[CN] Liu Zhao', rating: 8.8, cat: 'history' },
        { rank: 6, title: 'Sorrow with Love', author: '[CN] Zhang Tian', rating: 7.6, cat: 'fiction' },
        { rank: 7, title: 'Qin Dynasty Explanation', author: '[CN] Qin Mian', rating: 9.2, cat: 'history' },
    ];
    const filteredRanking = selectedRankCat === 'all'
        ? hotBooks
        : hotBooks.filter(b => b.cat === selectedRankCat);

    return (
        <div className="homepage">
            {/* 新书速递 */}
            <section className="home-section">
                <h3 className="section-title">{t('homePage.newArrivals')}</h3>
                <div className="category-links">
                    {catLinks.map(cat => (
                        <span
                            key={cat.key}
                            className={`cat-link ${selectedCat === cat.key ? 'active' : ''}`}
                            onClick={() => setSelectedCat(cat.key)}
                        >
              {cat.label}
            </span>
                    ))}
                </div>
                <div className="newbook-grid">
                    {filteredBooks.map(book => (
                        <div className="newbook-card" key={book.id}>
                            <img
                                src={book.cover}
                                alt={book.title}
                                onClick={() => handleBookClick(book.id)}
                            />
                            <p
                                className="book-title"
                                onClick={() => handleBookClick(book.id)}
                            >
                                {book.title}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 读书活动 */}
            <section className="home-section">
                <h3 className="section-title">Reading Activities</h3>
                <div className="category-links">
                    {readingCats.map(cat => (
                        <span
                            key={cat.key}
                            className={`cat-link ${selectedReadingCat === cat.key ? 'active' : ''}`}
                            onClick={() => setSelectedReadingCat(cat.key)}
                        >
              {cat.label}
            </span>
                    ))}
                </div>
                <div className="reading-activity-banners">
                    {readingBannerData.map((banner, idx) => (
                        <div className="reading-banner" key={idx}>
                            <img src={banner.image} alt={banner.title} />
                            <div className="banner-info">
                                <div className="banner-title">{banner.title}</div>
                                <div className="banner-date">{banner.date}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 热门图书榜 2列 */}
            <section className="home-section">
                <h3 className="section-title">Hot Book Ranking</h3>
                <div className="category-links">
                    {rankingCats.map(cat => (
                        <span
                            key={cat.key}
                            className={`cat-link ${selectedRankCat === cat.key ? 'active' : ''}`}
                            onClick={() => setSelectedRankCat(cat.key)}
                        >
              {cat.label}
            </span>
                    ))}
                </div>
                <div className="ranking-list">
                    {filteredRanking.map(book => (
                        <div className="ranking-item" key={book.rank}>
                            <span className="ranking-num">{book.rank}</span>
                            <div className="ranking-info">
                                <div className="ranking-title">{book.title}</div>
                                <div className="ranking-author">Author: {book.author}</div>
                                <div className="ranking-rating">Rating: {book.rating}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default HomePage;
