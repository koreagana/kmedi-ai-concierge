import { AppProvider } from '../contexts/AppContext'
import type { LangCode } from '../data/translations'
import NavBar from './NavBar'
import { FooterSection } from './HomePage'

interface PrivacySection {
  heading: string
  paragraphs: string[]
  contactList?: { label: string; value: string }[]
  transferItems?: { title: string; lines: string[] }[]
  closingParagraphs?: string[]
}

interface PrivacyContent {
  pageTitle: string
  title: string
  intro: string[]
  effectiveDate: string
  sections: PrivacySection[]
  lastUpdated: string
}

const CONTENT: Record<LangCode, PrivacyContent> = {
  zh: {
    pageTitle: '个人信息处理方针 · 汉江春天',
    title: '个人信息处理方针',
    intro: [
      '汉江春天（K-MediSpring，以下简称"本机构"）重视用户的个人信息，并依据韩国《个人信息保护法》等相关法律法规制定本个人信息处理方针。',
      '本机构仅在韩国医疗咨询、医疗机构推荐、预约及外国患者接待服务所必要的范围内处理个人信息。',
    ],
    effectiveDate: '生效日期：2026年9月14日',
    sections: [
      {
        heading: '1. 个人信息的处理目的',
        paragraphs: [
          '本机构可能基于以下目的处理必要的个人信息：',
          '韩国医疗咨询及咨询回复；根据顾客需求推荐适合的医疗机构；医疗机构预约、预约变更及就诊协调；就诊前后的必要沟通及客户服务；外国患者接待业务管理；法律法规要求的相关业务处理。',
          '本机构不会将个人信息用于上述目的以外的用途。如处理目的发生变更，将依法采取必要措施。',
        ],
      },
      {
        heading: '2. 处理的个人信息项目',
        paragraphs: [
          '一般咨询过程中可能处理的信息包括姓名或称呼、国籍、联系方式、微信等联系方式、希望就诊的项目、希望就诊日期及咨询内容。',
          '当医疗咨询确有必要时，可能另外处理健康状况、既往治疗或手术经历、正在服用的药物、过敏信息、检查资料、医疗相关照片等敏感信息。',
          '对于健康信息、照片、检查资料等敏感信息，本机构将在必要时另行告知相关内容并取得相应同意。',
          '护照号码或护照复印件等信息仅在预约、身份确认等业务确有必要且具备合法处理依据的情况下处理。',
        ],
      },
      {
        heading: '3. 个人信息的保存及使用期限',
        paragraphs: [
          '本机构原则上仅在达到个人信息处理目的所需的期间内保存个人信息，并在目的达成后及时删除或销毁。',
          '医疗咨询及患者协调业务相关资料，为妥善处理可能发生的纠纷及回应客户咨询，原则上可保存至相关服务结束后1年。',
          '但法律法规规定必须保存一定期间的，将按照相关法律规定的期限保存。',
        ],
      },
      {
        heading: '4. 向医疗机构提供个人信息',
        paragraphs: [
          '为进行医疗咨询或预约，本机构可能在取得顾客同意后，将必要的信息提供给顾客选择或同意咨询的韩国医疗机构。',
          '提供的信息可能包括姓名、联系方式、国籍、预约信息、希望就诊项目，以及在医疗咨询必要范围内的健康信息、照片或检查资料。',
          '实际提供个人信息前，本机构将向顾客告知接收方医疗机构、提供目的、提供的信息项目及保存期限等事项，并在必要时取得同意。',
          '未经本人同意，本机构不会任意向其他第三方出售或提供个人信息，但法律法规另有规定的情况除外。',
        ],
      },
      {
        heading: '5. 个人信息跨境传输',
        paragraphs: [
          '为提供医疗咨询、患者协调及相关服务，本机构可能通过境外服务提供商处理或存储部分个人信息。',
        ],
        transferItems: [
          {
            title: '(1) WeChat（微信）',
            lines: [
              '接收方： WeChat / Tencent相关服务提供商',
              '可能涉及的国家或地区： 根据WeChat服务的实际数据处理架构而定',
              '传输的信息： 姓名或称呼、联系方式、咨询内容，以及用户主动提供的照片、检查资料或其他相关信息',
              '传输时间及方式： 用户通过WeChat进行咨询或发送资料时，通过网络实时传输',
              '使用目的： 医疗咨询、沟通、预约及患者协调',
              '保存期限： 本机构原则上保存至相关服务结束后1年；WeChat服务提供商可能依据其隐私政策另行保存相关数据。',
              '拒绝方式及影响： 用户可选择不通过WeChat提供个人信息；但部分在线咨询、资料传递或预约协调服务可能受到限制',
            ],
          },
          {
            title: '(2) Notion',
            lines: [
              '接收方： Notion Labs, Inc.',
              '传输国家： 美国',
              '传输的信息： 患者姓名、联系方式、咨询及预约信息，以及业务管理所需的其他必要信息',
              '传输时间及方式： 本机构将患者协调信息录入Notion时，通过网络传输并存储',
              '使用目的： 患者咨询、预约及业务记录管理',
              '保存期限： 原则上至相关服务结束后1年',
              '拒绝方式及影响： 用户可拒绝相关境外处理，但可能导致部分患者协调或记录管理服务受到限制',
            ],
          },
        ],
        closingParagraphs: [
          '对于涉及健康信息、医疗照片、检查资料等敏感信息的跨境处理，本机构将在必要时另行告知并取得相应同意。',
        ],
      },
      {
        heading: '6. 微信等外部平台咨询',
        paragraphs: [
          '顾客可通过本机构网站所连接的微信（WeChat）等外部服务进行咨询。',
          '仅进行一般咨询时，无需预先提供详细的医疗资料。',
          '如咨询过程中需要提供健康信息、医疗照片、检查结果或其他敏感信息，本机构将根据实际需要另行进行个人信息及敏感信息相关告知和同意程序。',
          '微信等外部服务本身的数据处理方式可能适用相应服务提供商的隐私政策。',
        ],
      },
      {
        heading: '7. 个人信息的删除及销毁',
        paragraphs: [
          '达到处理目的或保存期限届满后，本机构将及时销毁不再需要的个人信息。',
          '电子文件将以无法恢复的方式删除，纸质文件将通过碎纸或其他安全方式销毁。',
        ],
      },
      {
        heading: '8. 用户的权利',
        paragraphs: [
          '用户可以依法请求查询、更正、删除个人信息，要求停止处理或撤回同意。',
          '希望行使上述权利时，可通过电子邮件或电话联系本机构。',
          '但根据韩国法律法规必须保存的信息，在法定保存期间内可能无法立即删除。',
        ],
      },
      {
        heading: '9. 个人信息安全保护措施',
        paragraphs: [
          '本机构采取必要的管理和技术措施保护个人信息，包括限制个人信息访问权限、仅允许业务所需人员访问、管理电子资料及账号密码、定期整理不再需要的资料，以及发生异常情况时及时采取应对措施。',
        ],
      },
      {
        heading: '10. 14岁以下用户',
        paragraphs: [
          '如需处理14岁以下儿童的个人信息，本机构将依法确认其法定代理人，并在需要时取得法定代理人的同意。',
        ],
      },
      {
        heading: '11. 个人信息保护负责人及联系方式',
        paragraphs: [
          '有关个人信息处理、查询、更正、删除、投诉或其他个人信息保护事项，可通过上述联系方式与我们联系。',
        ],
        contactList: [
          { label: '机构名称', value: '汉江春天（K-MediSpring）' },
          { label: '负责人', value: 'LEE GANA' },
          { label: '电子邮箱', value: 'care@kmedispring.com' },
          { label: '电话', value: '+82-70-8880-3123' },
          { label: '地址', value: '韩国首尔特别市城北区三阳路29号 3层11室' },
        ],
      },
      {
        heading: '12. 个人信息处理方针的变更',
        paragraphs: [
          '如因法律法规、服务内容或个人信息处理方式发生变化而修改本方针，本机构将在网站上公布变更内容及生效日期。',
        ],
      },
    ],
    lastUpdated: '最后更新：2026年9月18日',
  },
  en: {
    pageTitle: 'Privacy Policy · K-MediSpring',
    title: 'Privacy Policy',
    intro: [
      'K-MediSpring ("we," "our," or "K-MediSpring") respects the privacy of its users and processes personal information in accordance with the Personal Information Protection Act of the Republic of Korea and other applicable laws.',
      'We process only the personal information necessary to provide Korean medical consultation, medical institution referral, appointment coordination, and foreign patient support services.',
    ],
    effectiveDate: 'Effective Date: September 14, 2026',
    sections: [
      {
        heading: '1. Purpose of Processing Personal Information',
        paragraphs: [
          'We may process personal information for the following purposes:',
          "Responding to inquiries regarding medical services in Korea; recommending medical institutions based on the patient's needs; coordinating appointments and schedule changes; communicating information necessary before and after a medical visit; providing customer support; managing foreign patient coordination services; and fulfilling applicable legal obligations.",
          'Personal information will not be used for purposes unrelated to those described above unless appropriate legal measures are taken.',
        ],
      },
      {
        heading: '2. Personal Information We Process',
        paragraphs: [
          'For general consultations, we may process information such as name or preferred name, nationality, contact information, WeChat or other contact details, requested medical service, preferred appointment date, and consultation details.',
          'When necessary for medical consultation, we may also process sensitive information, including health conditions, previous treatments or surgeries, medications, allergies, examination results, and medical-related photographs.',
          'When health information, photographs, examination results, or other sensitive information is required, we will provide appropriate notice and obtain consent where required.',
          'Passport numbers or copies of passports will only be processed when genuinely necessary for purposes such as appointment coordination or identity verification and where an appropriate legal basis exists.',
        ],
      },
      {
        heading: '3. Retention Period',
        paragraphs: [
          'We retain personal information only for as long as necessary to fulfill the purposes for which it was processed.',
          'Information related to medical consultation and patient coordination may generally be retained for one year after completion of the relevant service, for the purpose of resolving potential disputes and responding to customer inquiries.',
          'Where applicable law requires a longer retention period, the information will be retained for the period required by law.',
        ],
      },
      {
        heading: '4. Provision of Personal Information to Medical Institutions',
        paragraphs: [
          "With the patient's consent, we may provide necessary personal information to a Korean medical institution selected by or consulted with the patient for medical consultation or appointment purposes.",
          "Such information may include the patient's name, contact information, nationality, appointment information, requested medical service, and, where necessary, relevant health information, photographs, or examination records.",
          'Before providing personal information, we will provide information regarding the recipient medical institution, purpose of provision, categories of information provided, and applicable retention period, and obtain consent where required.',
          'We do not sell or arbitrarily disclose personal information to unrelated third parties without consent, except where permitted or required by law.',
        ],
      },
      {
        heading: '5. Cross-Border Transfer of Personal Information',
        paragraphs: [
          'To provide medical consultation, patient coordination, and related services, K-MediSpring may process or store certain personal information through overseas service providers.',
        ],
        transferItems: [
          {
            title: '(1) WeChat',
            lines: [
              'Recipient: WeChat / related Tencent service providers',
              "Country or region involved: Determined by WeChat's actual data processing architecture",
              'Information transferred: Name or preferred name, contact information, consultation content, and any photographs, examination materials, or other information voluntarily provided by the user',
              'Timing and method of transfer: Transmitted in real time over the network when the user consults or sends materials via WeChat',
              'Purpose of use: Medical consultation, communication, appointment coordination, and patient coordination',
              "Retention period: In principle, we retain this information until one year after completion of the relevant service; the WeChat service provider may separately retain related data in accordance with its own privacy policy",
              'Method and effect of refusal: Users may choose not to provide personal information through WeChat; however, this may limit certain online consultation, material transfer, or appointment coordination services',
            ],
          },
          {
            title: '(2) Notion',
            lines: [
              'Recipient: Notion Labs, Inc.',
              'Country of transfer: United States',
              'Information transferred: Patient name, contact information, consultation and appointment information, and other information necessary for business management',
              'Timing and method of transfer: Transmitted over the network and stored when K-MediSpring enters patient coordination information into Notion',
              'Purpose of use: Patient consultation, appointment, and business record management',
              'Retention period: In principle, one year after completion of the relevant service',
              'Method and effect of refusal: Users may refuse this overseas processing, but doing so may limit certain patient coordination or record management services',
            ],
          },
        ],
        closingParagraphs: [
          'For cross-border processing involving health information, medical photographs, examination records, or other sensitive information, we will provide separate notice and obtain consent where required.',
        ],
      },
      {
        heading: '6. Consultations Through WeChat and Other External Platforms',
        paragraphs: [
          'Users may contact us through external services such as WeChat linked from our website.',
          'Detailed medical information is not required for a general inquiry.',
          'If health information, medical photographs, examination results, or other sensitive information becomes necessary during consultation, we will provide the relevant privacy notice and obtain any required consent before further processing.',
          'The processing of information by WeChat or other external services may also be subject to the privacy policies of the respective service providers.',
        ],
      },
      {
        heading: '7. Deletion and Destruction of Personal Information',
        paragraphs: [
          'Personal information that is no longer required after the processing purpose has been fulfilled or the retention period has expired will be securely deleted or destroyed without undue delay.',
          'Electronic records are deleted using methods designed to prevent recovery, and paper documents are destroyed by shredding or another secure method.',
        ],
      },
      {
        heading: '8. Your Rights',
        paragraphs: [
          'You may request access to, correction of, deletion of, or restriction of processing of your personal information, and may withdraw consent where applicable.',
          'Requests may be submitted by email or telephone using the contact information below.',
          'Where retention is required by applicable law, certain information may not be immediately deleted until the required retention period has expired.',
        ],
      },
      {
        heading: '9. Security Measures',
        paragraphs: [
          'We implement reasonable administrative and technical safeguards to protect personal information, including limiting access to personnel who require it for their work, controlling access to electronic files and accounts, managing passwords and access rights, regularly removing unnecessary information, and maintaining procedures for responding to privacy incidents.',
        ],
      },
      {
        heading: '10. Children Under the Age of 14',
        paragraphs: [
          "Where personal information of a child under the age of 14 must be processed, we will verify the child's legal representative and obtain the representative's consent where required by applicable law.",
        ],
      },
      {
        heading: '11. Privacy Contact',
        paragraphs: [
          'For questions, requests, complaints, or other matters concerning your personal information, please contact us using the information above.',
        ],
        contactList: [
          { label: 'Organization', value: 'K-MediSpring' },
          { label: 'Representative', value: 'LEE GANA' },
          { label: 'Email', value: 'care@kmedispring.com' },
          { label: 'Telephone', value: '+82-70-8880-3123' },
          { label: 'Address', value: '3F, Room 11, 29 Samyang-ro, Seongbuk-gu, Seoul, Republic of Korea' },
        ],
      },
      {
        heading: '12. Changes to This Privacy Policy',
        paragraphs: [
          'If this Privacy Policy is revised due to changes in applicable law, our services, or our personal information processing practices, the revised policy and its effective date will be posted on our website.',
        ],
      },
    ],
    lastUpdated: 'Last Updated: September 18, 2026',
  },
}

export default function PrivacyPage({ lang }: { lang: LangCode }) {
  const c = CONTENT[lang]

  return (
    <AppProvider initialLang={lang}>
      <div dir="ltr">
        <NavBar />

        <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 20px 60px' }}>
          <p className="section-title" style={{ textAlign: 'center' }}>{c.title}</p>
          <div className="section-accent-line" />

          <div style={{ fontSize: 13, lineHeight: 1.8, color: 'var(--text-muted)' }}>
            {c.intro.map((p, i) => (
              <p key={i} style={{ marginBottom: 10 }}>{p}</p>
            ))}
            <p style={{ marginBottom: 32, fontWeight: 600 }}>{c.effectiveDate}</p>

            {c.sections.map((s) => (
              <div key={s.heading} style={{ marginBottom: 26 }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-strong, #1f4e79)', marginBottom: 8 }}>
                  {s.heading}
                </p>
                {s.paragraphs.map((p, i) => (
                  <p key={i} style={{ marginBottom: 8 }}>{p}</p>
                ))}
                {s.transferItems && (
                  <div style={{ margin: '8px 0' }}>
                    {s.transferItems.map((item) => (
                      <div key={item.title} style={{ marginBottom: 10 }}>
                        <p style={{ fontWeight: 600, marginBottom: 4 }}>{item.title}</p>
                        {item.lines.map((line, i) => (
                          <p key={i} style={{ marginBottom: 2 }}>{line}</p>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
                {s.closingParagraphs?.map((p, i) => (
                  <p key={`closing-${i}`} style={{ marginBottom: 8 }}>{p}</p>
                ))}
                {s.contactList && (
                  <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0' }}>
                    {s.contactList.map((item) => (
                      <li key={item.label} style={{ marginBottom: 4 }}>
                        <strong>{item.label}: </strong>{item.value}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <p style={{ marginTop: 32, fontSize: 12, color: 'var(--text-faint, #999)' }}>{c.lastUpdated}</p>
          </div>
        </div>

        <FooterSection />
      </div>
    </AppProvider>
  )
}
