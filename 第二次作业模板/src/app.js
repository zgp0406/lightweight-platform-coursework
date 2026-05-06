/**
 * app.js —— 课程表网站核心逻辑
 *
 * 核心功能清单：
 *   1. 页面加载时从 LocalStorage 读取数据并渲染课程表
 *   2. 添加课程：表单提交 → 创建课程对象 → 存入 LocalStorage → 渲染卡片到对应单元格
 *   3. 删除课程：点击 × → 从 DOM 移除卡片 → 从 LocalStorage 删除
 *   4. 拖拽课程：dragstart 记录课程 ID → dragover 允许放置 → drop 移动卡片到新单元格 → 更新 LocalStorage
 *   5. 查询科目时间：遍历 LocalStorage 中的课程，筛选匹配的科目名称
 *   6. 查询教室行程：遍历 LocalStorage 中的课程，筛选匹配的星期
 */

const STORAGE_KEY = 'courses';

// 这里把数字星期转成中文，后面展示查询结果会更直观
const dayMap = {
  1: '周一',
  2: '周二',
  3: '周三',
  4: '周四',
  5: '周五',
  6: '周六',
  7: '周日'
};

// 页面里所有课程都放在这个数组里，增删改查也都围着它转
let courses = loadCourses();

// 先把常用节点拿出来，后面写事件处理会省很多事
const addForm = document.getElementById('add-course-form');
const searchNameForm = document.getElementById('search-by-name-form');
const searchDayForm = document.getElementById('search-by-day-form');
const searchResults = document.getElementById('search-results');

// 从 localStorage 里把课程读出来，没数据就先返回空数组
function loadCourses() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('读取课程数据失败：', error);
    return [];
  }
}

// 把当前 courses 写回 localStorage，保证刷新页面后数据还在
function saveCourses() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
}

// 拼出“周几 第几节”的文字，方便查询结果直接展示
function getCourseTimeText(course) {
  return `${dayMap[course.day] || `星期${course.day}`} 第${course.period}节`;
}

// 根据星期和节次找到对应的课程格子
function getSlot(day, period) {
  return document.querySelector(
    `.time-slot[data-day="${day}"][data-period="${period}"]`
  );
}

// 每次重绘前先清空课程表，避免重复渲染
function clearTimetable() {
  document.querySelectorAll('.time-slot').forEach((slot) => {
    slot.innerHTML = '';
    slot.classList.remove('drag-over');
  });
}

// 删除一门课：从数组里去掉，再保存并重绘
function deleteCourse(id) {
  courses = courses.filter((course) => course.id !== id);
  saveCourses();
  renderTimetable();
}

// 根据一条课程数据，生成对应的课程卡片
function createCourseCard(course) {
  const card = document.createElement('div');
  card.className = 'course-card';
  card.draggable = true;
  card.dataset.id = course.id;

  const name = document.createElement('span');
  name.className = 'course-name';
  name.textContent = course.name;

  const teacher = document.createElement('span');
  teacher.className = 'course-teacher';
  teacher.textContent = course.teacher;

  const room = document.createElement('span');
  room.className = 'course-room';
  room.textContent = course.room;

  const delBtn = document.createElement('button');
  delBtn.className = 'btn-delete';
  delBtn.type = 'button';
  delBtn.title = '删除此课程';
  delBtn.textContent = '×';

  // 这里直接删掉这门课，不用手动去改 DOM，重绘会一起处理掉
  delBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    deleteCourse(course.id);
  });

  // 拖拽时先把课程 id 记下来，放到 dataTransfer 里
  card.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', course.id);
    card.classList.add('dragging');
  });

  card.addEventListener('dragend', () => {
    card.classList.remove('dragging');
  });

  card.append(name, teacher, room, delBtn);
  return card;
}

// 把数组里的课程一条条画到课程表对应格子里
function renderTimetable() {
  clearTimetable();

  courses.forEach((course) => {
    const slot = getSlot(course.day, course.period);
    if (!slot) {
      return;
    }

    slot.appendChild(createCourseCard(course));
  });
}

// 新增一门课，统一在这里创建对象，避免各处重复写
function addCourse(name, teacher, room, day, period) {
  const newCourse = {
    id: `${Date.now()}_${Math.random().toString(16).slice(2)}`,
    name,
    teacher,
    room,
    day: Number(day),
    period: Number(period)
  };

  courses.push(newCourse);
  saveCourses();
  renderTimetable();
}

// 按科目名称查课，结果直接显示到右侧结果区
function searchByName(keyword) {
  const key = keyword.trim().toLowerCase();

  if (!key) {
    searchResults.innerHTML = '<p>请输入科目名称。</p>';
    return;
  }

  const results = courses.filter((course) =>
    course.name.toLowerCase().includes(key)
  );

  if (results.length === 0) {
    searchResults.innerHTML = `<p>没有找到“${keyword}”相关课程。</p>`;
    return;
  }

  searchResults.innerHTML = results
    .map(
      (course) => `
        <div class="result-item">
          <strong>${course.name}</strong>
          <div>老师：${course.teacher}</div>
          <div>教室：${course.room}</div>
          <div>时间：${getCourseTimeText(course)}</div>
        </div>
      `
    )
    .join('');
}

// 按星期查当天的课程，方便看某一天都有哪些安排
function searchByDay(day) {
  if (!day) {
    searchResults.innerHTML = '<p>请选择星期。</p>';
    return;
  }

  const results = courses
    .filter((course) => course.day === Number(day))
    .sort((a, b) => a.period - b.period);

  if (results.length === 0) {
    searchResults.innerHTML = `<p>${dayMap[day] || `星期${day}`} 没有课程。</p>`;
    return;
  }

  searchResults.innerHTML = `
    <h3>${dayMap[day] || `星期${day}`} 的课程安排</h3>
    ${results
      .map(
        (course) => `
          <div class="result-item">
            <strong>第${course.period}节</strong>
            <div>科目：${course.name}</div>
            <div>老师：${course.teacher}</div>
            <div>教室：${course.room}</div>
          </div>
        `
      )
      .join('')}
  `;
}

// 给每个课程格子补上拖拽能力，拖到别的格子就能换时间
function bindSlotEvents() {
  document.querySelectorAll('.time-slot').forEach((slot) => {
    // 不先阻止默认行为，drop 事件是不会生效的
    slot.addEventListener('dragover', (event) => {
      event.preventDefault();
      slot.classList.add('drag-over');
    });

    slot.addEventListener('dragleave', () => {
      slot.classList.remove('drag-over');
    });

    slot.addEventListener('drop', (event) => {
      event.preventDefault();
      slot.classList.remove('drag-over');

      const id = event.dataTransfer.getData('text/plain');
      const course = courses.find((item) => item.id === id);
      if (!course) {
        return;
      }

      course.day = Number(slot.dataset.day);
      course.period = Number(slot.dataset.period);

      saveCourses();
      renderTimetable();
    });
  });
}

// 表单提交后，把输入框里的内容整理成一门新课程
addForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('course-name').value.trim();
  const teacher = document.getElementById('course-teacher').value.trim();
  const room = document.getElementById('course-room').value.trim();
  const day = document.getElementById('course-day').value;
  const period = document.getElementById('course-period').value;

  if (!name || !teacher || !room || !day || !period) {
    return;
  }

  addCourse(name, teacher, room, day, period);
  addForm.reset();
});

// 科目查询表单：输入名字后直接去结果区展示
searchNameForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const keyword = document.getElementById('search-name').value;
  searchByName(keyword);
});

// 星期查询表单：查当天所有课程安排
searchDayForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const day = document.getElementById('search-day').value;
  searchByDay(day);
});

// 页面先把拖拽和首屏数据都准备好
bindSlotEvents();
renderTimetable();
