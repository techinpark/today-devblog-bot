import * as blog from './blogs'

const parser = async() => {
    const content = await blog.parse()  
    return {
        blog: content
    }
}

export default parser 