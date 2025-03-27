// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            nav: {
                home: 'Home',
                myBooks: 'My Books',
                events: 'Events',
                searchPlaceholder: 'Search...',
                loginRegister: 'Login/Register'
            },
            homePage: {
                welcome: 'Welcome to CozyRead Book Management!',
                newArrivals: 'New Arrivals',
                categoryAll: 'All',
                categoryLiterature: 'Literature',
                categoryFiction: 'Fiction',
                categoryHistory: 'History & Culture',
                categorySociety: 'Society',
                categoryScience: 'Science',
                categoryArt: 'Art & Design',
                categoryBusiness: 'Business',
                categoryComics: 'Comics',
                recentActivities: 'Recent Activities',
                hotLists: 'Hot Book Lists'
            },
            detailPage: {
                author: 'Author',
                publisher: 'Publisher',
                publishDate: 'Publication Date',
                pages: 'Pages',
                price: 'Price',
                binding: 'Binding',
                isbn: 'ISBN',
                summary: 'Summary',
                rating: 'Douban Rating'
            }
        }
    },
    zh: {
        translation: {
            nav: {
                home: '首页',
                myBooks: '我的书籍',
                events: '活动',
                searchPlaceholder: '搜索...',
                loginRegister: '登录/注册'
            },
            homePage: {
                welcome: '欢迎使用 CozyRead 图书管理平台！',
                newArrivals: '新书速递',
                categoryAll: '全部',
                categoryLiterature: '文学',
                categoryFiction: '小说',
                categoryHistory: '历史文化',
                categorySociety: '社会纪实',
                categoryScience: '科学',
                categoryArt: '艺术设计',
                categoryBusiness: '商业经管',
                categoryComics: '绘本漫画',
                recentActivities: '近期活动',
                hotLists: '热门书单'
            },
            detailPage: {
                author: '作者',
                publisher: '出版社',
                publishDate: '出版日期',
                pages: '页数',
                price: '定价',
                binding: '装帧',
                isbn: 'ISBN',
                summary: '内容简介',
                rating: '豆瓣评分'
            }
        }
    },
    ms: {
        translation: {
            nav: {
                home: 'Laman Utama',
                myBooks: 'Buku Saya',
                events: 'Acara',
                searchPlaceholder: 'Carian...',
                loginRegister: 'Log Masuk/Daftar'
            },
            homePage: {
                welcome: 'Selamat datang ke Platform Pengurusan Buku CozyRead!',
                newArrivals: 'Buku Baharu',
                categoryAll: 'Semua',
                categoryLiterature: 'Kesusasteraan',
                categoryFiction: 'Fiksyen',
                categoryHistory: 'Sejarah & Budaya',
                categorySociety: 'Masyarakat',
                categoryScience: 'Sains',
                categoryArt: 'Seni & Reka Bentuk',
                categoryBusiness: 'Perniagaan',
                categoryComics: 'Komik',
                recentActivities: 'Aktiviti Terkini',
                hotLists: 'Senarai Buku Popular'
            },
            detailPage: {
                author: 'Pengarang',
                publisher: 'Penerbit',
                publishDate: 'Tarikh Terbit',
                pages: 'Halaman',
                price: 'Harga',
                binding: 'Penjilidan',
                isbn: 'ISBN',
                summary: 'Ringkasan Kandungan',
                rating: 'Penilaian'
            }
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',    // 默认语言：英语
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
