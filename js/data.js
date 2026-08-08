// ============================================================
//  写作批改 · 参考数据层 (Reference data)
//  来源：IELTS 官方 Public Band Descriptors (British Council / IDP)
//        微信「40组高分动词词组」+ IELTS Liz / IELTS Advantage
//  后续：小作文高分句型、真题回忆 PPT 待用户补充
// ============================================================

// ---- 考试列表（数据驱动，可扩展；active=false 为敬请期待）----
var EXAMS = [
  { id: "ielts_t2", name: "雅思大作文", sub: "Task 2 · 250+ words", type: "task2", minWords: 250, active: true },
  { id: "ielts_t1", name: "雅思小作文", sub: "Task 1 · 150+ words", type: "task1", minWords: 150, active: true },
  { id: "toefl_disc", name: "托福学术讨论", sub: "Academic Discussion · 100+ words", type: "toefl_disc", minWords: 100, active: true },
  { id: "toefl_email", name: "托福邮件写作", sub: "Email Writing · 150 words", type: "toefl_email", minWords: 150, active: true },
  { id: "pet_article", name: "PET议论文", sub: "Part 2 Article · 100 words", type: "pet_article", minWords: 100, active: true },
  { id: "pet_story", name: "PET记叙文", sub: "Part 2 Story · 100 words", type: "pet_story", minWords: 100, active: true },
  { id: "pet_email", name: "PET邮件", sub: "Part 1 Email · 100 words", type: "pet_email", minWords: 100, active: true },
  { id: "ket_email", name: "KET邮件", sub: "Part 6 Email · 25 words", type: "ket_email", minWords: 25, active: true },
  { id: "ket_picture", name: "KET图片描述", sub: "Part 7 Picture Story · 35 words", type: "ket_pic", minWords: 35, active: true },
  { id: "aeas_write", name: "AEAS写作", sub: "AEAS Writing · 4-6/7-9/10-12", type: "aeas", minWords: 200, active: true },
  { id: "gaokao", name: "天津高考英语写作", sub: "Tianjin Gaokao Writing · 25pts", type: "gaokao", minWords: 100, active: true }
];

// ---- 官方评分标准（Band 5–9 摘要，按考试类型 + 四项）----
var BAND = {
  task2: {
    label: "Task Response / Coherence & Cohesion / Lexical Resource / Grammatical Range & Accuracy",
    criteria: {
      tr: {
        name: "Task Response (审题与立场)",
        9: "充分回应题目、立场深入且贯穿全文，观点充分延展并有力支撑。",
        8: "恰当充分地回应所有要求，立场清晰、发展充分，偶有遗漏。",
        7: "回应题目各部分，立场清晰贯穿，主要观点有延展与支撑（可能略微泛化）。",
        6: "回应了所有部分但发展不均，立场相关但可能模糊或重复。",
        5: "仅部分回应，立场时而不清，观点有限或欠展开。"
      },
      cc: {
        name: "Coherence & Cohesion (连贯与衔接)",
        9: "行文顺畅，衔接自然不突兀，段落组织娴熟。",
        8: "信息逻辑排序、衔接管理良好，偶有微小断层。",
        7: "逻辑组织、全程清晰推进，衔接手段多样（偶有过度/不足使用）。",
        6: "整体连贯，但衔接机械或偶有失误，指代不够清晰。",
        5: "有组织但缺乏整体推进，衔接词缺失/误用/滥用。"
      },
      lr: {
        name: "Lexical Resource (词汇)",
        9: "词汇灵活精准，自然 sophisticated 控制，极少拼写错误。",
        8: "词汇广、运用流畅灵活，非常用词使用熟练，偶有不准确。",
        7: "词汇足够支撑灵活与精准，能使用较少见词，偶有选词/拼写错。",
        6: "词汇基本够用，尝试较少见词但有不准确，错误不阻碍理解。",
        5: "词汇有限，重复明显，拼写/构词错误可能引起阅读困难。"
      },
      gra: {
        name: "Grammatical Range & Accuracy (语法)",
        9: "结构丰富、灵活运用，标点语法恰当，极少错误。",
        8: "结构广泛、灵活准确，多数句子无错，偶有非系统性错误。",
        7: "多样复杂结构，频繁产出无错句，整体控制良好、少量错误。",
        6: "简单与复杂结构混合，有错误但极少阻碍交流。",
        5: "结构有限，复杂句尝试但常错，频繁错误影响理解。"
      }
    }
  },
  task1: {
    label: "Task Achievement / Coherence & Cohesion / Lexical Resource / Grammatical Range & Accuracy",
    criteria: {
      ta: {
        name: "Task Achievement (任务完成)",
        9: "完全恰当满足任务所有要求，极罕见内容遗漏。",
        8: "恰当、相关、充分地覆盖要求，关键特征精选并清晰呈现。",
        7: "覆盖任务要求，内容相关准确；有清晰 overview，识别主要趋势/差异。",
        6: "聚焦任务要求，关键特征被充分突出，尝试给出 overview。",
        5: "大体回应任务，机械罗列细节、缺乏清晰 overview，或数据支撑不足。"
      },
      cc: {
        name: "Coherence & Cohesion (连贯与衔接)",
        9: "行文顺畅，衔接自然，段落组织娴熟。",
        8: "信息逻辑排序、衔接管理良好，偶有微小断层。",
        7: "逻辑组织、全程清晰推进，衔接手段多样（偶有过度/不足使用）。",
        6: "整体连贯，但衔接机械或偶有失误，指代不够清晰。",
        5: "有组织但缺乏整体推进，衔接词缺失/误用/滥用。"
      },
      lr: {
        name: "Lexical Resource (词汇)",
        9: "词汇灵活精准，自然 sophisticated 控制，极少拼写错误。",
        8: "词汇广、运用流畅灵活，非常用词使用熟练，偶有不准确。",
        7: "词汇足够支撑灵活与精准，能使用较少见词，偶有选词/拼写错。",
        6: "词汇基本够用，尝试较少见词但有不准确，错误不阻碍理解。",
        5: "词汇有限，重复明显，拼写/构词错误可能引起阅读困难。"
      },
      gra: {
        name: "Grammatical Range & Accuracy (语法)",
        9: "结构丰富、灵活运用，标点语法恰当，极少错误。",
        8: "结构广泛、灵活准确，多数句子无错，偶有非系统性错误。",
        7: "多样复杂结构，频繁产出无错句，整体控制良好、少量错误。",
        6: "简单与复杂结构混合，有错误但极少阻碍交流。",
        5: "结构有限，复杂句尝试但常错，频繁错误影响理解。"
      }
    }
  }
};

// ---- 雅思考官写作指南（结构 + 提分要点）：来源 IELTS Liz (ieltsliz.com) ----
var IELTS_GUIDE = {
  task2: {
    structure: "4–5 段：开头段（改写题目 + 明确立场）→ 2–3 个主体段（每段只一个中心论点 + 例证）→ 结尾段（重申立场）。主体段 2–3 个，不多不少；每段一个中心话题。",
    tips: {
      tr: ["回应题目中所有问题点（不只泛泛而谈话题）", "针对问题给出相关主要论点并充分展开", "规划支持点，避免跑题", "写满 250 词"],
      cc: ["使用 4 或 5 段（不多不少）", "每个主体段只一个中心话题", "逻辑组织观点", "使用一系列衔接词并避免错误"],
      lr: ["注意搭配（哪个动词配哪个名词）", "谨慎 paraphrase 避免错误", "使用贴合话题的丰富词汇", "拼写正确、避免非正式语"],
      gra: ["使用不同语法时态（条件/完成/被动/过去/将来）", "注意词序", "使用多样的句子结构", "正确使用标点；减少错误（冠词/复数/不可数名词/词序）"]
    }
  },
  task1: {
    structure: "报告式（无个人观点）：开头段（改写题目）→ Overview（最明显特征，不含具体数据）→ 2 个主体段（用数据/数字/日期支撑细节）。四段式常见；务必写 Overview；写事实报告、不写观点；满 150 词。",
    tips: {
      ta: ["分析图表并识别所有关键特征", "在 Overview 中突出关键特征", "主体段用数据支撑", "不写错误信息、不写观点、写事实报告"],
      cc: ["规划信息摆放位置", "四段式结构", "使用一系列衔接词", "避免衔接词错误、使用指代（this/it）"],
      lr: ["使用丰富词汇（线图/数据专用词）", "用准确呈现数据的词汇", "理解搭配", "避免拼写错误与非正式/错词"],
      gra: ["使用多样句子结构", "用对图表对应的时态", "正确词序（形容词+名词 / 动词+副词）", "避免错误、正确标点"]
    }
  },
  source: "IELTS Liz (ieltsliz.com) + 官方 Writing Band Descriptors (May 2023)"
};

// ---- 雅思写作「好词/高分词组」（来自微信文章 40 组精选，按主题）----
var ADVANCED_VOCAB = [
  { phrase: "place greater emphasis on", cn: "更加重视", ex: "Education systems place greater emphasis on critical thinking." },
  { phrase: "attach importance to", cn: "重视", ex: "Employers attach importance to communication skills." },
  { phrase: "play a pivotal role in", cn: "发挥关键作用", ex: "Parents play a pivotal role in shaping attitudes." },
  { phrase: "be instrumental in", cn: "在…方面起关键作用", ex: "Investment can be instrumental in promoting development." },
  { phrase: "lay the foundation for", cn: "为…奠定基础", ex: "Primary education lays the foundation for lifelong learning." },
  { phrase: "pave the way for", cn: "为…铺平道路", ex: "AI may pave the way for personalised healthcare." },
  { phrase: "serve as a catalyst for", cn: "成为催化剂", ex: "Trade serves as a catalyst for innovation." },
  { phrase: "act as a driving force behind", cn: "成为推动力", ex: "Demand acted as a driving force behind e-commerce." },
  { phrase: "reshape the way", cn: "重塑…方式", ex: "Digital tech reshaped the way people learn." },
  { phrase: "transform the landscape of", cn: "彻底改变…格局", ex: "Online education transformed the landscape of higher education." },
  { phrase: "reduce reliance on", cn: "减少依赖", ex: "Renewables reduce reliance on fossil fuels." },
  { phrase: "bridge the gap between", cn: "缩小差距", ex: "Tools bridge the gap between regions." },
  { phrase: "widen access to", cn: "扩大获取机会", ex: "Distance learning widened access to education." },
  { phrase: "facilitate access to", cn: "促进获取", ex: "Technology facilitates access to medical services." },
  { phrase: "streamline the process of", cn: "简化流程", ex: "Automation streamlines the process of manufacturing." },
  { phrase: "curb the growth of", cn: "遏制增长", ex: "Regulations curb the growth of plastic waste." },
  { phrase: "alleviate pressure on", cn: "缓解压力", ex: "Transit alleviates pressure on urban roads." },
  { phrase: "mitigate the impact of", cn: "减轻影响", ex: "Renewables mitigate the impact of climate change." },
  { phrase: "address the issue of", cn: "解决问题", ex: "Policymakers must address the issue of housing costs." },
  { phrase: "tackle the root causes of", cn: "解决根源", ex: "Governments should tackle the root causes of poverty." },
  { phrase: "place a strain on", cn: "给…造成压力", ex: "Population growth places a strain on public services." },
  { phrase: "take a toll on", cn: "对…造成损害", ex: "Long hours take a toll on well-being." },
  { phrase: "come at the expense of", cn: "以牺牲…为代价", ex: "Growth should not come at the expense of sustainability." },
  { phrase: "give rise to", cn: "引发", ex: "Social media gives rise to privacy concerns." },
  { phrase: "fuel demand for", cn: "刺激需求", ex: "Advertising fuels demand for unnecessary products." },
  { phrase: "reinforce the belief that", cn: "强化观点", ex: "Media reinforce the belief that wealth equals happiness." },
  { phrase: "undermine the ability to", cn: "削弱能力", ex: "Calculators undermine mental arithmetic ability." },
  { phrase: "hinder the development of", cn: "阻碍发展", ex: "Lack of resources hinders the development of skills." },
  { phrase: "allocate resources to", cn: "分配资源", ex: "Governments allocate resources to healthcare." },
  { phrase: "invest heavily in", cn: "大力投资", ex: "Countries invest heavily in renewable energy." },
  { phrase: "impose restrictions on", cn: "施加限制", ex: "Authorities impose restrictions on harmful ads." },
  { phrase: "provide incentives for", cn: "提供激励", ex: "Governments provide incentives for green practices." },
  { phrase: "foster a sense of", cn: "培养", ex: "Volunteering fosters a sense of responsibility." },
  { phrase: "cultivate the habit of", cn: "培养习惯", ex: "Parents cultivate the habit of independent learning." },
  { phrase: "promote awareness of", cn: "提高意识", ex: "Campaigns promote awareness of environmental issues." },
  { phrase: "derive benefit from", cn: "从…获益", ex: "Employees derive benefit from training." },
  { phrase: "be exposed to", cn: "接触", ex: "Children are exposed to vast information." },
  { phrase: "adapt to the demands of", cn: "适应需求", ex: "Workers adapt to a tech-driven economy." },
  { phrase: "strike a balance between", cn: "在…间取得平衡", ex: "Strike a balance between growth and environment." }
];

// ---- 中式英语 (Chinglish) 替换词典（初版，可扩展）----
var CHINGLISH = [
  // === very + 形容词（学术写作避免）===
  { wrong: "very important", right: "crucial / vital / essential / paramount", note: "very + adj 过泛，学术写作选用精准形容词" },
  { wrong: "very big", right: "enormous / substantial / major / massive", note: "very big 偏口语" },
  { wrong: "very small", right: "minimal / negligible / slight / modest", note: "very small 过泛" },
  { wrong: "very good", right: "excellent / outstanding / superb / exceptional", note: "very good 被滥用" },
  { wrong: "very bad", right: "severe / critical / devastating / appalling", note: "very bad 偏口语" },
  { wrong: "very happy", right: "delighted / thrilled / overjoyed", note: "very happy 表现力弱" },
  { wrong: "very sad", right: "devastated / heartbroken / distressed", note: "very sad 不够精准" },
  { wrong: "very many", right: "a considerable number of / countless / numerous", note: "very many 不自然" },
  { wrong: "very beautiful", right: "stunning / breathtaking / spectacular", note: "very beautiful 表现力弱" },
  { wrong: "very difficult", right: "challenging / arduous / daunting / formidable", note: "very difficult 可替换" },
  { wrong: "very easy", right: "straightforward / effortless / painless", note: "very easy 可替换" },
  { wrong: "very interesting", right: "fascinating / captivating / intriguing / compelling", note: "very interesting 可替换" },
  { wrong: "very expensive", right: "costly / exorbitant / steep / prohibitive", note: "very expensive 可替换" },
  { wrong: "very cheap", right: "affordable / inexpensive / budget-friendly", note: "very cheap 可替换" },
  { wrong: "very tired", right: "exhausted / drained / worn out / fatigued", note: "very tired 可替换" },
  { wrong: "very hungry", right: "starving / ravenous / famished", note: "very hungry 可替换" },

  // === 直译错误 ===
  { wrong: "open the light", right: "turn on / switch on the light", note: "开灯用 turn on，不用 open" },
  { wrong: "close the light", right: "turn off / switch off the light", note: "关灯用 turn off" },
  { wrong: "open the computer", right: "turn on the computer", note: "开电脑用 turn on" },
  { wrong: "open the TV", right: "turn on the TV", note: "开电视用 turn on" },
  { wrong: "look book", right: "read (a book)", note: "看书用 read，不用 look" },
  { wrong: "see a movie at home", right: "watch a movie at home", note: "在家看电影用 watch" },
  { wrong: "play phone", right: "use one’s phone / be on one’s phone", note: "玩手机用 use/be on，不用 play" },
  { wrong: "play computer", right: "use the computer / play computer games", note: "玩电脑用 use 或明确游戏" },
  { wrong: "how to say", right: "how to express / put it / how do you say", note: "“怎么说”用 express 或 how do you say" },
  { wrong: "how about your opinion", right: "what is your opinion / what do you think", note: "“你意见怎样”用 what 不用 how" },
  { wrong: "give you some color see see", right: "teach someone a lesson", note: "中式直译，完全错误" },
  { wrong: "no have", right: "do not have / there is no", note: "“没有”英语必须用 do not have" },
  { wrong: "long time no see", right: "It has been a long time since we last met", note: "“好久不见”在正式写作中不宜用" },
  { wrong: "horse horse tiger tiger", right: "so-so / mediocre / average", note: "“马马虎虎”中式直译" },
  { wrong: "good good study, day day up", right: "Study hard and make progress every day", note: "“好好学习天天向上”中式直译" },
  { wrong: "no door", right: "no way / impossible / out of the question", note: "“没门”直译" },
  { wrong: "lose face", right: "be embarrassed / humiliated / lose credibility", note: "“丢脸” lose face 偏中式英语，可改用更精准表达" },
  { wrong: "give face", right: "show respect / do someone a favor", note: "“给面子”用 show respect" },
  { wrong: "eat medicine", right: "take medicine", note: "“吃药”用 take，不用 eat" },
  { wrong: "drink soup", right: "eat / have soup", note: "“喝汤”英语用 eat/have soup" },
  { wrong: "ride a bicycle to go to school", right: "ride a bicycle to school / cycle to school", note: "go to 多余" },
  { wrong: "go to abroad", right: "go abroad", note: "abroad 是副词，前不加 to" },
  { wrong: "enter into the room", right: "enter the room", note: "enter 已是及物动词" },
  { wrong: "return back", right: "return / come back", note: "return 本身含 back 义" },
  { wrong: "discuss about", right: "discuss / talk about", note: "discuss 是及物动词，不加 about" },
  { wrong: "mention about", right: "mention", note: "mention 是及物动词，不加 about" },
  { wrong: "emphasize on", right: "emphasize / stress", note: "emphasize 是及物动词，不加 on" },
  { wrong: "contact with someone", right: "contact someone", note: "contact 是及物动词（美式）" },

  // === 搭配错误 (Collocation) ===
  { wrong: "learn knowledge", right: "acquire / gain / obtain knowledge", note: "knowledge 搭配 acquire/gain，不搭配 learn" },
  { wrong: "study knowledge", right: "acquire knowledge / study (a subject)", note: "同 learn knowledge" },
  { wrong: "make money", right: "earn money / generate income", note: "赚钱正式写作用 earn/generate" },
  { wrong: "do a mistake", right: "make a mistake", note: "犯错用 make，不用 do" },
  { wrong: "do a decision", right: "make a decision", note: "做决定用 make" },
  { wrong: "do progress", right: "make progress", note: "取得进步用 make" },
  { wrong: "do an effort", right: "make an effort", note: "付出努力用 make" },
  { wrong: "do research", right: "conduct / carry out research", note: "做研究 conduct 更正式" },
  { wrong: "do an experiment", right: "conduct / perform / carry out an experiment", note: "做实验 conduct/perform 更正式" },
  { wrong: "take an exam", right: "sit (for) / take an exam", note: "参加考试 take/sit 均可，注意 do an exam 是错的" },
  { wrong: "give an exam", right: "set / administer an exam（老师出题）", note: "学生参加考试是 take，老师出题是 set" },
  { wrong: "receive a phone call", right: "get / have a phone call", note: "接电话 get/have 更自然" },
  { wrong: "accept a gift", right: "receive a gift（收到）/ accept a gift（愿意收）", note: "receive=收到（客观），accept=接受（主观）" },
  { wrong: "make a friend", right: "make friends (with someone)", note: "交朋友用复数 make friends" },
  { wrong: "make a travel", right: "go on a trip / take a trip / travel", note: "去旅行用 go on a trip 或 travel 作动词" },
  { wrong: "make a party", right: "throw / have / hold a party", note: "举办派对用 throw/have/hold" },
  { wrong: "make a speech", right: "give / deliver a speech", note: "发表演讲用 give/deliver" },
  { wrong: "make a conclusion", right: "draw / reach / come to a conclusion", note: "得出结论用 draw/reach" },
  { wrong: "make a survey", right: "conduct / carry out a survey", note: "做调查用 conduct" },
  { wrong: "give a suggestion", right: "make / offer a suggestion", note: "提建议 make/offer" },
  { wrong: "give a speech", right: "deliver / give a speech", note: "give 也可以，deliver 更正式" },
  { wrong: "tell a story", right: "tell / recount a story", note: "讲故事用 tell，但讲故事也可说 share a story" },
  { wrong: "say a joke", right: "tell a joke", note: "讲笑话用 tell" },
  { wrong: "say a lie", right: "tell a lie", note: "说谎用 tell" },
  { wrong: "say the truth", right: "tell the truth", note: "说实话用 tell" },
  { wrong: "listen music", right: "listen to music", note: "听音乐 listen to" },
  { wrong: "look at the window", right: "look out of the window", note: "看窗外用 look out of" },
  { wrong: "search something", right: "look for / search for something", note: "寻找用 look for/search for" },
  { wrong: "wait someone", right: "wait for someone", note: "等待用 wait for" },
  { wrong: "pay attention on", right: "pay attention to", note: "注意用 pay attention to" },
  { wrong: "congratulate someone for", right: "congratulate someone on (something)", note: "祝贺用 congratulate on" },
  { wrong: "depend in", right: "depend on", note: "依赖用 depend on" },
  { wrong: "consist of / comprise of", right: "consist of / comprise (without of)", note: "comprise 不加 of，consist 加 of" },
  { wrong: "belong to (adj.)", right: "belong to (verb phrase)", note: "属于是动词短语，不说 be belong to" },
  { wrong: "be lack of", right: "lack (vt.) / be lacking in / a lack of (n.)", note: "lack 可作及物动词，不加 of" },
  { wrong: "be benefit to", right: "be beneficial to / benefit (vt.)", note: "有益于用 be beneficial to 或 benefit 直接及物" },
  { wrong: "be concern about", right: "be concerned about", note: "关心是 concerned，不是 concern" },
  { wrong: "be addict to", right: "be addicted to", note: "上瘾是 addicted" },
  { wrong: "be satisfy with", right: "be satisfied with", note: "满意是 satisfied" },
  { wrong: "be interest in", right: "be interested in", note: "感兴趣是 interested" },
  { wrong: "be bore with", right: "be bored with", note: "厌倦是 bored" },
  { wrong: "be confuse about", right: "be confused about", note: "困惑是 confused" },
  { wrong: "be excite about", right: "be excited about", note: "兴奋是 excited" },

  // === 介词/冠词 ===
  { wrong: "good for health", right: "beneficial to / conducive to good health", note: "有益健康用 beneficial/conducive to" },
  { wrong: "bad for health", right: "detrimental / harmful to health", note: "有害健康用 detrimental/harmful" },
  { wrong: "in recently years", right: "in recent years", note: "近年用 recent（形容词），不用 recently（副词）" },
  { wrong: "in the society", right: "in society / in today’s society", note: "在社会上不加 the（除非特指）" },
  { wrong: "in the campus", right: "on campus", note: "在校园用 on campus" },
  { wrong: "in the internet", right: "on the internet", note: "在网上用 on the internet" },
  { wrong: "in the newspaper", right: "in the newspaper / in a newspaper", note: "在报纸上用 in" },
  { wrong: "in a cold day", right: "on a cold day", note: "具体某一天用 on" },
  { wrong: "in the morning of Sunday", right: "on Sunday morning", note: "有具体日子时用 on" },
  { wrong: "in the night", right: "at night", note: "在晚上用 at night" },
  { wrong: "in the weekend", right: "at / on the weekend", note: "周末用 at (英) / on (美)" },
  { wrong: "in the Christmas", right: "at Christmas / on Christmas Day", note: "节日整体用 at，具体那天用 on" },
  { wrong: "arrive to", right: "arrive at (小地方) / arrive in (大地方)", note: "到达用 arrive at/in，不用 to" },
  { wrong: "reach to", right: "reach (vt. 不加介词)", note: "reach 及物，直接加地点" },
  { wrong: "get to home", right: "get home", note: "回家 home 是副词，不加 to" },
  { wrong: "go to home", right: "go home", note: "回家 home 是副词，不加 to" },

  // === 句法逻辑错误 ===
  { wrong: "because...so...", right: "because ... (勿与 so 连用)", note: "英语 because 与 so 不并用，选一个" },
  { wrong: "although...but...", right: "Although ... (勿与 but 连用)", note: "although 已含虽然但是，不加 but" },
  { wrong: "even although", right: "even though", note: "即使用 even though，不是 even although" },
  { wrong: "despite of", right: "despite / in spite of", note: "despite 不加 of，in spite 必须加 of" },
  { wrong: "no matter it is", right: "no matter what/who/where it is / whatever it is", note: "no matter 后须接疑问词 what/who/where 等" },
  { wrong: "there have", right: "there is / there are", note: "有用 there is/are，不用 there have" },
  { wrong: "there has", right: "there is / there exists", note: "存在用 there is/exists" },
  { wrong: "it is worth to do", right: "it is worth doing / it is worthwhile to do", note: "worth 接 doing，worthwhile 接 to do" },
  { wrong: "it needs to be done by me", right: "I need to do it", note: "能用主动就别用被动" },
  { wrong: "not only...and...", right: "not only...but also...", note: "not only 与 but also 配对" },
  { wrong: "both...and also...", right: "both...and...", note: "both 后不加 also" },
  { wrong: "the reason is because", right: "the reason is that", note: "原因是用 that 从句，不用 because" },
  { wrong: "the reason why...is because", right: "the reason (why) ... is that", note: "同 the reason is because" },
  { wrong: "so...to...", right: "so...that...", note: "如此以至于用 so...that" },
  { wrong: "too...to...(肯定)", right: "too...to...（本身表否定）", note: "too...to 已表太不能，注意不要逻辑矛盾" },
  { wrong: "as we all know + 大家都知道的事", right: "(删除或替换)", note: "as we all know 是废话，直接陈述事实" },

  // === 用词泛化 / 口语化 ===
  { wrong: "good", right: "beneficial / positive / favourable / advantageous", note: "good 过泛，选择具体褒义词" },
  { wrong: "bad", right: "detrimental / adverse / negative / unfavourable", note: "bad 过泛，选择具体贬义词" },
  { wrong: "things", right: "aspects / factors / elements / issues / matters", note: "things 过泛，按语境换具体名词" },
  { wrong: "stuff", right: "items / belongings / materials / equipment", note: "stuff 极口语，正式写作禁止" },
  { wrong: "people", right: "individuals / citizens / members of society / the public / residents", note: "people 在学术写作中可替换为更正式说法" },
  { wrong: "kids", right: "children / young people / adolescents / minors", note: "kids 偏口语，正式写作换 children" },
  { wrong: "guys", right: "people / individuals / colleagues / peers", note: "guys 口语化，正式写作不宜" },
  { wrong: "a lot of", right: "a considerable amount of / a significant number of / numerous / substantial", note: "a lot of 偏口语" },
  { wrong: "lots of", right: "a large number of / an abundance of / plentiful", note: "lots of 偏口语" },
  { wrong: "more and more", right: "an increasing number of / a growing amount of / increasingly", note: "more and more 偏口语" },
  { wrong: "big", right: "significant / substantial / considerable / major / large-scale", note: "big 偏口语" },
  { wrong: "small", right: "minor / modest / slight / marginal / negligible", note: "small 偏口语" },
  { wrong: "get", right: "obtain / acquire / receive / achieve / gain / become", note: "get 过泛，选择具体动词" },
  { wrong: "make (使)", right: "enable / allow / cause / render / facilitate", note: "使用 enable/allow 更正式" },
  { wrong: "help (做某事)", right: "help + verb / facilitate / contribute to / aid in + noun", note: "help 可以用，但学术写作建议换更精准词" },
  { wrong: "let", right: "allow / permit / enable", note: "let 偏口语" },
  { wrong: "give", right: "provide / offer / supply / grant / deliver", note: "give 过泛" },
  { wrong: "show", right: "demonstrate / illustrate / indicate / reveal / suggest / present", note: "show 过泛" },
  { wrong: "have", right: "possess / own / enjoy (benefit) / experience / undergo", note: "have 过泛，按语境换具体词" },
  { wrong: "like (动词)", right: "enjoy / appreciate / be fond of / be keen on / prefer", note: "like 在正式写作中可替换" },
  { wrong: "want", right: "desire / intend to / aim to / aspire to / wish to", note: "want 偏口语" },
  { wrong: "need", right: "require / necessitate / call for / demand", note: "need 在学术写作中可替换" },
  { wrong: "buy", right: "purchase / acquire / obtain / procure", note: "buy 偏口语" },
  { wrong: "find out", right: "discover / ascertain / determine / identify / establish", note: "find out 偏口语" },
  { wrong: "look at", right: "examine / analyse / consider / investigate / explore", note: "look at 偏口语" },
  { wrong: "think", right: "believe / argue / contend / maintain / hold the view that", note: "think 在学术写作中应替换" },
  { wrong: "say (陈述观点)", right: "argue / assert / contend / claim / state / maintain", note: "say 在表达观点时太弱" },
  { wrong: "maybe", right: "perhaps / arguably / potentially / it is likely that / there is a possibility that", note: "maybe 偏口语" },
  { wrong: "so (所以)", right: "therefore / consequently / thus / accordingly / as a result / hence", note: "so 偏口语" },
  { wrong: "but", right: "however / nevertheless / nonetheless / on the other hand / conversely / yet", note: "but 在学术写作中可替换" },
  { wrong: "and (句首)", right: "(不用连词开头) Additionally / Furthermore / Moreover / In addition", note: "学术写作句首不推荐 and" },
  { wrong: "also (句首)", right: "In addition / Additionally / Furthermore / Moreover", note: "also 放在句首偏口语" },
  { wrong: "really", right: "significantly / substantially / considerably / notably / indeed", note: "really 偏口语" },
  { wrong: "always", right: "consistently / invariably / without exception", note: "always 在学术写作中可替换" },
  { wrong: "nowadays", right: "In recent years / In contemporary society / At present / Currently", note: "nowadays 被滥用，可替换为更具体的时间短语" },
  { wrong: "in my opinion, i think", right: "I would argue that / In my view / I believe that / It seems to me that", note: "opinion 与 think 语义重复" },
  { wrong: "every coin has two sides", right: "(避免模板句，直接分析正反两面)", note: "被过度使用的模板句，考官反感" },
  { wrong: "with the development of society", right: "as society progresses / given the advance of ... / with ... evolving", note: "被过度使用，建议换表达" },
  { wrong: "with the development of economy", right: "with economic growth / as the economy develops / amid economic expansion", note: "同 with the development of" },
  { wrong: "as far as I am concerned", right: "in my view / personally / I believe", note: "模板套话，直接写 I believe 更自然" },
  { wrong: "last but not least", right: "finally / lastly", note: "被过度使用的模板，直接用 finally" },
  { wrong: "first and foremost", right: "first / firstly / the primary reason is", note: "冗余模板，直接用 first" },
  { wrong: "it is widely believed that", right: "many argue that / it is often argued that", note: "被滥用，建议换说法" },
  { wrong: "it goes without saying that", right: "undoubtedly / clearly / obviously", note: "模板套话，直接用副词" },
  { wrong: "solve the problem", right: "address / tackle / resolve / deal with the issue / challenge", note: "可换 address/tackle 增词汇多样性" },
  { wrong: "it is obvious that", right: "clearly / evidently / it is clear that / there is little doubt that", note: "it is obvious 可替换" },
  { wrong: "big city", right: "metropolis / major city / urban centre / large urban area", note: "big city 偏口语" },
  { wrong: "big problem", right: "major / serious / pressing / grave / critical issue / challenge", note: "big problem 偏口语" },
  { wrong: "big change", right: "significant / dramatic / profound / fundamental / sweeping change", note: "big change 偏口语" },
  { wrong: "improve the level", right: "raise the standard / improve the quality / enhance / upgrade", note: "level 不与 improve 搭配，改 raise standard" },
  { wrong: "promote the development", right: "foster / stimulate / encourage / drive the development", note: "promote 与 development 搭配可换动词" },
  { wrong: "enrich our life", right: "enrich our lives / enhance our quality of life", note: "our life 应为 our lives（多个人的生活）" },
  { wrong: "broaden our horizon", right: "broaden our horizons (复数)", note: "horizon 用复数 horizons" },
  { wrong: "learn more about the world", right: "gain insight into / develop an understanding of / broaden one’s perspective on", note: "learn more about 偏简单" },
  { wrong: "colorful life", right: "fulfilling / enriching / vibrant / well-rounded life", note: "colorful 中式搭配" },
  { wrong: "harmonious society", right: "a cohesive / stable / well-functioning society", note: "harmonious 是中式政治用语直译" },

  // === 中式抽象概念 ===
  { wrong: "spirit", right: "dedication / determination / perseverance / morale", note: "精神按语境换具体词，spirit 过泛" },
  { wrong: "quality (素质)", right: "competence / calibre / skill set / attributes / character", note: "素质按语境换 competence/calibre" },
  { wrong: "ability", right: "capability / capacity / competence / proficiency / aptitude", note: "ability 可替换为更具体词" },
  { wrong: "comprehensive ability", right: "overall competence / well-rounded skills / versatile capabilities", note: "综合能力中式表达" },
  { wrong: "self-cultivation", right: "self-improvement / personal development / self-discipline", note: "修身中式概念，西方用 personal development" },
  { wrong: "the Chinese dream", right: "(避免使用，除非引述)", note: "非学术概念，学术写作避免政治宣传语" },
  { wrong: "quality education", right: "well-rounded education / holistic education / high-quality education", note: "素质教育不可直译 quality education" },
  { wrong: "examination-oriented education", right: "exam-focused / test-driven education / the exam-centric system", note: "应试教育直译偏中式" },
  { wrong: "burden", right: "workload / pressure / stress / academic demands", note: "负担/减负按语境换 workload/pressure" },
  { wrong: "reduce burden", right: "reduce workload / relieve pressure / alleviate stress", note: "减负中式表达" }
];

// ============================================================
//  小作文高分句型库 (Task 1 Patterns)
//  来源：用户附件《Task 1 句型总汇》《IELTS Writing Task1 高分句型分类整理》
//        综合 Simon IELTS + IELTS Liz 教学体系
//  结构：按题型分类，每类含 {en,zh} 示范句；coreVocab 为速查表
// ============================================================
var TASK1_PATTERNS = {
  intro: {
    title: "开头段 · 改写题目 (Introduction)",
    note: "Simon 原则：开头段本质是 paraphrase 题目，用同义词+句式变化避免照抄。图表动词 show→illustrate/compare/give information about/present/depict；数量 the number of→the figure for/the amount of/the proportion of/the percentage of；时间 between X and Y→from X to Y/over the period from X to Y。",
    items: [
      { en: "The line graph compares the percentages of people in three age groups who visited a gym at least once a month in the UK between 1999 and 2009.", zh: "线图对比了英国 1999–2009 三个年龄段每月至少健身一次的人口比例" },
      { en: "The bar chart illustrates the amount of money spent on different types of entertainment in five countries in 2015.", zh: "柱状图说明了 2015 年五国在不同娱乐类型上的花费" },
      { en: "The table gives information about the number of foreign visitors to Australia from six different countries in 2010 and 2015.", zh: "表格提供了 2010 与 2015 来自六国赴澳外国游客数量的信息" },
      { en: "The pie charts show the proportion of energy generated from five different sources in a particular country in 2005 and 2015.", zh: "饼图显示了某国 2005 与 2015 五种能源发电占比" },
      { en: "The maps show the changes that took place in the coastal town of Seaville between 2000 and 2020.", zh: "地图展示了海滨小镇 Seaville 2000–2020 发生的变化" },
      { en: "The diagram illustrates the process by which milk and cheese are produced and distributed to consumers.", zh: "示意图说明了牛奶与奶酪生产并分发给消费者的流程" }
    ]
  },
  overview: {
    title: "概述段 · Overview（最重要的一段）",
    note: "Simon：Overview 是 Task 1 最重要的一段——没有 Overview 难上 6.5。核心是总结最明显趋势/特征，不出现具体数据，用 Overall 开头。",
    items: [
      { en: "Overall, the UK and Germany had the highest levels of internet use, while France and Italy had the lowest.", zh: "总体看，英国与德国网络使用水平最高，法意最低" },
      { en: "Overall, the proportion of elderly people increased in all three countries over the period shown.", zh: "总体上，三国老年人口比例在所示期间均上升" },
      { en: "Overall, it is clear that sales of coffee rose significantly, whereas tea sales experienced a slight decline.", zh: "显然咖啡销量显著上升，而茶销量略有下降" },
      { en: "The most noticeable trend is that spending on housing decreased steadily over the entire period.", zh: "最显著趋势是住房支出在整个期间稳步下降" },
      { en: "What stands out from the chart is that the number of students studying abroad doubled between 2005 and 2015.", zh: "图表最突出的是出国留学人数在 2005–2015 翻倍" },
      { en: "A striking feature is that the figure for Country A was consistently higher than that of Country B throughout the period.", zh: "一个显著特征是 A 国数据始终高于 B 国" }
    ]
  },
  dynamic: {
    title: "动态图 · 趋势语言 (Trend Language)",
    note: "线图/柱图/表格中随时间变化的数据。急剧上升 soar/surge/rocket/shoot up；稳步 rise gradually/grow consistently/climb；小幅 edge up。下降 plummet/plunge/drop sharply/decline dramatically。Simon 建议少用 go up 这类口语。",
    items: [
      { en: "The number of tourists visiting the region soared from 2 million to 8 million between 2000 and 2015.", zh: "游客数量在 2000–2015 从 200 万飙升至 800 万" },
      { en: "The percentage of households with internet access increased steadily from 25% to 85% over the 10-year period.", zh: "联网家庭比例在十年间从 25% 稳步升至 85%" },
      { en: "The rate of unemployment plummeted from 12% to just 3% during the same period.", zh: "失业率同期从 12% 骤降至仅 3%" },
      { en: "The demand for coal decreased steadily, falling from 60% to 25% of total energy use.", zh: "煤炭需求稳步下降，从总能源使用的 60% 降到 25%" },
      { en: "The number of visitors fluctuated between 500 and 800 per month throughout the year.", zh: "访客数全年每月在 500–800 间波动" },
      { en: "Sales figures remained stable at around £20,000 per month for the first six months.", zh: "前六个月销售额稳定在每月约 2 万英镑" },
      { en: "The population reached a peak of 10 million in 2015, before falling back to 8 million.", zh: "人口 2015 年达峰值 1000 万，之后回落至 800 万" },
      { en: "The figure hit a low of just 1,500 units in 2008.", zh: "该数据 2008 年触底仅 1500 单位" },
      { en: "A significant rise was observed in the number of electric vehicle users.", zh: "（被动）电动汽车用户数量出现显著上升" },
      { en: "The period from 2005 to 2015 saw a steady rise in the proportion of renewable energy.", zh: "（拟人）2005–2015 期间可再生能源比例稳步上升" }
    ]
  },
  static: {
    title: "静态图 · 比较语言 (Comparison Language)",
    note: "饼图/柱图/表格等某时间点对比。Simon：静态图不要写趋势，聚焦'谁最大/谁最小/差距多少'。占比 account for/make up/represent/constitute/comprise。",
    items: [
      { en: "The highest proportion was in the transport sector, accounting for 35% of total carbon emissions.", zh: "占比最高的是交通部门，占碳排放总量 35%" },
      { en: "The largest figure was for Germany, at 25%, while the smallest was for Spain, at just 5%.", zh: "最大值是德国 25%，最小是西班牙仅 5%" },
      { en: "At 45%, food represented the largest category of household spending.", zh: "食品占 45%，是家庭支出最大的类别" },
      { en: "The figures for France and Germany were almost identical, at around 20% each.", zh: "法国与德国数据几乎相同，各约 20%" },
      { en: "The proportion of men who exercised regularly was twice as high as that of women.", zh: "规律锻炼的男性比例是女性的两倍" },
      { en: "There was a significant gap between the highest and lowest figures — a difference of roughly 35 percentage points.", zh: "最高与最低值之间差距显著，约 35 个百分点" },
      { en: "The largest slice of the pie was taken up by housing, which accounted for 42% of total expenditure.", zh: "饼图中最大一块是住房，占总支出 42%" },
      { en: "Just under a quarter of household income was spent on rent and utilities.", zh: "不到四分之一的家庭收入用于房租与水电" },
      { en: "Food expenditure constituted the largest share of consumer spending in all five countries, peaking at 40% in Turkey.", zh: "食品支出在五国均占最大份额，土耳其达 40%" },
      { en: "Healthcare spending ranked at the top of the chart, indicating its paramount importance.", zh: "医疗支出位居榜首，显示其至关重要" }
    ]
  },
  map: {
    title: "地图题 · 变化与位置 (Maps)",
    note: "按区域逐一描述变化，区分 新增/拆除/保留/扩建 四种状态（Liz）。位置用 to the north/south of / adjacent to / opposite / near。",
    items: [
      { en: "A new supermarket was built to the west of the town center.", zh: "镇中心西侧新建了一家超市" },
      { en: "The old railway line was removed and replaced by a walking path.", zh: "旧铁路被移除，替换为步行道" },
      { en: "The shopping center was expanded to twice its original size.", zh: "购物中心扩建到原来两倍大小" },
      { en: "The port area underwent significant redevelopment and was transformed into a leisure complex.", zh: "港口区经历重大重建，改造为休闲综合体" },
      { en: "The hotel is located to the south of the lake, directly opposite the restaurant.", zh: "酒店位于湖南侧，正对餐厅" },
      { en: "While the northern area has remained largely unchanged, the southern part has experienced dramatic modifications.", zh: "北部基本未变，而南部发生巨大变化" }
    ]
  },
  process: {
    title: "流程图 · 顺序语言 (Process Diagrams)",
    note: "Simon 建议全程用被动语态；Liz 强调步骤连接词 first/next/then/after that/finally。",
    items: [
      { en: "The process begins with the collection of raw materials from the supplier.", zh: "流程始于从供应商处收集原材料" },
      { en: "After the materials have been collected, they are transported to the factory for processing.", zh: "材料收集后被运至工厂加工" },
      { en: "The next step is to heat the mixture to 200°C, which causes it to solidify.", zh: "下一步将混合物加热至 200°C 使其凝固" },
      { en: "Following this, the product is packaged and labeled before being sent to retailers.", zh: "随后产品被包装贴标，再发往零售商" },
      { en: "Finally, the finished product is delivered to supermarkets and stores for sale.", zh: "最后成品被配送至超市门店销售" },
      { en: "The raw materials are initially gathered and processed before being transported to the next phase.", zh: "（被动）原材料先被收集加工，再运往下阶段" }
    ]
  },
  comparison: {
    title: "通用对比句式 (General Comparative)",
    note: "动态图与静态图通用，连接两个数据点展示比较关系。",
    items: [
      { en: "In contrast, the figure for coal fell dramatically over the same period.", zh: "相反，煤炭数据同期大幅下降" },
      { en: "By comparison, the number of male participants was significantly lower.", zh: "相比之下，男性参与者数量明显更低" },
      { en: "Whereas renewable energy sources gained popularity, the use of fossil fuels declined.", zh: "可再生能源受欢迎的同时，化石燃料使用下降" },
      { en: "While the US saw a steady increase, Canada experienced a slight drop.", zh: "美国稳步上升，而加拿大略有下降" },
      { en: "A similar trend can be observed in the figures for France and Italy.", zh: "法国与意大利数据可见相似趋势" }
    ]
  },
  table: {
    title: "表格题专用 (Table-Specific)",
    note: "数据量大，筛选最高/最低/最大变化几个关键对比点，不要逐行描述（Simon）。",
    items: [
      { en: "Country A ranked first in terms of export volume, followed by Country B and Country C.", zh: "A 国出口量排名第一，其后为 B、C 国" },
      { en: "At the top of the list was Japan, with 15 million visitors, while Brazil ranked last with just 2 million.", zh: "榜首是日本 1500 万游客，末位是巴西仅 200 万" },
      { en: "In all four countries, the proportion of young adults living with their parents increased between 2000 and 2015.", zh: "四国中，与父母同住的年轻人比例在 2000–2015 均上升" }
    ]
  },
  mixed: {
    title: "组合图 (Mixed Charts)",
    note: "分别描述两个图表各写一段，最后可加一句对比。选最关键特征，不要每个数据都写（Simon）。",
    items: [
      { en: "The bar chart shows the number of tourists visiting four different regions, while the table gives a breakdown of their spending habits.", zh: "柱图显示赴四地区游客数，表格给出其消费习惯细分" },
      { en: "Turning to the second chart, the pie chart illustrates how these visitors allocated their budgets across different categories.", zh: "至于第二张图，饼图说明游客如何在不同类别间分配预算" },
      { en: "The data from the bar chart corresponds closely with the figures in the table, both showing a clear preference for beach holidays.", zh: "柱图数据与表格高度吻合，均显示明显偏好海滩度假" }
    ]
  },
  coreVocab: {
    title: "核心词汇速查表 (Core Vocabulary)",
    note: "功能分类速查。考试中新句型使用不超过语料库 30%，以准确度优先。",
    items: [
      { en: "rise / increase / grow / climb", zh: "上升" },
      { en: "fall / drop / decline / decrease / dip", zh: "下降" },
      { en: "soar / surge / skyrocket / rocket / shoot up", zh: "急剧上升" },
      { en: "plummet / plunge / slump / crash / tumble", zh: "急剧下降" },
      { en: "fluctuate / vary", zh: "波动" },
      { en: "level off / stabilize / remain stable / plateau", zh: "趋于平稳" },
      { en: "peak at / reach a peak of / hit a high of", zh: "达到顶峰" },
      { en: "bottom out at / reach a low of / hit a trough", zh: "降至最低" },
      { en: "dramatically / significantly / substantially / considerably", zh: "大幅地" },
      { en: "steadily / gradually / moderately / consistently", zh: "稳步地" },
      { en: "slightly / marginally / minimally", zh: "轻微地" },
      { en: "account for / make up / represent / constitute / comprise", zh: "占（比例）" },
      { en: "approximately / roughly / around / about / just over / just under", zh: "大约" },
      { en: "in contrast / by comparison / whereas / while / compared to", zh: "相比之下" },
      { en: "subsequently / following this / after that / the next step is", zh: "流程连接" },
      { en: "was built / was constructed / was added / was developed", zh: "地图：被建造" },
      { en: "was removed / was demolished / was knocked down / disappeared", zh: "地图：被拆除" },
      { en: "was replaced by / made way for / was converted into", zh: "地图：被替换" },
      { en: "to the north/south/east/west of / adjacent to / opposite / near", zh: "位置描述" }
    ]
  }
};

// ============================================================
//  Simon IELTS 批改原则 (来自附件 DOC2，基于 Simon + IELTS Liz)
// ============================================================
var SIMON_PRINCIPLES = {
  structure: "四段式：Introduction(改写题目) → Overview(最明显特征，不写数据) → Body 1(第一组数据) → Body 2(第二组数据)",
  rules: [
    "Overview 是 Task 1 最重要的一段——没有 Overview 难上 6.5 分。",
    "开头段本质是 paraphrase 题目，用同义词+句式变化避免照抄题干。",
    "静态图不要写趋势，聚焦'谁最大 / 谁最小 / 差距多少'。",
    "动态图用学术动词(increase/rise/grow)，少用 go up 等口语表达。",
    "地图题按区域描述变化，区分 新增 / 拆除 / 保留 / 扩建 四种状态。",
    "流程图全程使用被动语态。",
    "每个类别先掌握前 3 个核心表达，考试新句型使用不超过语料库 30%，准确度优先。"
  ]
};

// ============================================================
//  真题批改思路预设 (Correction Playbook)
//  键 = PPT 题库中的 subtype（题型），用于"预先准备批改思路+用词修改"
//  patterns 指向 TASK1_PATTERNS 相应分类，批改时联动展示
// ============================================================
var CORRECTION_PLAYBOOK = {
  // ---- Task 1 小作文（按图表题型）----
  "柱状图": {
    task: "task1", structure: "四段式：1)改写题目 2)Overview(最明显特征，不写数据) 3)Body1(最高/最低/主要类别) 4)Body2(次要点+对比)",
    mustHave: ["开头改写题目(避免照抄show)", "Overview 段用 Overall 概括全局(无具体数据)", "至少对比最高与最低", "用具体数据支撑每个结论"],
    vocab: "占比 account for/make up/represent；排序 top the list/rank first/closely followed by；比较 twice as high as/significantly higher than；约数 approximately/roughly",
    pitfalls: ["静态图不要写趋势(上升/下降)", "避免照抄题干动词 show", "Overview 缺失难上 6.5"],
    patterns: ["intro", "overview", "static", "comparison", "coreVocab"]
  },
  "表格": {
    task: "task1", structure: "四段式：1)改写 2)Overview 3)Body1(排名最高/最低) 4)Body2(中间值与跨区域对比)",
    mustHave: ["筛选关键对比点(最高/最低/最大变化)，勿逐行罗列", "给出排名 ranking", "跨区域/跨类别对比", "Overview 无数据"],
    vocab: "rank first/at the top of the list；accounted for the lowest percentage；a significant gap/difference of X points；almost identical",
    pitfalls: ["数据量大易陷入逐行描述", "要有 overview 而非平铺", "注意单位与年份对应"],
    patterns: ["intro", "overview", "static", "table", "comparison", "coreVocab"]
  },
  "曲线图": {
    task: "task1", structure: "四段式：1)改写 2)Overview(总体趋势) 3)Body1(起止+峰值) 4)Body2(波动/交叉/对比线)",
    mustHave: ["描述起点/终点/峰值/低谷", "用趋势动词(soar/plummet/fluctuate)", "多线对比(in contrast/whereas)", "Overview 概括方向"],
    vocab: "soared/surged/plummeted；remained stable/plateaued；fluctuated between X and Y；reached a peak of；hit a low of",
    pitfalls: ["避免 go up/go down 口语", "不要漏掉总体趋势", "多条线要分别交代"],
    patterns: ["intro", "overview", "dynamic", "comparison", "coreVocab"]
  },
  "饼状图": {
    task: "task1", structure: "四段式：1)改写 2)Overview(最大/最小块) 3)Body1(主要占比) 4)Body2(次要占比+变化)",
    mustHave: ["指出最大与最小扇区", "用占比动词", "若有两年对比需说明变化", "Overview 概括构成"],
    vocab: "the largest slice was taken up by；made up the second largest proportion；the remaining X% was divided between；just under a quarter",
    pitfalls: ["不要把每个扇区都写满", "注意单图与多图区别", "占比总和意识"],
    patterns: ["intro", "overview", "static", "comparison", "coreVocab"]
  },
  "地图": {
    task: "task1", structure: "两段式(或四段)：1)改写 2)概述整体变化 3)原布局 4)变化后布局(按区域)",
    mustHave: ["区分 新增/拆除/保留/扩建 四种状态", "用位置介词(to the north of/adjacent to)", "用被动语态描述变化", "Overview 概括最显著变化"],
    vocab: "was built/constructed/added；was removed/demolished；was replaced by/made way for；was transformed into；located/adjacent to",
    pitfalls: ["不要按时间线流水账，要按区域", "变化状态要区分清楚", "位置描述要准确"],
    patterns: ["intro", "overview", "map", "coreVocab"]
  },
  "流程图": {
    task: "task1", structure: "三段式：1)改写 2)总述阶段数 3)按步骤被动描述(首→中→尾)",
    mustHave: ["全程被动语态", "步骤连接词(first/next/following this/finally)", "说明起点与终点", "不写个人观点"],
    vocab: "The process begins with；After X has been Y-ed, it is Z-ed；The next step is to；Finally the finished product is；commences with/subsequently",
    pitfalls: ["不要用主动口语", "不要漏掉阶段", "不要加数据或观点"],
    patterns: ["intro", "overview", "process", "coreVocab"]
  },
  "混合图": {
    task: "task1", structure: "四段式：1)改写(说明两图) 2)Overview 3)Body1(图一) 4)Body2(图二+对比)",
    mustHave: ["分别描述两个图表", "选最关键特征不堆数据", "末可加一句两图关联", "Overview 概括两图"],
    vocab: "The bar chart shows… while the table gives；Turning to the second chart；corresponds closely with",
    pitfalls: ["不要每个数据都写", "两图要均衡篇幅", "末段可点明关联"],
    patterns: ["intro", "overview", "mixed", "dynamic", "static", "coreVocab"]
  },
  // ---- Task 2 大作文（按提问方式）----
  "同意与否题": {
    task: "task2", structure: "四段式：1)改写题目+明确立场 2)支持立场理由1+例证 3)理由2(或让步反方) 4)结论重申立场",
    mustHave: ["开头明确 agree/disagree 程度", "立场贯穿全文", "每段有具体例子", "结论回扣立场"],
    vocab: "I firmly believe that；There are compelling reasons to support；The advantages outweigh the disadvantages；valid arguments on both sides",
    pitfalls: ["立场模糊(既同意又不同意要说清程度)", "只给观点无例子", "偏题"],
    patterns: ["comparison", "coreVocab"]
  },
  "双边讨论题": {
    task: "task2", structure: "五段式：1)引出双方 2)On one hand(支持方) 3)On the other hand(反方) 4)In my view(明确立场) 5)结论",
    mustHave: ["双方观点都要讨论", "必须给出自己观点", "双方各有具体例子", "balanced 但不中立含糊"],
    vocab: "Some people argue that… Others contend that；On one hand… On the other hand；In my view a balanced approach；draw on the merits of both",
    pitfalls: ["只写一方", "忘记给 own opinion(题目要求)", "双方篇幅失衡"],
    patterns: ["comparison", "coreVocab"]
  },
  "报告类": {
    task: "task2", structure: "四段式：1)改写题目 2)原因1+拓展 3)原因2/影响+拓展 4)解决方案+结论",
    mustHave: ["回应 why/因果或 solution", "原因与解决分开清晰", "具体例证", "不强行站队"],
    vocab: "Several factors contribute to；Systemic factors such as；A multi-faceted approach is needed；Governments should implement；practical solutions exist",
    pitfalls: ["把报告题写成同意与否", "原因与解决混淆", "缺乏具体性"],
    patterns: ["comparison", "coreVocab"]
  },
  "利弊比较题": {
    task: "task2", structure: "四段式：1)引出话题 2)优点段 3)缺点段 4)结论(权衡/个人倾向)",
    mustHave: ["优点缺点都覆盖", "有比较与权衡", "具体例子", "结论给出倾向或平衡判断"],
    vocab: "A notable benefit is；On the downside；The drawbacks are outweighed by；a double-edged sword；weigh the pros and cons",
    pitfalls: ["只写利或只写弊", "无权衡直接结束", "缺例子"],
    patterns: ["comparison", "coreVocab"]
  }
};

// ============================================================
//  Task 2 话题核心词 (Topic Vocabulary) — 用于"用词修改"预设
//  键 = PPT 题库中的 topic（社会生活类/教育类…）
// ============================================================
var TOPIC_VOCAB = {
  "社会生活类": { core: ["society", "community", "people", "life", "happy"], advanced: ["social cohesion", "well-being", "societal norms", "quality of life", "public morale"] },
  "教育类":     { core: ["education", "students", "learn", "school", "teach"], advanced: ["academic performance", "cultivate critical thinking", "holistic development", "pedagogical approach", "lifelong learning"] },
  "政府类":     { core: ["government", "policy", "law", "tax", "country"], advanced: ["legislate", "allocate public funds", "regulatory framework", "public expenditure", "stricter regulations"] },
  "环境类":     { core: ["environment", "pollution", "protect", "nature"], advanced: ["environmental degradation", "sustainable development", "carbon footprint", "ecological balance", "renewable energy"] },
  "科技类":     { core: ["technology", "internet", "science", "computer"], advanced: ["technological advancement", "digital literacy", "automate", "cutting-edge innovation", "technological proliferation"] },
  "传统与文化类": { core: ["tradition", "culture", "custom", "old"], advanced: ["cultural heritage", "preserve identity", "cultural erosion", "time-honoured", "cultural assimilation"] },
  "媒体类":     { core: ["media", "news", "advertise", "tv"], advanced: ["mass media", "shape public opinion", "commercialise", "sensationalise", "misinformation"] },
  "抽象类":     { core: ["happiness", "success", "freedom", "money"], advanced: ["subjective well-being", "fulfilment", "personal autonomy", "intrinsic value"] },
  "城市化与全球化": { core: ["city", "global", "town", "world"], advanced: ["urbanisation", "globalisation", "metropolitan", "cosmopolitan", "infrastructure"] }
};

// ============================================================
//  基础词 → 高分词 升级建议 (Word Upgrades) — 用于"用词修改"
//  basic 命中即建议替换为 adv 中的学术表达
// ============================================================
var WORD_UPGRADES = [
  { basic: "show", adv: ["illustrate", "compare", "give information about", "present"], ctx: "图表动词" },
  { basic: "go up", adv: ["increase", "rise", "grow", "climb"], ctx: "上升" },
  { basic: "go down", adv: ["decrease", "decline", "fall", "drop"], ctx: "下降" },
  { basic: "a lot", adv: ["significantly", "substantially", "considerably"], ctx: "幅度" },
  { basic: "big", adv: ["considerable", "substantial", "major"], ctx: "程度" },
  { basic: "more and more", adv: ["increasingly", "an increasing number of"], ctx: "" },
  { basic: "important", adv: ["crucial", "significant", "vital", "essential"], ctx: "" },
  { basic: "people", adv: ["individuals", "the public", "citizens", "the population"], ctx: "" },
  { basic: "think", adv: ["argue", "maintain", "contend", "believe"], ctx: "学术动词" },
  { basic: "get", adv: ["obtain", "acquire", "gain"], ctx: "" },
  { basic: "use", adv: ["utilize", "employ", "adopt"], ctx: "" },
  { basic: "help", adv: ["assist", "contribute to", "facilitate"], ctx: "" },
  { basic: "many", adv: ["a multitude of", "numerous", "a host of"], ctx: "" },
  { basic: "good", adv: ["beneficial", "positive", "favourable"], ctx: "" },
  { basic: "bad", adv: ["detrimental", "negative", "adverse"], ctx: "" },
  { basic: "very", adv: ["extremely", "highly", "particularly"], ctx: "" },
  { basic: "rich", adv: ["wealthy", "affluent"], ctx: "" },
  { basic: "poor", adv: ["impoverished", "deprived"], ctx: "" },
  { basic: "job", adv: ["employment", "career", "occupation"], ctx: "" },
  { basic: "problem", adv: ["issue", "challenge", "drawback"], ctx: "" },
  { basic: "thing", adv: ["aspect", "factor", "element"], ctx: "" },
  { basic: "hard", adv: ["difficult", "challenging", "demanding"], ctx: "" },
  { basic: "'nowadays'", adv: ["in recent years", "currently"], ctx: "避免每句开头" }
];
