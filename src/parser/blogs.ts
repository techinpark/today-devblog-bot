import axios from 'axios'
import cheerio from 'cheerio'
import moment from 'moment'
import config from '../config.json'


export interface Contents {
    _id: string
    title: string
    link: string
    date: Date
    description: string
    author: string
    imgUrl: string
    tags: [string]
    count: string
    markdown: string
}[];

export const parse = async () => {
    const baseURL = `${config.base_url}?sort=${config.sort}&page=${config.page}&size=${config.size}&tags=${encodeURI(config.tags.join(","))}`
    console.log(baseURL)
    const response = await axios.get(baseURL)
    const data = response.data
    const obj: [Contents] = response.data.data
    const yesterday = moment().subtract(1, 'day')
    type contentType = Contents
    const contents: contentType[] = []

    console.log(yesterday.toString())

    obj.forEach(function (item) {
        const item_date = moment(item.date);
        if (yesterday.isSame(item_date, 'day')) {
            item.markdown = "*" + " " + `<${item.link}|${item.title}>` + " by " + item.author
            contents.push(item)
        }
    });

    console.log('✅ 블로그글 파싱 완료')
    return contents
}