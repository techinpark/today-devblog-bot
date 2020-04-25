import * as core from '@actions/core' 
import parser from './parser'
import slack from './lib/slack'

(async () => {
    const WEBHOOKS = process.env.WEBHOOKS
    if(null == WEBHOOKS) throw new Error("⚠️ Github Secrets 에서 WEBHOOK 등록여부를 확인해주세요")

    const webhookList = WEBHOOKS.split(",")
    const parsed = await parser() 

    webhookList.map(async url => {

        // Slack webhook
        if(url.includes('hooks.slack.com')) {   
           await slack({
               data: parsed.blog,
               url,
           })
        }
    })

    console.log("✅ 성공적으로 슬랙에 전송되었습니다.")
})().catch(e => {
    console.log(e)
    core.setFailed(e)
})