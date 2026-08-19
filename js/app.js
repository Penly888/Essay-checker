// ============================================================
//  写作批改 · 批改引擎 (前端启发式版；预留 AI 接口)
// ============================================================
(function () {
  "use strict";

  var SPELL = {
    "alough": "although", "teh": "the", "recieve": "receive", "seperate": "separate",
    "definately": "definitely", "occured": "occurred", "untill": "until", "wich": "which",
    "thier": "their", "becuase": "because", "enviroment": "environment", "goverment": "government",
    "neccessary": "necessary", "tommorow": "tomorrow", "adress": "address", "acheive": "achieve"
  };

  // ---------- DOM ----------
  var el = {
    examList: document.getElementById("examList"),
    curExam: document.getElementById("curExam"),
    minHint: document.getElementById("minHint"),
    prompt: document.getElementById("prompt"),
    essay: document.getElementById("essay"),
    wordCount: document.getElementById("wordCount"),
    analyzeBtn: document.getElementById("analyzeBtn"),
    resetBtn: document.getElementById("resetBtn"),
    result: document.getElementById("result"),
    annotated: document.getElementById("annotated"),
    promptAnalysis: document.getElementById("promptAnalysis"),
    scoreEst: document.getElementById("scoreEst"),
    scoreSub: document.getElementById("scoreSub"),
    vocabList: document.getElementById("vocabList"),
    bandRef: document.getElementById("bandRef"),
    // new: tool buttons + modals + bank + playbook
    patternBtn: document.getElementById("patternBtn"),
    bankBtn: document.getElementById("bankBtn"),
    bandBtn: document.getElementById("bandBtn"),
    materialBtn: document.getElementById("materialBtn"),
    aiBtn: document.getElementById("aiBtn"),
    patternModal: document.getElementById("patternModal"),
    bankModal: document.getElementById("bankModal"),
    bandModal: document.getElementById("bandModal"),
    materialModal: document.getElementById("materialModal"),
    aiModal: document.getElementById("aiModal"),
    patternTabs: document.getElementById("patternTabs"),
    patternBody: document.getElementById("patternBody"),
    simonRules: document.getElementById("simonRules"),
    bandTabs: document.getElementById("bandTabs"),
    bandBody: document.getElementById("bandBody"),
    materialTabs: document.getElementById("materialTabs"),
    materialBody: document.getElementById("materialBody"),
    aiBadge: document.getElementById("aiBadge"),
    aiProvider: document.getElementById("aiProvider"),
    aiBase: document.getElementById("aiBase"),
    aiBaseWrap: document.getElementById("aiBaseWrap"),
    aiModel: document.getElementById("aiModel"),
    aiKey: document.getElementById("aiKey"),
    aiSave: document.getElementById("aiSave"),
    aiClear: document.getElementById("aiClear"),
    bankSearch: document.getElementById("bankSearch"),
    bankType: document.getElementById("bankType"),
    bankList: document.getElementById("bankList"),
    bankCount: document.getElementById("bankCount"),
    // PET 真题题库
    petBankBtn: document.getElementById("petBankBtn"),
    petBankModal: document.getElementById("petBankModal"),
    petBankSearch: document.getElementById("petBankSearch"),
    petBankType: document.getElementById("petBankType"),
    petBankList: document.getElementById("petBankList"),
    petBankCount: document.getElementById("petBankCount"),
    // KET 真题题库
    ketBankBtn: document.getElementById("ketBankBtn"),
    ketBankModal: document.getElementById("ketBankModal"),
    ketBankSearch: document.getElementById("ketBankSearch"),
    ketBankType: document.getElementById("ketBankType"),
    ketBankList: document.getElementById("ketBankList"),
    ketBankCount: document.getElementById("ketBankCount"),
    // 高考真题题库
    gaokaoBankBtn: document.getElementById("gaokaoBankBtn"),
    gaokaoBankModal: document.getElementById("gaokaoBankModal"),
    gaokaoBankSearch: document.getElementById("gaokaoBankSearch"),
    gaokaoBankType: document.getElementById("gaokaoBankType"),
    gaokaoBankYear: document.getElementById("gaokaoBankYear"),
    gaokaoBankList: document.getElementById("gaokaoBankList"),
    gaokaoBankCount: document.getElementById("gaokaoBankCount"),
    // 高考评分标准 + 句型库
    gaokaoBandBtn: document.getElementById("gaokaoBandBtn"),
    gaokaoBandModal: document.getElementById("gaokaoBandModal"),
    gaokaoBandTabs: document.getElementById("gaokaoBandTabs"),
    gaokaoBandBody: document.getElementById("gaokaoBandBody"),
    gaokaoPatternBtn: document.getElementById("gaokaoPatternBtn"),
    gaokaoPatternModal: document.getElementById("gaokaoPatternModal"),
    gaokaoPatternTabs: document.getElementById("gaokaoPatternTabs"),
    gaokaoPatternBody: document.getElementById("gaokaoPatternBody"),
    // 托福题库
    toeflBankBtn: document.getElementById("toeflBankBtn"),
    toeflBankModal: document.getElementById("toeflBankModal"),
    toeflBankSearch: document.getElementById("toeflBankSearch"),
    toeflBankType: document.getElementById("toeflBankType"),
    toeflBankList: document.getElementById("toeflBankList"),
    toeflBankCount: document.getElementById("toeflBankCount"),
    playbookCard: document.getElementById("playbookCard"),
    playbook: document.getElementById("playbook"),
    playbookSrc: document.getElementById("playbookSrc"),
    aeasPanel: document.getElementById("aeasPanel"),
    aeasIntro: document.getElementById("aeasIntro"),
    aeasBands: document.getElementById("aeasBands"),
    aeasTypeChips: document.getElementById("aeasTypeChips"),
    aeasTypes: document.getElementById("aeasTypes"),
    // image prompt (Task 1)
    promptHint: document.getElementById("promptHint"),
    promptTextWrap: document.getElementById("promptTextWrap"),
    promptImageWrap: document.getElementById("promptImageWrap"),
    pickImgBtn: document.getElementById("pickImgBtn"),
    galleryBtn: document.getElementById("galleryBtn"),
    clearImgBtn: document.getElementById("clearImgBtn"),
    imgFile: document.getElementById("imgFile"),
    promptImgBox: document.getElementById("promptImgBox"),
    imgCaption: document.getElementById("imgCaption"),
    // cihuo + simon + gallery modals
    cihuoBtn: document.getElementById("cihuoBtn"),
    cihuoModal: document.getElementById("cihuoModal"),
    cihuoTabs: document.getElementById("cihuoTabs"),
    cihuoBody: document.getElementById("cihuoBody"),
    simonBtn: document.getElementById("simonBtn"),
    simonModal: document.getElementById("simonModal"),
    simonType: document.getElementById("simonType"),
    simonCount: document.getElementById("simonCount"),
    simonList: document.getElementById("simonList"),
    examinerBtn: document.getElementById("examinerBtn"),
    examinerModal: document.getElementById("examinerModal"),
    examinerType: document.getElementById("examinerType"),
    examinerCount: document.getElementById("examinerCount"),
    examinerList: document.getElementById("examinerList"),
    galleryModal: document.getElementById("galleryModal"),
    galleryGrid: document.getElementById("galleryGrid")
  };

  var selectedQuestion = null; // {idx,date,task,subtype,topic,q} 来自真题题库

  var current = EXAMS[0];
  var aeasState = { band: "4-6", typeSub: "记叙文" };
  var aiConfig = null; // {base, model, key}
  var task1Image = null;   // {src: dataURL or path, fromGallery:bool}
  var promptMode = "text"; // "text" | "image"

  // ---- 服务商预设 Base URL ----
  // 本地开发时使用同源代理（/api/deepseek/v1），服务器运行时使用直连
  function isLocalhost() {
    try { return location.hostname === "localhost" || location.hostname === "127.0.0.1"; }
    catch (e) { return false; }
  }
  var AI_PRESETS = {
    deepseek: isLocalhost() ? "/api/deepseek/v1" : "https://api.deepseek.com",
    openai: "https://api.openai.com/v1",
    moonshot: "https://api.moonshot.cn/v1",
    zhipu: "https://open.bigmodel.cn/api/paas/v4",
    qwen: "https://dashscope.aliyuncs.com/compatible-mode/v1"
  };

  // ---------- helpers ----------
  function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function escapeRegex(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
  function words(t) { var m = t.trim().match(/\S+/g); return m ? m : []; }
  function paragraphs(t) {
    return t.replace(/\r/g, "").split(/\n\s*\n/).map(function (p) { return p.trim(); }).filter(Boolean);
  }
  function sentences(p) {
    var s = p.replace(/\s+/g, " ").match(/[^.!?]+[.!?]+|[^.!?]+$/g);
    return s ? s.map(function (x) { return x.trim(); }).filter(Boolean) : [];
  }
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function round1(v) { return Math.round(v * 10) / 10; }
  function findAll(re, str) {
    var m, out = []; re.lastIndex = 0;
    while ((m = re.exec(str))) {
      out.push({ start: m.index, end: m.index + m[0].length, raw: m[0] });
      if (m[0].length === 0) re.lastIndex++;
    }
    return out;
  }

  // ---------- grammar rules (per sentence) -> spans (16+ 错误类别) ----------
  // 类别标签紧凑显示
  function grammarSpans(sentence) {
    var spans = [];
    // 1. 代词 I 大写
    findAll(/\bi\b/g, sentence).forEach(function (m) {
      spans.push({ start: m.start, end: m.end, kind: "gra", issue: "①代词 I 应大写", suggestion: "I" });
    });
    // 2. 缩写缺撇号
    findAll(/\b(dont|cant|wont|im|ive|id|didnt|couldnt|wouldnt|shouldnt|isnt|arent|wasnt|werent|hasnt|havent|thats|lets|youd|theyre|weve)\b/gi, sentence).forEach(function (m) {
      spans.push({ start: m.start, end: m.end, kind: "gra", issue: "②缩写缺撇号", suggestion: m.raw.replace(/(\w)([a-z])$/i, "$1'$2") });
    });
    // 3. 拼写
    Object.keys(SPELL).forEach(function (bad) {
      findAll(new RegExp("\\b" + escapeRegex(bad) + "\\b", "gi"), sentence).forEach(function (m) {
        spans.push({ start: m.start, end: m.end, kind: "gra", issue: "⑥拼写错误", suggestion: SPELL[bad] });
      });
    });
    // 4. very + 形容词偏弱
    findAll(/\bvery\s+\w+/gi, sentence).forEach(function (m) {
      spans.push({ start: m.start, end: m.end, kind: "gra", issue: "⑪very+形容词偏弱", suggestion: "换精准形容词（如 crucial / significant）" });
    });
    // 5. 句首小写
    var cap = sentence.match(/^[a-z]+/);
    if (cap && cap[0] !== "i") {
      spans.push({ start: 0, end: cap[0].length, kind: "gra", issue: "⑭句首字母需大写", suggestion: cap[0].charAt(0).toUpperCase() + cap[0].slice(1) });
    }
    // 6. 重复用词
    findAll(/\b(\w+)\s+\1\b/gi, sentence).forEach(function (m) {
      spans.push({ start: m.start, end: m.end, kind: "gra", issue: "②重复用词", suggestion: "删去一处或用同义词替换" });
    });
    // 7. 连词冗余 because…so / although…but
    if (/\bbecause\b/i.test(sentence) && /\bso\b/i.test(sentence)) {
      var ms = sentence.match(/\bso\b/i);
      if (ms) spans.push({ start: ms.index, end: ms.index + ms[0].length, kind: "gra", issue: "⑦连词冗余", suggestion: "前有 because，勿再用 so（英汉差异）" });
    }
    if (/\balthough\b/i.test(sentence) && /\bbut\b/i.test(sentence)) {
      var mb = sentence.match(/\bbut\b/i);
      if (mb) spans.push({ start: mb.index, end: mb.index + mb[0].length, kind: "gra", issue: "⑦连词冗余", suggestion: "前有 although，勿再用 but" });
    }
    // 8. 主谓一致 (he do → he does, she have → she has, they is → they are)
    var sva_s = sentence.toLowerCase();
    [
      [/he\s+don['']?t\b/gi, "he doesn't"],
      [/she\s+don['']?t\b/gi, "she doesn't"],
      [/it\s+don['']?t\b/gi, "it doesn't"],
      [/\bhe\s+do\b/gi, "he does"],
      [/\bshe\s+do\b/gi, "she does"],
      [/\bit\s+do\b/gi, "it does"],
      [/\bhe\s+have\b/gi, "he has"],
      [/\bshe\s+have\b/gi, "she has"],
      [/\bit\s+have\b/gi, "it has"],
      [/\bthey\s+is\b/gi, "they are"],
      [/\bwe\s+is\b/gi, "we are"],
      [/\byou\s+is\b/gi, "you are"],
      [/\bpeople\s+is\b/gi, "people are"],
      [/\bhe\s+are\b/gi, "he is"],
      [/\bshe\s+are\b/gi, "she is"],
      [/\bthat\s+are\b/gi, "that is"],
      [/\bit\s+are\b/gi, "it is"],
      [/\bthere\s+is\s+\w+s\b/gi, "there are"],
      [/\bthere\s+is\s+many\b/gi, "there are many"]
    ].forEach(function (pair) {
      findAll(pair[0], sentence).forEach(function (m) {
        spans.push({ start: m.start, end: m.end, kind: "gra", issue: "①主谓一致错误", suggestion: pair[1] });
      });
    });
    // 9. 动词三单形式 (he go → he goes, she play → she plays)
    [
      [/\bhe\s+go\b/gi, "he goes"], [/\bshe\s+go\b/gi, "she goes"], [/\bit\s+go\b/gi, "it goes"],
      [/\bhe\s+play\b/gi, "he plays"], [/\bshe\s+play\b/gi, "she plays"],
      [/\bhe\s+like\b/gi, "he likes"], [/\bshe\s+like\b/gi, "she likes"],
      [/\bhe\s+want\b/gi, "he wants"], [/\bshe\s+want\b/gi, "she wants"],
      [/\bhe\s+need\b/gi, "he needs"], [/\bshe\s+need\b/gi, "she needs"],
      [/\bhe\s+make\b/gi, "he makes"], [/\bshe\s+make\b/gi, "she makes"],
      [/\bhe\s+know\b/gi, "he knows"], [/\bshe\s+know\b/gi, "she knows"],
      [/\bhe\s+get\b/gi, "he gets"], [/\bshe\s+get\b/gi, "she gets"],
      [/\bhe\s+take\b/gi, "he takes"], [/\bshe\s+take\b/gi, "she takes"]
    ].forEach(function (pair) {
      findAll(pair[0], sentence).forEach(function (m) {
        spans.push({ start: m.start, end: m.end, kind: "gra", issue: "③动词缺三单 -s/-es", suggestion: pair[1] });
      });
    });
    // 10. 可数名词复数缺失 (two book → two books)
    [
      [/\b(two|three|four|five|six|seven|eight|nine|ten|many|few|several|some|a lot of|a couple of|different)\s+(\w+)\b(?!s\b)/gi, ""]
    ].forEach(function (pair) {
      findAll(/\b(two|three|four|five|six|seven|eight|nine|ten|many|few|several|a lot of|different|some)\s+(\w+)\b/gi, sentence).forEach(function (m) {
        var parts = m.raw.split(/\s+/);
        if (parts.length === 2 && /^[a-z]+$/i.test(parts[1]) && !/s$/.test(parts[1]) && !/ss$/.test(parts[1]) && !/x$/.test(parts[1]) && !/ch$/.test(parts[1]) && !/sh$/.test(parts[1]) && !/men$|women$|children$|people$|teeth$|feet$|mice$|sheep$|fish$|deer$/i.test(parts[1])) {
          // 排除不可数名词尝试
          if (!/\b(information|advice|furniture|luggage|homework|money|water|milk|bread|rice|news|music|work|paper|hair|weather)\b/i.test(parts[1])) {
            var plural = parts[1] + "s";
            spans.push({ start: m.start, end: m.end, kind: "gra", issue: "④可数名词应用复数", suggestion: parts[0] + " " + plural });
          }
        }
      });
    });
    // 11. 不可数名词误用 (a furniture, many informations)
    [
      [/\ba\s+furniture\b/gi, "furniture (不可数，不加a)"],
      [/\ba\s+advice\b/gi, "some advice (不可数，不加a)"],
      [/\ba\s+information\b/gi, "some information (不可数，不加a)"],
      [/\ba\s+luggage\b/gi, "luggage (不可数，不加a)"],
      [/\ba\s+homework\b/gi, "some homework (不可数，不加a)"],
      [/\ba\s+news\b/gi, "some news (不可数，不加a)"],
      [/\ba\s+work\b(?=\s+is\b|\s+was\b)/gi, "work (不可数，不加a)"],
      [/\bmany\s+information\b/gi, "much information (不可数用much)"],
      [/\bmany\s+advice\b/gi, "much advice (不可数用much)"],
      [/\bmany\s+furniture\b/gi, "much furniture (不可数用much)"],
      [/\bmany\s+homework\b/gi, "much homework (不可数用much)"],
      [/\bmany\s+news\b/gi, "much news (不可数用much)"],
      [/\bmany\s+luggages?\b/gi, "much luggage (不可数用much)"],
      [/\binformations\b/gi, "information (不可数，不用复数)"],
      [/\badvices\b/gi, "advice (不可数，不用复数)"],
      [/\bfurnitures\b/gi, "furniture (不可数，不用复数)"],
      [/\bhomeworks\b/gi, "homework (不可数，不用复数)"],
      [/\bluggages\b/gi, "luggage (不可数，不用复数)"],
      [/\bknowledges\b/gi, "knowledge (不可数，不用复数)"],
      [/\bworks\b(?=\s+are\b)/gi, "work (不可数，不用复数)"],
      [/\bequipments\b/gi, "equipment (不可数，不用复数)"],
      [/\bstuffs\b/gi, "stuff (不可数，不用复数)"]
    ].forEach(function (pair) {
      findAll(pair[0], sentence).forEach(function (m) {
        spans.push({ start: m.start, end: m.end, kind: "gra", issue: "⑤不可数名词形式错误", suggestion: pair[1] });
      });
    });
    // 12. Run-on sentence (逗号连接两个独立句)
    // 检测：逗号前后各有独立的主谓结构，且不是 and/but/or 等连词
    if (/(\w+),\s*(I|you|he|she|it|we|they|this|that|these|those|there)\s+(am|is|are|was|were|have|has|had|do|does|did|can|could|will|would|should|may|might|must|go|went|come|came|get|got|make|made|take|took|see|saw|say|said|know|knew|think|thought|want|wanted|find|found)/i.test(sentence)) {
      var runon = sentence.match(/(\w+),\s*(I|you|he|she|it|we|they|this|that|these|those|there)\s+(am|is|are|was|were|have|has|had|do|does|did|can|could|will|would|should|may|might|must|go|went|come|came|get|got|make|made|take|took|see|saw|say|said|know|knew|think|thought|want|wanted|find|found)/i);
      if (runon) {
        spans.push({ start: runon.index, end: runon.index + runon[0].length, kind: "gra", issue: "⑧疑似 run-on 句", suggestion: "逗号不能连接两个完整句子，请加分号或连词（如 , and/but）" });
      }
    }
    // 13. 标点误用 — 中文标点
    findAll(/[。，！？；：（）【】《》]/g, sentence).forEach(function (m) {
      spans.push({ start: m.start, end: m.end, kind: "gra", issue: "⑩中文标点误用", suggestion: "使用英文标点（. , ! ? ; : ()）" });
    });
    // 14. 多余的空格标点（标点前不应有空格）
    findAll(/\s+([.,!?;:])/g, sentence).forEach(function (m) {
      spans.push({ start: m.start, end: m.end, kind: "gra", issue: "⑩标点前多余空格", suggestion: "去掉标点前空格 → " + m.raw.replace(/\s+/, "") });
    });
    // 15. 形容词副词误用 (very perfect, more better, most best)
    [
      [/\bvery\s+perfect\b/gi, "absolutely perfect"],
      [/\bmore\s+better\b/gi, "better"],
      [/\bmost\s+best\b/gi, "best"],
      [/\bvery\s+excellent\b/gi, "truly excellent"],
      [/\bvery\s+unique\b/gi, "unique / truly unique"],
      [/\bvery\s+fantastic\b/gi, "absolutely fantastic"],
      [/\bmore\s+worse\b/gi, "worse"],
      [/\bvery\s+terrible\b/gi, "absolutely terrible"],
      [/\bvery\s+amazing\b/gi, "absolutely amazing"]
    ].forEach(function (pair) {
      findAll(pair[0], sentence).forEach(function (m) {
        spans.push({ start: m.start, end: m.end, kind: "gra", issue: "⑪形容词/副词搭配误用", suggestion: pair[1] + "（不可用 very/more 修饰极端形容词）" });
      });
    });
    // 16. 动词缺失 (句子无动词)
    // 检查：如果句子较长但没有常见动词，标记为疑似
    if (sentence.split(/\s+/).length >= 4) {
      var hasVerb = /\b(am|is|are|was|were|be|been|being|have|has|had|do|does|did|can|could|will|would|shall|should|may|might|must|go|went|going|come|came|coming|get|got|getting|make|made|making|take|took|taking|see|saw|seeing|say|said|saying|know|knew|think|thought|want|wanted|find|found|like|liked|love|loved|play|played|work|worked|live|lived|help|helped|give|gave|need|needed|use|used|try|tried|feel|felt|buy|bought|eat|ate|drink|drank|sleep|slept|run|ran|walk|walked|talk|talked|tell|told|show|showed|put|put|read|read|write|wrote|sit|sat|stand|stood|look|looked|learn|learned|study|studied|start|started|finish|finished|stop|stopped|open|opened|close|closed|move|moved|carry|carried|bring|brought|keep|kept|let|let|set|set|cost|cost|pay|paid|call|called|ask|asked|answer|answered|happen|happened|change|changed|watch|watched|wait|waited|stay|stayed|spend|spent|leave|left|turn|turned|grow|grew|fall|fell|break|broke|lose|lost|win|won|meet|met|mean|meant|hear|heard|hold|held|lead|led|choose|chose|begin|began|forget|forgot|remember|remembered|enjoy|enjoyed)\b/i.test(sentence);
      if (!hasVerb) {
        spans.push({ start: 0, end: Math.min(40, sentence.length), kind: "gra", issue: "⑫疑似缺少动词", suggestion: "本句似乎没有谓语动词，请检查是否漏写（如 be 动词或实义动词）" });
      }
    }
    // 17. 时态混乱 (句中同时出现现在时和过去时标志词)
    var pastSignalRe = /\b(yesterday|last\s+(week|month|year|night|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)|ago|in\s+(199|200|201)\d|just\s+now|already)\b/i;
    var pastSignals = pastSignalRe.test(sentence);
    var hasPastVerb = /\b(was|were|went|did|came|saw|said|told|made|took|got|found|knew|thought|wanted|gave|felt|bought|ate|drank|slept|ran|walked|talked|showed|read|wrote|sat|stood|looked|learned|studied|started|finished|stopped|opened|closed|moved|carried|brought|kept|paid|called|asked|answered|happened|changed|watched|waited|stayed|spent|left|turned|grew|fell|broke|lost|won|met|meant|heard|held|led|chose|began|forgot|remembered|enjoyed|tried|used|helped|needed|lived|played|worked|liked|loved)\b/i.test(sentence);
    var hasPresentVerb = /\b(am|is|are|go|goes|come|comes|get|gets|make|makes|take|takes|see|sees|say|says|know|knows|think|thinks|want|wants|find|finds)\b/i.test(sentence);
    if (pastSignals && hasPresentVerb && !hasPastVerb) {
      var foundSignal = (sentence.match(pastSignalRe) || [""])[0];
      spans.push({ start: 0, end: Math.min(50, sentence.length), kind: "gra", issue: "⑬时态可能不一致", suggestion: "有时间标志词 (" + foundSignal + ")，建议统一使用过去时" });
    }
    // 18. 大写问题 — 专有名词 (Monday, January, English, China 等应在句中大写)
    findAll(/\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday|january|february|march|april|may|june|july|august|september|october|november|december|english|chinese|american|british|french|german|japanese)\b/g, sentence).forEach(function (m) {
      spans.push({ start: m.start, end: m.end, kind: "gra", issue: "⑭专有名词应大写", suggestion: m.raw.charAt(0).toUpperCase() + m.raw.slice(1) });
    });
    // 19. 语义逻辑问题：主语与谓语逻辑不匹配
    // 检测典型逻辑错误：I am difficult / Problem is happen / You are easy to learn
    [
      [/\bi\s+am\s+difficult\b/gi, "It is difficult for me"],
      [/\b(i|you|he|she|we|they)\s+am\s+happen\b/gi, " happened to "],
      [/\bproblem\s+is\s+happen\b/gi, "There is a problem / A problem happened"],
      [/\byou\s+are\s+easy\s+to\s+learn\b/gi, "It is easy for you to learn"],
      [/\bi\s+am\s+interesting\b/gi, "I am interested (interesting=令人感兴趣的, interested=感兴趣的)"],
      [/\bi\s+am\s+boring\b/gi, "I am bored (boring=令人无聊的, bored=感到无聊的)"],
      [/\bi\s+am\s+exciting\b/gi, "I am excited (exciting=令人激动的, excited=感到激动的)"],
      [/\bi\s+am\s+convenient\b/gi, "It is convenient for me"],
      [/\bthe\s+cost\s+is\s+expensive\b/gi, "The cost is high (cost expensive → The item is expensive)"],
      [/\bthe\s+price\s+is\s+expensive\b/gi, "The price is high (price expensive → The item is expensive)"],
      [/\bthe\s+speed\s+is\s+fast\b/gi, "The speed is high (或 It is very fast)"]
    ].forEach(function (pair) {
      findAll(pair[0], sentence).forEach(function (m) {
        spans.push({ start: m.start, end: m.end, kind: "gra", issue: "⑮主谓逻辑不当", suggestion: pair[1] + "（主语与谓语在语义上不匹配）" });
      });
    });
    // 20. 用词词不达意 — 常见混淆词
    [
      [/\baccept\s+(?!the|a|an|this|that|his|her|my|your|our|their|it)\b/gi, "except (排除)", "accept=接受, except=除了"],
      [/\baffect\s+(?!the|a|an|this|that|his|her|my|your|our|their|it|how|what|why)\b.*?\bby\b/gi, "effect (影响=名词)", "affect=影响(v.), effect=影响(n.)"],
      [/\b(a economical)|(a economical)\b/gi, "an economical (元音前用an)"],
      [/\bin\s+the\s+other\s+hand\b/gi, "on the other hand"],
      [/\bon\s+the\s+one\s+hand\b/gi, "on the one hand"],
      [/\bdepend\s+(?!on|upon|ing)\w+\b/gi, "depend on + 宾语"],
      [/\bdiscuss\s+about\b/gi, "discuss (不加 about)"],
      [/\bmention\s+about\b/gi, "mention (不加 about)"]
    ].forEach(function (pair) {
      findAll(pair[0], sentence).forEach(function (m) {
        var sug = pair.length === 3 ? pair[1] + "（" + pair[2] + "）" : pair[1];
        spans.push({ start: m.start, end: m.end, kind: "gra", issue: "⑯用词不当", suggestion: sug });
      });
    });
    // 21. 口语化表达（书面语应避免）— 高考重点扣分项
    [
      [/\bgonna\b/gi, "going to"],
      [/\bwanna\b/gi, "want to"],
      [/\bkinda\b/gi, "kind of"],
      [/\bgotta\b/gi, "have to"],
      [/\b(cause|cuz|cos)\b/gi, "because"],
      [/\ba\s+lot\s+of\b/gi, "many / numerous / a wide range of"],
      [/\blots\s+of\b/gi, "many / numerous"],
      [/\bkind\s+of\b/gi, "somewhat / rather"],
      [/\bsort\s+of\b/gi, "somewhat / rather"],
      [/\bok\b/gi, "acceptable / satisfactory"],
      [/\bokay\b/gi, "acceptable / satisfactory"],
      [/\bthing(s)?\b/gi, "item(s) / aspect(s) / matter(s)"],
      [/\bstuff\b/gi, "material / content"]
    ].forEach(function (pair) {
      findAll(pair[0], sentence).forEach(function (m) {
        spans.push({ start: m.start, end: m.end, kind: "gra", issue: "⑰口语化表达", suggestion: pair[1] + "（书面语应使用正式词汇）" });
      });
    });
    // 22. 中式连接词 / 中式表达
    [
      [/\band\s+so\s+on\b/gi, "etc. / and so forth"],
      [/\band\s+so\s+forth\b/gi, "etc."],
      [/\bwhat's\s+more\b/gi, "moreover / furthermore / additionally"],
      [/\bfirst\s+of\s+all\b/gi, "first and foremost / to begin with"],
      [/\blast\s+but\s+not\s+least\b/gi, "last but certainly not least"],
      [/\bin\s+a\s+word\b/gi, "in conclusion / to sum up"],
      [/\bevery\s+coin\s+has\s+two\s+sides\b/gi, "however / on the other hand（避免中式谚语）"],
      [/\bas\s+we\s+all\s+know\b/gi, "it is widely acknowledged that"],
      [/\bmore\s+and\s+more\b/gi, "an increasing number of / increasingly"],
      [/\bmost\s+of\s+the\s+people\b/gi, "most people / the majority of people"]
    ].forEach(function (pair) {
      findAll(pair[0], sentence).forEach(function (m) {
        spans.push({ start: m.start, end: m.end, kind: "chi", issue: "中式表达/连接词", suggestion: pair[1] });
      });
    });
    return spans;
  }

  // ---------- chinglish spans (per sentence) ----------
  function chinglishSpans(sentence) {
    var spans = [], low = sentence.toLowerCase();
    CHINGLISH.forEach(function (c) {
      if (c.wrong.indexOf("...") !== -1) return; // 跳过模式型（已由语法规则处理）
      var re = new RegExp("\\b" + escapeRegex(c.wrong) + "\\b", "gi");
      findAll(re, sentence).forEach(function (m) {
        spans.push({ start: m.start, end: m.end, kind: "chi", issue: "中式英语", suggestion: "替换：" + c.right + "（" + c.note + "）" });
      });
    });
    return spans;
  }

  // ---------- word-upgrade spans (基础词 → 高分词) ----------
  function upgradeSpans(sentence) {
    var spans = [];
    WORD_UPGRADES.forEach(function (u) {
      var b = u.basic.replace(/^'|'$/g, "");
      var re = new RegExp("\\b" + escapeRegex(b) + "\\b", "gi");
      findAll(re, sentence).forEach(function (m) {
        spans.push({ start: m.start, end: m.end, kind: "up", issue: "用词偏基础，可升级", suggestion: "替换为 " + u.adv.join(" / ") + (u.ctx ? "（" + u.ctx + "）" : "") });
      });
    });
    return spans;
  }

  // ---------- 词伙升级 spans (基础表达 → 雅思词伙) ----------
  function cihuoSpans(sentence) {
    var spans = [];
    (window.CIHUO_ACTIVE || []).forEach(function (c) {
      var re = new RegExp(escapeRegex(c.basic), "gi");
      findAll(re, sentence).forEach(function (m) {
        spans.push({ start: m.start, end: m.end, kind: "cihuo", issue: "基础表达，可换词伙", suggestion: "词伙升级：" + c.cihuo + "（" + c.note + "）" });
      });
    });
    return spans;
  }

  // ---------- build annotated HTML for one sentence ----------
  function annotateSentence(sentence, numRef) {
    var spans = grammarSpans(sentence).concat(chinglishSpans(sentence)).concat(upgradeSpans(sentence)).concat(cihuoSpans(sentence));
    spans.sort(function (a, b) { return a.start - b.start; });
    // 去除重叠（保留靠前的；cihuo 与 up 同类取舍：保留更具体的）
    var kept = [], lastEnd = -1;
    spans.forEach(function (s) {
      if (s.start >= lastEnd) { kept.push(s); lastEnd = s.end; }
    });
    var html = "", pos = 0;
    kept.forEach(function (s) {
      if (s.start > pos) html += esc(sentence.slice(pos, s.start));
      var cls = s.kind === "chi" ? "chi" : (s.kind === "up" ? "up" : (s.kind === "cihuo" ? "cihuo" : "gra"));
      var label = s.kind === "chi" ? "中式英语" : (s.kind === "up" ? "用词升级" : (s.kind === "cihuo" ? "词伙升级" : "语法/用词"));
      var num = numRef.n++;
      html += '<span class="anno ' + cls + '" tabindex="0">' +
        esc(sentence.slice(s.start, s.end)) +
        '<span class="num">' + num + '</span>' +
        '<span class="tip"><span class="kind">' + label + '</span><b>问题：</b>' + esc(s.issue) + '<br><b>建议：</b>' + esc(s.suggestion) + '</span>' +
        '</span>';
      pos = s.end;
    });
    html += esc(sentence.slice(pos));
    return { html: html, count: kept.length };
  }

  // ---------- 切题分析 (per paragraph) ----------
  function promptAnalysis(paras, promptText, type) {
    var stop = {}; "the a an and or but to of in on for with as is are was were be been being this that these those it its by from at we you they he she i not can will should may might".split(" ").forEach(function (w) { stop[w] = 1; });
    var pk = {};
    words(promptText).forEach(function (w) {
      var t = w.toLowerCase().replace(/[^a-z']/g, "");
      if (t.length >= 4 && !stop[t]) pk[t] = (pk[t] || 0) + 1;
    });
    var pkKeys = Object.keys(pk);
    var notes = [];
    paras.forEach(function (p, i) {
      var low = p.toLowerCase();
      var hit = 0;
      pkKeys.forEach(function (k) { if (low.indexOf(k) !== -1) hit++; });
      var ratio = pkKeys.length ? Math.round((hit / pkKeys.length) * 100) : 0;
      var sent = sentences(p);
      var advice = [];
      if (pkKeys.length === 0) {
        if (type === "task1") {
          advice.push("图片题未提供文字题目，按小作文通用标准评估：需 Overview + 数据支撑 + 四段式结构（可在下方填写图表关键词以辅助）。");
        } else {
          advice.push("未检测到题目关键词，请粘贴题目以便精准切题分析。");
        }
      } else if (ratio < 25) {
        advice.push("本段与题目关键词重叠仅 " + ratio + "%，存在偏题风险，建议紧扣题目核心词展开。");
      } else {
        advice.push("本段与题目关键词重叠 " + ratio + "%，整体切题。");
      }
      if (type === "task2") {
        if (!/\b(i (believe|think|agree|disagree|argue|contend)|in my opinion|this essay|it is (clear|evident)|from my perspective|my view)\b/i.test(p)) {
          advice.push("未见明确立场/论点句，建议开头段给出清晰 Thesis（如 I believe…）。");
        }
      } else if (type === "task1") {
        if (!/\b(overall|in general|generally|trend|majority|increase|decrease|rose|fell|dropped|peak|accounted for)\b/i.test(p)) {
          advice.push("建议补充 Overview（总体趋势/主要特征），Band 7+ 必需。");
        }
      }
      if (sent.length < 2) advice.push("段落偏短，建议至少 2–3 句以充分展开。");
      notes.push('<div class="pa"><b>第 ' + (i + 1) + ' 段</b> · ' + advice.join(" ") + '</div>');
    });
    return notes.join("");
  }

  // ---------- 参考评分（个性化 · 3/6 分制）----------
  // 小作文总分 3 分，大作文总分 6 分（权重 1:2，对应雅思写作 1/3+2/3 贡献）
  function metrics(essayText, type, minWords) {
    var w = words(essayText), wc = w.length;
    var paras = paragraphs(essayText), pc = paras.length;
    var sents = []; paras.forEach(function (p) { sentences(p).forEach(function (s) { sents.push(s); }); });
    var sc = sents.length;
    var lower = w.map(function (x) { return x.toLowerCase().replace(/[^a-z']/g, ""); }).filter(Boolean);
    var uniq = {}; lower.forEach(function (x) { uniq[x] = 1; });
    var ttr = lower.length ? Object.keys(uniq).length / lower.length : 0;
    var sentWords = sents.map(function (s) { return words(s).length; });
    var avg = sc ? wc / sc : 0, variance = 0;
    if (sc > 1) variance = sentWords.reduce(function (a, b) { return a + Math.pow(b - avg, 2); }, 0) / sc;
    var lenStd = Math.sqrt(variance);
    var graErr = 0, chiErr = 0;
    paras.forEach(function (p) {
      sentences(p).forEach(function (s) {
        graErr += grammarSpans(s).length;
        chiErr += chinglishSpans(s).length;
      });
    });
    var full = essayText.toLowerCase();
    var overview = /\b(overall|in general|generally|it is clear|it is noticeable|the most (noticeable|striking)|a striking feature|what stands out)\b/i.test(full);
    var thesis = type === "task2"
      ? /\b(i (believe|think|agree|disagree|argue|contend)|in my opinion|from my perspective|this essay will|my view|it is true that)\b/i.test(full)
      : /\b(i (believe|think|agree|disagree|feel|would like|prefer|enjoy|love|like)|in my opinion|from my perspective|my point of view|i am (writing|happy|excited|pleased)|thank you for|hope you are|looking forward)\b/i.test(full);
    return { wc: wc, pc: pc, sc: sc, ttr: ttr, avg: avg, lenStd: lenStd, sentLenVar: lenStd, graErr: graErr, chiErr: chiErr, overview: overview, thesis: thesis };
  }

  function estimateBands(m, type, minWords) {
    var ta = 6.0;
    if (m.wc < minWords * 0.7) ta = 4.0; else if (m.wc < minWords) ta = 5.0;
    if (m.pc >= (type === "task1" ? 3 : 4)) ta += 0.5; if (m.pc > 7) ta -= 0.5;
    ta = clamp(ta, 4, 9);
    var cc = 6.0;
    if (m.lenStd >= 4) cc += 0.5; if (m.pc < 3) cc -= 0.5;
    var lr = 6.0;
    if (m.ttr >= 0.5) lr += 1.0; else if (m.ttr < 0.38) lr -= 1.0;
    lr -= Math.min(1.5, (m.chiErr * 0.3 + m.graErr * 0.1));
    var gr = 6.0;
    if (m.lenStd >= 4) gr += 0.5; if (m.avg > 22) gr -= 0.5;
    gr -= Math.min(1.5, m.graErr * 0.15);
    return { tr: round1(ta), ta: round1(ta), cc: round1(cc), lr: round1(lr), gra: round1(gr) };
  }

  // 个性化细节评价（依据本篇实际指标，非套话）
  function scoreDetail(k, m, type, minWords) {
    if (k === "ta" || k === "tr") {
      if (m.wc < minWords) return "字数 " + m.wc + "/" + minWords + " 未达标，任务完成度受限。";
      if (type === "task1") return m.overview ? "已给出 Overview 并覆盖图表关键特征，任务完成良好。" : "未检测到 Overview（总体趋势/主要特征），Task Achievement 难上 7。";
      return m.thesis ? "开头立场明确、回应题目各问，Task Response 稳定。" : "未检测到明确立场/Thesis，Task Response 被压低。";
    }
    if (k === "cc") {
      if (m.pc < 3) return "段落少于 3 段，结构推进偏弱，建议合理分段（四段式）。";
      if (m.lenStd >= 4) return "句长有变化、段落推进清晰，连贯性较好。";
      return "段落结构基本连贯，可多用衔接手段、避免机械重复。";
    }
    if (k === "lr") {
      if (m.ttr >= 0.5) return "词汇多样性好（TTR " + m.ttr.toFixed(2) + "），较少见词使用到位。";
      if (m.chiErr > 0) return "检测到 " + m.chiErr + " 处中式英语/重复表达，词汇分项被扣。";
      if (m.ttr < 0.38) return "词汇重复明显（TTR " + m.ttr.toFixed(2) + "），建议扩充话题词伙。";
      return "词汇基本够用，可继续提升精准度与多样性。";
    }
    if (k === "gra") {
      if (m.graErr > 0) return "检测到 " + m.graErr + " 处语法/拼写问题，语法分项被扣；建议减少错误。";
      if (m.lenStd >= 4) return "句式多样且控制良好，语法稳健。";
      return "语法基本正确，可尝试更多复杂结构提升上限。";
    }
    return "";
  }

  function computeScore(essayText, type, minWords) {
    var m = metrics(essayText, type, minWords);
    var b = estimateBands(m, type, minWords);
    var isT1 = type === "task1";
    var alloc = isT1 ? { ta: 1.2, cc: 0.6, lr: 0.6, gra: 0.6 } : { tr: 2.4, cc: 1.2, lr: 1.2, gra: 1.2 };
    var order = isT1 ? ["ta", "cc", "lr", "gra"] : ["tr", "cc", "lr", "gra"];
    var bd = BAND[type].criteria;
    var criteria = order.map(function (k) {
      var band = b[k];
      var max = alloc[k];
      return { key: k, name: bd[k].name, band: band, pts: round1(band / 9 * max), max: max, detail: scoreDetail(k, m, type, minWords) };
    });
    var total = round1(criteria.reduce(function (a, c) { return a + c.pts; }, 0));
    var maxTotal = round1(criteria.reduce(function (a, c) { return a + c.max; }, 0));
    return { criteria: criteria, total: total, maxTotal: maxTotal, isT1: isT1, overallBand: round1(total / maxTotal * 9) };
  }

  // ---------- AEAS 评分（20 分制 · 三项标准）----------
  // Content & Organisation (7 pts) + Accuracy of Language (7 pts) + Use of Vocabulary (6 pts)
  function computeAeasScore(essayText, gradeBand) {
    var m = metrics(essayText, "aeas", 150);
    var bandData = AEAS_DATA.gradeBands[gradeBand];
    var wordRange = bandData.words.replace(/[^0-9–-]/g, "").split(/[–-]/);
    var minW = parseInt(wordRange[0]) || 120, maxW = parseInt(wordRange[1]) || 200;

    // Content & Organisation (0-7)
    var contentPts = 4.5;
    if (m.pc >= 3) contentPts += 0.5; if (m.pc >= 4) contentPts += 0.5;   // 段落结构
    if (m.thesis) contentPts += 1.0;                                        // 首段观点/主题句
    if (m.lenStd >= 4) contentPts += 0.5;                                   // 句长变化=逻辑推进
    contentPts = clamp(contentPts, 0, 7);

    // Accuracy of Language (0-7)
    var langPts = 5.5;
    langPts -= Math.min(3, m.graErr * 0.2);                                 // 语法错误扣分
    langPts -= Math.min(1, m.chiErr * 0.15);                                // 中式英语扣分
    if (m.lenStd >= 4) langPts += 0.5;                                      // 句式多样性
    if (m.avg > 25) langPts -= 0.5;                                         // 句子过长=控制力下降
    langPts = clamp(langPts, 0, 7);

    // Use of Vocabulary (0-6)
    var vocabPts = 3.5;
    if (m.ttr >= 0.5) vocabPts += 1.5; else if (m.ttr >= 0.42) vocabPts += 1.0;
    vocabPts -= Math.min(2, m.chiErr * 0.15);                               // 中式表达影响用词
    if (m.wc >= minW) vocabPts += 0.5;                                      // 词汇量展现充分
    vocabPts = clamp(vocabPts, 0, 6);

    var total = round1(contentPts + langPts + vocabPts);

    return {
      criteria: [
        {
          key: "content", name: "内容与组织", nameEn: "Content & Organisation",
          pts: round1(contentPts), max: 7,
          detail: m.pc < 3 ? "段落过少，结构不完整。建议至少 3 段（Intro-Body-Conclusion）。"
            : m.thesis ? "开头有明确主题/立场，段落推进清晰，内容组织良好。"
            : "内容基本扣题，但建议首段点明主旨/立场以提升结构分。"
        },
        {
          key: "language", name: "语言准确性", nameEn: "Accuracy of Language",
          pts: round1(langPts), max: 7,
          detail: m.graErr > 2 ? "检测到 " + m.graErr + " 处语法/拼写问题，严重影响语言准确度。建议逐句检查时态、主谓一致、标点。"
            : m.graErr > 0 ? "有少量语法错误（" + m.graErr + " 处），基本不影响理解。建议检查后修正。"
            : "语法准确度高，未检测到明显错误，表达清晰。"
        },
        {
          key: "vocab", name: "词汇运用", nameEn: "Use of Vocabulary",
          pts: round1(vocabPts), max: 6,
          detail: m.ttr < 0.38 ? "词汇重复明显（TTR " + m.ttr.toFixed(2) + "），建议用同义替换和话题词伙丰富表达。"
            : m.chiErr > 0 ? "词汇基本够用，但检测到 " + m.chiErr + " 处中式表达，建议使用词伙升级。"
            : m.ttr >= 0.5 ? "词汇丰富（TTR " + m.ttr.toFixed(2) + "），有较好的替换意识和搭配能力。"
            : "词汇使用准确，可继续扩充话题词伙和高级替换。"
        }
      ],
      total: total,
      maxTotal: 20,
      wordInfo: "字数 " + m.wc + " / 建议 " + minW + "–" + maxW + " 词"
    };
  }

  // ---------- TOEFL 评分（1-6 分制 · 2026 年新制）----------
  // Email 0-5 分 / Academic Discussion 0-5 分 → 等百分位转换 1-6 分
  function computeToeflScore(essayText, toeflType) {
    var m = metrics(essayText, toeflType, 100);
    var isDisc = toeflType === "toefl_disc";
    var rubric = isDisc ? TOEFL_SCORING.academicDiscussion : TOEFL_SCORING.writeEmail;
    var band5 = TOEFL_SCORING.band5;

    // ---- Email: 4 项指标 / Academic Discussion: 3 项指标 ----
    var pts = 0, maxPts = rubric.max;
    var details = [];

    if (isDisc) {
      // ---- Academic Discussion (0-5)：content, language, accuracy ----
      // Content: 观点是否明确、展开充分
      if (m.thesis && m.pc >= 3) pts = 3.5;
      else if (m.thesis || m.pc >= 2) pts = 2.5;
      else pts = 1.5;
      // 加分项：段落结构好、内容丰富
      if (m.pc >= 3 && m.wc >= 80) pts += 0.8;
      if (m.ttr >= 0.48) pts += 0.4;  // 词汇多样性
      // 扣分项
      pts -= Math.min(1.5, m.graErr * 0.25);
      pts -= Math.min(0.8, m.chiErr * 0.15);
      pts = clamp(pts, 0, 5);
      var discLabel = band5.filter(function(b){return b.score === Math.round(pts);})[0] || band5[0];
      details = [
        { key: "content", name: "内容与展开", nameEn: "Content & Development",
          pts: clamp(m.thesis ? (m.pc >= 2 ? 3.0 : 2.0) : 1.5, 0, 5), max: 5,
          detail: m.thesis ? "观点明确，回应了教授提问与学生观点。" : "观点不够明确，建议明确立场并回应讨论内容。" },
        { key: "language", name: "句法与词汇", nameEn: "Language Use",
          pts: clamp(3.0 - m.chiErr * 0.2 + (m.ttr >= 0.5 ? 0.5 : 0), 0, 5), max: 5,
          detail: m.ttr >= 0.5 ? "词汇和句式有一定多样性。" : m.chiErr > 0 ? "检测到 " + m.chiErr + " 处中式表达，建议使用更地道的用语。" : "语言表达基本准确。" },
        { key: "accuracy", name: "语法准确性", nameEn: "Grammar & Accuracy",
          pts: clamp(3.5 - m.graErr * 0.3, 0, 5), max: 5,
          detail: m.graErr > 2 ? "有 " + m.graErr + " 处语法/拼写错误，影响清晰度。" : m.graErr > 0 ? "有少量错误（" + m.graErr + " 处），不影响理解。" : "语法准确度高。" }
      ];
    } else {
      // ---- Email (0-5)：content, language, tone, accuracy ----
      // 基础分：根据段落和字数
      if (m.pc >= 3 && m.wc >= 100) pts = 3.5;
      else if (m.wc >= 80) pts = 2.5;
      else pts = 1.5;
      // 加分
      if (m.ttr >= 0.45) pts += 0.5;
      if (m.lenStd >= 4) pts += 0.3;  // 句式变化 = 语气自然
      // 扣分
      pts -= Math.min(1.5, m.graErr * 0.25);
      pts -= Math.min(0.8, m.chiErr * 0.15);
      pts = clamp(pts, 0, 5);
      details = [
        { key: "content", name: "内容充分性", nameEn: "Content",
          pts: clamp(m.pc >= 3 ? 3.5 : (m.pc >= 2 ? 2.5 : 1.5), 0, 5), max: 5,
          detail: m.pc >= 3 ? "回应了邮件任务要求，内容展开充分。" : "内容展开不够，建议完整回应邮件要求的三项任务。" },
        { key: "language", name: "句法与词汇", nameEn: "Language Use",
          pts: clamp(3.0 - m.chiErr * 0.2 + (m.ttr >= 0.5 ? 0.5 : 0), 0, 5), max: 5,
          detail: m.ttr < 0.4 ? "词汇有限，建议丰富表达方式。" : "词汇和句式有一定多样性。" },
        { key: "tone", name: "语体与礼貌", nameEn: "Tone & Politeness",
          pts: clamp(3.5, 0, 5), max: 5,
          detail: "请检查邮件是否有适当的称呼、礼貌用语和正式/半正式语气。" },
        { key: "accuracy", name: "语法准确性", nameEn: "Grammar & Accuracy",
          pts: clamp(3.5 - m.graErr * 0.3, 0, 5), max: 5,
          detail: m.graErr > 2 ? "有 " + m.graErr + " 处语法/拼写错误。" : "语法错误较少，整体清晰。" }
      ];
    }
    var finalBand = convertToeflRawToBand(pts, maxPts);
    return {
      criteria: details,
      total: round1(pts),
      maxTotal: maxPts,
      toeflType: toeflType,
      overallBand: finalBand,
      wordInfo: "字数 " + m.wc + (isDisc ? " / 建议 ≥ 100 词" : " / 建议 ≥ 150 词")
    };
  }

  // TOEFL 原始分 → 1-6 分转换（近似等百分位）
  function convertToeflRawToBand(rawPts, maxRaw) {
    // 简单线性映射 raw/max → 1-6，保留 0.5 分档
    var ratio = rawPts / maxRaw;
    var band = 1 + ratio * 5;
    return Math.round(band * 2) / 2;  // 四舍五入到 0.5
  }

  // ---------- PET 评分（4 subscales x 0-5 = 20 marks）----------
  // Content + Communicative Achievement + Organisation + Language
  function computePetScore(essayText, petType) {
    var m = metrics(essayText, petType, 100);
    var isEmail = petType === "pet_email";
    var isStory = petType === "pet_story";
    var isArticle = petType === "pet_article";
    var target = PET_SCORING.wordTarget; // 100

    // ---- Content (0-5) ----
    // Check if content points are addressed (based on prompt keywords)
    var contentPts;
    var wcRatio = m.wc / target;
    if (m.wc < 20) {
      contentPts = 0;
    } else if (m.wc < 50) {
      contentPts = 1.5;
    } else if (m.wc < 80) {
      contentPts = 2.5;
    } else {
      // Word count OK, check structure
      if (m.pc >= 3 && m.ttr >= 0.45) {
        contentPts = 4.5;
      } else if (m.pc >= 2) {
        contentPts = 3.5;
      } else {
        contentPts = 3;
      }
      // Boost for good topic coverage
      if (wcRatio >= 0.9 && wcRatio <= 1.3 && m.graErr <= 1) {
        contentPts = Math.min(5, contentPts + 0.5);
      }
    }

    // ---- Communicative Achievement (0-5) ----
    // Check register/appropriateness for task type
    var commPts;
    var essayLow = essayText.toLowerCase();
    if (isEmail) {
      // Email: check for greeting and closing
      var hasGreeting = /^(hi|dear|hello|hey)/i.test(essayText.trim());
      var hasClosing = /(best|regards|cheers|see you|love|thanks|sincerely|yours)/i.test(essayText.slice(-100));
      var hasQuestions = /\?/.test(essayText);
      if (hasGreeting && hasClosing && hasQuestions) commPts = 4.5;
      else if (hasGreeting && hasClosing) commPts = 4;
      else if (hasGreeting || hasClosing) commPts = 3;
      else commPts = 2;
    } else if (isStory) {
      // Story: check narrative quality (past tense, descriptive language)
      var pastTense = (essayLow.match(/\b(was|were|went|said|saw|came|looked|walked|found|decided|felt|knew|heard|told|began|started|stopped|arrived|opened|smiled|ran|jumped|fell)\b/g) || []).length;
      if (pastTense >= 5 && m.sentLenVar > 3) commPts = 4.5;
      else if (pastTense >= 3) commPts = 3.5;
      else if (pastTense >= 1) commPts = 3;
      else commPts = 2;
    } else {
      // Article: check for opinion expressions and topic engagement
      var opinionWords = (essayLow.match(/\b(in my opinion|i think|i believe|personally|i would argue|from my perspective|in conclusion|to sum up|overall|furthermore|moreover|however|although)\b/g) || []).length;
      if (opinionWords >= 3 && m.pc >= 3) commPts = 4.5;
      else if (opinionWords >= 2) commPts = 4;
      else if (opinionWords >= 1) commPts = 3;
      else commPts = 2.5;
    }
    // Word count penalty
    if (m.wc < 60) commPts = Math.min(commPts, 2);

    // ---- Organisation (0-5) ----
    var orgPts;
    if (m.pc >= 3 && m.sentLenVar > 4) {
      orgPts = 4.5;
    } else if (m.pc >= 2 && m.sentLenVar > 2) {
      orgPts = 3.5;
    } else if (m.pc >= 2) {
      orgPts = 3;
    } else if (m.wc >= 50) {
      orgPts = 2.5;
    } else {
      orgPts = 2;
    }
    // Check for linking words
    var linkWords = (essayLow.match(/\b(however|although|because|so|also|then|after|before|when|while|but|and|firstly|secondly|finally|in addition|for example|such as)\b/g) || []).length;
    if (linkWords >= 4) orgPts = Math.min(5, orgPts + 0.5);
    if (linkWords <= 1 && m.wc >= 80) orgPts = Math.max(1, orgPts - 0.5);

    // ---- Language (0-5) ----
    var langPts;
    if (m.graErr === 0 && m.ttr >= 0.5) {
      langPts = 4.5;
      if (m.wc >= 90 && m.wc <= 120) langPts = 5;
    } else if (m.graErr <= 1 && m.ttr >= 0.42) {
      langPts = 4;
    } else if (m.graErr <= 3) {
      langPts = 3;
    } else if (m.graErr <= 5) {
      langPts = 2;
    } else {
      langPts = 1;
    }
    // Chinglish penalty
    if (m.chiErr > 0) langPts = Math.max(0, langPts - 0.5);

    // Round to nearest 0.5
    function roundHalf(v) { return Math.round(v * 2) / 2; }
    contentPts = roundHalf(contentPts);
    commPts = roundHalf(commPts);
    orgPts = roundHalf(orgPts);
    langPts = roundHalf(langPts);

    var total = contentPts + commPts + orgPts + langPts;

    var typeLabel = isEmail ? "Part 1 Email" : isStory ? "Part 2 Story" : "Part 2 Article";

    return {
      criteria: [
        {
          key: "content", name: "内容", nameEn: "Content",
          pts: contentPts, max: 5,
          detail: m.wc < 50 ? "字数严重不足（" + m.wc + " 词），内容要点可能未充分覆盖。PET Part 1 邮件需回应全部 4 个要点。" :
            m.wc < 80 ? "字数偏少（" + m.wc + " 词），建议扩展内容至 100 词左右。" :
            contentPts >= 4.5 ? "内容要点覆盖充分，信息传达清晰。" :
            contentPts >= 3 ? "内容基本覆盖，但部分要点展开不足，建议补充细节。" :
            "内容覆盖不足，请检查是否遗漏了题目要求的内容点。"
        },
        {
          key: "comm", name: "交际达成", nameEn: "Communicative Achievement",
          pts: commPts, max: 5,
          detail: isEmail ?
            (commPts >= 4 ? "邮件格式规范（称呼+结尾），语体恰当，能吸引读者注意。" :
             commPts >= 3 ? "邮件基本符合格式要求，但称呼或结尾可能缺失，注意补充。" :
             "邮件格式不规范，请添加 Hi/Dear 开头和 Best wishes/See you 结尾。") :
            isStory ?
            (commPts >= 4 ? "叙事引人入胜，使用了过去时态和描写性语言，能吸引读者。" :
             commPts >= 3 ? "叙事基本完整，但时态或描写不够丰富，建议增加细节。" :
             "叙事不完整，请检查时态（故事通常用过去时）和情节发展。") :
            (commPts >= 4 ? "文章风格恰当，有明确观点表达，适合杂志/网站读者。" :
             commPts >= 3 ? "文章基本表达了观点，但可以更明确地使用 In my opinion/I believe 等句型。" :
             "文章缺乏明确观点表达，建议使用 opinion 句型和连接词。")
        },
        {
          key: "org", name: "组织", nameEn: "Organisation",
          pts: orgPts, max: 5,
          detail: orgPts >= 4 ? "段落清晰，使用了连接词（however, because, also 等），行文连贯。" :
            orgPts >= 3 ? "有基本的段落划分，但连接词使用较少，建议增加衔接手段。" :
            "段落不清晰或缺少连接词，建议分段并使用 however, although, so 等连接句子。"
        },
        {
          key: "lang", name: "语言", nameEn: "Language",
          pts: langPts, max: 5,
          detail: m.graErr === 0 && m.ttr >= 0.5 ? "语法准确，词汇丰富（TTR " + m.ttr.toFixed(2) + "），语言控制力好。" :
            m.graErr <= 1 ? "语法基本准确（" + m.graErr + " 处错误），词汇使用恰当。可尝试使用更复杂的句型。" :
            m.graErr <= 3 ? "有 " + m.graErr + " 处语法错误，建议检查时态、主谓一致和冠词。" :
            "语法错误较多（" + m.graErr + " 处），可能影响理解。建议逐句检查时态、主谓一致、标点。" +
            (m.chiErr > 0 ? " 检测到 " + m.chiErr + " 处中式表达，请参考中式英语修改建议。" : "")
        }
      ],
      total: total,
      maxTotal: 20,
      petType: petType,
      typeLabel: typeLabel,
      wordInfo: "字数 " + m.wc + " / 目标 " + target + " 词"
    };
  }

  // ---------- KET 评分（3 criteria x 0-5 = 15 marks per part）----------
  // Content 0-5 + Organisation 0-5 + Language 0-5 = 15 per Part 6/Part 7
  function computeKetScore(essayText, ketType) {
    var isPic = ketType === "ket_pic";
    var isEmail = ketType === "ket_email";
    var target = isEmail ? 25 : 35;
    var m = metrics(essayText, ketType, target);

    // Round to nearest 0.5
    function roundHalf(v) { return Math.round(v * 2) / 2; }

    // ---- Content (0-5) ----
    var contentPts;
    if (m.wc < 10) {
      contentPts = 0; // too short
    } else if (m.wc < target * 0.6) {
      contentPts = 1.5;
    } else if (m.wc < target * 0.85) {
      contentPts = 2.5;
    } else {
      contentPts = 3.5;
      if (m.wc >= target && m.wc <= target * 1.6) contentPts += 0.5; // good length
      if (isPic && m.pc >= 2) contentPts += 0.5; // multiple paragraphs for story = all pics covered
      if (isEmail && m.pc >= 1) contentPts += 0.5;
      contentPts = Math.min(5, contentPts);
    }

    // ---- Organisation (0-5) ----
    var orgPts;
    // Check for basic linking words (KET level)
    var linkWords = (essayText.toLowerCase().match(/\b(and|but|because|so|then|after|first|finally|next)\b/g) || []).length;
    var hasSequence = /\b(first|then|after|finally|next|last|one day)\b/i.test(essayText);

    if (m.wc < 10) {
      orgPts = 0;
    } else if (m.wc < target * 0.6) {
      orgPts = 1.5;
    } else {
      orgPts = 2.5;
      if (linkWords >= 3 && hasSequence) orgPts += 1;
      else if (linkWords >= 2) orgPts += 0.5;
      if (m.pc >= 2) orgPts += 0.5; // multiple paragraphs
      orgPts = Math.min(5, orgPts);
    }

    // ---- Language (0-5) ----
    var langPts;
    if (m.wc < 10) {
      langPts = 0;
    } else if (m.graErr <= 1 && m.ttr >= 0.55) {
      langPts = 4.5;
      if (m.wc >= target) langPts = 5;
    } else if (m.graErr <= 2 && m.ttr >= 0.45) {
      langPts = 4;
    } else if (m.graErr <= 4) {
      langPts = 3;
    } else if (m.graErr <= 6) {
      langPts = 2;
    } else {
      langPts = 1;
    }
    if (m.chiErr > 0) langPts = Math.max(0, langPts - 0.5);

    contentPts = roundHalf(contentPts);
    orgPts = roundHalf(orgPts);
    langPts = roundHalf(langPts);

    var total = contentPts + orgPts + langPts;
    var typeLabel = isEmail ? "Part 6 Email" : "Part 7 Picture Story";

    return {
      criteria: [
        {
          key: "content", name: "内容", nameEn: "Content",
          pts: contentPts, max: 5,
          detail: m.wc < target * 0.6
            ? "字数严重不足（" + m.wc + " 词），内容要点可能未覆盖。KET " + (isEmail ? "邮件需回应3个要点" : "图片故事需描述全部3幅图") + "。"
            : m.wc < target
            ? "字数偏少（" + m.wc + " 词），建议达到 " + target + " 词左右以确保内容充分展开。"
            : contentPts >= 4.5
            ? "内容要点覆盖充分，信息传达清晰。" + (isPic ? "已描述三幅图的内容。" : "已回应邮件中的三个要点。")
            : contentPts >= 3
            ? "内容基本覆盖，但可能有要点遗漏或展开不足。"
            : "内容覆盖不足，请检查是否遗漏了题目要求的内容点。"
        },
        {
          key: "org", name: "组织", nameEn: "Organisation",
          pts: orgPts, max: 5,
          detail: orgPts >= 4
            ? "行文有逻辑顺序，使用了 and/but/because/then 等连接词，结构清晰。"
            : orgPts >= 3
            ? "有基本的时间/逻辑顺序，但连接词使用较少。建议多用 and, but, then, because。"
            : "衔接不足，句子之间缺乏连接词。建议加入 and, but, then, because 等基本连词。"
        },
        {
          key: "lang", name: "语言", nameEn: "Language",
          pts: langPts, max: 5,
          detail: m.graErr <= 1 && m.ttr >= 0.55
            ? "语法准确、词汇恰当（TTR " + m.ttr.toFixed(2) + "），A2 水平表现优秀。"
            : m.graErr <= 2
            ? "有少量语法错误（" + m.graErr + " 处），基本不影响理解。"
            : m.graErr <= 4
            ? "有 " + m.graErr + " 处语法错误，建议检查主谓一致、时态和拼写。"
            : "语法错误较多（" + m.graErr + " 处），可能影响理解。建议逐句修正。" +
              (m.chiErr > 0 ? " 检测到 " + m.chiErr + " 处中式表达。" : "")
        }
      ],
      total: total,
      maxTotal: 15,
      ketType: ketType,
      typeLabel: typeLabel,
      wordInfo: "字数 " + m.wc + " / 目标 " + target + " 词"
    };
  }

  // ---------- KET 审题分析 ----------
  function ketAnalysis(paras, promptText, ketType) {
    var notes = [];
    var isEmail = ketType === "ket_email";
    var isPic = ketType === "ket_pic";
    var typeLabel = isEmail ? "Part 6 Email" : "Part 7 Picture Story";

    notes.push('<div class="pa"><b>KET ' + typeLabel + '</b> · A2 Key · 2020 新制 · ' + (isEmail ? '~25 词' : '~35 词') + ' · 30 分钟</div>');
    notes.push('<div class="pa"><b>评分标准</b> · 3 项各 0-5 分（共 15 分）：Content 内容 + Organisation 组织 + Language 语言</div>');

    if (isEmail) {
      notes.push('<div class="pa"><b>审题要点</b> · 邮件只要求回复 <b>3 个要点</b>（notes/instructions）。须逐一回应，不能遗漏。</div>');
      notes.push('<div class="pa"><b>结构建议</b> · Hi/Dear + 名字 → 回应要点1 → 回应要点2 → 回应要点3 → 结束语（From/See you/Love）→ 签名</div>');
      notes.push('<div class="pa"><b>语体</b> · 非正式（写给朋友/同学/老师），25-35 词即可。不要写无关内容。</div>');
      notes.push('<div class="pa" style="color:var(--warn)"><b>⚠ 注意</b> · KET 邮件只需 25 词左右，不要写太长。每个要点 1-2 句话即可。</div>');
    } else {
      notes.push('<div class="pa"><b>审题要点</b> · 图片故事需要描述 <b>全部三幅图</b>，按顺序叙述，形成完整故事。</div>');
      notes.push('<div class="pa"><b>结构建议</b> · First/One day → 第一幅图 → Then/After that → 第二幅图 → Finally/In the end → 第三幅图</div>');
      notes.push('<div class="pa"><b>时态</b> · 故事以 <b>过去时</b> 为主（was/went/said/saw/did），描述已经发生的事。约 35 词。</div>');
      notes.push('<div class="pa" style="color:var(--warn)"><b>⚠ 注意</b> · 必须提及全部三幅图，不能只写一幅或两幅。注意保持时态一致。</div>');
    }

    // 易错语法提醒
    notes.push('<div class="pa"><b>易错语法自检</b> · ' + KET_SCORING.grammarTips.slice(0, 4).join(" ") + '</div>');

    // 关键词分析
    var stop = {}; "the a an and or but to of in on for with as is are was were be been being this that these those it its by from at we you they he she i not can will should may might".split(" ").forEach(function (w) { stop[w] = 1; });
    var pk = {}; words(promptText).forEach(function (ww) {
      var t = ww.toLowerCase().replace(/[^a-z']/g, ""); if (t.length >= 3 && !stop[t]) pk[t] = 1;
    });
    var pkKeys = Object.keys(pk);
    if (pkKeys.length === 0) {
      notes.push('<div class="pa"><b>提示</b> · 请粘贴题目（邮件原文+notes / 图片场景描述），以便精准切题分析。</div>');
    } else {
      paras.forEach(function (p, i) {
        var low = p.toLowerCase(), hit = 0;
        pkKeys.forEach(function (k) { if (low.indexOf(k) !== -1) hit++; });
        var ratio = pkKeys.length ? Math.round((hit / pkKeys.length) * 100) : 0;
        notes.push('<div class="pa"><b>第 ' + (i + 1) + ' 段</b> · 与题目关键词重叠 ' + ratio + '%' + (ratio < 25 ? '，存在偏题风险。' : '，整体切题。') + '</div>');
      });
    }
    return notes.join("");
  }

  // ---------- 高考评分 (天津高考英语写作 25分制) ----------
  function computeGaokaoScore(essayText) {
    var m = metrics(essayText, "gaokao", 100);
    var S = GAOKAO_SCORING;
    var clamp = function (v, lo, hi) { return Math.max(lo, Math.min(hi, v)); };

    // 内容 (0-10): 要点覆盖 + 词数
    var contentPts = 4.0;
    if (m.wc >= 100) contentPts += 3.0;
    else if (m.wc >= 80) contentPts += 2.0;
    else if (m.wc >= 60) contentPts += 1.0;
    if (m.pc >= 3) contentPts += 2.0;
    else if (m.pc >= 2) contentPts += 1.5;
    if (m.thesis) contentPts += 1.0;
    contentPts = clamp(contentPts, 0, 10);

    // 语法结构与词汇 (0-7)
    var langPts = 5.0;
    var errRate = m.sc > 0 ? m.graErr / m.sc : 0;
    if (errRate > 1.5) langPts -= 2.5;
    else if (errRate > 1.0) langPts -= 1.5;
    else if (errRate > 0.5) langPts -= 0.5;
    if (m.ttr > 0.6) langPts += 1.5;
    else if (m.ttr > 0.5) langPts += 0.8;
    // 中式英语扣分
    if (m.chiErr > 3) langPts -= 1.0;
    else if (m.chiErr > 1) langPts -= 0.5;
    langPts = clamp(langPts, 0, 7);

    // 衔接与连贯 (0-5)
    var cohPts = 2.5;
    if (m.pc >= 3) cohPts += 1.5;
    if (m.sentLenVar > 3) cohPts += 1.0; // 句长多样性
    if (m.wc >= 100) cohPts += 0.5;
    cohPts = clamp(cohPts, 0, 5);

    // 整体效果 (0-3)
    var effPts = 1.5;
    if (m.wc >= 100 && m.graErr < m.sc * 0.5) effPts += 1.0;
    if (m.ttr > 0.55 && m.pc >= 3) effPts += 0.5;
    effPts = clamp(effPts, 0, 3);

    var total = contentPts + langPts + cohPts + effPts;
    // 词数扣分
    var wordInfo = "";
    if (m.wc < 100) { total -= 2; wordInfo = "词数 " + m.wc + " < 100，扣 2 分"; }
    else { wordInfo = "词数 " + m.wc; }
    // 拼写扣分
    var spellErr = Math.floor(m.graErr * 0.3);
    if (spellErr > 0) {
      var spellDeduct = Math.min(3, Math.floor(spellErr / 3));
      total -= spellDeduct;
      if (spellDeduct > 0) wordInfo += " · 拼写扣 " + spellDeduct + " 分";
    }
    total = clamp(total, 0, 25);

    // 确定档位
    var tierLabel = "";
    if (total >= 21) tierLabel = "第五档 (很好) 21-25";
    else if (total >= 16) tierLabel = "第四档 (好) 16-20";
    else if (total >= 11) tierLabel = "第三档 (一般) 11-15";
    else if (total >= 6) tierLabel = "第二档 (较差) 6-10";
    else if (total >= 1) tierLabel = "第一档 (差) 1-5";
    else tierLabel = "零分";

    var details = [
      { key: "content", name: "内容要点", nameEn: "Content", pts: contentPts, max: 10,
        detail: "要点覆盖" + (m.pc >= 3 ? "全面" : m.pc >= 2 ? "基本覆盖" : "不足") + "，词数" + (m.wc >= 100 ? "达标" : "不足") },
      { key: "language", name: "语法结构与词汇", nameEn: "Grammar & Vocabulary", pts: langPts, max: 7,
        detail: "语法错误率 " + errRate.toFixed(1) + "/句，TTR " + m.ttr.toFixed(2) + (m.chiErr > 0 ? "，中式英语 " + m.chiErr + " 处" : "") },
      { key: "coherence", name: "衔接与连贯", nameEn: "Cohesion & Coherence", pts: cohPts, max: 5,
        detail: "段落数 " + m.pc + "，句长方差 " + m.sentLenVar.toFixed(1) },
      { key: "effect", name: "整体效果", nameEn: "Overall Effect", pts: effPts, max: 3,
        detail: m.wc >= 100 && m.graErr < m.sc * 0.5 ? "整体表达流畅" : "整体表达有待提升" }
    ];

    return {
      criteria: details,
      total: total,
      maxTotal: 25,
      tierLabel: tierLabel,
      wordInfo: wordInfo,
      typeLabel: "书面表达"
    };
  }

  // ---------- 高考审题分析 (含采分点/框架/词汇) ----------
  function gaokaoAnalysis(paras, promptText) {
    var notes = [];
    notes.push('<div class="pa"><b>天津高考英语写作</b> · 书面表达 · 25 分 · 词数不少于 100</div>');
    notes.push('<div class="pa"><b>评分标准</b> · 4 维度：内容要点(10) + 语法结构与词汇(7) + 衔接与连贯(5) + 整体效果(3) = 25 分</div>');
    notes.push('<div class="pa"><b>5 档评分</b> · 第五档 21-25 / 第四档 16-20 / 第三档 11-15 / 第二档 6-10 / 第一档 1-5</div>');

    // 采分点分析
    notes.push('<div class="pa"><b>采分点分析</b> · 内容占 40%（要点全覆盖是基础），语言占 28%（语法+词汇），连贯占 20%，整体效果占 12%</div>');
    notes.push('<div class="pa"><b>提分路径</b> · 基础档(80-95)→三段式+基础过渡词 → 提升档(105-120)→复合句+高分词组 → 精品档(125-135+)→倒装/强调/非谓语+用词替换</div>');

    // 高分用词参考
    if (typeof GAOKAO_SCORING !== "undefined" && GAOKAO_SCORING.upgrades) {
      var ups = GAOKAO_SCORING.upgrades.slice(0, 6).map(function (u) {
        return u.basic + "→" + u.advanced.slice(0, 2).join("/");
      });
      notes.push('<div class="pa"><b>用词替换参考</b> · ' + ups.join("；") + "</div>");
    }

    // 全文框架
    notes.push('<div class="pa"><b>三段式框架</b> · 开头段(自我介绍+写信目的) → 中间段(逐一覆盖要点,每点1-2句) → 结尾段(礼貌收尾+期待回复)</div>');
    notes.push('<div class="pa"><b>精品档"三个一"法则</b> · 1个高级句型(倒装/强调/虚拟) + 1个非谓语结构(分词作状语) + 1个同位语/独立主格</div>');

    // 关键词切题分析
    var stop = {}; "the a an and or but to of in on for with as is are was were be been being this that these those it its by from at we you they he she i not can will should may might".split(" ").forEach(function (w) { stop[w] = 1; });
    var pk = {}; words(promptText).forEach(function (ww) {
      var t = ww.toLowerCase().replace(/[^a-z']/g, ""); if (t.length >= 3 && !stop[t]) pk[t] = 1;
    });
    var pkKeys = Object.keys(pk);
    if (pkKeys.length === 0) {
      notes.push('<div class="pa"><b>提示</b> · 请上传/粘贴题目图片或文字，以便精准切题分析。</div>');
    } else {
      paras.forEach(function (p, i) {
        var low = p.toLowerCase(), hit = 0;
        pkKeys.forEach(function (k) { if (low.indexOf(k) !== -1) hit++; });
        var ratio = pkKeys.length ? Math.round((hit / pkKeys.length) * 100) : 0;
        notes.push('<div class="pa"><b>第 ' + (i + 1) + ' 段</b> · 与题目关键词重叠 ' + ratio + '%' + (ratio < 25 ? '，存在偏题风险。' : '，整体切题。') + '</div>');
      });
    }

    // 易错提醒
    if (typeof GAOKAO_SCORING !== "undefined" && GAOKAO_SCORING.grammarTips) {
      notes.push('<div class="pa"><b>官方评分提醒</b> · ' + GAOKAO_SCORING.grammarTips.slice(0, 4).join(" ") + '</div>');
    }

    // 书信格式检查
    var fullText = paras.join("\n");
    var formatIssues = [];
    if (!/\bDear\s+\w+/i.test(fullText)) formatIssues.push("缺少称呼语（如 Dear Chris,）");
    if (!/\b(yours|sincerely|regards|best wishes|faithfully)\b/i.test(fullText)) formatIssues.push("缺少结尾落款（如 Yours sincerely,）");
    if (!/\bDear\s+\w+,/i.test(fullText) && /\bDear\s+\w+/i.test(fullText)) formatIssues.push("Dear 后缺少逗号");
    if (formatIssues.length > 0) {
      notes.push('<div class="pa"><b>书信格式检查</b> · ' + formatIssues.join("；") + '</div>');
    } else {
      notes.push('<div class="pa"><b>书信格式检查</b> · 称呼与落款格式规范 ✓</div>');
    }

    // 体裁自动识别 + 匹配模板
    var genre = detectGaokaoGenre(promptText);
    if (genre) {
      var fw = getGaokaoFramework(genre);
      notes.push('<div class="pa"><b>体裁识别</b> · 检测为「' + esc(genre) + '」' + (fw ? '（历年出现 ' + esc(fw.frequency) + '）' : '') + '</div>');
      if (fw) {
        notes.push('<div class="pa"><b>结构建议</b> · ' + esc(fw.structure) + '</div>');
        notes.push('<div class="pa"><b>高分模板</b><br><pre style="white-space:pre-wrap;margin:4px 0 0;padding:6px 8px;background:rgba(0,0,0,.03);border-radius:4px;font-size:13px">' + esc(fw.template) + '</pre></div>');
      }
    } else if (promptText) {
      notes.push('<div class="pa"><b>体裁识别</b> · 未匹配到特定体裁模板，建议按通用三段式写作</div>');
    }

    return notes.join("");
  }

  function renderRef(type) {
    el.vocabList.innerHTML = ADVANCED_VOCAB.map(function (v) {
      return '<li><span class="ph">' + v.phrase + '</span> <span class="cn">· ' + v.cn + '</span>' +
        '<span class="ex">' + esc(v.ex) + '</span></li>';
    }).join("");

    var b = BAND[type];
    var keys = Object.keys(b.criteria);
    el.bandRef.innerHTML = keys.map(function (k) {
      var c = b.criteria[k];
      var rows = [9, 8, 7, 6, 5].map(function (bd) {
        return '<div class="row"><span class="band">' + bd + '</span><span>' + esc(c[bd]) + '</span></div>';
      }).join("");
      return '<div class="bc"><h5>' + esc(c.name) + '</h5>' + rows + '</div>';
    }).join("");
  }

  // ---------- 句型库弹窗 ----------
  function openModal(id) { document.getElementById(id).classList.remove("hidden"); }
  function closeModal(id) { document.getElementById(id).classList.add("hidden"); }

  function renderPatterns(catKey) {
    var cats = Object.keys(TASK1_PATTERNS);
    if (!catKey) catKey = cats[0];
    el.patternTabs.innerHTML = cats.map(function (k) {
      return '<span class="cat-tab ' + (k === catKey ? "active" : "") + '" data-cat="' + k + '">' + TASK1_PATTERNS[k].title.split(" ")[0] + '</span>';
    }).join("");
    Array.prototype.slice.call(el.patternTabs.querySelectorAll(".cat-tab")).forEach(function (t) {
      t.addEventListener("click", function () { renderPatterns(t.getAttribute("data-cat")); });
    });
    var c = TASK1_PATTERNS[catKey];
    el.patternBody.innerHTML = '<div class="pat-cat"><h4>' + esc(c.title) + '</h4>' +
      (c.note ? '<div class="note">' + esc(c.note) + '</div>' : "") +
      c.items.map(function (it) {
        return '<div class="pat-item"><div class="en">' + esc(it.en) + '</div><div class="zh">' + esc(it.zh) + '</div></div>';
      }).join("") + '</div>';
    el.simonRules.innerHTML = SIMON_PRINCIPLES.rules.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join("");
  }

  // ---------- 真题题库弹窗 ----------
  function renderBank() {
    var q = (el.bankSearch.value || "").trim().toLowerCase();
    var typeF = el.bankType.value;
    var list = (window.QUESTION_BANK || []).filter(function (x) {
      if (typeF && x.t !== typeF) return false;
      if (!q) return true;
      return (x.q + " " + x.s + " " + x.p + " " + x.d).toLowerCase().indexOf(q) !== -1;
    });
    el.bankCount.textContent = "共 " + (window.QUESTION_BANK || []).length + " 篇真题 · 命中 " + list.length;
    if (!list.length) { el.bankList.innerHTML = '<div class="bank-empty">未找到匹配的真题，换个关键词试试。</div>'; return; }
    el.bankList.innerHTML = list.slice(0, 200).map(function (x) {
      var tcls = x.t === "Task 1" ? "t1" : "t2";
      return '<div class="bank-item" data-i="' + x.i + '">' +
        '<div class="bank-meta">' +
          '<span class="bank-tag ' + tcls + '">' + esc(x.t) + '</span>' +
          '<span class="bank-tag sub">' + esc(x.s) + '</span>' +
          (x.p ? '<span class="bank-tag topic">' + esc(x.p) + '</span>' : "") +
          '<span class="bank-date">' + esc(x.d) + '</span>' +
        '</div>' +
        '<div class="bank-q">' + esc(x.q) + '</div>' +
      '</div>';
    }).join("") + (list.length > 200 ? '<div class="bank-empty">仅显示前 200 条，请缩小搜索范围。</div>' : "");
    Array.prototype.slice.call(el.bankList.querySelectorAll(".bank-item")).forEach(function (it) {
      it.addEventListener("click", function () {
        var item = (window.QUESTION_BANK || []).filter(function (b) { return b.i == it.getAttribute("data-i"); })[0];
        if (item) selectQuestion(item);
      });
    });
  }

  function normBank(item) {
    return { idx: item.i, date: item.d, task: item.t, subtype: item.s, topic: item.p, q: item.q };
  }

  function selectQuestion(item) {
    selectedQuestion = normBank(item);
    el.prompt.value = item.q;
    closeModal("bankModal");
    renderPlaybook();
    el.essay.focus();
  }

  // ---------- PET 真题题库弹窗 ----------
  var PET_ALL = []; // 缓存合并数据

  function getPetAll() {
    if (PET_ALL.length) return PET_ALL;
    var emails = (window.PET_EMAIL_PROMPTS || []).map(function (e) {
      return { id: e.id, type: "email", typeLabel: "Part 1 · Email", source: e.source, title: e.subject || "Email", display: "From: " + esc(e.from) + " | " + esc(e.subject), body: e.body, notes: e.notes || [] };
    });
    var articles = (window.PET_ARTICLE_PROMPTS || []).map(function (a) {
      return { id: a.id, type: "article", typeLabel: "Part 2 · Article", source: a.source, title: a.title, display: esc(a.title), body: a.body, notes: a.hints ? [a.hints] : [] };
    });
    var stories = (window.PET_STORY_PROMPTS || []).map(function (s) {
      return { id: s.id, type: "story", typeLabel: "Part 2 · Story", source: s.source, title: "Story", display: esc(s.openingSentence), body: s.openingSentence, notes: s.hints ? [s.hints] : [] };
    });
    PET_ALL = emails.concat(articles).concat(stories);
    return PET_ALL;
  }

  function renderPetBank() {
    var all = getPetAll();
    var q = (el.petBankSearch.value || "").trim().toLowerCase();
    var typeF = el.petBankType.value;
    var list = all.filter(function (x) {
      if (typeF && x.type !== typeF) return false;
      if (!q) return true;
      return (x.body + " " + x.title + " " + x.display + " " + x.source).toLowerCase().indexOf(q) !== -1;
    });
    el.petBankCount.textContent = "共 " + all.length + " 篇真题 · 命中 " + list.length;
    if (!list.length) { el.petBankList.innerHTML = '<div class="bank-empty">未找到匹配的 PET 真题，换个关键词试试。</div>'; return; }
    el.petBankList.innerHTML = list.slice(0, 200).map(function (x) {
      var tcls = x.type === "email" ? "t1" : (x.type === "article" ? "t2" : "t3");
      return '<div class="bank-item pet-item" data-id="' + x.id + '" data-type="' + x.type + '">' +
        '<div class="bank-meta">' +
          '<span class="bank-tag ' + tcls + '">' + esc(x.typeLabel) + '</span>' +
          '<span class="bank-date">' + esc(x.source) + '</span>' +
        '</div>' +
        '<div class="bank-q">' + x.display + '</div>' +
      '</div>';
    }).join("") + (list.length > 200 ? '<div class="bank-empty">仅显示前 200 条，请缩小搜索范围。</div>' : "");
    Array.prototype.slice.call(el.petBankList.querySelectorAll(".pet-item")).forEach(function (it) {
      it.addEventListener("click", function () {
        var id = it.getAttribute("data-id");
        var type = it.getAttribute("data-type");
        var item = all.filter(function (x) { return x.id === id; })[0];
        if (item) selectPetQuestion(item, type);
      });
    });
  }

  function selectPetQuestion(item, petType) {
    var promptText = "";
    if (petType === "email") {
      promptText = item.body + "\n\nNotes:\n" + item.notes.map(function (n) { return "- " + n; }).join("\n");
    } else if (petType === "article") {
      promptText = item.body;
    } else {
      promptText = "Your story must begin with this sentence:\n" + item.body + "\n\nWrite your story.";
    }
    // 设置题目：图片模式考试写入 imgCaption，文字模式写入 prompt
    var imageTypes = ["task1", "ket_pic", "ket_email", "pet_email"];
    var examKey = petType === "email" ? "pet_email" : (petType === "article" ? "pet_article" : "pet_story");
    if (imageTypes.indexOf(examKey) !== -1) {
      el.imgCaption.value = promptText;
    } else {
      el.prompt.value = promptText;
    }
    var examItem = el.examList.querySelector('[data-type="' + examKey + '"]');
    if (examItem) examItem.click();
    closeModal("petBankModal");
    el.essay.focus();
  }

  // ---------- KET 真题题库弹窗 ----------
  var KET_ALL = []; // 缓存合并数据

  function getKetAll() {
    if (KET_ALL.length) return KET_ALL;
    var emails = (window.KET_EMAIL_PROMPTS || []).map(function (e) {
      return { id: e.id, type: "email", typeLabel: "Part 6 · Email", source: e.source, title: e.subject || "Email", display: "From: " + esc(e.from) + " | " + esc(e.subject), body: e.body, notes: e.notes || [] };
    });
    var pictures = (window.KET_PICTURE_PROMPTS || []).map(function (p) {
      return { id: p.id, type: "picture", typeLabel: "Part 7 · Picture Story", source: p.source, title: p.title, display: esc(p.title + " - " + p.desc.slice(0, 40) + "..."), body: p.prompt + "\n\n" + p.pictures.join("\n"), notes: p.pictures || [], desc: p.desc };
    });
    KET_ALL = emails.concat(pictures);
    return KET_ALL;
  }

  function renderKetBank() {
    var all = getKetAll();
    var q = (el.ketBankSearch.value || "").trim().toLowerCase();
    var typeF = el.ketBankType.value;
    var list = all.filter(function (x) {
      if (typeF && x.type !== typeF) return false;
      if (!q) return true;
      return (x.body + " " + x.title + " " + x.display + " " + x.source).toLowerCase().indexOf(q) !== -1;
    });
    el.ketBankCount.textContent = "共 " + all.length + " 篇真题 · 命中 " + list.length;
    if (!list.length) { el.ketBankList.innerHTML = '<div class="bank-empty">未找到匹配的 KET 真题，换个关键词试试。</div>'; return; }
    el.ketBankList.innerHTML = list.slice(0, 200).map(function (x) {
      var tcls = x.type === "email" ? "t1" : "t3";
      return '<div class="bank-item ket-item" data-id="' + x.id + '" data-type="' + x.type + '">' +
        '<div class="bank-meta">' +
          '<span class="bank-tag ' + tcls + '">' + esc(x.typeLabel) + '</span>' +
          '<span class="bank-date">' + esc(x.source) + '</span>' +
        '</div>' +
        '<div class="bank-q">' + x.display + '</div>' +
      '</div>';
    }).join("") + (list.length > 200 ? '<div class="bank-empty">仅显示前 200 条，请缩小搜索范围。</div>' : "");
    Array.prototype.slice.call(el.ketBankList.querySelectorAll(".ket-item")).forEach(function (it) {
      it.addEventListener("click", function () {
        var id = it.getAttribute("data-id");
        var type = it.getAttribute("data-type");
        var item = all.filter(function (x) { return x.id === id; })[0];
        if (item) selectKetQuestion(item, type);
      });
    });
  }

  function selectKetQuestion(item, ketType) {
    var promptText = "";
    if (ketType === "email") {
      promptText = item.body + "\n\nNotes:\n" + item.notes.map(function (n) { return "- " + n; }).join("\n");
    } else {
      promptText = item.body;
    }
    // 设置题目：图片模式考试写入 imgCaption，文字模式写入 prompt
    var imageTypes = ["task1", "ket_pic", "ket_email", "pet_email"];
    var examKey = ketType === "email" ? "ket_email" : "ket_pic";
    if (imageTypes.indexOf(examKey) !== -1) {
      el.imgCaption.value = promptText;
    } else {
      el.prompt.value = promptText;
    }
    var examItem = el.examList.querySelector('[data-type="' + examKey + '"]');
    if (examItem) examItem.click();
    closeModal("ketBankModal");
    el.essay.focus();
  }

  // ---------- 高考真题题库弹窗 ----------
  function renderGaokaoBank() {
    var real = (window.GAOKAO_PROMPTS || []).map(function (x) { x._mock = false; return x; });
    var mock = (window.GAOKAO_MOCK_PROMPTS || []).map(function (x) { x._mock = true; return x; });
    var all = real.concat(mock).sort(function (a, b) {
      return b.year - a.year || (b._mock ? 0 : 1) - (a._mock ? 0 : 1) || b.month - a.month;
    });
    var q = (el.gaokaoBankSearch.value || "").trim().toLowerCase();
    var typeF = el.gaokaoBankType.value;
    var yearF = el.gaokaoBankYear.value;
    var list = all.filter(function (x) {
      if (typeF && x.type !== typeF) return false;
      if (yearF && String(x.year) !== yearF) return false;
      if (!q) return true;
      var hay = (x.title + " " + x.body + " " + x.type + " " + x.topic + " " + (x.district || "") + " " + x.points.join(" ")).toLowerCase();
      return hay.indexOf(q) !== -1;
    });
    var realCount = real.length, mockCount = mock.length;
    el.gaokaoBankCount.textContent = "共 " + all.length + " 套（真题 " + realCount + " · 区模拟 " + mockCount + "）· 命中 " + list.length;
    if (!list.length) { el.gaokaoBankList.innerHTML = '<div class="bank-empty">未找到匹配的题目，换个关键词试试。</div>'; return; }
    el.gaokaoBankList.innerHTML = list.map(function (x) {
      var tag = x._mock
        ? '<span class="bank-tag" style="background:#e8f5e9;color:#2e7d32">' + esc(x.season) + '</span>'
        : '<span class="bank-tag">' + x.year + "年" + x.month + "月</span>";
      return '<div class="gk-item bank-item" data-id="' + x.id + '">' +
        '<div class="bank-q-head">' + tag + " " +
        '<span class="bank-tag-sub">' + esc(x.type) + '</span> ' + esc(x.title) + '</div>' +
        '<div class="bank-q">' + esc(x.body.slice(0, 100)) + '...</div>' +
        '<div class="bank-q-meta">要点 ' + x.points.length + ' 个 · ' + esc(x.wordCount) + (x.district ? ' · ' + esc(x.district) : '') + '</div>' +
      '</div>';
    }).join("");
    Array.prototype.slice.call(el.gaokaoBankList.querySelectorAll(".gk-item")).forEach(function (it) {
      it.addEventListener("click", function () {
        var id = it.getAttribute("data-id");
        var item = all.filter(function (x) { return x.id === id; })[0];
        if (item) selectGaokaoQuestion(item);
      });
    });
  }

  function selectGaokaoQuestion(item) {
    var promptText = item.body + "\n\n要点：\n" + item.points.map(function (p, i) { return (i + 1) + ". " + p; }).join("\n");
    if (item.notes) promptText += "\n\n" + item.notes;
    // 高考为图片模式
    var imageTypes = ["task1", "ket_pic", "ket_email", "pet_email", "gaokao"];
    var examKey = "gaokao";
    if (imageTypes.indexOf(examKey) !== -1) {
      el.imgCaption.value = promptText;
    } else {
      el.prompt.value = promptText;
    }
    var examItem = el.examList.querySelector('[data-type="gaokao"]');
    if (examItem) examItem.click();
    closeModal("gaokaoBankModal");
    el.essay.focus();
  }

  // ---------- 托福真题题库弹窗 ----------
  function renderToeflBank() {
    var search = (el.toeflBankSearch.value || "").trim().toLowerCase();
    var typeF = el.toeflBankType.value;
    var all = [];

    // Merge academic and email prompts
    (window.TOEFL_ACADEMIC || []).forEach(function (a, i) {
      all.push({ _type: "academic", _idx: i, topic: a.topic, category: a.category, professor: a.professor, question: a.question, studentA: a.studentA, studentB: a.studentB });
    });
    (window.TOEFL_EMAIL || []).forEach(function (e, i) {
      all.push({ _type: "email", _idx: i, topic: e.type + " - " + e.recipient, category: e.typeEn, prompt: e.prompt, tone: e.tone, tips: e.tips });
    });

    var list = all.filter(function (x) {
      if (typeF && x._type !== typeF) return false;
      if (!search) return true;
      var hay = (x.topic + " " + (x.category || "") + " " + (x.question || x.prompt || "")).toLowerCase();
      return hay.indexOf(search) !== -1;
    });

    el.toeflBankCount.textContent = "共 " + all.length + " 题 · 命中 " + list.length;
    if (!list.length) { el.toeflBankList.innerHTML = '<div class="bank-empty">未找到匹配的托福真题，换个关键词试试。</div>'; return; }

    el.toeflBankList.innerHTML = list.map(function (x) {
      var tag = x._type === "academic" ? "学术讨论" : "邮件写作";
      var tagClass = x._type === "academic" ? "bank-tag-academic" : "bank-tag-email";
      var title = x._type === "academic" ? x.topic : x.topic;
      var body = x._type === "academic" ? x.question : x.prompt;
      var meta = x._type === "academic" ? x.category + " · 教授: " + x.professor : x.tone;
      return '<div class="toefl-item bank-item" data-type="' + x._type + '" data-idx="' + x._idx + '">' +
        '<div class="bank-q-head"><span class="bank-tag ' + tagClass + '">' + tag + '</span> ' + esc(title) + '</div>' +
        '<div class="bank-q">' + esc(body.slice(0, 120)) + '...</div>' +
        '<div class="bank-q-meta">' + esc(meta) + '</div>' +
      '</div>';
    }).join("");

    Array.prototype.slice.call(el.toeflBankList.querySelectorAll(".toefl-item")).forEach(function (it) {
      it.addEventListener("click", function () {
        var type = it.getAttribute("data-type");
        var idx = parseInt(it.getAttribute("data-idx"), 10);
        if (type === "academic") {
          selectToeflQuestion("academic", idx);
        } else {
          selectToeflQuestion("email", idx);
        }
      });
    });
  }

  function selectToeflQuestion(type, idx) {
    var item;
    if (type === "academic") {
      item = (window.TOEFL_ACADEMIC || [])[idx];
      if (!item) return;
      var promptText = "[TOEFL Academic Discussion]\nProfessor " + item.professor + ": " + item.question + "\n\n" +
        item.studentA.name + ": " + item.studentA.view + "\n\n" +
        item.studentB.name + ": " + item.studentB.view;
      el.prompt.value = promptText;
    } else {
      item = (window.TOEFL_EMAIL || [])[idx];
      if (!item) return;
      var promptText2 = "[TOEFL Email]\nRecipient: " + item.recipient + "\nTone: " + item.tone + "\n\n" + item.prompt;
      if (item.tips) promptText2 += "\n\n💡 Tips: " + item.tips;
      el.prompt.value = promptText2;
    }

    // Switch to TOEFL exam
    var toeflDisc = el.examList.querySelector('[data-type="toefl_disc"]');
    var toeflEmail = el.examList.querySelector('[data-type="toefl_email"]');
    var target = type === "academic" ? toeflDisc : toeflEmail;
    if (target) target.click();
    closeModal("toeflBankModal");
    el.essay.focus();
  }

  // ---------- 高考评分标准弹窗 ----------
  function renderGaokaoBandGuide(catKey) {
    var tabs = ["tiers", "levels", "tips"];
    if (!catKey) catKey = "tiers";
    el.gaokaoBandTabs.innerHTML = tabs.map(function (k) {
      var label = k === "tiers" ? "5档评分标准" : (k === "levels" ? "三档进阶体系" : "评分须知");
      return '<span class="cat-tab ' + (k === catKey ? "active" : "") + '" data-cat="' + k + '">' + label + '</span>';
    }).join("");
    Array.prototype.slice.call(el.gaokaoBandTabs.querySelectorAll(".cat-tab")).forEach(function (t) {
      t.addEventListener("click", function () { renderGaokaoBandGuide(t.getAttribute("data-cat")); });
    });
    var S = window.GAOKAO_SCORING || {};
    var html = "";
    if (catKey === "tiers") {
      html += '<div class="band-struct"><b>总分 25 分</b> · 内容要点(10) + 语法结构与词汇(7) + 衔接与连贯(5) + 整体效果(3)</div>';
      html += '<div class="band-struct"><b>扣分规则</b> · 词数 &lt; 100 扣 2 分；每 3 个拼写错误扣 1 分（最多扣 3 分）；书写较差降低一个档次</div>';
      html += (S.tiers || []).map(function (t) {
        var range = "第" + ["零","一","二","三","四","五"][t.tier] + "档";
        return '<div class="band-crit"><h5>' + esc(t.label) + ' · ' + esc(t.range) + ' 分</h5>' +
          '<div class="row"><span class="bd" style="min-width:90px">内容要点</span><span>' + esc(t.content) + '</span></div>' +
          '<div class="row"><span class="bd" style="min-width:90px">语法与词汇</span><span>' + esc(t.language) + '</span></div>' +
          '<div class="row"><span class="bd" style="min-width:90px">衔接与连贯</span><span>' + esc(t.coherence) + '</span></div>' +
          '<div class="row"><span class="bd" style="min-width:90px">整体效果</span><span>' + esc(t.effect) + '</span></div>' +
          '</div>';
      }).join("");
    } else if (catKey === "levels") {
      html += '<div class="band-struct"><b>三档进阶体系</b> · 来自PPT教程 · 基础档→提升档→精品档</div>';
      html += (S.levels || []).map(function (L) {
        return '<div class="band-crit"><h5>' + esc(L.name) + ' · 目标 ' + esc(L.target) + ' 分 · 词汇量 ' + esc(L.vocab) + '</h5>' +
          '<div class="row"><span class="bd" style="min-width:90px">框架</span><span>' + esc(L.framework) + '</span></div>' +
          '<div class="row"><span class="bd" style="min-width:90px">造句法</span><span>' + esc(L.sentenceMethod) + '</span></div>' +
          '<div class="row"><span class="bd" style="min-width:90px">过渡词</span><span>' + esc((L.transitions || []).join(" / ")) + '</span></div>' +
          '<div class="row"><span class="bd" style="min-width:90px">高分动词</span><span>' + esc((L.verbs || []).join(" / ")) + '</span></div>' +
          '<div class="row"><span class="bd" style="min-width:90px">评分要点</span><span>' + esc(L.scoring) + '</span></div>' +
          '<div class="row"><span class="bd" style="min-width:90px">模板句</span><span>' + (L.templates || []).map(function (t) { return esc(t); }).join("<br>") + '</span></div>' +
          '</div>';
      }).join("");
    } else if (catKey === "tips") {
      html += '<div class="band-struct"><b>评分注意事项</b> · 阅卷老师重点关注</div>';
      html += '<ul class="tips">' + (S.grammarTips || []).map(function (t) {
        return '<li>' + esc(t) + '</li>';
      }).join("") + '</ul>';
      html += '<div class="band-struct" style="margin-top:12px"><b>用词替换表</b> · ' + (S.upgrades || []).length + ' 组高频替换</div>';
      html += '<div class="cihuo-grid">' + (S.upgrades || []).map(function (u) {
        return '<span class="cihuo-item">' + esc(u.basic) + ' → ' + esc(u.advanced.join(" / ")) + '</span>';
      }).join("") + '</div>';
    }
    el.gaokaoBandBody.innerHTML = html;
  }

  // ---------- 高考高分句型库弹窗 ----------
  function renderGaokaoPatterns(catKey) {
    var cats = ["开头段", "中间段", "结尾段"];
    if (!catKey) catKey = "开头段";
    el.gaokaoPatternTabs.innerHTML = cats.map(function (k) {
      return '<span class="cat-tab ' + (k === catKey ? "active" : "") + '" data-cat="' + k + '">' + k + '</span>';
    }).join("");
    Array.prototype.slice.call(el.gaokaoPatternTabs.querySelectorAll(".cat-tab")).forEach(function (t) {
      t.addEventListener("click", function () { renderGaokaoPatterns(t.getAttribute("data-cat")); });
    });
    var all = window.GAOKAO_SENTENCE_PATTERNS || [];
    var list = all.filter(function (p) { return p.cat === catKey; });
    var levels = ["基础", "提升", "精品"];
    var html = "";
    levels.forEach(function (lv) {
      var sub = list.filter(function (p) { return p.level === lv; });
      if (!sub.length) return;
      var badge = lv === "基础" ? "基础档" : (lv === "提升" ? "提升档" : "精品档");
      html += '<div class="pat-cat"><h4>' + esc(lv) + ' (' + badge + ')</h4>';
      html += sub.map(function (it) {
        return '<div class="pat-item"><div class="en">' + esc(it.en) + '</div><div class="zh">' + esc(it.cn) + '</div></div>';
      }).join("") + '</div>';
    });
    el.gaokaoPatternBody.innerHTML = html || '<p style="color:var(--muted)">暂无句型。</p>';
  }

  // ---------- 高考体裁自动识别 ----------
  function detectGaokaoGenre(promptText) {
    var t = (promptText || "").toLowerCase();
    var hits = {};
    // 关键词匹配
    var rules = [
      { genre: "邀请信", kws: ["invite", "invitation", "join us", "participate", "出席", "邀请"] },
      { genre: "介绍信", kws: ["introduce", "介绍", "tell you about", "let you know about"] },
      { genre: "推荐信", kws: ["recommend", "recommendation", "推荐"] },
      { genre: "申请信", kws: ["apply", "application", "申请", "招募"] },
      { genre: "感谢信", kws: ["thank", "gratitude", "grateful", "感谢", "appreciate"] },
      { genre: "建议信", kws: ["suggest", "suggestion", "advice", "建议"] }
    ];
    var best = null, bestScore = 0;
    rules.forEach(function (r) {
      var score = 0;
      r.kws.forEach(function (kw) {
        if (t.indexOf(kw) !== -1) score++;
      });
      if (score > bestScore) { bestScore = score; best = r.genre; }
    });
    return bestScore > 0 ? best : null;
  }

  function getGaokaoFramework(genre) {
    if (!genre) return null;
    var fw = window.GAOKAO_FRAMEWORKS || [];
    for (var i = 0; i < fw.length; i++) {
      if (fw[i].type === genre) return fw[i];
    }
    return null;
  }
  function matchQuestion(promptText) {
    var p = promptText.toLowerCase().replace(/[^a-z0-9 ]/g, " ");
    var bank = window.QUESTION_BANK || [];
    for (var i = 0; i < bank.length; i++) {
      var frag = bank[i].q.toLowerCase().replace(/[^a-z0-9 ]/g, " ").slice(0, 55);
      if (frag.length > 25 && p.indexOf(frag) !== -1) return bank[i];
    }
    return null;
  }

  // ---------- 本题批改思路 ----------
  function renderPlaybook() {
    if (!selectedQuestion) { el.playbookCard.classList.add("hidden"); return; }
    var sq = selectedQuestion;
    var pb = CORRECTION_PLAYBOOK[sq.subtype] || null;
    var html = '<div class="pb-sec"><h5>题型 · ' + esc(sq.task) + ' · ' + esc(sq.subtype) +
      (sq.topic ? ' · ' + esc(sq.topic) : '') + '（' + esc(sq.date) + '）</h5></div>';
    if (pb) {
      html += '<div class="pb-sec"><h5>建议结构</h5><div class="pb-struct">' + esc(pb.structure) + '</div></div>';
      html += '<div class="pb-sec"><h5>必须满足</h5><ul>' + pb.mustHave.map(function (m) { return '<li>' + esc(m) + '</li>'; }).join("") + '</ul></div>';
      html += '<div class="pb-sec"><h5>关键用词</h5><div class="pb-vocab">' + esc(pb.vocab) + '</div></div>';
      html += '<div class="pb-sec"><h5>常见失分点</h5><ul>' + pb.pitfalls.map(function (m) { return '<li class="pb-pit">⚠ ' + esc(m) + '</li>'; }).join("") + '</ul></div>';
      if (sq.topic && TOPIC_VOCAB[sq.topic]) {
        var tv = TOPIC_VOCAB[sq.topic];
        html += '<div class="pb-sec"><h5>话题词升级（' + esc(sq.topic) + '）</h5><div class="pb-vocab">基础：' +
          esc(tv.core.join(" / ")) + '<br>高分：' + esc(tv.advanced.join(" / ")) + '</div></div>';
      }
    } else {
      html += '<div class="pb-sec"><div class="pb-struct">已载入本题题目，可开始粘贴作答并批改。</div></div>';
    }
    el.playbook.innerHTML = html;
    el.playbookSrc.textContent = "来自真题题库预设（" + (sq.date || sq.d) + "）";
    el.playbookCard.classList.remove("hidden");
  }

  // ---------- 雅思评分标准弹窗 ----------
  function renderBandGuide(catKey) {
    var tabs = ["task2", "task1"];
    if (!catKey) catKey = "task2";
    el.bandTabs.innerHTML = tabs.map(function (k) {
      return '<span class="cat-tab ' + (k === catKey ? "active" : "") + '" data-cat="' + k + '">' +
        (k === "task2" ? "大作文 Task 2" : "小作文 Task 1") + '</span>';
    }).join("");
    Array.prototype.slice.call(el.bandTabs.querySelectorAll(".cat-tab")).forEach(function (t) {
      t.addEventListener("click", function () { renderBandGuide(t.getAttribute("data-cat")); });
    });
    var g = IELTS_GUIDE[catKey];
    var b = BAND[catKey];
    var keys = Object.keys(b.criteria);
    var critKey = catKey === "task2" ? "tr" : "ta";
    var html = '<div class="band-struct"><b>建议结构：</b>' + esc(g.structure) + '</div>';
    html += keys.map(function (k) {
      var c = b.criteria[k];
      var rows = [9, 8, 7, 6, 5].map(function (bd) {
        return '<div class="row"><span class="bd">' + bd + '</span><span>' + esc(c[bd]) + '</span></div>';
      }).join("");
      var tips = (IELTS_GUIDE[catKey].tips[k] || []).map(function (t) { return '<li>' + esc(t) + '</li>'; }).join("");
      return '<div class="band-crit"><h5>' + esc(c.name) + '</h5>' + rows +
        (tips ? '<ul class="tips">' + tips + '</ul>' : "") + '</div>';
    }).join("");
    html += '<div class="band-struct" style="margin-top:10px"><b>来源：</b>' + esc(IELTS_GUIDE.source) + '</div>';
    el.bandBody.innerHTML = html;
  }

  // ---------- 写作语言素材弹窗 ----------
  function renderMaterial(catKey) {
    var keys = Object.keys(IELTS_TOPIC_VOCAB || {});
    if (!keys.length) { el.materialBody.innerHTML = '<p style="color:var(--muted)">暂无素材。</p>'; return; }
    if (!catKey || keys.indexOf(catKey) === -1) catKey = keys[0];
    el.materialTabs.innerHTML = keys.map(function (k) {
      return '<span class="cat-tab ' + (k === catKey ? "active" : "") + '" data-cat="' + k + '">' + k + '</span>';
    }).join("");
    Array.prototype.slice.call(el.materialTabs.querySelectorAll(".cat-tab")).forEach(function (t) {
      t.addEventListener("click", function () { renderMaterial(t.getAttribute("data-cat")); });
    });
    var list = IELTS_TOPIC_VOCAB[catKey] || [];
    el.materialBody.innerHTML = '<h4>' + esc(catKey) + ' · 核心词汇（' + list.length + ' 条）</h4>' +
      list.map(function (it) {
        return '<div class="mat-item"><span class="mat-w">' + esc(it.w) + '</span><span class="mat-e">' + esc(it.e) + '</span></div>';
      }).join("");
  }

  // ---------- 雅思词伙弹窗 ----------
  function renderCihuo(catKey) {
    var topics = Object.keys(window.CIHUO || {});
    if (!topics.length) { el.cihuoBody.innerHTML = '<p style="color:var(--muted)">暂无词伙。</p>'; return; }
    if (!catKey || topics.indexOf(catKey) === -1) catKey = topics[0];
    el.cihuoTabs.innerHTML = topics.map(function (k) {
      return '<span class="cat-tab ' + (k === catKey ? "active" : "") + '" data-cat="' + k + '">' + k + '</span>';
    }).join("");
    Array.prototype.slice.call(el.cihuoTabs.querySelectorAll(".cat-tab")).forEach(function (t) {
      t.addEventListener("click", function () { renderCihuo(t.getAttribute("data-cat")); });
    });
    var list = window.CIHUO[catKey] || [];
    el.cihuoBody.innerHTML = '<h4>' + esc(catKey) + ' · 话题词伙（' + list.length + ' 组）</h4>' +
      '<div class="cihuo-grid">' + list.map(function (p) {
        return '<span class="cihuo-item">' + esc(p) + '</span>';
      }).join("") + '</div>';
  }

  // ---------- Simon 范文弹窗 ----------
  function renderSimon() {
    var typeF = el.simonType.value;
    var list = (window.SIMON_ESSAYS || []).filter(function (e) { return !typeF || e.type === typeF; });
    el.simonCount.textContent = "共 " + (window.SIMON_ESSAYS || []).length + " 篇 · 命中 " + list.length;
    if (!list.length) { el.simonList.innerHTML = '<div class="bank-empty">无匹配范文。</div>'; return; }
    el.simonList.innerHTML = list.map(function (e, i) {
      var wc = words(e.text).length;
      return '<div class="simon-item">' +
        '<div class="simon-meta"><span class="bank-tag ' + (e.type === "task1" ? "t1" : "t2") + '">' + (e.type === "task1" ? "Task 1" : "Task 2") + '</span>' +
        '<span class="bank-tag sub">' + esc(e.subtype) + '</span><span class="bank-date">' + wc + ' words · Band 9</span></div>' +
        '<div class="simon-title">' + esc(e.title) + '</div>' +
        '<div class="simon-text">' + esc(e.text) + '</div></div>';
    }).join("");
  }

  // ---------- 官方考官范文弹窗 ----------
  function renderExaminer() {
    var typeF = el.examinerType.value;
    var all = window.EXAMINER_ESSAYS || [];
    var list = all.filter(function (e) { return !typeF || e.type === typeF; });
    el.examinerCount.textContent = "共 " + all.length + " 篇 · 命中 " + list.length;
    if (!list.length) { el.examinerList.innerHTML = '<div class="bank-empty">无匹配范文。</div>'; return; }
    el.examinerList.innerHTML = list.map(function (e, i) {
      var meta = (e.band ? "Band " + e.band + " · " : "") + (e.words ? e.words + " words" : "");
      var tipHtml = e.tip ? '<div class="simon-tip">💡 ' + esc(e.tip) + '</div>' : "";
      return '<div class="simon-item examiner">' +
        '<div class="simon-meta"><span class="bank-tag ' + (e.type === "task1" ? "t1" : "t2") + '">' + (e.type === "task1" ? "Task 1" : "Task 2") + '</span>' +
        '<span class="bank-tag sub">' + esc(e.subtype) + '</span>' + (meta ? '<span class="bank-date">' + meta + '</span>' : "") + '</div>' +
        '<div class="simon-title">' + esc(e.title) + '</div>' +
        tipHtml +
        '<div class="simon-text">' + esc(e.text) + '</div></div>';
    }).join("");
  }

  // ---------- 小作文图库弹窗 ----------
  function renderGallery() {
    var imgs = window.TASK1_GALLERY || [];
    if (!imgs.length) { el.galleryGrid.innerHTML = '<div class="bank-empty">未找到图片。</div>'; return; }
    el.galleryGrid.innerHTML = imgs.map(function (n, i) {
      return '<div class="gal-item" data-n="' + esc(n) + '"><img src="img/task1/' + encodeURIComponent(n) + '" alt="' + esc(n) + '" loading="lazy"><span>' + (i + 1) + '</span></div>';
    }).join("");
    Array.prototype.slice.call(el.galleryGrid.querySelectorAll(".gal-item")).forEach(function (it) {
      it.addEventListener("click", function () { setTask1Image("img/task1/" + it.getAttribute("data-n"), true); });
    });
  }

  // ---------- 图片题目（Task 1）----------
  function setTask1Image(src, fromGallery) {
    task1Image = { src: src, fromGallery: !!fromGallery };
    el.promptImgBox.innerHTML = '<img src="' + src + '" alt="题目图" class="prompt-img">';
    closeModal("galleryModal");
    el.promptImageWrap.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
  function clearImage() {
    task1Image = null;
    el.promptImgBox.innerHTML = '<span class="img-placeholder">点击「选择图片」或「从图库选择」载入小作文题目图<br><small>支持截图/拍照上传，也可直接 Ctrl+V 粘贴图片</small></span>';
    el.imgCaption.value = "";
  }
  function handleImageFile(file) {
    if (!file || !/^image\//.test(file.type)) return;
    var reader = new FileReader();
    reader.onload = function (e) { setTask1Image(e.target.result, false); };
    reader.readAsDataURL(file);
  }

  // ---------- AEAS 工作区 ----------
  function renderAeas() {
    var bands = Object.keys(AEAS_DATA.gradeBands);
    el.aeasIntro.textContent = AEAS_DATA.intro;
    if (bands.indexOf(aeasState.band) === -1) aeasState.band = bands[0];
    el.aeasBands.innerHTML = bands.map(function (b) {
      var gb = AEAS_DATA.gradeBands[b];
      return '<div class="aeas-band ' + (b === aeasState.band ? "active" : "") + '" data-b="' + b + '">' +
        '<div class="gb">' + b + ' 年级</div><div class="gw">' + gb.time + ' · ' + gb.words + '</div>' +
        '<div class="gn">' + gb.focus + '</div></div>';
    }).join("");
    Array.prototype.slice.call(el.aeasBands.querySelectorAll(".aeas-band")).forEach(function (d) {
      d.addEventListener("click", function () { aeasState.band = d.getAttribute("data-b"); renderAeas(); autoSave(); });
    });
    // 题型选择 chips
    renderAeasChips();
    renderAeasTypes();
  }

  function renderAeasChips() {
    el.aeasTypeChips.innerHTML = AEAS_DATA.gradeBands[aeasState.band].types.map(function (t) {
      return '<div class="aeas-band ' + (t === aeasState.typeSub ? "active" : "") + '" data-t="' + t + '" style="min-width:90px">' +
        '<div class="gb" style="font-size:13px">' + t + '</div></div>';
    }).join("");
    Array.prototype.slice.call(el.aeasTypeChips.querySelectorAll(".aeas-band[data-t]")).forEach(function (d) {
      d.addEventListener("click", function () { aeasState.typeSub = d.getAttribute("data-t"); renderAeas(); autoSave(); });
    });
  }

  function renderAeasTypes() {
    var band = AEAS_DATA.gradeBands[aeasState.band];
    var types = band.types;
    // 仅显示该年级段允许的类型
    var html = types.map(function (t) {
      var td = AEAS_DATA.types[t];
      if (!td) return "";
      var out = '<div class="aeas-type" style="' + (t === aeasState.typeSub ? "border-color:var(--haze-600)" : "") + '"><h4>' + esc(td.label || t) + (t === aeasState.typeSub ? ' <span style="font-size:11px;color:var(--haze-700)">· 当前</span>' : '') + '</h4>';
      if (td.outline) out += '<div class="outline">' + esc(td.outline) + '</div>';
      if (td.template) out += '<div class="tpl">' + esc(td.template) + '</div>';
      if (td.contention) out += '<div class="cont">⚠ ' + esc(td.contention) + '</div>';
      // subtypes
      if (td.subtypes) {
        Object.keys(td.subtypes).forEach(function (sub) {
          var sd = td.subtypes[sub];
          out += '<div class="outline" style="margin-top:6px"><b>' + esc(sub) + '</b>：' + esc(sd.outline || "") + '</div>';
          if (sd.prompts) {
            out += '<div class="prompts">';
            sd.prompts.forEach(function (p) {
              out += '<button class="aeas-prompt" data-q="' + p.replace(/"/g, "&quot;") + '">' + esc(p) + '</button>';
            });
            out += '</div>';
          }
          if (sd.model) {
            out += '<div class="aeas-grammar"><b>' + esc(sd.model.title) + '</b><br>' +
              esc(sd.model.analysis) + '</div>';
          }
        });
      } else if (td.prompts) {
        out += '<div class="prompts">';
        td.prompts.forEach(function (p) {
          out += '<button class="aeas-prompt" data-q="' + p.replace(/"/g, "&quot;") + '">' + esc(p) + '</button>';
        });
        out += '</div>';
      }
      out += '</div>';
      return out;
    }).join("");
    // 易错语法
    html += '<div class="aeas-grammar"><b>学生易错语法</b><ul style="margin:4px 0 0;padding-left:18px">' +
      AEAS_DATA.grammarTips.map(function (g) { return '<li>' + esc(g) + '</li>'; }).join("") + '</ul></div>';
    el.aeasTypes.innerHTML = html;
    Array.prototype.slice.call(el.aeasTypes.querySelectorAll(".aeas-prompt")).forEach(function (btn) {
      btn.addEventListener("click", function () {
        el.prompt.value = btn.getAttribute("data-q");
        el.essay.focus();
        el.result.classList.add("hidden");
      });
    });
  }

  // ---------- AI 精批配置 ----------
  function loadAI() {
    try {
      var raw = localStorage.getItem("wc_ai_config");
      aiConfig = raw ? JSON.parse(raw) : null;
    } catch (e) { aiConfig = null; }
    updateBadge();
    if (aiConfig) {
      el.aiProvider.value = aiConfig.provider || "deepseek";
      el.aiModel.value = aiConfig.model || "";
      el.aiKey.value = aiConfig.key || "";
      el.aiBase.value = aiConfig.base || "";
    }
    el.aiBaseWrap.style.display = (el.aiProvider.value === "custom") ? "block" : "none";
  }
  function resolveBase() {
    if (el.aiProvider.value === "custom") return el.aiBase.value.trim();
    return AI_PRESETS[el.aiProvider.value] || AI_PRESETS.deepseek;
  }
  function saveAI() {
    var key = el.aiKey.value.trim();
    if (!key) { alert("请先粘贴 API Key，或点「清除 Key」退回启发式。"); return; }
    aiConfig = { provider: el.aiProvider.value, base: resolveBase(), model: el.aiModel.value.trim() || "deepseek-chat", key: key };
    try { localStorage.setItem("wc_ai_config", JSON.stringify(aiConfig)); } catch (e) {}
    updateBadge();
    closeModal("aiModal");
    alert("已保存，AI 7.5+ 语义精批已开启。下次批改将自动调用。");
  }
  function clearAI() {
    aiConfig = null;
    try { localStorage.removeItem("wc_ai_config"); } catch (e) {}
    el.aiKey.value = "";
    updateBadge();
    closeModal("aiModal");
  }
  function updateBadge() {
    if (aiConfig && aiConfig.key) {
      el.aiBadge.textContent = "AI 精批已开启 · " + (aiConfig.provider || "");
      el.aiBadge.classList.add("on");
    } else {
      el.aiBadge.textContent = "启发式模式";
      el.aiBadge.classList.remove("on");
    }
  }
  function runAI(essay, promptText, typeLabel, isAeas, toeflType, petType, ketType) {
    if (!aiConfig || !aiConfig.key) return;
    var card = document.getElementById("aiCard");
    if (!card) {
      card = document.createElement("div");
      card.id = "aiCard";
      card.className = "card";
      el.result.insertBefore(card, el.result.querySelector(".ref-grid"));
    }
    var aiOutId = "aiOut_" + Date.now();
    card.innerHTML = '<h3 class="sec-title">AI 7.5+ 语义精批 <small>大模型实时返回</small></h3>' +
      '<div id="' + aiOutId + '" style="font-size:13px;color:var(--muted)">AI 精批中…（若长时间无响应，可能是浏览器跨域(CORS)限制，见设置弹窗说明）</div>';

    // 根据考试类型切换 system prompt —— 评分标准不共享
    var sys;
    if (isAeas) {
      sys = "你是一位 AEAS 写作考官与批改老师。请对用户粘贴的英文作文做深度批改，用中文输出，结构如下：1) 总体评价与估计分数（按 AEAS 三项标准：内容与组织 Content &amp; Organisation 0-7 分、语言准确性 Accuracy of Language 0-7 分、词汇运用 Use of Vocabulary 0-6 分，总分 20 分）；2) 逐段'切题分析'（是否回应题目、逻辑是否连贯）；3) 主要语法/用词错误（给出修改）；4) 中式英语或基础表达替换建议；5) 下一步提分建议。只输出批改内容，不要寒暄。";
    } else if (toeflType === "toefl_disc") {
      sys = "你是一位 ETS 托福写作考官与批改老师。请对用户粘贴的 2026 年新托福学术讨论（Write for an Academic Discussion）英文作文做深度批改。用中文输出，结构如下：1) 总体评价与估计分数（按新托福三项标准：内容相关且充分展开、句法/词汇多样准确、语法/拼写/标点，各 0-5 分，总分 5 分）；2) 是否回应了教授的提问和同学的观点；3) 主要语法/用词/标点错误（逐一标注并给修改）；4) 中式英语或基础表达替换建议；5) 提分建议（如何提升内容深度和语言多样性）。只输出批改内容，不要寒暄。";
    } else if (toeflType === "toefl_email") {
      sys = "你是一位 ETS 托福写作考官与批改老师。请对用户粘贴的 2026 年新托福邮件写作（Write an Email）英文作文做深度批改。用中文输出，结构如下：1) 总体评价与估计分数（按新托福四项标准：内容充分展开、句法/词汇多样准确、语体与礼貌、语法/拼写/标点，各 0-5 分，总分 5 分）；2) 是否充分回应了邮件任务的三项要求；3) 邮件的语体/称呼/礼貌用语是否恰当；4) 主要语法/用词/标点错误（逐一标注并给修改）；5) 中式英语或基础表达替换建议；6) 提分建议。只输出批改内容，不要寒暄。";
    } else if (petType === "pet_email") {
      sys = "你是一位剑桥 B1 Preliminary (PET) 写作考官与批改老师。请对用户粘贴的 PET Part 1 邮件写作（Email, 约100词）英文作文做深度批改。用中文输出，结构如下：1) 总体评价与估计分数（按剑桥 PET 四项标准：Content 内容 0-5、Communicative Achievement 交际达成 0-5、Organisation 组织 0-5、Language 语言 0-5，总分 20 分）；2) 逐条检查是否回应了邮件中的全部 4 个 notes/要点（逐一标注是否覆盖）；3) 邮件格式检查（称呼 Hi/Dear、结尾 Best wishes/See you、语体是否恰当）；4) 主要语法/用词/标点错误（逐一标注并给修改）；5) 中式英语或基础表达替换建议；6) 提分建议。只输出批改内容，不要寒暄。";
    } else if (petType === "pet_article") {
      sys = "你是一位剑桥 B1 Preliminary (PET) 写作考官与批改老师。请对用户粘贴的 PET Part 2 文章写作（Article, 约100词）英文作文做深度批改。用中文输出，结构如下：1) 总体评价与估计分数（按剑桥 PET 四项标准：Content 内容 0-5、Communicative Achievement 交际达成 0-5、Organisation 组织 0-5、Language 语言 0-5，总分 20 分）；2) 逐条检查是否回答了题目中的所有问题；3) 文章结构和段落是否清晰（引言-正文-结论），是否有标题；4) 主要语法/用词/标点错误（逐一标注并给修改）；5) 中式英语或基础表达替换建议；6) 提分建议。只输出批改内容，不要寒暄。";
    } else if (petType === "pet_story") {
      sys = "你是一位剑桥 B1 Preliminary (PET) 写作考官与批改老师。请对用户粘贴的 PET Part 2 故事写作（Story, 约100词）英文作文做深度批改。用中文输出，结构如下：1) 总体评价与估计分数（按剑桥 PET 四项标准：Content 内容 0-5、Communicative Achievement 交际达成 0-5、Organisation 组织 0-5、Language 语言 0-5，总分 20 分）；2) 是否以题目给的第一句话开头（不可更改），故事情节是否完整（开端-发展-结局）；3) 时态检查（记叙文应以过去时为主，检查 was/went/said 等）；4) 主要语法/用词/标点错误（逐一标注并给修改）；5) 中式英语或基础表达替换建议；6) 提分建议。只输出批改内容，不要寒暄。";
    } else if (ketType === "ket_email") {
      sys = "你是一位剑桥 A2 Key (KET) 写作考官与批改老师。请对用户粘贴的 KET Part 6 邮件写作（Email, ~25词）英文作文做深度批改。用中文输出，结构如下：1) 总体评价与估计分数（按剑桥 KET 三项标准：Content 内容 0-5、Organisation 组织 0-5、Language 语言 0-5，总分 15 分）；2) 逐条检查是否回应了邮件中的全部 3 个 notes/要点（逐一标注是否覆盖）；3) 邮件格式检查（称呼和结尾语是否规范）；4) 主要语法/用词/拼写错误（逐一标注并给 A2 级别修改建议——修改不宜过难）；5) 中文思维导致的表达问题；6) 提分建议（适合 A2 级别的改进方向）。注意：KET 是 A2 初级水平，不要用 B1/B2 标准要求。只输出批改内容，不要寒暄。";
    } else if (ketType === "ket_pic") {
      sys = "你是一位剑桥 A2 Key (KET) 写作考官与批改老师。请对用户粘贴的 KET Part 7 图片故事写作（Picture Story, ~35词）英文作文做深度批改。用中文输出，结构如下：1) 总体评价与估计分数（按剑桥 KET 三项标准：Content 内容 0-5、Organisation 组织 0-5、Language 语言 0-5，总分 15 分）；2) 是否描述了全部三幅图的内容（逐一检查）；3) 故事的时间顺序和逻辑是否清晰；4) 时态检查（应用过去时）；5) 主要语法/用词/拼写错误（逐一标注并给 A2 级别简单修改建议）；6) 中文思维导致的表达问题；7) 提分建议（适合 A2 初级水平）。注意：KET 是 A2 级别，词汇和句法要求不高，修改建议应简单实用。只输出批改内容，不要寒暄。";
    } else if (current.type === "gaokao") {
      sys = "你是一位天津高考英语写作阅卷老师与批改专家。请对用户粘贴的天津高考英语书面表达（满分25分，词数不少于100）英文作文做深度批改。用中文输出，结构如下：1) 总体评价与估计分数（按天津高考四维度：内容要点0-10、语法结构与词汇0-7、衔接与连贯0-5、整体效果0-3，总分25分；并给出对应档次：第五档21-25/第四档16-20/第三档11-15/第二档6-10/第一档1-5）；2) 采分点分析（逐一检查题目要点是否覆盖，标注每个要点的覆盖情况）；3) 全文框架和模板建议（给出适合该题型的三段式框架和高分句型建议）；4) 主要语法/用词/拼写错误（逐一标注并给修改，注意标点符号和大小写）；5) 高分用词参考（给出用词替换建议，如important→significant等）；6) 中式英语或基础表达替换建议；7) 提分建议（针对当前水平给出基础档/提升档/精品档的进阶方向）。评分参考：词数<100扣2分，每3个拼写错误扣1分（最多3分）。只输出批改内容，不要寒暄。";
    } else {
    }
    var user = "考试类型：" + typeLabel + "\n题目：" + (promptText || "(未提供)") + "\n\n学生作文：\n" + essay;
    var url = (aiConfig.base || AI_PRESETS.deepseek).replace(/\/+$/, "") + "/chat/completions";

    // 加载中状态
    var btnOrig = el.analyzeBtn.textContent;
    el.analyzeBtn.textContent = "⏳ AI 精批中…";
    el.analyzeBtn.disabled = true;

    var controller = new AbortController();
    var timeoutId = setTimeout(function () { controller.abort(); }, 60000);

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + aiConfig.key },
      body: JSON.stringify({
        model: aiConfig.model || "deepseek-chat",
        messages: [{ role: "system", content: sys }, { role: "user", content: user }],
        temperature: 0.3
      }),
      signal: controller.signal
    }).then(function (r) {
      clearTimeout(timeoutId);
      if (!r.ok) {
        if (r.status === 401) throw new Error("API Key 无效或过期（401），请检查 Key 是否正确。");
        if (r.status === 429) throw new Error("API 调用频率过高（429），请稍后再试。");
        if (r.status >= 500) throw new Error("服务商服务器错误（" + r.status + "），请稍后重试。");
        throw new Error("API 返回状态 " + r.status);
      }
      return r.json();
    }).then(function (d) {
      var text = (d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content) || JSON.stringify(d);
      var outEl = document.getElementById(aiOutId);
      if (outEl) {
        var html = esc(text)
          .replace(/\n/g, "<br>")
          .replace(/^\d[)）.]\s*\*\*(.+?)\*\*/gm, '<b>$1</b>')
          .replace(/^\d[)）.]\s*(.+?)$/gm, '<b>$1</b>');
        outEl.innerHTML = html;
      }
    }).catch(function (e) {
      clearTimeout(timeoutId);
      var outEl = document.getElementById(aiOutId);
      if (outEl) {
        if (e.name === "AbortError") {
          outEl.innerHTML = '<span style="color:var(--warn)">AI 请求超时（60 秒），请检查网络后重试。</span>';
        } else {
          outEl.innerHTML = '<span style="color:var(--warn)">调用失败：' + esc(String(e)) +
            '。常见原因：浏览器直接调用被服务商 CORS 拦截。可换成支持浏览器跨域的端点，或让我加一个本地 Node 代理。</span>';
        }
      }
    }).finally(function () {
      el.analyzeBtn.textContent = btnOrig;
      el.analyzeBtn.disabled = false;
    });
  }

  // ---------- main analyze ----------
  function analyze() {
    var essay = el.essay.value.trim();
    if (essay.length < 20) { alert("请先粘贴一段完整作答（至少 20 词）。"); return; }

    // 先确定题目文本（图片模式下取图注，文字模式下取题目框）
    var promptText = promptMode === "image" ? (el.imgCaption.value || "") : el.prompt.value;

    var paras = paragraphs(essay);
    var numRef = { n: 1 };
    var html = "";
    paras.forEach(function (p) {
      var ss = sentences(p);
      var phtml = ss.map(function (s) { return annotateSentence(s, numRef).html; }).join(" ");
      html += '<div class="pblock">' + phtml + '</div>';
    });

    el.annotated.innerHTML = html || '<p style="color:var(--muted)">未检测到内容。</p>';
    if (current.type === "aeas") {
      el.promptAnalysis.innerHTML = aeasAnalysis(paras, el.prompt.value);
    } else if (current.type === "toefl_disc") {
      el.promptAnalysis.innerHTML = toeflDiscAnalysis(paras, promptText);
    } else if (current.type === "toefl_email") {
      el.promptAnalysis.innerHTML = toeflEmailAnalysis(paras, promptText);
    } else if (current.type.indexOf("pet_") === 0) {
      el.promptAnalysis.innerHTML = petAnalysis(paras, promptText, current.type);
    } else if (current.type.indexOf("ket_") === 0) {
      el.promptAnalysis.innerHTML = ketAnalysis(paras, promptText, current.type);
    } else if (current.type === "gaokao") {
      el.promptAnalysis.innerHTML = gaokaoAnalysis(paras, promptText);
    } else {
      el.promptAnalysis.innerHTML = promptAnalysis(paras, promptText, current.type) ||
        '<p style="color:var(--muted)">已分析。</p>';
    }

    // 自动匹配真题题库（仅 IELTS 文字题有效）
    if (!isAeas && !isToefl && !isPet && !isKet && !isGaokao) {
      var m = matchQuestion(promptText);
      if (m) { selectedQuestion = normBank(m); }
    }

    // 评分：AEAS 用 20 分制，TOEFL 用 0-5->1-6 分制，PET 用 4x0-5=20 分制，IELTS 用 3/6 分制
    var score;
    var isAeas = current.type === "aeas";
    var isToefl = current.type === "toefl_disc" || current.type === "toefl_email";
    var isPet = current.type.indexOf("pet_") === 0;
    var isKet = current.type.indexOf("ket_") === 0;
    var isGaokao = current.type === "gaokao";
    if (isAeas) {
      score = computeAeasScore(essay, aeasState.band);
      el.scoreSub.textContent = "AEAS 写作 20 分制 · 三项评分标准";
    } else if (isToefl) {
      score = computeToeflScore(essay, current.type);
      el.scoreSub.textContent = "托福 " + (current.type === "toefl_disc" ? "学术讨论" : "邮件写作") + " · 2026 新制 1-6 分";
    } else if (isPet) {
      score = computePetScore(essay, current.type);
      el.scoreSub.textContent = "PET " + score.typeLabel + " · 4 项 x 0-5 = 20 分";
    } else if (isKet) {
      score = computeKetScore(essay, current.type);
      el.scoreSub.textContent = "KET " + score.typeLabel + " · 3 项 x 0-5 = 15 分";
    } else if (isGaokao) {
      score = computeGaokaoScore(essay);
      el.scoreSub.textContent = "天津高考 " + score.tierLabel + " · 25 分制";
    } else {
      score = computeScore(essay, current.type, current.minWords);
      el.scoreSub.textContent = score.isT1
        ? "小作文 3 分制（Task Achievement 权重最高）"
        : "大作文 6 分制（Task Response 权重最高）";
    }
    var skipBand = isAeas || isToefl || isPet || isKet || isGaokao;
    el.scoreEst.innerHTML = score.criteria.map(function (c) {
      return '<div class="c"><h4>' + esc(c.name) + (skipBand && c.nameEn ? ' <small>' + esc(c.nameEn) + '</small>' : '') + '</h4>' +
        '<div class="b">' + c.pts.toFixed(1) + '<span class="mx">/ ' + c.max.toFixed(1) + '</span></div>' +
        (skipBand ? '' : '<div class="band-eq">≈ Band ' + c.band.toFixed(1) + '</div>') +
        '<div class="c-detail">' + esc(c.detail) + '</div></div>';
    }).join("") +
      '<div class="c total"><h4>总分</h4>' +
      '<div class="b">' + score.total.toFixed(1) + '<span class="mx">/ ' + score.maxTotal.toFixed(1) + '</span></div>' +
      (isAeas ? '<div class="band-eq">' + esc(score.wordInfo) + '</div>' :
       isToefl ? '<div class="band-eq">TOEFL Writing ≈ ' + score.overallBand.toFixed(1) + ' / 6 · ' + esc(score.wordInfo) + '</div>' :
       isPet ? '<div class="band-eq">PET ' + score.typeLabel + ' · ' + esc(score.wordInfo) + '</div>' :
       isKet ? '<div class="band-eq">KET ' + score.typeLabel + ' · ' + esc(score.wordInfo) + '</div>' :
       isGaokao ? '<div class="band-eq">' + esc(score.tierLabel) + ' · ' + esc(score.wordInfo) + '</div>' :
       '<div class="band-eq">≈ Overall Band ' + score.overallBand.toFixed(1) + '</div>') + '</div>';

    if (!skipBand) renderRef(current.type);
    renderPlaybook();
    el.result.classList.remove("hidden");
    el.result.scrollIntoView({ behavior: "smooth", block: "start" });

    // AI 7.5+ 语义精批（若已开启）
    if (aiConfig && aiConfig.key) {
      runAI(essay, promptText, current.name, isAeas, isToefl ? current.type : null, isPet ? current.type : null, isKet ? current.type : null);
    }
  }

  // ---------- AEAS 审题分析 ----------
  function aeasAnalysis(paras, promptText) {
    var band = AEAS_DATA.gradeBands[aeasState.band];
    var td = AEAS_DATA.types[aeasState.typeSub] || {};
    // 10-12 年级的议论文子类型直接从 types 查找
    if (!td.label && aeasState.typeSub.indexOf("议论文") === 0) {
      td = AEAS_DATA.types["议论文"] || td;
    }
    var notes = [];
    notes.push('<div class="pa"><b>当前设定</b> · 年级段 <b>' + aeasState.band + '</b>（' + band.time + ' / ' + band.words +
      '）· 题型 <b>' + aeasState.typeSub + '</b></div>');
    notes.push('<div class="pa"><b>考核重点</b> · ' + esc(band.focus) + '</div>');
    notes.push('<div class="pa"><b>审题要点</b> · ' + esc(band.note) + '</div>');
    if (td.note) notes.push('<div class="pa"><b>题型提示</b> · ' + esc(td.note) + '</div>');
    if (td.outline) notes.push('<div class="pa"><b>结构/提纲</b> · ' + esc(td.outline) + '</div>');
    if (td.contention) notes.push('<div class="pa" style="color:var(--warn)"><b>⚠ 议论文审题</b> · ' + esc(td.contention) + '</div>');
    if (td.pitfalls) notes.push('<div class="pa"><b>常见误区</b> · ' + esc(td.pitfalls) + '</div>');
    // 关键词重叠
    var stop = {}; "the a an and or but to of in on for with as is are was were be been being this that these those it its by from at we you they he she i not can will should may might".split(" ").forEach(function (w) { stop[w] = 1; });
    var pk = {}; words(promptText).forEach(function (ww) {
      var t = ww.toLowerCase().replace(/[^a-z']/g, ""); if (t.length >= 4 && !stop[t]) pk[t] = 1;
    });
    var pkKeys = Object.keys(pk);
    paras.forEach(function (p, i) {
      var low = p.toLowerCase(), hit = 0;
      pkKeys.forEach(function (k) { if (low.indexOf(k) !== -1) hit++; });
      var ratio = pkKeys.length ? Math.round((hit / pkKeys.length) * 100) : 0;
      var adv = pkKeys.length === 0 ? "未检测到题目关键词，请粘贴题目以便精准切题分析。"
        : (ratio < 25 ? "本段与题目关键词重叠仅 " + ratio + "%，存在偏题风险，建议紧扣题目核心展开。" : "本段与题目关键词重叠 " + ratio + "%，整体切题。");
      notes.push('<div class="pa"><b>第 ' + (i + 1) + ' 段</b> · ' + adv + '</div>');
    });
    // 易错语法提醒（针对全文）
    notes.push('<div class="pa"><b>易错语法自检</b> · ' + AEAS_DATA.grammarTips.slice(0, 3).join(" ") + '</div>');
    return notes.join("");
  }

  // ---------- TOEFL 学术讨论审题分析 ----------
  function toeflDiscAnalysis(paras, promptText) {
    var notes = [];
    notes.push('<div class="pa"><b>托福学术讨论</b> · Write for an Academic Discussion · 2026 新制</div>');
    notes.push('<div class="pa"><b>评分标准</b> · 内容相关且充分展开 + 句法/词汇多样准确 + 语法/拼写/标点（0-5 分）</div>');
    notes.push('<div class="pa"><b>审题要点</b> · 需回应教授的提问，并对讨论中两位学生的观点做出回应（可同意/不同意/补充）</div>');
    notes.push('<div class="pa"><b>结构建议</b> · 明确立场 → 回应教授问题 → 回应同学观点（同意+补充 / 不同意+理由）→ 给出自己的理由/例子</div>');
    notes.push('<div class="pa" style="color:var(--warn)"><b>⚠ 注意</b> · 不要只总结或重复材料内容，要贡献自己的原创观点。</div>');

    // 关键词分析
    var stop = {}; "the a an and or but to of in on for with as is are was were be been being this that these those it its by from at we you they he she i not can will should may might".split(" ").forEach(function (w) { stop[w] = 1; });
    var pk = {}; words(promptText).forEach(function (ww) {
      var t = ww.toLowerCase().replace(/[^a-z']/g, ""); if (t.length >= 4 && !stop[t]) pk[t] = 1;
    });
    var pkKeys = Object.keys(pk);
    if (pkKeys.length === 0) {
      notes.push('<div class="pa"><b>提示</b> · 请粘贴学术讨论题目（教授提问 + 学生观点），以便精准切题分析。</div>');
    } else {
      paras.forEach(function (p, i) {
        var low = p.toLowerCase(), hit = 0;
        pkKeys.forEach(function (k) { if (low.indexOf(k) !== -1) hit++; });
        var ratio = pkKeys.length ? Math.round((hit / pkKeys.length) * 100) : 0;
        notes.push('<div class="pa"><b>第 ' + (i + 1) + ' 段</b> · 与题目关键词重叠 ' + ratio + '%' + (ratio < 25 ? '，存在偏题风险。' : '，整体切题。') + '</div>');
      });
    }
    return notes.join("");
  }

  // ---------- TOEFL 邮件审题分析 ----------
  function toeflEmailAnalysis(paras, promptText) {
    var notes = [];
    notes.push('<div class="pa"><b>托福邮件写作</b> · Write an Email · 2026 新制</div>');
    notes.push('<div class="pa"><b>评分标准</b> · 内容充分展开 + 句法/词汇多样准确 + 语体与礼貌 + 语法/拼写/标点（0-5 分）</div>');
    notes.push('<div class="pa"><b>审题要点</b> · 邮件通常要求回应三项任务，需逐一处理。注意收件人身份决定语气（正式/半正式）。</div>');
    notes.push('<div class="pa"><b>结构建议</b> · 恰当称呼 → 开篇说明来意 → 逐项回应任务要求 → 礼貌结尾 → 署名</div>');
    notes.push('<div class="pa" style="color:var(--warn)"><b>⚠ 注意</b> · 检查是否有称呼（Dear ...）、结尾（Sincerely/Regards）、是否有完整的署名。</div>');

    // 关键词分析
    var stop = {}; "the a an and or but to of in on for with as is are was were be been being this that these those it its by from at we you they he she i not can will should may might".split(" ").forEach(function (w) { stop[w] = 1; });
    var pk = {}; words(promptText).forEach(function (ww) {
      var t = ww.toLowerCase().replace(/[^a-z']/g, ""); if (t.length >= 4 && !stop[t]) pk[t] = 1;
    });
    var pkKeys = Object.keys(pk);
    if (pkKeys.length === 0) {
      notes.push('<div class="pa"><b>提示</b> · 请粘贴邮件题目（含收件人和任务要求），以便精准切题分析。</div>');
    } else {
      paras.forEach(function (p, i) {
        var low = p.toLowerCase(), hit = 0;
        pkKeys.forEach(function (k) { if (low.indexOf(k) !== -1) hit++; });
        var ratio = pkKeys.length ? Math.round((hit / pkKeys.length) * 100) : 0;
        notes.push('<div class="pa"><b>第 ' + (i + 1) + ' 段</b> · 与题目关键词重叠 ' + ratio + '%' + (ratio < 25 ? '，存在偏题风险。' : '，整体切题。') + '</div>');
      });
    }
    return notes.join("");
  }

  // ---------- PET 审题分析 ----------
  function petAnalysis(paras, promptText, petType) {
    var notes = [];
    var isEmail = petType === "pet_email";
    var isStory = petType === "pet_story";
    var isArticle = petType === "pet_article";
    var typeLabel = isEmail ? "Part 1 Email" : isStory ? "Part 2 Story" : "Part 2 Article";

    notes.push('<div class="pa"><b>PET ' + typeLabel + '</b> · B1 Preliminary · 2020 新制 · ~100 词 · 45 分钟</div>');
    notes.push('<div class="pa"><b>评分标准</b> · 4 项各 0-5 分（共 20 分）：Content 内容 + Communicative Achievement 交际达成 + Organisation 组织 + Language 语言</div>');

    if (isEmail) {
      notes.push('<div class="pa"><b>审题要点</b> · 邮件必须回应朋友/老师邮件中的 <b>全部 4 个要点</b>（notes）。遗漏任何一个要点会扣 Content 分。</div>');
      notes.push('<div class="pa"><b>结构建议</b> · Hi/Dear + 名字 → 开头回应 → 逐个回应 4 个 notes → 结尾（Best wishes / See you soon）→ 署名</div>');
      notes.push('<div class="pa"><b>语体</b> · 非正式邮件（写给朋友/同学），可用缩写（I\'m, can\'t）、感叹号、口语化表达。</div>');
      notes.push('<div class="pa" style="color:var(--warn)"><b>⚠ 注意</b> · 每个 note 必须明确回应，不能遗漏。建议在草稿上逐条打勾。</div>');
    } else if (isStory) {
      notes.push('<div class="pa"><b>审题要点</b> · 故事必须以题目给的第一句话开头，不能更改。故事要有完整的情节（开端→发展→结局）。</div>');
      notes.push('<div class="pa"><b>结构建议</b> · 给定开头句 → 发展情节（1-2 个事件）→ 结局（可以是意外/感悟/转折）</div>');
      notes.push('<div class="pa"><b>时态</b> · 记叙文以 <b>过去时</b> 为主（was/went/said/saw），对话可用现在时。</div>');
      notes.push('<div class="pa" style="color:var(--warn)"><b>⚠ 注意</b> · 不要写成议论文或描述文。故事需要有事件发展和时间线。</div>');
    } else {
      notes.push('<div class="pa"><b>审题要点</b> · 文章需要回答题目中的 <b>所有问题</b>。通常有 2-3 个问题需要逐一回应。</div>');
      notes.push('<div class="pa"><b>结构建议</b> · 引言（引入话题）→ 正文（逐个回答问题/表达观点）→ 结论（总结/呼吁）</div>');
      notes.push('<div class="pa"><b>语体</b> · 半正式（发表在杂志/网站），可以用 I think/In my opinion，但避免过于口语化。</div>');
      notes.push('<div class="pa" style="color:var(--warn)"><b>⚠ 注意</b> · 文章要有标题。所有题目中的问题都要回答，不能遗漏。</div>');
    }

    // 易错语法提醒
    notes.push('<div class="pa"><b>易错语法自检</b> · ' + PET_SCORING.grammarTips.slice(0, 3).join(" ") + '</div>');

    // 关键词分析
    var stop = {}; "the a an and or but to of in on for with as is are was were be been being this that these those it its by from at we you they he she i not can will should may might".split(" ").forEach(function (w) { stop[w] = 1; });
    var pk = {}; words(promptText).forEach(function (ww) {
      var t = ww.toLowerCase().replace(/[^a-z']/g, ""); if (t.length >= 4 && !stop[t]) pk[t] = 1;
    });
    var pkKeys = Object.keys(pk);
    if (pkKeys.length === 0) {
      notes.push('<div class="pa"><b>提示</b> · 请粘贴题目（邮件原文+notes / 文章题目+问题 / 故事开头句），以便精准切题分析。</div>');
    } else {
      paras.forEach(function (p, i) {
        var low = p.toLowerCase(), hit = 0;
        pkKeys.forEach(function (k) { if (low.indexOf(k) !== -1) hit++; });
        var ratio = pkKeys.length ? Math.round((hit / pkKeys.length) * 100) : 0;
        notes.push('<div class="pa"><b>第 ' + (i + 1) + ' 段</b> · 与题目关键词重叠 ' + ratio + '%' + (ratio < 25 ? '，存在偏题风险。' : '，整体切题。') + '</div>');
      });
    }
    return notes.join("");
  }

  // ---------- exam list ----------
  function renderExams() {
    el.examList.innerHTML = EXAMS.map(function (e) {
      return '<li class="' + (e.id === current.id ? "active" : "") + (e.active ? "" : " locked") + '" data-id="' + e.id + '" data-type="' + e.type + '">' +
        '<span class="ex-name">' + e.name + '</span><span class="ex-sub">' + e.sub + '</span></li>';
    }).join("");
    Array.prototype.slice.call(el.examList.querySelectorAll("li")).forEach(function (li) {
      li.addEventListener("click", function () {
        var ex = EXAMS.filter(function (x) { return x.id === li.getAttribute("data-id"); })[0];
        if (!ex.active) { alert(ex.name + " 模块即将上线，敬请期待（可在此对话框告知我加入）。"); return; }
        current = ex;
        el.curExam.textContent = ex.name;
        el.minHint.textContent = "建议 ≥ " + ex.minWords + " 词";
        if (ex.type === "aeas") { el.aeasPanel.classList.remove("hidden"); renderAeas(); }
        else { el.aeasPanel.classList.add("hidden"); }
        // Task 1 / KET picture / KET email / PET email / 高考：可切换图片题模式
        var imageTypes = ["task1", "ket_pic", "ket_email", "pet_email", "gaokao"];
        if (imageTypes.indexOf(ex.type) !== -1) {
          promptMode = "image";
          el.promptTextWrap.classList.add("hidden");
          el.promptImageWrap.classList.remove("hidden");
          var hintMap = { task1: "（小作文题目为图片：上传 / 从图库选择 / 或填图表关键词）", ket_pic: "（KET 图片描述：上传/粘贴图片 / 或填场景描述关键词）", ket_email: "（KET 邮件：可上传邮件截图 / 或粘贴题目文字）", pet_email: "（PET 邮件：可上传邮件截图 / 或粘贴题目文字）", gaokao: "（高考写作：上传题目图片 / 从真题题库选择 / 或粘贴题目文字）" };
          el.promptHint.textContent = hintMap[ex.type] || "（上传/粘贴题目图片 / 或填关键词）";
          // 切换到不同类型图片题时清空旧内容
          var prevType = imageTypes.filter(function (t) { return el.promptHint.textContent.indexOf(hintMap[t]) === -1; });
          el.imgCaption.value = "";
          clearImage();
        } else {
          promptMode = "text";
          el.promptImageWrap.classList.add("hidden");
          el.promptTextWrap.classList.remove("hidden");
          el.promptHint.textContent = "（粘贴题目，用于审题与切题分析）";
          el.imgCaption.value = "";
        }
        renderExams();
      });
    });
  }

  // ---------- 自动保存 ----------
  function autoSave() {
    try {
      var draft = {
        essay: el.essay.value,
        prompt: el.prompt.value,
        imgCaption: el.imgCaption.value,
        promptMode: promptMode,
        currentId: current.id,
        aeasState: aeasState,
        ts: Date.now()
      };
      localStorage.setItem("wc_draft", JSON.stringify(draft));
    } catch (e) {}
  }
  function restoreDraft() {
    try {
      var raw = localStorage.getItem("wc_draft");
      if (!raw) return;
      var draft = JSON.parse(raw);
      // 1 小时内有效
      if (Date.now() - draft.ts > 3600000) { localStorage.removeItem("wc_draft"); return; }
      if (draft.essay) el.essay.value = draft.essay;
      if (draft.prompt) el.prompt.value = draft.prompt;
      if (draft.imgCaption) el.imgCaption.value = draft.imgCaption;
      if (draft.aeasState) aeasState = draft.aeasState;
      if (draft.currentId) {
        var ex = EXAMS.filter(function (x) { return x.id === draft.currentId; })[0];
        if (ex && ex.active) {
          current = ex;
          el.curExam.textContent = ex.name;
          el.minHint.textContent = "建议 ≥ " + ex.minWords + " 词";
          renderExams();
          if (ex.type === "aeas") { el.aeasPanel.classList.remove("hidden"); renderAeas(); }
          if (draft.promptMode === "image") {
            promptMode = "image";
            el.promptTextWrap.classList.add("hidden");
            el.promptImageWrap.classList.remove("hidden");
            var hintMap = { task1: "（小作文题目为图片：上传 / 从图库选择 / 或填图表关键词）", ket_pic: "（KET 图片描述：上传/粘贴图片 / 或填场景描述关键词）", ket_picture: "（KET 图片描述：上传/粘贴图片 / 或填场景描述关键词）", ket_email: "（KET 邮件：可上传邮件截图 / 或粘贴题目文字）", pet_email: "（PET 邮件：可上传邮件截图 / 或粘贴题目文字）", gaokao: "（高考写作：上传题目图片 / 从真题题库选择 / 或粘贴题目文字）" };
            el.promptHint.textContent = hintMap[draft.currentId] || "（上传/粘贴题目图片 / 或填关键词）";
          }
        }
      }
      el.result.classList.add("hidden");
      el.wordCount.textContent = words(el.essay.value).length + " 词";
    } catch (e) {}
  }
  el.essay.addEventListener("input", function () {
    el.wordCount.textContent = words(el.essay.value).length + " 词";
    autoSave();
  });
  el.prompt.addEventListener("input", autoSave);
  el.imgCaption.addEventListener("input", autoSave);
  el.analyzeBtn.addEventListener("click", analyze);
  el.resetBtn.addEventListener("click", function () {
    el.result.classList.add("hidden");
    el.playbookCard.classList.add("hidden");
    var aiCard = document.getElementById("aiCard");
    if (aiCard) aiCard.remove();
    el.essay.value = ""; el.prompt.value = "";
    clearImage();
    selectedQuestion = null;
    el.wordCount.textContent = "0 词";
    try { localStorage.removeItem("wc_draft"); } catch (e) {}
    el.essay.focus();
  });

  // 工具按钮 + 弹窗
  el.patternBtn.addEventListener("click", function () { renderPatterns(); openModal("patternModal"); });
  el.bankBtn.addEventListener("click", function () { renderBank(); openModal("bankModal"); });
  el.petBankBtn.addEventListener("click", function () { renderPetBank(); openModal("petBankModal"); });
  el.ketBankBtn.addEventListener("click", function () { renderKetBank(); openModal("ketBankModal"); });
  el.gaokaoBankBtn.addEventListener("click", function () { renderGaokaoBank(); openModal("gaokaoBankModal"); });
  el.gaokaoBandBtn.addEventListener("click", function () { renderGaokaoBandGuide(); openModal("gaokaoBandModal"); });
  el.gaokaoPatternBtn.addEventListener("click", function () { renderGaokaoPatterns(); openModal("gaokaoPatternModal"); });
  el.bandBtn.addEventListener("click", function () { renderBandGuide(); openModal("bandModal"); });
  el.materialBtn.addEventListener("click", function () { renderMaterial(); openModal("materialModal"); });
  el.cihuoBtn.addEventListener("click", function () { renderCihuo(); openModal("cihuoModal"); });
  el.simonBtn.addEventListener("click", function () { renderSimon(); openModal("simonModal"); });
  el.aiBtn.addEventListener("click", function () { loadAI(); openModal("aiModal"); });
  el.aiProvider.addEventListener("change", function () {
    el.aiBaseWrap.style.display = (el.aiProvider.value === "custom") ? "block" : "none";
  });
  el.aiSave.addEventListener("click", saveAI);
  el.aiClear.addEventListener("click", clearAI);
  el.bankSearch.addEventListener("input", renderBank);
  el.bankType.addEventListener("change", renderBank);
  el.petBankSearch.addEventListener("input", renderPetBank);
  el.petBankType.addEventListener("change", renderPetBank);
  el.ketBankSearch.addEventListener("input", renderKetBank);
  el.ketBankType.addEventListener("change", renderKetBank);
  el.gaokaoBankSearch.addEventListener("input", renderGaokaoBank);
  el.gaokaoBankType.addEventListener("change", renderGaokaoBank);
  el.gaokaoBankYear.addEventListener("change", renderGaokaoBank);
  el.toeflBankBtn.addEventListener("click", function () { renderToeflBank(); openModal("toeflBankModal"); });
  el.toeflBankSearch.addEventListener("input", renderToeflBank);
  el.toeflBankType.addEventListener("change", renderToeflBank);
  el.simonType.addEventListener("change", renderSimon);
  el.examinerBtn.addEventListener("click", function () { renderExaminer(); openModal("examinerModal"); });
  el.examinerType.addEventListener("change", renderExaminer);
  // 图片题目
  el.pickImgBtn.addEventListener("click", function () { el.imgFile.click(); });
  el.imgFile.addEventListener("change", function () { if (el.imgFile.files[0]) handleImageFile(el.imgFile.files[0]); });
  el.galleryBtn.addEventListener("click", function () { renderGallery(); openModal("galleryModal"); });
  el.clearImgBtn.addEventListener("click", clearImage);
  el.promptImgBox.addEventListener("click", function () { if (!task1Image) el.imgFile.click(); });
  // Ctrl+V 粘贴图片
  el.promptImgBox.addEventListener("paste", function (e) {
    var items = (e.clipboardData || window.clipboardData).items || [];
    for (var i = 0; i < items.length; i++) {
      if (items[i].type && items[i].type.indexOf("image") === 0) { handleImageFile(items[i].getAsFile()); e.preventDefault(); break; }
    }
  });
  Array.prototype.slice.call(document.querySelectorAll("[data-close]")).forEach(function (b) {
    b.addEventListener("click", function () { closeModal(b.getAttribute("data-close")); });
  });
  Array.prototype.slice.call(document.querySelectorAll(".modal")).forEach(function (m) {
    m.addEventListener("click", function (e) { if (e.target === m) m.classList.add("hidden"); });
  });

  // init
  restoreDraft();
  el.curExam.textContent = current.name;
  el.minHint.textContent = "建议 ≥ " + current.minWords + " 词";
  el.aeasPanel.classList.add("hidden");
  loadAI();
  renderExams();
  renderRef(current.type);
})();
