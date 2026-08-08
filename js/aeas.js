// ============================================================
//  AEAS 写作模块 · 数据层
//  来源：用户附件《AEAS写作指导.pdf》(112页)
//        官方：https://www.iaeas.com.cn/news/show/5170.html
//  结构：三个年级段 (4-6 / 7-9 / 10-12) × AEAS 三项评分标准 × 20 分制
// ============================================================
var AEAS_DATA = {
  intro: "AEAS 写作主要考核学生对题目的理解、文章构思以及书面表达水平。写作要求与题材按年级段区分：4-6 年级 20 分钟 / 120–150 词；7-9 年级 30 分钟 / 150–200 词；10-12 年级 30 分钟 / 200–250 词。总分 20 分，按三项标准评分。",
  gradeBands: {
    "4-6": {
      time: "20 分钟", words: "120–150 词",
      focus: "以记叙文为主，少数需要发表观点的议论文。题目直接（生活/校园中的人与事）。",
      types: ["记叙文", "议论文"],
      note: "学生基础相对薄弱。记叙文审题重点：避免表面描写（只写职业/爱好就结尾）、避免零散讲故事而偏离主题。建议正文提炼人物两个特征，各配一个故事。议论文用记叙文思路（特征+故事回答 why）。"
    },
    "7-9": {
      time: "30 分钟", words: "150–200 词",
      focus: "记叙文与议论文/说明文并重，另含书信。审题与文章构建难度大幅提升。",
      types: ["记叙文", "议论文", "书信"],
      note: "记叙文审题：多问题整合，不可像简答题逐问回答，需确立统一主题。议论文审题核心：区分 contention question（需议论的核心问题，必须明确立场）与 non-contention question（描述性小问，1-2 句带过）。时间分配：审题 1-2 分 → 列提纲 5-6 分 → 写作 → 检查。"
    },
    "10-12": {
      time: "30 分钟", words: "200–250 词",
      focus: "以议论文为主，为高中 EAL / 大学论文做准备。考核更严格：文体把握、结构安排、语言表达、论点扣题。",
      types: ["议论文（优缺点）", "议论文（同意与否）", "议论文（原因分析）", "议论文（夹叙夹议/建议措施）"],
      note: "与 7-9 年级议论文结构相同（Introduction-Body-Conclusion），但话题更广泛（环保与经济、义务教育、克隆技术伦理等），论证深度与语言复杂度要求更高。结论可提出进一步措施并升华。"
    }
  },
  // ============================================================
  //  AEAS 官方评分标准（20 分制）
  //  来源：iaeas.com.cn 官方说明 + 多平台培训资料交叉验证
  //  三项：Content & Organisation / Accuracy of Language / Use of Vocabulary
  // ============================================================
  scoring: {
    total: 20,
    criteria: [
      {
        key: "content",
        name: "内容与组织",
        nameEn: "Content & Organisation",
        maxPts: 7,
        description: "文章是否紧扣题目要求、内容是否充实；结构是否清晰、段落衔接是否自然、思维是否连贯。",
        levels: {
          "优秀 6-7": "完全扣题，论点充分，结构严谨，段落逻辑清晰，结论有力回扣主题。",
          "良好 4-5": "基本扣题，有论点但个别论证不够深入，结构完整但部分衔接可加强。",
          "一般 2-3": "部分离题，内容单薄，结构松散，段落间逻辑关联弱。",
          "较弱 0-1": "严重离题或未完成，无明显结构，内容杂乱。"
        }
      },
      {
        key: "language",
        name: "语言准确性",
        nameEn: "Accuracy of Language",
        maxPts: 7,
        description: "语法正确性（时态、主谓一致、句子结构、标点）、拼写、表达是否清晰准确。",
        levels: {
          "优秀 6-7": "语法准确，句式多样，拼写/标点极少错误，表达自然流畅。",
          "良好 4-5": "偶有语法错误但不影响理解，句式有一定变化，拼写/标点基本正确。",
          "一般 2-3": "语法错误较多，句式单一，部分句子影响理解。",
          "较弱 0-1": "大量语法错误，严重影响理解，句子不成型。"
        }
      },
      {
        key: "vocab",
        name: "词汇运用",
        nameEn: "Use of Vocabulary",
        maxPts: 6,
        description: "词汇丰富程度、用词准确性、是否使用恰当的词伙搭配。",
        levels: {
          "优秀 5-6": "词汇丰富准确，能灵活使用同义替换和恰当搭配，表达地道。",
          "良好 3-4": "词汇基本准确，有少量替换意识，偶尔用词不当。",
          "一般 1-2": "词汇量有限，重复使用简单词汇，用词错误较多。",
          "较弱 0": "词汇极度匮乏，大量用词错误，无法有效表意。"
        }
      }
    ]
  },

  types: {
    "记叙文": {
      label: "记叙文（写人 / 写物 / 写事）",
      note: "4-6 年级与 7-9 年级共用此结构，但 7-9 审题难度大幅提升：需整合多个小问为统一主题，不可逐问回答。",
      subtypes: {
        "写人": {
          outline: "Introduction：基本信息（姓名/身份/家乡/年龄）+ 外貌描写 + 主要特征主题句。Body：特征1 + 对应故事；特征2 + 对应故事。Conclusion：对人物评价 + 回归主题。",
          pitfalls: "误区① 表面描写（只写职业年龄爱好就结尾，无人物塑造）。误区② 故事与特征无关（如写最喜欢的老师却讲老师提前下课看球赛——已离题）。",
          prompts: [
            "What do you think friendship means? Describe your best friend and show the reasons that make him/her your best friend.",
            "My favourite teacher — describe the teacher and explain why you like him/her.",
            "Your two very different friends: describe two friends that are so unlike. How is their life going?",
            "Write about one of my family members."
          ],
          model: {
            title: "范文 · My Best Friend（含分析）",
            text: "Friendship is very important for everyone, especially me. I believe friendship means to share happiness and sorrows together. And I am grateful that I have a very sincere friend Petou. He's the same age with me and goes to the same primary school. He's not tall but handsome, always wearing warm smiles. Among all the friends, I like him best!\n\nThe first reason I consider him as my best friend is that he is a very helpful friend, who always gives us a hand whenever we're in trouble. I like doing homework with him. Every time I get confused, he would assist me in solving the questions patiently.\n\nMoreover, Petou is a funny person. He always tells me funny stories to make me laugh. I remembered I was so sad once because of my poor marks on a Math exam. He immediately told me lots of funny jokes to cheer me up.\n\nThis is my best friend Petou. I really appreciate his great personality and I hope our friendship could be strong and lasting!",
            analysis: "开头先巧妙带过题目小问（friendship 定义），再直接点题；Body 用 helpful / funny 两个特征各配一个具体故事；Conclusion 回扣主题并升华。4-6 年级记叙文标杆写法。"
          }
        },
        "写物": {
          outline: "Introduction：物品基本信息（来源/外观/颜色/形状/材料）+ 主要特征主题句。Body：特征1 + 对应故事；特征2 + 对应故事（特征可从用途、功能、意义、外观四个角度选）。Conclusion：评价 + 回归主题。",
          pitfalls: '误区① 忽视题目限定词（如"最难忘的生日礼物"却不讲为什么难忘）。误区② 素描式罗列属性（从头到尾讲外观，无叙事、无感情）。',
          prompts: [
            "What are the world-known architectures in your country?",
            "Describe a thing that made you feel proud. Do you usually have that kind of feeling? What happened, why would you feel so proud?",
            "Write about the culture or traditional custom in your country. Which is your favourite one, why?",
            "Wheels — talk about the historical development of wheels. What benefits have wheels brought to us?"
          ]
        },
        "写事": {
          outline: "Introduction：倒序开头（先讲结局 + 感受 + 扣题）。Body 第一段：起因（时间/地点/人物 + 前期发展）。Body 第二段：经过（挑 1-2 个情节重点描写，有波澜/转折）。Body 第三段：结果（略写）。Conclusion：评价/感受 + 回归主题。",
          pitfalls: "误区① 无细节、任务式完成，情节不丰满。误区② 记流水账（如露营从早到晚平铺直叙，无主题）。",
          prompts: [
            "Describe an unforgettable shopping experience with your family or friends.",
            "Describe a time when you overcame a difficulty (e.g. finishing a race you thought you couldn't).",
            "Describe a school event — what happened, who participated, how did you feel?",
            "Camping: you may go camping next week. Who will go with you? What will you do?"
          ]
        }
      }
    },
    "书信": {
      label: "书信（邀请 / 投诉 / 建议 / 普通交流）",
      note: "出现于 7-9 年级。注意英文书信格式：齐头式（段首不空格），段间空行；称呼后加逗号非冒号；署名左对齐。",
      template: "称呼（Dear Sir/Madam 或 Dear + 姓/名）→ 开头段说明写信目的 → 主体（按内容调整语气）→ 信末礼貌语（Yours sincerely / faithfully）+ 署名。",
      subtypes: {
        "邀请信": { outline: "写明邀请原因 + 介绍活动详情；语气友好。", prompts: ["Invite a friend to your party on 14 September."] },
        "投诉信": { outline: "对政府/机构说明 1–2 个原因，言辞恳切。", prompts: ["The government plans to build a new building that locals oppose — write a letter of complaint."] },
        "建议信": { outline: "表明观点 + 给出证据 + 建议措施。", prompts: ["Write a letter to your teacher giving advice about transport in your city."] },
        "道歉信": { outline: "道歉 + 解释原因 + 补救/改进措施。", prompts: ["You've broken something that your mother likes so much. Write a letter to show your apology."] },
        "普通交流信": { outline: "通用书信格式，按对象选随意或正式语气。", prompts: ["Write a letter to your teacher about what job you want to do in the future."] }
      }
    },
    "议论文": {
      label: "议论文 / 说明文（观点论证 · 起承转合）",
      note: "7-9 & 10-12 共用此结构。审题第一步：区分 contention question（核心议论点，必须明确立场）与 non-contention question（描述性小问，1-2 句带过）。",
      outline: `Introduction：背景引入 + 回答 non-contention question + 明确提出观点（避免用 I think，用事物作主语或被动态）。Body：三个论点分三段，每段 2-3 个例子。论述方式：建议用"优缺点"（2 优 1 缺 / 2 缺 1 优），真理性问题用"一边倒"。Conclusion：重申观点 + 可稍作拓展/呼吁（不可提出新论点）。`,
      template: "1 Ever since the advancement of …, there has been an intense debate as to (whether)…\n2 Some argue that…, while others claim that…\n3 As for my perspective, I believe…, of which I will explain in further detail.\n4 Indeed, it is essential to note that…\n5 While we…, we…\n6 However,…\n13 In conclusion, it is evident that…",
      contention: `审题时间 1-2 分钟。先区分 Background information / Contention question / Non-contention questions 三要素。例如"面对污染问题，描述你家乡的情况并给出解决措施"——contention 是"如何解决"，描述现状是 non-contention（放开头）。审题失误是低分主因（最高 8/20）。`,
      prompts: [
        "Media influence people in whole life — do you think it is positive or negative?",
        "Most schools in Australia require students to wear a school uniform. Do you think wearing a uniform is positive or negative?",
        "Co-education or single-sex education: talk about advantages and disadvantages.",
        "Education is not the most important factor in developing countries. Do you agree or disagree?",
        "Exercise is an essential part of healthy lifestyle. Give your own opinion."
      ]
    },
    "议论文（优缺点）": {
      label: "议论文 · 优缺点",
      note: '题目直接问好处/坏处。建议 2:1 写法（2 优 1 缺 = 利大于弊），对比类用 2:2（A 两优点 vs B 两优点）。开头不直接说"利大于弊"，放结论段总结。',
      outline: "Introduction：背景 + 提出观点（某事有益/无益）。Body：论点 1（优/缺）+ 2-3 例；论点 2（优/缺）+ 2-3 例；论点 3（对立面）+ 2-3 例。Conclusion：利大于弊 / 弊大于利 + 拓展。",
      prompts: ["Co-education or single-sex education: talk about advantages and disadvantages of each.", "Online learning: discuss the advantages and disadvantages."]
    },
    "议论文（同意与否）": {
      label: "议论文 · 同意与否",
      note: `题目有明显 'do you agree or disagree' 标志。真理性问题用"一边倒"（三个统一立场论点），其他可用优缺点方式体现客观性。`,
      outline: "Introduction：背景 + 明确表态（同意/不同意）。Body：论点 1 + 2-3 例；论点 2 + 2-3 例；论点 3（反面考虑/补充）+ 2-3 例。Conclusion：重申立场。",
      prompts: ["Education is not the most important factor in developing countries. Do you agree or disagree?", "Media influences people in their whole life — do you think it is positive or negative?"]
    },
    "议论文（原因分析）": {
      label: "议论文 · 原因分析",
      note: "文章本质在回答 'why'。Introduction 中先回答 non-contention 描述性小问，再提出核心观点。",
      outline: "Introduction：背景 + 回答描述性小问 + 提出观点（为什么应该/不应该）。Body：原因 1 + 例证；原因 2 + 例证；原因 3 + 例证。Conclusion：重申 + 呼吁。",
      prompts: ["Why do you think schools ask students to wear uniforms? Give examples.", "Exercise: write an article for your school newspaper. What exercises can students do and why?"]
    },
    "议论文（夹叙夹议/建议措施）": {
      label: "议论文 · 夹叙夹议 / 建议措施",
      note: "夹叙夹议 = 开头多些描述性回答（non-contention），然后议论原因。建议措施 = 回答 'how'，提出解决方案。",
      outline: "建议措施式 — Introduction：背景 + 描述问题现状 + 提出需采取措施+essay map。Body：措施 1 + 例；措施 2 + 例；措施 3 + 例。Conclusion：总结 + 呼吁更多措施。",
      prompts: ["Environment pollution: describe what problems you see and how to overcome them.", "Who is responsible for protecting people during natural disasters and how can we predict them?"]
    }
  },
  // 学生易错语法（来自写作指导附录）
  grammarTips: [
    "被动语态：英语被动比中文普遍。结构 助动词 be + 及物动词过去分词 / 情态动词 + be + 过去分词。当强调动作承受者、不必说出执行者或含糊不清时多用。",
    "非谓语动词：一个句子只能有一套谓语结构。多动作时变为非谓语：-ing（主动关系）/ 过去分词 -ed（被动关系）/ to do（不定式目的）。",
    "冠词 a/an/the 的误用（尤其泛指与特指混淆）。",
    "不可数名词误加复数（information, advice, furniture, equipment…）。",
    "词序：形容词 + 名词 / 动词 + 副词。",
    "主谓一致与时态一致（尤其第三人称单数 -s）。"
  ]
};
