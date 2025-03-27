// src/pages/BookDetailPage.jsx
import React from 'react';
// import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function BookDetailPage() {
    const { t } = useTranslation();
    // const { id } = useParams();

    // 模拟获取书籍详情
    // 真实项目中可用 useEffect + API fetch
    const bookDetail = {
        title: 'Old Objects',
        author: 'John Smith',
        publisher: 'ABC Publisher',
        publishDate: '2025-02',
        pages: 456,
        price: '$15.99',
        binding: 'Paperback',
        isbn: '9787505759992',
        cover: 'https://via.placeholder.com/120x160?text=DetailedCover',
        rating: 8.4,
        ratingCount: 64,
        summary: `In the era of consumerism, 
  let's reflect on the old path...`
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>{bookDetail.title}</h2>
            <div style={{ display: 'flex', marginTop: '20px' }}>
                {/* Left: Cover */}
                <div style={{ marginRight: '30px' }}>
                    <img src={bookDetail.cover} alt={bookDetail.title} style={{ width: '160px', height: '220px', border: '1px solid #ccc' }} />
                </div>

                {/* Right: Info */}
                <div>
                    <p><strong>{t('detailPage.author')}:</strong> {bookDetail.author}</p>
                    <p><strong>{t('detailPage.publisher')}:</strong> {bookDetail.publisher}</p>
                    <p><strong>{t('detailPage.publishDate')}:</strong> {bookDetail.publishDate}</p>
                    <p><strong>{t('detailPage.pages')}:</strong> {bookDetail.pages}</p>
                    <p><strong>{t('detailPage.price')}:</strong> {bookDetail.price}</p>
                    <p><strong>{t('detailPage.binding')}:</strong> {bookDetail.binding}</p>
                    <p><strong>{t('detailPage.isbn')}:</strong> {bookDetail.isbn}</p>

                    <p><strong>{t('detailPage.rating')}:</strong> {bookDetail.rating} <span style={{ color: '#666' }}>({bookDetail.ratingCount} reviews)</span></p>
                </div>
            </div>

            {/* Summary */}
            <div style={{ marginTop: '30px' }}>
                <h3>{t('detailPage.summary')}:</h3>
                <p style={{ whiteSpace: 'pre-line' }}>
                    {bookDetail.summary}
                </p>
            </div>
        </div>
    );
}

export default BookDetailPage;
