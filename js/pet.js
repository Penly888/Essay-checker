// ============================================================
// PET / B1 Preliminary Writing — 2020 新制
// Part 1: Email (~100 words, compulsory)
// Part 2: Article OR Story (~100 words, choose one)
// 评分: Content 0-5 + Communicative Achievement 0-5 + Organisation 0-5 + Language 0-5 = 20 分
// ============================================================

var PET_SCORING = {
  maxPerScale: 5,
  totalMax: 20,
  wordTarget: 100,
  timeMinutes: 45,
  bandDescriptors: [
    {
      band: 5,
      label: "Very good",
      content: "All content elements covered appropriately. Message clearly communicated to reader.",
      commAchieve: "Uses conventions of the task effectively to hold target reader's attention and communicate straightforward and complex ideas, as appropriate.",
      organisation: "Text is well-organised and coherent, using a variety of cohesive devices and organisational patterns to generally good effect.",
      language: "Uses a range of vocabulary, including less common lexis, appropriately. Uses a range of simple and complex grammatical forms with control and flexibility. Occasional errors do not impede communication."
    },
    {
      band: 4,
      label: "Good",
      content: "All content elements adequately dealt with. Message communicated successfully, on the whole.",
      commAchieve: "Uses conventions of the task to hold the target reader's attention and communicate straightforward ideas.",
      organisation: "Text is generally well-organised and coherent, using a variety of linking words and cohesive devices.",
      language: "Uses a range of everyday vocabulary appropriately, with occasional inappropriate use of less common lexis. Uses a range of simple and some complex grammatical forms with a good degree of control. Errors do not impede communication."
    },
    {
      band: 3,
      label: "Adequate",
      content: "All content elements attempted. Message requires some effort by the reader. OR One content element omitted but others clearly communicated.",
      commAchieve: "Uses conventions of the communicative task in generally appropriate ways to communicate straightforward ideas.",
      organisation: "Text is connected and coherent, using basic linking words and a limited number of cohesive devices.",
      language: "Uses everyday vocabulary generally appropriately, while occasionally overusing certain lexis. Uses simple grammatical forms with a good degree of control. While errors are noticeable, meaning can still be determined."
    },
    {
      band: 2,
      label: "Inadequate",
      content: "Two content elements omitted, or unsuccessfully dealt with. Message only partly communicated to reader.",
      commAchieve: "Produces text that communicates simple ideas in simple ways.",
      organisation: "Text is connected using basic, high-frequency linking words.",
      language: "Uses basic vocabulary reasonably appropriately. Uses simple grammatical forms with some degree of control. Errors may impede meaning at times."
    },
    {
      band: 1,
      label: "Poor",
      content: "Little relevant content and/or message requires excessive effort by the reader, or short (10-19 words).",
      commAchieve: "Produces isolated short units about simple and concrete matters, not always communicating successfully.",
      organisation: "Production unlikely to be connected, though punctuation and simple connectors may on occasion be used.",
      language: "Produces basic vocabulary of isolated words and phrases. Produces few simple grammatical forms with only limited control."
    },
    {
      band: 0,
      label: "No achievement",
      content: "Totally irrelevant or totally incomprehensible or too short (under 10 words).",
      commAchieve: "Achieves nothing.",
      organisation: "Achieves nothing.",
      language: "Achieves nothing."
    }
  ],
  // B1 级别额外提示
  b1Focus: "B1 级别要求：能就日常话题写出连贯的短文，使用基本的连接词和有限的衔接手段，词汇以日常用语为主，语法以简单句型为主但有一定的控制力，错误虽有但不影响理解。",
  grammarTips: [
    "注意时态一致性：记叙文常用过去时，议论文/邮件常用现在时。",
    "主谓一致：第三人称单数要加 -s/-es，如 he likes, she goes。",
    "冠词使用：可数名词单数前要加 a/an/the，不可数名词不加 a/an。",
    "介词搭配：depend on (不是 depend of), listen to, interested in, good at。",
    "标点符号：英语句子以句号(.)结尾，不用中文句号(。)；逗号(,)不用中文逗号(，)。",
    "邮件格式：开头用 Hi/Dear + 名字，结尾用 Best wishes/See you soon/Love + 名字。",
    "故事开头：必须使用题目给的第一句话，时态通常用过去时。",
    "议论文结构：引言→正文（2-3个要点）→结论，每段一个主要观点。",
    "连接词：使用 however, although, because, so, also, for example 等连接句子。",
    "字数控制：目标 100 词左右（80-120 词），过短会扣分，过长不扣分但可能偏题。"
  ]
};

// ============================================================
// Part 1: Email 真题题库（2020-2025 真题汇总）
// 每条包含: from(发件人), subject(主题), body(邮件正文), notes(写作要点4条)
// ============================================================

var PET_EMAIL_PROMPTS = [
  {
    id: "email_01",
    source: "2020 Cambridge Official Sample",
    from: "Sandy",
    subject: "Your visit!",
    body: "Hi, I'm so excited that you're coming to stay with me for a week!\n\nOn your first evening here, there's a rock concert in our town. Would you like to go to the concert or would you prefer us to relax at home?\n\nAlso, shall we go climbing in the mountains while you're here?\n\nLet me know if you have any questions.\n\nSee you soon\nSandy",
    notes: ["Me too!", "Say which I prefer", "No, because ...", "Ask Sandy ..."]
  },
  {
    id: "email_02",
    source: "2020 Cambridge Official Sample (Schools)",
    from: "Mrs Lake",
    subject: "End of year party",
    body: "Dear Class,\n\nI'd like our class to have a party to celebrate the end of the school year.\n\nWe could either have a party in the classroom or we could go to the park. Which would you prefer to do?\n\nWhat sort of activities or games should we do during the party?\n\nWhat food do you think we should have at the party?\n\nReply soon!\nAnna Lake",
    notes: ["Great!", "Explain", "Suggest ...", "Tell Mrs Lake"]
  },
  {
    id: "email_03",
    source: "2024.1.7 Shenzhen",
    from: "Miss May",
    subject: "Movie Club",
    body: "Hey everyone.\n\nExciting news - we're starting a Movie Club! What types of movies do you think would be great for us? Animated adventures, funny comedies, or heartwarming stories?\n\nI'm planning our first session right after class next Tuesday. Cool? Let me know your thoughts!\n\nCheers,\nMiss May",
    notes: ["Excited about the club", "Suggest movie types", "Tuesday not available, because ...", "Suggest another day"]
  },
  {
    id: "email_04",
    source: "2024.1.14 Beijing",
    from: "Mrs May",
    subject: "Movie outing",
    body: "Dear Students,\n\nExciting news! Next Wednesday, we're going to the movies, and I need your help to choose which movie to watch.\n\nPlease reply to this message with your choice by the end of the week so we can finalize our plans. I can't wait to enjoy a movie outing with all of you!\n\nBest regards,\nMrs. May",
    notes: ["Thrilled about the outing", "Suggest a movie type and why", "Reply by end of week - confirm", "Any questions?"]
  },
  {
    id: "email_05",
    source: "2024.1.27 Beijing",
    from: "Ben",
    subject: "Jenny's farewell gift",
    body: "Hi Tom,\n\nJenny is going to study in the UK next semester! We want to give her a cool gift as a memory. Do you have any idea?\n\nAlso, we're planning a farewell party. Movie night or picnic? Let's chat about it after school. Your ideas matter a lot!\n\nCheers,\nBen",
    notes: ["Suggest a gift", "Choose movie or picnic, and why", "Not free after school, explain", "Suggest another time"]
  },
  {
    id: "email_06",
    source: "2024.3.24 Beijing",
    from: "Miss May",
    subject: "Campus poetry contest",
    body: "Dear students,\n\nWe are planning to organize a campus poetry contest and would like your input on the theme: 'Travel' or 'Friendship'. We'd appreciate your thoughts on which theme you find more inspiring for this event.\n\nAdditionally, we are in the process of selecting a judge for the contest. If any of you have a recommendation or would like to volunteer, please let us know.\n\nFurthermore, we invite all of you to join us on Tuesday to help design promotional posters for the event.\n\nMiss May",
    notes: ["Brilliant idea!", "Choose a theme and explain why", "Suggest who could be judge", "Sorry, can't help on Tuesday, because ..."]
  },
  {
    id: "email_07",
    source: "2025.1.18 Beijing",
    from: "Tom",
    subject: "Sports Center",
    body: "Hi ...\n\nI can't wait to go to the sports center with you this Saturday.\n\nShould we try rock climbing or play tennis outdoors? What do you think?\n\nDo you need my mum to pick you up on Saturday? Do you want to stay overnight at my place after that?",
    notes: ["Excited to go", "Choose rock climbing or tennis, and why", "Answer about pick-up", "Answer about staying overnight"]
  },
  {
    id: "email_08",
    source: "2023.12.2 Chengdu",
    from: "Jack",
    subject: "Dad going to China",
    body: "Dear Jack,\n\nI hope you're doing well. My dad is going to live in China for a year because of his work. I wanted to ask you for some advice. What should he be careful about when he's in China? And how can he learn to speak Chinese? Are you available to help? Your tips and ideas would be really helpful for my family during this change.\n\nThank you!",
    notes: ["Happy to hear the news", "Advice about living in China", "How to learn Chinese", "Tuesday not available, suggest another time"]
  },
  {
    id: "email_09",
    source: "2023.11.18 Guangzhou",
    from: "Chen",
    subject: "Farewell party for Jack",
    body: "Hi Amy,\n\nJack is about to go abroad, and we're planning a farewell for him. Do you remember? I'm thinking of hosting it at my place. What do you think? What kind of food should we prepare? And what gift should we give Jack? Handmade or bought?\n\nBest,\nChen",
    notes: ["Yes, I remember!", "About hosting at Chen's place (no, but ...)", "Suggest food", "Choose handmade or bought, and why"]
  },
  {
    id: "email_10",
    source: "34 High-Score Essays #06 (Trainer Test 1)",
    from: "Jude",
    subject: "Beach BBQ",
    body: "Hi,\n\nCan't wait for the beach BBQ this weekend! My parents said they can give you a lift to our house.\n\nWe're having a barbecue - do you prefer meat or vegetarian food?\n\nWhat activities should we do at the beach? Any ideas?\n\nSee you Saturday!\nJude",
    notes: ["Great! About the lift ...", "Meat or vegetarian preference", "Suggest beach activities", "Any questions?"]
  },
  {
    id: "email_11",
    source: "34 High-Score Essays #10",
    from: "Teri",
    subject: "Learning a language",
    body: "Hi,\n\nIt's great that you're starting to learn our language next month! I'd love to meet up and help you out.\n\nMy parents think I should buy you a dictionary and some videos. What do you think?\n\nAre you free next Thursday afternoon to meet up?\n\nLooking forward to seeing you!\nTeri",
    notes: ["Great to hear!", "About the dictionary and videos", "Happy to help after classes start", "Thursday not free, suggest another day"]
  },
  {
    id: "email_12",
    source: "34 High-Score Essays #14",
    from: "Alex",
    subject: "New video game",
    body: "Hi,\n\nHappy belated birthday! My parents gave me some money to buy a new video game. I already have a lot of racing games, so I want to try something different.\n\nWhat kind of game do you think I should get? How much time do you usually spend gaming?\n\nI'll have the game by this weekend. Can you come over and try it out?\n\nAlex",
    notes: ["Happy birthday! About trying a different game type", "Suggest a game type", "How much time I spend gaming", "This weekend not free, suggest next week"]
  },
  {
    id: "email_13",
    source: "34 High-Score Essays #17",
    from: "Ms Taylor",
    subject: "New cooking club",
    body: "Dear students,\n\nI'm starting a new cooking club at school where we'll learn English while cooking delicious food!\n\nDo you have any cooking experience? What types of recipes should we cook - food from English-speaking countries, or our favourite recipes from home?\n\nAre there any foods you can't eat?\n\nMs Taylor",
    notes: ["Fantastic idea!", "About your cooking experience", "Suggest recipe types", "About food restrictions"]
  },
  {
    id: "email_14",
    source: "34 High-Score Essays #20",
    from: "Mrs Hallam",
    subject: "School talent competition",
    body: "Dear students,\n\nI'm organising a school talent competition and would love your input.\n\nShould it be for all ages or just certain year groups? Who should be the judges - teachers, parents, or both? What prizes should we give the winners?\n\nPlease share your thoughts!\nMrs Hallam",
    notes: ["Great idea!", "About which ages should participate", "Suggest who should judge", "Suggest prizes"]
  },
  {
    id: "email_15",
    source: "34 High-Score Essays #23",
    from: "Mr Smith",
    subject: "End-of-term party",
    body: "Dear students,\n\nI'm organising an end-of-term party for our English class to celebrate our progress together.\n\nShould we have it in the classroom or at the park? What activities should we do to practise English during the party? What should everyone bring?\n\nLet me know your ideas!\nMr Smith",
    notes: ["Fantastic idea!", "Choose classroom or park, and why", "Suggest English practice activities", "What to bring"]
  },
  {
    id: "email_16",
    source: "34 High-Score Essays #26",
    from: "Alex",
    subject: "Party next weekend",
    body: "Hi,\n\nI'm so excited about your party next weekend! It's going to be amazing!\n\nCould you bring some food? Maybe a chocolate cake? Also, we're thinking of dressing up in costumes. What do you think?\n\nWhat games should we play? Let me know!\n\nLooking forward to seeing you!\nAlex",
    notes: ["Equally excited!", "About bringing food (cake or something else)", "About dressing up in costumes", "Suggest games"]
  },
  {
    id: "email_17",
    source: "34 High-Score Essays #29",
    from: "Jo",
    subject: "Geography presentation",
    body: "Hi,\n\nThank you very much. I'm equally excited about our joint geography presentation. I'm confident we'll make a great team!\n\nBetween rivers and deserts, which topic do you think would be more engaging? How could we make it interesting for the class?\n\nCan we meet on Tuesday to work on it?\n\nSee you soon,\nMike",
    notes: ["Excited too!", "Choose rivers or deserts, and why", "Suggest how to make it interesting", "Tuesday not free, suggest another day"]
  },
  {
    id: "email_18",
    source: "2024.3.23 Shanghai",
    from: "Mrs May",
    subject: "Class cinema trip",
    body: "Dear students,\n\nOur class is going to the cinema this Saturday! We can choose between a film about astronauts or a rock music documentary.\n\nWhich one do you think we should watch and why? Also, two days later we need to write a magazine article about the film. Is that OK?\n\nDo you have any questions about the trip?\n\nMrs May",
    notes: ["Thrilled about the cinema trip!", "Choose astronaut or rock film, and why", "About writing the article - OK or not", "Any questions?"]
  },
  {
    id: "email_19",
    source: "2024.3.23 Changsha",
    from: "Andy",
    subject: "Learning a new language",
    body: "Hi,\n\nI really want to learn a new language! Do you have any advice on how to get started? What's the best way to practice?\n\nAlso, I want to understand more about the culture and daily life of the country. What should I know?\n\nAny tips would be great!\nAndy",
    notes: ["Great decision!", "Suggest how to start learning", "Best way to practice", "About understanding culture and daily life"]
  },
  {
    id: "email_20",
    source: "2024.3.23 Beijing (cooking)",
    from: "Sarah",
    subject: "Learning to cook",
    body: "Hi,\n\nI've decided I want to learn to cook! Do you know any easy recipes for beginners? What ingredients should I buy first?\n\nMy mum said she'll teach me, but I'm a bit nervous. Any advice?\n\nMaybe we could cook together sometime?\n\nSarah",
    notes: ["Great idea!", "Suggest easy beginner recipes", "About ingredients to buy", "About cooking together - yes, suggest when"]
  }
];

// ============================================================
// Part 1 补充: 2023-2025 全国考点 Email 真题 (12 道)
// ============================================================

PET_EMAIL_PROMPTS.push({
  id: "email_21",
  source: "2024.6.22 Guangzhou",
  from: "Mr. Thompson",
  subject: "Help Choose a Guest for Our School Party",
  body: "Hi Alex,\n\nI'm excited about our upcoming school party! It's going to be a big event, and I'm thinking of inviting a celebrity guest.\n\nI can't decide whether an actor or a sports star would be better for our party. What do you think? Who would be more exciting for a high school celebration?\n\nDo you know any actors or sports stars who are popular right now among teenagers? Someone who could really make our event special.\n\nAlso, could you tell me why you would prefer your choice? We're looking for someone who can inspire us and make the party memorable.\n\nThanks for your help!\n\nBest,\nMr. Thompson",
  notes: ["Share your excitement!", "Give your thoughts on each option", "Suggest potential guests", "Explain — give reasons for your preference"]
});

PET_EMAIL_PROMPTS.push({
  id: "email_22",
  source: "2024.2.25 Guangzhou / National",
  from: "Miss May",
  subject: "Earth Club Special Event",
  body: "Dear students,\n\nGreat news! Our Earth Club is planning something special next month to celebrate our planet.\n\nWe could either invite a guest speaker to teach us about protecting the environment, or watch a movie about nature. Which one do you prefer? Why?\n\nAlso, we need more students to join our club. Do you have any ideas about how we can promote it around school?\n\nCan you help us prepare on Friday after school?\n\nLooking forward to your ideas!\nMiss May",
  notes: ["Brilliant idea!", "Choose guest speaker or movie, explain why", "Suggest a way to promote the club", "Sorry, can't help on Friday, suggest another day"]
});

PET_EMAIL_PROMPTS.push({
  id: "email_23",
  source: "2024.9.22 Guangzhou",
  from: "Miss May",
  subject: "Camping Trip",
  body: "Dear students,\n\nI'm very excited to announce that we are organising a camping trip next month!\n\nWe have two activity options — should we go boating on the lake or rock climbing? Which one do you think is better?\n\nAlso, for the evening, would you prefer to sleep outdoors in tents or stay inside the camping lodge?\n\nLet me know if you have any other questions about the trip. Please reply soon!\n\nBest wishes,\nMiss May",
  notes: ["Thrilled about the camping trip!", "Choose boating or rock climbing, and why", "Prefer camping outdoors or sleeping indoors, and why", "Ask about trip details (departure time, what to bring)"]
});

PET_EMAIL_PROMPTS.push({
  id: "email_24",
  source: "2024 Multiple Dates (Beijing/Nanjing/Shenzhen/Chengdu)",
  from: "Ben",
  subject: "My Mum's Birthday Party",
  body: "Hi June,\n\nI am super excited that it's my mum's birthday this Saturday! We're having a little party at my place in the evening, and I'd love for you to come.\n\nCan you help with some party stuff on Friday? Also, after the party, want to stay over? It'll be a blast!\n\nLet me know if you can make it and if you have any questions.\n\nCheers,\nBen",
  notes: ["Me too — equally excited about the party!", "No, can't help on Friday, because ...", "About staying over: yes/no and explain", "Ask a question (e.g. about a gift)"]
});

PET_EMAIL_PROMPTS.push({
  id: "email_25",
  source: "2025.1.19 Nanjing",
  from: "Lucy",
  subject: "Camping Club",
  body: "Hi,\n\nI'm excited to join the camping club next Saturday.\n\nWhat do I need to take with me when I go camping?\n\nDo I have to walk for a long way to get to the campsite?\n\nIs there anyone to pick me up?",
  notes: ["Glad you're joining!", "Tell Lucy what to bring for camping", "About the walk to the campsite", "About pick-up arrangements"]
});

PET_EMAIL_PROMPTS.push({
  id: "email_26",
  source: "2025.2.8 Guangzhou / 2025.2.22 Tianjin",
  from: "Tom",
  subject: "My Mum's 40th Birthday",
  body: "Hi ...,\n\nMy mum's 40th birthday is coming — I'd like to have a birthday party for her.\n\nCan you come earlier and help me decorate my house for the party?\n\nThe party might be a bit long and it will end at 11 pm.\n\nIf you have any other questions to ask, please let me know.\n\nBest wishes,\nTom",
  notes: ["Excited about the party!", "About coming earlier to help decorate — yes or no", "About the party ending at 11 pm — is that OK?", "Ask a question about the party"]
});

PET_EMAIL_PROMPTS.push({
  id: "email_27",
  source: "2025.2.9 Guangzhou",
  from: "Mr. David",
  subject: "Film Evening",
  body: "Hi all,\n\nI'm so excited to tell you that we are having a film evening this Friday in our classroom!\n\nDo you prefer to watch comedies or movies about history?\n\nIs it OK for you to bring some food and drinks to share with each other?\n\nAre you available to help clean the classroom after watching the movie?",
  notes: ["Excited about the film evening!", "Choose comedies or history movies, and why", "About bringing food and drinks — yes or no", "About helping clean up afterwards — yes or no"]
});

PET_EMAIL_PROMPTS.push({
  id: "email_28",
  source: "2025.2.15 Guangzhou",
  from: "Mr. David",
  subject: "A Photography Exhibition",
  body: "Hi ...,\n\nWe are going to have a photography exhibition in our school next week.\n\nThe topic of this exhibition will be either nature or famous people — which one do you prefer?\n\nWhich place will be suitable for this exhibition?\n\nWe need to do some preparations for this exhibition. Would you like to help?",
  notes: ["Great idea!", "Choose nature or famous people theme, and why", "Suggest a suitable place for the exhibition", "About helping with preparations — yes or no"]
});

PET_EMAIL_PROMPTS.push({
  id: "email_29",
  source: "2025.3.15 Beijing",
  from: "Lucy",
  subject: "Farewell Party for Rose",
  body: "Hi,\n\nRose is going to study in the UK next semester! We want to give her a cool gift as a memory. Do you have any idea?\n\nAlso, we're planning a farewell party. Movie night or picnic?\n\nLet's chat about it after school. Your ideas matter a lot!",
  notes: ["Great — Rose deserves a special farewell!", "Suggest a gift idea", "Choose movie night or picnic, and why", "About chatting after school — yes or no"]
});

PET_EMAIL_PROMPTS.push({
  id: "email_30",
  source: "2025.3.22 Beijing",
  from: "Lucy",
  subject: "A Poetry Competition",
  body: "Hi ...,\n\nWe are going to have a poetry competition in our school next month.\n\nThe topic of this poetry competition will be either travelling or friendship — which one do you prefer?\n\nWho do you think will be suitable to be the judges?\n\nAre you available to help with the posters next Saturday?",
  notes: ["Fantastic idea!", "Choose travelling or friendship theme, and why", "Suggest who should be judges", "About helping with posters — yes or no"]
});

PET_EMAIL_PROMPTS.push({
  id: "email_31",
  source: "2025.4.12 Jinan",
  from: "Mrs Li",
  subject: "School Trip",
  body: "Hi ...,\n\nGreat news! We are going to have a school trip next week with all the students in our class.\n\nWe are planning to go to the UK or Australia — which one do you want to visit?\n\nDo you think it is a good idea to live with a local family?\n\nWhat activities can we do during our school trip?",
  notes: ["Super excited about the school trip!", "Choose UK or Australia, and why", "About living with a local family — good idea or not", "Suggest activities for the trip"]
});

PET_EMAIL_PROMPTS.push({
  id: "email_32",
  source: "2023 National Exam",
  from: "Miss Jones",
  subject: "Special Guest for English Class",
  body: "Dear students,\n\nI have exciting news! I'm planning to invite a special guest to speak to our English class.\n\nI'm thinking about inviting either a motivational speaker or a professional athlete. Which one do you think would be better?\n\nWhat questions would you like to ask our guest?\n\nAlso, after the talk, what kind of activities should we organise?\n\nLet me know your thoughts!\nMiss Jones",
  notes: ["Great idea!", "Choose a speaker or an athlete, and why", "What questions you would ask", "Suggest activities after the talk"]
});

// ============================================================
// Part 2: Article 真题题库（议论文）
// 格式: "Articles wanted! [Topic + Questions]"
// ============================================================

var PET_ARTICLE_PROMPTS = [
  {
    id: "art_01",
    source: "2020 Cambridge Official Sample",
    title: "FILMS",
    body: "Articles wanted!\n\nFILMS\n\nWhat kind of films do you enjoy?\nDo you prefer watching them at the cinema or at home? Why?\n\nWrite an article answering these questions and we will put it on our website!",
    hints: "写你喜欢的电影类型，比较在电影院和在家看电影的体验，给出理由。"
  },
  {
    id: "art_02",
    source: "2020 Cambridge Official Sample (Schools)",
    title: "WHAT MAKES YOU LAUGH?",
    body: "Articles wanted!\n\nWHAT MAKES YOU LAUGH?\n\nWrite an article telling us what you find funny and who you enjoy laughing with.\nDo you think it's good to laugh a lot? Why?\n\nThe best articles answering these questions will be published next month.",
    hints: "写什么让你觉得有趣，喜欢和谁一起笑，笑对身体/心理的好处。"
  },
  {
    id: "art_03",
    source: "2023 National Exam",
    title: "YOUR FAVOURITE SUBJECT",
    body: "Articles wanted!\n\nWhat is your favourite subject at school?\nWhich subject is the most important? And why?",
    hints: "写你最喜欢的科目和原因，再分析哪个科目最重要。"
  },
  {
    id: "art_04",
    source: "2023 National Exam",
    title: "YOUR FAVOURITE DAY",
    body: "Articles wanted!\n\nWhat's your favourite day of the week?\nWhat will you do with your friends?",
    hints: "写你最喜欢一周中的哪一天，和朋友在那一天做什么。"
  },
  {
    id: "art_05",
    source: "2024.1.7 Shenzhen",
    title: "PUBLIC TRANSPORTATION",
    body: "Articles wanted!\n\nThe advantages and disadvantages of public transportation?",
    hints: "分析公共交通的优缺点：便宜/环保 vs 准点/拥挤。"
  },
  {
    id: "art_06",
    source: "2024.1.14 Beijing",
    title: "COMPETITIONS",
    body: "Articles wanted!\n\nHave you ever experienced a competition?\nDo you prefer participating in competitions or watching others compete?",
    hints: "写你参加比赛的经历，比较参与和观看的体验。"
  },
  {
    id: "art_07",
    source: "2025.1.11 Beijing",
    title: "FAVOURITE PLACE",
    body: "Articles wanted!\n\nWhat place do you like best near your home? Why?\nWhat do you do at that place?",
    hints: "写你家附近最喜欢的地方，为什么喜欢，在那里做什么。"
  },
  {
    id: "art_08",
    source: "2025.1.18 Beijing",
    title: "SOCIAL MEDIA",
    body: "Articles wanted!\n\nDo you like using social media? Why?\nWhat social media do young people use in your country?",
    hints: "写你是否喜欢社交媒体及原因，介绍你们国家年轻人常用的社交媒体。"
  },
  {
    id: "art_09",
    source: "34 High-Score Essays #02",
    title: "BOARD GAMES vs VIDEO GAMES",
    body: "Articles wanted!\n\nSome young people prefer board games while others prefer video games.\nWhich do you find more interesting and why?\nWhat can playing games teach us?",
    hints: "比较桌面游戏和电子游戏，写各自的优点和教育意义。"
  },
  {
    id: "art_10",
    source: "34 High-Score Essays #05",
    title: "FRIENDSHIP",
    body: "Articles wanted!\n\nIs it important for close friends to have similar characters?\nIs it better to have one best friend or a lot of friends?",
    hints: "讨论好朋友是否需要相似性格，比较一个好朋友和很多朋友。"
  },
  {
    id: "art_11",
    source: "34 High-Score Essays #11",
    title: "YOUNG PEOPLE AND HEALTHY LIVING",
    body: "Articles wanted!\n\nYoung people and Healthy Living\n\nWhy should young people keep fit and do sports?\nWhat are the benefits of physical activity?\nHow can staying healthy be enjoyable?",
    hints: "写年轻人为什么要保持健康和做运动，运动的好处，如何让健康生活变得有趣。"
  },
  {
    id: "art_12",
    source: "34 High-Score Essays #15",
    title: "SHOPPING",
    body: "Articles wanted!\n\nHow does your family shop?\nDo you prefer online shopping or in-person shopping? Why?",
    hints: "写你家的购物习惯，比较线上和线下购物的优缺点。"
  },
  {
    id: "art_13",
    source: "34 High-Score Essays #21",
    title: "SPORTS AND EXERCISE",
    body: "Articles wanted!\n\nSports and Exercise for Young People\n\nWhat sports activities are available in your area?\nWhy is it important for young people to engage in sports and exercise?",
    hints: "写你所在地区的体育活动设施，为什么年轻人要参与运动。"
  },
  {
    id: "art_14",
    source: "34 High-Score Essays #24",
    title: "FRIENDS FROM DIFFERENT SCHOOLS",
    body: "Articles wanted!\n\nThe Joy of Having Friends from Different Schools\n\nWhat are the advantages of having friends who go to different schools?\nAre there any challenges? How do you keep in touch?",
    hints: "写有不同学校朋友的优点，面临的挑战，如何保持联系。"
  },
  {
    id: "art_15",
    source: "34 High-Score Essays #30",
    title: "MOBILE GAMING",
    body: "Articles wanted!\n\nThe Craze for Mobile Gaming in Your Country\n\nWhy is mobile gaming so popular among young people?\nWhat makes it enjoyable?",
    hints: "写手机游戏为什么在年轻人中流行，什么让它有趣。"
  },
  {
    id: "art_16",
    source: "34 High-Score Essays #18",
    title: "MUSIC",
    body: "Articles wanted!\n\nWhat kind of music do you like? Why is music important to you?\nHow do you find new songs or artists?",
    hints: "写你喜欢的音乐类型，音乐对你的重要性，如何发现新歌/新歌手。"
  },
  {
    id: "art_17",
    source: "esl-lounge Practice Test 1",
    title: "FAVOURITE SEASON",
    body: "Articles wanted!\n\nWhat is your favourite season of the year?\nWhat do you like to do during that season? Why do you prefer it to other seasons?",
    hints: "写你最喜欢的季节，那个季节的活动，为什么比其他季节好。"
  },
  {
    id: "art_18",
    source: "esl-lounge Practice Test 5",
    title: "SHOPPING HABITS",
    body: "Articles wanted!\n\nWhat are your shopping habits?\nDo you enjoy shopping? What do you usually buy?",
    hints: "写你的购物习惯，是否喜欢购物，通常买什么。"
  },
  {
    id: "art_19",
    source: "esl-lounge Practice Test 8",
    title: "FREE TIME ACTIVITIES",
    body: "Articles wanted!\n\nWhat do you like to do in your free time?\nDo you prefer indoor or outdoor activities? Why?",
    hints: "写你空闲时间喜欢做什么，比较室内和室外活动。"
  },
  {
    id: "art_20",
    source: "2024.3.23 Shanghai",
    title: "FAVOURITE PLACE WITH FRIENDS",
    body: "Articles wanted!\n\nWhat is the most interesting place you have ever been to?\nWhat did you see and do there?\nWhy would you recommend it to a friend?",
    hints: "写你去过的最有趣的地方，在那里看到和做了什么，为什么推荐给朋友。"
  },
  {
    id: "art_21",
    source: "2024.3.23 Changsha",
    title: "COOKING",
    body: "Articles wanted!\n\nCan you cook? Do you enjoy cooking? Why?\nWho is the best cook in your family?\nWhat is the right age to start learning to cook?",
    hints: "写你是否会做饭/喜欢做饭，家人中谁做饭最好，几岁开始学做饭合适。"
  },
  {
    id: "art_22",
    source: "34 High-Score Essays #27",
    title: "A PLACE YOU ENJOY",
    body: "Articles wanted!\n\nWrite about a place in your city that you really enjoy.\nWhy do you like it? What do you do there? Is it popular with others?",
    hints: "写你所在城市一个你喜欢的地方，为什么喜欢，做什么，是否受欢迎。"
  }
];

// ============================================================
// Part 2 补充: 2023-2024 全国考点 Article 真题 (16 道)
// ============================================================

PET_ARTICLE_PROMPTS.push({
  id: "art_23",
  source: "2023 National Exam",
  title: "VIDEO GAMES",
  body: "Articles wanted!\n\nVIDEO GAMES\n\nWrite an article telling us whether you think playing video games is good for young people.\nWhich kind of games do you think are interesting to play? Why or why not?\n\nThe best articles answering these questions will be published next month.",
  hints: "写你对电子游戏的看法：对年轻人是否有益？什么类型的游戏有趣？注意平衡正反两面。"
});

PET_ARTICLE_PROMPTS.push({
  id: "art_24",
  source: "2023/2024 National Exam",
  title: "FACE-TO-FACE vs ONLINE",
  body: "Articles wanted!\n\nWhich is a better way to communicate with your friends — face to face or online? Why?\n\nWrite an article comparing these two ways of communication and tell us which one you prefer.",
  hints: "比较面对面交流和线上交流，分析各自的优缺点，给出你的偏好和理由。"
});

PET_ARTICLE_PROMPTS.push({
  id: "art_25",
  source: "2023 National Exam",
  title: "A FAMOUS PERSON",
  body: "Articles wanted!\n\nIs there a famous person you know about?\nWhy is he or she famous?\nWhat do you like or dislike about this person?",
  hints: "介绍一位名人，说明他/她为什么出名，你喜欢或不喜欢这个人的哪些方面。"
});

PET_ARTICLE_PROMPTS.push({
  id: "art_26",
  source: "2023 National Exam",
  title: "THE MOST DIFFICULT THING TO DO",
  body: "Articles wanted!\n\nWhat is the most difficult thing for you to do?\nWhy do you think it is difficult?\nWhy do people want to learn it?",
  hints: "写一件你觉得最难做的事情，分析为什么困难，人们为什么还要学它。"
});

PET_ARTICLE_PROMPTS.push({
  id: "art_27",
  source: "2023 National Exam",
  title: "HOUSEWORK",
  body: "Articles wanted!\n\nDo young people need to help with the housework at home? Why?\nDo parents need to give money to the kids who help do the housework?",
  hints: "讨论年轻人是否应该做家务，家长是否应该给做家务的孩子零花钱。两个问题都要回答。"
});

PET_ARTICLE_PROMPTS.push({
  id: "art_28",
  source: "2023/2024 National Exam",
  title: "IF YOU WERE FAMOUS",
  body: "Articles wanted!\n\nIf you were famous, what would be the best thing and the worst thing?\nIf you were a celebrity, how would you handle it?",
  hints: "设想你成名后的好处和坏处，你会如何处理名气带来的影响。用虚拟语气。"
});

PET_ARTICLE_PROMPTS.push({
  id: "art_29",
  source: "2024 National Exam (Jan-May)",
  title: "THE SPRING FESTIVAL",
  body: "Articles wanted!\n\nTHE SPRING FESTIVAL\n\nWrite an article telling us about the Spring Festival.\nWhen does the festival take place, and what do people do?\nWhat do you like about it?\n\nThe best articles answering these questions will be published next month.",
  hints: "介绍春节：什么时候庆祝，人们做什么，你为什么喜欢春节。可以写家庭团聚、美食、红包等。"
});

PET_ARTICLE_PROMPTS.push({
  id: "art_30",
  source: "2024 National Exam",
  title: "HOW YOU TRAVEL TO SCHOOL",
  body: "Articles wanted!\n\nHow do you travel to school?\nWhat are the advantages and disadvantages of this way?",
  hints: "写你上学的方式（走路/骑车/公交/家长接送），分析这种方式的优缺点。"
});

PET_ARTICLE_PROMPTS.push({
  id: "art_31",
  source: "2024 National Exam",
  title: "WHO YOU WANT TO VISIT MOST",
  body: "Articles wanted!\n\nWho do you want to visit most?\nWhy do you want to visit him/her?\nWhat would you like to talk with this person about?",
  hints: "写你最想拜访的人（名人/家人/朋友），为什么想见，想聊什么话题。"
});

PET_ARTICLE_PROMPTS.push({
  id: "art_32",
  source: "2024 National Exam",
  title: "MOBILE PHONES AT SCHOOL",
  body: "Articles wanted!\n\nShould students be allowed to bring mobile phones to school?\nWhat are the advantages and disadvantages of carrying a mobile phone?",
  hints: "讨论学生是否应该带手机上学，分析带手机的优缺点（如方便联系 vs 分散注意力）。"
});

PET_ARTICLE_PROMPTS.push({
  id: "art_33",
  source: "2024 National Exam",
  title: "WHICH COUNTRY TO VISIT",
  body: "Articles wanted!\n\nWhich country do you want to go to in the future? Why?\nWho do you want to go with?",
  hints: "写你未来想去哪个国家，为什么想去，想和谁一起去。可以结合文化、风景、美食等理由。"
});

PET_ARTICLE_PROMPTS.push({
  id: "art_34",
  source: "2024 National Exam",
  title: "A PERSON YOU ADMIRE",
  body: "Articles wanted!\n\nIs there a person you really admire?\nWhy is he or she so special?",
  hints: "介绍一位你真正敬佩的人（家人/老师/名人），解释为什么这个人很特别。"
});

PET_ARTICLE_PROMPTS.push({
  id: "art_35",
  source: "2024 National Exam",
  title: "YOUR FAVOURITE FESTIVAL",
  body: "Articles wanted!\n\nWhat is your favourite festival?\nWhy do you like it?\nWhat do you like to do on that day?",
  hints: "写你最喜欢的节日（春节/中秋/圣诞等），为什么喜欢，当天喜欢做什么。"
});

PET_ARTICLE_PROMPTS.push({
  id: "art_36",
  source: "2024 National Exam",
  title: "TALENT SHOWS",
  body: "Articles wanted!\n\nWould you like to take part in a talent show?\nDo you think talent shows are a good thing or not? Why?",
  hints: "讨论你是否愿意参加才艺比赛，分析才艺比赛是好是坏（培养自信 vs 压力太大）。"
});

PET_ARTICLE_PROMPTS.push({
  id: "art_37",
  source: "2024 National Exam",
  title: "YOUR FAVOURITE GIFT",
  body: "Articles wanted!\n\nWhat is your favourite gift you have ever received?\nDo you prefer people giving you money or picking out a gift for you?",
  hints: "写你收到过的最喜欢的礼物，比较直接给钱和精心挑选礼物的区别。"
});

PET_ARTICLE_PROMPTS.push({
  id: "art_38",
  source: "2024 National Exam",
  title: "CONNECTING WITH NATURE",
  body: "Articles wanted!\n\nHow did you connect with nature when you were young?\nDo you think children should be exposed to nature?",
  hints: "写你小时候如何接触大自然，讨论孩子是否应该多接触自然环境及其好处。"
});

// ============================================================
// Part 2: Story 真题题库（记叙文）
// 每条包含: openingSentence(必须使用的开头句)
// ============================================================

var PET_STORY_PROMPTS = [
  {
    id: "story_01",
    source: "2020 Cambridge Official Sample",
    openingSentence: "As the plane flew lower, Lou saw the golden beaches of the island below.",
    hints: "飞机降落，看到金色沙滩，可以写岛屿冒险或旅行经历。过去时为主。"
  },
  {
    id: "story_02",
    source: "2020 Cambridge Official Sample (Schools)",
    openingSentence: "Jo looked at the map and decided to go left.",
    hints: "看地图选择左转，可以写冒险/迷路/发现新地方的故事。过去时为主。"
  },
  {
    id: "story_03",
    source: "34 High-Score Essays #01",
    openingSentence: "The friends found a strange old map under the bed.",
    hints: "在床下发现旧地图，可以写寻宝/冒险的故事。过去时为主。"
  },
  {
    id: "story_04",
    source: "34 High-Score Essays #04",
    openingSentence: "Morgan couldn't wait any longer to see what was inside the ancient box.",
    hints: "迫不及待想打开古盒子，可以写发现/惊喜/冒险的故事。过去时为主。"
  },
  {
    id: "story_05",
    source: "34 High-Score Essays #09",
    openingSentence: "It was my turn to go on stage to perform in the talent competition.",
    hints: "轮到你上台表演，可以写紧张/自信/成功或失败的演出经历。过去时为主。"
  },
  {
    id: "story_06",
    source: "34 High-Score Essays #13",
    openingSentence: "As my friend and I arrived at school yesterday morning, we saw something incredible!",
    hints: "到学校看到令人难以置信的事，可以写意外事件/惊喜/魔法的故事。过去时为主。"
  },
  {
    id: "story_07",
    source: "34 High-Score Essays #16",
    openingSentence: "Jasmin was at an exhibition when she noticed something unusual.",
    hints: "在展览上注意到不寻常的东西，可以写发现/探索/艺术的故事。过去时为主。"
  },
  {
    id: "story_08",
    source: "34 High-Score Essays #19",
    openingSentence: "My family and I discovered a cave in the forest and we all decided to go in.",
    hints: "发现山洞并走进去，可以写探险/发现/惊喜的故事。过去时为主。"
  },
  {
    id: "story_09",
    source: "34 High-Score Essays #22",
    openingSentence: "Lois smiled as she put the tickets in her pocket and walked out of her house.",
    hints: "微笑着放好票出门，可以写期待的活动/游乐园/学校集会的故事。过去时为主。"
  },
  {
    id: "story_10",
    source: "34 High-Score Essays #25",
    openingSentence: "Ben and his father got off the plane and left the airport.",
    hints: "下飞机离开机场，可以写度假/旅行冒险的故事。过去时为主。"
  },
  {
    id: "story_11",
    source: "34 High-Score Essays #28",
    openingSentence: "Everybody clapped when I walked onto the stage.",
    hints: "走上舞台时大家鼓掌，可以写表演/获奖/紧张与克服的故事。过去时为主。"
  },
  {
    id: "story_12",
    source: "34 High-Score Essays #31",
    openingSentence: "It was Jack's birthday and he was feeling very happy.",
    hints: "Jack 的生日，非常开心，可以写生日派对/惊喜礼物的故事。过去时为主。"
  },
  {
    id: "story_13",
    source: "34 High-Score Essays #32",
    openingSentence: "I walked into the room and everyone stopped talking.",
    hints: "走进房间大家都停止说话，可以写惊喜/尴尬/意外的故事。过去时为主。"
  },
  {
    id: "story_14",
    source: "34 High-Score Essays #33",
    openingSentence: "Last week I went to the zoo.",
    hints: "上周去了动物园，可以写动物/意外事件/有趣经历的故事。过去时为主。"
  },
  {
    id: "story_15",
    source: "34 High-Score Essays #34",
    openingSentence: "Sam was both anxious and excited when leaving the house.",
    hints: "Sam 离家时既紧张又兴奋，可以写比赛/冒险/意外受伤的故事。过去时为主。"
  },
  {
    id: "story_16",
    source: "Cambridge PET Trainer",
    openingSentence: "The old house at the end of the street had been empty for years.",
    hints: "街尽头的旧房子空了很多年，可以写探险/发现秘密的故事。过去时为主。"
  },
  {
    id: "story_17",
    source: "Cambridge PET Practice",
    openingSentence: "When I opened the box, I couldn't believe my eyes.",
    hints: "打开盒子不敢相信自己的眼睛，可以写惊喜/发现的故事。过去时为主。"
  },
  {
    id: "story_18",
    source: "esl-lounge Practice",
    openingSentence: "It was the most exciting day of my life.",
    hints: "最激动人心的一天，可以写比赛/旅行/特别事件的故事。过去时为主。"
  }
];

// ============================================================
// PET 写作高频句型（邮件 + 文章通用）
// ============================================================

var PET_SENTENCE_PATTERNS = {
  email: [
    { en: "It's great to hear that ...", zh: "听说……，这太好了。", usage: "邮件开头回复好消息" },
    { en: "I'm sorry to hear that ...", zh: "听说……，我很难过/遗憾。", usage: "邮件开头回复坏消息" },
    { en: "Thank you for your email.", zh: "谢谢你的邮件。", usage: "邮件开头礼貌回复" },
    { en: "I would rather ...", zh: "我宁愿……", usage: "表达偏好/选择" },
    { en: "You had better (not) ...", zh: "你最好（不）……", usage: "提出建议" },
    { en: "I suggest (that) we ...", zh: "我建议我们……", usage: "提出建议" },
    { en: "Why don't we / you ...?", zh: "我们/你为什么不……？", usage: "提出建议" },
    { en: "How / What about ...?", zh: "……怎么样？", usage: "提出建议" },
    { en: "I could ... if you like.", zh: "如果你愿意的话，我可以……", usage: "提供帮助" },
    { en: "Is it OK if I ...?", zh: "我可以……吗？", usage: "征求许可" },
    { en: "Would you mind ...?", zh: "你介意……吗？", usage: "提出请求（接动名词）" },
    { en: "Would you like to ...?", zh: "你想……吗？", usage: "询问对方想法" },
    { en: "I'm afraid I can't ... because ...", zh: "恐怕我不能……因为……", usage: "委婉拒绝并解释" },
    { en: "I'm looking forward to ...", zh: "我期待……", usage: "邮件结尾表达期待（接动名词）" },
    { en: "Please let me know if ...", zh: "如果……请告诉我", usage: "邮件结尾礼貌用语" }
  ],
  article: [
    { en: "In my opinion, ...", zh: "在我看来，……", usage: "表达观点" },
    { en: "I strongly believe that ...", zh: "我坚信……", usage: "强调观点" },
    { en: "Firstly, ... Secondly, ... Finally, ...", zh: "首先……其次……最后……", usage: "列举要点" },
    { en: "On the one hand, ... On the other hand, ...", zh: "一方面……另一方面……", usage: "对比分析" },
    { en: "However, ...", zh: "然而，……", usage: "转折" },
    { en: "For example, ...", zh: "例如，……", usage: "举例说明" },
    { en: "In conclusion, ...", zh: "总之，……", usage: "结尾总结" },
    { en: "It is clear that ...", zh: "很明显……", usage: "得出结论" },
    { en: "There are several reasons why ...", zh: "有几个原因说明为什么……", usage: "分析原因" },
    { en: "Not only ... but also ...", zh: "不仅……而且……", usage: "递进补充" }
  ],
  story: [
    { en: "Suddenly, ...", zh: "突然，……", usage: "故事转折" },
    { en: "To my surprise, ...", zh: "令我惊讶的是，……", usage: "表达惊讶" },
    { en: "As soon as ...", zh: "一……就……", usage: "时间衔接" },
    { en: "After a while, ...", zh: "过了一会儿，……", usage: "时间推移" },
    { en: "In the end, ...", zh: "最后，……", usage: "故事结尾" },
    { en: "I couldn't believe my eyes when ...", zh: "当……时我不敢相信自己的眼睛", usage: "表达震惊" },
    { en: "My heart was pounding as ...", zh: "当……时我的心砰砰直跳", usage: "表达紧张" },
    { en: "It was a day I will never forget.", zh: "这是我永远不会忘记的一天。", usage: "故事结尾" }
  ]
};

// ============================================================
// PET 高分范文（精选，供参考）
// ============================================================

var PET_SAMPLE_ANSWERS = {
  email: {
    prompt: "Reply to Sandy about your visit (concert vs relax, climbing, questions)",
    text: "Hi Sandy,\n\nThanks a lot for writing back. I'm also really excited about visiting you!\n\nOn my first evening, I'd like to relax at home. I will probably be very tired from the trip, so I need to rest and get ready for the other days. Is that okay?\n\nAs for climbing, I'm afraid I can't. I forgot to tell you, but I hurt my knee last week, so I can't do sport now. How about visiting some art galleries in your town? If you want, we could go. You know I love art!\n\nWhat do you think?\n\nBest wishes",
    score: "5/5",
    comments: "All content points covered. Appropriate informal register. Well organised with clear paragraphs. Good range of everyday vocabulary with minor errors only."
  },
  article: {
    prompt: "What makes you laugh? Do you think it's good to laugh a lot?",
    text: "What Makes Me Laugh\n\nLaughter is the best medicine and it's important to find humor in life. For me, there are a few things that always make me laugh.\n\nOne of my favorite sources of humor is stand-up comedy. I love watching comedians bring laughter into my life. Their jokes about everyday life always leave me in stitches. Another thing that makes me laugh is spending time with my friends. Whether we're telling jokes or just goofing around, we always seem to find a way to make each other laugh.\n\nDo I think it's good to laugh a lot? Absolutely! Laughter has so many benefits, both physically and mentally. It helps relieve stress, improve mood, and can even boost the immune system.\n\nIn conclusion, laughter is an important part of life and finding what makes you laugh is crucial.",
    score: "5/5",
    comments: "All content points addressed. Engaging style appropriate for a magazine article. Clear paragraph structure with linking words. Good range of vocabulary and grammar."
  },
  story: {
    prompt: "Jo looked at the map and decided to go left.",
    text: "Jo looked at the map and decided to go left. She had always been fascinated by adventure and the unknown. Her parents thought she was crazy for going on this solo journey, but Jo felt like she needed to get away from her everyday life and find something new.\n\nAs she walked down the winding road, she couldn't help but feel a sense of excitement bubbling inside her. The air was crisp and the trees swayed gently in the wind.\n\nSuddenly, she heard a rustling in the bushes ahead. Jo's heart began to race as she prepared herself for what may come. To her surprise, a small rabbit hopped out from the undergrowth and stopped to look at her.\n\nJo chuckled to herself, realizing how silly she must have looked. She continued down the road, feeling lighter and happier, with a newfound appreciation for the simple moments in life.",
    score: "5/5",
    comments: "Story follows naturally from the given sentence. Good narrative arc with beginning, middle and end. Confident use of past tenses. Well-organised with linking devices."
  }
};
