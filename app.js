/**
 * Daily Schedule — Semester I
 * Built with xAI Design System & Phosphor Icons
 * GitHub Content Sync & LocalStorage Storage Engine
 */

// =============================================================================
// 1. Core Schedule Data (5-Day Week: Mon – Fri)
// =============================================================================

const SCHEDULE_DATA = {
  1: { // Monday
    name: 'Monday',
    short: 'MON',
    classes: [
      {
        code: 'Arch 2351',
        title: 'Model Making Workshop',
        timeStr: '8:30 AM – 12:30 PM',
        periods: 'Periods 1–4',
        room: 'G block - Workshop',
        instructor: 'TBA',
        startHour: 8,
        startMin: 30,
        endHour: 12,
        endMin: 30
      },
      {
        code: 'Arch 2541',
        title: 'Theory & Design of Structures I',
        timeStr: '1:30 PM – 5:30 PM',
        periods: 'Periods 5–8',
        room: 'Room E06A',
        instructor: 'Henok Mulat',
        startHour: 13,
        startMin: 30,
        endHour: 17,
        endMin: 30
      }
    ]
  },
  2: { // Tuesday
    name: 'Tuesday',
    short: 'TUE',
    classes: [
      {
        code: 'Arch 2411',
        title: 'Basic Design I',
        timeStr: '8:30 AM – 4:30 PM',
        periods: 'Periods 1–7',
        room: 'Room E06A',
        instructor: 'Keniko Duguma & Estifanos Habtamu',
        startHour: 8,
        startMin: 30,
        endHour: 16,
        endMin: 30
      }
    ]
  },
  3: { // Wednesday
    name: 'Wednesday',
    short: 'WED',
    classes: [] // Free Day!
  },
  4: { // Thursday
    name: 'Thursday',
    short: 'THU',
    classes: [
      {
        code: 'Arch 2311',
        title: 'Communication Skills I',
        timeStr: '8:30 AM – 5:30 PM',
        periods: 'Periods 1–8',
        room: 'G block - Workshop',
        instructor: 'Eyoab Equbay',
        startHour: 8,
        startMin: 30,
        endHour: 17,
        endMin: 30
      }
    ]
  },
  5: { // Friday
    name: 'Friday',
    short: 'FRI',
    classes: [
      {
        code: 'Arch 2511',
        title: 'Building Materials & Construction I',
        timeStr: '8:30 AM – 12:30 PM',
        periods: 'Periods 1–4',
        room: 'Room E06A',
        instructor: 'Miraf Abuye',
        startHour: 8,
        startMin: 30,
        endHour: 12,
        endMin: 30
      },
      {
        code: 'Arch 2211',
        title: 'History of Architecture I',
        timeStr: '1:30 PM – 5:30 PM',
        periods: 'Periods 5–8',
        room: 'Room E107',
        instructor: 'Sebona Hailu',
        startHour: 13,
        startMin: 30,
        endHour: 17,
        endMin: 30
      }
    ]
  }
};

const COURSE_OPTIONS = [
  { code: null, name: 'Personal / General', subtitle: 'General task or errand' },
  { code: 'Arch 2411', name: 'Arch 2411', subtitle: 'Basic Design I' },
  { code: 'Arch 2351', name: 'Arch 2351', subtitle: 'Model Making Workshop' },
  { code: 'Arch 2541', name: 'Arch 2541', subtitle: 'Theory & Design of Structures I' },
  { code: 'Arch 2311', name: 'Arch 2311', subtitle: 'Communication Skills I' },
  { code: 'Arch 2511', name: 'Arch 2511', subtitle: 'Building Materials & Construction I' },
  { code: 'Arch 2211', name: 'Arch 2211', subtitle: 'History of Architecture I' }
];

// =============================================================================
// 2. Ge'ez Numeral Helper
// =============================================================================

function toGeez(num) {
  if (num < 1) return '';
  const digits = ['', '፩', '፪', '፫', '፬', '፭', '፮', '፯', '፰', '፱'];
  const tens = ['', '፲', '፳', '፴', '፵', '፶', '፷', '፸', '፹', '፺'];

  if (num <= 9) return digits[num];
  if (num === 10) return '፲';
  if (num < 20) return '፲' + digits[num - 10];
  if (num < 100) {
    const t = Math.floor(num / 10);
    const r = num % 10;
    return tens[t] + (r > 0 ? digits[r] : '');
  }
  return num.toString();
}

// =============================================================================
// 3. Fallback Data (Synced & Overridden by content.json)
// =============================================================================

let appQuotes = [
  {
    quote: "Good morning, my fiker. Walk into the studio today with your head held high. You have the brilliant mind of an architect and the gentlest heart, and I believe in you with everything I have.",
    author: "Always Adonay"
  },
  {
    quote: "Fiker, whenever studio feels overwhelming or the crits feel harsh, take a slow breath. Your worth and your talent are so much bigger than one review. I am standing right behind you, always.",
    author: "Forever in Your Corner, Adonay"
  },
  {
    quote: "Don't rush the process, fiker. Great architecture is built line by line, layer by layer, and cut by cut. You are growing into someone extraordinary, and I love you endlessly.",
    author: "With All My Love, Adonay"
  },
  {
    quote: "Remember to drink some water, unclench your jaw, and rest your hands, fiker. Seeing how passionately you pour yourself into your dreams inspires me every single day.",
    author: "Thinking of You Always, Adonay"
  },
  {
    quote: "To my dearest fiker: even when foam board, chipboard, and glue get messy and the hours stretch long into the night, your smile is still my whole universe. You've got this today!",
    author: "Yours, Adonay"
  },
  {
    quote: "Fiker, whenever self-doubt whispers in your ear, remember that I see your brilliance even when you temporarily lose sight of it. Keep designing, my love.",
    author: "Believing in You Forever, Adonay"
  },
  {
    quote: "Every master architect started exactly where you are sitting right now, fiker — with a blank sheet of trace paper and an idea. Trust your creative voice today.",
    author: "Always Adonay"
  },
  {
    quote: "Fiker, never forget why you fell in love with architecture. The world is waiting for the spaces, light, and beauty you are going to create. I am loving you every step of the way.",
    author: "Always by Your Side, Adonay"
  },
  {
    quote: "You have this quiet strength, fiker, that always finds a way forward no matter how complex the project gets. Go show them what you are made of!",
    author: "Cheering for You Loudly, Adonay"
  },
  {
    quote: "Fiker, you don't need to have every single floor plan and detail solved all at once. Just win this hour and this drawing. You are doing so much better than you realize.",
    author: "Gentle Reminder from Adonay"
  },
  {
    quote: "No matter how demanding this semester gets, fiker, my love for you is constant, steady, and unconditional. Come home proud of yourself today.",
    author: "With All My Heart, Adonay"
  },
  {
    quote: "My sweet fiker, take pride in how far you have come from your first line drawing. Every challenge you face in the studio is molding you into a visionary.",
    author: "Endlessly Proud of You, Adonay"
  },
  {
    quote: "Fiker, your sketches have soul and your models have care. Never lose that human touch that makes your work so special. I love you to the moon and back.",
    author: "Your Adonay"
  },
  {
    quote: "May your mind stay sharp, your hand stay steady, and your heart stay peaceful today, fiker. You are deeply loved every single second.",
    author: "Forever Adonay"
  },
  {
    quote: "By wisdom a house is built, and through understanding it is established; through knowledge its rooms are filled with rare and beautiful treasures.",
    author: "Proverbs 24:3–4"
  },
  {
    quote: "I can do all things through Christ who strengthens me.",
    author: "Philippians 4:13"
  },
  {
    quote: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways acknowledge Him, and He will make your paths straight.",
    author: "Proverbs 3:5–6"
  },
  {
    quote: "May the favor of the Lord our God rest on us; establish the work of our hands for us — yes, establish the work of our hands.",
    author: "Psalm 90:17"
  },
  {
    quote: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
    author: "Jeremiah 29:11"
  },
  {
    quote: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
    author: "Joshua 1:9"
  },
  {
    quote: "Whatever you do, work at it with all your heart, as working for the Lord and not for human masters.",
    author: "Colossians 3:23"
  },
  {
    quote: "He gives strength to the weary and increases the power of the weak... those who hope in the Lord will renew their strength. They will soar on wings like eagles.",
    author: "Isaiah 40:29, 31"
  },
  {
    quote: "According to the grace of God given to me, like a skilled master builder I laid a foundation, and someone else is building on it. But each one should build with care.",
    author: "1 Corinthians 3:10"
  },
  {
    quote: "Therefore everyone who hears these words of mine and puts them into practice is like a wise builder who built their house on the rock.",
    author: "Matthew 7:24"
  },
  {
    quote: "Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up.",
    author: "Galatians 6:9"
  },
  {
    quote: "For God gave us a spirit not of fear, but of power, love, and self-discipline.",
    author: "2 Timothy 1:7"
  },
  {
    quote: "Unless the Lord builds the house, the builders labor in vain. The Lord watches over your going out and your coming in from this time forth and forevermore.",
    author: "Psalm 127:1 & 121:8"
  },
  {
    quote: "Commit your work to the Lord, and your plans will be established.",
    author: "Proverbs 16:3"
  },
  {
    quote: "There are 360 degrees, so why stick to one? Architecture is really about well-being. I think that people want to feel good in a space.",
    author: "Zaha Hadid"
  },
  {
    quote: "A great building must begin with the unmeasurable, must go through measurable means when it is being designed, and in the end must be unmeasurable.",
    author: "Louis Kahn"
  },
  {
    quote: "The mother art is architecture. Without an architecture of our own, we have no soul of our own civilization.",
    author: "Frank Lloyd Wright"
  },
  {
    quote: "Study nature, love nature, stay close to nature. It will never fail you.",
    author: "Frank Lloyd Wright"
  },
  {
    quote: "Architecture starts when you carefully put two bricks together. There it begins.",
    author: "Ludwig Mies van der Rohe"
  },
  {
    quote: "God is in the details.",
    author: "Ludwig Mies van der Rohe"
  },
  {
    quote: "Architecture is art, but art very much contaminated by many other things: by society, by science, by physics, by the poetry of light.",
    author: "Renzo Piano"
  },
  {
    quote: "I believe that architecture should be about creating places where people feel alive and connected to nature.",
    author: "Tadao Ando"
  },
  {
    quote: "You cannot simply put something new into a place; you have to absorb what exists around you, on the land, and then use that knowledge with contemporary thinking.",
    author: "Tadao Ando"
  },
  {
    quote: "Architecture is the learned game, correct and magnificent, of forms assembled in the light.",
    author: "Le Corbusier"
  },
  {
    quote: "To fly, you have to be willing to give up the ground. Architecture is about that leap of imagination into a new way of seeing.",
    author: "Maya Lin"
  },
  {
    quote: "Those who look for the laws of Nature as a support for their new works collaborate with the Creator.",
    author: "Antoni Gaudí"
  },
  {
    quote: "Limitation makes the creative mind inventive.",
    author: "Walter Gropius (Bauhaus)"
  },
  {
    quote: "Design is nothing but a humble understanding of materials, light, and the human spirit.",
    author: "Balkrishna Doshi (Pritzker Laureate)"
  },
  {
    quote: "As an architect you design for the present, with an awareness of the past, for a future which is essentially unknown.",
    author: "Norman Foster"
  },
  {
    quote: "Architecture is about trying to make the world a little more like our dreams.",
    author: "Bjarke Ingels (BIG)"
  },
  {
    quote: "Linear time is a Western invention; time is not linear, it is a marvelous entanglement where at any moment points can be chosen and invented without beginning or end.",
    author: "Lina Bo Bardi"
  }
];

let appAssignments = [];

let appCheerMessages = [
  {
    title: "Mid-Week Recharge, Fiker",
    text: "Today is completely free from classes. Put down the cutter and the scale ruler, fiker. Make a warm cup of coffee, relax your hands, and breathe. You worked so hard this week, and you truly deserve this rest."
  },
  {
    title: "Time Just for My Architect",
    text: "No studio reviews, no rushing across campus today. Just quiet time for my favorite person in the world. I am thinking of you all day, fiker, and sending you the warmest hugs."
  },
  {
    title: "Rest Is Part of the Design",
    text: "Even the greatest buildings need spaces between them to breathe, fiker. Rest is not wasted time — it's where your creativity recharges. I love you and I am endlessly proud of you."
  },
  {
    title: "A Gentle Whisper for Fiker",
    text: "You are doing so wonderfully, my fiker. Don't worry about next week's juries or deadlines today. Let your mind wander freely and remember how deeply and fiercely you are loved."
  },
  {
    title: "Peace in the Midst of the Semester",
    text: "Take today slow, fiker. The semester moves fast, but today belongs to you. May your heart feel peaceful knowing that you always have a home in my love."
  }
];

// =============================================================================
// 4. LocalStorage Helpers
// =============================================================================

const STORAGE_KEYS = {
  TASK_STATUS: 'arch_task_status',
  LOCAL_TASKS: 'arch_local_tasks',
  CLASS_NOTES: 'arch_class_notes'
};

function getStorage(key, defaultVal) {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : defaultVal;
  } catch (e) {
    return defaultVal;
  }
}

function setStorage(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error('Storage error:', e);
  }
}

// =============================================================================
// 5. State Management
// =============================================================================

let selectedDate = new Date();
if (selectedDate.getDay() === 0 || selectedDate.getDay() === 6) {
  const day = selectedDate.getDay();
  const diff = (day === 0 ? 1 : 2); // Jump to Monday
  selectedDate.setDate(selectedDate.getDate() + diff);
}

let currentCourse = null;
let sliderMode = 'task'; // 'task' | 'note'
let currentSliderStep = 0; // 0 (course), 1 (text), 2 (due - tasks only)
let selectedCourseCode = null; // null for personal/general, or 'Arch 2411'
let selectedDueOption = 'Next Class';

// =============================================================================
// 6. DOM References
// =============================================================================

// Views
const homeView = document.getElementById('home-view');
const courseView = document.getElementById('course-view');

// Header & Quote
const quoteCard = document.getElementById('quote-card');
const quotePreview = document.getElementById('quote-preview');
const quoteModal = document.getElementById('quote-modal');
const modalQuoteText = document.getElementById('modal-quote-text');
const modalQuoteAuthor = document.getElementById('modal-quote-author');
const modalCloseBtn = document.getElementById('modal-close-btn');

// Day Hero Card
const heroDayCard = document.getElementById('hero-day-card');
const numEnglish = document.getElementById('num-english');
const numGeez = document.getElementById('num-geez');
const dayFullDate = document.getElementById('day-full-date');
const todayBtn = document.getElementById('today-btn');
const tasksBtn = document.getElementById('tasks-btn');

// Week Strip & Timeline
const weekStripContainer = document.getElementById('week-strip-container');
const weekRangeText = document.getElementById('week-range-text');
const timelineDayTitle = document.getElementById('timeline-day-title');
const timelineDayStatus = document.getElementById('timeline-day-status');
const timelineContainer = document.getElementById('timeline-container');

// Course Detailed Page
const courseBackBtn = document.getElementById('course-back-btn');
const courseViewCode = document.getElementById('course-view-code');
const courseViewTitle = document.getElementById('course-view-title');
const courseViewMeta = document.getElementById('course-view-meta');
const courseTaskCount = document.getElementById('course-task-count');
const courseAddTaskForm = document.getElementById('course-add-task-form');
const courseNewTaskInput = document.getElementById('course-new-task-input');
const courseTasksList = document.getElementById('course-tasks-list');
const courseNotesTextarea = document.getElementById('course-notes-textarea');
const courseNotesHint = document.getElementById('course-notes-hint');

// Floating Action Button (FAB)
const mainFab = document.getElementById('main-fab');
const fabMenu = document.getElementById('fab-menu');
const fabAddTask = document.getElementById('fab-add-task');
const fabAddNote = document.getElementById('fab-add-note');
const fabViewTasks = document.getElementById('fab-view-tasks');
const fabQuote = document.getElementById('fab-quote');

// Cheer Modal
const cheerModal = document.getElementById('cheer-modal');
const cheerTitle = document.getElementById('cheer-title');
const cheerText = document.getElementById('cheer-text');
const cheerCloseBtn = document.getElementById('cheer-close-btn');

// All Tasks Modal
const tasksModal = document.getElementById('tasks-modal');
const tasksCloseBtn = document.getElementById('tasks-close-btn');
const tasksList = document.getElementById('tasks-list');
const addTaskForm = document.getElementById('add-task-form');
const newTaskInput = document.getElementById('new-task-input');

// Multi-Step Slider Modal (Tasks & Notes)
const sliderModal = document.getElementById('slider-modal');
const sliderCloseBtn = document.getElementById('slider-close-btn');
const sliderModeTag = document.getElementById('slider-mode-tag');
const sliderStepIndicator = document.getElementById('slider-step-indicator');
const sliderProgressBar = document.getElementById('slider-progress-bar');
const sliderTrack = document.getElementById('slider-track');

// Slide 1 (Course)
const slideCourseTitle = document.getElementById('slide-course-title');
const slideCourseSubtitle = document.getElementById('slide-course-subtitle');
const sliderCourseList = document.getElementById('slider-course-list');
const sliderCancelBtn = document.getElementById('slider-cancel-btn');
const sliderToStep2 = document.getElementById('slider-to-step2');

// Slide 2 (Text)
const slideTextTitle = document.getElementById('slide-text-title');
const slideSelectedCourseLabel = document.getElementById('slide-selected-course-label');
const sliderTextInput = document.getElementById('slider-text-input');
const sliderBackTo1 = document.getElementById('slider-back-to-1');
const sliderToStep3 = document.getElementById('slider-to-step3');
const sliderSaveNoteBtn = document.getElementById('slider-save-note-btn');

// Slide 3 (Due & Summary)
const sliderDueOptions = document.getElementById('slider-due-options');
const sliderCustomDate = document.getElementById('slider-custom-date');
const summaryCourse = document.getElementById('summary-course');
const summaryTask = document.getElementById('summary-task');
const summaryDue = document.getElementById('summary-due');
const sliderBackTo2 = document.getElementById('slider-back-to-2');
const sliderSaveTaskBtn = document.getElementById('slider-save-task-btn');

// =============================================================================
// 7. GitHub Content Sync (content.json)
// =============================================================================

async function syncRemoteContent() {
  try {
    const res = await fetch('./content.json?v=' + Date.now());
    if (!res.ok) throw new Error('Network error');
    const data = await res.json();
    
    if (data.quotes && Array.isArray(data.quotes) && data.quotes.length > 0) {
      appQuotes = data.quotes;
    }
    if (data.assignments && Array.isArray(data.assignments)) {
      appAssignments = data.assignments;
    }
    if (data.cheer_messages && Array.isArray(data.cheer_messages) && data.cheer_messages.length > 0) {
      appCheerMessages = data.cheer_messages;
    }

    setupDailyQuote();
    renderTasksList();
    if (currentCourse) {
      renderCourseTasks(currentCourse.code);
    }
  } catch (err) {
    console.log('Using offline cached content:', err);
  }
}

// =============================================================================
// 8. Daily Quote Flow
// =============================================================================

let currentModalQuoteIndex = 0;

function displayQuoteInModal(quoteObj) {
  modalQuoteText.textContent = `"${quoteObj.quote}"`;
  modalQuoteAuthor.textContent = `— ${quoteObj.author}`;
}

const quoteShuffleBtn = document.getElementById('quote-shuffle-btn');
if (quoteShuffleBtn) {
  quoteShuffleBtn.onclick = (e) => {
    e.stopPropagation();
    if (appQuotes.length <= 1) return;
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * appQuotes.length);
    } while (nextIndex === currentModalQuoteIndex);
    currentModalQuoteIndex = nextIndex;
    displayQuoteInModal(appQuotes[currentModalQuoteIndex]);
  };
}

function setupDailyQuote() {
  const dayIndex = selectedDate.getDate() % appQuotes.length;
  const currentQuote = appQuotes[dayIndex];

  // Truncate on main screen ending with "the quote...."
  const words = currentQuote.quote.split(' ');
  if (words.length > 9) {
    quotePreview.textContent = words.slice(0, 9).join(' ') + '....';
  } else {
    quotePreview.textContent = currentQuote.quote;
  }

  quoteCard.onclick = () => {
    currentModalQuoteIndex = dayIndex;
    displayQuoteInModal(currentQuote);
    quoteModal.classList.remove('hidden');
  };
}

modalCloseBtn.onclick = () => {
  quoteModal.classList.add('hidden');
};

quoteModal.onclick = (e) => {
  if (e.target === quoteModal) {
    quoteModal.classList.add('hidden');
  }
};

// =============================================================================
// 9. Day Hero Card (English | Ge'ez Numeral)
// =============================================================================

function updateHeroDay() {
  const dayOfWeek = selectedDate.getDay();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const gDay = selectedDate.getDate();
  const gMonth = monthNames[selectedDate.getMonth()];
  const gDayName = dayNames[dayOfWeek];

  // Display English number and Ge'ez numeral side-by-side with "|" divider
  numEnglish.textContent = gDay;
  numGeez.textContent = toGeez(gDay);
  dayFullDate.textContent = `${gDayName}, ${gMonth} ${gDay}`;

  const numeralWrapper = document.getElementById('day-numeral');
  numeralWrapper.style.transform = 'scale(0.94)';
  setTimeout(() => {
    numeralWrapper.style.transform = 'scale(1)';
  }, 40);
}

// =============================================================================
// 10. 5-Day Week Strip (MON, TUE, WED, THU, FRI)
// =============================================================================

function renderWeekStrip() {
  weekStripContainer.innerHTML = '';

  const tempDate = new Date(selectedDate);
  const currentDay = tempDate.getDay();
  const diffToMonday = (currentDay === 0 ? -6 : 1) - currentDay;
  const monday = new Date(tempDate);
  monday.setDate(tempDate.getDate() + diffToMonday);

  const dayLetters = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
  const realToday = new Date();

  const isSameDay = (d1, d2) => 
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  for (let i = 0; i < 5; i++) {
    const dayDate = new Date(monday);
    dayDate.setDate(monday.getDate() + i);

    const card = document.createElement('div');
    card.className = 'day-card';

    if (isSameDay(dayDate, selectedDate)) {
      card.classList.add('active');
    }
    if (isSameDay(dayDate, realToday)) {
      card.classList.add('today');
    }

    card.innerHTML = `
      <div class="day-card-header">${dayLetters[i]}</div>
      <div class="day-card-body">
        <span class="day-card-num">${dayDate.getDate()}</span>
      </div>
    `;

    card.onclick = () => {
      selectedDate = new Date(dayDate);
      renderWeekStrip();
      updateHeroDay();
      renderTimeline();
      setupDailyQuote();
    };

    weekStripContainer.appendChild(card);
  }

  const friday = new Date(monday);
  friday.setDate(monday.getDate() + 4);
  const m1 = monday.toLocaleString('default', { month: 'short' });
  const m2 = friday.toLocaleString('default', { month: 'short' });
  weekRangeText.textContent = `${m1} ${monday.getDate()} – ${m2} ${friday.getDate()}`;
}

// =============================================================================
// 11. Timeline & Free Day Rendering
// =============================================================================

function renderTimeline() {
  timelineContainer.innerHTML = '';
  const dayOfWeek = selectedDate.getDay();
  const daySchedule = SCHEDULE_DATA[dayOfWeek];
  const realNow = new Date();

  const isToday = (
    selectedDate.getFullYear() === realNow.getFullYear() &&
    selectedDate.getMonth() === realNow.getMonth() &&
    selectedDate.getDate() === realNow.getDate()
  );

  timelineDayTitle.textContent = isToday ? 'Today' : `${daySchedule ? daySchedule.name : "Day"}'s Schedule`;

  if (!daySchedule || daySchedule.classes.length === 0) {
    timelineDayStatus.textContent = 'Zero Classes Scheduled';

    const freeCard = document.createElement('div');
    freeCard.className = 'free-day-card';
    freeCard.innerHTML = `
      <div class="free-day-badge">
        <i class="ph ph-sparkle"></i> NO CLASSES TODAY
      </div>
      <div class="free-day-title">Enjoy Your Day Off</div>
      <p class="free-day-desc">
        Your schedule is completely clear today. Sleep in, take your time, and enjoy a restful day for yourself.
      </p>
      <button class="free-day-btn" id="cheer-btn">
        <i class="ph ph-heart"></i> Read a sweet note
      </button>
    `;

    timelineContainer.appendChild(freeCard);

    document.getElementById('cheer-btn').onclick = () => {
      const cheer = appCheerMessages[Math.floor(Math.random() * appCheerMessages.length)];
      cheerTitle.textContent = cheer.title;
      cheerText.textContent = cheer.text;
      cheerModal.classList.remove('hidden');
    };

    return;
  }

  const classes = daySchedule.classes;
  const count = classes.length;
  timelineDayStatus.textContent = `${count} ${count === 1 ? 'Class' : 'Classes'} Scheduled • Tap for details`;

  const currentTotalMins = realNow.getHours() * 60 + realNow.getMinutes();

  classes.forEach((cls) => {
    const item = document.createElement('div');
    item.className = 'timeline-item';

    const startTotalMins = cls.startHour * 60 + cls.startMin;
    const endTotalMins = cls.endHour * 60 + cls.endMin;
    const isNow = isToday && (currentTotalMins >= startTotalMins && currentTotalMins <= endTotalMins);

    if (isNow) {
      item.classList.add('active-now');
    }

    const courseSlug = cls.code.replace(/\s+/g, '-').toLowerCase();
    item.innerHTML = `
      <div class="class-card ${isNow ? 'current' : ''}" data-course="${courseSlug}" role="button" tabindex="0">
        <div class="class-top-row">
          <span class="class-time">
            <i class="ph ph-clock"></i> ${cls.timeStr}
          </span>
          <span class="class-periods-tag">${cls.periods}</span>
        </div>
        
        <h3 class="class-title">${cls.title}</h3>
        
        <div class="class-meta-row">
          <span class="meta-item">
            <span class="meta-code">${cls.code}</span>
          </span>
          <span class="meta-item">
            <i class="ph ph-map-pin"></i> <span>${cls.room}</span>
          </span>
          <span class="meta-item">
            <i class="ph ph-user"></i> <span>${cls.instructor}</span>
          </span>
        </div>

        <div class="class-details-row">
          <span>Semester I</span>
          <span style="color:var(--text-secondary);"><i class="ph ph-notepad"></i> Open Details ↗</span>
        </div>
      </div>
    `;

    // Tap class card to open the dedicated Course Detailed Page View
    item.querySelector('.class-card').onclick = () => {
      openCoursePage(cls);
    };

    timelineContainer.appendChild(item);
  });
}

// =============================================================================
// 12. Course Detailed Page Flow (Dedicated Screen with Back Button)
// =============================================================================

function openCoursePage(cls) {
  currentCourse = cls;
  courseViewCode.textContent = cls.code;
  courseViewTitle.textContent = cls.title;

  courseViewMeta.innerHTML = `
    <div><i class="ph ph-clock"></i> ${cls.timeStr} (${cls.periods})</div>
    <div><i class="ph ph-map-pin"></i> ${cls.room}</div>
    <div><i class="ph ph-user"></i> ${cls.instructor}</div>
  `;

  // Render course-specific tasks
  renderCourseTasks(cls.code);

  // Load and auto-save personal class notes
  const notesMap = getStorage(STORAGE_KEYS.CLASS_NOTES, {});
  courseNotesTextarea.value = notesMap[cls.code] || '';
  courseNotesHint.textContent = notesMap[cls.code] ? 'Saved' : 'Auto-saves as you type';

  courseNotesTextarea.oninput = () => {
    notesMap[cls.code] = courseNotesTextarea.value;
    setStorage(STORAGE_KEYS.CLASS_NOTES, notesMap);
    courseNotesHint.textContent = 'Saved';
  };

  // Update FAB context for this course
  updateFABContext();

  // Switch views
  homeView.classList.add('hidden');
  courseView.classList.remove('hidden');
  window.scrollTo(0, 0);

  // Update URL hash for native back button support
  window.location.hash = 'course-' + cls.code.replace(/\s+/g, '-');
}

function closeCoursePage() {
  courseView.classList.add('hidden');
  homeView.classList.remove('hidden');
  currentCourse = null;
  updateFABContext();

  if (window.location.hash) {
    history.replaceState(null, null, ' ');
  }
}

courseBackBtn.onclick = () => {
  closeCoursePage();
};

function renderCourseTasks(courseCode) {
  const taskStatus = getStorage(STORAGE_KEYS.TASK_STATUS, {});
  const localTasks = getStorage(STORAGE_KEYS.LOCAL_TASKS, []);
  const allTasks = [...appAssignments, ...localTasks];
  const courseTasks = allTasks.filter(t => t.courseCode === courseCode);

  const pendingCount = courseTasks.filter(t => !taskStatus[t.id]).length;
  courseTaskCount.textContent = `${pendingCount} Pending`;

  courseTasksList.innerHTML = '';
  if (courseTasks.length === 0) {
    courseTasksList.innerHTML = '<span style="font-size:0.8rem; color:var(--text-muted); padding:4px 0;">No tasks scheduled for this course. Add one below!</span>';
    return;
  }

  courseTasks.forEach(task => {
    const isDone = !!taskStatus[task.id];
    const isLocal = !!task.isLocal;
    const div = document.createElement('div');
    div.className = `task-item ${isDone ? 'completed' : ''}`;
    div.innerHTML = `
      <input type="checkbox" class="task-checkbox" ${isDone ? 'checked' : ''}>
      <div class="task-content">
        <div class="task-title">${task.title}</div>
        ${task.description ? `<p class="task-desc">${task.description}</p>` : ''}
        ${task.dueDate ? `<div class="task-due"><i class="ph ph-calendar"></i> Due ${task.dueDate}</div>` : ''}
      </div>
      ${isLocal ? `<button class="task-delete-btn" title="Delete task"><i class="ph ph-trash"></i></button>` : ''}
    `;

    div.querySelector('.task-checkbox').onchange = (e) => {
      taskStatus[task.id] = e.target.checked;
      setStorage(STORAGE_KEYS.TASK_STATUS, taskStatus);
      div.classList.toggle('completed', e.target.checked);
      const updatedPending = courseTasks.filter(t => !taskStatus[t.id]).length;
      courseTaskCount.textContent = `${updatedPending} Pending`;
    };

    if (isLocal) {
      div.querySelector('.task-delete-btn').onclick = () => {
        const updatedLocal = localTasks.filter(t => t.id !== task.id);
        setStorage(STORAGE_KEYS.LOCAL_TASKS, updatedLocal);
        renderCourseTasks(courseCode);
      };
    }

    courseTasksList.appendChild(div);
  });
}

// =============================================================================
// 12.5. Schedule Intelligence: Next Class & Smart Due Dates
// =============================================================================

function formatShortDate(d) {
  const weekday = d.toLocaleDateString('en-US', { weekday: 'short' });
  const month = d.toLocaleDateString('en-US', { month: 'short' });
  const dayNum = d.getDate();
  return `${weekday}, ${month} ${dayNum}`;
}

function calculateNextClass(courseCode, fromDate = new Date()) {
  const now = new Date(fromDate);
  const currentHour = now.getHours();
  const currentMin = now.getMinutes();

  let targetClassesByDay = {};
  if (courseCode) {
    for (let d = 1; d <= 5; d++) {
      const dayData = SCHEDULE_DATA[d];
      if (dayData && dayData.classes) {
        const found = dayData.classes.find(c => c.code === courseCode);
        if (found) targetClassesByDay[d] = found;
      }
    }
  }

  const isGeneral = Object.keys(targetClassesByDay).length === 0;

  for (let offset = 0; offset <= 7; offset++) {
    const cand = new Date(now);
    cand.setDate(now.getDate() + offset);
    const day = cand.getDay();

    if (day >= 1 && day <= 5) {
      if (isGeneral) {
        const dayClasses = SCHEDULE_DATA[day]?.classes || [];
        if (dayClasses.length > 0) {
          if (offset === 0) {
            const latestEnd = Math.max(...dayClasses.map(c => c.endHour * 60 + c.endMin));
            if (currentHour * 60 + currentMin < latestEnd) {
              return { date: cand, offset, label: formatShortDate(cand) };
            }
          } else {
            return { date: cand, offset, label: formatShortDate(cand) };
          }
        }
      } else {
        const cls = targetClassesByDay[day];
        if (cls) {
          if (offset === 0) {
            const startTime = cls.startHour * 60 + cls.startMin;
            if (currentHour * 60 + currentMin < startTime) {
              return { date: cand, offset, label: formatShortDate(cand) };
            }
          } else {
            return { date: cand, offset, label: formatShortDate(cand) };
          }
        }
      }
    }
  }

  const fallback = new Date(now);
  fallback.setDate(now.getDate() + 7);
  return { date: fallback, offset: 7, label: formatShortDate(fallback) };
}

function getResolvedDueDate(option, courseCode = selectedCourseCode) {
  const now = new Date();
  if (option === 'Next Class') {
    const nextInfo = calculateNextClass(courseCode, now);
    return `${nextInfo.label} (Next Class)`;
  }
  if (option === 'Tomorrow') {
    const tom = new Date(now);
    tom.setDate(now.getDate() + 1);
    return `${formatShortDate(tom)} (Tomorrow)`;
  }
  if (option === 'This Week') {
    const fri = new Date(now);
    const day = fri.getDay();
    const diff = 5 - day;
    fri.setDate(fri.getDate() + (diff >= 0 ? diff : diff + 7));
    return `${formatShortDate(fri)} (This Week)`;
  }
  if (option === 'Custom' && sliderCustomDate && sliderCustomDate.value) {
    const parts = sliderCustomDate.value.split('-');
    if (parts.length === 3) {
      const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
      return formatShortDate(d);
    }
    return sliderCustomDate.value;
  }
  if (option === 'No Rush') {
    return 'No Rush';
  }
  return option;
}

// Quick Add Task Form inside Course Page
courseAddTaskForm.onsubmit = (e) => {
  e.preventDefault();
  const text = courseNewTaskInput.value.trim();
  if (!text || !currentCourse) return;

  const nextInfo = calculateNextClass(currentCourse.code);
  const dueStr = `${nextInfo.label} (Next Class)`;

  const localTasks = getStorage(STORAGE_KEYS.LOCAL_TASKS, []);
  const newTask = {
    id: 'local-' + Date.now(),
    title: text,
    isLocal: true,
    courseCode: currentCourse.code,
    dueDate: dueStr
  };

  localTasks.unshift(newTask);
  setStorage(STORAGE_KEYS.LOCAL_TASKS, localTasks);
  courseNewTaskInput.value = '';
  renderCourseTasks(currentCourse.code);
  renderTasksList();
};

// =============================================================================
// 13. Multi-Step Slider Modal (Tasks & Class Notes)
// =============================================================================

function getCourseDisplay(code) {
  if (!code) return 'Personal / General';
  const found = COURSE_OPTIONS.find(c => c.code === code);
  return found ? `${found.code} — ${found.subtitle || found.name}` : code;
}

function renderSliderCourseList() {
  if (!sliderCourseList) return;
  sliderCourseList.innerHTML = '';

  const options = sliderMode === 'note'
    ? COURSE_OPTIONS.filter(o => o.code !== null)
    : COURSE_OPTIONS;

  options.forEach(opt => {
    const card = document.createElement('button');
    card.type = 'button';
    const isSelected = (opt.code === selectedCourseCode);
    card.className = `slider-course-card ${isSelected ? 'selected' : ''}`;

    card.innerHTML = `
      <div class="course-card-info">
        <span class="course-card-code">${opt.code || 'Personal / General'}</span>
        <span class="course-card-name">${opt.subtitle || opt.name}</span>
      </div>
      <i class="ph ${isSelected ? 'ph-check-circle' : 'ph-circle'} course-card-icon"></i>
    `;

    card.onclick = () => {
      selectedCourseCode = opt.code;
      renderSliderCourseList();
      updateSlide2Meta();
      setTimeout(() => {
        setSliderStep(1);
      }, 140);
    };

    sliderCourseList.appendChild(card);
  });
}

function setSliderStep(step) {
  currentSliderStep = step;
  const totalSteps = sliderMode === 'task' ? 3 : 2;

  // Update progress bar
  const progressPercent = ((step + 1) / totalSteps) * 100;
  if (sliderProgressBar) {
    sliderProgressBar.style.width = `${progressPercent}%`;
  }

  // Update step indicator
  if (sliderStepIndicator) {
    sliderStepIndicator.textContent = `Step ${step + 1} of ${totalSteps}`;
  }

  // Slide track transform (each slide occupies 33.3333% of 300% track)
  if (sliderTrack) {
    sliderTrack.style.transform = `translateX(-${step * 33.33333}%)`;
  }

  // Slide specific actions
  if (step === 1) {
    updateSlide2Meta();
    setTimeout(() => {
      if (sliderTextInput) sliderTextInput.focus();
    }, 280);
  } else if (step === 2 && sliderMode === 'task') {
    updateSlide3Summary();
  }
}

function updateSlide2Meta() {
  const display = getCourseDisplay(selectedCourseCode);
  if (slideSelectedCourseLabel) {
    slideSelectedCourseLabel.textContent = `For: ${display}`;
  }

  if (sliderMode === 'task') {
    if (slideTextTitle) slideTextTitle.textContent = 'What is the task?';
    if (sliderTextInput) sliderTextInput.placeholder = 'e.g. Finish 1:50 floor plan draft and sections...';
    if (sliderToStep3) sliderToStep3.classList.remove('hidden');
    if (sliderSaveNoteBtn) sliderSaveNoteBtn.classList.add('hidden');
  } else {
    if (slideTextTitle) slideTextTitle.textContent = 'Add Class Note';
    if (sliderTextInput) sliderTextInput.placeholder = 'Jot down desk critique feedback, materials needed, or professor notes...';
    if (sliderToStep3) sliderToStep3.classList.add('hidden');
    if (sliderSaveNoteBtn) sliderSaveNoteBtn.classList.remove('hidden');
  }
}

function updateSlide3Summary() {
  if (summaryCourse) {
    summaryCourse.textContent = selectedCourseCode || 'Personal / General';
  }
  if (summaryTask) {
    const text = (sliderTextInput && sliderTextInput.value.trim()) || 'Untitled task';
    summaryTask.textContent = text;
    summaryTask.title = text;
  }

  // Dynamically update due button subtexts
  const nextInfo = calculateNextClass(selectedCourseCode);
  const subNext = document.getElementById('sub-due-next');
  if (subNext) subNext.textContent = nextInfo.label;

  const now = new Date();
  const tom = new Date(now);
  tom.setDate(now.getDate() + 1);
  const subTom = document.getElementById('sub-due-tomorrow');
  if (subTom) subTom.textContent = formatShortDate(tom);

  const fri = new Date(now);
  const day = fri.getDay();
  const diff = 5 - day;
  fri.setDate(fri.getDate() + (diff >= 0 ? diff : diff + 7));
  const subWeek = document.getElementById('sub-due-week');
  if (subWeek) subWeek.textContent = formatShortDate(fri);

  if (summaryDue) {
    summaryDue.textContent = getResolvedDueDate(selectedDueOption, selectedCourseCode);
  }
}

function openSliderModal(mode = 'task', targetCourseCode = null) {
  sliderMode = mode; // 'task' | 'note'

  if (targetCourseCode !== null) {
    selectedCourseCode = targetCourseCode;
  } else if (currentCourse) {
    selectedCourseCode = currentCourse.code;
  } else {
    selectedCourseCode = mode === 'note' ? 'Arch 2411' : null;
  }

  if (sliderModeTag) {
    sliderModeTag.textContent = mode === 'task' ? 'ADD TASK' : 'ADD CLASS NOTE';
  }

  if (slideCourseTitle) {
    slideCourseTitle.textContent = mode === 'task' ? 'Which course?' : 'Which class?';
  }
  if (slideCourseSubtitle) {
    slideCourseSubtitle.textContent = mode === 'task' ? 'Select where this task belongs' : 'Select course for class notes';
  }

  // Clear inputs
  if (sliderTextInput) sliderTextInput.value = '';
  selectedDueOption = 'Next Class';
  if (sliderCustomDate) {
    sliderCustomDate.value = '';
    sliderCustomDate.classList.add('hidden');
  }

  // Reset due option buttons
  if (sliderDueOptions) {
    sliderDueOptions.querySelectorAll('.slider-due-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.due === 'Next Class');
    });
  }

  renderSliderCourseList();
  updateSlide2Meta();

  // If already in a course or course was pre-specified, jump straight to step 1 (text input)
  // Else start at step 0 (choose course)
  if (targetCourseCode !== null || currentCourse !== null) {
    setSliderStep(1);
  } else {
    setSliderStep(0);
  }

  sliderModal.classList.remove('hidden');
}

function saveSliderTask() {
  const text = sliderTextInput.value.trim();
  if (!text) {
    setSliderStep(1);
    if (sliderTextInput) sliderTextInput.focus();
    return;
  }

  const dueStr = getResolvedDueDate(selectedDueOption, selectedCourseCode);

  const localTasks = getStorage(STORAGE_KEYS.LOCAL_TASKS, []);
  const newTask = {
    id: 'local-' + Date.now(),
    title: text,
    isLocal: true,
    courseCode: selectedCourseCode,
    dueDate: dueStr
  };

  localTasks.unshift(newTask);
  setStorage(STORAGE_KEYS.LOCAL_TASKS, localTasks);
  sliderTextInput.value = '';

  if (currentCourse) {
    renderCourseTasks(currentCourse.code);
  }
  renderTasksList();
  sliderModal.classList.add('hidden');
}

function saveSliderNote() {
  const text = sliderTextInput.value.trim();
  if (!text) {
    if (sliderTextInput) sliderTextInput.focus();
    return;
  }

  const targetCode = selectedCourseCode || (currentCourse ? currentCourse.code : 'Arch 2411');
  const notesMap = getStorage(STORAGE_KEYS.CLASS_NOTES, {});
  const existing = notesMap[targetCode] || '';
  const timestamp = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const entry = `• [${timestamp}] ${text}`;
  notesMap[targetCode] = existing ? existing + '\n\n' + entry : entry;
  setStorage(STORAGE_KEYS.CLASS_NOTES, notesMap);

  sliderTextInput.value = '';

  if (currentCourse && currentCourse.code === targetCode) {
    courseNotesTextarea.value = notesMap[targetCode];
    courseNotesHint.textContent = 'Saved just now';
  }

  sliderModal.classList.add('hidden');
}

// Wire up Slider Controls
if (sliderCancelBtn) {
  sliderCancelBtn.onclick = () => sliderModal.classList.add('hidden');
}
if (sliderToStep2) {
  sliderToStep2.onclick = () => setSliderStep(1);
}
if (sliderBackTo1) {
  sliderBackTo1.onclick = () => setSliderStep(0);
}
if (sliderToStep3) {
  sliderToStep3.onclick = () => {
    if (!sliderTextInput.value.trim()) {
      sliderTextInput.focus();
      return;
    }
    setSliderStep(2);
  };
}
if (sliderSaveNoteBtn) {
  sliderSaveNoteBtn.onclick = () => saveSliderNote();
}
if (sliderBackTo2) {
  sliderBackTo2.onclick = () => setSliderStep(1);
}
if (sliderSaveTaskBtn) {
  sliderSaveTaskBtn.onclick = () => saveSliderTask();
}
if (sliderCloseBtn) {
  sliderCloseBtn.onclick = () => sliderModal.classList.add('hidden');
}
if (sliderModal) {
  sliderModal.onclick = (e) => {
    if (e.target === sliderModal) sliderModal.classList.add('hidden');
  };
}

// Due options in slide 3
if (sliderDueOptions) {
  sliderDueOptions.querySelectorAll('.slider-due-btn').forEach(btn => {
    btn.onclick = () => {
      sliderDueOptions.querySelectorAll('.slider-due-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedDueOption = btn.dataset.due;
      if (selectedDueOption === 'Custom') {
        sliderCustomDate.classList.remove('hidden');
        sliderCustomDate.focus();
      } else {
        sliderCustomDate.classList.add('hidden');
      }
      updateSlide3Summary();
    };
  });
}

if (sliderCustomDate) {
  sliderCustomDate.onchange = () => updateSlide3Summary();
}

// =============================================================================
// 14. Context-Aware Floating Action Button (FAB) Flow
// =============================================================================

function updateFABContext() {
  if (currentCourse) {
    fabAddTask.querySelector('span').textContent = `Task for ${currentCourse.code}`;
    if (fabAddNote) fabAddNote.querySelector('span').textContent = `Note for ${currentCourse.code}`;
  } else {
    fabAddTask.querySelector('span').textContent = 'Add Task';
    if (fabAddNote) fabAddNote.querySelector('span').textContent = 'Class Note';
  }
}

function initFAB() {
  const fabBackdrop = document.getElementById('fab-backdrop');

  function openFAB() {
    mainFab.classList.add('open');
    fabMenu.classList.remove('hidden');
    if (fabBackdrop) {
      fabBackdrop.classList.add('active');
    }
  }

  function closeFAB() {
    mainFab.classList.remove('open');
    fabMenu.classList.add('hidden');
    if (fabBackdrop) {
      fabBackdrop.classList.remove('active');
    }
  }

  mainFab.onclick = (e) => {
    e.stopPropagation();
    if (mainFab.classList.contains('open')) {
      closeFAB();
    } else {
      openFAB();
    }
  };

  // Clicking on the blurred background closes the FAB without performing any underlying action
  if (fabBackdrop) {
    fabBackdrop.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      closeFAB();
    };
  }

  // Close FAB menu on outside tap
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#fab-wrapper') && mainFab.classList.contains('open')) {
      closeFAB();
    }
  });

  // FAB Option 1: Add Task (Opens slider in task mode)
  fabAddTask.onclick = () => {
    closeFAB();
    const targetCode = currentCourse ? currentCourse.code : null;
    openSliderModal('task', targetCode);
  };

  // FAB Option 2: Add Class Note (Opens slider in note mode)
  if (fabAddNote) {
    fabAddNote.onclick = () => {
      closeFAB();
      const targetCode = currentCourse ? currentCourse.code : null;
      openSliderModal('note', targetCode);
    };
  }

  // FAB Option 3: View All Tasks
  fabViewTasks.onclick = () => {
    closeFAB();
    renderTasksList();
    tasksModal.classList.remove('hidden');
  };

  // FAB Option 4: Daily Romantic Note
  fabQuote.onclick = () => {
    closeFAB();
    const dayIndex = selectedDate.getDate() % appQuotes.length;
    currentModalQuoteIndex = dayIndex;
    displayQuoteInModal(appQuotes[dayIndex]);
    quoteModal.classList.remove('hidden');
  };
}

// =============================================================================
// 15. All Tasks Modal Flow
// =============================================================================

function renderTasksList() {
  const taskStatus = getStorage(STORAGE_KEYS.TASK_STATUS, {});
  const localTasks = getStorage(STORAGE_KEYS.LOCAL_TASKS, []);
  const allTasks = [...appAssignments, ...localTasks];

  tasksList.innerHTML = '';
  if (allTasks.length === 0) {
    tasksList.innerHTML = '<span style="font-size:0.8rem; color:var(--text-muted); text-align:center; padding:12px 0;">No tasks currently scheduled.</span>';
    return;
  }

  allTasks.forEach(task => {
    const isDone = !!taskStatus[task.id];
    const isLocal = !!task.isLocal;
    const item = document.createElement('div');
    item.className = `task-item ${isDone ? 'completed' : ''}`;

    item.innerHTML = `
      <input type="checkbox" class="task-checkbox" ${isDone ? 'checked' : ''}>
      <div class="task-content">
        <div class="task-header-row">
          <span class="task-title">${task.title}</span>
          ${task.courseCode ? `<span class="task-tag">${task.courseCode}</span>` : '<span class="task-tag">Personal</span>'}
        </div>
        ${task.description ? `<p class="task-desc">${task.description}</p>` : ''}
        ${task.dueDate ? `<span class="task-due"><i class="ph ph-calendar"></i> Due ${task.dueDate}</span>` : ''}
      </div>
      ${isLocal ? `<button class="task-delete-btn" title="Delete task"><i class="ph ph-trash"></i></button>` : ''}
    `;

    item.querySelector('.task-checkbox').onchange = (e) => {
      taskStatus[task.id] = e.target.checked;
      setStorage(STORAGE_KEYS.TASK_STATUS, taskStatus);
      item.classList.toggle('completed', e.target.checked);
    };

    if (isLocal) {
      item.querySelector('.task-delete-btn').onclick = () => {
        const updatedLocal = localTasks.filter(t => t.id !== task.id);
        setStorage(STORAGE_KEYS.LOCAL_TASKS, updatedLocal);
        renderTasksList();
        if (currentCourse) renderCourseTasks(currentCourse.code);
      };
    }

    tasksList.appendChild(item);
  });
}

tasksBtn.onclick = () => {
  renderTasksList();
  tasksModal.classList.remove('hidden');
};

tasksCloseBtn.onclick = () => {
  tasksModal.classList.add('hidden');
};

tasksModal.onclick = (e) => {
  if (e.target === tasksModal) tasksModal.classList.add('hidden');
};

addTaskForm.onsubmit = (e) => {
  e.preventDefault();
  const text = newTaskInput.value.trim();
  if (!text) return;

  const localTasks = getStorage(STORAGE_KEYS.LOCAL_TASKS, []);
  const newTask = {
    id: 'local-' + Date.now(),
    title: text,
    isLocal: true,
    courseCode: null,
    dueDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  };

  localTasks.unshift(newTask);
  setStorage(STORAGE_KEYS.LOCAL_TASKS, localTasks);
  newTaskInput.value = '';
  renderTasksList();
};

// =============================================================================
// 16. General Dismissals, Navigation & History
// =============================================================================

cheerCloseBtn.onclick = () => {
  cheerModal.classList.add('hidden');
};

cheerModal.onclick = (e) => {
  if (e.target === cheerModal) cheerModal.classList.add('hidden');
};

todayBtn.onclick = () => {
  const currentNow = new Date();
  if (currentNow.getDay() === 0 || currentNow.getDay() === 6) {
    selectedDate = new Date(currentNow);
    const day = selectedDate.getDay();
    const diff = (day === 0 ? 1 : 2);
    selectedDate.setDate(selectedDate.getDate() + diff);
  } else {
    selectedDate = new Date(currentNow);
  }
  if (!courseView.classList.contains('hidden')) {
    closeCoursePage();
  }
  renderWeekStrip();
  updateHeroDay();
  renderTimeline();
  setupDailyQuote();
};

// Back button browser/mobile support via hashchange
window.addEventListener('hashchange', () => {
  if (!window.location.hash && !courseView.classList.contains('hidden')) {
    closeCoursePage();
  }
});

// =============================================================================
// 17. Service Worker Registration (PWA)
// =============================================================================

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => console.log('ServiceWorker registered:', reg.scope))
      .catch((err) => console.log('ServiceWorker error:', err));
  });
}

// =============================================================================
// 18. Initial Run
// =============================================================================

function initApp() {
  updateHeroDay();
  renderWeekStrip();
  renderTimeline();
  setupDailyQuote();
  initFAB();
  syncRemoteContent();
}

initApp();
