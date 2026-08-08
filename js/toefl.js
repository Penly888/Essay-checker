// ============================================================
// 新托福写作（2026年1月起）— 评分标准 + 真题素材
// 满分 6.0，三部分原始分之和 20 分 → 加权等百分位转换为 1-6
// ============================================================

// ---- 评分标准 ----
var TOEFL_SCORING = {
  totalRawMax: 20,       // 三部分原始分之和上限
  finalMin: 1, finalMax: 6,  // 最终报告分 1-6（0.5 分档）

  // Build a Sentence：机器评分，10 题 × 1 分 = 10 分
  // 每道题必须所有空全对才给 1 分，错一个空该题为 0 分
  buildSentence: {
    name: "造句（Build a Sentence）",
    nameEn: "Build a Sentence",
    count: 10,
    max: 10,
    scoring: "机器评分，每题 1 分。必须所有空全对才给 1 分，错一个空该题 0 分。",
    note: "共 10 题，依序出现；考察语法、词汇、拼写的准确度。不是自由写作，为填空/改错题型。"
  },

  // Write an Email：AI + 人工评分，0-5 分
  // 四项评估维度
  writeEmail: {
    name: "邮件写作（Write an Email）",
    nameEn: "Write an Email",
    max: 5,
    criteria: [
      { key: "content", name: "内容充分展开", desc: "是否充分回应三项任务要求，并提供具体细节。" },
      { key: "language", name: "句法/词汇多样准确", desc: "句式是否有变化，用词是否精准、地道。" },
      { key: "tone", name: "语体与礼貌", desc: "是否符合邮件场景的正式/礼貌语气。" },
      { key: "accuracy", name: "语法/拼写/标点", desc: "错误是否极少，不影响清晰度。" }
    ],
    scoring: "AI + 人工评分，0-5 分。"
  },

  // Write for an Academic Discussion：AI + 人工评分，0-5 分
  // 三项评估维度
  academicDiscussion: {
    name: "学术讨论（Write for an Academic Discussion）",
    nameEn: "Write for an Academic Discussion",
    max: 5,
    criteria: [
      { key: "content", name: "内容相关且充分展开", desc: "观点是否明确、与话题相关，是否有充分论证。" },
      { key: "language", name: "句法/词汇多样准确", desc: "句式是否有变化，用词是否精准、地道。" },
      { key: "accuracy", name: "语法/拼写/标点", desc: "错误是否极少，不影响清晰度。" }
    ],
    scoring: "AI + 人工评分，0-5 分。"
  },

  // 5 分制细化描述（适用于 Email 和 Academic Discussion）
  band5: [
    {
      score: 5,
      label: "完全成功",
      desc: "回应有效且表达清晰，语言一贯熟练。内容充分展开，句法多样、用词精准地道，几乎无词汇或语法错误（仅允许计时写作中的常见笔误）。"
    },
    {
      score: 4,
      label: "基本成功",
      desc: "回应有效且易懂，语言能力足以完成任务。内容充分展开，句法多样、用词恰当，有少量词汇或语法错误。"
    },
    {
      score: 3,
      label: "部分成功",
      desc: "回应基本完成任务，但语言局限可能部分阻碍信息清晰有效。展开可能缺失、模糊或不相关，句法有一定变化，有明显词汇和语法错误。"
    },
    {
      score: 2,
      label: "大部分不成功",
      desc: "有尝试但大部分无效。观点展开差或相关性弱，句法结构和词汇有限，错误累积影响理解。"
    },
    {
      score: 1,
      label: "不成功",
      desc: "无效尝试，语言局限阻碍观点表达。仅有零散词句，句法结构和词汇严重受限，严重且频繁的语言错误。"
    },
    {
      score: 0,
      label: "无有效回应",
      desc: "空白、拒答、非英语、完全抄袭提示、与提示完全无关，或任意击键。"
    }
  ],

  // 分数换算参考（来自官方手册）
  // 写作原始分 20 分 → 最终报告 1-6 分
  // 过渡期（2026-2028）成绩单同时显示 1-6 分 + 0-120 对应区间 + CEFR 等级
  conversionNote: "写作原始分满分 20 分，通过加权等百分位连接程序转换为 1-6 分（0.5 分档）。过渡期成绩单同时显示 1-6 分、0-120 分对应区间和 CEFR 等级。"
};

// ---- 学术讨论真题（教授提问 + 两位学生观点）----
var TOEFL_ACADEMIC = [
  // ========== 品牌策略 ==========
  {
    topic: "Brand Consistency vs. Regular Updates",
    category: "商业",
    professor: "Dr. Gupta",
    question: "We are studying how companies maintain long-term brand through logos, colors, slogans, and advertising styles. Some companies have maintained the same visual design and core advertising messages for decades to build strong customer recognition and trust. Others regularly update their appearance and marketing approaches to adapt to current trends and changing customer preferences. Which strategy do you think is more suitable for maintaining long-term brand? Why?",
    studentA: { name: "Kelly", view: "I believe companies should keep their brand identity consistent for a long time. When customers repeatedly see the same logo, colors, and slogans, they can easily recognize the brand." },
    studentB: { name: "Andrew", view: "In my opinion, companies should regularly update their brand image. Consumer tastes and market trends change quickly, especially with younger generations. If companies keep the same design for too long, their brand may appear outdated." }
  },
  {
    topic: "Personalization and Brand Loyalty",
    category: "商业",
    professor: "Dr. Gupta",
    question: "We've been discussing various strategies to build brand loyalty. One effective strategy is offering personalized services and products to customers. Personalization can make customers feel valued and understood. Do you think personalization is the key to building strong brand loyalty? Why or why not?",
    studentA: { name: "Claire", view: "I believe personalization is essential for building brand loyalty. When customers receive tailored services and products, they feel valued and are more likely to stick with the brand. It creates a unique customer experience that sets the brand apart from competitors." },
    studentB: { name: "Andrew", view: "In my opinion, while personalization is important, it's not the only factor in building brand loyalty. Other aspects like customer service, product quality, and pricing also play a significant role. A balanced approach is needed to maintain strong brand loyalty." }
  },
  // ========== 企业发展 ==========
  {
    topic: "Global Expansion vs. Local Development",
    category: "商业",
    professor: "Dr. Gupta",
    question: "We have been discussing strategic growth in corporations. Businesses may often choose to expand globally or prefer instead to deepen local roots. Global growth offers access to new markets and new resources, but can dilute brand identity and strain resources. A local focus, on the other hand, builds community trust, adapts to regional needs, and strengthens customer loyalty. In your opinion, should corporations concentrate more on global expansion or local business development? Why?",
    studentA: { name: "Emily", view: "I believe corporations should prioritize global expansion because entering international markets creates more opportunities for growth. When companies operate in different countries, they can reach a larger customer base and learn from diverse cultures." },
    studentB: { name: "David", view: "I disagree with Emily because I think companies should focus more on strengthening their local presence. A strong relationship with local customers is the foundation of long-term success." }
  },
  {
    topic: "Expanding New Markets vs. Optimizing Existing",
    category: "商业",
    professor: "Dr. Martinez",
    question: "Many successful companies face an important decision when they grow: whether they should expand their business by entering new markets or focus on improving their existing products and services. Do you think companies should prioritize business expansion or focus on improving their existing markets?",
    studentA: { name: "Kevin", view: "I think companies should focus on expansion because entering new markets provides greater opportunities for growth." },
    studentB: { name: "Lily", view: "I believe companies should improve their existing markets before expanding. Rapid expansion can create many problems because companies may not fully understand new customers' preferences or cultural differences." }
  },
  // ========== 社交媒体 ==========
  {
    topic: "Social Media's Impact on Society",
    category: "社会",
    professor: "Dr. Diaz",
    question: "We often discuss the influence of social media on modern society. Social media platforms can connect people globally and promote the exchange of ideas. However, they can also lead to misinformation and negatively impact mental health. Do you think social media has a more positive or negative impact on society? Why?",
    studentA: { name: "Kelly", view: "I believe social media has a positive impact on society. It allows people to stay connected with friends and family, share experiences, and access information quickly." },
    studentB: { name: "Paul", view: "In my opinion, social media has a negative impact on society. It can spread misinformation quickly and contribute to mental health problems like anxiety and depression." }
  },
  {
    topic: "Social Media and Public Opinion",
    category: "社会",
    professor: "Dr. Gupta",
    question: "We've been exploring how social media platforms influence public opinion. While some people believe these platforms encourage public participation and social awareness, others worry about misinformation and the negative effects of online discussions. Do you think the influence of social media on public opinion is mostly beneficial or harmful?",
    studentA: { name: "Paul", view: "Social media has a positive influence because it allows people to access information quickly and participate in important discussions. It can raise awareness about social issues." },
    studentB: { name: "Claire", view: "Although social media provides convenient communication, its influence can be harmful. False information can spread easily online, and people may form opinions based on unreliable sources." }
  },
  // ========== 数字通信 ==========
  {
    topic: "Digital Communication and Relationships",
    category: "社会",
    professor: "Dr. Gupta",
    question: "Digital communication includes texting, video chats, and social media. Some people say these tools help relationships by allowing instant messages, sharing photos, and staying connected over long distances. Others believe they cause problems, such as misunderstandings and reduced face-to-face interaction. Do you believe digital communication makes relationships stronger or weaker?",
    studentA: { name: "Sarah", view: "I think digital communication has made relationships stronger because it allows people to stay connected regardless of distance. Students who study abroad can use video calls to communicate with their families regularly." },
    studentB: { name: "Michael", view: "Although digital communication is convenient, I believe it can weaken relationships if people depend on it too much. Online conversations often lack emotions and body language, which may cause misunderstandings." }
  },
  // ========== 环境 ==========
  {
    topic: "Banning Plastic vs. Improving Recycling",
    category: "环境",
    professor: "Dr. Wilson",
    question: "Plastic pollution has become one of the most serious environmental challenges worldwide. Some people believe that governments should completely ban the production and use of plastic products. Others argue that improving recycling systems is a better solution. In your opinion, should governments focus more on banning plastic products or improving recycling systems?",
    studentA: { name: "Sophia", view: "I believe governments should introduce stricter bans on plastic products because prevention is more effective than dealing with pollution afterward. Many plastic items are used only for a few minutes but remain in the environment for hundreds of years." },
    studentB: { name: "James", view: "I think improving recycling systems is a more practical approach. Plastic products are affordable, convenient, and important in many industries. Instead of completely banning them, governments should invest in better recycling technology." }
  },
  {
    topic: "Science vs. Social Sciences for Climate Change",
    category: "教育",
    professor: "Dr. Achebe",
    question: "Today's educational institutions need to prepare students for a world impacted by climate change. Education focusing on science and technology can help students develop innovative solutions. However, education emphasizing social sciences and ethics can help students understand the causes and effects of environmental problems. Which approach better prepares students to face climate change?",
    studentA: { name: "Olivia", view: "I believe science and technology education is the most effective way. Climate change requires practical solutions, such as renewable energy, advanced transportation systems, and new agricultural methods." },
    studentB: { name: "Daniel", view: "I think social sciences and ethics are equally, or even more, important because environmental problems are caused by human behaviors and decisions. Scientific discoveries alone cannot solve climate change unless people are willing to change their lifestyles." }
  },
  // ========== 工作模式 ==========
  {
    topic: "Remote Work Impact",
    category: "职场",
    professor: "Dr. Gupta",
    question: "We've been discussing the impact of remote work on productivity and employee well-being. Remote work can have many significant advantages, but it may also lead to some unintended problems. Do you think remote work has a positive or negative impact?",
    studentA: { name: "Paul", view: "Remote work can have a positive impact on both productivity and employee well-being. The flexibility helps employees manage their work-life balance better and the reduction in commuting time can lead to increased productivity and less stress." },
    studentB: { name: "Claire", view: "While remote work offers flexibility, it can negatively impact employees. Isolation and lack of face-to-face interaction can hinder teamwork and lead to feelings of loneliness." }
  },
  {
    topic: "Multitasking in the Workplace",
    category: "职场",
    professor: "Dr. Diaz",
    question: "This week we have been discussing strategies to promote workplace productivity. One particularly controversial topic is multitasking. Do you believe that managers should promote multitasking in the workplace? Why or why not?",
    studentA: { name: "Paul", view: "I think managers should promote multitasking. It helps employees handle routine tasks simultaneously and mirrors real-world demands." },
    studentB: { name: "Kelly", view: "I oppose multitasking in the workplace. It increases the chance of mistakes and leads to mental fatigue. Deep, focused work is more effective for quality outcomes." }
  },
  {
    topic: "Work-Life Balance with Full-Time Job",
    category: "职场",
    professor: "Dr. Gupta",
    question: "Balancing work and social life is challenging. On one hand, working full-time is important for financial stability and career growth. On the other, maintaining a healthy social life is crucial for emotional well-being and stress relief. Is it possible to maintain a healthy social life while working full-time?",
    studentA: { name: "Andrew", view: "Yes, but you have to set limits on work and prioritize your health and well-being. Focusing exclusively on work causes stress and burnout." },
    studentB: { name: "Claire", view: "In my opinion, using technology to plan social activities can significantly enhance our social life. Tools like digital calendars help optimize free time." }
  },
  // ========== 社会流动 ==========
  {
    topic: "Enhancing Social Mobility",
    category: "社会",
    professor: "Dr. Diaz",
    question: "Social mobility refers to the ability of individuals or families to move up or down the social ladder over time. Some sociologists argue that education is the key to improving social mobility, while others believe that economic policies and government intervention play a larger role. What do you think is the most effective way to enhance social mobility?",
    studentA: { name: "Andrew", view: "I think education is the most effective way to enhance social mobility. Access to quality education provides individuals with the knowledge and skills needed to pursue better job opportunities." },
    studentB: { name: "Kelly", view: "I believe economic policies and government intervention are more effective. Policies that address income inequality, provide financial support, and create job opportunities can significantly impact social mobility." }
  },
  // ========== 广告 ==========
  {
    topic: "Advertising and Consumer Behavior",
    category: "商业",
    professor: "Dr. Diaz",
    question: "We've been discussing the influence of advertising on consumer behavior. Advertisements are designed to introduce products and services, help businesses attract customers, and encourage economic growth. Do you think advertising has a positive or negative impact on consumers?",
    studentA: { name: "Paul", view: "Advertising generally has a positive influence because it helps consumers discover useful products and services." },
    studentB: { name: "Claire", view: "I believe advertising often has negative effects because many advertisements exaggerate product benefits. They may encourage people to buy things they do not need." }
  },
  {
    topic: "Customer Feedback in Product Development",
    category: "商业",
    professor: "Dr. Gupta",
    question: "We've been discussing the importance of customer feedback in product development. Gathering feedback can help companies understand customer needs and improve their products. However, some argue that relying too heavily on customer feedback can stifle innovation and lead to mediocre products. What is your opinion?",
    studentA: { name: "Paul", view: "Customer feedback is essential for product development. It helps companies understand customer needs and preferences, ensuring that products are tailored to the market." },
    studentB: { name: "Kelly", view: "I believe that relying too heavily on customer feedback can stifle innovation. Companies should balance feedback with creative vision to avoid producing mediocre products." }
  },
  // ========== 公共艺术 ==========
  {
    topic: "Public Art vs. Cultural Events",
    category: "社会",
    professor: "Dr. Gupta",
    question: "We've been discussing how communities can use public spaces to improve residents' quality of life. Some cities invest in permanent public art, such as murals, statues, and sculptures, while others prefer temporary cultural events, such as concerts, performances, and festivals. Which approach do you think communities should prioritize?",
    studentA: { name: "Paul", view: "Permanent public art can bring long-term benefits to communities. Murals and sculptures can make neighborhoods more attractive, reflect local culture, and provide artists with opportunities to display their creativity." },
    studentB: { name: "Claire", view: "Although permanent art can beautify public spaces, temporary cultural events may have a greater impact on communities. Festivals and performances encourage people to interact with each other and strengthen social connections." }
  },
  // ========== 教育中的科技 ==========
  {
    topic: "Technology in Education",
    category: "教育",
    professor: "Dr. Gupta",
    question: "We have been discussing the integration of technology in educational settings. Some educators believe that digital tools enhance student learning by providing interactive and engaging experiences. Others are concerned that too much technology in the classroom can be distracting and may negatively impact learning outcomes. Do you think the use of technology in education is beneficial or harmful to students?",
    studentA: { name: "Kelly", view: "I believe that technology in education is beneficial for students. It provides interactive learning experiences that can make complex topics easier to understand." },
    studentB: { name: "Paul", view: "In my opinion, excessive use of technology in the classroom can be harmful. It can distract students from their studies and reduce face-to-face interactions with teachers and peers." }
  },
  // ========== 情商 vs 技能 ==========
  {
    topic: "Emotional Intelligence vs. Technical Skills",
    category: "职场",
    professor: "Dr. Diaz",
    question: "We've been talking about the role of emotional intelligence in personal and professional settings. Emotional intelligence involves the ability to recognize, understand, and manage our own emotions and the emotions of others. Do you think emotional intelligence is more important than technical skills in the workplace? Why or why not?",
    studentA: { name: "Andrew", view: "I think emotional intelligence is more important than technical skills in the workplace. Being able to communicate effectively, manage stress, and work well in teams can lead to better collaboration." },
    studentB: { name: "Paul", view: "In my opinion, technical skills are more important. Without the necessary technical expertise, employees wouldn't be able to perform their tasks efficiently." }
  },
  // ========== 领导风格 ==========
  {
    topic: "Authoritative vs. Collaborative Leadership",
    category: "商业",
    professor: "Dr. Gupta",
    question: "We've been discussing various leadership styles in business management. Some leaders are known for their authoritative approach, making decisions independently and expecting compliance from their team. Others prefer a collaborative approach, involving team members in decision-making and encouraging feedback. Which leadership style do you think is more effective?",
    studentA: { name: "Claire", view: "I believe a collaborative leadership style is more effective. Involving team members in decision-making can foster a sense of team cohesion." },
    studentB: { name: "Paul", view: "I think an authoritative leadership style is typically more effective. It ensures clear guidance from one person, which can be helpful in high-pressure situations." }
  },
  // ========== 政府干预 ==========
  {
    topic: "Government Role in Economy",
    category: "政府",
    professor: "Dr. Gupta",
    question: "We often discuss the impact of government intervention in the economy. Some argue that government regulations and policies can improve economic stability and protect consumers. Others believe that too much intervention can stifle innovation and lead to inefficiencies. What do you think is the most effective role of government in the economy?",
    studentA: { name: "Claire", view: "I think government intervention is important for ensuring economic stability and protecting consumers. Regulations can prevent businesses from engaging in harmful practices." },
    studentB: { name: "Andrew", view: "In my opinion, too much government intervention can hinder economic growth and innovation. Businesses need the freedom to operate without excessive regulations." }
  },
  // ========== 商业伦理 ==========
  {
    topic: "Ethical Practices vs. Profitability",
    category: "商业",
    professor: "Dr. Diaz",
    question: "We've been discussing the importance of ethical behavior in business. Ethical practices, like fair wages or sustainable production policies, can enhance a company's reputation. Some argue that companies should prioritize ethical practices even if it affects profitability, while others believe that profit should always come first. What is your opinion?",
    studentA: { name: "Paul", view: "Ethical practices should be prioritized in business. Building trust with customers and maintaining a positive reputation can lead to long-term success." },
    studentB: { name: "Claire", view: "Profit should come first in business decisions, especially when the business is new. Companies need to be financially healthy to continue operating and providing jobs." }
  },
  // ========== 最低工资 ==========
  {
    topic: "Minimum Wage Laws",
    category: "政府",
    professor: "Dr. Gupta",
    question: "Minimum wage laws are designed to ensure that workers receive fair compensation for their labor. Some argue that raising the minimum wage helps reduce poverty and improve living standards, while others believe it can lead to job losses and increased costs for businesses. Are minimum wage laws good or bad for the economy overall?",
    studentA: { name: "Claire", view: "Minimum wage laws provide a lot of benefits if they are handled properly. Raising the minimum wage reduces poverty and improves living standards." },
    studentB: { name: "Andrew", view: "Increasing the minimum wage can lead to job losses and higher costs for businesses. The economy works best when prices and wages are determined by supply and demand." }
  },
  // ========== 快时尚 ==========
  {
    topic: "Solutions to Fast Fashion Problems",
    category: "环境",
    professor: "Dr. Diaz",
    question: "Fast fashion refers to the rapid production of inexpensive clothing for mass-market sales. Critics argue that fast fashion leads to vast amounts of pollution and that workers experience poor working conditions. In your view, what would be the most effective solution to the problems associated with fast fashion?",
    studentA: { name: "Andrew", view: "I believe that laws should be created to hold fashion brands accountable for the problems their products create." },
    studentB: { name: "Kelly", view: "Based on my experience, today's consumers demand products that are made in environmentally and socially responsible ways. Market forces are effective at getting companies to adopt better practices voluntarily." }
  },
  // ========== 土著文化 ==========
  {
    topic: "Preserving Indigenous Cultures",
    category: "社会",
    professor: "Dr. Gupta",
    question: "Indigenous cultures face numerous challenges, including globalization and environmental changes. Some experts argue that preserving these cultures is vital. Others believe that adapting to modern society is equally important for the survival and prosperity of indigenous peoples. What are your thoughts?",
    studentA: { name: "Claire", view: "Preserving indigenous cultures is essential for maintaining cultural diversity and historical knowledge. These cultures offer unique perspectives and wisdom." },
    studentB: { name: "Paul", view: "While preserving cultural heritage is important, adapting to modern society is also crucial for the survival and prosperity of indigenous peoples." }
  },
  // ========== 国际组织 ==========
  {
    topic: "Effectiveness of International Organizations",
    category: "社会",
    professor: "Dr. Diaz",
    question: "We've been examining the role of international organizations, such as the United Nations, in promoting global peace and security. Some argue that these organizations are essential for maintaining international order, while others believe they are ineffective and should be reformed. What is your opinion?",
    studentA: { name: "Andrew", view: "I think international organizations like the United Nations are crucial for promoting global peace and security. They provide a platform for dialogue and cooperation." },
    studentB: { name: "Claire", view: "In my opinion, international organizations often struggle to enforce their decisions and can be slow to respond to crises. They need significant reforms to be more effective." }
  }
];

// ---- 邮件写作真题（按类型分类）----
var TOEFL_EMAIL = [
  // ===== 反馈与建议类 =====
  {
    type: "反馈与建议",
    typeEn: "Feedback & Suggestion",
    tone: "礼貌、积极、建设性",
    prompt: "You recently dined at a restaurant near your campus called The Garden Bistro and had an excellent experience. However, you noticed that the menu could be improved. Write an email to Ms. Johnson. In your email: express gratitude for the dining experience and explain what you liked; explain your concerns about the menu; suggest ways to improve the menu and the restaurant.",
    recipient: "Ms. Johnson (Restaurant Manager)",
    tips: "先肯定优点（食物、服务、环境），再指出菜单问题（品种少/缺描述），最后提建设性建议（增加健康选项/季节更新）。"
  },
  {
    type: "反馈与建议",
    typeEn: "Feedback & Suggestion",
    tone: "积极礼貌，避免过度批评",
    prompt: "You recently dined at a local restaurant near campus and were impressed overall. However, you experienced some issues. Write an email to the restaurant manager, Ms. Miller: describe what you enjoyed; explain the issues; suggest a solution.",
    recipient: "Ms. Miller (Restaurant Manager)",
    tips: "三步法：满意之处 → 具体问题（等待时间长/上菜不一致）→ 改进建议（高峰增员/优化流程）。"
  },
  {
    type: "反馈与建议",
    typeEn: "Feedback & Suggestion",
    tone: "客观礼貌",
    prompt: "You recently stayed at a resort during your semester break and enjoyed the overall experience. However, you encountered some issues. Write an email to the resort manager, Ms. Garcia: mention what you enjoyed; describe the issues; suggest ways to improve the service.",
    recipient: "Ms. Garcia (Resort Manager)",
    tips: "度假村场景：设施/环境好评 → 具体问题 → 改进建议。"
  },
  {
    type: "反馈与建议",
    typeEn: "Feedback & Suggestion",
    tone: "正式、积极",
    prompt: "Your university recently organized a Job Application Workshop. You attended and found it helpful, but also noticed some areas to improve. Write an email to the career center director: describe what you found useful; explain problems you noticed; suggest specific solutions.",
    recipient: "Career Center Director",
    tips: "先肯定价值（简历修改/面试技巧）→ 指出不足（时间不够/人数太多）→ 具体改进（延长时间/小组分组）。"
  },

  // ===== 投诉与解决类 =====
  {
    type: "投诉与解决",
    typeEn: "Complaint & Resolution",
    tone: "礼貌但清晰",
    prompt: "You recently purchased a piece of furniture for your dorm room from an online store called 'Home Comforts.' When the item arrived, you discovered it was damaged during shipping. Write an email to customer service representative, Ms. Brown: describe the item and damage; explain your disappointment; request a replacement or refund.",
    recipient: "Ms. Brown (Customer Service)",
    tips: "描述商品+损坏情况 → 表达失望（因期待已久）→ 要求换货或退款，语气礼貌。"
  },

  // ===== 咨询类 =====
  {
    type: "咨询类",
    typeEn: "Inquiry",
    tone: "正式、清晰、合作",
    prompt: "You are a student leader responsible for organizing your class field trip. You found a travel agency that offers comprehensive packages. Write an email to the travel agent, Mr. Brown: explain the purpose and dates of the trip; ask about offers for large groups; request details on how they can accommodate specific needs.",
    recipient: "Mr. Brown (Travel Agent)",
    tips: "介绍行程背景 → 询问团体套餐/价格 → 了解住宿/交通/特殊需求等细节。"
  },

  // ===== 感谢与请求类 =====
  {
    type: "感谢与请求",
    typeEn: "Thank-you & Request",
    tone: "尊重、感激、职业化",
    prompt: "You are a student who just finished an internship at a local company. Write an email to your supervisor, Mr. Clark: express gratitude for the internship and mention what you learned; explain how this internship will benefit your future career; ask him to write a recommendation letter.",
    recipient: "Mr. Clark (Internship Supervisor)",
    tips: "感谢机会+学到什么 → 对职业发展的帮助 → 礼貌请求推荐信。重点是感恩中带请求。"
  },

  // ===== 建议类（Advice）=====
  {
    type: "建议类",
    typeEn: "Advice",
    tone: "关心、支持、友好",
    prompt: "Your friend, Alex, has been feeling overwhelmed with university assignments. You have noticed he is struggling and not taking proper care of his health. Write an email to Alex: describe what you noticed; explain why maintaining good health is important; suggest specific strategies to manage stress.",
    recipient: "Alex (Friend)",
    tips: "描述观察到的压力表现 → 强调健康重要性 → 具体建议（学习计划/休息/运动）。"
  },
  {
    type: "建议类",
    typeEn: "Advice",
    tone: "正式、礼貌、解决问题",
    prompt: "You are a student at Green Valley University. Recently, many students on campus have become infected with influenza. Write an email to Mr. Anderson, the director of student affairs: express concern about the increase in cases; explain what problems it has caused; suggest ways the school can prevent influenza.",
    recipient: "Mr. Anderson (Director of Student Affairs)",
    tips: "表达对流感病例增加的担忧 → 说明影响（缺课/传播风险）→ 建议（卫生措施/健康教育/隔离政策）。"
  },

  // ===== 问题解决类 =====
  {
    type: "问题解决类",
    typeEn: "Problem-solving",
    tone: "正式、礼貌、寻求帮助",
    prompt: "You are a student participating in a study abroad program. Recently, your flight to the destination was canceled, affecting your travel arrangements. Write an email to Mr. Anderson, the program manager: express concern about the cancellation; describe the difficulties you are facing; suggest possible solutions.",
    recipient: "Mr. Anderson (Program Manager)",
    tips: "说明航班取消带来的影响 → 描述具体困难 → 提出解决方案（更改航班/调整行程）。"
  },
  {
    type: "问题解决类",
    typeEn: "Problem-solving",
    tone: "礼貌、职业化",
    prompt: "Your professor, Dr. Smith, recently assigned a group project due in two weeks. You are frustrated because not all group members are contributing equally. Write an email to Dr. Smith: describe the issue; describe your specific contribution; explain why the group has been unable to address this issue.",
    recipient: "Dr. Smith (Professor)",
    tips: "陈述小组分工不均的事实 → 说明自己做了什么 → 解释团队为何无法自行解决。"
  },

  // ===== 活动策划类 =====
  {
    type: "活动策划类",
    typeEn: "Event Planning",
    tone: "积极、合作",
    prompt: "Your university is planning a Career Sharing Event to help students learn about different professions. As a member of the student committee, write an email to the event organizer: express your interest; suggest what types of professionals should be invited and why; provide specific suggestions on how to organize effectively.",
    recipient: "Event Organizer",
    tips: "表达对活动的兴趣 → 推荐邀请的职业类型+原因 → 具体组织方式（互动环节/职业咨询/问答）。"
  },
  {
    type: "活动策划类",
    typeEn: "Event Planning",
    tone: "正式、清晰",
    prompt: "You are organizing a farewell party for a colleague who is leaving the company. Write an email to Mr. Teller, the coordinator: explain the purpose and what you hope to achieve; describe the type of venue and decoration you prefer; request a brief meeting to finalize details.",
    recipient: "Mr. Teller (Event Coordinator)",
    tips: "说明欢送会目的 → 描述场地和装饰偏好 → 请求开会敲定细节。"
  },

  // ===== 咨询建议类（请求帮助）=====
  {
    type: "咨询建议",
    typeEn: "Advice Request",
    tone: "感谢、尊重、积极学习",
    prompt: "You recently joined a new fitness class at the campus gym and have been enjoying the workouts. However, you are experiencing some difficulty with certain exercises. Write an email to the instructor, Ms. Miller: mention what you enjoy; describe the difficulty; ask for advice.",
    recipient: "Ms. Miller (Fitness Instructor)",
    tips: "先感谢+喜欢的原因 → 再说明困难（力量/平衡/技巧）→ 请求具体建议（训练方法/动作调整）。"
  },
  {
    type: "咨询建议",
    typeEn: "Advice Request",
    tone: "礼貌、尊重",
    prompt: "You recently enrolled in an online language course and have enjoyed it. However, you are having some trouble with the online class platform. Write an email to the course instructor, Mrs. White: mention what you enjoyed; describe the issue; propose a solution.",
    recipient: "Mrs. White (Course Instructor)",
    tips: "先夸课程好处 → 描述平台问题 → 提解决方案。"
  },

  // ===== 服务反馈类 =====
  {
    type: "服务反馈",
    typeEn: "Service Feedback",
    tone: "客观、礼貌",
    prompt: "You recently rented a car for a weekend trip and were satisfied with the vehicle's performance. However, you had a bad experience with customer service. Write an email to the rental company manager, Ms. Turner: explain what features of the car you liked; describe the customer service issues; suggest improvements to the pick-up and drop-off process.",
    recipient: "Ms. Turner (Rental Company Manager)",
    tips: "肯定车辆优点 → 描述客服问题（等待长/流程乱）→ 建议改进（在线登记/员工培训）。"
  },
  {
    type: "服务反馈",
    typeEn: "Service Feedback",
    tone: "礼貌、建设性",
    prompt: "You are a member of a local gym called Fitness Zone. Recently, you have noticed that some exercise equipment is problematic. Write an email to the gym manager, Ms. Taylor: describe the equipment issues; provide reasons for why adding new equipment would improve the experience; explain the consequences on membership of not improving.",
    recipient: "Ms. Taylor (Gym Manager)",
    tips: "指出现有设备问题 → 说明添新设备的好处 → 警告不改善对会员的影响。"
  }
];

// ---- 官方满分范文（5/5 Email，摘自官方指南 OG）----
var TOEFL_OG_EMAIL_SAMPLE = {
  prompt: "You recently attended a workshop on digital marketing organized by your school's career center. Write an email to the workshop organizer: thank the organizer and mention what was most valuable; explain how the workshop benefits your studies; suggest holding similar workshops more frequently.",
  score: 5,
  essay: "Dear Workshop Organizer,\n\nI am writing to thank you for the digital marketing workshop last week. I really liked the part where you showed how ads work on the internet and how companies use them. The group activity was fun, but I didn't understand all the steps for making a ad. Still, it was interesting to see how people react to different pictures and words.\n\nThis workshop helps my studies because now I know more about how businesses get customers online. It also gave me ideas for my school project, which is about starting a small business. I can use some of the advertising ideas in my project plan.\n\nI think it would be good if you can do more workshops like this, maybe every month. Many students would like to learn more and practice. If you need help with planning or want feedback, I am happy to help.\n\nSincerely,\nZeynep",
  officialComments: [
    "Fully addresses all 3 required points with clear and relevant elaboration.",
    "Thanks the organizer and specifies what was most valuable (specific workshop segment).",
    "Explains how the workshop benefits studies (school project, business ideas).",
    "Suggests holding similar workshops more frequently.",
    "Polite and appropriate tone; logically organized (opening, explanation, closing).",
    "Minor errors ('organising', 'didnt', 'a ad', 'Sincerly') do not interfere with clarity.",
    "Demonstrates adequate syntactic variety, idiomatic phrasing, and appropriate social conventions."
  ],
  keyTakeaways: [
    "150 词即可得满分——内容具体比字数多更重要。",
    "不需要长难句和专业词汇，句式自然即可。",
    "有拼写错误不影响满分，但基本没有语法错误。",
    "语气自然礼貌，无需模板化开头/结尾。",
    "从不同角度展开：具体环节 + 小组活动 + 自身学生身份。"
  ]
};
