/**
 * @description 纯文本模板-企业微信消息通知
 * https://open.work.weixin.qq.com/api/doc/90000/90135/90236
 */

import dayjs, { weekToday } from '../../../utils/dayjs'

export const textTemplate = (data: TextTemplateProps) => {
  const { caiHongpi, sayLove, songLyrics, oneMagazines, netEaseCloud, oneWord, dayEnglish ,joke} = data

  let text = '早安呀，鱼崽崽~\n'

  // 工作日/休息日，需要排除节假日
//   const week = weekToday()
//   if (['星期六', '星期日'].includes(week)) {
//     text += `
// 如果我鱼崽崽已经起床啦！崽崽向你说早安呦~，记得吃早饭呀😆\n
// 嗯哼哼~今天可是${week}哦，上班别迟到了哦~`
//   }
//   else {
//     text += `
// 如果我鱼崽崽还没起床呀！崽崽就等着鱼崽起床给我说早安呦🤣
// 嗯哼~，既然今天是${week}，就让你再睡会懒觉~下次可不能啦~😝\n`
//   }

  // 添加笑话
  if (caiHongpi) {
    //     text += `
    // 彩虹屁：
    text += `
${caiHongpi.content}\n`
  }

  if (sayLove) {
    text += `
${sayLove.content}\n`
  }

  // 诗句
  if (songLyrics) {
    text += `
『${songLyrics.source}』${songLyrics.content}\n`
  }

  if (oneMagazines) {
    text += `
『ONE杂志』${oneMagazines.word}\n`
  }

  if (netEaseCloud) {
    text += `
『网易云音乐热评』${netEaseCloud.content}——${netEaseCloud.source}\n`
  }

  // 添加一句一言
  if (oneWord) {
    text += `
『一言』${oneWord.hitokoto}\n`
  }

  // 每日英语
  if (dayEnglish) {
    text += `
『每日英语 ${dayjs(dayEnglish.date).format('ll')}』${dayEnglish.content}\n`
  }
  //笑话
  if(joke){
    text += '\n笑一笑，十年少，开心一刻喽:\n请欣赏以下『雷人笑话』😝\n'
    text += ` ${joke.map(n => `『${n.title}』${n.content}`).join('\n\n')}`
  }
  return {
    msgtype: 'text',
    text: {
      content: text,
    },
  }
}
