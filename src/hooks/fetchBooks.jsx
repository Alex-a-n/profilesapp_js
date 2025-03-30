import {useEffect, useState} from 'react';
import { get } from 'aws-amplify/api';

export function fetchBooks() {
    const [titles, setTitles] = useState([]);
    const [summaries, setSummaries] = useState([]);
    const [images, setImages] = useState([]);

    async function fetchBooks() {
        try {
            const restOperation = get({
                apiName: 'myRestApi',
                path: 'books'
            });
            const response = await restOperation.response;
            const { body } = await restOperation.response;
            const books = await body.json();

            console.log('response = ', books);
            console.log('response = ', books.type);

            // 分别提取字段
            const titleList = books.map(book => book.title);
            const summaryList = books.map(book => book.summary);
            const imageList = books.map(book => book.image_url);


            setTitles(titleList);
            setSummaries(summaryList);
            setImages(imageList);

            console.log('GET call succeeded: ', response);
        } catch (error) {
            console.log('GET call failed: ', error);
        }
    }


    useEffect(() => {
        (async () => {
            await fetchBooks();
        })();
    }, []);


    return { titles, summaries, images };

}