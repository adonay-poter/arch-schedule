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

// =============================================================================
// 2. Default Fallback Data (Synced & Overridden by content.json)
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
let appStudioGear = {};

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
// 3. LocalStorage Helpers
// =============================================================================

const STORAGE_KEYS = {
  TASK_STATUS: 'arch_task_status',
  LOCAL_TASKS: 'arch_local_tasks',
  CLASS_NOTES: 'arch_class_notes',
  GEAR_STATUS: 'arch_gear_status'
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
// 4. State Management
// =============================================================================

let selectedDate = new Date();
if (selectedDate.getDay() === 0 || selectedDate.getDay() === 6) {
  const day = selectedDate.getDay();
  const diff = (day === 0 ? 1 : 2); // Jump to Monday
  selectedDate.setDate(selectedDate.getDate() + diff);
}

let activeClassModalCode = null;

// =============================================================================
// 5. DOM References
// =============================================================================

const quoteCard = document.getElementById('quote-card');
const quotePreview = document.getElementById('quote-preview');
const quoteModal = document.getElementById('quote-modal');
const modalQuoteText = document.getElementById('modal-quote-text');
const modalQuoteAuthor = document.getElementById('modal-quote-author');
const modalCloseBtn = document.getElementById('modal-close-btn');

const heroDayCard = document.getElementById('hero-day-card');
const dayNumeral = document.getElementById('day-numeral');
const dayFullDate = document.getElementById('day-full-date');
const todayBtn = document.getElementById('today-btn');
const tasksBtn = document.getElementById('tasks-btn');

const weekStripContainer = document.getElementById('week-strip-container');
const weekRangeText = document.getElementById('week-range-text');

const timelineDayTitle = document.getElementById('timeline-day-title');
const timelineDayStatus = document.getElementById('timeline-day-status');
const timelineContainer = document.getElementById('timeline-container');

const cheerModal = document.getElementById('cheer-modal');
const cheerTitle = document.getElementById('cheer-title');
const cheerText = document.getElementById('cheer-text');
const cheerCloseBtn = document.getElementById('cheer-close-btn');

// Tasks Modal
const tasksModal = document.getElementById('tasks-modal');
const tasksCloseBtn = document.getElementById('tasks-close-btn');
const tasksList = document.getElementById('tasks-list');
const addTaskForm = document.getElementById('add-task-form');
const newTaskInput = document.getElementById('new-task-input');

// Class Details & Notes Modal
const classModal = document.getElementById('class-modal');
const classModalCloseBtn = document.getElementById('class-modal-close-btn');
const classModalCode = document.getElementById('class-modal-code');
const classModalTitle = document.getElementById('class-modal-title');
const classModalMeta = document.getElementById('class-modal-meta');
const classModalTasks = document.getElementById('class-modal-tasks');
const classModalGear = document.getElementById('class-modal-gear');
const classModalNotes = document.getElementById('class-modal-notes');
const notesSavedHint = document.getElementById('notes-saved-hint');

// =============================================================================
// 6. GitHub Remote Sync Engine (content.json)
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
    if (data.studio_gear && typeof data.studio_gear === 'object') {
      appStudioGear = data.studio_gear;
    }

    setupDailyQuote();
    renderTasksList();
  } catch (err) {
    console.log('Using offline cached content:', err);
  }
}

// =============================================================================
// 7. Daily Quote Flow
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
// 8. Day Hero Card (English Numbers in SurGraphics Font, Left-Aligned Date)
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

  dayNumeral.textContent = gDay;
  dayFullDate.textContent = `${gDayName}, ${gMonth} ${gDay}`;

  dayNumeral.style.transform = 'scale(0.92)';
  setTimeout(() => {
    dayNumeral.style.transform = 'scale(1)';
  }, 40);
}

// =============================================================================
// 9. 5-Day Week Strip (MON, TUE, WED, THU, FRI)
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
// 10. Timeline & Free Day Rendering
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
  timelineDayStatus.textContent = `${count} ${count === 1 ? 'Class' : 'Classes'} Scheduled • Tap for notes`;

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
          <span style="color:var(--text-secondary);"><i class="ph ph-notepad"></i> Notes & Gear ↗</span>
        </div>
      </div>
    `;

    // Click class card to open class modal
    item.querySelector('.class-card').onclick = () => {
      openClassModal(cls);
    };

    timelineContainer.appendChild(item);
  });
}

// =============================================================================
// 11. Class Details, Studio Gear & Personal Notes Modal
// =============================================================================

function openClassModal(cls) {
  activeClassModalCode = cls.code;
  classModalCode.textContent = cls.code;
  classModalTitle.textContent = cls.title;

  classModalMeta.innerHTML = `
    <div><i class="ph ph-clock"></i> ${cls.timeStr} (${cls.periods})</div>
    <div><i class="ph ph-map-pin"></i> ${cls.room}</div>
    <div><i class="ph ph-user"></i> ${cls.instructor}</div>
  `;

  // Render course-specific assignments
  const taskStatus = getStorage(STORAGE_KEYS.TASK_STATUS, {});
  const localTasks = getStorage(STORAGE_KEYS.LOCAL_TASKS, []);
  const allTasks = [...appAssignments, ...localTasks];
  const courseTasks = allTasks.filter(t => t.courseCode === cls.code);

  classModalTasks.innerHTML = '';
  if (courseTasks.length === 0) {
    classModalTasks.innerHTML = '<span style="font-size:0.78rem; color:var(--text-muted);">No pending assignments for this class.</span>';
  } else {
    courseTasks.forEach(task => {
      const isDone = !!taskStatus[task.id];
      const div = document.createElement('div');
      div.className = `task-item ${isDone ? 'completed' : ''}`;
      div.innerHTML = `
        <input type="checkbox" class="task-checkbox" ${isDone ? 'checked' : ''}>
        <div class="task-content">
          <div class="task-title">${task.title}</div>
          ${task.dueDate ? `<div class="task-due"><i class="ph ph-calendar"></i> Due ${task.dueDate}</div>` : ''}
        </div>
      `;
      div.querySelector('.task-checkbox').onchange = (e) => {
        taskStatus[task.id] = e.target.checked;
        setStorage(STORAGE_KEYS.TASK_STATUS, taskStatus);
        div.classList.toggle('completed', e.target.checked);
      };
      classModalTasks.appendChild(div);
    });
  }

  // Render Studio Gear Checklist
  const gearStatus = getStorage(STORAGE_KEYS.GEAR_STATUS, {});
  const gearItems = appStudioGear[cls.code] || [];
  classModalGear.innerHTML = '';

  if (gearItems.length === 0) {
    classModalGear.innerHTML = '<span style="font-size:0.78rem; color:var(--text-muted);">Standard notebook & pens.</span>';
  } else {
    gearItems.forEach(item => {
      const key = `${cls.code}_${item}`;
      const isChecked = !!gearStatus[key];
      const div = document.createElement('div');
      div.className = `gear-item ${isChecked ? 'checked' : ''}`;
      div.innerHTML = `
        <input type="checkbox" class="gear-checkbox" ${isChecked ? 'checked' : ''}>
        <span>${item}</span>
      `;

      const cb = div.querySelector('.gear-checkbox');
      const toggle = () => {
        cb.checked = !cb.checked;
        gearStatus[key] = cb.checked;
        setStorage(STORAGE_KEYS.GEAR_STATUS, gearStatus);
        div.classList.toggle('checked', cb.checked);
      };

      div.onclick = (e) => {
        if (e.target !== cb) toggle();
      };
      cb.onchange = () => {
        gearStatus[key] = cb.checked;
        setStorage(STORAGE_KEYS.GEAR_STATUS, gearStatus);
        div.classList.toggle('checked', cb.checked);
      };

      classModalGear.appendChild(div);
    });
  }

  // Load and auto-save personal class notes
  const notesMap = getStorage(STORAGE_KEYS.CLASS_NOTES, {});
  classModalNotes.value = notesMap[cls.code] || '';
  notesSavedHint.textContent = notesMap[cls.code] ? 'Saved' : 'Auto-saves as you type';

  classModalNotes.oninput = () => {
    notesMap[cls.code] = classModalNotes.value;
    setStorage(STORAGE_KEYS.CLASS_NOTES, notesMap);
    notesSavedHint.textContent = 'Saved';
  };

  classModal.classList.remove('hidden');
}

classModalCloseBtn.onclick = () => {
  classModal.classList.add('hidden');
};

classModal.onclick = (e) => {
  if (e.target === classModal) classModal.classList.add('hidden');
};

// =============================================================================
// 12. All Tasks & Deadlines Modal Flow
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

// Add personal task form
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
// 13. General Dismissals & Today Button
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
  renderWeekStrip();
  updateHeroDay();
  renderTimeline();
  setupDailyQuote();
};

// =============================================================================
// 14. Service Worker Registration (PWA)
// =============================================================================

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => console.log('ServiceWorker registered:', reg.scope))
      .catch((err) => console.log('ServiceWorker error:', err));
  });
}

// =============================================================================
// 15. Initial Run
// =============================================================================

function initApp() {
  updateHeroDay();
  renderWeekStrip();
  renderTimeline();
  setupDailyQuote();
  syncRemoteContent();
}

initApp();
