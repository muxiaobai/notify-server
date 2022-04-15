/**
 * @name goodMorning
 * @description 说早安
 */
import API from '../../api/loveMsg'
import dayjs from '../../utils/dayjs'
import { getConfig } from '../../utils/getConfig'
import { wxNotify } from '../WxNotify'
import { textTemplate } from './templates/text'
import { textCardTemplate } from './templates/textcard'
import { textWeatherTemplate } from './templates/textWeather'

const CONFIG = getConfig().loveMsg

// 美丽短句
const goodWord = async () => {
  try {
    // 并行请求，优响相应
    const dataSource = await Promise.allSettled([
      API.getSaylove(), // 土味情话
      API.getCaihongpi(), // 彩虹屁
      API.getOneWord(), // 一言
      API.getSongLyrics(), // 最美宋词
      API.getOneMagazines(), // one杂志
      API.getNetEaseCloud(), // 网易云热评
      API.getDayEnglish(), // 每日英语
      API.getJoke(),
    ])

    // 过滤掉异常数据
    const [sayLove, caiHongpi, oneWord, songLyrics, oneMagazines, netEaseCloud, dayEnglish,joke] =
      dataSource.map((n) => (n.status === 'fulfilled' ? n.value : null))

    // 对象写法
    const data: any = {
      sayLove,
      caiHongpi,
      oneWord,
      songLyrics,
      oneMagazines,
      netEaseCloud,
      dayEnglish,
      joke,
    }

    const template = textTemplate(data)

    console.log('goodWord', template)

    wxNotify(template)
  } catch (error) {
    console.log('goodWord:err', error)
  }
}

// 天气信息
const eWeatherInfo = async () => {
  try {
    const weather = await API.getEWeather(CONFIG.city_name)
    if (weather) {
      const lunarInfo = await API.getLunarDate(dayjs(new Date()).format("YYYY-MM-DD"))
      const template = textWeatherTemplate(weather,lunarInfo)
      console.log('eweatherInfo', template)

      // 发送消息
      await wxNotify(template)
    }
  } catch (error) {
    console.log('eweatherInfo:err', error)
  }
}
// 天气信息
const weatherInfo = async () => {
  try {
    const weather = await API.getWeather(CONFIG.city_name)
    if (weather) {
      const lunarInfo = await API.getLunarDate(weather.date)
      const template = textCardTemplate({ ...weather, lunarInfo })
      console.log('weatherInfo', template)

      // 发送消息
      await wxNotify(template)
    }
  } catch (error) {
    console.log('weatherInfo:err', error)
  }
}
const goodJoke = async ()  => {
  const res = await API.getJoke()

  let text = '笑一笑，十年少，开心一刻喽:\n'

  text += `
请欣赏以下雷人笑话😝\n`

  text += `
${res.map(n => `『${n.title}』${n.content}`).join('\n\n')}`

  const template = {
    msgtype: 'text',
    text: {
      content: text,
    },
  }

  await wxNotify(template)
}
// goodMorning
export const goodMorning = async () => {
  await goodWord()
  await goodJoke()
  await eWeatherInfo()
  // await weatherInfo()
}
