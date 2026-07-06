/* ══════════════════════════════════════════════════════════════════
   연락처·채널 URL 중앙 관리
   채널을 바꿀 때 이 파일만 수정하면 전체 반영됩니다.
   ══════════════════════════════════════════════════════════════════ */

/** 기업 위챗 고객서비스 채널 (Chinese / General)
    ※ openBotProfile 형식 링크(韩国医疗观光顾问 BOT)는 企业微信 앱이 있어야만 열려서
      일반 고객용으로 쓸 수 없음 — kfid 형식(일반 위챗으로 열림)으로 되돌림 */
export const WECHAT_BIZ_URL = 'https://work.weixin.qq.com/kfid/kfcde7d9ec26f6b0df0'

/** WhatsApp — Dr. Alaa Eldin Elastel (Arabic / International, en/ar 페이지용) */
export const WHATSAPP_URL = 'https://wa.me/821077671903'

/** WhatsApp 전화번호 (표시용) */
export const WHATSAPP_PHONE = '+821077671903'

/** WhatsApp — 리디아님 번호 (zh/ko 페이지용) */
export const WHATSAPP_URL_OWNER = 'https://wa.me/821049033123'

/** WhatsApp 전화번호 (표시용, 리디아님) */
export const WHATSAPP_PHONE_OWNER = '+821049033123'

/** 언어에 맞는 WhatsApp 연결 URL 반환 — zh/ko는 리디아님, en/ar은 알라 박사님 번호로 연결됨 */
export function getWhatsappUrl(lang: string) {
  return lang === 'zh' || lang === 'ko' ? WHATSAPP_URL_OWNER : WHATSAPP_URL
}

/** 이가나 원장 이메일 (문의폼 일반) */
export const EMAIL_GENERAL = 'care@k-medispring.cn'

/** 알라딘 박사 이메일 (아랍어 문의폼) */
export const EMAIL_AR = 'Alaadin22@yahoo.co.kr'
