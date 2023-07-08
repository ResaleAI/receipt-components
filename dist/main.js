var du = Object.defineProperty;
var nu = (e, u, t) => u in e ? du(e, u, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[u] = t;
var _ = (e, u, t) => (nu(e, typeof u != "symbol" ? u + "" : u, t), t);
const g = {
  ESC: 27,
  LF: 10,
  NUL: 0,
  GS: 29
}, fu = (e) => e ? e.reduce((u, t) => [...u, ...t], []) : [];
async function I(e, u) {
  if (!e)
    return [];
  let t = [];
  for (const a of e)
    t.push(await a(u));
  return fu(t);
}
const S = (e) => {
  if (e.length !== 1)
    throw new Error("charToByte only accepts a single character");
  return e.charCodeAt(0);
}, bu = (e, u) => e.replace(
  /\{\s*(\w+)\s*\}/g,
  (a, i) => u[i] ? `${u[i]}` : `{ ${i} }`
);
function J(e) {
  return e && JSON.parse(JSON.stringify(e));
}
const B = {
  font1: 0,
  font2: 1,
  bold: 8,
  long: 16,
  wide: 32,
  underline: 128
}, P = {
  buildHtml(e, u) {
    return `<span>${u}</span>`;
  },
  async buildEscPos(e, u, t) {
    const a = e.bold !== void 0 ? B.bold : 0, i = e.font === "2" ? B.font2 : B.font1;
    if (!t)
      throw new Error("Context is required for text node");
    const s = J(t);
    console.log("context: ", s.textMode);
    let d = s.textMode;
    return d |= a, d & B.font2 ? d &= i : d |= i, e.reset && (d = 0), d === s.textMode ? I(u, s) : (s.textMode = d, [
      g.ESC,
      S("!"),
      d,
      ...await I(u, s),
      g.ESC,
      S("!"),
      t.textMode
    ]);
  }
}, L = {
  left: 0,
  center: 1,
  right: 2
}, ou = {
  buildHtml({ mode: e }, u) {
    return `<div style="text-align: ${e};">${u == null ? void 0 : u.join("")}</div>`;
  },
  async buildEscPos({ mode: e }, u) {
    const t = L[e], a = [
      g.ESC,
      S("a"),
      t,
      ...await I(u)
    ];
    return t !== L.left && a.push(g.ESC, S("a"), L.left), a;
  }
}, lu = {
  lines: 1
}, hu = {
  buildHtml(e, u) {
    return "<br />";
  },
  async buildEscPos({ lines: e } = lu, u) {
    return [g.ESC, S("d"), e];
  }
}, xu = {
  buildHtml(e, u) {
    return `<div>${u == null ? void 0 : u.join("")}</div>`;
  },
  async buildEscPos(e, u) {
    return [
      g.ESC,
      S("@"),
      ...await I(u),
      g.LF,
      g.GS,
      S("V"),
      1,
      3
    ];
  }
}, mu = {
  buildHtml(e, u) {
    return (u == null ? void 0 : u.join("")) ?? "";
  },
  async buildEscPos(e, u) {
    return [
      g.GS,
      S("b"),
      1,
      ...await I(u),
      g.GS,
      S("b"),
      0
    ];
  }
}, pu = {
  buildHtml({ width: e, height: u }, t) {
    return `<div style="width: ${e}px; height: ${u}px;">${t == null ? void 0 : t.join(
      ""
    )}</div>`;
  },
  async buildEscPos({ width: e, height: u }, t, a) {
    if (!a)
      throw new Error("No context found");
    e > 5 ? e = 5 : e < 0 && (e = 0), u > 5 ? u = 5 : u < 0 && (u = 0);
    const i = J(a);
    return i.scaleBits &= 240, i.scaleBits |= u - 1, i.scaleBits &= 15, i.scaleBits |= e - 1 << 4, i.scaleBits === a.scaleBits ? I(t) : [
      g.GS,
      S("!"),
      i.scaleBits,
      ...await I(t, i),
      g.GS,
      S("!"),
      a.scaleBits
    ];
  }
}, X = new Uint16Array(
  // prettier-ignore
  'ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map((e) => e.charCodeAt(0))
), Y = new Uint16Array(
  // prettier-ignore
  "Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map((e) => e.charCodeAt(0))
);
var R;
const gu = /* @__PURE__ */ new Map([
  [0, 65533],
  // C1 Unicode control character reference replacements
  [128, 8364],
  [130, 8218],
  [131, 402],
  [132, 8222],
  [133, 8230],
  [134, 8224],
  [135, 8225],
  [136, 710],
  [137, 8240],
  [138, 352],
  [139, 8249],
  [140, 338],
  [142, 381],
  [145, 8216],
  [146, 8217],
  [147, 8220],
  [148, 8221],
  [149, 8226],
  [150, 8211],
  [151, 8212],
  [152, 732],
  [153, 8482],
  [154, 353],
  [155, 8250],
  [156, 339],
  [158, 382],
  [159, 376]
]), U = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, node/no-unsupported-features/es-builtins
  (R = String.fromCodePoint) !== null && R !== void 0 ? R : function(e) {
    let u = "";
    return e > 65535 && (e -= 65536, u += String.fromCharCode(e >>> 10 & 1023 | 55296), e = 56320 | e & 1023), u += String.fromCharCode(e), u;
  }
);
function Su(e) {
  var u;
  return e >= 55296 && e <= 57343 || e > 1114111 ? 65533 : (u = gu.get(e)) !== null && u !== void 0 ? u : e;
}
var l;
(function(e) {
  e[e.NUM = 35] = "NUM", e[e.SEMI = 59] = "SEMI", e[e.EQUALS = 61] = "EQUALS", e[e.ZERO = 48] = "ZERO", e[e.NINE = 57] = "NINE", e[e.LOWER_A = 97] = "LOWER_A", e[e.LOWER_F = 102] = "LOWER_F", e[e.LOWER_X = 120] = "LOWER_X", e[e.LOWER_Z = 122] = "LOWER_Z", e[e.UPPER_A = 65] = "UPPER_A", e[e.UPPER_F = 70] = "UPPER_F", e[e.UPPER_Z = 90] = "UPPER_Z";
})(l || (l = {}));
const wu = 32;
var A;
(function(e) {
  e[e.VALUE_LENGTH = 49152] = "VALUE_LENGTH", e[e.BRANCH_LENGTH = 16256] = "BRANCH_LENGTH", e[e.JUMP_TABLE = 127] = "JUMP_TABLE";
})(A || (A = {}));
function M(e) {
  return e >= l.ZERO && e <= l.NINE;
}
function yu(e) {
  return e >= l.UPPER_A && e <= l.UPPER_F || e >= l.LOWER_A && e <= l.LOWER_F;
}
function Eu(e) {
  return e >= l.UPPER_A && e <= l.UPPER_Z || e >= l.LOWER_A && e <= l.LOWER_Z || M(e);
}
function Au(e) {
  return e === l.EQUALS || Eu(e);
}
var o;
(function(e) {
  e[e.EntityStart = 0] = "EntityStart", e[e.NumericStart = 1] = "NumericStart", e[e.NumericDecimal = 2] = "NumericDecimal", e[e.NumericHex = 3] = "NumericHex", e[e.NamedEntity = 4] = "NamedEntity";
})(o || (o = {}));
var w;
(function(e) {
  e[e.Legacy = 0] = "Legacy", e[e.Strict = 1] = "Strict", e[e.Attribute = 2] = "Attribute";
})(w || (w = {}));
class K {
  constructor(u, t, a) {
    this.decodeTree = u, this.emitCodePoint = t, this.errors = a, this.state = o.EntityStart, this.consumed = 1, this.result = 0, this.treeIndex = 0, this.excess = 1, this.decodeMode = w.Strict;
  }
  /** Resets the instance to make it reusable. */
  startEntity(u) {
    this.decodeMode = u, this.state = o.EntityStart, this.result = 0, this.treeIndex = 0, this.excess = 1, this.consumed = 1;
  }
  /**
   * Write an entity to the decoder. This can be called multiple times with partial entities.
   * If the entity is incomplete, the decoder will return -1.
   *
   * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
   * entity is incomplete, and resume when the next string is written.
   *
   * @param string The string containing the entity (or a continuation of the entity).
   * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  write(u, t) {
    switch (this.state) {
      case o.EntityStart:
        return u.charCodeAt(t) === l.NUM ? (this.state = o.NumericStart, this.consumed += 1, this.stateNumericStart(u, t + 1)) : (this.state = o.NamedEntity, this.stateNamedEntity(u, t));
      case o.NumericStart:
        return this.stateNumericStart(u, t);
      case o.NumericDecimal:
        return this.stateNumericDecimal(u, t);
      case o.NumericHex:
        return this.stateNumericHex(u, t);
      case o.NamedEntity:
        return this.stateNamedEntity(u, t);
    }
  }
  /**
   * Switches between the numeric decimal and hexadecimal states.
   *
   * Equivalent to the `Numeric character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericStart(u, t) {
    return t >= u.length ? -1 : (u.charCodeAt(t) | wu) === l.LOWER_X ? (this.state = o.NumericHex, this.consumed += 1, this.stateNumericHex(u, t + 1)) : (this.state = o.NumericDecimal, this.stateNumericDecimal(u, t));
  }
  addToNumericResult(u, t, a, i) {
    if (t !== a) {
      const s = a - t;
      this.result = this.result * Math.pow(i, s) + parseInt(u.substr(t, s), i), this.consumed += s;
    }
  }
  /**
   * Parses a hexadecimal numeric entity.
   *
   * Equivalent to the `Hexademical character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericHex(u, t) {
    const a = t;
    for (; t < u.length; ) {
      const i = u.charCodeAt(t);
      if (M(i) || yu(i))
        t += 1;
      else
        return this.addToNumericResult(u, a, t, 16), this.emitNumericEntity(i, 3);
    }
    return this.addToNumericResult(u, a, t, 16), -1;
  }
  /**
   * Parses a decimal numeric entity.
   *
   * Equivalent to the `Decimal character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericDecimal(u, t) {
    const a = t;
    for (; t < u.length; ) {
      const i = u.charCodeAt(t);
      if (M(i))
        t += 1;
      else
        return this.addToNumericResult(u, a, t, 10), this.emitNumericEntity(i, 2);
    }
    return this.addToNumericResult(u, a, t, 10), -1;
  }
  /**
   * Validate and emit a numeric entity.
   *
   * Implements the logic from the `Hexademical character reference start
   * state` and `Numeric character reference end state` in the HTML spec.
   *
   * @param lastCp The last code point of the entity. Used to see if the
   *               entity was terminated with a semicolon.
   * @param expectedLength The minimum number of characters that should be
   *                       consumed. Used to validate that at least one digit
   *                       was consumed.
   * @returns The number of characters that were consumed.
   */
  emitNumericEntity(u, t) {
    var a;
    if (this.consumed <= t)
      return (a = this.errors) === null || a === void 0 || a.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
    if (u === l.SEMI)
      this.consumed += 1;
    else if (this.decodeMode === w.Strict)
      return 0;
    return this.emitCodePoint(Su(this.result), this.consumed), this.errors && (u !== l.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed;
  }
  /**
   * Parses a named entity.
   *
   * Equivalent to the `Named character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNamedEntity(u, t) {
    const { decodeTree: a } = this;
    let i = a[this.treeIndex], s = (i & A.VALUE_LENGTH) >> 14;
    for (; t < u.length; t++, this.excess++) {
      const d = u.charCodeAt(t);
      if (this.treeIndex = Iu(a, i, this.treeIndex + Math.max(1, s), d), this.treeIndex < 0)
        return this.result === 0 || // If we are parsing an attribute
        this.decodeMode === w.Attribute && // We shouldn't have consumed any characters after the entity,
        (s === 0 || // And there should be no invalid characters.
        Au(d)) ? 0 : this.emitNotTerminatedNamedEntity();
      if (i = a[this.treeIndex], s = (i & A.VALUE_LENGTH) >> 14, s !== 0) {
        if (d === l.SEMI)
          return this.emitNamedEntityData(this.treeIndex, s, this.consumed + this.excess);
        this.decodeMode !== w.Strict && (this.result = this.treeIndex, this.consumed += this.excess, this.excess = 0);
      }
    }
    return -1;
  }
  /**
   * Emit a named entity that was not terminated with a semicolon.
   *
   * @returns The number of characters consumed.
   */
  emitNotTerminatedNamedEntity() {
    var u;
    const { result: t, decodeTree: a } = this, i = (a[t] & A.VALUE_LENGTH) >> 14;
    return this.emitNamedEntityData(t, i, this.consumed), (u = this.errors) === null || u === void 0 || u.missingSemicolonAfterCharacterReference(), this.consumed;
  }
  /**
   * Emit a named entity.
   *
   * @param result The index of the entity in the decode tree.
   * @param valueLength The number of bytes in the entity.
   * @param consumed The number of characters consumed.
   *
   * @returns The number of characters consumed.
   */
  emitNamedEntityData(u, t, a) {
    const { decodeTree: i } = this;
    return this.emitCodePoint(t === 1 ? i[u] & ~A.VALUE_LENGTH : i[u + 1], a), t === 3 && this.emitCodePoint(i[u + 2], a), a;
  }
  /**
   * Signal to the parser that the end of the input was reached.
   *
   * Remaining data will be emitted and relevant errors will be produced.
   *
   * @returns The number of characters consumed.
   */
  end() {
    var u;
    switch (this.state) {
      case o.NamedEntity:
        return this.result !== 0 && (this.decodeMode !== w.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
      case o.NumericDecimal:
        return this.emitNumericEntity(0, 2);
      case o.NumericHex:
        return this.emitNumericEntity(0, 3);
      case o.NumericStart:
        return (u = this.errors) === null || u === void 0 || u.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
      case o.EntityStart:
        return 0;
    }
  }
}
function uu(e) {
  let u = "";
  const t = new K(e, (a) => u += U(a));
  return function(i, s) {
    let d = 0, f = 0;
    for (; (f = i.indexOf("&", f)) >= 0; ) {
      u += i.slice(d, f), t.startEntity(s);
      const m = t.write(
        i,
        // Skip the "&"
        f + 1
      );
      if (m < 0) {
        d = f + t.end();
        break;
      }
      d = f + m, f = m === 0 ? d + 1 : d;
    }
    const h = u + i.slice(d);
    return u = "", h;
  };
}
function Iu(e, u, t, a) {
  const i = (u & A.BRANCH_LENGTH) >> 7, s = u & A.JUMP_TABLE;
  if (i === 0)
    return s !== 0 && a === s ? t : -1;
  if (s) {
    const h = a - s;
    return h < 0 || h >= i ? -1 : e[t + h] - 1;
  }
  let d = t, f = d + i - 1;
  for (; d <= f; ) {
    const h = d + f >>> 1, m = e[h];
    if (m < a)
      d = h + 1;
    else if (m > a)
      f = h - 1;
    else
      return e[h + i];
  }
  return -1;
}
uu(X);
uu(Y);
var r;
(function(e) {
  e[e.Tab = 9] = "Tab", e[e.NewLine = 10] = "NewLine", e[e.FormFeed = 12] = "FormFeed", e[e.CarriageReturn = 13] = "CarriageReturn", e[e.Space = 32] = "Space", e[e.ExclamationMark = 33] = "ExclamationMark", e[e.Number = 35] = "Number", e[e.Amp = 38] = "Amp", e[e.SingleQuote = 39] = "SingleQuote", e[e.DoubleQuote = 34] = "DoubleQuote", e[e.Dash = 45] = "Dash", e[e.Slash = 47] = "Slash", e[e.Zero = 48] = "Zero", e[e.Nine = 57] = "Nine", e[e.Semi = 59] = "Semi", e[e.Lt = 60] = "Lt", e[e.Eq = 61] = "Eq", e[e.Gt = 62] = "Gt", e[e.Questionmark = 63] = "Questionmark", e[e.UpperA = 65] = "UpperA", e[e.LowerA = 97] = "LowerA", e[e.UpperF = 70] = "UpperF", e[e.LowerF = 102] = "LowerF", e[e.UpperZ = 90] = "UpperZ", e[e.LowerZ = 122] = "LowerZ", e[e.LowerX = 120] = "LowerX", e[e.OpeningSquareBracket = 91] = "OpeningSquareBracket";
})(r || (r = {}));
var c;
(function(e) {
  e[e.Text = 1] = "Text", e[e.BeforeTagName = 2] = "BeforeTagName", e[e.InTagName = 3] = "InTagName", e[e.InSelfClosingTag = 4] = "InSelfClosingTag", e[e.BeforeClosingTagName = 5] = "BeforeClosingTagName", e[e.InClosingTagName = 6] = "InClosingTagName", e[e.AfterClosingTagName = 7] = "AfterClosingTagName", e[e.BeforeAttributeName = 8] = "BeforeAttributeName", e[e.InAttributeName = 9] = "InAttributeName", e[e.AfterAttributeName = 10] = "AfterAttributeName", e[e.BeforeAttributeValue = 11] = "BeforeAttributeValue", e[e.InAttributeValueDq = 12] = "InAttributeValueDq", e[e.InAttributeValueSq = 13] = "InAttributeValueSq", e[e.InAttributeValueNq = 14] = "InAttributeValueNq", e[e.BeforeDeclaration = 15] = "BeforeDeclaration", e[e.InDeclaration = 16] = "InDeclaration", e[e.InProcessingInstruction = 17] = "InProcessingInstruction", e[e.BeforeComment = 18] = "BeforeComment", e[e.CDATASequence = 19] = "CDATASequence", e[e.InSpecialComment = 20] = "InSpecialComment", e[e.InCommentLike = 21] = "InCommentLike", e[e.BeforeSpecialS = 22] = "BeforeSpecialS", e[e.SpecialStartSequence = 23] = "SpecialStartSequence", e[e.InSpecialTag = 24] = "InSpecialTag", e[e.InEntity = 25] = "InEntity";
})(c || (c = {}));
function E(e) {
  return e === r.Space || e === r.NewLine || e === r.Tab || e === r.FormFeed || e === r.CarriageReturn;
}
function D(e) {
  return e === r.Slash || e === r.Gt || E(e);
}
function Nu(e) {
  return e >= r.LowerA && e <= r.LowerZ || e >= r.UpperA && e <= r.UpperZ;
}
var y;
(function(e) {
  e[e.NoValue = 0] = "NoValue", e[e.Unquoted = 1] = "Unquoted", e[e.Single = 2] = "Single", e[e.Double = 3] = "Double";
})(y || (y = {}));
const x = {
  Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]),
  CdataEnd: new Uint8Array([93, 93, 62]),
  CommentEnd: new Uint8Array([45, 45, 62]),
  ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]),
  StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]),
  TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101])
  // `</title`
};
class Tu {
  constructor({ xmlMode: u = !1, decodeEntities: t = !0 }, a) {
    this.cbs = a, this.state = c.Text, this.buffer = "", this.sectionStart = 0, this.index = 0, this.entityStart = 0, this.baseState = c.Text, this.isSpecial = !1, this.running = !0, this.offset = 0, this.currentSequence = void 0, this.sequenceIndex = 0, this.xmlMode = u, this.decodeEntities = t, this.entityDecoder = new K(u ? Y : X, (i, s) => this.emitCodePoint(i, s));
  }
  reset() {
    this.state = c.Text, this.buffer = "", this.sectionStart = 0, this.index = 0, this.baseState = c.Text, this.currentSequence = void 0, this.running = !0, this.offset = 0;
  }
  write(u) {
    this.offset += this.buffer.length, this.buffer = u, this.parse();
  }
  end() {
    this.running && this.finish();
  }
  pause() {
    this.running = !1;
  }
  resume() {
    this.running = !0, this.index < this.buffer.length + this.offset && this.parse();
  }
  stateText(u) {
    u === r.Lt || !this.decodeEntities && this.fastForwardTo(r.Lt) ? (this.index > this.sectionStart && this.cbs.ontext(this.sectionStart, this.index), this.state = c.BeforeTagName, this.sectionStart = this.index) : this.decodeEntities && u === r.Amp && this.startEntity();
  }
  stateSpecialStartSequence(u) {
    const t = this.sequenceIndex === this.currentSequence.length;
    if (!(t ? (
      // If we are at the end of the sequence, make sure the tag name has ended
      D(u)
    ) : (
      // Otherwise, do a case-insensitive comparison
      (u | 32) === this.currentSequence[this.sequenceIndex]
    )))
      this.isSpecial = !1;
    else if (!t) {
      this.sequenceIndex++;
      return;
    }
    this.sequenceIndex = 0, this.state = c.InTagName, this.stateInTagName(u);
  }
  /** Look for an end tag. For <title> tags, also decode entities. */
  stateInSpecialTag(u) {
    if (this.sequenceIndex === this.currentSequence.length) {
      if (u === r.Gt || E(u)) {
        const t = this.index - this.currentSequence.length;
        if (this.sectionStart < t) {
          const a = this.index;
          this.index = t, this.cbs.ontext(this.sectionStart, t), this.index = a;
        }
        this.isSpecial = !1, this.sectionStart = t + 2, this.stateInClosingTagName(u);
        return;
      }
      this.sequenceIndex = 0;
    }
    (u | 32) === this.currentSequence[this.sequenceIndex] ? this.sequenceIndex += 1 : this.sequenceIndex === 0 ? this.currentSequence === x.TitleEnd ? this.decodeEntities && u === r.Amp && this.startEntity() : this.fastForwardTo(r.Lt) && (this.sequenceIndex = 1) : this.sequenceIndex = +(u === r.Lt);
  }
  stateCDATASequence(u) {
    u === x.Cdata[this.sequenceIndex] ? ++this.sequenceIndex === x.Cdata.length && (this.state = c.InCommentLike, this.currentSequence = x.CdataEnd, this.sequenceIndex = 0, this.sectionStart = this.index + 1) : (this.sequenceIndex = 0, this.state = c.InDeclaration, this.stateInDeclaration(u));
  }
  /**
   * When we wait for one specific character, we can speed things up
   * by skipping through the buffer until we find it.
   *
   * @returns Whether the character was found.
   */
  fastForwardTo(u) {
    for (; ++this.index < this.buffer.length + this.offset; )
      if (this.buffer.charCodeAt(this.index - this.offset) === u)
        return !0;
    return this.index = this.buffer.length + this.offset - 1, !1;
  }
  /**
   * Comments and CDATA end with `-->` and `]]>`.
   *
   * Their common qualities are:
   * - Their end sequences have a distinct character they start with.
   * - That character is then repeated, so we have to check multiple repeats.
   * - All characters but the start character of the sequence can be skipped.
   */
  stateInCommentLike(u) {
    u === this.currentSequence[this.sequenceIndex] ? ++this.sequenceIndex === this.currentSequence.length && (this.currentSequence === x.CdataEnd ? this.cbs.oncdata(this.sectionStart, this.index, 2) : this.cbs.oncomment(this.sectionStart, this.index, 2), this.sequenceIndex = 0, this.sectionStart = this.index + 1, this.state = c.Text) : this.sequenceIndex === 0 ? this.fastForwardTo(this.currentSequence[0]) && (this.sequenceIndex = 1) : u !== this.currentSequence[this.sequenceIndex - 1] && (this.sequenceIndex = 0);
  }
  /**
   * HTML only allows ASCII alpha characters (a-z and A-Z) at the beginning of a tag name.
   *
   * XML allows a lot more characters here (@see https://www.w3.org/TR/REC-xml/#NT-NameStartChar).
   * We allow anything that wouldn't end the tag.
   */
  isTagStartChar(u) {
    return this.xmlMode ? !D(u) : Nu(u);
  }
  startSpecial(u, t) {
    this.isSpecial = !0, this.currentSequence = u, this.sequenceIndex = t, this.state = c.SpecialStartSequence;
  }
  stateBeforeTagName(u) {
    if (u === r.ExclamationMark)
      this.state = c.BeforeDeclaration, this.sectionStart = this.index + 1;
    else if (u === r.Questionmark)
      this.state = c.InProcessingInstruction, this.sectionStart = this.index + 1;
    else if (this.isTagStartChar(u)) {
      const t = u | 32;
      this.sectionStart = this.index, !this.xmlMode && t === x.TitleEnd[2] ? this.startSpecial(x.TitleEnd, 3) : this.state = !this.xmlMode && t === x.ScriptEnd[2] ? c.BeforeSpecialS : c.InTagName;
    } else
      u === r.Slash ? this.state = c.BeforeClosingTagName : (this.state = c.Text, this.stateText(u));
  }
  stateInTagName(u) {
    D(u) && (this.cbs.onopentagname(this.sectionStart, this.index), this.sectionStart = -1, this.state = c.BeforeAttributeName, this.stateBeforeAttributeName(u));
  }
  stateBeforeClosingTagName(u) {
    E(u) || (u === r.Gt ? this.state = c.Text : (this.state = this.isTagStartChar(u) ? c.InClosingTagName : c.InSpecialComment, this.sectionStart = this.index));
  }
  stateInClosingTagName(u) {
    (u === r.Gt || E(u)) && (this.cbs.onclosetag(this.sectionStart, this.index), this.sectionStart = -1, this.state = c.AfterClosingTagName, this.stateAfterClosingTagName(u));
  }
  stateAfterClosingTagName(u) {
    (u === r.Gt || this.fastForwardTo(r.Gt)) && (this.state = c.Text, this.sectionStart = this.index + 1);
  }
  stateBeforeAttributeName(u) {
    u === r.Gt ? (this.cbs.onopentagend(this.index), this.isSpecial ? (this.state = c.InSpecialTag, this.sequenceIndex = 0) : this.state = c.Text, this.sectionStart = this.index + 1) : u === r.Slash ? this.state = c.InSelfClosingTag : E(u) || (this.state = c.InAttributeName, this.sectionStart = this.index);
  }
  stateInSelfClosingTag(u) {
    u === r.Gt ? (this.cbs.onselfclosingtag(this.index), this.state = c.Text, this.sectionStart = this.index + 1, this.isSpecial = !1) : E(u) || (this.state = c.BeforeAttributeName, this.stateBeforeAttributeName(u));
  }
  stateInAttributeName(u) {
    (u === r.Eq || D(u)) && (this.cbs.onattribname(this.sectionStart, this.index), this.sectionStart = -1, this.state = c.AfterAttributeName, this.stateAfterAttributeName(u));
  }
  stateAfterAttributeName(u) {
    u === r.Eq ? this.state = c.BeforeAttributeValue : u === r.Slash || u === r.Gt ? (this.cbs.onattribend(y.NoValue, this.index), this.state = c.BeforeAttributeName, this.stateBeforeAttributeName(u)) : E(u) || (this.cbs.onattribend(y.NoValue, this.index), this.state = c.InAttributeName, this.sectionStart = this.index);
  }
  stateBeforeAttributeValue(u) {
    u === r.DoubleQuote ? (this.state = c.InAttributeValueDq, this.sectionStart = this.index + 1) : u === r.SingleQuote ? (this.state = c.InAttributeValueSq, this.sectionStart = this.index + 1) : E(u) || (this.sectionStart = this.index, this.state = c.InAttributeValueNq, this.stateInAttributeValueNoQuotes(u));
  }
  handleInAttributeValue(u, t) {
    u === t || !this.decodeEntities && this.fastForwardTo(t) ? (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(t === r.DoubleQuote ? y.Double : y.Single, this.index), this.state = c.BeforeAttributeName) : this.decodeEntities && u === r.Amp && this.startEntity();
  }
  stateInAttributeValueDoubleQuotes(u) {
    this.handleInAttributeValue(u, r.DoubleQuote);
  }
  stateInAttributeValueSingleQuotes(u) {
    this.handleInAttributeValue(u, r.SingleQuote);
  }
  stateInAttributeValueNoQuotes(u) {
    E(u) || u === r.Gt ? (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(y.Unquoted, this.index), this.state = c.BeforeAttributeName, this.stateBeforeAttributeName(u)) : this.decodeEntities && u === r.Amp && this.startEntity();
  }
  stateBeforeDeclaration(u) {
    u === r.OpeningSquareBracket ? (this.state = c.CDATASequence, this.sequenceIndex = 0) : this.state = u === r.Dash ? c.BeforeComment : c.InDeclaration;
  }
  stateInDeclaration(u) {
    (u === r.Gt || this.fastForwardTo(r.Gt)) && (this.cbs.ondeclaration(this.sectionStart, this.index), this.state = c.Text, this.sectionStart = this.index + 1);
  }
  stateInProcessingInstruction(u) {
    (u === r.Gt || this.fastForwardTo(r.Gt)) && (this.cbs.onprocessinginstruction(this.sectionStart, this.index), this.state = c.Text, this.sectionStart = this.index + 1);
  }
  stateBeforeComment(u) {
    u === r.Dash ? (this.state = c.InCommentLike, this.currentSequence = x.CommentEnd, this.sequenceIndex = 2, this.sectionStart = this.index + 1) : this.state = c.InDeclaration;
  }
  stateInSpecialComment(u) {
    (u === r.Gt || this.fastForwardTo(r.Gt)) && (this.cbs.oncomment(this.sectionStart, this.index, 0), this.state = c.Text, this.sectionStart = this.index + 1);
  }
  stateBeforeSpecialS(u) {
    const t = u | 32;
    t === x.ScriptEnd[3] ? this.startSpecial(x.ScriptEnd, 4) : t === x.StyleEnd[3] ? this.startSpecial(x.StyleEnd, 4) : (this.state = c.InTagName, this.stateInTagName(u));
  }
  startEntity() {
    this.baseState = this.state, this.state = c.InEntity, this.entityStart = this.index, this.entityDecoder.startEntity(this.xmlMode ? w.Strict : this.baseState === c.Text || this.baseState === c.InSpecialTag ? w.Legacy : w.Attribute);
  }
  stateInEntity() {
    const u = this.entityDecoder.write(this.buffer, this.index - this.offset);
    u >= 0 ? (this.state = this.baseState, u === 0 && (this.index = this.entityStart)) : this.index = this.offset + this.buffer.length - 1;
  }
  /**
   * Remove data that has already been consumed from the buffer.
   */
  cleanup() {
    this.running && this.sectionStart !== this.index && (this.state === c.Text || this.state === c.InSpecialTag && this.sequenceIndex === 0 ? (this.cbs.ontext(this.sectionStart, this.index), this.sectionStart = this.index) : (this.state === c.InAttributeValueDq || this.state === c.InAttributeValueSq || this.state === c.InAttributeValueNq) && (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = this.index));
  }
  shouldContinue() {
    return this.index < this.buffer.length + this.offset && this.running;
  }
  /**
   * Iterates through the buffer, calling the function corresponding to the current state.
   *
   * States that are more likely to be hit are higher up, as a performance improvement.
   */
  parse() {
    for (; this.shouldContinue(); ) {
      const u = this.buffer.charCodeAt(this.index - this.offset);
      switch (this.state) {
        case c.Text: {
          this.stateText(u);
          break;
        }
        case c.SpecialStartSequence: {
          this.stateSpecialStartSequence(u);
          break;
        }
        case c.InSpecialTag: {
          this.stateInSpecialTag(u);
          break;
        }
        case c.CDATASequence: {
          this.stateCDATASequence(u);
          break;
        }
        case c.InAttributeValueDq: {
          this.stateInAttributeValueDoubleQuotes(u);
          break;
        }
        case c.InAttributeName: {
          this.stateInAttributeName(u);
          break;
        }
        case c.InCommentLike: {
          this.stateInCommentLike(u);
          break;
        }
        case c.InSpecialComment: {
          this.stateInSpecialComment(u);
          break;
        }
        case c.BeforeAttributeName: {
          this.stateBeforeAttributeName(u);
          break;
        }
        case c.InTagName: {
          this.stateInTagName(u);
          break;
        }
        case c.InClosingTagName: {
          this.stateInClosingTagName(u);
          break;
        }
        case c.BeforeTagName: {
          this.stateBeforeTagName(u);
          break;
        }
        case c.AfterAttributeName: {
          this.stateAfterAttributeName(u);
          break;
        }
        case c.InAttributeValueSq: {
          this.stateInAttributeValueSingleQuotes(u);
          break;
        }
        case c.BeforeAttributeValue: {
          this.stateBeforeAttributeValue(u);
          break;
        }
        case c.BeforeClosingTagName: {
          this.stateBeforeClosingTagName(u);
          break;
        }
        case c.AfterClosingTagName: {
          this.stateAfterClosingTagName(u);
          break;
        }
        case c.BeforeSpecialS: {
          this.stateBeforeSpecialS(u);
          break;
        }
        case c.InAttributeValueNq: {
          this.stateInAttributeValueNoQuotes(u);
          break;
        }
        case c.InSelfClosingTag: {
          this.stateInSelfClosingTag(u);
          break;
        }
        case c.InDeclaration: {
          this.stateInDeclaration(u);
          break;
        }
        case c.BeforeDeclaration: {
          this.stateBeforeDeclaration(u);
          break;
        }
        case c.BeforeComment: {
          this.stateBeforeComment(u);
          break;
        }
        case c.InProcessingInstruction: {
          this.stateInProcessingInstruction(u);
          break;
        }
        case c.InEntity: {
          this.stateInEntity();
          break;
        }
      }
      this.index++;
    }
    this.cleanup();
  }
  finish() {
    this.state === c.InEntity && (this.entityDecoder.end(), this.state = this.baseState), this.handleTrailingData(), this.cbs.onend();
  }
  /** Handle any trailing data. */
  handleTrailingData() {
    const u = this.buffer.length + this.offset;
    this.sectionStart >= u || (this.state === c.InCommentLike ? this.currentSequence === x.CdataEnd ? this.cbs.oncdata(this.sectionStart, u, 0) : this.cbs.oncomment(this.sectionStart, u, 0) : this.state === c.InTagName || this.state === c.BeforeAttributeName || this.state === c.BeforeAttributeValue || this.state === c.AfterAttributeName || this.state === c.InAttributeName || this.state === c.InAttributeValueSq || this.state === c.InAttributeValueDq || this.state === c.InAttributeValueNq || this.state === c.InClosingTagName || this.cbs.ontext(this.sectionStart, u));
  }
  emitCodePoint(u, t) {
    this.baseState !== c.Text && this.baseState !== c.InSpecialTag ? (this.sectionStart < this.entityStart && this.cbs.onattribdata(this.sectionStart, this.entityStart), this.sectionStart = this.entityStart + t, this.index = this.sectionStart - 1, this.cbs.onattribentity(u)) : (this.sectionStart < this.entityStart && this.cbs.ontext(this.sectionStart, this.entityStart), this.sectionStart = this.entityStart + t, this.index = this.sectionStart - 1, this.cbs.ontextentity(u, this.sectionStart));
  }
}
const v = /* @__PURE__ */ new Set([
  "input",
  "option",
  "optgroup",
  "select",
  "button",
  "datalist",
  "textarea"
]), b = /* @__PURE__ */ new Set(["p"]), z = /* @__PURE__ */ new Set(["thead", "tbody"]), Q = /* @__PURE__ */ new Set(["dd", "dt"]), j = /* @__PURE__ */ new Set(["rt", "rp"]), qu = /* @__PURE__ */ new Map([
  ["tr", /* @__PURE__ */ new Set(["tr", "th", "td"])],
  ["th", /* @__PURE__ */ new Set(["th"])],
  ["td", /* @__PURE__ */ new Set(["thead", "th", "td"])],
  ["body", /* @__PURE__ */ new Set(["head", "link", "script"])],
  ["li", /* @__PURE__ */ new Set(["li"])],
  ["p", b],
  ["h1", b],
  ["h2", b],
  ["h3", b],
  ["h4", b],
  ["h5", b],
  ["h6", b],
  ["select", v],
  ["input", v],
  ["output", v],
  ["button", v],
  ["datalist", v],
  ["textarea", v],
  ["option", /* @__PURE__ */ new Set(["option"])],
  ["optgroup", /* @__PURE__ */ new Set(["optgroup", "option"])],
  ["dd", Q],
  ["dt", Q],
  ["address", b],
  ["article", b],
  ["aside", b],
  ["blockquote", b],
  ["details", b],
  ["div", b],
  ["dl", b],
  ["fieldset", b],
  ["figcaption", b],
  ["figure", b],
  ["footer", b],
  ["form", b],
  ["header", b],
  ["hr", b],
  ["main", b],
  ["nav", b],
  ["ol", b],
  ["pre", b],
  ["section", b],
  ["table", b],
  ["ul", b],
  ["rt", j],
  ["rp", j],
  ["tbody", z],
  ["tfoot", z]
]), vu = /* @__PURE__ */ new Set([
  "area",
  "base",
  "basefont",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "img",
  "input",
  "isindex",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]), W = /* @__PURE__ */ new Set(["math", "svg"]), Z = /* @__PURE__ */ new Set([
  "mi",
  "mo",
  "mn",
  "ms",
  "mtext",
  "annotation-xml",
  "foreignobject",
  "desc",
  "title"
]), ku = /\s|\//;
class Bu {
  constructor(u, t = {}) {
    var a, i, s, d, f;
    this.options = t, this.startIndex = 0, this.endIndex = 0, this.openTagStart = 0, this.tagname = "", this.attribname = "", this.attribvalue = "", this.attribs = null, this.stack = [], this.buffers = [], this.bufferOffset = 0, this.writeIndex = 0, this.ended = !1, this.cbs = u ?? {}, this.htmlMode = !this.options.xmlMode, this.lowerCaseTagNames = (a = t.lowerCaseTags) !== null && a !== void 0 ? a : this.htmlMode, this.lowerCaseAttributeNames = (i = t.lowerCaseAttributeNames) !== null && i !== void 0 ? i : this.htmlMode, this.tokenizer = new ((s = t.Tokenizer) !== null && s !== void 0 ? s : Tu)(this.options, this), this.foreignContext = [!this.htmlMode], (f = (d = this.cbs).onparserinit) === null || f === void 0 || f.call(d, this);
  }
  // Tokenizer event handlers
  /** @internal */
  ontext(u, t) {
    var a, i;
    const s = this.getSlice(u, t);
    this.endIndex = t - 1, (i = (a = this.cbs).ontext) === null || i === void 0 || i.call(a, s), this.startIndex = t;
  }
  /** @internal */
  ontextentity(u, t) {
    var a, i;
    this.endIndex = t - 1, (i = (a = this.cbs).ontext) === null || i === void 0 || i.call(a, U(u)), this.startIndex = t;
  }
  /**
   * Checks if the current tag is a void element. Override this if you want
   * to specify your own additional void elements.
   */
  isVoidElement(u) {
    return this.htmlMode && vu.has(u);
  }
  /** @internal */
  onopentagname(u, t) {
    this.endIndex = t;
    let a = this.getSlice(u, t);
    this.lowerCaseTagNames && (a = a.toLowerCase()), this.emitOpenTag(a);
  }
  emitOpenTag(u) {
    var t, a, i, s;
    this.openTagStart = this.startIndex, this.tagname = u;
    const d = this.htmlMode && qu.get(u);
    if (d)
      for (; this.stack.length > 0 && d.has(this.stack[0]); ) {
        const f = this.stack.shift();
        (a = (t = this.cbs).onclosetag) === null || a === void 0 || a.call(t, f, !0);
      }
    this.isVoidElement(u) || (this.stack.unshift(u), this.htmlMode && (W.has(u) ? this.foreignContext.unshift(!0) : Z.has(u) && this.foreignContext.unshift(!1))), (s = (i = this.cbs).onopentagname) === null || s === void 0 || s.call(i, u), this.cbs.onopentag && (this.attribs = {});
  }
  endOpenTag(u) {
    var t, a;
    this.startIndex = this.openTagStart, this.attribs && ((a = (t = this.cbs).onopentag) === null || a === void 0 || a.call(t, this.tagname, this.attribs, u), this.attribs = null), this.cbs.onclosetag && this.isVoidElement(this.tagname) && this.cbs.onclosetag(this.tagname, !0), this.tagname = "";
  }
  /** @internal */
  onopentagend(u) {
    this.endIndex = u, this.endOpenTag(!1), this.startIndex = u + 1;
  }
  /** @internal */
  onclosetag(u, t) {
    var a, i, s, d, f, h, m, T;
    this.endIndex = t;
    let p = this.getSlice(u, t);
    if (this.lowerCaseTagNames && (p = p.toLowerCase()), this.htmlMode && (W.has(p) || Z.has(p)) && this.foreignContext.shift(), this.isVoidElement(p))
      this.htmlMode && p === "br" && ((d = (s = this.cbs).onopentagname) === null || d === void 0 || d.call(s, "br"), (h = (f = this.cbs).onopentag) === null || h === void 0 || h.call(f, "br", {}, !0), (T = (m = this.cbs).onclosetag) === null || T === void 0 || T.call(m, "br", !1));
    else {
      const q = this.stack.indexOf(p);
      if (q !== -1)
        for (let N = 0; N <= q; N++) {
          const k = this.stack.shift();
          (i = (a = this.cbs).onclosetag) === null || i === void 0 || i.call(a, k, N !== q);
        }
      else
        this.htmlMode && p === "p" && (this.emitOpenTag("p"), this.closeCurrentTag(!0));
    }
    this.startIndex = t + 1;
  }
  /** @internal */
  onselfclosingtag(u) {
    this.endIndex = u, this.options.recognizeSelfClosing || this.foreignContext[0] ? (this.closeCurrentTag(!1), this.startIndex = u + 1) : this.onopentagend(u);
  }
  closeCurrentTag(u) {
    var t, a;
    const i = this.tagname;
    this.endOpenTag(u), this.stack[0] === i && ((a = (t = this.cbs).onclosetag) === null || a === void 0 || a.call(t, i, !u), this.stack.shift());
  }
  /** @internal */
  onattribname(u, t) {
    this.startIndex = u;
    const a = this.getSlice(u, t);
    this.attribname = this.lowerCaseAttributeNames ? a.toLowerCase() : a;
  }
  /** @internal */
  onattribdata(u, t) {
    this.attribvalue += this.getSlice(u, t);
  }
  /** @internal */
  onattribentity(u) {
    this.attribvalue += U(u);
  }
  /** @internal */
  onattribend(u, t) {
    var a, i;
    this.endIndex = t, (i = (a = this.cbs).onattribute) === null || i === void 0 || i.call(a, this.attribname, this.attribvalue, u === y.Double ? '"' : u === y.Single ? "'" : u === y.NoValue ? void 0 : null), this.attribs && !Object.prototype.hasOwnProperty.call(this.attribs, this.attribname) && (this.attribs[this.attribname] = this.attribvalue), this.attribvalue = "";
  }
  getInstructionName(u) {
    const t = u.search(ku);
    let a = t < 0 ? u : u.substr(0, t);
    return this.lowerCaseTagNames && (a = a.toLowerCase()), a;
  }
  /** @internal */
  ondeclaration(u, t) {
    this.endIndex = t;
    const a = this.getSlice(u, t);
    if (this.cbs.onprocessinginstruction) {
      const i = this.getInstructionName(a);
      this.cbs.onprocessinginstruction(`!${i}`, `!${a}`);
    }
    this.startIndex = t + 1;
  }
  /** @internal */
  onprocessinginstruction(u, t) {
    this.endIndex = t;
    const a = this.getSlice(u, t);
    if (this.cbs.onprocessinginstruction) {
      const i = this.getInstructionName(a);
      this.cbs.onprocessinginstruction(`?${i}`, `?${a}`);
    }
    this.startIndex = t + 1;
  }
  /** @internal */
  oncomment(u, t, a) {
    var i, s, d, f;
    this.endIndex = t, (s = (i = this.cbs).oncomment) === null || s === void 0 || s.call(i, this.getSlice(u, t - a)), (f = (d = this.cbs).oncommentend) === null || f === void 0 || f.call(d), this.startIndex = t + 1;
  }
  /** @internal */
  oncdata(u, t, a) {
    var i, s, d, f, h, m, T, p, q, N;
    this.endIndex = t;
    const k = this.getSlice(u, t - a);
    !this.htmlMode || this.options.recognizeCDATA ? ((s = (i = this.cbs).oncdatastart) === null || s === void 0 || s.call(i), (f = (d = this.cbs).ontext) === null || f === void 0 || f.call(d, k), (m = (h = this.cbs).oncdataend) === null || m === void 0 || m.call(h)) : ((p = (T = this.cbs).oncomment) === null || p === void 0 || p.call(T, `[CDATA[${k}]]`), (N = (q = this.cbs).oncommentend) === null || N === void 0 || N.call(q)), this.startIndex = t + 1;
  }
  /** @internal */
  onend() {
    var u, t;
    if (this.cbs.onclosetag) {
      this.endIndex = this.startIndex;
      for (let a = 0; a < this.stack.length; a++)
        this.cbs.onclosetag(this.stack[a], !0);
    }
    (t = (u = this.cbs).onend) === null || t === void 0 || t.call(u);
  }
  /**
   * Resets the parser to a blank state, ready to parse a new HTML document
   */
  reset() {
    var u, t, a, i;
    (t = (u = this.cbs).onreset) === null || t === void 0 || t.call(u), this.tokenizer.reset(), this.tagname = "", this.attribname = "", this.attribs = null, this.stack.length = 0, this.startIndex = 0, this.endIndex = 0, (i = (a = this.cbs).onparserinit) === null || i === void 0 || i.call(a, this), this.buffers.length = 0, this.foreignContext.length = 0, this.foreignContext.unshift(!this.htmlMode), this.bufferOffset = 0, this.writeIndex = 0, this.ended = !1;
  }
  /**
   * Resets the parser, then parses a complete document and
   * pushes it to the handler.
   *
   * @param data Document to parse.
   */
  parseComplete(u) {
    this.reset(), this.end(u);
  }
  getSlice(u, t) {
    for (; u - this.bufferOffset >= this.buffers[0].length; )
      this.shiftBuffer();
    let a = this.buffers[0].slice(u - this.bufferOffset, t - this.bufferOffset);
    for (; t - this.bufferOffset > this.buffers[0].length; )
      this.shiftBuffer(), a += this.buffers[0].slice(0, t - this.bufferOffset);
    return a;
  }
  shiftBuffer() {
    this.bufferOffset += this.buffers[0].length, this.writeIndex--, this.buffers.shift();
  }
  /**
   * Parses a chunk of data and calls the corresponding callbacks.
   *
   * @param chunk Chunk to parse.
   */
  write(u) {
    var t, a;
    if (this.ended) {
      (a = (t = this.cbs).onerror) === null || a === void 0 || a.call(t, new Error(".write() after done!"));
      return;
    }
    this.buffers.push(u), this.tokenizer.running && (this.tokenizer.write(u), this.writeIndex++);
  }
  /**
   * Parses the end of the buffer and clears the stack, calls onend.
   *
   * @param chunk Optional final chunk to parse.
   */
  end(u) {
    var t, a;
    if (this.ended) {
      (a = (t = this.cbs).onerror) === null || a === void 0 || a.call(t, new Error(".end() after done!"));
      return;
    }
    u && this.write(u), this.ended = !0, this.tokenizer.end();
  }
  /**
   * Pauses parsing. The parser won't emit events until `resume` is called.
   */
  pause() {
    this.tokenizer.pause();
  }
  /**
   * Resumes parsing after `pause` was called.
   */
  resume() {
    for (this.tokenizer.resume(); this.tokenizer.running && this.writeIndex < this.buffers.length; )
      this.tokenizer.write(this.buffers[this.writeIndex++]);
    this.ended && this.tokenizer.end();
  }
  /**
   * Alias of `write`, for backwards compatibility.
   *
   * @param chunk Chunk to parse.
   * @deprecated
   */
  parseChunk(u) {
    this.write(u);
  }
  /**
   * Alias of `end`, for backwards compatibility.
   *
   * @param chunk Optional final chunk to parse.
   * @deprecated
   */
  done(u) {
    this.end(u);
  }
}
var n;
(function(e) {
  e.Root = "root", e.Text = "text", e.Directive = "directive", e.Comment = "comment", e.Script = "script", e.Style = "style", e.Tag = "tag", e.CDATA = "cdata", e.Doctype = "doctype";
})(n || (n = {}));
function Du(e) {
  return e.type === n.Tag || e.type === n.Script || e.type === n.Style;
}
n.Root;
n.Text;
n.Directive;
n.Comment;
n.Script;
n.Style;
n.Tag;
n.CDATA;
n.Doctype;
class eu {
  constructor() {
    this.parent = null, this.prev = null, this.next = null, this.startIndex = null, this.endIndex = null;
  }
  // Read-write aliases for properties
  /**
   * Same as {@link parent}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get parentNode() {
    return this.parent;
  }
  set parentNode(u) {
    this.parent = u;
  }
  /**
   * Same as {@link prev}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get previousSibling() {
    return this.prev;
  }
  set previousSibling(u) {
    this.prev = u;
  }
  /**
   * Same as {@link next}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get nextSibling() {
    return this.next;
  }
  set nextSibling(u) {
    this.next = u;
  }
  /**
   * Clone this node, and optionally its children.
   *
   * @param recursive Clone child nodes as well.
   * @returns A clone of the node.
   */
  cloneNode(u = !1) {
    return su(this, u);
  }
}
class G extends eu {
  /**
   * @param data The content of the data node
   */
  constructor(u) {
    super(), this.data = u;
  }
  /**
   * Same as {@link data}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get nodeValue() {
    return this.data;
  }
  set nodeValue(u) {
    this.data = u;
  }
}
class H extends G {
  constructor() {
    super(...arguments), this.type = n.Text;
  }
  get nodeType() {
    return 3;
  }
}
class tu extends G {
  constructor() {
    super(...arguments), this.type = n.Comment;
  }
  get nodeType() {
    return 8;
  }
}
class au extends G {
  constructor(u, t) {
    super(t), this.name = u, this.type = n.Directive;
  }
  get nodeType() {
    return 1;
  }
}
class C extends eu {
  /**
   * @param children Children of the node. Only certain node types can have children.
   */
  constructor(u) {
    super(), this.children = u;
  }
  // Aliases
  /** First child of the node. */
  get firstChild() {
    var u;
    return (u = this.children[0]) !== null && u !== void 0 ? u : null;
  }
  /** Last child of the node. */
  get lastChild() {
    return this.children.length > 0 ? this.children[this.children.length - 1] : null;
  }
  /**
   * Same as {@link children}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get childNodes() {
    return this.children;
  }
  set childNodes(u) {
    this.children = u;
  }
}
class iu extends C {
  constructor() {
    super(...arguments), this.type = n.CDATA;
  }
  get nodeType() {
    return 4;
  }
}
class O extends C {
  constructor() {
    super(...arguments), this.type = n.Root;
  }
  get nodeType() {
    return 9;
  }
}
class cu extends C {
  /**
   * @param name Name of the tag, eg. `div`, `span`.
   * @param attribs Object mapping attribute names to attribute values.
   * @param children Children of the node.
   */
  constructor(u, t, a = [], i = u === "script" ? n.Script : u === "style" ? n.Style : n.Tag) {
    super(a), this.name = u, this.attribs = t, this.type = i;
  }
  get nodeType() {
    return 1;
  }
  // DOM Level 1 aliases
  /**
   * Same as {@link name}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get tagName() {
    return this.name;
  }
  set tagName(u) {
    this.name = u;
  }
  get attributes() {
    return Object.keys(this.attribs).map((u) => {
      var t, a;
      return {
        name: u,
        value: this.attribs[u],
        namespace: (t = this["x-attribsNamespace"]) === null || t === void 0 ? void 0 : t[u],
        prefix: (a = this["x-attribsPrefix"]) === null || a === void 0 ? void 0 : a[u]
      };
    });
  }
}
function _u(e) {
  return Du(e);
}
function Lu(e) {
  return e.type === n.CDATA;
}
function Ru(e) {
  return e.type === n.Text;
}
function Vu(e) {
  return e.type === n.Comment;
}
function Pu(e) {
  return e.type === n.Directive;
}
function Uu(e) {
  return e.type === n.Root;
}
function su(e, u = !1) {
  let t;
  if (Ru(e))
    t = new H(e.data);
  else if (Vu(e))
    t = new tu(e.data);
  else if (_u(e)) {
    const a = u ? V(e.children) : [], i = new cu(e.name, { ...e.attribs }, a);
    a.forEach((s) => s.parent = i), e.namespace != null && (i.namespace = e.namespace), e["x-attribsNamespace"] && (i["x-attribsNamespace"] = { ...e["x-attribsNamespace"] }), e["x-attribsPrefix"] && (i["x-attribsPrefix"] = { ...e["x-attribsPrefix"] }), t = i;
  } else if (Lu(e)) {
    const a = u ? V(e.children) : [], i = new iu(a);
    a.forEach((s) => s.parent = i), t = i;
  } else if (Uu(e)) {
    const a = u ? V(e.children) : [], i = new O(a);
    a.forEach((s) => s.parent = i), e["x-mode"] && (i["x-mode"] = e["x-mode"]), t = i;
  } else if (Pu(e)) {
    const a = new au(e.name, e.data);
    e["x-name"] != null && (a["x-name"] = e["x-name"], a["x-publicId"] = e["x-publicId"], a["x-systemId"] = e["x-systemId"]), t = a;
  } else
    throw new Error(`Not implemented yet: ${e.type}`);
  return t.startIndex = e.startIndex, t.endIndex = e.endIndex, e.sourceCodeLocation != null && (t.sourceCodeLocation = e.sourceCodeLocation), t;
}
function V(e) {
  const u = e.map((t) => su(t, !0));
  for (let t = 1; t < u.length; t++)
    u[t].prev = u[t - 1], u[t - 1].next = u[t];
  return u;
}
const $ = {
  withStartIndices: !1,
  withEndIndices: !1,
  xmlMode: !1
};
class Mu {
  /**
   * @param callback Called once parsing has completed.
   * @param options Settings for the handler.
   * @param elementCB Callback whenever a tag is closed.
   */
  constructor(u, t, a) {
    this.dom = [], this.root = new O(this.dom), this.done = !1, this.tagStack = [this.root], this.lastNode = null, this.parser = null, typeof t == "function" && (a = t, t = $), typeof u == "object" && (t = u, u = void 0), this.callback = u ?? null, this.options = t ?? $, this.elementCB = a ?? null;
  }
  onparserinit(u) {
    this.parser = u;
  }
  // Resets the handler back to starting state
  onreset() {
    this.dom = [], this.root = new O(this.dom), this.done = !1, this.tagStack = [this.root], this.lastNode = null, this.parser = null;
  }
  // Signals the handler that parsing is done
  onend() {
    this.done || (this.done = !0, this.parser = null, this.handleCallback(null));
  }
  onerror(u) {
    this.handleCallback(u);
  }
  onclosetag() {
    this.lastNode = null;
    const u = this.tagStack.pop();
    this.options.withEndIndices && (u.endIndex = this.parser.endIndex), this.elementCB && this.elementCB(u);
  }
  onopentag(u, t) {
    const a = this.options.xmlMode ? n.Tag : void 0, i = new cu(u, t, void 0, a);
    this.addNode(i), this.tagStack.push(i);
  }
  ontext(u) {
    const { lastNode: t } = this;
    if (t && t.type === n.Text)
      t.data += u, this.options.withEndIndices && (t.endIndex = this.parser.endIndex);
    else {
      const a = new H(u);
      this.addNode(a), this.lastNode = a;
    }
  }
  oncomment(u) {
    if (this.lastNode && this.lastNode.type === n.Comment) {
      this.lastNode.data += u;
      return;
    }
    const t = new tu(u);
    this.addNode(t), this.lastNode = t;
  }
  oncommentend() {
    this.lastNode = null;
  }
  oncdatastart() {
    const u = new H(""), t = new iu([u]);
    this.addNode(t), u.parent = t, this.lastNode = u;
  }
  oncdataend() {
    this.lastNode = null;
  }
  onprocessinginstruction(u, t) {
    const a = new au(u, t);
    this.addNode(a);
  }
  handleCallback(u) {
    if (typeof this.callback == "function")
      this.callback(u, this.dom);
    else if (u)
      throw u;
  }
  addNode(u) {
    const t = this.tagStack[this.tagStack.length - 1], a = t.children[t.children.length - 1];
    this.options.withStartIndices && (u.startIndex = this.parser.startIndex), this.options.withEndIndices && (u.endIndex = this.parser.endIndex), t.children.push(u), a && (u.prev = a, a.next = u), u.parent = t, this.lastNode = null;
  }
}
function Hu(e, u) {
  const t = new Mu(void 0, u);
  return new Bu(t, u).end(e), t.root;
}
async function Ou(e, u, t, a) {
  const i = e.replace(/\n\s*/g, ""), s = Hu(i, { xmlMode: !0 });
  return ru(s.children[0], u, t, a);
}
async function ru(e, u, t, a) {
  if (e.type === n.Tag) {
    const i = u[e.name];
    if (!i)
      throw console.log(e), new Error(`Unknown node: ${e.name}`);
    const s = e.children.map(
      (d) => (f) => ru(d, u, f, a)
    );
    return i.buildEscPos(e.attribs, s, t);
  }
  return e.type === n.Text ? e.data === "{ children }" ? I(a) : Buffer.from(e.data) : [];
}
const Gu = {
  align: ou,
  break: hu,
  receipt: xu,
  scale: pu,
  smooth: mu,
  text: P
}, Cu = {
  textMode: 0,
  scaleBits: 0
};
class F {
  constructor({ template: u, components: t }) {
    _(this, "template");
    _(this, "nodeRegistry");
    this.template = u, this.nodeRegistry = { ...Gu, ...t };
  }
  render(u, t = !1) {
    return t ? this.buildHtml(u) : this.buildEscPos(u);
  }
  buildHtml(u, t) {
    return "";
  }
  buildEscPos(u, t, a = Cu) {
    const i = bu(this.template, u);
    return Ou(
      i,
      this.nodeRegistry,
      a,
      t
    );
  }
}
const Fu = {
  buildHtml(e, u, t) {
    return "";
  },
  buildEscPos(e, u) {
    const t = {
      textMode: 0,
      scaleBits: 0
    };
    return P.buildEscPos(
      {
        bold: !0
      },
      [
        (a) => P.buildEscPos(
          {
            font: "2"
          },
          u,
          a
        )
      ],
      t
    );
  }
}, zu = new F({
  template: '<text bold><scale width="3" height="2">{ children }</scale></text>'
}), Qu = new F({
  template: "<receipt><FunctionComponent>Hello, world!</FunctionComponent></receipt>",
  components: {
    FunctionComponent: Fu
  }
}), ju = new F({
  template: "<receipt><TemplateComponent>{ text }</TemplateComponent></receipt>",
  components: {
    TemplateComponent: zu
  }
});
ju.buildEscPos({ text: "Hello, world!" }).then((e) => {
  console.log("template receipt: ", [...e]);
});
Qu.buildEscPos(null).then((e) => {
  console.log("function receipt: ", [...e]);
});
