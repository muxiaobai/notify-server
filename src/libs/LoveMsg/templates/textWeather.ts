/**
 * @description 文本卡片模板 title + description
 * https://open.work.weixin.qq.com/api/doc/90000/90135/90236
 */

/**
 * 卡片类型模板定义
 * 模板内容配置
 * 微信通知 textcard类型的description内容限制512个字节
 */

import dayjs from '../../../utils/dayjs'
import { getConfig } from '../../../utils/getConfig'

const CONFIG = getConfig().loveMsg
export const textWeatherTemplate = (data: IEWeatherResponse,lunarInfo:ResLunarDateProps) => {
  const {
    /** 预测 */
  forecast,
  /** 城市 */
  city,
  /** 温度 */
  wendu,
  /** 提醒 */
  ganmao,
  } = data

  // 今日、恋爱天数
  const today =  new Date()//`${date.replace('-', '年').replace('-', '月')}日`
  const dateLength = dayjs('2022-04-15').diff(CONFIG.start_stamp, 'day')

  // 拼接内容
  // let description = `${city} | ${today} | ${week}`
  let description = `${city} | ${today} `

  if (CONFIG.date_lunarInfo && lunarInfo) {
    const { festival, lunar_festival, jieqi, lubarmonth, lunarday } = lunarInfo
    // 公历节日、农历节日和二十四节气
    const festival_info = festival ? `| ${festival}` : ''
    const lunar_festival_info = lunar_festival ? `| ${lunar_festival}` : ''
    const jieqi_info = jieqi ? `| ${jieqi}` : ''

    description += ` ${festival_info}
农历 | ${lubarmonth}${lunarday} ${lunar_festival_info} ${jieqi_info}`
  }

//   description += `\n今日天气状况：
// 天气：${weather}
// ${wind}：${windsc}
// 温度：${wendu}\n`

//   if (weather.includes('雨')) {
//     description += `降雨概率：${pop}%
// 降雨量：${pcpn}mm\n`
//   }


  // 最高温度
  if ( wendu && +wendu <= 5) {
    description += `
哈喽哈喽~这里是来自${CONFIG.boy_name}的爱心提醒哦：
今日最高温度仅为🥶 ${wendu}，可冷可冷了~
${CONFIG.girl_name}可要注意保暖哦~\n`
  }
  else if ( wendu && +wendu <= 20) {
    description += `
哈喽哈喽~这里是来自${CONFIG.boy_name}的爱心提醒哦：
今日最高温度仅为🥶 ${wendu}，有些凉爽了~
${CONFIG.girl_name}可要注意加外套哦~\n`

  }
  else if ( wendu && +wendu >= 28) {
    description += `
哈喽哈喽~这里是来自${CONFIG.boy_name}的爱心提醒哦：
今日最高温度已经超过 ${wendu}，开始热起来了~
${CONFIG.girl_name}可以吃西瓜，喝加冰奶茶哦~\n`
  }else{
    description += `
哈喽哈喽~这里是来自${CONFIG.boy_name}的爱心提醒哦：
今日温度是 ${wendu}，非常温暖了~
${CONFIG.girl_name}可以外出玩耍哦~\n`
}
  // 生活指数提示
  if (ganmao) {
    description += `另外:${ganmao}\n`
  }
  //   if (air_tips) {
  //     description += `
  // 出行建议：${air_tips}`
  //   }

  //   if (oneWord) {
  //     description += `
  // 『 ${oneWord.hitokoto} 』`
  //   }

  // 内容末尾，自定义
  description += `
  [ 点我有惊喜 ] ❤️ 🧡 💛 💚 💖`

  const title = `这是我们相识的第 ${dateLength} 天`

  return {
    msgtype: 'textcard',
    textcard: {
      title,
      description,
      //   url: 'https://api.lovelive.tools/api/SweetNothings',
      //   url: 'https://v1.jinrishici.com/all.svg',
      url: `${CONFIG.card_url}`, // 60s看世界
      btntxt: `By Dear ${CONFIG.boy_name}`,
    },
  }
}
