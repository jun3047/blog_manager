const axios = require("axios")
const schedule = require('node-schedule');
const cheerio = require("cheerio");

const updateRank = async ({ keywords }) => {
    schedule.scheduleJob('* 8 * * *', ()=>{

        keywords.map((keyword)=>{
            
            let date = new Date();
            date = date.toLocaleDateString('ko-kr');
            
            const title = req.body.title
            const titles = await parsing(keyword)
            const rank = titles.indexOf(title)+1

            try{
                db.collection('data').updateOne({title:title}, {$push: { data: {keyword: keyword, date: date, rank: rank}}})
            } catch (err){
                console.error(err);
                schedule.cancel();
            }
        })
    })
}


const parsing = async (keyword) => {
    const html = await getHTML(keyword);
    const $ = cheerio.load(html.data);
    const $list = $(".total_area")

    let titles = Array();

    $list.each((idx,node) => {
        const title = $(node).find('.total_tit').text();
        titles.push(title);
    })

    return titles
}

const getHTML = (keyword) => {
    try {
        return axios.get("https://search.naver.com/search.naver?query=" + encodeURI(keyword) + "&nso=&where=blog&sm=tab_opt")
    }catch(err) {
        console.error(err);
    }
}

module.exports = updateRank;