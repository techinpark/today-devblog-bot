import axios from 'axios'

interface Contents {
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
}

interface slackArgs {
    data: Contents[],
    url: string
}

export default async({data, url}: slackArgs) => {
    const today = new Date().toLocaleDateString().replace(/\. /g, '-').replace('.', '')
    const count = data.length
    let markdown: string = ""

    let message: any = {
        attachments: [], 
    }
    
    data.forEach(function(item){
        markdown += item.markdown + "\n"
    })

    if(count <= 0) {
        return 
    }

    message.attachments.push({
        pretext: `오늘 *${count}* 개의 새로운 블로그 글이 있어요`,

        fields: [
            {
                type:'mrkdwn',
                title: '',
                value: markdown,
            }, 
        ],
        footer: 'Github - today-devblog-bot'
    })


    await axios.post(url, message)
}