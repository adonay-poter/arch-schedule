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
    quote: "Whenever you feel overwhelmed today, take a slow breath and remember how remarkably capable you are. I see how hard you work, and I believe in you with all my heart.",
    author: "Always in Your Corner"
  },
  {
    quote: "You have this quiet strength and brilliant mind that always finds a way forward. Walk into today knowing someone is endlessly proud of you and cheering you on.",
    author: "Cheering for You"
  },
  {
    quote: "Don't worry about having every detail figured out at once. Just take it one step at a time today — you are doing so much better than you realize, and I love you endlessly.",
    author: "Gentle Reminder"
  },
  {
    quote: "Your passion and dedication inspire me every single day. Go show today what you are made of, my favorite person in the world.",
    author: "With All My Love"
  },
  {
    quote: "Breathe easy today. Remember that no class, no project, and no review defines your worth. You are extraordinary, and I will always be right here backing you up.",
    author: "Here for You"
  },
  {
    quote: "I know today has a lot in store, but there is nothing you cannot handle. You have the talent, the heart, and all my love behind you.",
    author: "Forever Believing in You"
  },
  {
    quote: "May today be kind to you, may your focus be clear, and may you feel how deeply loved and appreciated you are every single hour.",
    author: "Thinking of You Always"
  }
];

let appAssignments = [];

const CHEER_MESSAGES = [
  {
    title: "Mid-Week Recharge",
    text: "Today is completely free from classes. Take a slow morning, enjoy your coffee, and rest up. You have been working so hard, and you truly deserve this day off."
  },
  {
    title: "Time Just for You",
    text: "No schedules to rush to, no classrooms to walk to today. Take this time to do whatever makes you happiest. I am always thinking of you and sending you warm hugs."
  },
  {
    title: "A Sweet Reminder",
    text: "Rest is just as important as hard work. Relax your mind, take good care of yourself today, and know that you are deeply loved beyond words."
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
    modalQuoteText.textContent = `"${currentQuote.quote}"`;
    modalQuoteAuthor.textContent = `— ${currentQuote.author}`;
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
      <div class="day-card-num">${dayDate.getDate()}</div>
      <div class="day-card-name">${dayLetters[i]}</div>
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
      const cheer = CHEER_MESSAGES[Math.floor(Math.random() * CHEER_MESSAGES.length)];
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

    item.innerHTML = `
      <div class="class-card ${isNow ? 'current' : ''}" role="button" tabindex="0">
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

// Quick Add Task Form inside Course Page
courseAddTaskForm.onsubmit = (e) => {
  e.preventDefault();
  const text = courseNewTaskInput.value.trim();
  if (!text || !currentCourse) return;

  const localTasks = getStorage(STORAGE_KEYS.LOCAL_TASKS, []);
  const newTask = {
    id: 'local-' + Date.now(),
    title: text,
    isLocal: true,
    courseCode: currentCourse.code,
    dueDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
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
    const text = sliderTextInput.value.trim() || 'Untitled task';
    summaryTask.textContent = text;
    summaryTask.title = text;
  }
  if (summaryDue) {
    let due = selectedDueOption;
    if (selectedDueOption === 'Custom' && sliderCustomDate && sliderCustomDate.value) {
      due = sliderCustomDate.value;
    }
    summaryDue.textContent = due;
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

  let dueStr = selectedDueOption;
  if (selectedDueOption === 'Custom' && sliderCustomDate && sliderCustomDate.value) {
    dueStr = sliderCustomDate.value;
  }

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
  mainFab.onclick = (e) => {
    e.stopPropagation();
    const isOpen = mainFab.classList.toggle('open');
    fabMenu.classList.toggle('hidden', !isOpen);
  };

  // Close FAB menu on outside tap
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#fab-wrapper')) {
      mainFab.classList.remove('open');
      fabMenu.classList.add('hidden');
    }
  });

  // FAB Option 1: Add Task (Opens slider in task mode)
  fabAddTask.onclick = () => {
    mainFab.classList.remove('open');
    fabMenu.classList.add('hidden');
    const targetCode = currentCourse ? currentCourse.code : null;
    openSliderModal('task', targetCode);
  };

  // FAB Option 2: Add Class Note (Opens slider in note mode)
  if (fabAddNote) {
    fabAddNote.onclick = () => {
      mainFab.classList.remove('open');
      fabMenu.classList.add('hidden');
      const targetCode = currentCourse ? currentCourse.code : null;
      openSliderModal('note', targetCode);
    };
  }

  // FAB Option 3: View All Tasks
  fabViewTasks.onclick = () => {
    mainFab.classList.remove('open');
    fabMenu.classList.add('hidden');
    renderTasksList();
    tasksModal.classList.remove('hidden');
  };

  // FAB Option 4: Daily Romantic Note
  fabQuote.onclick = () => {
    mainFab.classList.remove('open');
    fabMenu.classList.add('hidden');
    const dayIndex = selectedDate.getDate() % appQuotes.length;
    const currentQuote = appQuotes[dayIndex];
    modalQuoteText.textContent = `"${currentQuote.quote}"`;
    modalQuoteAuthor.textContent = `— ${currentQuote.author}`;
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
