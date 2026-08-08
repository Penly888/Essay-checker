// ============================================================
// 天津高考英语写作模块 (Tianjin Gaokao English Writing)
// 数据来源: 天津考试院官方评分标准 + 2009-2025年真题 + PPT教程
// ============================================================

// ---------- 评分标准 (Official 25-point, 5-tier) ----------
var GAOKAO_SCORING = {
  totalMax: 25,
  wordTarget: 100,
  wordMin: 100,
  wordPenalty: 2,        // 词数<100 扣2分
  spellPenaltyMax: 3,    // 每3个拼写错误扣1分, 最多扣3分
  criteria: [
    { key: "content", name: "内容要点", nameEn: "Content", max: 10, weight: 0.40 },
    { key: "language", name: "语法结构与词汇", nameEn: "Grammar & Vocabulary", max: 7, weight: 0.28 },
    { key: "coherence", name: "衔接与连贯", nameEn: "Cohesion & Coherence", max: 5, weight: 0.20 },
    { key: "effect", name: "整体效果", nameEn: "Overall Effect", max: 3, weight: 0.12 }
  ],
  // 5档评分标准 (官方)
  tiers: [
    {
      tier: 5, label: "第五档 (很好)", range: "21-25",
      content: "覆盖所有内容要点，并有适当发挥",
      language: "应用了较丰富的语法结构和词汇；表达准确、地道；有个别错误，但不影响理解",
      coherence: "有效使用衔接手段，内容连贯，结构紧凑",
      effect: "具备较强的语言运用能力；完全达到了预期的写作目的"
    },
    {
      tier: 4, label: "第四档 (好)", range: "16-20",
      content: "覆盖所有内容要点",
      language: "应用的语法结构和词汇能满足任务要求；表达基本准确，些许错误影响不大",
      coherence: "应用了简单的连接成分，全文结构较紧凑",
      effect: "达到了预期的写作目的"
    },
    {
      tier: 3, label: "第三档 (一般)", range: "11-15",
      content: "漏掉一些内容，覆盖部分内容要点",
      language: "应用的语法结构和词汇能基本满足任务要求；有一些错误，对理解造成一定影响",
      coherence: "应用简单的连接成分，内容基本连贯",
      effect: "基本达到了预期的写作目的"
    },
    {
      tier: 2, label: "第二档 (较差)", range: "6-10",
      content: "漏掉或未描述清楚一些主要内容，有一些无关内容",
      language: "语法结构单调，词汇项目有限；错误较多，且在很大程度上影响理解",
      coherence: "较少使用语句间的连接成分，内容缺少连贯性",
      effect: "信息未能清楚地传达给读者"
    },
    {
      tier: 1, label: "第一档 (差)", range: "1-5",
      content: "明显遗漏主要内容，写了一些无关内容",
      language: "语法结构单调，词汇项目有限；错误较多，严重影响理解",
      coherence: "缺乏语句间的连接成分，内容不连贯",
      effect: "信息未能传达给读者"
    },
    {
      tier: 0, label: "零分", range: "0",
      content: "未能传达任何信息",
      language: "内容太少无法评判或与要求无关",
      coherence: "—",
      effect: "—"
    }
  ],
  // 三档进阶体系 (来自PPT)
  levels: [
    {
      name: "基础档", target: "80-95分", vocab: "1500-2000",
      framework: "三段式: 开头(自我介绍+写信目的) → 中间(逐一覆盖要点) → 结尾(礼貌收尾+期待回复)",
      sentenceMethod: "造句三步法: Step1确定主语 → Step2确定谓语 → Step3补充宾语/修饰",
      templates: ["I am writing to invite...", "I am writing to introduce...", "I hope you can come."],
      transitions: ["First → Second → Third", "To begin with / Also / Finally"],
      verbs: ["hold", "take part in", "join", "learn about", "share", "invite"],
      scoring: "内容完整40% + 语言正确30% + 结构清晰20% + 字数达标10%"
    },
    {
      name: "提升档", target: "105-120分", vocab: "2500-3000",
      framework: "进阶三段: 开头(自我介绍+写信目的) → 中间(每要点2句:直述+扩展) → 结尾(真诚希望+期待回复)",
      sentenceMethod: "三种从句: 定语从句(who/which/that) + 宾语从句(I believe that...) + 状语从句(because/when/if)",
      templates: ["I am writing to recommend... without hesitation", "What makes it special is that...", "I am confident that..."],
      transitions: ["First and foremost...", "Moreover... / Additionally...", "Last but certainly not least..."],
      verbs: ["broaden our horizons", "promote mutual understanding", "be highly recommended", "benefit a lot from", "express sincere gratitude"],
      scoring: "语法多样性 + 词汇丰富度 + 连贯衔接 + 语域恰当"
    },
    {
      name: "精品档", target: "125-135+分", vocab: "3500+",
      framework: "满分三段: 开头(高级句式+同位语) → 中间(倒装+非谓语+平行结构) → 结尾(虚拟语气+期待回复)",
      sentenceMethod: "三个一法则: 1个高级句型(倒装/强调/虚拟) + 1个非谓语结构(分词作状语/定语) + 1个同位语/独立主格",
      templates: [
        "I hope this letter finds you well. I am Li Jin, a student from XX High School, writing to extend a cordial invitation to...",
        "Not only will you have the opportunity to..., but you can also...",
        "It is through this activity that we can truly understand...",
        "I would appreciate it if you could..."
      ],
      transitions: ["First and foremost...", "Moreover...", "Last but certainly not least..."],
      verbs: ["extend a cordial invitation", "boast a wide range of", "be destined to", "spare no effort in", "captivate audiences"],
      scoring: "高级句型(2+种) + 用词替换(3-5处) + 句式多样性 + 三个一法则"
    }
  ],
  // 用词替换表
  upgrades: [
    { basic: "important", advanced: ["significant", "crucial", "vital", "indispensable"] },
    { basic: "beautiful", advanced: ["splendid", "breathtaking", "magnificent", "picturesque"] },
    { basic: "like", advanced: ["have a passion for", "be fond of", "be keen on"] },
    { basic: "good", advanced: ["excellent", "outstanding", "remarkable", "exceptional"] },
    { basic: "big", advanced: ["enormous", "substantial", "considerable"] },
    { basic: "happy", advanced: ["delighted", "thrilled", "overjoyed"] },
    { basic: "interesting", advanced: ["fascinating", "intriguing", "captivating"] },
    { basic: "think", advanced: ["believe", "consider", "reckon", "be convinced"] },
    { basic: "show", advanced: ["demonstrate", "illustrate", "exhibit"] },
    { basic: "help", advanced: ["assist", "support", "facilitate"] },
    { basic: "give", advanced: ["offer", "provide", "present"] },
    { basic: "many", advanced: ["numerous", "a multitude of", "a wide range of"] },
    { basic: "very", advanced: ["exceedingly", "remarkably", "exceptionally"] },
    { basic: "because", advanced: ["on account of", "owing to", "due to the fact that"] },
    { basic: "so", advanced: ["therefore", "consequently", "as a result"] },
    { basic: "but", advanced: ["however", "nevertheless", "nonetheless"] },
    { basic: "and", advanced: ["moreover", "furthermore", "in addition"] },
    { basic: "people", advanced: ["individuals", "citizens", "inhabitants"] },
    { basic: "use", advanced: ["utilize", "employ", "make use of"] },
    { basic: "want", advanced: ["desire", "yearn for", "long for"] }
  ],
  grammarTips: [
    "词数不少于100词，少于100词从总分中减去2分",
    "拼写与标点符号是语言准确性的一个方面，每错误书写3个单词从总分中减去1分，原则上不超过3分",
    "英美拼写及词汇用法均可接受",
    "书写较差以至影响交际，将分数降低一个档次",
    "要点全覆盖是基础（内容占40%权重）",
    "邀请信占历年真题约50%，是备考核心",
    "三段式结构：开头段(自我介绍+写信目的) → 中间段(逐一覆盖要点) → 结尾段(礼貌收尾+期待回复)",
    "精品档'三个一法则'：1个高级句型 + 1个非谓语结构 + 1个同位语/独立主格",
    "用词替换是提分关键：important→significant, beautiful→splendid, like→have a passion for",
    "开头已给出的，不计入总词数；注意人称和时态要与题目要求一致"
  ]
};

// ---------- 真题题库 (2017-2025, 每年3月+6月) ----------
var GAOKAO_PROMPTS = [
  // 2017
  {
    id: "gk2017_3", year: 2017, month: 3, season: "春季第一次笔试",
    type: "回信“, topic: ”中国诗词大会/文化传播",
    title: "2017年3月 · 中国诗词大会回信",
    body: "假设你是晨光中学的学生李津。你的美国笔友Chris正在学习汉语，他得知\"中国诗词大会\"在CCTV播出，非常感兴趣，便写信给你，希望你介绍相关情况及更多了解中国文化的途径。请根据以下提示给他写一封回信。",
    points: [
      "简单介绍\"中国诗词大会\"引起的反响",
      "介绍了解中国文化的途径（如阅读相关书籍、利用媒体资源等）",
      "表达对Chris学习中国文化的祝愿"
    ],
    vocab: ["Chinese Poetry Competition", "arouse wide concern", "cultural heritage", "media resources", "language learning"],
    wordCount: "不少于100词",
    notes: "参考词汇：中国诗词大会 Chinese Poetry Competition"
  },
  {
    id: "gk2017_6", year: 2017, month: 6, season: "夏季第二次笔试",
    type: "回信“, topic: ”近况介绍/全运会志愿者",
    title: "2017年6月 · 全运会志愿者回信",
    body: "假设你是李津，与你以前的外籍教师Mrs. Green一直保持联系。近日她来信询问你的近况，请根据以下提示给她回复一封邮件。",
    points: [
      "简要介绍自己的学习和生活",
      "告知你已成为八月底在津举办的第十三届全运会的志愿者，并介绍为此所做的准备（如深入了解天津等）",
      "希望她有机会重访天津"
    ],
    vocab: ["National Games", "volunteer", "preparation", "host city", "look forward to"],
    wordCount: "不少于100词",
    notes: "开头已给出，不计入总词数"
  },
  // 2018
  {
    id: "gk2018_3", year: 2018, month: 3, season: "春季第一次笔试",
    type: "论坛留言“, topic: ”留学中国",
    title: "2018年3月 · 鼓励来华留学留言",
    body: "假设你是晨光中学的学生李津。你在某网站的论坛上读到一位名为Chris的外国学生发的帖子，得知他有意来中国的大学学习。请根据以下提示给Chris留言。",
    points: [
      "鼓励他来中国留学",
      "说明来华留学的好处（如：加深对中国的了解，对个人发展的益处等）",
      "表示愿意进一步提供帮助"
    ],
    vocab: ["pursue higher education", "broaden horizons", "cultural exchange", "academic development", "offer assistance"],
    wordCount: "不少于100词",
    notes: "开头已给出，不计入总词数"
  },
  {
    id: "gk2018_6", year: 2018, month: 6, season: "夏季第二次笔试",
    type: "邀请信“, topic: ”机器人竞赛",
    title: "2018年6月 · 机器人竞赛邀请信",
    body: "假如你是晨光中学的机器人兴趣小组组长李津，你的美国朋友Chris就读于天津某国际学校，他曾在机器人技能竞赛中获奖。你打算邀请他加入你的团队，参加即将于7月底在天津举行的世界青少年机器人技能竞赛。请根据以下提示代表兴趣小组给他写一封电子邮件。",
    points: [
      "比赛的时间、地点",
      "邀请他的原因",
      "训练计划将发送其邮箱，请他提出建议"
    ],
    vocab: ["World Adolescent Robotics Competition", "robotics", "team member", "training plan", "expertise"],
    wordCount: "不少于100词",
    notes: "参考词汇：世界青少年机器人技能竞赛 the World Adolescent Robotics Competition；开头和结尾已给出，不计入总词数"
  },
  // 2019
  {
    id: "gk2019_3", year: 2019, month: 3, season: "春季第一次笔试",
    type: "征文投稿“, topic: ”读书月/书籍推荐",
    title: "2019年3月 · 读书月征文投稿",
    body: "假设你是晨光中学的李津。为配合学校的\"读书月\"活动，你校英语社团的微信公众号开展以\"Let's Read\"为题的征文活动。要求同学们根据个人的阅读体会，从所读过的书籍中选定一种类型，推荐给其他同学。现请你投稿。",
    points: [
      "推荐书籍的类型及特点",
      "推荐的理由"
    ],
    vocab: ["Let's Read", "book category", "fiction", "biography", "enrich one's mind", "broaden one's horizons"],
    wordCount: "不少于100词",
    notes: "标题和首句已给出：Let's Read March 22, 2019 By Li Jin"
  },
  {
    id: "gk2019_6", year: 2019, month: 6, season: "夏季第二次笔试",
    type: "邮件“, topic: ”西方艺术讲座",
    title: "2019年6月 · 西方艺术讲座征求意见",
    body: "假设你是晨光中学的李津，英国友好校将派教师来你校参加为期一周的暑期交流活动。活动期间，英方教师Chris将做一个有关西方艺术的讲座，现就讲座内容征求你校学生的意见。请根据以下提示给Chris写一封电子邮件。",
    points: [
      "你喜欢的讲座话题（从音乐、美术、舞蹈中任选其一）",
      "选择该话题的原因及关于该话题你感兴趣的内容",
      "希望从中有何收获"
    ],
    vocab: ["Western art", "lecture", "music/fine arts/dance", "appeal to", "gain insight into"],
    wordCount: "不少于100词",
    notes: "开头和结尾已给出，不计入总词数"
  },
  // 2020
  {
    id: "gk2020_3", year: 2020, month: 3, season: "春季第一次笔试(7月)",
    type: "发言稿“, topic: ”网络学习英语",
    title: "2020年3月(7月) · 网络学习英语发言稿",
    body: "假设你是晨光中学的李津。下周你校将与英国友好校举办一场在线会议，探讨如何利用网络学习英语，请你根据以下提示撰写一篇发言稿。",
    points: [
      "介绍你是如何利用网络学习英语的（至少写出两点）",
      "简单谈谈你对利用网络学习英语的看法",
      "请友好校的学生分享他们的经验"
    ],
    vocab: ["online learning", "language acquisition", "educational resources", "video clips", "exchange experience"],
    wordCount: "不少于100词",
    notes: "开头和结尾已给出，不计入总词数"
  },
  {
    id: "gk2020_6", year: 2020, month: 6, season: "夏季第二次笔试",
    type: "邮件“, topic: ”成人礼活动",
    title: "2020年6月 · 成人礼活动邮件",
    body: "假如你是晨光中学高三学生李津，你校于6月8日举办了成人礼活动。你的英国朋友Chris很想了解该活动。你于当晚给Chris回一封电子邮件，介绍有关情况。",
    points: [
      "成人礼活动内容（成长点滴回顾，观看校友抗疫事迹录像等）",
      "对活动的感受",
      "对自己未来的展望"
    ],
    vocab: ["coming-of-age ceremony", "COVID-19", "growth memories", "alumni", "look forward to the future"],
    wordCount: "不少于100词",
    notes: "参考词汇：成人礼 the coming-of-age ceremony，新冠肺炎 COVID-19；开头已给出，不计入总词数"
  },
  // 2021
  {
    id: "gk2021_3", year: 2021, month: 3, season: "春季第一次笔试",
    type: "投稿“, topic: ”最美中华/地方介绍",
    title: "2021年3月 · 最美中华栏目投稿",
    body: "假设你是晨光中学的李津。我市为外国友人提供生活信息的某英文网站新增了《最美中华》栏目，请你给该栏目投稿，介绍一个国内你喜欢或去过的地方。",
    points: [
      "该地方的基本情况（如名称、地理位置等）",
      "该地方的特色（如文化、景点等）",
      "你对该地方的印象和感受"
    ],
    vocab: ["A Beautiful Place in China", "geographical location", "cultural heritage", "scenic spots", "leave a deep impression"],
    wordCount: "不少于100词",
    notes: "标题和署名已给出：A Beautiful Place in China March 19, 2021 By Li Jin"
  },
  {
    id: "gk2021_6", year: 2021, month: 6, season: "夏季第二次笔试",
    type: "回信“, topic: ”感谢/假期计划/专业选择",
    title: "2021年6月 · 假期计划与专业选择回信",
    body: "假如你是晨光中学的李津。你在英国游学期间曾寄宿在英国学生Chris家，他母亲Nancy通过电子邮件祝贺你顺利完成高中学业，并询问你将如何安排高中最后一个假期。请你用英语回复。",
    points: [
      "表示感谢并问候",
      "计划与家人一起做的事情",
      "你决定选择哪个专业，为学好该专业做何准备"
    ],
    vocab: ["express gratitude", "summer vacation", "major in", "academic preparation", "further study"],
    wordCount: "不少于100词",
    notes: "开头和结尾已给出，不计入总词数"
  },
  // 2022
  {
    id: "gk2022_3", year: 2022, month: 3, season: "春季第一次笔试",
    type: "回信“, topic: ”改掉习惯/自我提升",
    title: "2022年3月 · 改掉习惯回信",
    body: "假设你是晨光中学学生李津。你的英国朋友Chris在最近的一封邮件中提到，他想改掉每天长时间玩网络游戏的习惯，做更好的自己。请按以下提示写封回信。",
    points: [
      "你也打算改掉的一个习惯（或缺点、不足）",
      "它给你的学习或生活带来的影响",
      "你的计划和决心"
    ],
    vocab: ["overcome addiction", "bad habit", "stay up late", "concentrate", "be determined to", "improve oneself"],
    wordCount: "不少于100词",
    notes: "开头和结尾已给出，不计入总词数"
  },
  {
    id: "gk2022_6", year: 2022, month: 6, season: "夏季第二次笔试",
    type: "视频稿“, topic: ”社团纳新",
    title: "2022年6月 · 口语社纳新视频稿",
    body: "假设你是晨光中学英语口语社的成员李津。为招募新成员，口语社请你用英语为社团纳新活动录制一段短视频。请按照以下提示，撰写视频的文字稿。",
    points: [
      "向同学们发出入社邀请",
      "介绍口语社的主要活动（如英语演讲比赛、观看英语电影等活动）",
      "分享本人入社以来的收获"
    ],
    vocab: ["English Speaking Club", "recruit", "speech contest", "benefit from", "oral English", "personal growth"],
    wordCount: "不少于100词",
    notes: "可适当加入细节，使内容充实、行文连贯"
  },
  // 2023
  {
    id: "gk2023_3", year: 2023, month: 3, season: "春季第一次笔试",
    type: "回信“, topic: ”活雷锋/汉语学习",
    title: "2023年3月 · \"活雷锋\"含义回信",
    body: "假设你是晨光中学学生李津。你的英国朋友Chris热爱学习汉语，上周他在邮件中向你询问\"活雷锋\"这一表达是什么意思。请根据以下提示回复邮件。",
    points: [
      "解释\"活雷锋\"的意思",
      "举一个身边\"活雷锋\"的例子",
      "鼓励他继续学习汉语"
    ],
    vocab: ["a living Lei Feng", "selfless", "helpful", "role model", "Chinese language learning", "encourage"],
    wordCount: "不少于100词",
    notes: "参考词汇：活雷锋 a living Lei Feng；开头已给出，不计入总词数"
  },
  {
    id: "gk2023_6", year: 2023, month: 6, season: "夏季第二次笔试",
    type: "申请信“, topic: ”中国工坊/文化交流",
    title: "2023年6月 · 中国工坊申请信",
    body: "假设你是晨光中学的学生李津，通过交换生项目在英国某中学就读，校方为加强中英文化交流，将举办\"中国工坊\"活动。该活动主题涉及中华美食、中国传统手工艺、中国书法和绘画，拟招募学生现场教授相关技能。请按照以下提示，写一封申请信。",
    points: [
      "申请参加本次活动",
      "阐述你对本次文化交流活动意义的理解",
      "结合个人兴趣和特长，说明拟教授何种技能，并阐述原因"
    ],
    vocab: ["Chinese Workshop", "Chinese cuisine", "handicraft", "calligraphy", "cultural exchange", "apply for", "specialty"],
    wordCount: "不少于100词",
    notes: "参考词汇：中国工坊 Chinese Workshop，中华美食 Chinese cuisine，手工艺 handicraft，书法 calligraphy；开头和结尾已给出，不计入总词数"
  },
  // 2024
  {
    id: "gk2024_3", year: 2024, month: 3, season: "春季第一次笔试",
    type: "网络留言“, topic: ”科技应用",
    title: "2024年3月 · 科技应用网络留言",
    body: "假设你是晨光中学的学生李津。一位外国游客近日在Understanding China网站上发布短视频，赞叹科技在中国人购物、出行、学习等方面的广泛应用，一位名为Chris的网友在评论区询问是否确实如此。请根据以下提示留言。",
    points: [
      "对视频反映的情况予以肯定",
      "介绍科技在你生活中的应用",
      "希望国际友人来中国亲身体验"
    ],
    vocab: ["video clip", "technology", "mobile payment", "high-speed train", "touch screen", "experience in person"],
    wordCount: "不少于100词",
    notes: "参考词汇：短视频 video clip；开头已给出（Li Jin @Chris Posted on Mar. 15, 2024）"
  },
  {
    id: "gk2024_6", year: 2024, month: 6, season: "夏季第二次笔试",
    type: "演讲稿“, topic: ”低碳校园",
    title: "2024年6月 · 低碳校园演讲稿",
    body: "假设你是晨光中学的学生李津，学校即将举办\"低碳校园，从我做起\"英语主题演讲活动，你要报名参加。请根据以下提示，写一篇演讲稿。",
    points: [
      "指出校园中不符合低碳环保理念的现象",
      "建议从身边小事做起，如……",
      "号召大家行动起来"
    ],
    vocab: ["low carbon campus", "environmental protection", "energy saving", "take action", "start from small things", "sustainable"],
    wordCount: "不少于100词",
    notes: "参考词汇：低碳校园 low carbon campus；开头和结尾已给出，不计入总词数"
  },
  // 2025
  {
    id: "gk2025_6", year: 2025, month: 6, season: "夏季第二次笔试",
    type: "论坛跟帖“, topic: ”航天文化光盘",
    title: "2025年6月 · 航天文化光盘论坛跟帖",
    body: "假如你是晨光中学的李津，你在宇航爱好者论坛（Space Awaits）中看到一则英文讨论帖：一张记录人类文明的光盘将随探测器飞向外太空，该光盘拟收录具有代表性的音像资料。全球网友投票选出6个最佳材料：京剧、金字塔、长城、中国高铁、大自然动物声音和每个国家不同语言的\"你好\"。请你根据以下提示进行跟帖。",
    points: [
      "对六项提名进行概括性评论",
      "在六项中选择一项或另行推介一项你认为最值得收录的，并给出理由"
    ],
    vocab: ["Space Awaits", "Peking Opera", "the Great Wall", "China's high-speed trains", "Pyramid", "cultural symbol", "representative"],
    wordCount: "不少于100词",
    notes: "开头和结尾已给出，不计入总词数；六项提名：1. Hello in different languages 2. The Great Wall 3. Peking Opera 4. Pyramid 5. The sounds of animals in nature 6. China's high-speed trains"
  }
];

// ---------- 天津各区模拟题 ----------
var GAOKAO_MOCK_PROMPTS = [
  // 2023 区模拟
  {
    id: "gk2023_mock_hedong_2", year: 2023, month: 0, season: "河东区二模",
    type: "活动报道“, topic: ”用英语讲中国故事",
    title: "2023河东区二模 · 用英语讲中国故事活动报道",
    body: "假设你是晨光中学英语社团的成员李津。为弘扬中国优秀传统文化，提高学生英语表达能力，社团在上周举行了一次“用英语讲中国故事”征文比赛活动，成员们踊跃参加，取得圆满成功。请你按照以下提示，用英语为社团写一个活动报道。",
    points: [
      "介绍活动的基本情况（主题、时间、参与方式、人员等）",
      "介绍活动的主要意义与效果",
      "分享本人参加活动的收获"
    ],
    vocab: ["Stories of China Retold in English", "essay contest", "traditional culture", "cultural confidence"],
    wordCount: "不少于100词",
    notes: "参考词汇：用英语讲中国故事 Stories of China Retold in English，征文比赛 essay contest",
    mock: true, district: "河东区"
  },
  {
    id: "gk2023_mock_hexi_2", year: 2023, month: 0, season: "河西区二模",
    type: "报道“, topic: ”师生篮球友谊赛",
    title: "2023河西区二模 · 师生篮球友谊赛报道",
    body: "假如你是晨光中学高三学生李津。为了丰富学校生活，上周日你校举办了一场师生篮球友谊赛，由高三学生代表队对战教师代表队。请你为校英文报写一篇报道。",
    points: [
      "活动目的",
      "活动过程",
      "活动意义"
    ],
    vocab: ["basketball friendly", "enrich school life", "teamwork", "sportsmanship"],
    wordCount: "不少于100词",
    notes: "标题已给出：A Teacher-Student Basketball Friendly",
    mock: true, district: "河西区"
  },
  {
    id: "gk2023_mock_tongkao_2", year: 2023, month: 0, season: "统考二模",
    type: "回信“, topic: ”国际交流生演讲",
    title: "2023统考二模 · Chris班会课演讲回复",
    body: "假如你是晨光中学李津。你班的国际交流生Chris准备在班会课上做一次专题演讲。现在Chris通过微信（Wechat）向大家征询意见。请你根据下列提示，给Chris回复。",
    points: [
      "Chris的到来带来的变化",
      "请Chris谈谈在中国学习的感受",
      "希望Chris给出一些提高学习英语效率的建议"
    ],
    vocab: ["international exchange student", "class meeting", "presentation", "efficiency"],
    wordCount: "不少于100词",
    notes: "@Chris 格式留言",
    mock: true, district: "统考"
  },
  {
    id: "gk2023_mock_xiaoliankao_2", year: 2023, month: 0, season: "校联考二模",
    type: "广播稿", topic: "21天个人挑战",
    title: "2023校联考二模 · 21天个人挑战广播稿",
    body: "假设你是红星中学学生会主席李华，最近学校拟开展一个为期21天的个人挑战活动，旨在帮助学生发现自身不足，提升自我。请你为学校广播站写一篇广播稿，宣传此次活动。",
    points: [
      "举办该活动目的",
      "列举参加此次活动的益处",
      "鼓励同学们踊跃报名"
    ],
    vocab: ["21-Day Challenge", "self-improvement", "discover potential", "sign up"],
    wordCount: "100词左右",
    notes: "参考词汇：21天个人挑战 21-Day Challenge",
    mock: true, district: "校联考"
  },
  // 2024 区模拟
  {
    id: "gk2024_mock_hongqiao_1", year: 2024, month: 0, season: "红桥区一模",
    type: "回信“, topic: ”中国象棋大赛",
    title: "2024红桥区一模 · 中国象棋大赛回信",
    body: "假定你是学生会主席李津，你校的交换生Mike已学习中国象棋长达一年，特发邮件向你询问将由学生会举办的中国象棋大赛的情况。请你回复邮件。",
    points: [
      "举办比赛的目的",
      "比赛的时间和地点",
      "建议他报名参加并说明理由"
    ],
    vocab: ["Chinese Chess Contest", "exchange student", "sign up", "participate"],
    wordCount: "不少于100词",
    notes: "参考词汇：中国象棋大赛 Chinese Chess Contest；开头和结尾已给出，不计入总词数",
    mock: true, district: "红桥区"
  },
  {
    id: "gk2024_mock_hexi_1", year: 2024, month: 0, season: "河西区一模",
    type: "发言稿“, topic: ”元宵节介绍",
    title: "2024河西区一模 · 元宵节发言稿",
    body: "假设你是晨光中学学生会主席李津，在元宵节来临之际，英国姊妹校师生来校访问，希望了解中国传统节日。请根据以下提示，写一篇发言稿。",
    points: [
      "表示欢迎",
      "介绍元宵节（至少包括两点）",
      "邀请他们参加元宵节活动"
    ],
    vocab: ["The Lantern Festival", "traditional festival", "sweet dumplings", "lantern riddles"],
    wordCount: "不少于100词",
    notes: "参考词汇：元宵节 The Lantern Festival",
    mock: true, district: "河西区"
  },
  {
    id: "gk2024_mock_hedong_1", year: 2024, month: 0, season: "河东区一模",
    type: "回信“, topic: ”英语艺术节",
    title: "2024河东区一模 · 英语艺术节回信",
    body: "假设你是晨光中学的学生李津，与你以前的外籍教师Mrs. Green一直保持联系，她对你们学校每年举办一次的“英语艺术节”非常感兴趣。近日她来信询问去年的“英语艺术节”活动情况，请根据以下提示给她回复一封邮件。",
    points: [
      "活动时间：去年年底，为期一个月",
      "活动内容及意义",
      "对活动的感受",
      "感谢Mrs. Green多年来的关心和帮助，邀请她再来天津"
    ],
    vocab: ["English Art Festival", "appreciate", "cultural exchange", "look forward to"],
    wordCount: "不少于100词",
    notes: "开头和结尾已给出，不计入总词数",
    mock: true, district: "河东区"
  },
  {
    id: "gk2024_mock_12xiao_2", year: 2024, month: 0, season: "十二校二模",
    type: "留言“, topic: ”外貌焦虑",
    title: "2024十二校二模 · 外貌焦虑留言",
    body: "目前，许多年轻人在网上讨论“外貌焦虑”的热门话题，你和大多数同学的观点是：We need to judge people by what they are like, not what they look like. 请根据下面提示写一篇留言。",
    points: [
      "对你的观点进行简单阐述",
      "分析该观点合理的原因（内在美更加重要等），并举身边的例子证明",
      "提出倡议"
    ],
    vocab: ["appearance anxiety", "sincere and honest", "industry", "inner beauty"],
    wordCount: "不少于100词",
    notes: "参考词汇：真诚的 sincere and honest，勤劳 industry n. industrious adj.",
    mock: true, district: "十二校联考"
  },
  {
    id: "gk2024_mock_nankai_3", year: 2024, month: 0, season: "南开中学第三次月考",
    type: "回信“, topic: ”甘肃地震灾区捐款",
    title: "2024南开中学月考 · 甘肃地震灾区捐款回信",
    body: "假设你是晨光中学高三学生李津。你的英国朋友Chris在China Daily上看到一些中学生团体为甘肃地震灾区积极捐款捐物的新闻，向你了解你校学生参与类似活动的情况，并询问你校学生组织的其他大型活动。请你给Chris回一封电子邮件，介绍相关情况。",
    points: [
      "介绍学生向灾区捐款捐物的相关情况",
      "介绍学生组织的其他大型活动（如体育、文艺等方面）",
      "你对参与校园活动的印象和感受"
    ],
    vocab: ["earthquake-stricken area", "donate", "fundraising", "campus activities"],
    wordCount: "不少于100词",
    notes: "开头和结尾已给出，不计入总词数",
    mock: true, district: "南开中学"
  },
  {
    id: "gk2024_mock_yizhong_2", year: 2024, month: 0, season: "天津一中第二次月考",
    type: "报道“, topic: ”凉山义卖",
    title: "2024天津一中月考 · 凉山义卖活动报道",
    body: "假设你是李津，10月26日中午12:30你校在校园举办了“凉山义卖”活动，为四川凉山的贫困孩子们筹款。请你给学校公众号写一篇稿子，报道此次活动。",
    points: [
      "活动的时间地点",
      "活动内容（学生做的手工艺品义卖，学生歌曲乐器表演）",
      "收获和感受"
    ],
    vocab: ["charity sale", "handicrafts", "fundraising", "kindness"],
    wordCount: "100词左右",
    notes: "参考词汇：义卖 charity sale，手工艺品 handicrafts；标题已给出：Kindness lights up our life",
    mock: true, district: "天津一中"
  },
  // 2025 区模拟
  {
    id: "gk2025_mock_hebei_2", year: 2025, month: 0, season: "河北区二模",
    type: "演讲稿“, topic: ”我的高三年度词",
    title: "2025河北区二模 · 我的高三年度词演讲稿",
    body: "假设你是晨光中学的学生李津，学校英语俱乐部即将举办“我的高三年度词”英语主题演讲活动，要求同学们根据个人的学习生活选择一个高三年度词进行分享。你很感兴趣并报名参加。请根据以下提示，写一篇演讲稿。",
    points: [
      "介绍并解释你所选的这个年度词（如：乐观、成长、挑战、感恩等或另选其他词）",
      "结合该年度词讲述你的亲身经历",
      "分享该年度词对你未来学习生活或个人发展的意义及展望"
    ],
    vocab: ["optimism", "growth", "challenge", "gratitude", "senior year"],
    wordCount: "不少于100词",
    notes: "题目已给出，不计入总词数",
    mock: true, district: "河北区"
  },
  // 2024 区模拟（含参考范文）
  {
    id: "gk2024_mock_safety", year: 2024, month: 0, season: "区模拟·防灾减灾",
    type: "\u56de\u4fe1", topic: "\u5b89\u5168\u6559\u80b2/\u9632\u707e\u51cf\u707e",
    title: "2024区模拟 \u00b7 \u5b89\u5168\u8fdb\u6821\u56ed\u56de\u4fe1",
    body: "\u5047\u8bbe\u4f60\u662f\u7ea2\u661f\u4e2d\u5b66\u7684\u9ad8\u4e09\u5b66\u751f\u674e\u6d25\u3002\u5728\u7b2c16\u4e2a\u5168\u56fd\u9632\u707e\u51cf\u707e\u65e5\u5230\u6765\u4e4b\u9645\uff0c\u4f60\u4eec\u5b66\u6821\u5f00\u5c55\u4e86\u4e00\u6b21\u4ee5\u201c\u5b89\u5168\u8fdb\u6821\u56ed\u201d\u4e3a\u4e3b\u9898\u7684\u6559\u80b2\u6d3b\u52a8\u3002\u4f60\u6821\u56fd\u9645\u90e8\u4ea4\u6362\u751fChris\u5bf9\u6b64\u5f88\u611f\u5174\u8da3\uff0c\u53d1\u6765\u90ae\u4ef6\u8be2\u95ee\u60c5\u51b5\u3002\u8bf7\u4f60\u7528\u82f1\u6587\u7ed9\u4ed6\u56de\u590d\uff0c\u5185\u5bb9\u5305\u62ec\uff1a(1)\u6d3b\u52a8\u76ee\u7684\uff1b(2)\u6d3b\u52a8\u5b89\u6392\u3002",
    points: [
      "\u6d3b\u52a8\u76ee\u7684\uff08\u63d0\u9ad8\u5b89\u5168\u610f\u8bc6/\u9632\u707e\u51cf\u707e\uff09",
      "\u6d3b\u52a8\u5b89\u6392\uff08\u4e13\u5bb6\u8bb2\u5ea7\u3001\u53d1\u653e\u5ba3\u4f20\u624b\u518c\u7b49\uff09"
    ],
    vocab: ["National Disaster Prevention and Reduction Day", "safety education", "evacuation", "brochure"],
    wordCount: "\u4e0d\u5c11\u4e8e100\u8bcd",
    notes: "\u53c2\u8003\u8bcd\u6c47\uff1a\u5168\u56fd\u9632\u707e\u51cf\u707e\u65e5 National Disaster Prevention and Reduction Day",
    mock: true, district: "\u533a\u6a21\u62df", hasSample: true
  },
  {
    id: "gk2024_mock_tianjin_scenery", year: 2024, month: 0, season: "区模拟·天津景点",
    type: "\u63a8\u8350\u4fe1", topic: "\u5929\u6d25\u666f\u70b9/\u6587\u5316",
    title: "2024区模拟 \u00b7 \u63a8\u8350\u5929\u6d25\u53e4\u6587\u5316\u8857",
    body: "\u5047\u8bbe\u4f60\u662f\u6668\u5149\u4e2d\u5b66\u7684\u5b66\u751f\u674e\u6d25\u3002\u4f60\u7684\u82f1\u56fd\u597d\u53cbChris\u53d1\u6765\u90ae\u4ef6\u8868\u793a\u5373\u5c06\u6765\u6d25\uff0c\u5e76\u6253\u7b97\u5229\u7528\u8fd9\u6b21\u673a\u4f1a\u6e38\u89c8\u4e00\u5904\u5929\u6d25\u666f\u70b9\uff0c\u8bf7\u4f60\u56de\u4fe1\u3002\u5185\u5bb9\u5e94\u5305\u62ec\u4ee5\u4e0b\u8981\u70b9\uff1a(1)\u63a8\u8350\u4e00\u5904\u5929\u6d25\u666f\u70b9\uff08\u540d\u79f0\u3001\u4f4d\u7f6e\uff09\uff1b(2)\u8bf4\u660e\u63a8\u8350\u7406\u7531\uff1b(3)\u51fa\u6e38\u65f6\u7684\u6ce8\u610f\u4e8b\u9879\u3002",
    points: [
      "\u63a8\u8350\u5929\u6d25\u53e4\u6587\u5316\u8857\uff08\u540d\u79f0\u3001\u4f4d\u7f6e\uff09",
      "\u63a8\u8350\u7406\u7531\uff08\u5386\u53f2\u6587\u5316\u3001\u4f20\u7edf\u5efa\u7b51\u3001\u5c0f\u5403\u7b49\uff09",
      "\u51fa\u6e38\u6ce8\u610f\u4e8b\u9879\uff08\u51ac\u5b63\u4fdd\u6696\u3001\u907f\u5f00\u4eba\u6d41\u9ad8\u5cf0\u7b49\uff09"
    ],
    vocab: ["Ancient Culture Street", "tourist attraction", "traditional architecture", "handicrafts", "local snacks"],
    wordCount: "\u4e0d\u5c11\u4e8e100\u8bcd",
    notes: "\u5f00\u5934\u548c\u7ed3\u5c3e\u5df2\u7ed9\u51fa\uff0c\u4e0d\u8ba1\u5165\u603b\u8bcd\u6570",
    mock: true, district: "\u533a\u6a21\u62df", hasSample: true
  },
  {
    id: "gk2025_mock_green_transport", year: 2025, month: 0, season: "区模拟·绿色交通",
    type: "\u56de\u4fe1", topic: "\u73af\u4fdd\u9879\u76ee/\u7eff\u8272\u4ea4\u901a",
    title: "2025区模拟 \u00b7 \u7eff\u8272\u4ea4\u901a\u65e5\u56de\u4fe1",
    body: "\u5047\u8bbe\u4f60\u662f\u6668\u5149\u4e2d\u5b66\u7684\u9ad8\u4e09\u5b66\u751f\u674e\u6d25\u3002\u6700\u8fd1\u4f60\u6821\u5f00\u5c55\u4e86\u4e00\u4e2a\u4e3b\u9898\u4e3a\u201c\u7eff\u8272\u4ea4\u901a\u65e5\u201d\u7684\u73af\u4fdd\u9879\u76ee\u3002\u4f60\u6821\u56fd\u9645\u90e8\u4ea4\u6362\u751fChris\u5bf9\u6b64\u5f88\u611f\u5174\u8da3\uff0c\u53d1\u6765\u90ae\u4ef6\u8be2\u95ee\u3002\u8bf7\u4f60\u7528\u82f1\u6587\u7ed9\u4ed6\u56de\u590d\uff0c\u5185\u5bb9\u5305\u62ec\uff1a(1)\u9879\u76ee\u7684\u5177\u4f53\u5185\u5bb9\u548c\u76ee\u7684\uff1b(2)\u9879\u76ee\u5bf9\u4f60\u548c\u540c\u5b66\u4eec\u7684\u5f71\u54cd\uff1b(3)\u9080\u8bf7Chris\u5206\u4eab\u4ed6\u7684\u5b66\u6821\u662f\u5426\u6709\u7c7b\u4f3c\u7684\u73af\u4fdd\u6d3b\u52a8\u3002",
    points: [
      "\u9879\u76ee\u5185\u5bb9\u548c\u76ee\u7684\uff08\u9f13\u52b1\u6b65\u884c/\u9a91\u884c/\u516c\u5171\u4ea4\u901a\uff09",
      "\u5bf9\u4e2a\u4eba\u548c\u540c\u5b66\u7684\u5f71\u54cd\uff08\u73af\u4fdd\u610f\u8bc6\u63d0\u5347\uff09",
      "\u9080\u8bf7Chris\u5206\u4eab\u7c7b\u4f3c\u6d3b\u52a8"
    ],
    vocab: ["Green Transportation Day", "eco-friendly commuting", "carbon footprint", "sustainable living"],
    wordCount: "\u4e0d\u5c11\u4e8e100\u8bcd",
    notes: "\u53c2\u8003\u8bcd\u6c47\uff1a\u7eff\u8272\u4ea4\u901a\u65e5 Green Transportation Day",
    mock: true, district: "\u533a\u6a21\u62df", hasSample: true
  },
  {
    id: "gk2024_mock_yugong", year: 2024, month: 0, season: "区模拟·中国故事",
    type: "\u5f81\u6587\u6295\u7a3f", topic: "\u611a\u516c\u79fb\u5c71/\u4e2d\u56fd\u6545\u4e8b",
    title: "2024区模拟 \u00b7 \u611a\u516c\u79fb\u5c71\u5f81\u6587\u6295\u7a3f",
    body: "\u5047\u8bbe\u4f60\u662f\u6668\u5149\u4e2d\u5b66\u7684\u5b66\u751f\u674e\u6d25\u3002\u5b66\u6821\u6b63\u5728\u4e3e\u529e\u4e3b\u9898\u4e3a\u201c\u7528\u82f1\u6587\u8bb2\u4e2d\u56fd\u6545\u4e8b\u201d\u7684\u5f81\u6587\u6d3b\u52a8\u3002\u8bf7\u4f60\u4ee5\u201c\u611a\u516c\u79fb\u5c71\u201d\u4e3a\u9898\u5199\u4e00\u7bc7\u82f1\u8bed\u77ed\u6587\u6295\u7a3f\uff0c\u5185\u5bb9\u5305\u62ec\uff1a(1)\u201c\u611a\u516c\u79fb\u5c71\u201d\u7684\u6545\u4e8b\u6897\u6982\uff1b(2)\u610f\u4e49\u6216\u542f\u793a\u3002",
    points: [
      "\u611a\u516c\u79fb\u5c71\u7684\u6545\u4e8b\u6897\u6982",
      "\u610f\u4e49\u6216\u542f\u793a\uff08\u575a\u6301\u4e0d\u61c8\u3001\u6709\u5fd7\u8005\u4e8b\u7adf\u6210\uff09"
    ],
    vocab: ["Yu Gong", "foolish old man", "perseverance", "Where there is a will, there is a way"],
    wordCount: "\u4e0d\u5c11\u4e8e100\u8bcd",
    notes: "\u5f00\u5934\u5df2\u7ed9\u51fa\uff0c\u4e0d\u8ba1\u5165\u603b\u8bcd\u6570\uff1aOnce upon a time, there lived an old man named Yu Gong, which means \u201cfoolish old man\u201d in English.",
    mock: true, district: "\u533a\u6a21\u62df", hasSample: true
  },
  {
    id: "gk2024_mock_guizhou", year: 2024, month: 0, season: "区模拟·支教建议",
    type: "\u56de\u4fe1", topic: "\u652f\u6559/\u8d35\u5dde",
    title: "2024区模拟 \u00b7 \u8d35\u5dde\u652f\u6559\u56de\u4fe1",
    body: "\u5047\u8bbe\u4f60\u662f\u6668\u5149\u4e2d\u5b66\u7684\u5b66\u751f\u674e\u6d25\u3002\u4f60\u66fe\u7ecf\u7684\u5916\u6559\u8001\u5e08Chris\u4e0b\u4e2a\u6708\u8981\u5230\u8d35\u5dde\u7684\u8d2b\u56f0\u53bf\u505a\u5fd7\u613f\u8005\u652f\u6559\u4e00\u5e74\u3002\u4e34\u884c\u524d\u4ed6\u5411\u4f60\u54a8\u8be2\u5f53\u5730\u7684\u60c5\u51b5\u548c\u5e94\u505a\u7684\u51c6\u5907\u3002\u8bf7\u4f60\u7ed9Chris\u56de\u4fe1\uff0c\u4fe1\u7684\u5185\u5bb9\u987b\u5305\u62ec\uff1a(1)\u4ecb\u7ecd\u5730\u57df\u7279\u70b9\uff0c\u5e76\u7ed9\u4e88\u751f\u6d3b\u6307\u5357\uff1b(2)\u63d0\u51fa\u4f60\u7684\u6559\u5b66\u5efa\u8bae\uff08\u52a0\u5f3a\u542c\u8bf4\u6559\u5b66\u3001\u6ce8\u91cd\u8bed\u8a00\u5b9e\u8df5\u7b49\uff09\uff1b(3)\u8868\u8fbe\u2026\u2026",
    points: [
      "\u8d35\u5dde\u5730\u57df\u7279\u70b9\uff08\u5c71\u533a\u3001\u6c11\u65cf\u591a\u6837\u3001\u6c14\u5019\u6e7f\u6da6\uff09",
      "\u751f\u6d3b\u6307\u5357\uff08\u96e8\u5177\u3001\u65b9\u8a00\u7b49\uff09",
      "\u6559\u5b66\u5efa\u8bae\uff08\u542c\u8bf4\u3001\u89d2\u8272\u626e\u6f14\u3001\u8bed\u8a00\u5b9e\u8df5\u7b49\uff09",
      "\u8868\u8fbe\u795d\u798f\u4e0e\u671f\u5f85"
    ],
    vocab: ["volunteer teaching", "rural area", "ethnic diversity", "listening and speaking", "role-play"],
    wordCount: "\u4e0d\u5c11\u4e8e100\u8bcd",
    notes: "\u5f00\u5934\u548c\u7ed3\u5c3e\u5df2\u7ed9\u51fa\uff0c\u4e0d\u8ba1\u5165\u603b\u8bcd\u6570",
    mock: true, district: "\u533a\u6a21\u62df", hasSample: true
  },
  {
    id: "gk2025_mock_ai_learning", year: 2025, month: 0, season: "区模拟·AI学习",
    type: "\u56de\u4fe1", topic: "AI\u8f85\u52a9\u5b66\u4e60/\u79d1\u6280",
    title: "2025区模拟 \u00b7 AI\u8f85\u52a9\u82f1\u8bed\u5b66\u4e60\u56de\u4fe1",
    body: "\u5047\u8bbe\u4f60\u662f\u674e\u6d25\uff0c\u4f60\u7684\u82f1\u56fd\u7b14\u53cbTom\u5bf9AI\uff08\u4eba\u5de5\u667a\u80fd\uff09\u8f85\u52a9\u82f1\u8bed\u5b66\u4e60\u5f88\u611f\u5174\u8da3\uff0c\u4ed6\u60f3\u4e86\u89e3\u4f60\u5728\u82f1\u8bed\u5b66\u4e60\u4e2d\u4f7f\u7528AI\u7684\u60c5\u51b5\u3002\u8bf7\u4f60\u7ed9\u4ed6\u56de\u4e00\u5c01\u90ae\u4ef6\uff0c\u5185\u5bb9\u5305\u62ec\uff1a(1)\u4f60\u4f7f\u7528\u7684AI\u8f6f\u4ef6\uff08\u5982DeepSeek\u3001\u8c46\u5305\u7b49\uff09\u5bf9\u4f60\u82f1\u8bed\u5b66\u4e60\u7684\u5e2e\u52a9\uff08\u6574\u7406\u9519\u9898\u3001\u6da6\u8272\u4f5c\u6587\u7b49\uff09\uff1b(2)\u4f60\u5bf9AI\u8f85\u52a9\u82f1\u8bed\u5b66\u4e60\u7684\u770b\u6cd5\uff0c\u91cd\u70b9\u9610\u8ff0\u5982\u4f55\u5408\u7406\u4f7f\u7528AI\uff0c\u907f\u514d\u8fc7\u5ea6\u4f9d\u8d56\u3002",
    points: [
      "AI\u8f6f\u4ef6\u7684\u5e2e\u52a9\uff08\u8bed\u6cd5\u89e3\u91ca\u3001\u4f5c\u6587\u6da6\u8272\u3001\u9519\u9898\u6574\u7406\uff09",
      "\u5bf9AI\u8f85\u52a9\u5b66\u4e60\u7684\u770b\u6cd5\uff08\u5de5\u5177\u5f3a\u5927\u4f46\u987b\u907f\u514d\u8fc7\u5ea6\u4f9d\u8d56\uff09",
      "\u5408\u7406\u4f7f\u7528\u5efa\u8bae\uff08\u72ec\u7acb\u601d\u8003\u3001\u4e0d\u76f2\u76ee\u4f9d\u8d56\uff09"
    ],
    vocab: ["AI-assisted learning", "DeepSeek", "polish compositions", "over-reliance", "think independently"],
    wordCount: "\u4e0d\u5c11\u4e8e100\u8bcd",
    notes: "\u5f00\u5934\u548c\u7ed3\u5c3e\u5df2\u7ed9\u51fa\uff0c\u4e0d\u8ba1\u5165\u603b\u8bcd\u6570",
    mock: true, district: "\u533a\u6a21\u62df", hasSample: true
  },
  {
    id: "gk2025_mock_club_video", year: 2025, month: 0, season: "区模拟·校园短视频",
    type: "\u90ae\u4ef6", topic: "\u6821\u56ed\u751f\u6d3b/\u793e\u56e2",
    title: "2025区模拟 \u00b7 \u6821\u56ed\u751f\u6d3b\u77ed\u89c6\u9891\u5efa\u8bae",
    body: "\u5047\u8bbe\u4f60\u662f\u6668\u5149\u4e2d\u5b66\u7684\u5b66\u751f\u674e\u6d25\u3002\u4f60\u6821\u82f1\u56fd\u4ea4\u6362\u751fChris\u4e3a\u6821\u82f1\u8bed\u4ff1\u4e50\u90e8\u7b56\u5212\u201cExploring the Life of Chinese Students\u201d\u680f\u76ee\uff0c\u6253\u7b97\u62cd\u6444\u77ed\u89c6\u9891\u6765\u5411\u56fd\u5916\u5b66\u751f\u5c55\u73b0\u4e2d\u56fd\u5b66\u751f\u7684\u6821\u56ed\u751f\u6d3b\uff0c\u5e0c\u671b\u4f60\u63d0\u4f9b\u4e00\u4e9b\u5efa\u8bae\u3002\u8bf7\u4f60\u7528\u82f1\u8bed\u7ed9\u4ed6\u5199\u4e00\u5c01\u90ae\u4ef6\uff0c\u5185\u5bb9\u5305\u62ec\uff1a(1)\u63a8\u8350\u62cd\u6444\u7684\u5185\u5bb9\uff08\u4ece\u5b66\u4e60\u751f\u6d3b\u3001\u4f53\u80b2\u953b\u70bc\u3001\u793e\u56e2\u6d3b\u52a8\u3001\u6821\u56ed\u5fd7\u613f\u670d\u52a1\u7b49\u5185\u5bb9\u4e2d\u4efb\u9009\u4e00\u9879\uff09\uff1b(2)\u8bf4\u660e\u63a8\u8350\u62cd\u6444\u8be5\u5185\u5bb9\u7684\u7406\u7531\uff08\u81f3\u5c113\u70b9\uff09\uff1b(3)\u8868\u793a\u613f\u610f\u4e3a\u62cd\u6444\u63d0\u4f9b\u5e2e\u52a9\uff0c\u5e76\u9001\u4e0a\u7f8e\u597d\u795d\u798f\u3002",
    points: [
      "\u63a8\u8350\u62cd\u6444\u5185\u5bb9\uff08\u793e\u56e2\u6d3b\u52a8\u7b49\uff09",
      "\u63a8\u8350\u7406\u7531\uff08\u81f3\u5c113\u70b9\uff09",
      "\u8868\u793a\u613f\u610f\u63d0\u4f9b\u5e2e\u52a9+\u795d\u798f"
    ],
    vocab: ["Exploring the Life of Chinese Students", "club activities", "personal growth", "teamwork", "extracurricular"],
    wordCount: "\u4e0d\u5c11\u4e8e100\u8bcd",
    notes: "\u5f00\u5934\u548c\u7ed3\u5c3e\u5df2\u7ed9\u51fa\uff0c\u4e0d\u8ba1\u5165\u603b\u8bcd\u6570",
    mock: true, district: "\u533a\u6a21\u62df", hasSample: true
  },
  {
    id: "gk2025_mock_heritage", year: 2025, month: 0, season: "区模拟·非遗文化",
    type: "\u8bba\u575b\u7559\u8a00", topic: "\u975e\u9057/\u4e2d\u56fd\u4e66\u6cd5",
    title: "2025区模拟 \u00b7 \u6625\u8282\u7533\u9057\u975e\u9057\u6587\u5316\u7559\u8a00",
    body: "\u5047\u8bbe\u4f60\u662f\u6668\u5149\u4e2d\u5b66\u7684\u5b66\u751f\u674e\u6d25\u3002\u4eca\u5e74\u662f\u4e2d\u56fd\u6625\u8282\u7533\u9057\u6210\u529f\u7684\u7b2c\u4e00\u5e74\uff0c\u56fd\u9645\u6587\u5316\u4ea4\u6d41\u8bba\u575b\u7684\u7ebf\u4e0a\u793e\u533a\u91cc\u4e16\u754c\u5404\u5730\u7684\u7f51\u53cb\u70ed\u70c8\u8ba8\u8bba\u4e2d\u56fd\u6587\u5316\u3002\u82f1\u56fd\u53cb\u4ebaTom\u5bf9\u4e2d\u56fd\u6587\u5316\u5174\u8da3\u6d53\u539a\uff0c\u4ed6\u53d1\u4e86\u4e00\u4e2a\u8be2\u95ee\u5e16\u60f3\u6df1\u5165\u4e86\u89e3\u9664\u6625\u8282\u4e4b\u5916\uff0c\u80fd\u4f53\u73b0\u4e2d\u56fd\u6587\u5316\u7cbe\u9ad3\u7684\u5176\u4ed6\u975e\u9057\u9879\u76ee\u3002\u8bf7\u4f60\u5728\u7f51\u7edc\u4e0a\u8fdb\u884c\u56de\u5e16\u3002\u5185\u5bb9\u5305\u62ec\uff1a(1)\u5bf9\u4e2d\u534e\u6587\u5316\u5728\u4e16\u754c\u8303\u56f4\u7684\u4f20\u64ad\u548c\u5f18\u626c\u611f\u5230\u81ea\u8c6a\uff1b(2)\u4ecb\u7ecd\u4e00\u9879\u5176\u4ed6\u975e\u9057\u9879\u76ee\uff08\u5982\u4eac\u5267\u3001\u526a\u7eb8\u3001\u4e66\u6cd5\u7b49\uff09\uff1b(3)\u9080\u8bf7Tom\u5728\u672a\u6765\u6709\u673a\u4f1a\u65f6\u6765\u4e2d\u56fd\u4f53\u9a8c\u3002",
    points: [
      "\u5bf9\u4e2d\u534e\u6587\u5316\u4f20\u64ad\u611f\u5230\u81ea\u8c6a",
      "\u4ecb\u7ecd\u4e00\u9879\u975e\u9057\u9879\u76ee\uff08\u5982\u4e2d\u56fd\u4e66\u6cd5\uff09",
      "\u9080\u8bf7Tom\u6765\u4e2d\u56fd\u4f53\u9a8c"
    ],
    vocab: ["intangible cultural heritage", "Chinese calligraphy", "Spring Festival", "cultural essence", "art form"],
    wordCount: "\u4e0d\u5c11\u4e8e100\u8bcd",
    notes: "\u5f00\u5934\u5df2\u7ed9\u51fa\uff1a@Tom Posted on Mar. 5th, 2025 10:00 AM Hi, Tom.",
    mock: true, district: "\u533a\u6a21\u62df", hasSample: true
  },
  {
    id: "gk2024_mock_tianjin620", year: 2024, month: 0, season: "区模拟·天津620",
    type: "\u5f81\u6587\u6295\u7a3f", topic: "\u5929\u6d25\u57ce\u5e02/\u6587\u5316",
    title: "2024区模拟 \u00b7 \u5929\u6d25620\u5c81\u751f\u65e5\u5f81\u6587",
    body: "2024\u5e7412\u670823\u65e5\u662f\u5929\u6d25620\u5c81\u7684\u751f\u65e5\uff0c\u6d25\u4e91\u65b0\u5a92\u4f53\u5411\u5168\u5e02\u5e02\u6c11\u5f81\u7a3f\uff0c\u732e\u793c\u5929\u6d25\u3002\u5047\u8bbe\u4f60\u662f\u6668\u5149\u4e2d\u5b66\u7684\u674e\u6d25\uff0c\u60f3\u79ef\u6781\u53c2\u4e0e\u6b64\u9879\u6d3b\u52a8\u3002\u8bf7\u6309\u4ee5\u4e0b\u63d0\u793a\u5411\u6d25\u4e91\u6295\u7a3f\uff1a(1)\u8868\u8fbe\u4f60\u5bf9\u5929\u6d25\u7684\u795d\u798f\uff1b(2)\u4ecb\u7ecd\u5929\u6d25\u7684\u7279\u8272\uff08\u5982\u6587\u5316\u3001\u7f8e\u98df\u3001\u666f\u70b9\u7b49\uff09\uff1b(3)\u4f60\u5bf9\u5929\u6d25\u7684\u5370\u8c61\u53ca\u5c55\u671b\u3002",
    points: [
      "\u8868\u8fbe\u5bf9\u5929\u6d25\u7684\u795d\u798f",
      "\u4ecb\u7ecd\u5929\u6d25\u7279\u8272\uff08\u72d7\u4e0d\u7406\u5305\u5b50\u3001\u53e4\u6587\u5316\u8857\u7b49\u7f8e\u98df\u4e0e\u666f\u70b9\uff09",
      "\u5bf9\u5929\u6d25\u7684\u5370\u8c61\u53ca\u5c55\u671b"
    ],
    vocab: ["Goubuli Baozi", "Ancient Culture Street", "cultural landmarks", "prosperity", "harmoniously blend"],
    wordCount: "\u4e0d\u5c11\u4e8e100\u8bcd",
    notes: "\u53ef\u9002\u5f53\u52a0\u5165\u7ec6\u8282\uff0c\u4f7f\u5185\u5bb9\u5145\u5b9e\u3001\u884c\u6587\u8fde\u8d2f",
    mock: true, district: "\u533a\u6a21\u62df", hasSample: true
  },
  {
    id: "gk2025_mock_nature", year: 2025, month: 0, season: "区模拟·自然演讲",
    type: "\u6f14\u8bb2\u7a3f", topic: "\u81ea\u7136/\u73af\u4fdd",
    title: "2025区模拟 \u00b7 Nature Is Our Best Teacher\u6f14\u8bb2\u7a3f",
    body: "\u5047\u8bbe\u4f60\u662f\u6668\u5149\u4e2d\u5b66\u7684\u5b66\u751f\u674e\u6d25\u3002\u5b66\u6821\u5373\u5c06\u4e3e\u529e\u9898\u4e3a\u201cNature Is Our Best Teacher\u201d\u7684\u82f1\u8bed\u6f14\u8bb2\u6d3b\u52a8\uff0c\u4f60\u6253\u7b97\u53c2\u52a0\uff0c\u8bf7\u6839\u636e\u4e0b\u9762\u63d0\u793a\u5199\u4e00\u7bc7\u6f14\u8bb2\u7a3f\u3002\u5185\u5bb9\u5305\u62ec\uff1a(1)\u4f60\u89c9\u5f97\u5728\u751f\u6d3b\u4e2d\u5927\u81ea\u7136\u5e2e\u52a9\u4eba\u4eec\u89e3\u51b3\u4e86\u54ea\u4e9b\u5b9e\u9645\u95ee\u9898\uff1b(2)\u4f60\u4ece\u5927\u81ea\u7136\u4e2d\u5b66\u5230\u4e86\u4ec0\u4e48\uff1b(3)\u547c\u5401\u540c\u5b66\u4eec\u5e94\u8be5\u4e0e\u81ea\u7136\u548c\u8c10\u76f8\u5904\u3002",
    points: [
      "\u5927\u81ea\u7136\u5e2e\u52a9\u89e3\u51b3\u7684\u5b9e\u9645\u95ee\u9898\uff08\u51cf\u538b\u3001\u63d0\u4f9b\u6e05\u6d01\u7a7a\u6c14\u6c34\u7b49\uff09",
      "\u4ece\u5927\u81ea\u7136\u5b66\u5230\u7684\u9053\u7406\uff08\u575a\u97e7\u3001\u5e73\u8861\u7b49\uff09",
      "\u547c\u5401\u4e0e\u81ea\u7136\u548c\u8c10\u76f8\u5904"
    ],
    vocab: ["resilience", "balance", "deforestation", "harmony", "cherish"],
    wordCount: "\u4e0d\u5c11\u4e8e100\u8bcd",
    notes: "\u53ef\u9002\u5f53\u52a0\u5165\u7ec6\u8282\uff0c\u4f7f\u5185\u5bb9\u5145\u5b9e\u3001\u884c\u6587\u8fde\u8d2f",
    mock: true, district: "\u533a\u6a21\u62df", hasSample: true
  },
  {
    id: "gk2024_mock_job", year: 2024, month: 0, season: "区模拟·求职信",
    type: "\u7533\u8bf7\u4fe1", topic: "\u6c42\u804c/\u52e4\u5de5\u4fed\u5b66",
    title: "2024区模拟 \u00b7 Office Assistant\u6c42\u804c\u4fe1",
    body: "\u5047\u8bbe\u4f60\u662f\u4e2d\u56fd\u7559\u5b66\u751f\u674e\u6d25\u3002\u4f60\u770b\u5230\u4e00\u5219\u6821\u56ed\u62db\u8058\u5e7f\u544a\uff0c\u60f3\u8981\u52e4\u5de5\u4fed\u5b66\u3002\u5e7f\u544a\u5185\u5bb9\uff1aOffice Assistant Wanted for part-time work at the Student Union\uff0c\u8981\u6c42\u5bf9\u7f51\u7edc\u6280\u672f\u611f\u5174\u8da3\uff0c\u80fd\u5904\u7406\u6587\u4ef6\u5f52\u6863\u3001\u4f1a\u8bae\u8bae\u7a0b\u51c6\u5907\u3001\u4fe1\u4ef6\u5206\u62fe\u7b49\u4efb\u52a1\uff0c\u5f39\u6027\u5de5\u65f6\u4f46\u9700\u6bcf\u5468\u4e94\u5929\u65e9\u73ed\u3002\u8bf7\u7ed3\u5408\u5e7f\u544a\u4fe1\u606f\u5199\u5c01\u6c42\u804c\u4fe1\uff0c\u5185\u5bb9\u5305\u62ec\uff1a(1)\u5199\u4fe1\u7684\u76ee\u7684\uff1b(2)\u6c42\u804c\u7684\u7406\u7531\uff1b(3)\u8868\u8fbe\u5174\u8da3\u548c\u8054\u7cfb\u65b9\u5f0f(Tel:64237511)\u3002",
    points: [
      "\u5199\u4fe1\u76ee\u7684\uff08\u5e94\u8058Office Assistant\uff09",
      "\u6c42\u804c\u7406\u7531\uff08\u5174\u8da3\u3001\u80fd\u529b\u3001\u7ec4\u7ec7\u6027\u7b49\uff09",
      "\u8868\u8fbe\u5174\u8da3\u548c\u8054\u7cfb\u65b9\u5f0f"
    ],
    vocab: ["office assistant", "part-time", "document filing", "meeting agendas", "detail-oriented"],
    wordCount: "\u4e0d\u5c11\u4e8e100\u8bcd",
    notes: "\u5f00\u5934\u548c\u7ed3\u5c3e\u5df2\u7ed9\u51fa\uff0c\u4e0d\u8ba1\u5165\u603b\u8bcd\u6570",
    mock: true, district: "\u533a\u6a21\u62df", hasSample: true
  }
];

// ---------- 高分句型库 ----------
var GAOKAO_SENTENCE_PATTERNS = [
  // 开头段
  { cat: "开头段", level: "基础", en: "I am Li Jin, a student from Chenguang High School.", cn: "我是晨光中学的学生李津。" },
  { cat: "开头段", level: "基础", en: "I am writing to invite you to...", cn: "我写信是想邀请你……" },
  { cat: "开头段", level: "基础", en: "I am writing to introduce...", cn: "我写信是想介绍……" },
  { cat: "开头段", level: "提升", en: "I am writing to recommend... without hesitation.", cn: "我毫不犹豫地推荐……" },
  { cat: "开头段", level: "提升", en: "I am writing to express my sincere gratitude for...", cn: "我写信是想对……表达诚挚的感谢。" },
  { cat: "开头段", level: "精品", en: "I hope this letter finds you well. I am Li Jin, a student from XX High School, writing to extend a cordial invitation to you to...", cn: "希望此信一切都好。我是XX中学的学生李津，写信想诚挚邀请您……" },
  { cat: "开头段", level: "精品", en: "With the summer vacation approaching, I am writing to...", cn: "随着暑假临近，我写信想……（独立主格）" },
  // 中间段-过渡
  { cat: "中间段", level: "基础", en: "First / Second / Third, ...", cn: "第一/第二/第三，……" },
  { cat: "中间段", level: "基础", en: "To begin with, ... Also, ... Finally, ...", cn: "首先……其次……最后……" },
  { cat: "中间段", level: "提升", en: "First and foremost, ...", cn: "首先且最重要的是……" },
  { cat: "中间段", level: "提升", en: "Moreover, ... / Additionally, ...", cn: "此外……" },
  { cat: "中间段", level: "提升", en: "Last but certainly not least, ...", cn: "最后但同样重要的是……" },
  { cat: "中间段", level: "精品", en: "What makes it particularly appealing is that...", cn: "使其格外有吸引力的是……（主语从句）" },
  { cat: "中间段", level: "精品", en: "Not only will you have the opportunity to..., but you can also...", cn: "你不仅有机会……，还可以……（倒装句）" },
  { cat: "中间段", level: "精品", en: "It is through this activity that we can truly understand...", cn: "正是通过这次活动，我们才能真正理解……（强调句）" },
  { cat: "中间段", level: "精品", en: "Recognized as..., this tradition embodies the essence of...", cn: "被公认为……，这一传统体现了……的精髓（非谓语）" },
  // 结尾段
  { cat: "结尾段", level: "基础", en: "I hope you can come. Looking forward to your reply.", cn: "希望你能来。期待你的回复。" },
  { cat: "结尾段", level: "提升", en: "I sincerely hope my recommendation will be of help.", cn: "我真诚地希望我的推荐能有所帮助。" },
  { cat: "结尾段", level: "提升", en: "I would be more than delighted if you could make it.", cn: "如果您能来，我会非常高兴。" },
  { cat: "结尾段", level: "精品", en: "I would appreciate it if you could...", cn: "如果您能……，我将不胜感激。（虚拟语气）" },
  { cat: "结尾段", level: "精品", en: "I would be more than delighted if you could make it. Looking forward to your favorable reply.", cn: "如果您能来我会非常高兴。期待您的好消息。" },
  { cat: "结尾段", level: "精品", en: "Together, we must spare no effort in protecting and promoting our rich cultural tapestry.", cn: "我们必须不遗余力地保护和弘扬我们丰富的文化。（平行结构）" }
];

// ---------- 高分范文示例 ----------
var GAOKAO_SAMPLE_ANSWERS = [
  {
    promptId: "gk2017_6",
    title: "2017年6月 · 全运会志愿者回信 (精品档范文)",
    score: 24,
    tier: "第五档 (21-25)",
    level: "精品档",
    text: "Dear Mrs. Green,\n\nI am so glad to hear from you. Everything goes well with me. I have been busy preparing for the National College Entrance Examination, which will be held next year. Besides studying, I have also been participating in various activities to enrich my school life.\n\nI am excited to tell you that I have been selected as a volunteer for the 13th National Games, which will be held in Tianjin at the end of August. To prepare for this, I have been learning more about the history and culture of Tianjin so that I can better assist visitors from all over the country. I believe this experience will not only broaden my horizons but also improve my communication skills.\n\nI sincerely hope you can visit Tianjin again. The city has changed a lot and I am sure you will be amazed by its development.\n\nYours,\nLi Jin",
    analysis: "覆盖所有要点；应用了定语从句(which will be held)、非谓语(to prepare)、并列结构(not only...but also)；衔接自然；语气得体。"
  },
  {
    promptId: "gk2017_6",
    title: "2017年6月 · 全运会志愿者回信 (提升档范文)",
    score: 18,
    tier: "第四档 (16-20)",
    level: "提升档",
    text: "Dear Mrs. Green,\n\nI am very happy to receive your letter. I want to tell you about my recent life. I am studying hard for the exam next year. I also do some activities after school.\n\nI have good news to tell you. I become a volunteer for the 13th National Games. It will be held in Tianjin in August. I am learning about Tianjin's history and culture. I think I can help visitors from other places. I will introduce Tianjin to them. I believe this experience can broaden my horizons and improve my ability.\n\nI hope you can come to Tianjin again. Tianjin has changed a lot. I am sure you will like it.\n\nYours,\nLi Jin",
    analysis: "要点基本覆盖但展开不足；语法基本正确但句式单调（多用I think/I will简单句）；become应为became（时态错误）；缺乏定语从句等复杂结构；过渡词较少；属于第四档水平。"
  },
  {
    promptId: "gk2017_6",
    title: "2017年6月 · 全运会志愿者回信 (基础档范文)",
    score: 11,
    tier: "第三档 (11-15)",
    level: "基础档",
    text: "Dear Mrs. Green,\n\nI am happy. I want tell you my life. I study every day. I am busy.\n\nI am volunteer. The National Games in Tianjin. I learn Tianjin history. I can help people. I can tell them Tianjin is good. I like Tianjin very much.\n\nYou can come Tianjin. Tianjin is different now. Welcome to Tianjin.\n\nLi Jin",
    analysis: "要点覆盖不完整（缺少“准备”的具体内容、缺少“希望重访”的得体表达）；语法错误较多（I want tell缺to、I am volunteer缺a、come Tianjin缺to）；句式极简短无变化；词数不足100词应扣2分；缺乏过渡词；属于第三档水平。"
  },
  {
    promptId: "gk2018_6",
    title: "2018年6月 · 机器人竞赛邀请信 (精品档范文)",
    score: 23,
    tier: "第五档 (21-25)",
    level: "精品档",
    text: "Dear Chris,\n\nI am Li Jin, head of the Robotics Club at Chenguang High School. I am writing to invite you to join our team for the World Adolescent Robotics Competition, which will take place in Tianjin at the end of July.\n\nKnowing that you have won prizes in robotics competitions, we believe your expertise will be of great value to our team. The competition will provide us with a wonderful opportunity to showcase our skills and exchange ideas with peers from around the world.\n\nI will send the training plan to your email soon. Your suggestions would be highly appreciated. Looking forward to your reply.\n\nYours,\nLi Jin",
    analysis: "要点完整；非谓语(Knowing that...)开头自然；定语从句(which will take place)；语气正式且热情。"
  },
  {
    promptId: "gk2018_6",
    title: "2018年6月 · 机器人竞赛邀请信 (提升档范文)",
    score: 17,
    tier: "第四档 (16-20)",
    level: "提升档",
    text: "Dear Chris,\n\nI am Li Jin. I am the leader of the Robotics Club in Chenguang High School. I am writing to invite you to join our team. There will be a robotics competition in Tianjin at the end of July.\n\nI know you won prizes in robotics competitions before. I think you are very good at it. You can help our team a lot. We can also learn from each other in the competition. It is a good chance for us.\n\nI will send the training plan to your email. You can give me some suggestions. I look forward to your reply.\n\nYours,\nLi Jin",
    analysis: "要点基本覆盖；语法基本正确但句式偏简单（I think/I know开头过多）；缺乏定语从句和非谓语结构；good at it表达较口语化；过渡词不足（可加moreover/furthermore）；属于第四档水平。"
  },
  {
    promptId: "gk2022_3",
    title: "2022年3月 · 改掉习惯回信 (基础档范文)",
    score: 12,
    tier: "第三档 (11-15)",
    level: "基础档",
    text: "Dear Chris,\n\nI read your email. You want to stop play computer games. I also have a bad habit. I always stay up late. It is bad for my health. I feel tired in class. I can not concentrate on my study.\n\nI decide to change. I will sleep early. I will set a clock at 10 o'clock. I will not play phone in bed. I am determined to do it.\n\nI hope you can success too. We can do it together. Let us be better.\n\nYours,\nLi Jin",
    analysis: "要点基本覆盖（习惯、影响、计划决心）；但语法错误较多：stop play应加to（stop to play或stop playing）、I can not应连写cannot、success此处应为动词succeed；句式单调缺乏变化；词数约95词接近下限；属于第三档水平。"
  },
  {
    promptId: "gk2024_6",
    title: "2024年6月 · 低碳校园演讲稿 (精品档范文)",
    score: 25,
    tier: "第五档 (21-25)",
    level: "精品档",
    text: "Dear teachers and fellow students,\n\nIt is my great honor to address you today. As we all know, our campus is not free from behaviors that go against the concept of low carbon. Lights are often left on in empty classrooms, and disposable plastic bottles can be seen everywhere.\n\nHowever, change starts from small things. Not only should we turn off lights when leaving, but we should also bring our own water bottles. Moreover, choosing to walk or cycle instead of taking elevators for short distances will make a difference.\n\nLet us take action now! It is through our collective efforts that we can build a truly low-carbon campus. Together, we can make a difference.\n\nThank you!",
    analysis: "倒装句(Not only should we...)；强调句(It is through...that...)；平行结构；要点全覆盖；演讲稿格式规范。"
  },
  // ---------- 区模拟官方参考范文 ----------
  {
    promptId: "gk2024_mock_safety",
    title: "2024区模拟 \u00b7 \u5b89\u5168\u8fdb\u6821\u56ed\u56de\u4fe1 (\u53c2\u8003\u8303\u6587)",
    score: 23, tier: "\u7b2c\u4e94\u6863 (21-25)", level: "\u53c2\u8003\u8303\u6587",
    text: "Dear Chris,\n\nHow is everything going? Knowing that you are interested in the \u201cSafety Education on Campus\u201d event, I am glad to share something about it with you.\n\nIn response to the 16th National Disaster Prevention and Reduction Day, our school organized activities to raise our awareness of self-protection in the face of emergencies. First, an expert from a professional rescue team delivered a lecture on how to react when disasters strike, such as fires and earthquakes, equipping us with basics of evacuation. Besides, we made brochures concerning the practical tips on dealing with disasters and handed them out on campus to further spread the safety knowledge among students.\n\nI have prepared an English brochure for you. Hope it will help.\n\nYours,\nLi Jin",
    analysis: "\u975e\u8c13\u8bed(Knowing that...)\u5f00\u5934\u81ea\u7136\uff1b\u5b9a\u8bed\u4ece\u53e5(which/that)\u3001\u4e0d\u5b9a\u5f0f(to raise...)\u591a\u6837\u53e5\u5f0f\uff1b\u8981\u70b9\u5168\u8986\u76d6\uff1b\u8bed\u6c14\u5f97\u4f53\u3002"
  },
  {
    promptId: "gk2024_mock_tianjin_scenery",
    title: "2024区模拟 \u00b7 \u63a8\u8350\u5929\u6d25\u53e4\u6587\u5316\u8857 (\u53c2\u8003\u8303\u6587)",
    score: 23, tier: "\u7b2c\u4e94\u6863 (21-25)", level: "\u53c2\u8003\u8303\u6587",
    text: "Dear Chris,\n\nI\u2019m pleased to learn that you\u2019re coming to Tianjin. I\u2019m writing to recommend you an amazing place in Tianjin\u2014the Ancient Culture Street.\n\nThe Ancient Culture Street is a well-known tourist attraction situated in the northeast of Nankai District, central Tianjin. It is a historical and cultural street that showcases the traditional architecture, crafts, and arts of ancient China. The street is lined with shops selling traditional Chinese handicrafts, antiques, calligraphy, and paintings. Visitors can also find a wide variety of delicious local snacks and traditional Chinese teahouses along the street.\n\nTianjin begins to enter winter in November, and you need to prepare so many thicker clothes when traveling. Besides, there are more tourists in the Ancient Culture Street, so I suggest you travel in the late afternoon to avoid the crowds.\n\nFinally, I do hope that you will have a good time in Tianjin.\n\nYours sincerely,\nLi Jin",
    analysis: "\u5b9a\u8bed\u4ece\u53e5(that showcases/that you\u2019re coming)\u3001\u5206\u8bcd\u4f5c\u72b6\u8bed(situated in...)\u3001\u88ab\u52a8\u8bed\u6001(is lined with)\uff1b\u4e09\u8981\u70b9\u5b8c\u6574\uff1b\u63a8\u8350\u7406\u7531\u5145\u5206\u3002"
  },
  {
    promptId: "gk2025_mock_green_transport",
    title: "2025区模拟 \u00b7 \u7eff\u8272\u4ea4\u901a\u65e5\u56de\u4fe1 (\u53c2\u8003\u8303\u6587)",
    score: 22, tier: "\u7b2c\u4e94\u6863 (21-25)", level: "\u53c2\u8003\u8303\u6587",
    text: "Dear Chris,\n\nI hope this email finds you well. I\u2019m excited to tell you about an environmental project that our school recently launched\u2014the \u201cGreen Transportation Day\u201d.\n\nThe project aims to promote eco-friendly commuting by encouraging students and staff to walk, cycle, or use public transportation at least once a week. It not only helps reduce our carbon footprint but also raises awareness about the importance of sustainable living.\n\nThis initiative has had a positive impact on me and my classmates. We have become more conscious of our daily transportation choices and are more committed to protecting our environment. It\u2019s great to see everyone actively participating and discussing ways to contribute more.\n\nI wonder if your school has organized similar environmental activities. I\u2019d love to hear more about it! Looking forward to your reply.\n\nYours,\nLi Jin",
    analysis: "not only...but also\u5e76\u5217\u7ed3\u6784\uff1b\u5b9a\u8bed\u4ece\u53e5(that our school...)\u3001\u5bbe\u8bed\u4ece\u53e5(if your school...)\uff1b\u8981\u70b9\u5168\u8986\u76d6\uff1b\u73af\u4fdd\u8bcd\u6c47\u4e30\u5bcc\u3002"
  },
  {
    promptId: "gk2024_mock_yugong",
    title: "2024区模拟 \u00b7 \u611a\u516c\u79fb\u5c71\u5f81\u6587 (\u53c2\u8003\u8303\u6587)",
    score: 22, tier: "\u7b2c\u4e94\u6863 (21-25)", level: "\u53c2\u8003\u8303\u6587",
    text: "Once upon a time, there lived an old man named Yu Gong, which means \u201cfoolish old man\u201d in English. Mr Yu was nearly 90 years old, but he was strong in spirit. He was tired of how the mountains blocked his village from the rest of the land. So one day he called his family together and said, \u201cLet\u2019s all work together to move these mountains. We can make a path that goes straight to the South and reaches the River Han. What do you think?\u201d\n\nEveryone agreed even though it seemed like a huge job. They started digging and carrying away rocks and soil. Day after day, they worked hard as a team. In the end, their hard work and strong will moved the gods. A divine being was sent to flatten the mountains, creating a wide road for Mr Yu\u2019s village. Everyone was happy.\n\nThe story of Mr Yu taught people that with perseverance, anything is possible. So remember: where there is a will, there is a way.",
    analysis: "\u5b9a\u8bed\u4ece\u53e5(which means.../that goes...)\uff1b\u5206\u8bcd\u4f5c\u72b6\u8bed(creating a wide road...)\uff1b\u5e8f\u4e8b\u6e05\u6670\uff1b\u5bd3\u8a00\u7ed3\u5c3e\u70b9\u775b\uff08where there is a will, there is a way\uff09\u3002"
  },
  {
    promptId: "gk2024_mock_guizhou",
    title: "2024区模拟 \u00b7 \u8d35\u5dde\u652f\u6559\u56de\u4fe1 (\u53c2\u8003\u8303\u6587)",
    score: 23, tier: "\u7b2c\u4e94\u6863 (21-25)", level: "\u53c2\u8003\u8303\u6587",
    text: "Dear Chris,\n\nI was thrilled to hear that you will be heading to a rural area in Guizhou next month for a year of volunteer teaching. It\u2019s a wonderful opportunity, and I admire your dedication to education.\n\nGuizhou is known for its beautiful mountainous landscapes and rich ethnic diversity. The climate is humid, with plenty of rainfall, so I recommend taking waterproof clothing and shoes. It\u2019s also a good idea to learn a few dialects, which can help you connect with the community.\n\nAs is known, many local students may struggle with English pronunciation and conversation. I suggest focusing on enhancing listening and speaking skills and some activities like role-plays and group discussions will be welcome. Additionally, since many of them have never left the rural areas and are unaware of the outside world, practical language use through real life can help students gain confidence in their abilities. Organizing English corners or language clubs could also encourage students to practice in a relaxing environment.\n\nI truly admire your commitment to making a difference in these students\u2019 lives. And I wish you all the best on this incredible journey and look forward to hearing about your experiences in Guizhou!\n\nYours,\nLi Jin",
    analysis: "\u975e\u9650\u5236\u5b9a\u8bed\u4ece\u53e5(As is known)\u3001\u539f\u56e0\u72b6\u8bed\u4ece\u53e5(since many of them...)\u3001\u52a8\u540d\u4f5c\u4e3b\u8bed(Organizing...could)\uff1b\u8981\u70b9\u8be6\u5c3d\uff1b\u5efa\u8bae\u5177\u4f53\u53ef\u884c\u3002"
  },
  {
    promptId: "gk2025_mock_ai_learning",
    title: "2025区模拟 \u00b7 AI\u8f85\u52a9\u5b66\u4e60\u56de\u4fe1 (\u53c2\u8003\u8303\u6587)",
    score: 22, tier: "\u7b2c\u4e94\u6863 (21-25)", level: "\u53c2\u8003\u8303\u6587",
    text: "Dear Tom,\n\nKnowing that you have interest in using AI to assist English learning, I\u2019m excited to share my experience with AI-assisted English learning, which has significantly improved my study efficiency recently.\n\nAmong various tools I\u2019ve tried, DeepSeek has become my favorite assistant. When I have trouble understanding complex grammar points, I can simply ask it for explanations, which are always clear and easy to follow. Besides, it is extremely useful in polishing my English compositions. What\u2019s more, DeepSeek can organize my wrong English exercises.\n\nAI is a powerful tool for English learning with instant answers and abundant learning resources. However, we must use it wisely to avoid over-reliance. For example, we should think independently rather than simply rely on the AI\u2019s correct choices and answers.\n\nI hope my experience can be helpful to you. Looking forward to hearing from you.\n\nBest regards,\nLi Jin",
    analysis: "\u975e\u8c13\u8bed\u5f00\u5934(Knowing that...)\uff1b\u5b9a\u8bed\u4ece\u53e5(which has.../which are...)\u3001\u65f6\u95f4\u72b6\u8bed\u4ece\u53e5(When I have...)\uff1brather than\u5bf9\u6bd4\u7ed3\u6784\uff1b\u89c2\u70b9\u660e\u786e\u3002"
  },
  {
    promptId: "gk2025_mock_club_video",
    title: "2025区模拟 \u00b7 \u6821\u56ed\u751f\u6d3b\u77ed\u89c6\u9891\u5efa\u8bae (\u53c2\u8003\u8303\u6587)",
    score: 23, tier: "\u7b2c\u4e94\u6863 (21-25)", level: "\u53c2\u8003\u8303\u6587",
    text: "Dear Chris,\n\nI hope you are doing well. I\u2019m thrilled to hear about your project \u201cExploring the Life of Chinese Students\u201d and believe it will offer unique insights into our daily lives. I would like to recommend capturing the vibrant atmosphere during our school\u2019s club activities.\n\nClub activities are a significant part of our campus life. By participating in these activities, students can pursue their passions outside of academics. From calligraphy and traditional music to robotics and debate clubs, these activities showcase the diverse interests and talents of Chinese students. They not only provide a platform for personal growth but also foster a sense of community and teamwork. Filming these moments will give your audience a glimpse into how we balance learning with leisure and the richness of our extracurricular culture.\n\nIf you need any assistance or have further questions, please don\u2019t hesitate to ask me. I wish you all the best with your project and am confident that it will be a valuable addition to understanding Chinese students\u2019 lives.\n\nYours, Li Jin",
    analysis: "\u52a8\u540d\u4f5c\u4e3b\u8bed(capturing/Filming)\u3001not only...but also\u3001\u4ece\u53e5(how we balance...)\uff1b\u63a8\u8350\u7406\u7531\u5145\u5206\uff083\u70b9\uff09\uff1b\u8bed\u6c14\u70ed\u60c5\u5f97\u4f53\u3002"
  },
  {
    promptId: "gk2025_mock_heritage",
    title: "2025区模拟 \u00b7 \u975e\u9057\u6587\u5316\u7559\u8a00 (\u53c2\u8003\u8303\u6587)",
    score: 22, tier: "\u7b2c\u4e94\u6863 (21-25)", level: "\u53c2\u8003\u8303\u6587",
    text: "Hi, Tom. Delighted to know about your enthusiasm for Chinese culture, I will offer you a brief introduction to our culture essence.\n\nInitially, I am so proud that Chinese culture is spreading far and wide across the globe, thus helping people around the world have a better understanding of the core values of our nation.\n\nAmong our heritages, I\u2019d like to introduce Chinese calligraphy to foreign friends like you, which is more than just writing; it\u2019s also an art form reflecting the profound spiritual world of Chinese people. For thousands of years, calligraphers express emotions, ideas, and the beauty of Chinese characters.\n\nTo sum up, I sincerely hope you can visit China to experience the amazing art in person when you have the chance. I am sure you will be fascinated by the unique culture.\n\nLooking forward to your arrival!\nLi Jin",
    analysis: "\u8fc7\u53bb\u5206\u8bcd\u5f00\u5934(Delighted to know...)\u3001\u5b9a\u8bed\u4ece\u53e5(which is...)\u3001thus+doing\u7ed3\u679c\u72b6\u8bed\uff1b\u8bba\u575b\u7559\u8a00\u683c\u5f0f\u89c4\u8303\uff1b\u4e09\u8981\u70b9\u6e05\u6670\u3002"
  },
  {
    promptId: "gk2024_mock_tianjin620",
    title: "2024区模拟 \u00b7 \u5929\u6d25620\u5c81\u751f\u65e5\u5f81\u6587 (\u53c2\u8003\u8303\u6587)",
    score: 23, tier: "\u7b2c\u4e94\u6863 (21-25)", level: "\u53c2\u8003\u8303\u6587",
    text: "Dear Editors,\n\nAs a student from Chenguang High School, I am overjoyed to celebrate Tianjin\u2019s 620th birthday on December 23, 2024. It is with great enthusiasm that I extend my heartfelt blessings to Tianjin, wishing it continued prosperity and happiness for all its citizens.\n\nTianjin is a city rich in history and culture. Firstly, it offers a variety of delicious food like Goubuli Baozi, whose flavor tells stories of generations. Secondly, Tianjin\u2019s cultural landmarks are indeed treasures. For example, the Ancient Culture Street, with its traditional architecture and vibrant folk art performances, is a living museum that transports visitors back in time. What\u2019s more, what impresses me most is Tianjin\u2019s ability to harmoniously blend its historical roots with modern advancements.\n\nI am confident that Tianjin will continue to thrive as a hub of culture and economy. I am looking forward to witnessing its continued growth and success in the future.\n\nYours,\nLi Jin",
    analysis: "\u5f3a\u8c03\u53e5\u578b(It is with...that...)\u3001\u5b9a\u8bed\u4ece\u53e5(whose flavor.../that transports.../what impresses me most...)\u3001\u4ecb\u8bcd\u77ed\u8bed(with its...)\uff1b\u8981\u70b9\u5b8c\u6574\uff1b\u611f\u60c5\u771f\u631a\u3002"
  },
  {
    promptId: "gk2025_mock_nature",
    title: "2025区模拟 \u00b7 Nature Is Our Best Teacher\u6f14\u8bb2\u7a3f (\u53c2\u8003\u8303\u6587)",
    score: 22, tier: "\u7b2c\u4e94\u6863 (21-25)", level: "\u53c2\u8003\u8303\u6587",
    text: "Good morning, everyone!\n\nI\u2019m Li Jin from Chenguang Middle School. Today, I want to talk about why nature is our best teacher.\n\nNature helps us in many ways. When we feel stressed, a walk in nature can calm our minds. It also provides us with clean air, water, and food, which are essential for life. Without nature, we couldn\u2019t survive.\n\nFrom nature, I\u2019ve learned resilience and balance. Trees stand strong in storms, teaching us to face challenges bravely. The changing seasons remind us that life has its ups and downs, and every phase is important.\n\nHowever, human activities like pollution and deforestation are harming nature. Let\u2019s take action to protect it by reducing waste and respecting all living things. Nature is our greatest teacher. Let\u2019s cherish it and live in harmony with it. Thank you!",
    analysis: "\u65f6\u95f4\u72b6\u8bed\u4ece\u53e5(When we feel stressed...)\u3001\u5b9a\u8bed\u4ece\u53e5(which are essential...)\u3001\u5206\u8bcd\u4f5c\u72b6\u8bed(teaching us...)\u3001\u865a\u62df\u8bed\u6c14(couldn\u2019t survive)\uff1b\u6f14\u8bb2\u7a3f\u683c\u5f0f\u89c4\u8303\uff1b\u547c\u5401\u6709\u529b\u3002"
  },
  {
    promptId: "gk2024_mock_job",
    title: "2024区模拟 \u00b7 Office Assistant\u6c42\u804c\u4fe1 (\u53c2\u8003\u8303\u6587)",
    score: 23, tier: "\u7b2c\u4e94\u6863 (21-25)", level: "\u53c2\u8003\u8303\u6587",
    text: "Dear Chris,\n\nI am Li Jin, a Chinese student studying at this university. I am writing to apply for the part-time office assistant position advertised by the Student Union.\n\nI have a strong interest in this job for several reasons. Firstly, I have a deep passion for online technology, which is one of the requirements mentioned in the advertisement. Secondly, I believe I am well-equipped to handle various tasks. I am highly organized and detail-oriented, making me proficient in document filing. I also have excellent planning skills, enabling me to prepare meeting agendas effectively. Additionally, I am reliable and careful, which is essential for sorting letters and parcels.\n\nThe flexible working hours are very appealing to me, although working five days a week on the morning shift is required. I am confident that I can manage my study and work schedule well.\n\nI am very interested in this position and would appreciate the opportunity to contribute to the Student Union. You can reach me at 64237511.\n\nThank you for considering my application.\n\nYours,\nLi Jin",
    analysis: "\u540c\u4f4d\u8bed(a Chinese student studying...)\u3001\u5b9a\u8bed\u4ece\u53e5(which is.../that I can...)\u3001\u5206\u8bcd\u4f5c\u72b6\u8bed(making me.../enabling me...)\uff1b\u6c42\u804c\u4fe1\u683c\u5f0f\u89c4\u8303\uff1b\u7406\u7531\u5145\u5206\u3002"
  }
];

// ---------- 体裁框架模板 ----------
var GAOKAO_FRAMEWORKS = [
  {
    type: "邀请信",
    frequency: "16次 (~50%)",
    structure: "开头: 自我介绍+写信目的(I am writing to invite you to...) → 中间: 活动时间地点+活动内容+邀请原因 → 结尾: 期待回复",
    template: "Dear ___,\n\nI am Li Jin, a student from XX High School. I am writing to invite you to ___, which will be held at ___ on ___.\n\nFirst and foremost, the event boasts a wide range of activities, ranging from ___ to ___. What makes it particularly appealing is that ___.\n\nMoreover, not only will you have the opportunity to ___, but you can also ___.\n\nI would be more than delighted if you could make it. Looking forward to your favorable reply.\n\nYours sincerely,\nLi Jin"
  },
  {
    type: "介绍信",
    frequency: "7次 (~22%)",
    structure: "开头: 自我介绍+写信目的(I am writing to introduce...) → 中间: 分点介绍(名称/位置/特色/感受) → 结尾: 希望对方喜欢",
    template: "Dear ___,\n\nI am Li Jin. I am writing to introduce ___ to you.\n\nFirst and foremost, ___ is located in ___, which is known for ___. Moreover, what makes it special is that ___. Last but not least, ___.\n\nI sincerely hope you will find this introduction helpful. Looking forward to your reply.\n\nYours,\nLi Jin"
  },
  {
    type: "推荐信",
    frequency: "3次 (~9%)",
    structure: "开头: 自我介绍+推荐目的(I am writing to recommend... without hesitation) → 中间: 推荐理由(2-3个) → 结尾: 希望推荐有帮助",
    template: "Dear ___,\n\nI am writing to recommend ___ without hesitation.\n\nFirst and foremost, what makes it special is that ___. Moreover, by ___, you will ___. Last but not least, I am confident that ___.\n\nI sincerely hope my recommendation will be of help.\n\nYours,\nLi Jin"
  },
  {
    type: "申请信",
    frequency: "2次 (~6%)",
    structure: "开头: 自我介绍+申请意愿(I am writing to apply for...) → 中间: 申请理由+个人优势 → 结尾: 期待机会",
    template: "Dear ___,\n\nI am Li Jin, a student from XX High School. I am writing to apply for ___.\n\nFirst and foremost, I have a strong passion for ___. Moreover, I have been ___ for ___, which enables me to ___. Last but not least, I am confident that I can ___.\n\nI would appreciate it if you could give me this opportunity. Looking forward to your reply.\n\nYours sincerely,\nLi Jin"
  },
  {
    type: "感谢信",
    frequency: "2次 (~6%)",
    structure: "开头: 表达感谢+原因 → 中间: 具体感谢的内容+对方帮助的影响 → 结尾: 再次感谢+期待回报",
    template: "Dear ___,\n\nI am writing to express my sincere gratitude for ___.\n\nFirst and foremost, your ___ helped me ___. Moreover, I was deeply moved by your ___. Thanks to your help, I have ___.\n\nI sincerely hope I can have the opportunity to return your kindness in the future.\n\nYours,\nLi Jin"
  },
  {
    type: "建议信",
    frequency: "2次 (~6%)",
    structure: "开头: 自我介绍+写信目的(I am writing to give you some suggestions) → 中间: 建议(2-3条+理由) → 结尾: 希望建议有帮助",
    template: "Dear ___,\n\nI am Li Jin. I am writing to give you some suggestions on ___.\n\nFirst and foremost, I suggest that you ___, which will ___. Moreover, it would be beneficial if you ___. Last but not least, ___.\n\nI hope these suggestions will be of help to you.\n\nYours,\nLi Jin"
  }
];

// ---------- 话题词汇库 ----------
var GAOKAO_TOPIC_VOCAB = {
  "校园活动": {
    core: ["hold an activity", "take part in", "join", "organize", "campus", "club"],
    advanced: ["boast a wide range of activities", "engage in", "extracurricular", "enrich campus life", "foster teamwork"]
  },
  "传统文化": {
    core: ["traditional culture", "Spring Festival", "Peking Opera", "calligraphy", "handicraft"],
    advanced: ["cultural heritage", "pass down from generation to generation", "embody the essence of", "cultural identity", "time-honored"]
  },
  "科技应用": {
    core: ["technology", "smartphone", "internet", "online", "convenient"],
    advanced: ["cutting-edge technology", "digital transformation", "revolutionize", "at ease with technology", "high-speed rail"]
  },
  "环境保护": {
    core: ["protect the environment", "save energy", "reduce waste", "recycle", "green"],
    advanced: ["sustainable development", "low-carbon lifestyle", "environmental consciousness", "eco-friendly", "carbon footprint"]
  },
  "个人成长": {
    core: ["improve myself", "overcome difficulties", "set a goal", "work hard", "learn from"],
    advanced: ["personal growth", "step out of one's comfort zone", "cultivate resilience", "strive for excellence", "continuous self-improvement"]
  },
  "社会参与": {
    core: ["volunteer", "help others", "community", "contribute to", "responsibility"],
    advanced: ["civic engagement", "make a difference", "social responsibility", "give back to society", "active participation"]
  },
  "国际交流": {
    core: ["cultural exchange", "foreign friends", "communicate", "understand each other", "friendship"],
    advanced: ["promote mutual understanding", "bridge cultural gaps", "foster cross-cultural communication", "global perspective", "people-to-people exchange"]
  },
  "学习方法": {
    core: ["study method", "practice", "read books", "listen carefully", "take notes"],
    advanced: ["effective learning strategies", "acquire knowledge", "language proficiency", "self-directed learning", "academic excellence"]
  }
};
