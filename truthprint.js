/* ============================================================
   TRUTHPRINT — data + application logic
   Two volumes: The Gospel of Matthew · The First Epistle of Peter
   ============================================================ */

/* ---------- BOOK DATA ---------- */
const BOOKS = {
  matthew: {
    key: 'matthew',
    short: { en: 'Matthew', de: 'Matthäus' },
    name:  { en: 'The Gospel of Matthew', de: 'Das Evangelium nach Matthäus' },
    countLabel: { en: '244 Plates', de: '244 Tafeln' },
    galleryLabel: { en: 'Two hundred forty-four plates', de: 'Zweihundertvierundvierzig Tafeln' },
    galleryTitleEn: 'Matthew, <em>plate by plate.</em>',
    galleryTitleDe: 'Matthäus, <em>Tafel für Tafel.</em>',
    plates: [
      { img:'assets/matthew/plates/p01.jpg',  refEn:'Matthew 1:1–5',   refDe:'Matthäus 1,1–5',   en:'The genealogy of Jesus Christ', de:'Das Geschlechtsregister Jesu' },
      { img:'assets/matthew/plates/p07.jpg',  refEn:'Matthew 2:1–5',   refDe:'Matthäus 2,1–5',   en:'The wise men from the east',    de:'Die Weisen aus dem Morgenland' },
      { img:'assets/matthew/plates/p10.jpg',  refEn:'Matthew 2:13–15', refDe:'Matthäus 2,13–15', en:'The flight into Egypt',         de:'Die Flucht nach Ägypten' },
      { img:'assets/matthew/plates/p14.jpg',  refEn:'Matthew 3:1–6',   refDe:'Matthäus 3,1–6',   en:'John the Baptist in the wilderness', de:'Johannes der Täufer in der Wüste' },
      { img:'assets/matthew/plates/p17.jpg',  refEn:'Matthew 3:15–17', refDe:'Matthäus 3,15–17', en:'The baptism of Jesus',          de:'Die Taufe Jesu' },
      { img:'assets/matthew/plates/p18.jpg',  refEn:'Matthew 4:1–5',   refDe:'Matthäus 4,1–5',   en:'The temptation in the wilderness', de:'Die Versuchung in der Wüste' },
      { img:'assets/matthew/plates/p21.jpg',  refEn:'Matthew 4:16–20', refDe:'Matthäus 4,16–20', en:'Come, follow me',               de:'Kommt, folgt mir nach' },
      { img:'assets/matthew/plates/p24.jpg',  refEn:'Matthew 5:1–9',   refDe:'Matthäus 5,1–9',   en:'The Beatitudes',                de:'Die Seligpreisungen' },
      { img:'assets/matthew/plates/p26.jpg',  refEn:'Matthew 5:14–17', refDe:'Matthäus 5,14–17', en:'You are the light of the world', de:'Ihr seid das Licht der Welt' },
      { img:'assets/matthew/plates/p37.jpg',  refEn:'Matthew 6:8–14',  refDe:'Matthäus 6,8–14',  en:'The Lord\u2019s Prayer',        de:'Das Vaterunser' },
      { img:'assets/matthew/plates/p40.jpg',  refEn:'Matthew 6:24–26', refDe:'Matthäus 6,24–26', en:'Consider the birds of the sky', de:'Seht die Vögel des Himmels' },
      { img:'assets/matthew/plates/p43.jpg',  refEn:'Matthew 7:1–5',   refDe:'Matthäus 7,1–5',   en:'Judge not',                     de:'Richtet nicht' },
      { img:'assets/matthew/plates/p48.jpg',  refEn:'Matthew 7:25–29', refDe:'Matthäus 7,25–29', en:'The house on the rock',         de:'Das Haus auf dem Felsen' },
      { img:'assets/matthew/plates/p49.jpg',  refEn:'Matthew 8:1–6',   refDe:'Matthäus 8,1–6',   en:'The healing hand',              de:'Die heilende Hand' },
      { img:'assets/matthew/plates/p54.jpg',  refEn:'Matthew 8:26–29', refDe:'Matthäus 8,26–29', en:'He calms the storm',            de:'Er stillt den Sturm' },
      { img:'assets/matthew/plates/p100.jpg', refEn:'Matthew 13:32–34',refDe:'Matthäus 13,32–34',en:'The grain of mustard seed',     de:'Das Senfkorn' },
      { img:'assets/matthew/plates/p103.jpg', refEn:'Matthew 13:44–47',refDe:'Matthäus 13,44–47',en:'The treasure hidden in the field', de:'Der Schatz im Acker' },
      { img:'assets/matthew/plates/p110.jpg', refEn:'Matthew 14:17–21',refDe:'Matthäus 14,17–21',en:'Five loaves and two fish',      de:'Fünf Brote und zwei Fische' },
      { img:'assets/matthew/plates/p111.jpg', refEn:'Matthew 14:22–26',refDe:'Matthäus 14,22–26',en:'Walking on the water',          de:'Der Gang auf dem Wasser' },
      { img:'assets/matthew/plates/p120.jpg', refEn:'Matthew 15:32–35',refDe:'Matthäus 15,32–35',en:'Compassion on the multitude',   de:'Erbarmen mit der Menge' },
      { img:'assets/matthew/plates/p125.jpg', refEn:'Matthew 16:16–19',refDe:'Matthäus 16,16–19',en:'You are the Christ',            de:'Du bist der Christus' },
      { img:'assets/matthew/plates/p129.jpg', refEn:'Matthew 17:1–4',  refDe:'Matthäus 17,1–4',  en:'The Transfiguration',           de:'Die Verklärung' },
      { img:'assets/matthew/plates/p136.jpg', refEn:'Matthew 18:1–5',  refDe:'Matthäus 18,1–5',  en:'Become like little children',   de:'Werdet wie die Kinder' },
      { img:'assets/matthew/plates/p148.jpg', refEn:'Matthew 19:13–17',refDe:'Matthäus 19,13–17',en:'Let the children come to me',   de:'Lasset die Kinder zu mir' },
      { img:'assets/matthew/plates/p152.jpg', refEn:'Matthew 20:1–5',  refDe:'Matthäus 20,1–5',  en:'The laborers in the vineyard',  de:'Die Arbeiter im Weinberg' },
      { img:'assets/matthew/plates/p160.jpg', refEn:'Matthew 21:1–4',  refDe:'Matthäus 21,1–4',  en:'The entry into Jerusalem',      de:'Der Einzug in Jerusalem' },
      { img:'assets/matthew/plates/p162.jpg', refEn:'Matthew 21:10–14',refDe:'Matthäus 21,10–14',en:'Cleansing the temple',          de:'Die Tempelreinigung' },
      { img:'assets/matthew/plates/p172.jpg', refEn:'Matthew 22:1–5',  refDe:'Matthäus 22,1–5',  en:'The wedding feast',             de:'Das königliche Hochzeitsmahl' },
      { img:'assets/matthew/plates/p181.jpg', refEn:'Matthew 23:1–6',  refDe:'Matthäus 23,1–6',  en:'Woes to the hypocrites',        de:'Weherufe über die Heuchler' },
      { img:'assets/matthew/plates/p190.jpg', refEn:'Matthew 24:1–4',  refDe:'Matthäus 24,1–4',  en:'Not one stone left on another', de:'Kein Stein auf dem andern' },
      { img:'assets/matthew/plates/p201.jpg', refEn:'Matthew 25:1–8',  refDe:'Matthäus 25,1–8',  en:'The ten virgins',               de:'Die zehn Jungfrauen' },
      { img:'assets/matthew/plates/p207.jpg', refEn:'Matthew 25:31–34',refDe:'Matthäus 25,31–34',en:'The sheep and the goats',       de:'Die Schafe und die Böcke' },
      { img:'assets/matthew/plates/p214.jpg', refEn:'Matthew 26:18–23',refDe:'Matthäus 26,18–23',en:'The Last Supper',               de:'Das letzte Abendmahl' },
      { img:'assets/matthew/plates/p218.jpg', refEn:'Matthew 26:37–40',refDe:'Matthäus 26,37–40',en:'Gethsemane',                    de:'Gethsemane' },
      { img:'assets/matthew/plates/p224.jpg', refEn:'Matthew 26:63–66',refDe:'Matthäus 26,63–66',en:'Before the council',            de:'Vor dem Hohen Rat' },
      { img:'assets/matthew/plates/p232.jpg', refEn:'Matthew 27:26–30',refDe:'Matthäus 27,26–30',en:'Crowned with thorns',           de:'Mit Dornen gekrönt' },
      { img:'assets/matthew/plates/p235.jpg', refEn:'Matthew 27:42–46',refDe:'Matthäus 27,42–46',en:'Why have you forsaken me?',     de:'Warum hast du mich verlassen?' },
      { img:'assets/matthew/plates/p238.jpg', refEn:'Matthew 27:58–62',refDe:'Matthäus 27,58–62',en:'Laid in the tomb',              de:'Ins Grab gelegt' },
      { img:'assets/matthew/plates/p240.jpg', refEn:'Matthew 28:1–5',  refDe:'Matthäus 28,1–5',  en:'He is risen',                   de:'Er ist auferstanden' },
      { img:'assets/matthew/plates/p243.jpg', refEn:'Matthew 28:15–19',refDe:'Matthäus 28,15–19',en:'Go and make disciples',         de:'Geht und macht zu Jüngern' },
      { img:'assets/matthew/plates/p244.jpg', refEn:'Matthew 28:20',   refDe:'Matthäus 28,20',   en:'I am with you always',          de:'Ich bin bei euch alle Tage' },
    ],
    chapters: [
      { nEn:'Matthew 5', nDe:'Matthäus 5', refEn:'The Beatitudes', refDe:'Die Seligpreisungen', page:'i.',
        titleEn:'Blessed are <em>the poor in spirit</em>', titleDe:'Selig sind, <em>die geistlich arm sind</em>',
        body:`<p><span class="vn">3</span>Blessed are the poor in spirit, for theirs is the Kingdom of Heaven. <span class="vn">4</span>Blessed are those who mourn, for they shall be comforted. <span class="vn">5</span>Blessed are the gentle, for they shall inherit the earth.</p><p><span class="vn">6</span>Blessed are those who hunger and thirst for righteousness, for they shall be filled. <span class="vn">7</span>Blessed are the merciful, for they shall obtain mercy. <span class="vn">8</span>Blessed are the pure in heart, for they shall see God.</p><p><span class="vn">9</span>Blessed are the peacemakers, for they shall be called children of God. <span class="vn">14</span>You are the light of the world. A city located on a hill can\u2019t be hidden. <span class="vn">16</span>Even so, let your light shine before men, that they may see your good works and glorify your Father who is in heaven.</p>`,
        bodyDe:`<p><span class="vn">3</span>Selig sind, die geistlich arm sind; denn das Himmelreich ist ihrer. <span class="vn">4</span>Selig sind, die da Leid tragen; denn sie sollen getröstet werden. <span class="vn">5</span>Selig sind die Sanftmütigen; denn sie werden das Erdreich besitzen.</p><p><span class="vn">6</span>Selig sind, die da hungert und dürstet nach der Gerechtigkeit; denn sie sollen satt werden. <span class="vn">7</span>Selig sind die Barmherzigen; denn sie werden Barmherzigkeit erlangen. <span class="vn">8</span>Selig sind, die reinen Herzens sind; denn sie werden Gott schauen.</p><p><span class="vn">9</span>Selig sind, die Frieden stiften; denn sie werden Gottes Kinder heißen. <span class="vn">14</span>Ihr seid das Licht der Welt. Es kann die Stadt, die auf einem Berge liegt, nicht verborgen sein. <span class="vn">16</span>So lasst euer Licht leuchten vor den Leuten, dass sie eure guten Werke sehen und euren Vater im Himmel preisen.</p>` },
      { nEn:'Matthew 6', nDe:'Matthäus 6', refEn:'The Lord\u2019s Prayer', refDe:'Das Vaterunser', page:'xxxvii.',
        titleEn:'Pray then <em>like this</em>', titleDe:'Darum sollt ihr <em>so beten</em>',
        body:`<p><span class="vn">9</span>Our Father in heaven, may your name be kept holy. <span class="vn">10</span>Let your Kingdom come. Let your will be done on earth as it is in heaven. <span class="vn">11</span>Give us today our daily bread.</p><p><span class="vn">12</span>Forgive us our debts, as we also forgive our debtors. <span class="vn">13</span>Bring us not into temptation, but deliver us from the evil one. For yours is the Kingdom, the power, and the glory forever. Amen.</p><p><span class="vn">21</span>For where your treasure is, there your heart will be also. <span class="vn">34</span>Therefore don\u2019t be anxious for tomorrow, for tomorrow will be anxious for itself.</p>`,
        bodyDe:`<p><span class="vn">9</span>Unser Vater im Himmel! Geheiligt werde dein Name. <span class="vn">10</span>Dein Reich komme. Dein Wille geschehe wie im Himmel so auf Erden. <span class="vn">11</span>Unser tägliches Brot gib uns heute.</p><p><span class="vn">12</span>Und vergib uns unsere Schuld, wie auch wir vergeben unsern Schuldigern. <span class="vn">13</span>Und führe uns nicht in Versuchung, sondern erlöse uns von dem Bösen. Denn dein ist das Reich und die Kraft und die Herrlichkeit in Ewigkeit. Amen.</p><p><span class="vn">21</span>Denn wo dein Schatz ist, da ist auch dein Herz. <span class="vn">34</span>Darum sorgt nicht für morgen, denn der morgige Tag wird für das Seine sorgen.</p>` },
      { nEn:'Matthew 11', nDe:'Matthäus 11', refEn:'Come to me', refDe:'Kommt her zu mir', page:'lxx.',
        titleEn:'Come to me, <em>all who labor</em>', titleDe:'Kommt her zu mir <em>alle, die ihr mühselig seid</em>',
        body:`<p><span class="vn">28</span>Come to me, all you who labor and are heavily burdened, and I will give you rest. <span class="vn">29</span>Take my yoke upon you and learn from me, for I am gentle and humble in heart; and you will find rest for your souls. <span class="vn">30</span>For my yoke is easy, and my burden is light.</p>`,
        bodyDe:`<p><span class="vn">28</span>Kommt her zu mir, alle, die ihr mühselig und beladen seid; ich will euch erquicken. <span class="vn">29</span>Nehmt auf euch mein Joch und lernt von mir; denn ich bin sanftmütig und von Herzen demütig; so werdet ihr Ruhe finden für eure Seelen. <span class="vn">30</span>Denn mein Joch ist sanft, und meine Last ist leicht.</p>` },
      { nEn:'Matthew 27', nDe:'Matthäus 27', refEn:'The Crucifixion', refDe:'Die Kreuzigung', page:'ccxxxv.',
        titleEn:'My God, my God, <em>why have you forsaken me?</em>', titleDe:'Mein Gott, mein Gott, <em>warum hast du mich verlassen?</em>',
        body:`<p><span class="vn">45</span>Now from the sixth hour there was darkness over all the land until the ninth hour. <span class="vn">46</span>About the ninth hour Jesus cried with a loud voice, saying, \u201CEli, Eli, lima sabachthani?\u201D That is, \u201CMy God, my God, why have you forsaken me?\u201D <span class="vn">50</span>Jesus cried again with a loud voice, and yielded up his spirit.</p><p><span class="vn">51</span>Behold, the veil of the temple was torn in two from the top to the bottom. The earth quaked and the rocks were split.</p>`,
        bodyDe:`<p><span class="vn">45</span>Und von der sechsten Stunde an kam eine Finsternis über das ganze Land bis zur neunten Stunde. <span class="vn">46</span>Und um die neunte Stunde schrie Jesus laut: Eli, Eli, lama asabtani? Das heißt: Mein Gott, mein Gott, warum hast du mich verlassen? <span class="vn">50</span>Aber Jesus schrie abermals laut und verschied.</p><p><span class="vn">51</span>Und siehe, der Vorhang im Tempel zerriss in zwei Stücke von oben an bis unten aus. Und die Erde erbebte, und die Felsen zerrissen.</p>` },
      { nEn:'Matthew 28', nDe:'Matthäus 28', refEn:'Resurrection & Commission', refDe:'Auferstehung & Sendung', page:'ccxl.',
        titleEn:'He is not here, <em>for he has risen</em>', titleDe:'Er ist nicht hier; <em>er ist auferstanden</em>',
        body:`<p><span class="vn">5</span>The angel said to the women, \u201CDon\u2019t be afraid, for I know that you seek Jesus, who has been crucified. <span class="vn">6</span>He is not here, for he has risen, just like he said. Come, see the place where the Lord was lying.\u201D</p><p><span class="vn">18</span>Jesus came to them and spoke to them, saying, \u201CAll authority has been given to me in heaven and on earth. <span class="vn">19</span>Go and make disciples of all nations\u2026 <span class="vn">20</span>and behold, I am with you always, even to the end of the age.\u201D</p>`,
        bodyDe:`<p><span class="vn">5</span>Aber der Engel sprach zu den Frauen: Fürchtet euch nicht! Ich weiß, dass ihr Jesus, den Gekreuzigten, sucht. <span class="vn">6</span>Er ist nicht hier; er ist auferstanden, wie er gesagt hat. Kommt und seht die Stätte, wo er gelegen hat.</p><p><span class="vn">18</span>Und Jesus trat herzu und sprach zu ihnen: Mir ist gegeben alle Gewalt im Himmel und auf Erden. <span class="vn">19</span>Darum gehet hin und machet zu Jüngern alle Völker\u2026 <span class="vn">20</span>und siehe, ich bin bei euch alle Tage bis an der Welt Ende.</p>` },
    ],
  },

  mark: {
    key: 'mark',
    short: { en: 'Mark', de: 'Markus' },
    name:  { en: 'The Gospel of Mark', de: 'Das Evangelium nach Markus' },
    countLabel: { en: '151 Plates', de: '151 Tafeln' },
    galleryLabel: { en: 'A selection of ten plates', de: 'Eine Auswahl von zehn Tafeln' },
    galleryTitleEn: 'Mark, <em>plate by plate.</em>',
    galleryTitleDe: 'Markus, <em>Tafel für Tafel.</em>',
    plates: [
      { img:'assets/mark/plates/g01.jpg', refEn:'Mark 1:1–5', refDe:'Markus 1,1–5', en:'', de:'' },
      { img:'assets/mark/plates/g02.jpg', refEn:'Mark 12:19–23', refDe:'Markus 12,19–23', en:'', de:'' },
      { img:'assets/mark/plates/g03.jpg', refEn:'Mark 14:1–4', refDe:'Markus 14,1–4', en:'', de:'' },
      { img:'assets/mark/plates/g04.jpg', refEn:'Mark 15:1–6', refDe:'Markus 15,1–6', en:'', de:'' },
      { img:'assets/mark/plates/g05.jpg', refEn:'Mark 2:26–28', refDe:'Markus 2,26–28', en:'', de:'' },
      { img:'assets/mark/plates/g06.jpg', refEn:'Mark 4:39–41', refDe:'Markus 4,39–41', en:'', de:'' },
      { img:'assets/mark/plates/g07.jpg', refEn:'Mark 6:26–29', refDe:'Markus 6,26–29', en:'', de:'' },
      { img:'assets/mark/plates/g08.jpg', refEn:'Mark 8:11–16', refDe:'Markus 8,11–16', en:'', de:'' },
      { img:'assets/mark/plates/g09.jpg', refEn:'Mark 9:45–48', refDe:'Markus 9,45–48', en:'', de:'' },
      { img:'assets/mark/plates/g10.jpg', refEn:'Mark 11:14–17', refDe:'Markus 11,14–17', en:'', de:'' }
    ],
  },
  luke: {
    key: 'luke',
    short: { en: 'Luke', de: 'Lukas' },
    name:  { en: 'The Gospel of Luke', de: 'Das Evangelium nach Lukas' },
    countLabel: { en: '256 Plates', de: '256 Tafeln' },
    galleryLabel: { en: 'A selection of ten plates', de: 'Eine Auswahl von zehn Tafeln' },
    galleryTitleEn: 'Luke, <em>plate by plate.</em>',
    galleryTitleDe: 'Lukas, <em>Tafel für Tafel.</em>',
    plates: [
      { img:'assets/luke/plates/g01.jpg', refEn:'Luke 1:1–4', refDe:'Lukas 1,1–4', en:'', de:'' },
      { img:'assets/luke/plates/g02.jpg', refEn:'Luke 11:1–4', refDe:'Lukas 11,1–4', en:'', de:'' },
      { img:'assets/luke/plates/g03.jpg', refEn:'Luke 12:54–57', refDe:'Lukas 12,54–57', en:'', de:'' },
      { img:'assets/luke/plates/g04.jpg', refEn:'Luke 1:79–80', refDe:'Lukas 1,79–80', en:'', de:'' },
      { img:'assets/luke/plates/g05.jpg', refEn:'Luke 19:1–6', refDe:'Lukas 19,1–6', en:'', de:'' },
      { img:'assets/luke/plates/g06.jpg', refEn:'Luke 21:35–38', refDe:'Lukas 21,35–38', en:'', de:'' },
      { img:'assets/luke/plates/g07.jpg', refEn:'Luke 24:1–6', refDe:'Lukas 24,1–6', en:'', de:'' },
      { img:'assets/luke/plates/g08.jpg', refEn:'Luke 4:25–28', refDe:'Lukas 4,25–28', en:'', de:'' },
      { img:'assets/luke/plates/g09.jpg', refEn:'Luke 7:12–15', refDe:'Lukas 7,12–15', en:'', de:'' },
      { img:'assets/luke/plates/g10.jpg', refEn:'Luke 9:24–27', refDe:'Lukas 9,24–27', en:'', de:'' }
    ],
  },
  john: {
    key: 'john',
    short: { en: 'John', de: 'Johannes' },
    name:  { en: 'The Gospel of John', de: 'Das Evangelium nach Johannes' },
    countLabel: { en: '199 Plates', de: '199 Tafeln' },
    galleryLabel: { en: 'A selection of ten plates', de: 'Eine Auswahl von zehn Tafeln' },
    galleryTitleEn: 'John, <em>plate by plate.</em>',
    galleryTitleDe: 'Johannes, <em>Tafel für Tafel.</em>',
    plates: [
      { img:'assets/john/plates/g01.jpg', refEn:'John 1:1–8', refDe:'Johannes 1,1–8', en:'', de:'' },
      { img:'assets/john/plates/g02.jpg', refEn:'John 11:55–57', refDe:'Johannes 11,55–57', en:'', de:'' },
      { img:'assets/john/plates/g03.jpg', refEn:'John 13:38–38', refDe:'Johannes 13,38–38', en:'', de:'' },
      { img:'assets/john/plates/g04.jpg', refEn:'John 16:19–21', refDe:'Johannes 16,19–21', en:'', de:'' },
      { img:'assets/john/plates/g05.jpg', refEn:'John 18:36–37', refDe:'Johannes 18,36–37', en:'', de:'' },
      { img:'assets/john/plates/g06.jpg', refEn:'John 20:28–31', refDe:'Johannes 20,28–31', en:'', de:'' },
      { img:'assets/john/plates/g07.jpg', refEn:'John 4:47–51', refDe:'Johannes 4,47–51', en:'', de:'' },
      { img:'assets/john/plates/g08.jpg', refEn:'John 6:46–51', refDe:'Johannes 6,46–51', en:'', de:'' },
      { img:'assets/john/plates/g09.jpg', refEn:'John 8:33–38', refDe:'Johannes 8,33–38', en:'', de:'' },
      { img:'assets/john/plates/g10.jpg', refEn:'John 10:36–40', refDe:'Johannes 10,36–40', en:'', de:'' }
    ],
  },
};

/* ---------- HELPERS ---------- */
function roman(n){const m=[[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];let r='';for(const[v,s]of m){while(n>=v){r+=s;n-=v;}}return r;}
function lc(o){ return (state.lang==='de' && o.de!==undefined) ? o.de : o.en; }

const state = {
  lang: (localStorage.getItem('tp_lang') || 'en'),
  galBook: 'matthew',
  readBook: 'matthew',
};

/* ============================================================
   APPLICATION
   ============================================================ */
document.addEventListener('DOMContentLoaded', function(){

/* ---------- CUSTOM CURSOR + DIVINE GLOW ----------
   A quiet dot follows the pointer; a soft golden glow trails behind it. When the
   pointer leaves (or at rest on load), the glow glides home and rests exactly on
   the Lord's head in the hero. Desktop / fine-pointer only. */
const cur = document.getElementById('cur');
const curglow = document.getElementById('curglow');
if (cur && window.matchMedia('(hover:hover)').matches){
  let gx = window.innerWidth/2, gy = window.innerHeight*0.3, tgx = gx, tgy = gy, graf = 0, homing = true;
  const rate = ()=> homing ? 0.05 : 0.16;     // glides slowly when flying home
  function loop(){
    gx += (tgx-gx)*rate(); gy += (tgy-gy)*rate();
    if(curglow) curglow.style.transform = `translate(${gx}px,${gy}px)`;
    if(Math.abs(tgx-gx)>0.4 || Math.abs(tgy-gy)>0.4) graf = requestAnimationFrame(loop); else graf = 0;
  }
  function kick(){ if(!graf) graf = requestAnimationFrame(loop); }

  /* Exact resting point on the Lord's head, via background cover-math.
     hero-christ.jpg is 2560×1428; .hero-bg uses background-size:cover with
     background-position:center 35%. His head sits at ~49% / 30% of the image. */
  function headPoint(){
    const hero = document.getElementById('hero'); if(!hero) return null;
    const r = hero.getBoundingClientRect();
    if(r.bottom < 40) return null;            // hero scrolled away
    const iw = 2560, ih = 1428;
    const sc = Math.max(r.width/iw, r.height/ih);
    const dw = iw*sc, dh = ih*sc;
    const ox = r.left + (r.width - dw)/2;
    const oy = r.top  + (r.height - dh)*0.35;
    return { x: ox + 0.515*dw, y: oy + 0.305*dh };
  }
  // Calibration: load with #cal to see a red dot exactly where the glow will rest.
  if(location.hash==='#cal'){
    const _dot=document.createElement('div');
    _dot.style.cssText='position:fixed;z-index:99999;width:14px;height:14px;margin:-7px 0 0 -7px;border-radius:50%;background:#f00;border:2px solid #fff;pointer-events:none';
    document.body.appendChild(_dot);
    const _place=()=>{const hp=headPoint(); if(hp){_dot.style.left=hp.x+'px';_dot.style.top=hp.y+'px';}};
    _place(); window.addEventListener('resize',_place); window.addEventListener('scroll',_place);
  }

  document.addEventListener('mousemove', e=>{
    cur.style.left = e.clientX+'px'; cur.style.top = e.clientY+'px'; cur.classList.add('vis');
    homing = false; tgx = e.clientX; tgy = e.clientY;
    if(curglow) curglow.classList.add('vis');
    kick();
  });
  document.addEventListener('mouseleave', ()=>{
    cur.classList.remove('vis');
    const hp = headPoint();
    if(curglow && hp){ homing = true; tgx = hp.x; tgy = hp.y; curglow.classList.add('vis'); kick(); }
  });
  document.addEventListener('mousedown', ()=>cur.classList.add('p'));
  document.addEventListener('mouseup',   ()=>cur.classList.remove('p'));
  const bindCur = ()=>document.querySelectorAll('a,button,.plate,.coll,.sc-book,.bk-tab,.band').forEach(el=>{
    if(el._cb) return; el._cb = 1;
    el.addEventListener('mouseenter',()=>cur.classList.add('h'));
    el.addEventListener('mouseleave',()=>cur.classList.remove('h'));
  });
  bindCur();
  new MutationObserver(bindCur).observe(document.body,{childList:true,subtree:true});

  /* rest on His head by default (before any mouse use) and after resize */
  function restGlow(){ const hp = headPoint();
    if(curglow && hp){ gx=tgx=hp.x; gy=tgy=hp.y; curglow.style.transform=`translate(${gx}px,${gy}px)`; curglow.classList.add('vis'); }
  }
  requestAnimationFrame(restGlow);
  window.addEventListener('load', ()=>requestAnimationFrame(restGlow));
  window.addEventListener('resize', ()=>{ if(homing) restGlow(); });
}

/* ---------- TORCH (hero spotlight) ---------- */
(function(){
  const hero=document.getElementById('hero'), c=document.getElementById('torch');
  if(!hero||!c) return;
  // rest the spotlight on the Lord's head (≈51.5% / 30.5%) so it agrees with the glow
  let tx=0.515,ty=0.305,ax=0.515,ay=0.305, flick=0;
  const ctx=c.getContext('2d');
  function resize(){c.width=hero.offsetWidth;c.height=hero.offsetHeight;}
  resize(); window.addEventListener('resize',resize);
  hero.addEventListener('mousemove',e=>{const r=hero.getBoundingClientRect();tx=(e.clientX-r.left)/r.width;ty=(e.clientY-r.top)/r.height;});
  hero.addEventListener('mouseleave',()=>{tx=0.515;ty=0.305;});
  function draw(){
    if(document.body.classList.contains('motion-off')){ctx.clearRect(0,0,c.width,c.height);ctx.fillStyle='rgba(10,7,5,0.55)';ctx.fillRect(0,0,c.width,c.height);requestAnimationFrame(draw);return;}
    ax+=(tx-ax)*0.055; ay+=(ty-ay)*0.055; flick+=0.08;
    const w=c.width,h=c.height,x=ax*w,y=ay*h;
    const R=Math.min(w,h)*(0.28 + Math.sin(flick)*0.006 + Math.sin(flick*2.3)*0.004);
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle='rgba(10,7,5,0.56)'; ctx.fillRect(0,0,w,h);
    ctx.globalCompositeOperation='destination-out';
    const spot=ctx.createRadialGradient(x,y,0,x,y,R);
    spot.addColorStop(0,'rgba(0,0,0,0.86)');spot.addColorStop(0.42,'rgba(0,0,0,0.48)');spot.addColorStop(0.78,'rgba(0,0,0,0.08)');spot.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=spot;ctx.fillRect(0,0,w,h);
    ctx.globalCompositeOperation='source-over';
    const warm=ctx.createRadialGradient(x,y,0,x,y,R*0.5);
    warm.addColorStop(0,'rgba(198,148,52,'+(0.2+Math.sin(flick)*0.03)+')');warm.addColorStop(1,'rgba(198,148,52,0)');
    ctx.fillStyle=warm;ctx.fillRect(0,0,w,h);
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ---------- HERO VIDEO + scroll parallax ---------- */
(function(){
  window.tpSyncHeroVideos=function(){}; // no slideshows
  const bg=document.getElementById('heroBg');
  if(!bg) return;
  let ticking=false;
  window.addEventListener('scroll',()=>{
    if(ticking) return; ticking=true;
    requestAnimationFrame(()=>{
      ticking=false;
      if(document.body.classList.contains('motion-off')){bg.style.transform='';return;}
      const y=window.scrollY;
      const vh=window.innerHeight;
      if(y<vh){
        const p=y/vh;
        // scale-only parallax: stays exactly cover at the top (so the glow
        // rests precisely on His head) and gently zooms as you scroll
        bg.style.transform=`scale(${1+p*0.06})`;
      }
    });
  },{passive:true});
})();

/* ---------- SCROLL: progress, nav, active link ---------- */
(function(){
  const pb=document.getElementById('pb'), navEl=document.getElementById('nav');
  const navAs=document.querySelectorAll('.nlinks a');
  const ids=['mani','book','shop','project','roadmap','plates','wallart','read','about','editions','waitlist'];
  const secs=ids.map(id=>document.getElementById(id));
  window.addEventListener('scroll',()=>{
    const y=window.scrollY,h=document.documentElement.scrollHeight-window.innerHeight;
    if(pb)pb.style.width=(y/h*100).toFixed(2)+'%';
    if(navEl)navEl.classList.toggle('s',y>40);
    let act=null;
    for(const s of secs){if(!s)continue;const r=s.getBoundingClientRect();if(r.top<window.innerHeight*.45&&r.bottom>150){act=s.id;break;}}
    navAs.forEach(a=>a.classList.toggle('act',a.dataset.s===act));
  },{passive:true});
})();

/* ---------- MOBILE NAV ---------- */
(function(){
  const ham=document.getElementById('ham'),mnav=document.getElementById('mnav');
  if(!ham||!mnav)return;
  ham.addEventListener('click',()=>{
    const o=ham.classList.toggle('o');mnav.classList.toggle('o',o);document.body.style.overflow=o?'hidden':'';
  });
  window.closeMnav=function(){ham.classList.remove('o');mnav.classList.remove('o');document.body.style.overflow='';};
  mnav.querySelectorAll('a').forEach(a=>a.addEventListener('click',window.closeMnav));
})();

/* ---------- REVEAL ON SCROLL ---------- */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in');}),{threshold:.12,rootMargin:'0px 0px -4% 0px'});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));

/* ---------- WORD-SPLIT REVEAL ON H2 ---------- */
(function(){
  document.querySelectorAll('.h2').forEach(el=>{
    if(el.dataset.split) return;
    el.dataset.split='1';
    el.classList.add('split-words');
    // walk text and em nodes, wrap each word
    function wrapWords(node){
      if(node.nodeType===3){
        const frag=document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach(tok=>{
          if(/^\s+$/.test(tok)){frag.appendChild(document.createTextNode(tok));}
          else if(tok){
            const w=document.createElement('span'); w.className='sw-word';
            const i=document.createElement('span'); i.className='sw-inner';
            i.textContent=tok; w.appendChild(i); frag.appendChild(w);
          }
        });
        node.parentNode.replaceChild(frag,node);
      } else if(node.nodeType===1 && node.tagName!=='SCRIPT'){
        Array.from(node.childNodes).forEach(wrapWords);
      }
    }
    Array.from(el.childNodes).forEach(wrapWords);
    // stagger delays
    el.querySelectorAll('.sw-word').forEach((w,i)=>{
      w.querySelector('.sw-inner').style.transitionDelay=(i*0.06)+'s';
    });
  });
  const sio=new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting) e.target.querySelectorAll('.sw-word').forEach(w=>w.classList.add('in'));
  }),{threshold:.1,rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.split-words').forEach(el=>sio.observe(el));
})();

/* ---------- COUNTER ANIMATION ---------- */
(function(){
  function animCount(el,target,dur){
    const start=performance.now();
    const from=0;
    function step(now){
      const p=Math.min((now-start)/dur,1);
      const ease=1-Math.pow(1-p,4);
      el.textContent=Math.round(from+ease*(target-from));
      if(p<1) requestAnimationFrame(step);
      else el.textContent=target;
    }
    requestAnimationFrame(step);
  }
  const cio=new IntersectionObserver(es=>es.forEach(e=>{
    if(!e.isIntersecting||e.target.dataset.counted) return;
    e.target.dataset.counted='1';
    const n=parseInt(e.target.dataset.count,10);
    if(!isNaN(n)) animCount(e.target,n,1600);
  }),{threshold:.5});
  document.querySelectorAll('[data-count]').forEach(el=>cio.observe(el));
})();

/* ---------- STAGGERED BAND CARDS ---------- */
(function(){
  const bio=new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add('in');
  }),{threshold:.08,rootMargin:'0px 0px -6% 0px'});
  document.querySelectorAll('.band,.vpill').forEach(el=>bio.observe(el));
})();

/* ---------- JERUSALEM PARALLAX ---------- */
(function(){
  const img=document.querySelector('.jbreak-img');
  if(!img)return;
  let ticking=false;
  window.addEventListener('scroll',()=>{
    if(ticking)return;ticking=true;
    requestAnimationFrame(()=>{
      ticking=false;
      if(document.body.classList.contains('motion-off')){img.style.transform='';return;}
      const rect=img.parentElement.getBoundingClientRect();
      const vh=window.innerHeight;
      if(rect.bottom<-100||rect.top>vh+100)return;
      const pct=(rect.top-vh/2)/(vh+rect.height);
      img.style.transform=`translateY(${(pct*18).toFixed(2)}%)`;
    });
  },{passive:true});
})();

/* ---------- SCROLL-LINKED PARALLAX ---------- */
(function(){
  const items=[];
  // manifesto images drift at staggered speeds (safe: no other transforms on these <img>)
  document.querySelectorAll('.mani-imgs img').forEach((el,i)=>items.push({el,sp:[0.05,-0.04,0.07][i]||0.04}));
  if(!items.length)return;
  let ticking=false;
  function update(){
    ticking=false;
    if(document.body.classList.contains('motion-off')){items.forEach(it=>it.el.style.transform='');return;}
    const vh=window.innerHeight;
    for(const it of items){
      const r=it.el.getBoundingClientRect();
      if(r.bottom<-200||r.top>vh+200)continue;
      const off=(r.top+r.height/2-vh/2);
      it.el.style.transform=`translate3d(0,${(off*it.sp).toFixed(1)}px,0)`;
    }
  }
  window.addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(update);}},{passive:true});
  window.addEventListener('resize',update);
  update();
})();

/* ---------- GALLERY ---------- */
const gtrack=document.getElementById('gtrack'), gvp=document.getElementById('gvp');
let gi=0;
function galPlates(){return BOOKS[state.galBook].plates;}
function buildGallery(){
  const plates=galPlates();
  gtrack.innerHTML='';
  plates.forEach((p,i)=>{
    const el=document.createElement('div');
    el.className='plate'; el.dataset.n=i;
    el.innerHTML=`<img src="${p.img}" alt="${lc(p)}" loading="lazy"><div class="pframe"></div><div class="pmeta"><div class="l"><span class="pnum">${roman(i+1)} · ${state.lang==='de'?p.refDe:p.refEn}</span><span class="pref">${lc(p)}</span></div><button class="pzoom" aria-label="Enlarge"><svg viewBox="0 0 24 24"><path d="M4 4h6M4 4v6M20 4h-6M20 4v6M4 20h6M4 20v-6M20 20h-6M20 20v-6"/></svg></button></div>`;
    // pzoom button — direct click handler (reliable across all browsers)
    el.querySelector('.pzoom')?.addEventListener('click',e=>{
      e.stopPropagation();
      openLb(i);
    });
    el.addEventListener('click',()=>openLb(i));
    gtrack.appendChild(el);
  });
  gi=0; updGal();
  // gallery heading
  const b=BOOKS[state.galBook];
  const gt=document.getElementById('galTitle'); if(gt)gt.innerHTML = state.lang==='de'?b.galleryTitleDe:b.galleryTitleEn;
  const gl=document.getElementById('galLabel'); if(gl)gl.textContent = state.lang==='de'?b.galleryLabel.de:b.galleryLabel.en;
}
function vcnt(){return window.innerWidth<=560?1:window.innerWidth<=940?2:3;}
function updGal(){
  const plates=galPlates(), n=vcnt(), max=Math.max(0,plates.length-n);
  gi=Math.min(Math.max(0,gi),max);
  if(!gtrack.children[0])return;
  const w=gtrack.children[0].getBoundingClientRect().width+20;
  gtrack.style.transform=`translateX(${-gi*w}px)`;
  const from=gi+1,to=Math.min(gi+n,plates.length);
  const cnt=document.getElementById('gcnt');
  if(cnt)cnt.textContent=`${roman(from).toLowerCase()} – ${roman(to).toLowerCase()} ${state.lang==='de'?'von':'of'} ${roman(plates.length).toLowerCase()}`;
  const pct=(gi/(plates.length-n||1))*((plates.length-n)/plates.length*100);
  const tf=document.getElementById('gtf');
  if(tf){tf.style.width=(n/plates.length*100).toFixed(2)+'%';tf.style.left=pct.toFixed(2)+'%';}
  const pv=document.getElementById('prevBtn'),nx=document.getElementById('nextBtn');
  if(pv)pv.disabled=gi<=0; if(nx)nx.disabled=gi>=max;
}
document.getElementById('prevBtn')?.addEventListener('click',()=>{gi--;updGal();});
document.getElementById('nextBtn')?.addEventListener('click',()=>{gi++;updGal();});
window.addEventListener('resize',updGal);
// drag
let drag=null;
gvp?.addEventListener('pointerdown',e=>{const pl0=e.target.closest('.plate');drag={x:e.clientX,gi0:gi,moved:false,plate:pl0};gvp.setPointerCapture(e.pointerId);gtrack.style.transition='none';});
gvp?.addEventListener('pointermove',e=>{if(!drag)return;if(Math.abs(e.clientX-drag.x)>5)drag.moved=true;const w=gtrack.children[0].getBoundingClientRect().width+20;gtrack.style.transform=`translateX(${-drag.gi0*w+(e.clientX-drag.x)}px)`;});
gvp?.addEventListener('pointerup',e=>{if(!drag)return;gtrack.style.transition='';const w=gtrack.children[0].getBoundingClientRect().width+20;const d=Math.round(-(e.clientX-drag.x)/w);gi=drag.gi0+d;const moved=drag.moved;const pl=drag.plate;drag=null;updGal();if(!moved&&pl){const n=parseInt(pl.dataset.n,10);openLb(isNaN(n)?0:n);}});
gvp?.addEventListener('pointercancel',()=>{drag=null;gtrack.style.transition='';updGal();});
window.addEventListener('keydown',e=>{const lb=document.getElementById('lb');if(lb&&lb.classList.contains('on'))return;if(e.key==='ArrowRight'){gi++;updGal();}if(e.key==='ArrowLeft'){gi--;updGal();}});
// gallery book switcher
document.querySelectorAll('[data-galbook]').forEach(btn=>btn.addEventListener('click',()=>{
  state.galBook=btn.dataset.galbook;
  document.querySelectorAll('[data-galbook]').forEach(b=>b.classList.toggle('on',b.dataset.galbook===state.galBook));
  buildGallery();
}));

/* ---------- LIGHTBOX ---------- */
const lb=document.getElementById('lb'),lbi=document.getElementById('lbi'),lbt=document.getElementById('lbt'),lbr=document.getElementById('lbr');
let lbIdx=0;
function showLb(){const p=galPlates()[lbIdx];lbi.src=p.img;lbi.alt=lc(p);lbt.textContent=lc(p);lbr.textContent=`${roman(lbIdx+1)} · ${state.lang==='de'?p.refDe:p.refEn}`;}
window.openLb=function(i){lbIdx=i;showLb();lb.classList.add('on');document.body.style.overflow='hidden';};
function closeLb(){lb.classList.remove('on');document.body.style.overflow='';}
document.getElementById('lbx')?.addEventListener('click',closeLb);
document.getElementById('lbp')?.addEventListener('click',()=>{lbIdx=(lbIdx-1+galPlates().length)%galPlates().length;showLb();});
document.getElementById('lbn')?.addEventListener('click',()=>{lbIdx=(lbIdx+1)%galPlates().length;showLb();});
lb?.addEventListener('click',e=>{if(e.target===lb)closeLb();});
window.addEventListener('keydown',e=>{if(!lb||!lb.classList.contains('on'))return;if(e.key==='Escape')closeLb();if(e.key==='ArrowRight'){lbIdx=(lbIdx+1)%galPlates().length;showLb();}if(e.key==='ArrowLeft'){lbIdx=(lbIdx-1+galPlates().length)%galPlates().length;showLb();}});

/* ---------- READER ---------- */
const clist=document.getElementById('clist'),rpanel=document.getElementById('rpanel');
let rIdx=0;
function readChapters(){return BOOKS[state.readBook].chapters;}
function buildReaderList(){
  const chs=readChapters();
  clist.innerHTML='';
  chs.forEach((c,i)=>{
    const li=document.createElement('li');
    li.innerHTML=`<button data-i="${i}"${i===rIdx?' class="act"':''}><span class="ch">${state.lang==='de'?c.nDe:c.nEn}</span><span>${state.lang==='de'?c.refDe:c.refEn}</span></button>`;
    clist.appendChild(li);
  });
}
function renderCh(i){
  const chs=readChapters(); if(i>=chs.length)i=0; rIdx=i;
  const c=chs[i];
  const body=(state.lang==='de'&&c.bodyDe)?c.bodyDe:c.body;
  const bookName=state.lang==='de'?BOOKS[state.readBook].short.de:BOOKS[state.readBook].short.en;
  const ref=state.lang==='de'?c.refDe:c.refEn;
  const title=state.lang==='de'?c.titleDe:c.titleEn;
  const nextTxt=state.lang==='de'?'Nächster Abschnitt →':'Next passage →';
  const ofTxt=state.lang==='de'?'von':'of';
  rpanel.innerHTML=`<div class="ranim"><div class="rhead"><span class="rref">${ref}</span><span class="rpg">${state.lang==='de'?'S.':'pp.'} ${c.page}</span></div><h3 class="rtitle">${title}</h3><div class="rbody">${body}</div><div class="rfoot"><span>${bookName} · ${i+1} ${ofTxt} ${chs.length}</span><button id="nxt">${nextTxt}</button></div></div>`;
  document.getElementById('nxt').addEventListener('click',()=>setCh((rIdx+1)%chs.length));
  document.querySelectorAll('#clist button').forEach(b=>b.classList.toggle('act',parseInt(b.dataset.i,10)===i));
}
function setCh(i){renderCh(i);}
clist?.addEventListener('click',e=>{const b=e.target.closest('button');if(b)setCh(parseInt(b.dataset.i,10));});
document.querySelectorAll('[data-readbook]').forEach(btn=>btn.addEventListener('click',()=>{
  state.readBook=btn.dataset.readbook; rIdx=0;
  document.querySelectorAll('[data-readbook]').forEach(b=>b.classList.toggle('on',b.dataset.readbook===state.readBook));
  buildReaderList(); renderCh(0);
}));

/* ---------- WAITLIST / NEWSLETTER ----------
   Static hosting: paste YOUR OWN Google Apps Script web-app URL (owns the list
   in your Google Sheet) — or a Brevo/Formspree URL — into NEWSLETTER_ENDPOINT. Field name sent is "email" + "EMAIL"
   (covers both providers). Until set, signups are emailed straight to Lia so
   nothing is ever lost. ----------------------------------------------------- */
var NEWSLETTER_ENDPOINTS = {
  // Brevo is now handled server-side by the Apps Script (it calls Brevo's DOI API),
  // so the website only needs to POST to the Sheet endpoint below. The old direct
  // sibforms POST was counted by Brevo but never created a contact or sent the DOI
  // email, so it is intentionally disabled.
  brevo: '',
  sheet: 'https://script.google.com/macros/s/AKfycbxP_PY8hCWcAATGgJb0vlNlLRUInjRRmeue0_gFB5VgRMdCAwae-qPx8fQU4Cv3OE2cbQ/exec'   // your own Google Apps Script /exec URL — your owned master list (backup/asset)
};
document.getElementById('wsub')?.addEventListener('click',()=>{
  const inp=document.getElementById('wemail');
  const v=(inp.value||'').trim();
  if(!v||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)){
    inp.style.borderColor='#b0563c'; inp.focus();
    setTimeout(()=>inp.style.borderColor='',1600); return;
  }
  try{localStorage.setItem('tp_waitlist',v)}catch(_){}
  function payload(){
    const lg = document.body.classList.contains('de')?'de':'en';
    const fd=new FormData();
    fd.append('email',v); fd.append('EMAIL',v);
    fd.append('email_address_check',''); // Brevo sibforms honeypot — must be present and empty
    fd.append('locale', lg);             // Brevo sibforms locale
    fd.append('source','waitlist');
    fd.append('lang', lg);
    fd.append('page', location.pathname+location.hash);
    fd.append('ts', new Date().toISOString());
    return fd;
  }
  var sent=false;
  // 1) send to Brevo (newsletters) AND 2) your own Google Sheet (master list) — both at once
  if(NEWSLETTER_ENDPOINTS.brevo){ fetch(NEWSLETTER_ENDPOINTS.brevo,{method:'POST',mode:'no-cors',body:payload()}).catch(()=>{}); sent=true; }
  if(NEWSLETTER_ENDPOINTS.sheet){ fetch(NEWSLETTER_ENDPOINTS.sheet,{method:'POST',mode:'no-cors',body:payload()}).catch(()=>{}); sent=true; }
  if(!sent){
    // nothing configured yet → the signup still reaches Lia's inbox
    const sub=encodeURIComponent('Newsletter signup — TruthPrints');
    const body=encodeURIComponent('Please add me to the founding-reader list: '+v);
    window.open('mailto:hello.truthprints@gmail.com?subject='+sub+'&body='+body,'_blank');
  }
  // clean swap: hide the form + fine print, show the confirmation in their place
  document.getElementById('wform').style.display='none';
  const _n=document.getElementById('wnote'); if(_n)_n.style.display='none';
  document.getElementById('wsuccess').style.display='block';
});

/* ---------- LANGUAGE ---------- */
function applyLang(){
  document.body.classList.toggle('de',state.lang==='de');
  document.documentElement.lang=state.lang;
  document.getElementById('lcEn')?.classList.toggle('on',state.lang==='en');
  document.getElementById('lcDe')?.classList.toggle('on',state.lang==='de');
  localStorage.setItem('tp_lang',state.lang);
  // email placeholder
  const em=document.getElementById('wemail');
  if(em){const ph=state.lang==='de'?em.getAttribute('data-ph-de'):em.getAttribute('data-ph-en');if(ph)em.placeholder=ph;}
  // re-render JS-built content
  buildGallery();
  if(lb&&lb.classList.contains('on'))showLb();
}
document.getElementById('langBtn')?.addEventListener('click',()=>{
  state.lang=state.lang==='de'?'en':'de'; applyLang();
});

/* ---------- TWEAKS PANEL ---------- */
(function(){
  const tw=document.getElementById('tw'); if(!tw)return;
  // host visibility protocol
  function setVisible(v){ tw.classList.toggle('open',!!v); }
  window.addEventListener('message',e=>{
    const d=e.data||{};
    if(d.type==='tweaks:visibility'||d.type==='tweaks-visibility') setVisible(d.visible);
    if(d.type==='tweaks:toggle') setVisible(!tw.classList.contains('open'));
  });
  try{ window.parent&&window.parent.postMessage({type:'tweaks:ready'},'*'); }catch(_){}
  document.getElementById('twx')?.addEventListener('click',()=>setVisible(false));
  // motion
  tw.querySelectorAll('[data-motion]').forEach(b=>b.addEventListener('click',()=>{
    tw.querySelectorAll('[data-motion]').forEach(x=>x.classList.toggle('on',x===b));
    document.body.classList.remove('motion-subtle','motion-off');
    if(b.dataset.motion==='subtle')document.body.classList.add('motion-subtle');
    if(b.dataset.motion==='off')document.body.classList.add('motion-off');
    localStorage.setItem('tp_motion',b.dataset.motion);
    if(window.tpSyncHeroVideos)window.tpSyncHeroVideos();
  }));
  // accent palette
  tw.querySelectorAll('[data-accent]').forEach(b=>b.addEventListener('click',()=>{
    tw.querySelectorAll('[data-accent]').forEach(x=>x.classList.toggle('on',x===b));
    const map={gold:['#B8924A','#D4AC63','#7A5C2B'],amber:['#C0772E','#E2A24A','#7E4A18'],ember:['#A8412A','#D9743F','#6E2417'],sage:['#7E7A3E','#B7AE63','#4E4A1E']};
    const v=map[b.dataset.accent]||map.gold;
    document.documentElement.style.setProperty('--g',v[0]);
    document.documentElement.style.setProperty('--gb',v[1]);
    document.documentElement.style.setProperty('--gd',v[2]);
    localStorage.setItem('tp_accent',b.dataset.accent);
  }));
  // language inside tweaks
  tw.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>{
    state.lang=b.dataset.lang; applyLang();
    tw.querySelectorAll('[data-lang]').forEach(x=>x.classList.toggle('on',x.dataset.lang===state.lang));
  }));
  // restore saved tweaks
  const sm=localStorage.getItem('tp_motion'); if(sm){const b=tw.querySelector(`[data-motion="${sm}"]`);if(b)b.click();}
  const sa=localStorage.getItem('tp_accent'); if(sa){const b=tw.querySelector(`[data-accent="${sa}"]`);if(b)b.click();}
})();

/* ---------- BOOT ---------- */
document.querySelectorAll('[data-galbook]').forEach(b=>b.classList.toggle('on',b.dataset.galbook===state.galBook));
document.querySelectorAll('[data-lang]').forEach(b=>b.classList.toggle('on',b.dataset.lang===state.lang));
buildGallery();
applyLang();

// Hero safety net: guarantee copy is visible even if CSS animations are dropped/throttled.
setTimeout(function(){
  if(document.body.classList.contains('motion-off'))return;
  document.querySelectorAll('.heyebrow,.hsub,.hbtns,.hbot').forEach(e=>{e.style.opacity='1';e.style.transform='none';});
  document.querySelectorAll('.htitle .lnw').forEach(e=>{e.style.transform='none';});
},2700);
// motion-off: show hero copy immediately, no animation
if(document.body.classList.contains('motion-off')){
  document.querySelectorAll('.heyebrow,.hsub,.hbtns,.hbot').forEach(e=>{e.style.opacity='1';e.style.transform='none';});
  document.querySelectorAll('.htitle .lnw').forEach(e=>{e.style.transform='none';});
}
// kick hero videos to play
if(window.tpSyncHeroVideos)setTimeout(window.tpSyncHeroVideos,200);

/* ---------- BOOK PREVIEW ---------- */
(function(){
  // Selected spreads: pairs of plate images that look good side-by-side
  const SPREADS = [
    { l:'assets/pages/p01.jpg', r:'assets/pages/p02.jpg', ref:'Matthew 2 — The Magi & The Star' },
    { l:'assets/pages/p03.jpg', r:'assets/pages/p04.jpg', ref:'Matthew 5 — The Beatitudes' },
    { l:'assets/pages/p05.jpg', r:'assets/pages/p06.jpg', ref:'Matthew 26 — The Last Supper' },
    { l:'assets/pages/p07.jpg', r:'assets/pages/p08.jpg', ref:'Matthew 27 — The Crucifixion' },
    { l:'assets/pages/p09.jpg', r:'assets/pages/p10.jpg', ref:'Matthew 28 — He Is Risen' }
  ];

  let bpi=0;
  const modal=document.getElementById('bprev');
  const lImg=document.getElementById('bprev-l');
  const rImg=document.getElementById('bprev-r');
  const refEl=document.getElementById('bprev-ref');

  function curSpreads(){
    if(window.__tpShow){
      const b=window.__tpShow();
      return b.pages.map(p=>({l:p[0], r:p[1], ref:b.label}));
    }
    return SPREADS;
  }
  function showSpread(i){
    const list=curSpreads();
    bpi=((i%list.length)+list.length)%list.length;
    const s=list[bpi];
    lImg.src=s.l; rImg.src=s.r;
    refEl.textContent=s.ref+' · '+(bpi+1)+' / '+list.length;
  }

  function openPreview(){showSpread(0);modal.classList.add('on');document.body.style.overflow='hidden';}
  window.openPreview=openPreview;
  function closePreview(){modal.classList.remove('on');document.body.style.overflow='';}

  // sc-book replaced by sc-book-anim — preview triggered via scPreviewBtn
  document.getElementById('bprevX')?.addEventListener('click',closePreview);
  document.getElementById('bprev-p')?.addEventListener('click',()=>showSpread(bpi-1));
  document.getElementById('bprev-n')?.addEventListener('click',()=>showSpread(bpi+1));
  modal?.addEventListener('click',e=>{if(e.target===modal)closePreview();});
  window.addEventListener('keydown',e=>{
    if(!modal?.classList.contains('on'))return;
    if(e.key==='Escape')closePreview();
    if(e.key==='ArrowRight')showSpread(bpi+1);
    if(e.key==='ArrowLeft')showSpread(bpi-1);
  });
})();

/* ---------- SHOWCASE BOOKSHELF v4 — four Gospels, tabs, page turning ---------- */
(function(){
  const b3=document.getElementById('b3');
  const preBtn=document.getElementById('scPreviewBtn');
  if(!b3) return;
  const SHOW={
    matthew:{
      cover:'assets/books/matthew-cover.jpg',
      titleEn:'The Gospel<em>of Matthew</em>', titleDe:'Das Evangelium<em>nach Matthäus</em>',
      plates:244, chapters:28,
      descEn:'Two hundred forty-four full-plate chiaroscuro illustrations carry the whole life of Christ, from the genealogy to the Great Commission. The most densely illustrated volume in the library.',
      descDe:'Zweihundertvierundvierzig ganzseitige Chiaroscuro-Illustrationen tragen das ganze Leben Christi, vom Geschlechtsregister bis zum Missionsbefehl. Der am reichsten illustrierte Band der Bibliothek.',
      pages:[['assets/pages/p01.jpg','assets/pages/p02.jpg'],['assets/pages/p03.jpg','assets/pages/p04.jpg'],['assets/pages/p05.jpg','assets/pages/p06.jpg'],['assets/pages/p07.jpg','assets/pages/p08.jpg'],['assets/pages/p09.jpg','assets/pages/p10.jpg']]
    },
    mark:{
      cover:'assets/books/mark-cover.jpg',
      titleEn:'The Gospel<em>of Mark</em>', titleDe:'Das Evangelium<em>nach Markus</em>',
      plates:151, chapters:16,
      descEn:'The swiftest of the four — one hundred fifty-one plates follow the Servant who came not to be served, from the Jordan to the empty tomb.',
      descDe:'Das schnellste der vier — hunderteinundfünfzig Tafeln folgen dem Diener, der nicht kam, um sich dienen zu lassen, vom Jordan bis zum leeren Grab.',
      pages:[['assets/pages/mark-01.jpg','assets/pages/mark-02.jpg'],['assets/pages/mark-03.jpg','assets/pages/mark-04.jpg'],['assets/pages/mark-05.jpg','assets/pages/mark-06.jpg']]
    },
    luke:{
      cover:'assets/books/luke-cover.jpg',
      titleEn:'The Gospel<em>of Luke</em>', titleDe:'Das Evangelium<em>nach Lukas</em>',
      plates:256, chapters:24,
      descEn:'The physician&rsquo;s account — two hundred fifty-six plates of mercy: the manger, the parables, the lost being found, the road to Emmaus.',
      descDe:'Der Bericht des Arztes — zweihundertsechsundfünfzig Tafeln der Barmherzigkeit: die Krippe, die Gleichnisse, das Verlorene, das gefunden wird, der Weg nach Emmaus.',
      pages:[['assets/pages/luke-01.jpg','assets/pages/luke-02.jpg'],['assets/pages/luke-03.jpg','assets/pages/luke-04.jpg'],['assets/pages/luke-05.jpg','assets/pages/luke-06.jpg']]
    },
    john:{
      cover:'assets/books/john-cover.jpg',
      titleEn:'The Gospel<em>of John</em>', titleDe:'Das Evangelium<em>nach Johannes</em>',
      plates:199, chapters:21,
      descEn:'In the beginning was the Word — one hundred ninety-nine plates of light and glory, that you may believe, and believing have life in his name.',
      descDe:'Im Anfang war das Wort — hundertneunundneunzig Tafeln aus Licht und Herrlichkeit, damit ihr glaubt und im Glauben das Leben habt in seinem Namen.',
      pages:[['assets/pages/john-01.jpg','assets/pages/john-02.jpg'],['assets/pages/john-03.jpg','assets/pages/john-04.jpg'],['assets/pages/john-05.jpg','assets/pages/john-06.jpg']]
    }
  };
  let cur='matthew', pi=2, fi=4;
  window.__tpShow=function(){
    const b=SHOW[cur];
    return { key:cur, pages:b.pages,
      label:(document.body.classList.contains('de')
        ? b.titleDe : b.titleEn).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim() };
  };
  const L=document.getElementById('scPgL'),R=document.getElementById('scPgR'),NO=document.getElementById('scPgNo');
  const COV=document.getElementById('b3CoverImg');
  const BCK=document.getElementById('b3BackImg');
  const single=()=>matchMedia('(max-width:680px)').matches;
  const pagesEl=b3.querySelector('.b3-pages');
  const leaf=document.createElement('div'); leaf.className='b3-leaf';
  leaf.innerHTML='<div class="b3-leaf-f"><img alt=""></div><div class="b3-leaf-b"><img alt=""></div>';
  if(pagesEl) pagesEl.appendChild(leaf);
  const leafF=leaf.querySelector('.b3-leaf-f img'), leafB=leaf.querySelector('.b3-leaf-b img');
  let flipping=false;
  Object.values(SHOW).forEach(b=>b.pages.flat().forEach(p=>{new Image().src=p;}));

  function flat(){return SHOW[cur].pages.flat();}
  function show(step,turn){
    const PAGES=SHOW[cur].pages;
    if(turn){L.classList.remove('turn');R.classList.remove('turn');void R.offsetWidth;L.classList.add('turn');R.classList.add('turn');}
    if(single()){
      const F=flat();
      fi=(fi+step+F.length)%F.length;
      setTimeout(()=>{R.src=F[fi];},turn?160:0);
      if(NO)NO.textContent=(fi+1)+' / '+F.length;
    }else{
      pi=(pi+step+PAGES.length)%PAGES.length;
      setTimeout(()=>{L.src=PAGES[pi][0];R.src=PAGES[pi][1];if(BCK)BCK.src=PAGES[pi][0];},turn?160:0);
      if(NO)NO.textContent=(pi+1)+' / '+PAGES.length;
    }
  }
  function turnPage(step){
    if(flipping) return;
    if(single()){ show(step,true); return; }
    const PAGES=SHOW[cur].pages;
    const ni=(pi+step+PAGES.length)%PAGES.length;
    flipping=true;
    // Clean crossfade between spreads — reliable, no 3D-timing flash/pop.
    const pre=src=>{ const im=new Image(); im.src=src; return im.decode? im.decode().catch(()=>{}) : Promise.resolve(); };
    Promise.all([pre(PAGES[ni][0]),pre(PAGES[ni][1])]).then(()=>{
      b3.classList.add('xfade');                       // fade current spread out
      setTimeout(()=>{
        L.src=PAGES[ni][0]; R.src=PAGES[ni][1]; if(BCK)BCK.src=PAGES[ni][0];
        pi=ni; if(NO)NO.textContent=(pi+1)+' / '+PAGES.length;
        requestAnimationFrame(()=>requestAnimationFrame(()=>b3.classList.remove('xfade')));  // fade new spread in
        setTimeout(()=>{ flipping=false; }, 320);
      }, 300);                                          // matches the CSS fade-out duration below
    });
  }
  function applyBook(b){
    const T=document.getElementById('scTitle');
    if(T)T.innerHTML='<span data-en>'+b.titleEn+'</span><span data-de>'+b.titleDe+'</span>';
    const D=document.getElementById('scDesc');
    if(D)D.innerHTML='<span data-en>'+b.descEn+'</span><span data-de>'+b.descDe+'</span>';
    const PL=document.getElementById('scPlates'); if(PL)PL.textContent=b.plates;
    const CH=document.getElementById('scChapters'); if(CH)CH.textContent=b.chapters;
    L.src=b.pages[0][0];R.src=b.pages[0][1];if(BCK)BCK.src=b.pages[0][0];
    if(NO)NO.textContent='';
  }
  function setBook(key){
    if(!SHOW[key]||key===cur)return;
    const wasOpen=b3.dataset.open==='1';
    cur=key; pi=0; fi=0;
    document.querySelectorAll('[data-showbook]').forEach(t=>t.classList.toggle('on',t.dataset.showbook===key));
    if(COV)COV.src=SHOW[cur].cover;
    if(wasOpen){
      // clean crossfade close: pages fade out, new cover fades in closed (no fragile flip)
      b3.classList.add('switching');
      b3.dataset.open='0';
      setTimeout(()=>{ applyBook(SHOW[cur]); b3.classList.remove('switching'); }, 360);
    } else {
      applyBook(SHOW[cur]);
    }
  }
  document.querySelectorAll('[data-showbook]').forEach(t=>{
    t.addEventListener('click',()=>setBook(t.dataset.showbook));
  });
  b3.addEventListener('click',e=>{
    if(e.target.closest('.sc-flip'))return;
    if(b3.dataset.open!=='1'){b3.dataset.open='1';show(0,false);}
  });
  document.getElementById('scFlipPrev')?.addEventListener('click',e=>{e.stopPropagation();turnPage(-1);});
  document.getElementById('scFlipNext')?.addEventListener('click',e=>{e.stopPropagation();turnPage(1);});
  preBtn?.addEventListener('click',()=>{if(typeof openPreview==='function')openPreview();});
})();

/* ---------- FULL BIBLE READER ---------- */
(function(){
  const OT=[
    {id:'genesis',n:'Genesis',ch:50},{id:'exodus',n:'Exodus',ch:40},{id:'leviticus',n:'Leviticus',ch:27},
    {id:'numbers',n:'Numbers',ch:36},{id:'deuteronomy',n:'Deuteronomy',ch:34},{id:'joshua',n:'Joshua',ch:24},
    {id:'judges',n:'Judges',ch:21},{id:'ruth',n:'Ruth',ch:4},{id:'1+samuel',n:'1 Samuel',ch:31},
    {id:'2+samuel',n:'2 Samuel',ch:24},{id:'1+kings',n:'1 Kings',ch:22},{id:'2+kings',n:'2 Kings',ch:25},
    {id:'1+chronicles',n:'1 Chronicles',ch:29},{id:'2+chronicles',n:'2 Chronicles',ch:36},
    {id:'ezra',n:'Ezra',ch:10},{id:'nehemiah',n:'Nehemiah',ch:13},{id:'esther',n:'Esther',ch:10},
    {id:'job',n:'Job',ch:42},{id:'psalms',n:'Psalms',ch:150},{id:'proverbs',n:'Proverbs',ch:31},
    {id:'ecclesiastes',n:'Ecclesiastes',ch:12},{id:'song+of+solomon',n:'Song of Solomon',ch:8},
    {id:'isaiah',n:'Isaiah',ch:66},{id:'jeremiah',n:'Jeremiah',ch:52},{id:'lamentations',n:'Lamentations',ch:5},
    {id:'ezekiel',n:'Ezekiel',ch:48},{id:'daniel',n:'Daniel',ch:12},{id:'hosea',n:'Hosea',ch:14},
    {id:'joel',n:'Joel',ch:3},{id:'amos',n:'Amos',ch:9},{id:'obadiah',n:'Obadiah',ch:1},
    {id:'jonah',n:'Jonah',ch:4},{id:'micah',n:'Micah',ch:7},{id:'nahum',n:'Nahum',ch:3},
    {id:'habakkuk',n:'Habakkuk',ch:3},{id:'zephaniah',n:'Zephaniah',ch:3},{id:'haggai',n:'Haggai',ch:2},
    {id:'zechariah',n:'Zechariah',ch:14},{id:'malachi',n:'Malachi',ch:4}
  ];
  const NT=[
    {id:'matthew',n:'Matthew',ch:28},{id:'mark',n:'Mark',ch:16},{id:'luke',n:'Luke',ch:24},
    {id:'john',n:'John',ch:21},{id:'acts',n:'Acts',ch:28},{id:'romans',n:'Romans',ch:16},
    {id:'1+corinthians',n:'1 Corinthians',ch:16},{id:'2+corinthians',n:'2 Corinthians',ch:13},
    {id:'galatians',n:'Galatians',ch:6},{id:'ephesians',n:'Ephesians',ch:6},
    {id:'philippians',n:'Philippians',ch:4},{id:'colossians',n:'Colossians',ch:4},
    {id:'1+thessalonians',n:'1 Thessalonians',ch:5},{id:'2+thessalonians',n:'2 Thessalonians',ch:3},
    {id:'1+timothy',n:'1 Timothy',ch:6},{id:'2+timothy',n:'2 Timothy',ch:4},
    {id:'titus',n:'Titus',ch:3},{id:'philemon',n:'Philemon',ch:1},{id:'hebrews',n:'Hebrews',ch:13},
    {id:'james',n:'James',ch:5},{id:'1+peter',n:'1 Peter',ch:5},{id:'2+peter',n:'2 Peter',ch:3},
    {id:'1+john',n:'1 John',ch:5},{id:'2+john',n:'2 John',ch:1},{id:'3+john',n:'3 John',ch:1},
    {id:'jude',n:'Jude',ch:1},{id:'revelation',n:'Revelation',ch:22}
  ];

  let curBook=null,curCh=1,built=false;
  const fbNav=document.getElementById('fbNav');
  const fbContent=document.getElementById('fbContent');
  const fbStatus=document.getElementById('fbStatus');

  function showTestament(t){
    if(!fbNav)return;
    // Each testament group is a wrapper div with data-tsect
    fbNav.querySelectorAll('.fb-tgroup').forEach(el=>{
      el.style.display=el.dataset.tsect===t?'':'none';
    });
  }

  window.initFb=function(){
    if(built||!fbNav)return; built=true;
    let h='';
    // Testament tabs
    h+=`<div class="fb-ttabs"><button class="fb-ttab on" data-t="nt">New Testament</button><button class="fb-ttab" data-t="ot">Old Testament</button></div>`;
    // NT group (shown by default)
    h+=`<div class="fb-tgroup" data-tsect="nt"><div class="fb-testament">New Testament</div>`;
    NT.forEach(b=>{
      h+=`<button class="fb-book-btn" data-bid="${b.id}" data-chs="${b.ch}">${b.n}<span class="fb-book-chs">${b.ch}</span></button>`;
      h+=`<div class="fb-ch-row" id="chr-${b.id.replace(/\+/g,'')}"></div>`;
    });
    h+=`</div>`;
    // OT group (hidden by default)
    h+=`<div class="fb-tgroup" data-tsect="ot" style="display:none"><div class="fb-testament">Old Testament</div>`;
    OT.forEach(b=>{
      h+=`<button class="fb-book-btn" data-bid="${b.id}" data-chs="${b.ch}">${b.n}<span class="fb-book-chs">${b.ch}</span></button>`;
      h+=`<div class="fb-ch-row" id="chr-${b.id.replace(/\+/g,'')}"></div>`;
    });
    h+=`</div>`;
    fbNav.innerHTML=h;
    // Tab click
    fbNav.querySelectorAll('.fb-ttab').forEach(tab=>{
      tab.addEventListener('click',()=>{
        fbNav.querySelectorAll('.fb-ttab').forEach(x=>x.classList.remove('on'));
        tab.classList.add('on');
        showTestament(tab.dataset.t);
      });
    });
    // Book click
    fbNav.querySelectorAll('.fb-book-btn').forEach(btn=>{btn.addEventListener('click',()=>selectBook(btn));});
  };

  function selectBook(btn){
    const bid=btn.dataset.bid,chs=parseInt(btn.dataset.chs);
    if(curBook){
      fbNav.querySelector(`.fb-book-btn[data-bid="${curBook}"]`)?.classList.remove('on');
      const prev=document.getElementById('chr-'+curBook.replace(/\+/g,''));
      if(prev)prev.classList.remove('on');
    }
    curBook=bid;curCh=1;
    btn.classList.add('on');
    const chRow=document.getElementById('chr-'+bid.replace(/\+/g,''));
    if(chRow){
      chRow.classList.add('on');
      if(!chRow.children.length){
        for(let i=1;i<=chs;i++){
          const cb=document.createElement('button');
          cb.className='fb-ch'+(i===1?' on':'');
          cb.textContent=i;cb.dataset.ch=i;
          cb.addEventListener('click',e=>{
            e.stopPropagation();
            chRow.querySelectorAll('.fb-ch').forEach(c=>c.classList.remove('on'));
            cb.classList.add('on');curCh=i;loadCh();
          });
          chRow.appendChild(cb);
        }
      }
    }
    loadCh();
  }

  async function loadCh(){
    if(fbStatus)fbStatus.style.display='block';
    if(fbContent)fbContent.style.display='none';
    if(fbStatus){fbStatus.innerHTML='<span data-en>Loading…</span>';}
    try{
      const de=document.body.classList.contains('de');
      const nr=[...OT,...NT].findIndex(b=>b.id===curBook)+1;
      const url=de
        ? `https://api.getbible.net/v2/elberfelder/${nr}/${curCh}.json`
        : `https://bible-api.com/${curBook}+${curCh}?translation=web`;
      const r=await fetch(url);
      const d=await r.json();
      if(d.error||!d.verses)throw new Error(d.error||'no verses');
      renderCh2(d);
    }catch(e){
      if(fbStatus){fbStatus.style.display='block';fbStatus.innerHTML='<span>Unable to load. Check your connection.</span>';}
    }
  }

  let _lastDe=document.body.classList.contains('de');
  new MutationObserver(()=>{
    const now=document.body.classList.contains('de');
    if(now!==_lastDe){_lastDe=now;if(curBook)loadCh();}
  }).observe(document.body,{attributes:true,attributeFilter:['class']});

  function renderCh2(d){
    if(fbStatus)fbStatus.style.display='none';
    if(!fbContent)return;
    fbContent.style.display='block';
    const allBooks=[...OT,...NT];
    const bk=allBooks.find(b=>b.id===curBook);
    const totalChs=bk?bk.ch:1;
    // Heading
    let html=`<div class="fb-heading">${bk?bk.n:''} <em>· ${curCh}</em><span class="fb-ch-of">of ${totalChs}</span></div>`;
    // Verses
    const verses=d.verses||[];
    verses.forEach((v,i)=>{
      const cls=i===0?'fb-verse fb-verse-first':'fb-verse';
      html+=`<div class="${cls}"><span class="fb-vnum">${v.verse}</span><span class="fb-vtext">${v.text.trim()}</span></div>`;
    });
    // Navigation
    const prev=curCh>1?`<button onclick="window.fbGo(${curCh-1})">← Previous Chapter</button>`:'<span></span>';
    const next=curCh<totalChs?`<button onclick="window.fbGo(${curCh+1})">Next Chapter →</button>`:'<span></span>';
    html+=`<div class="fb-nav-ch">${prev}<span>Chapter ${curCh} of ${totalChs}</span>${next}</div>`;
    fbContent.innerHTML=html;
    // scroll panel to top without triggering window scroll
    const panel=document.getElementById('fbPanel');
    if(panel) panel.scrollTop=0;
  }

  window.fbGo=function(ch){
    curCh=ch;
    const chRow=document.getElementById('chr-'+(curBook||'').replace(/\+/g,''));
    chRow?.querySelectorAll('.fb-ch').forEach(c=>{c.classList.toggle('on',parseInt(c.dataset.ch)===ch);});
    loadCh();
  };

  // Auto-init on page load (not on button click)
  if(fbNav) window.initFb();
})();

}); /* DOMContentLoaded */


/* ---------- SMOOTH SCROLL (Lenis) ---------- */
(function(){
  if(!window.Lenis) return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if(document.body.classList.contains('motion-off')) return;
  const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.95, smoothWheel: true });
  function raf(t){ lenis.raf(t); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);
  // anchor links route through Lenis for the buttery glide
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const id=a.getAttribute('href');
      if(id.length<2) return;
      let el=document.querySelector(id);
      if(!el) return;
      e.preventDefault();
      let off=-70;
      if(id==='#editions'){ el=document.querySelector('#editions .egrid')||el; off=-96; }
      lenis.scrollTo(el,{ offset:off, duration:1.35 });
    });
  });
  window._lenis = lenis;
})();

/* ---------- CONVERSION LAYER ---------- */
(function(){
  /* sticky CTA bar — appears after the fold, hides near editions/waitlist/footer */
  const bar=document.getElementById('stickybar');
  if(bar){
    let dismissed = sessionStorage.getItem('tp_sb_x')==='1';
    const hideZones=['editions','waitlist'].map(id=>document.getElementById(id)).filter(Boolean);
    const footer=document.querySelector('footer');
    if(footer) hideZones.push(footer);
    let inZone=false;
    const io=new IntersectionObserver(es=>{
      inZone = es.some(e=>e.isIntersecting) ? true
             : hideZones.some(z=>{const r=z.getBoundingClientRect();return r.top<innerHeight&&r.bottom>0;});
      update();
    },{threshold:0.05});
    hideZones.forEach(z=>io.observe(z));
    function update(){
      if(dismissed){bar.classList.remove('show');return;}
      const past = scrollY > innerHeight*1.15;
      bar.classList.toggle('show', past && !inZone);
    }
    addEventListener('scroll',update,{passive:true});
    document.getElementById('sbx')?.addEventListener('click',()=>{
      dismissed=true; sessionStorage.setItem('tp_sb_x','1'); update();
    });
  }

  /* edition intent — remember which edition was clicked (cart-intent groundwork) */
  document.querySelectorAll('.ed-buy').forEach(a=>{
    a.addEventListener('click',()=>{
      const card=a.closest('.ed');
      const name=card?.querySelector('.ed-name')?.textContent?.trim()||'';
      try{localStorage.setItem('tp_intent',JSON.stringify({ed:name,t:Date.now()}));}catch(_){}
    });
  });

  /* exit-intent popup (desktop) / timed (touch) — once, ever */
  const pop=document.getElementById('tppop');
  if(pop && !localStorage.getItem('tp_pop_seen')){
    let shown=false;
    function show(){
      if(shown) return; shown=true;
      pop.classList.add('open');
      try{localStorage.setItem('tp_pop_seen','1');}catch(_){}
    }
    function close(){ pop.classList.remove('open'); }
    document.getElementById('tppopx')?.addEventListener('click',close);
    pop.addEventListener('click',e=>{ if(e.target===pop) close(); });
    document.getElementById('tppopgo')?.addEventListener('click',()=>{
      close();
      const ed=document.getElementById('editions');
      if(window._lenis&&ed) window._lenis.scrollTo(ed,{offset:-70,duration:1.2});
      else ed?.scrollIntoView({behavior:'smooth'});
    });
    document.addEventListener('keydown',e=>{ if(e.key==='Escape') close(); });
    if(matchMedia('(pointer:fine)').matches){
      document.addEventListener('mouseout',e=>{
        if(!e.relatedTarget && e.clientY<8) show();
      });
    } else {
      setTimeout(()=>{ if(scrollY>innerHeight*1.5) show(); }, 45000);
    }
  }

  /* waitlist — also POST to /subscribe when a backend is present (fire & forget) */
  document.getElementById('wsub')?.addEventListener('click',()=>{
    const v=document.getElementById('wemail')?.value.trim();
    if(!v||!v.includes('@')) return;
    try{localStorage.setItem('tp_waitlist',v);}catch(_){}
    fetch('/subscribe',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({email:v,lang:document.body.classList.contains('de')?'de':'en'})
    }).catch(()=>{});
  });
})();


/* ---------- WALLART ZOOM (reuses the gallery lightbox) ---------- */
(function(){
  const lb=document.getElementById('lb'), lbi=document.getElementById('lbi'),
        lbt=document.getElementById('lbt'), lbr=document.getElementById('lbr');
  if(!lb||!lbi) return;
  document.querySelectorAll('.wa-card').forEach(card=>{
    const img=card.querySelector('.wa-frame img');
    const name=()=>card.querySelector('.wa-name span:not([style])')?.textContent||'';
    card.querySelector('.wa-wall')?.addEventListener('click',e=>{
      if(e.target.closest('.wa-foot'))return;
      lbi.src=img.src; lbi.alt=name();
      if(lbt)lbt.textContent=name();
      if(lbr)lbr.textContent=card.querySelector('.wa-ref')?.textContent.trim()||'';
      lb.classList.add('on');
      document.body.style.overflow='hidden';
    });
  });
})();
