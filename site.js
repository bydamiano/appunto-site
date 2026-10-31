// Appunto site: language switch, quest log, platform picker, download links.
// Plain DOM; every dynamic text goes through textContent.
(function () {
  'use strict';

  const STORE_KEY = 'appunto-site.lang';
  const RELEASES = 'https://github.com/bydamiano/appunto-site/releases/latest';
  const API = 'https://api.github.com/repos/bydamiano/appunto-site/releases/latest';
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const T = {
    it: {
      'meta.home.title': 'Appunto: ogni riunione, ricordata',
      'meta.home.desc': 'Appunto registra le call di Meet, Zoom e Teams su Mac, Windows e Linux, le trascrive sul tuo computer e trasforma quello che si dice in cose da fare, decisioni e risposte. Nessun bot in riunione.',
      'meta.dl.title': 'Scarica Appunto per Mac, Windows e Linux',
      'meta.dl.desc': 'Scarica Appunto per macOS (Apple e Intel), Windows 10/11 e Linux: un file, si installa come ogni altra app.',
      'nav.home': 'Home', 'nav.download': 'Scarica', 'nav.guide': 'Guida', 'nav.privacy': 'Privacy', 'nav.terms': 'Termini',
      'nav.how': 'Come funziona', 'nav.todos': 'Cose da fare', 'nav.features': 'Funzioni',
      'cta.download': 'Scarica', 'lang.label': 'Lingua',
      'hero.pill': 'Nessun bot è stato invitato a questa riunione',
      'hero.l1': 'Ogni riunione,', 'hero.l2': 'ricordata.',
      'hero.sub': 'Appunto registra qualsiasi call dal tuo computer, la trascrive sul tuo computer e trasforma quello che si dice in cose da fare, decisioni e risposte. Un punto di salvataggio per le tue riunioni.',
      'hero.cta': 'Scarica Appunto', 'hero.cta.mac': 'Scarica per Mac', 'hero.cta.windows': 'Scarica per Windows', 'hero.cta.linux': 'Scarica per Linux',
      'hero.how': 'Guarda come funziona',
      'demo.label': 'Esempio: una riunione registrata con Appunto', 'demo.title': 'Riunione settimanale',
      'demo.l1': 'Ok, PROJ-142 esce lunedì dietro un flag.', 'demo.decision': 'Decisione',
      'demo.l2': 'Mando io le slide del Q3 a Luca entro venerdì.', 'demo.todo': 'Azione → Cosa da fare', 'demo.v3': 'Voce 3',
      'chip.todo': '+1 cosa da fare', 'chip.local': "L'audio resta su questo computer",
      'mq.label': 'Funziona con Google Meet, Zoom, Teams e qualsiasi call con audio',
      'mq.any': 'Qualsiasi call con audio', 'mq.bots': 'Nessun bot', 'mq.local': 'whisper.cpp sul tuo computer', 'mq.langs': '12 lingue',
      'how.eyebrow': 'Come funziona', 'how.h1': 'Tre livelli.', 'how.h2': 'Nessun tutorial.',
      'lvl.1.h': 'Premi registra', 'lvl.1.p': "Google Meet, Zoom, Teams, qualsiasi cosa con l'audio. Appunto ascolta dal tuo computer, non da un bot seduto nella griglia.", 'lvl.1.f': 'Un clic. Nessuna strana richiesta di accesso.',
      'lvl.2.h': 'Trascritto in locale', 'lvl.2.p': "whisper.cpp gira sul tuo computer, in 12 lingue. L'audio non esce mai, nemmeno per un giretto.", 'lvl.2.f': 'Lavora il tuo computer. I tuoi dati restano a casa.',
      'lvl.3.h': 'Memoria totale', 'lvl.3.p': "Decisioni, azioni, ticket Jira, issue e pull request finiscono su una timeline, nell'ordine in cui sono successe.", 'lvl.3.f': 'Finalmente qualcuno si ricorda cosa si era deciso.',
      'todo.eyebrow': 'Cose da fare', 'todo.h1': 'Le azioni diventano', 'todo.h2': 'missioni.',
      'todo.p': 'Ogni azione sentita in riunione diventa una cosa da fare, una volta sola, con il link al momento in cui è stata detta. Scegli chi e quando, spuntale, guarda la settimana riempirsi.',
      'todo.try': 'Dai, spuntane qualcuna. È bellissimo.',
      'todo.board': 'Missioni della settimana', 'todo.progress': 'Avanzamento della settimana',
      'q.1.t': 'Mandare le slide del Q3 a Luca', 'q.1.m': 'Riunione settimanale · detto alle 14:32 · entro ven',
      'q.2.t': 'Rivedere owner/repo#12', 'q.2.m': 'Design review · detto alle 10:05 · entro oggi',
      'q.3.t': 'Chiudere PROJ-142 dopo il QA', 'q.3.m': 'Standup · detto alle 09:12 · entro lun',
      'q.4.t': 'Prenotare una sala per la retro', 'q.4.m': 'Call di team · detto alle 16:48 · entro gio',
      'rank.0': 'Grado: Apprendista', 'rank.1': 'Grado: In riscaldamento', 'rank.2': 'Grado: Ci sa fare', 'rank.3': 'Grado: Quasi leggenda', 'rank.4': 'Grado: Leggenda delle riunioni',
      'hint.0': 'Tocca una missione per completarla.', 'hint.1': 'Bene. Ne mancano tre.', 'hint.2': 'A metà strada. Non perdere il ritmo.', 'hint.3': 'Ne manca una. Si sente già il weekend.', 'hint.4': 'Settimana completata!',
      'todo.done.h': 'Settimana completata!', 'todo.done.p': 'Il te del futuro ringrazia. Forse anche il tuo capo.', 'todo.again': 'Gioca ancora',
      'feat.eyebrow': 'Funzioni', 'feat.h1': 'Un secondo cervello', 'feat.h2': "con un'ottima memoria.",
      'ask.h': 'Chiedi qualsiasi cosa alle tue riunioni.', 'ask.p': "Le risposte citano il momento esatto, con il link alla trascrizione. Basta «aspetta, chi l'ha detto?».",
      'ask.q': 'Cosa abbiamo deciso su PROJ-142?', 'ask.a': 'Esce lunedì dietro un feature flag.',
      'names.h': 'Chi parla ha un nome', 'names.p': 'Legge la scheda aperta di Google Meet e mette il nome giusto su «Voce 1». Senza estensioni, senza bot.', 'names.v1': 'Voce 1',
      'tl.h': 'Una timeline sola', 'tl.p': "Ogni riunione, nell'ordine in cui le cose sono successe.", 'tl.action': 'Azione',
      'ai.h': "Collega un'AI", 'ai.p': 'Claude Desktop, Claude Code, Codex o qualsiasi client MCP possono cercare nelle riunioni e gestire le cose da fare. Spento finché non lo accendi. Scegli tu cosa vede.',
      'tools.h': 'I tuoi strumenti, collegati', 'tools.p': 'Server MCP ufficiali, accesso dal browser. Nessun token da copiare.',
      'who.h': "Chi c'era in call", 'who.p': 'Accedi con Google una volta: ogni registrazione prende il titolo dal Calendario, le persone invitate e, per Meet, chi è entrato davvero.',
      'prov.h': 'La tua AI, la tua scelta', 'prov.p': 'Gemini con una chiave API gratuita, il tuo piano ChatGPT Plus/Pro, OpenAI, Anthropic o OpenRouter. Trascrizione in 12 lingue, interfaccia in italiano e inglese.', 'prov.chatgpt': 'Piano ChatGPT',
      'priv.h1': 'Il tuo audio non ha mai visto internet.', 'priv.h2': 'Neanche una volta.',
      'priv.s1': 'bot nelle tue call', 'priv.s2': 'byte di audio caricati', 'priv.s3': 'trascritto sul tuo computer',
      'priv.f1': 'Le registrazioni sono trascritte in locale e salvate in un database sul tuo computer.',
      'priv.f2': "Quando fai una domanda, solo i pochi pezzi utili vanno all'AI che hai scelto.",
      'priv.f3': 'Gli strumenti collegati ricevono solo codici come PROJ-142, mai il testo delle trascrizioni.',
      'priv.f4': 'Non esiste un server di Appunto. Nessuna analitica, nessun tracciamento.',
      'priv.more': 'Leggi cosa esce e cosa no',
      'pick.eyebrow': 'Scarica', 'pick.h1': 'Scegli la piattaforma.', 'pick.h2': 'Premi start.', 'pick.label': 'Piattaforma',
      'pick.mac-arm': 'Chip Apple (M1 e successivi)', 'pick.mac-intel': 'Chip Intel',
      'pick.hint.mac-arm': 'Primo avvio: Impostazioni di Sistema → Privacy e sicurezza → Apri comunque. Una volta sola, promesso.',
      'pick.hint.mac-intel': 'Non sai che Mac hai? Menu Apple → Informazioni su questo Mac → guarda Chip.',
      'pick.hint.windows': "L'app non è ancora firmata: se Windows ti avvisa, premi Ulteriori informazioni → Esegui comunque.",
      'pick.hint.linux': '.deb per Ubuntu e Debian, .rpm per Fedora e openSUSE, .AppImage per tutte le altre.',
      'pick.cta.mac-arm': 'Scarica per Mac', 'pick.cta.mac-intel': 'Scarica per Mac', 'pick.cta.windows': 'Scarica per Windows', 'pick.cta.linux': 'Scarica per Linux',
      'pick.consent': 'Registrare altre persone può richiedere il loro consenso dove vivi. Avvisa chi partecipa quando registri.',
      'dl.h': 'Scarica Appunto', 'dl.lead': 'Un file, si installa come ogni altra app. Al primo avvio Appunto scarica una volta il modello vocale (circa 574 MB).',
      'dl.loading': "Cerco l'ultima versione…", 'dl.version': 'Versione {v}, {d}', 'dl.error': "Non riesco a caricare l'elenco dei file.", 'dl.open': "Apri l'ultima release su GitHub",
      'dl.you': 'Il tuo computer',
      'dl.mac.arm': 'Mac con chip Apple', 'dl.mac.arm.s': 'M1, M2, M3, M4…', 'dl.mac.intel': 'Mac con chip Intel', 'dl.mac.hint': 'Quale Mac hai? Menu Apple, Informazioni su questo Mac, Chip.',
      'dl.win.exe': 'Installer', 'dl.win.msi': 'Pacchetto MSI', 'dl.win.msi.s': 'Per computer gestiti',
      'dl.deb': 'Ubuntu, Debian, Linux Mint', 'dl.rpm': 'Fedora, openSUSE', 'dl.appimage': 'Altre distribuzioni',
      'dl.install.h': 'Installa e apri',
      'dl.i.mac.1': 'Apri il file .dmg e trascina Appunto nella cartella Applicazioni.',
      'dl.i.mac.2': "La prima volta macOS dice che non può verificare l'app (non è ancora firmata con un certificato Apple a pagamento): premi Fine, poi apri Impostazioni di Sistema, Privacy e sicurezza, scorri in basso e premi Apri comunque accanto ad Appunto. Si fa una volta sola.",
      'dl.i.win.1': 'Apri il file -setup.exe.',
      'dl.i.win.2': "Se Windows mostra «Windows ha protetto il PC», premi Ulteriori informazioni e poi Esegui comunque (l'app non è ancora firmata).",
      'dl.i.linux.1': ".deb o .rpm: aprilo e premi Installa nell'app Software.",
      'dl.i.linux.2': ".AppImage: tasto destro, Proprietà, Permessi, spunta «Consenti l'esecuzione come programma», poi aprilo.",
      'dl.guide': 'Primo avvio, permessi e consigli nella guida',
      'foot.contact': 'Contatti',
    },
    en: {
      'meta.home.title': 'Appunto: every meeting, remembered',
      'meta.home.desc': 'Appunto records Meet, Zoom and Teams calls on Mac, Windows and Linux, transcribes them on your computer and turns what was said into to-dos, decisions and answers. No bot joins the meeting.',
      'meta.dl.title': 'Download Appunto for Mac, Windows and Linux',
      'meta.dl.desc': 'Download Appunto for macOS (Apple and Intel), Windows 10/11 and Linux: one file, installed like any other app.',
      'nav.home': 'Home', 'nav.download': 'Download', 'nav.guide': 'Guide', 'nav.privacy': 'Privacy', 'nav.terms': 'Terms',
      'nav.how': 'How it works', 'nav.todos': 'To-dos', 'nav.features': 'Features',
      'cta.download': 'Download', 'lang.label': 'Language',
      'hero.pill': 'No bots were invited to this meeting',
      'hero.l1': 'Every meeting,', 'hero.l2': 'remembered.',
      'hero.sub': 'Appunto records any call straight from your computer, transcribes it on your machine, and turns what was said into to-dos, decisions and answers. Think of it as a save point for your meetings.',
      'hero.cta': 'Download Appunto', 'hero.cta.mac': 'Download for Mac', 'hero.cta.windows': 'Download for Windows', 'hero.cta.linux': 'Download for Linux',
      'hero.how': 'See how it works',
      'demo.label': 'Example: a meeting recorded with Appunto', 'demo.title': 'Weekly sync',
      'demo.l1': 'Okay, PROJ-142 ships behind a flag on Monday.', 'demo.decision': 'Decision',
      'demo.l2': "I'll send the Q3 deck to Luca by Friday.", 'demo.todo': 'Action item → To-do', 'demo.v3': 'Speaker 3',
      'chip.todo': '+1 to-do', 'chip.local': 'Audio stays on this computer',
      'mq.label': 'Works with Google Meet, Zoom, Teams and any call with sound',
      'mq.any': 'Any call with sound', 'mq.bots': 'No bots', 'mq.local': 'whisper.cpp on your computer', 'mq.langs': '12 languages',
      'how.eyebrow': 'How it works', 'how.h1': 'Three levels.', 'how.h2': 'No tutorial needed.',
      'lvl.1.h': 'Hit record', 'lvl.1.p': 'Google Meet, Zoom, Teams, anything with sound. Appunto listens from your computer, not from a bot sitting in the grid.', 'lvl.1.f': 'One click. Nobody gets a weird join request.',
      'lvl.2.h': 'Transcribed locally', 'lvl.2.p': 'whisper.cpp runs right on your machine, in 12 languages. The audio never leaves, not even for a quick trip.', 'lvl.2.f': 'Your computer does the work. Your data stays home.',
      'lvl.3.h': 'Total recall', 'lvl.3.p': 'Decisions, action items, Jira tickets, issues and pull requests land on a timeline, in the order they happened.', 'lvl.3.f': 'Finally, someone remembers what was decided.',
      'todo.eyebrow': 'To-dos', 'todo.h1': 'Action items become', 'todo.h2': 'quests.',
      'todo.p': 'Every action item heard in a meeting becomes a to-do, once, with a link back to the moment it was said. Set who and when, tick them off, watch the week fill up.',
      'todo.try': 'Go on, tick a few. It feels great.',
      'todo.board': "This week's quest log", 'todo.progress': 'Weekly progress',
      'q.1.t': 'Send the Q3 deck to Luca', 'q.1.m': 'Weekly sync · said at 14:32 · due Fri',
      'q.2.t': 'Review owner/repo#12', 'q.2.m': 'Design review · said at 10:05 · due today',
      'q.3.t': 'Close PROJ-142 after QA', 'q.3.m': 'Standup · said at 09:12 · due Mon',
      'q.4.t': 'Book a room for the retro', 'q.4.m': 'Team call · said at 16:48 · due Thu',
      'rank.0': 'Rank: Rookie note-taker', 'rank.1': 'Rank: Warming up', 'rank.2': 'Rank: Getting things done', 'rank.3': 'Rank: Almost legendary', 'rank.4': 'Rank: Meeting legend',
      'hint.0': 'Tap a quest to complete it.', 'hint.1': 'Nice. Three to go.', 'hint.2': 'Halfway there. Keep the streak.', 'hint.3': 'One left. You can smell the weekend.', 'hint.4': 'Week cleared!',
      'todo.done.h': 'Week cleared!', 'todo.done.p': 'Your future self says thanks. Your manager might too.', 'todo.again': 'Play again',
      'feat.eyebrow': 'Features', 'feat.h1': 'A second brain', 'feat.h2': 'with a great memory.',
      'ask.h': 'Ask your meetings anything.', 'ask.p': 'Answers quote the exact moment, with a link straight to the transcript. No more "wait, who said that?"',
      'ask.q': 'What did we decide about PROJ-142?', 'ask.a': 'Ship it behind a feature flag on Monday.',
      'names.h': 'Speakers get names', 'names.p': 'Reads the open Google Meet tab and puts the right name on "Speaker 1". No extension, no bot.', 'names.v1': 'Speaker 1',
      'tl.h': 'One timeline', 'tl.p': 'Every meeting, in the order things happened.', 'tl.action': 'Action item',
      'ai.h': 'Connect an AI', 'ai.p': 'Claude Desktop, Claude Code, Codex or any MCP client can search your meetings and manage your to-dos. Off by default. You choose what it sees.',
      'tools.h': 'Your tools, linked', 'tools.p': 'Official MCP servers, browser sign-in. No tokens to copy.',
      'who.h': 'Who was in the call', 'who.p': 'Sign in with Google once: each recording gets its Calendar title, the people invited and, for Meet, who actually joined.',
      'prov.h': 'Your AI, your call', 'prov.p': 'Gemini with a free API key, your ChatGPT Plus/Pro plan, OpenAI, Anthropic or OpenRouter. Transcription in 12 languages, interface in English and Italian.', 'prov.chatgpt': 'ChatGPT plan',
      'priv.h1': 'Your audio has never seen the internet.', 'priv.h2': 'Not even once.',
      'priv.s1': 'bots joining your calls', 'priv.s2': 'bytes of audio uploaded', 'priv.s3': 'transcribed on your computer',
      'priv.f1': 'Recordings are transcribed locally and kept in a database on your computer.',
      'priv.f2': 'When you ask a question, only the few relevant snippets go to the AI you chose.',
      'priv.f3': 'Connected tools get identifiers like PROJ-142, never transcript text.',
      'priv.f4': 'There is no Appunto server. No analytics, no tracking.',
      'priv.more': 'Read what leaves and what does not',
      'pick.eyebrow': 'Download', 'pick.h1': 'Pick your platform.', 'pick.h2': 'Press start.', 'pick.label': 'Platform',
      'pick.mac-arm': 'Apple chip (M1 and newer)', 'pick.mac-intel': 'Intel chip',
      'pick.hint.mac-arm': 'First launch: System Settings → Privacy & Security → Open Anyway. Only once, promise.',
      'pick.hint.mac-intel': 'Not sure which Mac you have? Apple menu → About This Mac → look at Chip.',
      'pick.hint.windows': 'Not code-signed yet: if Windows warns you, choose More info → Run anyway.',
      'pick.hint.linux': '.deb for Ubuntu and Debian, .rpm for Fedora and openSUSE, .AppImage for everything else.',
      'pick.cta.mac-arm': 'Download for Mac', 'pick.cta.mac-intel': 'Download for Mac', 'pick.cta.windows': 'Download for Windows', 'pick.cta.linux': 'Download for Linux',
      'pick.consent': 'Recording other people may need their consent where you live. Tell participants when you record.',
      'dl.h': 'Download Appunto', 'dl.lead': 'One file, installed like any other app. On first start Appunto downloads its speech model once (about 574 MB).',
      'dl.loading': 'Looking for the latest version…', 'dl.version': 'Version {v}, {d}', 'dl.error': 'Could not load the file list.', 'dl.open': 'Open the latest release on GitHub',
      'dl.you': 'Your computer',
      'dl.mac.arm': 'Mac with Apple chip', 'dl.mac.arm.s': 'M1, M2, M3, M4…', 'dl.mac.intel': 'Mac with Intel chip', 'dl.mac.hint': 'Which Mac do you have? Apple menu, About This Mac, Chip.',
      'dl.win.exe': 'Installer', 'dl.win.msi': 'MSI package', 'dl.win.msi.s': 'For managed computers',
      'dl.deb': 'Ubuntu, Debian, Linux Mint', 'dl.rpm': 'Fedora, openSUSE', 'dl.appimage': 'Other distributions',
      'dl.install.h': 'Install and open',
      'dl.i.mac.1': 'Open the .dmg file and drag Appunto onto the Applications folder.',
      'dl.i.mac.2': 'The first time, macOS says it cannot verify the app (it is not signed with a paid Apple certificate yet): click Done, then open System Settings, Privacy & Security, scroll down and click Open Anyway next to Appunto. You only do this once.',
      'dl.i.win.1': 'Open the -setup.exe file.',
      'dl.i.win.2': 'If Windows shows "Windows protected your PC", click More info, then Run anyway (the app is not code-signed yet).',
      'dl.i.linux.1': '.deb or .rpm: open it and click Install in the Software app.',
      'dl.i.linux.2': '.AppImage: right-click, Properties, Permissions, tick "Allow executing file as program", then open it.',
      'dl.guide': 'First start, permissions and tips in the guide',
      'foot.contact': 'Contact',
    },
  };

  // ------------------------------------------------------------ language

  function storedLang() {
    try {
      const v = localStorage.getItem(STORE_KEY);
      return v === 'en' || v === 'it' ? v : null;
    } catch (e) {
      return null;
    }
  }

  const bilingual = document.documentElement.hasAttribute('data-i18n-page');
  let lang = bilingual ? storedLang() || 'it' : 'en';

  function t(key) {
    return (T[lang] && T[lang][key]) || T.it[key] || key;
  }

  function applyLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-label]').forEach((el) => {
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-label')));
    });
    const page = document.documentElement.getAttribute('data-i18n-page');
    if (page) {
      document.title = t('meta.' + page + '.title');
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute('content', t('meta.' + page + '.desc'));
    }
    document.querySelectorAll('.lang button').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang));
    });
    labelOsCta();
    renderQuests();
    renderPicker();
    renderStatus();
  }

  document.querySelectorAll('.lang button').forEach((b) => {
    b.addEventListener('click', () => {
      const next = b.getAttribute('data-lang');
      if (next !== 'it' && next !== 'en') return;
      lang = next;
      try {
        localStorage.setItem(STORE_KEY, lang);
      } catch (e) {
        // Private mode: the choice lasts for this page only.
      }
      applyLang();
    });
  });

  // ------------------------------------------------------------ operating system

  const ua = navigator.userAgent;
  const os = /Mac/i.test(ua) && !/iPhone|iPad/i.test(ua) ? 'mac' : /Win/i.test(ua) ? 'windows' : /Linux|X11/i.test(ua) && !/Android/i.test(ua) ? 'linux' : null;

  function labelOsCta() {
    document.querySelectorAll('[data-os-cta]').forEach((el) => {
      el.textContent = t(os ? 'hero.cta.' + os : 'hero.cta');
    });
  }

  // ------------------------------------------------------------ recording timer in the hero window

  const timer = document.querySelector('[data-timer]');
  if (timer && !reduceMotion) {
    let s = 42 * 60 + 17;
    setInterval(() => {
      s++;
      const mm = String(Math.floor(s / 60) % 60).padStart(2, '0');
      const ss = String(s % 60).padStart(2, '0');
      timer.textContent = String(Math.floor(s / 3600)).padStart(2, '0') + ':' + mm + ':' + ss;
    }, 1000);
  }

  // ------------------------------------------------------------ quest log: tick to-dos, fill the XP bar

  const board = document.querySelector('[data-quests]');
  const quests = board ? Array.from(board.querySelectorAll('.quest')) : [];

  function renderQuests() {
    if (!board) return;
    const done = quests.filter((q) => q.getAttribute('aria-pressed') === 'true').length;
    const xp = Math.round((done / quests.length) * 100);
    board.querySelector('[data-quest-xp]').textContent = String(xp);
    board.querySelector('.xp-fill').style.width = xp + '%';
    board.querySelector('[role="progressbar"]').setAttribute('aria-valuenow', String(xp));
    board.querySelector('[data-quest-rank]').textContent = t('rank.' + done);
    const allDone = done === quests.length;
    const hint = board.querySelector('[data-quest-hint]');
    hint.hidden = allDone;
    hint.textContent = t('hint.' + done);
    board.querySelector('[data-quest-done]').hidden = !allDone;
  }

  quests.forEach((q) => {
    q.addEventListener('click', () => {
      q.setAttribute('aria-pressed', String(q.getAttribute('aria-pressed') !== 'true'));
      renderQuests();
    });
  });
  const reset = board && board.querySelector('[data-quest-reset]');
  if (reset) {
    reset.addEventListener('click', () => {
      quests.forEach((q) => q.setAttribute('aria-pressed', 'false'));
      renderQuests();
      quests[0].focus();
    });
  }

  // ------------------------------------------------------------ platform picker on the home page

  const picker = document.querySelector('[data-picker]');
  const tabs = picker ? Array.from(picker.querySelectorAll('[data-platform]')) : [];
  let platform = os === 'windows' ? 'windows' : os === 'linux' ? 'linux' : 'mac-arm';

  function renderPicker() {
    if (!picker) return;
    tabs.forEach((b) => b.setAttribute('aria-pressed', String(b.getAttribute('data-platform') === platform)));
    picker.querySelector('[data-pick-hint]').textContent = t('pick.hint.' + platform);
    picker.querySelector('[data-pick-cta]').textContent = t('pick.cta.' + platform);
  }

  tabs.forEach((b) => {
    b.addEventListener('click', () => {
      platform = b.getAttribute('data-platform');
      renderPicker();
    });
  });

  // ------------------------------------------------------------ download page

  const MATCHERS = {
    'mac-arm': /_aarch64\.dmg$/,
    'mac-intel': /_x64\.dmg$/,
    'win-exe': /_x64-setup\.exe$/,
    'win-msi': /_x64_en-US\.msi$/,
    'deb-x64': /_amd64\.deb$/,
    'deb-arm': /_arm64\.deb$/,
    'rpm-x64': /\.x86_64\.rpm$/,
    'rpm-arm': /\.aarch64\.rpm$/,
    'appimage-x64': /_amd64\.AppImage$/,
    'appimage-arm': /_aarch64\.AppImage$/,
  };
  const status = document.querySelector('[data-release-status]');
  let release = null;
  let releaseFailed = false;

  function renderStatus() {
    if (!status) return;
    status.classList.remove('ok', 'err');
    if (releaseFailed) {
      status.classList.add('err');
      status.textContent = t('dl.error') + ' ';
      const a = document.createElement('a');
      a.href = RELEASES;
      a.textContent = t('dl.open');
      status.append(a);
    } else if (release) {
      status.classList.add('ok');
      const date = new Date(release.published_at).toLocaleDateString(lang === 'it' ? 'it-IT' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
      status.textContent = t('dl.version').replace('{v}', String(release.tag_name || '').replace(/^v/, '')).replace('{d}', date);
    } else {
      status.textContent = t('dl.loading');
    }
  }

  if (status) {
    const mine = os && document.querySelector('[data-os="' + os + '"]');
    if (mine) {
      mine.classList.add('recommended');
      const you = mine.querySelector('.you');
      if (you) you.hidden = false;
      mine.parentNode.insertBefore(mine, mine.parentNode.firstElementChild);
    }
    fetch(API, { headers: { Accept: 'application/vnd.github+json' } })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('HTTP ' + r.status))))
      .then((data) => {
        const assets = Array.isArray(data.assets) ? data.assets : [];
        let found = 0;
        Object.entries(MATCHERS).forEach(([key, re]) => {
          const asset = assets.find((a) => typeof a.name === 'string' && re.test(a.name));
          const url = asset ? String(asset.browser_download_url || '') : '';
          const link = document.querySelector('[data-asset="' + key + '"]');
          if (!link || !url.startsWith('https://github.com/')) return;
          link.href = url;
          link.removeAttribute('aria-disabled');
          const size = link.querySelector('.size');
          if (size) size.textContent = Math.round(asset.size / 1e6) + ' MB';
          found++;
        });
        if (found) release = data;
        else releaseFailed = true;
        renderStatus();
      })
      .catch(() => {
        releaseFailed = true;
        renderStatus();
      });
  }

  applyLang();
})();
