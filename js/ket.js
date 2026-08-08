// ============================================================
// KET / A2 Key Writing — 2020 新制
// Part 6: Email/Note (~25 words, compulsory) — 15 marks
// Part 7: Picture Story (~35 words, compulsory) — 15 marks
// 评分: Content 0-5 + Organisation 0-5 + Language 0-5 = 30 总
// ============================================================

var KET_SCORING = {
  maxPerScale: 5,
  totalMax: 30, // 15 per part, but we score one at a time
  partMax: 15,
  wordTarget: 25, // Part 6: ~25 words; Part 7: ~35 words
  timeMinutes: 30,
  bandDescriptors: [
    {
      band: 5,
      label: "A2 优秀",
      content: "All three content points are clearly communicated. The reader fully understands the message.",
      organisation: "The text is well-organised and connected using basic linking words (and, but, because). Logical sequence in picture story.",
      language: "Uses everyday vocabulary appropriately. Uses simple grammatical forms with good control. Minor errors do not affect meaning."
    },
    {
      band: 4,
      label: "A2 良好",
      content: "All three content points are communicated. The message is clear, though one point may be slightly unclear.",
      organisation: "The text is generally well-organised. Uses some basic linking words. Picture story has a clear sequence.",
      language: "Uses basic vocabulary correctly. Uses simple sentence structures with reasonable control. Some errors but meaning is clear."
    },
    {
      band: 3,
      label: "A2 合格",
      content: "Two content points are clearly communicated; one may be missing or unclear. The message can be understood with some effort.",
      organisation: "The text has some logical order. Limited use of linking words. Picture story may miss one picture or have a weak sequence.",
      language: "Uses simple vocabulary, sometimes with errors. Basic sentence structures present. Errors are noticeable but meaning can still be understood."
    },
    {
      band: 2,
      label: "Below A2",
      content: "Only one content point is communicated. Message is difficult to understand. OR text is too short (under 15 words).",
      organisation: "The text has little logical structure. Very few or no linking words. Picture story is disjointed.",
      language: "Vocabulary is very limited. Frequent errors in simple structures. Meaning is often unclear."
    },
    {
      band: 1,
      label: "Low",
      content: "Very little relevant content. Message is almost impossible to understand. OR extremely short (under 10 words).",
      organisation: "No clear organisation. Sentences are isolated with no connection.",
      language: "Only isolated words and phrases. Very little control of simple grammatical forms."
    },
    {
      band: 0,
      label: "No achievement",
      content: "Totally irrelevant, incomprehensible, or too short (a few words only).",
      organisation: "No organisation at all.",
      language: "No meaningful language produced."
    }
  ],
  // A2 级别提示
  a2Focus: "A2 (KET) 级别要求：能用简单句子写出简短信息，描述基本事件和活动。重点评估三点：是否覆盖所有内容要点 (Content)、是否有逻辑顺序 (Organisation)、是否使用基础词汇和语法 (Language)。不需要复杂句式，但需要基本的主谓一致和时态正确。",
  grammarTips: [
    "主谓一致：He likes (不是 He like)，They are (不是 They is)。",
    "时态使用：Part 7 图片故事通常用过去时，描述已经发生的事。Part 6 邮件通常用现在时。",
    "冠词：第一次提到的单数可数名词前加 a/an，如 a book, an apple。",
    "介词搭配：go to school, at home, in the morning, on Monday。",
    "标点符号：句号(. )结尾不用中文句号(。)，I 永远大写。",
    "基本连接词：and (并列), but (转折), because (原因), then/after that (顺序)。",
    "邮件格式：开头 Dear/Hi + 名字，结尾 From/Love/See you + 名字。25-35 词即可。",
    "图片故事：必须提及所有三幅图，按顺序叙述，用过去时。开头可用 First/Then/Finally。",
    "拼写检查：常见词如 because, friend, beautiful, interesting 要拼对。",
    "不要写离题内容：只回复邮件中的三个问题，不要加无关信息。"
  ]
};

// ============================================================
// Part 6: Email 真题题库（KET A2 级别）
// 每条包含: from(发件人), subject(主题), body(邮件正文), notes(写作要点3条)
// KET email 要求 ~25 词，3 个写作要点
// ============================================================

var KET_EMAIL_PROMPTS = [
  {
    id: "ket_email_01",
    source: "Cambridge A2 Key Official Sample",
    from: "Alex",
    subject: "Weekend plans",
    body: "Hi!\n\nI'm going to the park on Saturday. Would you like to come with me?\n\nWhat time can you come? What should we bring?\n\nSee you soon,\nAlex",
    notes: ["Say yes", "Tell Alex what time you can come", "Suggest what to bring"]
  },
  {
    id: "ket_email_02",
    source: "Cambridge A2 Key Official Sample (Schools)",
    from: "Mrs Jones",
    subject: "School trip",
    body: "Dear class,\n\nWe are going on a school trip next Friday to the zoo.\n\nPlease tell me: Do you want to come? What animal do you want to see most?\n\nThank you,\nMrs Jones",
    notes: ["Say you want to come", "Say which animal you want to see", "Ask one question about the trip"]
  },
  {
    id: "ket_email_03",
    source: "KET Trainer Test 1",
    from: "Sam",
    subject: "My birthday party",
    body: "Hi!\n\nIt's my birthday next Saturday! I'm having a party at my house. Can you come?\n\nWhat food do you like? Do you want to play games or watch a film?\n\nSam",
    notes: ["Say happy birthday", "Tell Sam what food you like", "Say games or film and why"]
  },
  {
    id: "ket_email_04",
    source: "KET Trainer Test 2",
    from: "Anna",
    subject: "New pet",
    body: "Hi!\n\nI got a new pet! It's a small dog. Do you have a pet?\n\nDo you want to come to my house after school to see him?\n\nAnna",
    notes: ["Say you like dogs", "Tell Anna about your pet or say you don't have one", "Say if you can come after school"]
  },
  {
    id: "ket_email_05",
    source: "KET Trainer Test 3",
    from: "Tom",
    subject: "Football match",
    body: "Hi!\n\nThere's a football match at our school on Sunday. Do you like football?\n\nDo you want to come and watch? It starts at 2 o'clock.\n\nTom",
    notes: ["Say if you like football", "Say if you can come", "Ask Tom a question about the match"]
  },
  {
    id: "ket_email_06",
    source: "KET Trainer Test 4",
    from: "Lucy",
    subject: "Holiday",
    body: "Hi!\n\nI'm going to the beach for my holiday next month! Where do you usually go for holidays?\n\nWhat do you like to do on holiday?\n\nLucy",
    notes: ["Tell Lucy where you go for holidays", "Tell her what you like to do", "Ask Lucy a question about her holiday"]
  },
  {
    id: "ket_email_07",
    source: "KET Trainer Test 5",
    from: "Mr Brown",
    subject: "After-school club",
    body: "Dear student,\n\nWe want to start a new after-school club. What club would you like?\n\nWe can have a music club, art club, or sports club. Which one do you prefer?\n\nMr Brown",
    notes: ["Say which club you prefer", "Explain why you like this club", "Suggest a day for the club"]
  },
  {
    id: "ket_email_08",
    source: "A2 Key for Schools Trainer",
    from: "Emma",
    subject: "Film night",
    body: "Hi!\n\nLet's watch a film at my house on Friday! What kind of films do you like?\n\nDo you want to watch an action film or a funny film?\n\nEmma",
    notes: ["Say what kind of films you like", "Choose action or funny and say why", "Say if Friday is OK for you"]
  },
  {
    id: "ket_email_09",
    source: "KET Practice Test 2023",
    from: "Jack",
    subject: "My new school",
    body: "Hi!\n\nI started at a new school this month. It's very big!\n\nWhat's your school like? What's your favourite subject?\n\nJack",
    notes: ["Tell Jack about your school", "Tell him your favourite subject", "Ask Jack a question about his new school"]
  },
  {
    id: "ket_email_10",
    source: "KET Practice Test 2023",
    from: "Sophie",
    subject: "Weekend activities",
    body: "Hi!\n\nWhat do you usually do at the weekend? I like riding my bike.\n\nWould you like to do something together this weekend?\n\nSophie",
    notes: ["Tell Sophie what you do at the weekend", "Say yes to meeting her", "Suggest an activity to do together"]
  },
  {
    id: "ket_email_11",
    source: "A2 Key Authentic Practice Tests",
    from: "David",
    subject: "Music",
    body: "Hi!\n\nI'm learning to play the guitar. Do you play a musical instrument?\n\nWhat kind of music do you like listening to?\n\nDavid",
    notes: ["Say if you play an instrument", "Tell David what music you like", "Ask David a question about his guitar"]
  },
  {
    id: "ket_email_12",
    source: "A2 Key Authentic Practice Tests",
    from: "Miss Green",
    subject: "Class project",
    body: "Hi class,\n\nFor our class project, you need to write about your favourite place in town.\n\nTell me: What is your favourite place? Why do you like it?\n\nMiss Green",
    notes: ["Name your favourite place in town", "Explain why you like it", "Ask Miss Green one question"]
  },
  {
    id: "ket_email_13",
    source: "KET for Schools Trainer",
    from: "Ben",
    subject: "Sports day",
    body: "Hi!\n\nSports day is next Wednesday! Are you going to take part?\n\nWhich sport are you going to do? I'm going to run in the 100 metres race.\n\nBen",
    notes: ["Say if you are taking part", "Tell Ben which sport you will do", "Wish Ben good luck"]
  },
  {
    id: "ket_email_14",
    source: "KET for Schools Trainer",
    from: "Chloe",
    subject: "Reading",
    body: "Hi!\n\nI just finished a really good book. Do you like reading?\n\nWhat kind of books do you like? Can you tell me about your favourite book?\n\nChloe",
    notes: ["Say if you like reading", "Tell Chloe what books you like", "Talk about your favourite book"]
  },
  {
    id: "ket_email_15",
    source: "2024 Cambridge Practice",
    from: "Grandma",
    subject: "Your visit",
    body: "Dear ...\n\nI'm so happy you're coming to visit me this Saturday!\n\nWhat would you like to eat for lunch? Would you like to go to the park or stay at home?\n\nLove,\nGrandma",
    notes: ["Say you're happy too", "Tell Grandma what you'd like to eat", "Say park or home and why"]
  },
  {
    id: "ket_email_16",
    source: "2024 Cambridge Practice",
    from: "Mr Wilson",
    subject: "School library",
    body: "Dear students,\n\nOur school library is getting new books! What kind of books should we buy?\n\nAlso, we need students to help in the library after school. Can you help?\n\nMr Wilson",
    notes: ["Suggest what kind of books to buy", "Say why these books are good", "Say if you can help in the library"]
  },
  {
    id: "ket_email_17",
    source: "2025 KET Mock Exam",
    from: "Lisa",
    subject: "Shopping",
    body: "Hi!\n\nI'm going shopping in town on Saturday. Would you like to come?\n\nI need to buy some new clothes. What shops do you like?\n\nLisa",
    notes: ["Say you want to come", "Tell Lisa what shops you like", "Ask what time to meet"]
  },
  {
    id: "ket_email_18",
    source: "2025 KET Mock Exam",
    from: "Mr Taylor",
    subject: "Class trip ideas",
    body: "Dear students,\n\nWe want to plan a class trip for next month. Where should we go?\n\nShould we go to the museum or the park? What day is best for you?\n\nMr Taylor",
    notes: ["Choose museum or park and why", "Say what you want to see/do there", "Tell Mr Taylor which day is best"]
  },
  {
    id: "ket_email_19",
    source: "KET Simply Test 1",
    from: "Harry",
    subject: "Computer games",
    body: "Hi!\n\nDo you like playing computer games? I play a new game every weekend.\n\nWhat games do you play? Do your parents let you play every day?\n\nHarry",
    notes: ["Say if you like computer games", "Tell Harry what games you play", "Say how often your parents let you play"]
  },
  {
    id: "ket_email_20",
    source: "KET Simply Test 2",
    from: "Sara",
    subject: "My birthday present",
    body: "Hi!\n\nIt was my birthday yesterday and I got a new phone! What was your best birthday present?\n\nWhen is your birthday? What do you usually do on your birthday?\n\nSara",
    notes: ["Say happy birthday (late)", "Tell Sara about your best present", "Say when your birthday is and what you do"]
  },
  {
    id: "ket_email_21",
    source: "KET Simply Test 3",
    from: "Oliver",
    subject: "Weather",
    body: "Hi!\n\nThe weather is so cold today! What's the weather like where you are?\n\nWhat do you like to do when it's cold? What about when it's hot?\n\nOliver",
    notes: ["Describe the weather where you are", "Say what you do when it's cold", "Say what you do when it's hot"]
  },
  {
    id: "ket_email_22",
    source: "KET Simply Test 4",
    from: "Aunt Mary",
    subject: "Your present",
    body: "Dear ...\n\nI want to buy you a present for your good marks at school! Well done!\n\nWould you like a book or some money? Or something else?\n\nLove,\nAunt Mary",
    notes: ["Thank Aunt Mary", "Say what you would like", "Ask how Aunt Mary is"]
  },
  {
    id: "ket_email_23",
    source: "2023 KET for Schools",
    from: "Josh",
    subject: "School subjects",
    body: "Hi!\n\nI have a new maths teacher this year. She's very nice. Do you like maths?\n\nWhat's your favourite subject, and why do you like it?\n\nJosh",
    notes: ["Say if you like maths", "Tell Josh your favourite subject", "Explain why you like it"]
  },
  {
    id: "ket_email_24",
    source: "2023 KET for Schools",
    from: "Molly",
    subject: "Hobbies",
    body: "Hi!\n\nI want to start a new hobby. I'm thinking of painting or dancing. What do you think?\n\nWhat hobbies do you have? How often do you do them?\n\nMolly",
    notes: ["Give Molly advice about painting or dancing", "Tell Molly about your hobbies", "Say how often you do them"]
  },
  {
    id: "ket_email_25",
    source: "2024 KET for Schools",
    from: "Max",
    subject: "Picnic",
    body: "Hi!\n\nMy family is having a picnic in the park this Sunday. Do you want to come?\n\nWhat food should we bring? Do you like sandwiches or pizza better?\n\nMax",
    notes: ["Say yes to the picnic", "Suggest what food to bring", "Choose sandwiches or pizza and why"]
  },
  {
    id: "ket_email_26",
    source: "2024 KET for Schools",
    from: "Lily",
    subject: "Moving house",
    body: "Hi!\n\nMy family is moving to a new house next month! I'm a bit sad to leave my old room.\n\nHave you ever moved house? What was it like?\n\nLily",
    notes: ["Say how you feel about Lily's news", "Tell Lily if you've moved house", "Give her some advice or share your experience"]
  },
  {
    id: "ket_email_27",
    source: "2025 KET for Schools",
    from: "Will",
    subject: "School show",
    body: "Hi!\n\nOur class is doing a show at school next week! I'm going to sing a song.\n\nWould you like to be in the show? What can you do?\n\nWill",
    notes: ["Say if you want to be in the show", "Tell Will what you can do (sing, dance, act)", "Ask Will about the show"]
  },
  {
    id: "ket_email_28",
    source: "2025 KET for Schools",
    from: "Ruby",
    subject: "Healthy food",
    body: "Hi!\n\nAt school we are learning about healthy food. Do you eat healthy food?\n\nWhat's your favourite healthy meal? What unhealthy food do you sometimes eat?\n\nRuby",
    notes: ["Say if you eat healthy food", "Describe your favourite healthy meal", "Tell Ruby about unhealthy food you eat sometimes"]
  },
  {
    id: "ket_email_29",
    source: "Cambridge Practice Tests 2024",
    from: "Finn",
    subject: "Summer holiday",
    body: "Hi!\n\nSummer is coming soon! What are you going to do in the summer holiday?\n\nAre you going to go anywhere special? Who are you going to spend time with?\n\nFinn",
    notes: ["Tell Finn your summer plans", "Say where you will go", "Say who you will spend time with"]
  },
  {
    id: "ket_email_30",
    source: "Cambridge Practice Tests 2024",
    from: "Mia",
    subject: "Best friend",
    body: "Hi!\n\nTell me about your best friend! What's his or her name?\n\nWhat do you like to do together? Why is he or she your best friend?\n\nMia",
    notes: ["Say your best friend's name", "Describe what you do together", "Explain why this person is your best friend"]
  }
];

// ============================================================
// Part 7: Picture Story 真题题库（KET A2 级别）
// 每条包含: desc(场景描述), pictures(三幅图描述), prompt(写作引导)
// Part 7: 看图写故事，~35 词，必须描述三幅图
// ============================================================

var KET_PICTURE_PROMPTS = [
  {
    id: "ket_pic_01",
    source: "Cambridge A2 Key Official Sample",
    title: "A Day at the Beach",
    desc: "三幅图：一家人在海滩上玩。第一幅：一个男孩在堆沙堡；第二幅：男孩跑去海里游泳；第三幅：一个大海浪把沙堡冲走了，男孩在笑。",
    pictures: [
      "A boy is building a sandcastle on the beach.",
      "The boy goes into the sea to swim.",
      "A big wave comes and washes away the sandcastle. The boy is laughing."
    ],
    prompt: "Look at the three pictures. Write the story shown in the pictures. Write 35 words or more."
  },
  {
    id: "ket_pic_02",
    source: "Cambridge A2 Key Official Sample (Schools)",
    title: "Lost Phone",
    desc: "三幅图：一个女孩在公园里。第一幅：她坐在长椅上看手机；第二幅：她起身离开，手机掉在地上；第三幅：她回来找到了手机，很开心。",
    pictures: [
      "A girl is sitting on a bench in the park, looking at her phone.",
      "She stands up and walks away. Her phone falls on the ground.",
      "She comes back, finds her phone on the ground, and looks very happy."
    ],
    prompt: "Look at the three pictures. Write the story shown in the pictures. Write 35 words or more."
  },
  {
    id: "ket_pic_03",
    source: "KET Trainer Test 1",
    title: "The Cake",
    desc: "三幅图：妈妈在厨房做蛋糕。第一幅：妈妈把蛋糕放进烤箱；第二幅：妈妈在客厅看书，厨房冒烟了；第三幅：蛋糕烤焦了，妈妈和儿子都在笑。",
    pictures: [
      "A mother puts a cake into the oven in the kitchen.",
      "The mother is reading in the living room. Smoke comes from the kitchen.",
      "The cake is burnt. The mother and her son are laughing."
    ],
    prompt: "Look at the three pictures. Write the story shown in the pictures. Write 35 words or more."
  },
  {
    id: "ket_pic_04",
    source: "KET Trainer Test 2",
    title: "The Bicycle",
    desc: "三幅图：男孩骑自行车。第一幅：男孩开心地骑新自行车；第二幅：自行车轮胎没气了，男孩很难过；第三幅：爸爸帮忙修好了轮胎，男孩又开心地骑走了。",
    pictures: [
      "A boy is riding his new bicycle happily.",
      "The bicycle tyre goes flat. The boy looks sad.",
      "His dad fixes the tyre. The boy rides away happily again."
    ],
    prompt: "Look at the three pictures. Write the story shown in the pictures. Write 35 words or more."
  },
  {
    id: "ket_pic_05",
    source: "KET Trainer Test 3",
    title: "The Cat and the Fish",
    desc: "三幅图：猫和鱼缸。第一幅：猫坐在桌子上看着鱼缸里的鱼；第二幅：猫把手伸进鱼缸想抓鱼；第三幅：猫掉进了鱼缸，全身湿透了。",
    pictures: [
      "A cat is sitting on a table, looking at a fish in a bowl.",
      "The cat puts its paw into the bowl, trying to catch the fish.",
      "The cat falls into the fish bowl and gets all wet."
    ],
    prompt: "Look at the three pictures. Write the story shown in the pictures. Write 35 words or more."
  },
  {
    id: "ket_pic_06",
    source: "KET Trainer Test 4",
    title: "The Missing Keys",
    desc: "三幅图：爸爸找钥匙。第一幅：爸爸在门口翻口袋找钥匙；第二幅：爸爸到处找——沙发下、桌子上；第三幅：小女儿拿着钥匙笑着递给爸爸。",
    pictures: [
      "A father is at the door, looking in his pockets for his keys.",
      "He looks everywhere — under the sofa, on the table.",
      "His little daughter brings him the keys, smiling."
    ],
    prompt: "Look at the three pictures. Write the story shown in the pictures. Write 35 words or more."
  },
  {
    id: "ket_pic_07",
    source: "KET Trainer Test 5",
    title: "The Picnic Surprise",
    desc: "三幅图：家庭野餐。第一幅：一家人在公园草地上铺毯子准备野餐；第二幅：突然下雨了，大家赶紧收拾东西跑；第三幅：一家人在车里吃野餐，还是很开心。",
    pictures: [
      "A family puts a blanket on the grass in the park for a picnic.",
      "Suddenly it starts to rain. Everyone picks up their things and runs.",
      "The family eats their picnic in the car, still happy."
    ],
    prompt: "Look at the three pictures. Write the story shown in the pictures. Write 35 words or more."
  },
  {
    id: "ket_pic_08",
    source: "KET for Schools Trainer",
    title: "At the Supermarket",
    desc: "三幅图：超市购物。第一幅：妈妈和儿子推着购物车买东西；第二幅：儿子偷偷往车里放了很多糖果；第三幅：付钱时妈妈发现了，把糖果放回去了。",
    pictures: [
      "A mother and her son are shopping with a trolley in the supermarket.",
      "The boy secretly puts lots of sweets into the trolley.",
      "At the checkout, the mother sees the sweets and puts them back."
    ],
    prompt: "Look at the three pictures. Write the story shown in the pictures. Write 35 words or more."
  },
  {
    id: "ket_pic_09",
    source: "KET for Schools Trainer",
    title: "The Surprise Gift",
    desc: "三幅图：生日惊喜。第一幅：一个男孩收到一个大礼物盒；第二幅：男孩打开盒子，里面是一只小狗；第三幅：男孩抱着小狗，非常开心。",
    pictures: [
      "A boy gets a big present box for his birthday.",
      "He opens the box and there is a puppy inside.",
      "The boy hugs the puppy. He is very happy."
    ],
    prompt: "Look at the three pictures. Write the story shown in the pictures. Write 35 words or more."
  },
  {
    id: "ket_pic_10",
    source: "A2 Key Authentic Practice Tests",
    title: "The Broken Window",
    desc: "三幅图：踢足球。第一幅：两个男孩在院子里踢足球；第二幅：球飞出去打碎了窗户玻璃；第三幅：一个生气的老人走出来，两个男孩低着头道歉。",
    pictures: [
      "Two boys are playing football in the garden.",
      "The ball flies and breaks a window.",
      "An angry old man comes out. The boys say sorry with their heads down."
    ],
    prompt: "Look at the three pictures. Write the story shown in the pictures. Write 35 words or more."
  },
  {
    id: "ket_pic_11",
    source: "A2 Key Authentic Practice Tests",
    title: "Helping Grandma",
    desc: "三幅图：帮奶奶。第一幅：奶奶提着很重的购物袋走路很吃力；第二幅：一个女孩跑过来帮奶奶提袋子；第三幅：她们一起走回家，奶奶笑着拍拍女孩的头。",
    pictures: [
      "A grandma is walking with heavy shopping bags. She looks tired.",
      "A girl runs over and helps the grandma carry the bags.",
      "They walk home together. The grandma smiles and pats the girl on the head."
    ],
    prompt: "Look at the three pictures. Write the story shown in the pictures. Write 35 words or more."
  },
  {
    id: "ket_pic_12",
    source: "2023 KET Practice Tests",
    title: "The Lost Dog",
    desc: "三幅图：找狗。第一幅：一个女孩在公园里发现狗不见了，很着急；第二幅：她到处找，问路人；第三幅：在树后面找到了小狗，小狗在睡觉。",
    pictures: [
      "A girl is in the park. Her dog is gone and she looks worried.",
      "She looks everywhere and asks people about her dog.",
      "She finds the dog behind a tree. The dog is sleeping."
    ],
    prompt: "Look at the three pictures. Write the story shown in the pictures. Write 35 words or more."
  },
  {
    id: "ket_pic_13",
    source: "2023 KET Practice Tests",
    title: "The School Play",
    desc: "三幅图：学校演出。第一幅：男孩在舞台上忘了台词，很紧张；第二幅：老师在一旁小声提醒他；第三幅：男孩想起了台词，表演成功，观众鼓掌。",
    pictures: [
      "A boy is on the school stage. He forgets his words and looks nervous.",
      "His teacher quietly helps him remember the words from the side.",
      "The boy remembers and finishes the play. The audience claps."
    ],
    prompt: "Look at the three pictures. Write the story shown in the pictures. Write 35 words or more."
  },
  {
    id: "ket_pic_14",
    source: "2024 KET Mock Exam",
    title: "Painting the Room",
    desc: "三幅图：刷墙。第一幅：爸爸和儿子准备刷墙，拿着刷子和油漆；第二幅：儿子不小心打翻了油漆桶，油漆洒了一地；第三幅：两个人一起清理，虽然很乱但在笑。",
    pictures: [
      "A father and son get ready to paint a room with brushes and paint.",
      "The son accidentally knocks over the paint. It goes all over the floor.",
      "They clean up together. The room is messy but they are laughing."
    ],
    prompt: "Look at the three pictures. Write the story shown in the pictures. Write 35 words or more."
  },
  {
    id: "ket_pic_15",
    source: "2024 KET Mock Exam",
    title: "First Day at School",
    desc: "三幅图：第一天上学。第一幅：小男孩在校门口紧紧拉着妈妈的手，有点害怕；第二幅：老师微笑着牵起小男孩的手；第三幅：小男孩在教室里和新朋友一起画画，很开心。",
    pictures: [
      "A young boy holds his mother's hand at the school gate. He looks scared.",
      "The teacher smiles and takes the boy's hand.",
      "The boy is drawing with new friends in the classroom. He looks happy."
    ],
    prompt: "Look at the three pictures. Write the story shown in the pictures. Write 35 words or more."
  },
  {
    id: "ket_pic_16",
    source: "2025 KET Mock Exam",
    title: "The Flower Garden",
    desc: "三幅图：种花。第一幅：女孩在花园里挖土种花种子；第二幅：她每天给花浇水，种子发芽了；第三幅：花开了，女孩高兴地摘了一朵送给妈妈。",
    pictures: [
      "A girl digs in the garden and plants flower seeds.",
      "She waters the flowers every day. Small plants start to grow.",
      "The flowers open. The girl happily picks one and gives it to her mum."
    ],
    prompt: "Look at the three pictures. Write the story shown in the pictures. Write 35 words or more."
  },
  {
    id: "ket_pic_17",
    source: "2025 KET Mock Exam",
    title: "The Bus Ride",
    desc: "三幅图：公交车。第一幅：老奶奶上公交车，没有座位；第二幅：一个男孩站起来把自己的座位让给老奶奶；第三幅：老奶奶坐下，笑着感谢男孩。",
    pictures: [
      "An old woman gets on a bus. There are no empty seats.",
      "A boy stands up and gives his seat to the old woman.",
      "The old woman sits down. She smiles and thanks the boy."
    ],
    prompt: "Look at the three pictures. Write the story shown in the pictures. Write 35 words or more."
  },
  {
    id: "ket_pic_18",
    source: "KET Simply Test 1",
    title: "A Rainy Day",
    desc: "三幅图：下雨天。第一幅：男孩没带伞站在校门口，外面下大雨；第二幅：同学撑着伞走过来；第三幅：两个人一起撑一把伞跑回家，都在笑。",
    pictures: [
      "A boy stands at the school gate. It is raining heavily. He has no umbrella.",
      "A classmate comes over with an umbrella.",
      "They run home together under one umbrella, both laughing."
    ],
    prompt: "Look at the three pictures. Write the story shown in the pictures. Write 35 words or more."
  },
  {
    id: "ket_pic_19",
    source: "KET Simply Test 2",
    title: "Making Breakfast",
    desc: "三幅图：做早餐。第一幅：早上妈妈还在睡觉，儿子决定自己做早餐；第二幅：儿子在厨房煎鸡蛋，有点手忙脚乱；第三幅：儿子端着做好的早餐送到妈妈床前，妈妈很惊喜。",
    pictures: [
      "In the morning, the mother is still sleeping. Her son decides to make breakfast.",
      "The son cooks eggs in the kitchen. He looks a bit messy.",
      "He brings the breakfast to his mum in bed. She looks very surprised and happy."
    ],
    prompt: "Look at the three pictures. Write the story shown in the pictures. Write 35 words or more."
  },
  {
    id: "ket_pic_20",
    source: "KET Simply Test 3",
    title: "The Library Book",
    desc: "三幅图：图书馆。第一幅：女孩去图书馆借书；第二幅：她在家看书时发现书里夹着一张钱；第三幅：她把钱还给图书馆，图书管理员表扬了她。",
    pictures: [
      "A girl goes to the library to borrow a book.",
      "At home, she finds some money inside the book.",
      "She returns the money to the library. The librarian says she is very honest."
    ],
    prompt: "Look at the three pictures. Write the story shown in the pictures. Write 35 words or more."
  }
];

// ============================================================
// KET 高分参考范文（Part 6 Email + Part 7 Picture Story）
// ============================================================

var KET_SAMPLE_ANSWERS = [
  {
    id: "ket_sample_01",
    type: "ket_email",
    promptId: "ket_email_01",
    score: 14,
    answer: "Dear Alex,\n\nYes, I would love to come to the park with you on Saturday! I can come at 10 o'clock in the morning. Let's bring some sandwiches and drinks. I can also bring a football so we can play.\n\nSee you soon,\nSam",
    comment: "三点全部覆盖，邮件格式完整（Dear + See you + 签名），用词简单准确 (would love to, let's bring)，句子流畅。"
  },
  {
    id: "ket_sample_02",
    type: "ket_email",
    promptId: "ket_email_07",
    score: 15,
    answer: "Dear Mr Brown,\n\nI think a sports club would be great because I love playing football and basketball. Many students like sports too. We could have the club on Wednesday after school.\n\nThank you,\nEmma",
    comment: "三项要点全部覆盖，有清晰的理由 (because)，建议具体 (Wednesday after school)，格式完整，语言自然。"
  },
  {
    id: "ket_sample_03",
    type: "ket_email",
    promptId: "ket_email_08",
    score: 13,
    answer: "Hi Emma,\n\nI like funny films because they make me laugh. I want to watch the funny film. Friday is OK for me. What time should I come to your house?\n\nSee you,\nTom",
    comment: "三点全部覆盖，有原因说明 (because they make me laugh)，提出合理问题 (What time)，用词简单自然。"
  },
  {
    id: "ket_sample_04",
    type: "ket_picture",
    promptId: "ket_pic_01",
    score: 14,
    answer: "Last Saturday, Tom went to the beach with his family. He built a big sandcastle. Then he went into the sea to swim. After that, a big wave came and washed the sandcastle away. Tom laughed because it was funny.",
    comment: "三幅图全部描述 (built sandcastle → went swimming → wave washed it away → laughed)，时间顺序清楚 (Last Saturday, Then, After that)，过去时一致，35+词。"
  },
  {
    id: "ket_sample_05",
    type: "ket_picture",
    promptId: "ket_pic_04",
    score: 15,
    answer: "One day, Jack got a new bicycle. He was very happy and rode it in the park. But then the tyre went flat and Jack was sad. His dad came and fixed the tyre. Jack thanked his dad and rode his bike again. He was happy.",
    comment: "三幅图完整描述，情感变化清楚 (happy → sad → happy again)，过去时正确，使用了连接词 (But then, and)，38词。"
  },
  {
    id: "ket_sample_06",
    type: "ket_picture",
    promptId: "ket_pic_17",
    score: 14,
    answer: "Yesterday, an old woman got on a bus. There were no empty seats for her. A young boy saw her and stood up. He gave his seat to the old woman. She sat down and smiled. She thanked the boy because he was very kind.",
    comment: "三幅图完整描述，过去时一致，有因果逻辑 (because he was very kind)，使用恰当的形容词 (old, young, kind)，42词。"
  }
];

// ============================================================
// KET 常用句型模板（A2 级别）
// ============================================================

var KET_SENTENCE_PATTERNS = [
  {
    id: "ket_sp_01",
    category: "邮件开头",
    chinese: "是的，我很想去。",
    english: "Yes, I would love to come.",
    note: "用 would love to 表达强烈的意愿，比 I want to 更礼貌。"
  },
  {
    id: "ket_sp_02",
    category: "邮件开头",
    chinese: "这是个好主意！",
    english: "That's a great idea!",
    note: "先表达对提议的认可，让邮件语气友好。"
  },
  {
    id: "ket_sp_03",
    category: "邮件开头",
    chinese: "谢谢你的邮件。",
    english: "Thank you for your email.",
    note: "简单礼貌的开场，适合给老师或长辈的回复。"
  },
  {
    id: "ket_sp_04",
    category: "表达原因",
    chinese: "因为我很喜欢...",
    english: "because I really like ...",
    note: "用 because 解释原因，really 加强程度。"
  },
  {
    id: "ket_sp_05",
    category: "表达原因",
    chinese: "因为那很有趣/好玩。",
    english: "because it is fun / interesting.",
    note: "简单的因果句式，KET 评分看重逻辑连接。"
  },
  {
    id: "ket_sp_06",
    category: "表达选择",
    chinese: "我更喜欢...",
    english: "I prefer ...",
    note: "表达偏好，比 I like ... better 更正式一点。"
  },
  {
    id: "ket_sp_07",
    category: "表达选择",
    chinese: "我觉得...更好。",
    english: "I think ... is better.",
    note: "给出个人意见，think 后面直接加句子。"
  },
  {
    id: "ket_sp_08",
    category: "提出建议",
    chinese: "我建议...",
    english: "I suggest ...",
    note: "提出建议的礼貌表达，后面跟名词或动词-ing。"
  },
  {
    id: "ket_sp_09",
    category: "提出建议",
    chinese: "我们可以...",
    english: "We can / We could ...",
    note: "can 表达可能性，could 更委婉。"
  },
  {
    id: "ket_sp_10",
    category: "询问",
    chinese: "...怎么样？",
    english: "What about ...? / How about ...?",
    note: "提出建议或询问意见的简单句型。"
  },
  {
    id: "ket_sp_11",
    category: "询问",
    chinese: "我想知道...",
    english: "I would like to know ...",
    note: "礼貌询问的表达方式。"
  },
  {
    id: "ket_sp_12",
    category: "邮件结尾",
    chinese: "希望很快见到你。",
    english: "Hope to see you soon.",
    note: "友好的结尾语，Hope 后面跟 to + 动词原形。"
  },
  {
    id: "ket_sp_13",
    category: "邮件结尾",
    chinese: "期待你的回复。",
    english: "I look forward to hearing from you.",
    note: "稍微正式一点的结尾，给老师的邮件可以用。look forward to 后跟动词-ing。"
  },
  {
    id: "ket_sp_14",
    category: "邮件结尾",
    chinese: "到时候见！",
    english: "See you then!",
    note: "最常用的非正式结尾语。"
  },
  {
    id: "ket_sp_15",
    category: "故事时间顺序",
    chinese: "然后...",
    english: "Then ... / After that ...",
    note: "用 Then 或 After that 开始下一句话，表达时间顺序。"
  },
  {
    id: "ket_sp_16",
    category: "故事时间顺序",
    chinese: "最后...",
    english: "Finally ... / In the end ...",
    note: "表示故事的最后一部分。"
  },
  {
    id: "ket_sp_17",
    category: "故事开头",
    chinese: "有一天...",
    english: "One day ... / Last weekend ...",
    note: "图片故事常用过去的时间开头。注意要用过去式。"
  },
  {
    id: "ket_sp_18",
    category: "故事情感",
    chinese: "他/她很开心。",
    english: "He / She was very happy.",
    note: "描述人物的情感，A2 级别必备。也可用 sad, excited, worried, tired。"
  },
  {
    id: "ket_sp_19",
    category: "故事情感",
    chinese: "他/她笑了。",
    english: "He / She smiled / laughed.",
    note: "用具体的动作来表达情感，让故事更生动。"
  },
  {
    id: "ket_sp_20",
    category: "故事转折",
    chinese: "但是突然...",
    english: "But suddenly ... / But then ...",
    note: "引入故事的转折点，让故事有起伏。"
  },
  {
    id: "ket_sp_21",
    category: "原因解释",
    chinese: "因为那让他/她很开心。",
    english: "because it made him / her happy.",
    note: "用 make + 人 + 形容词 表达因果关系。"
  },
  {
    id: "ket_sp_22",
    category: "故事结尾",
    chinese: "这真是美好的一天。",
    english: "It was a great day.",
    note: "故事的总结性结尾，简单但完整。"
  },
  {
    id: "ket_sp_23",
    category: "故事结尾",
    chinese: "他们都很开心。",
    english: "They were all very happy.",
    note: "用 all 表示所有人，常见的快乐结局。"
  }
];
