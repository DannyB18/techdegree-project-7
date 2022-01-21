const alertZone = document.getElementById('alert-area');
const newMembersSection = document.getElementById('new-members');
const memberList = newMembersSection.querySelector('.member-list');
const recentActivitySection = document.getElementById('recent-activity');
const activityList = recentActivitySection.querySelector('.member-list');
const timeRange = document.querySelector('.range');
const users = [
    {
        fullName: 'Victoria Chambers',
        picture: 'images/member-1.jpg',
        email: 'victoria.chambers80@example.com',
        dateJoined: '10/15/20'},
    {
        fullName: 'Dale Byrd',
        picture: 'images/member-2.jpg',
        email: 'dale.byrd52@example.com',
        dateJoined: '10/15/20'},
    {
        fullName: 'Dawn Wood',
        picture: 'images/member-3.jpg',
        email: 'dawn.wood16@example.com',
        dateJoined: '10/15/20'},
    {
        fullName: 'Dan Oliver',
        picture: 'images/member-4.jpg',
        email: 'dan.oliver82@example.com',
        dateJoined: '10/15/20'},
];
const actions = {
    post: 'posted',
    like: 'liked the post',
    comment: 'commented on'
};

const createElement = (elementName, property = null, value = null) => {
    const element = document.createElement(elementName);
    element[property] = value;
    return element;
};

alertZone.addEventListener("click", (e) => {
    const button = e.target;
    const alert = button.parentNode;
    if (button.tagName === 'BUTTON' && button.textContent === 'x') {
        alert.parentNode.removeChild(alert);
    }
});

// ===================================
//      Member Card Functions
// ===================================

function memberCardPicture(userName, picture) {
    const li = createElement('li', 'className', 'member-card');
    const img = createElement('img', 'className', 'user-pic');
    img.setAttribute('src', picture);
    img.setAttribute('alt', `Profile picture of ${userName}`);
    li.appendChild(img);
    return li;
}

function createNewMemberCard(userName, picture, email, dateJoined) {
    const li = memberCardPicture(userName, picture);
    const user = createElement('p', 'textContent', userName);
    const emailAddress = createElement('a', 'textContent', email);
    const userInfo = createElement('div', 'className', 'user-info');
    const joinDate = createElement('p', 'textContent', dateJoined);
    userInfo.appendChild(user);
    userInfo.appendChild(emailAddress);
    li.appendChild(userInfo);
    li.appendChild(joinDate);
    return li;
}

function populateNewMemberList() {
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        const li = createNewMemberCard(user.fullName, user.picture, user.email, user.dateJoined);
        memberList.appendChild(li);
    }
}
populateNewMemberList();

function statusUpdate(userName, action, post, timeAgo) {
    const status = createElement('div', 'className', 'status');
    const p = createElement('p');
    p.innerHTML = `${userName} ${action} <strong>${post}</strong>`;
    const span = createElement('span', 'textContent', timeAgo);
    status.appendChild(p);
    status.appendChild(span);
    return status;
}

const statusUpdates = [
    statusUpdate('Victoria Chambers', actions.comment, "WebApp's SEO Tips", '4 hours ago'),
    statusUpdate('Dale Byrd', actions.like, "Facebook's changes for 2021", '5 hours ago'),
    statusUpdate('Dawn Wood', actions.comment, "Facebook's changes for 2021", '5 hours ago'),
    statusUpdate('Dan Oliver', actions.post, "WebApp's SEO Tips", '1 day ago')
];

function populateActivityList() {
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        let status = statusUpdates[i];
        const userName = user.fullName;
        const picture = user.picture;
        const button = createElement('button', 'textContent', '>');
        const li = memberCardPicture(userName, picture);
        li.appendChild(status);
        li.appendChild(button);
        activityList.appendChild(li);
    }
}
populateActivityList();

// ===================================
//      Chart Interval Functions
// ===================================

const labels = (chart) => chart.data.labels;
const data = (chart) => chart.data.datasets[0].data;
const labelsets = {
    hourly: ['01-06', '07-12', '13-18', '19-00', '01-06', '07-12', '13-18', '19-00', '01-06', '07-12', '13-18'],
    daily: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    weekly: ['11/28', '12/05', '12/12', '12/19', '12/26', '01/02', '01/09', '01/16'],
    monthly: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
}
const datasets = {
    hourly: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500],
    daily: [5500,3950,4250,5000,4500,6250,5750],
    weekly: [34250,30750,32250,35750,37500,33500,34750,33000],
    monthly: [120000, 104500, 125000, 120000, 135750, 120000],
}

function changeActive(target) {
    for (let i = 0; i < timeRange.children.length; i++) {
        const button = timeRange.children[i];
        button.removeAttribute('class');
    }
    target.className = 'active';
}

function removeData(chart) {
    for (let i = labels(chart).length; i > 0; i--) {
        labels(chart).pop();
    }
    for (let i = data(chart).length; i > 0; i--) {
        data(chart).pop();
    }
    chart.update();
}

function addData(chart, labelSet, dataSet) {
    for (let i = 0; i < labelSet.length; i++) {
        const label = labelSet[i];
        labels(chart).push(label);
    }
    for (let i = 0; i < dataSet.length; i++) {
        const datum = dataSet[i];
        data(chart).push(datum);
    }
    chart.update();
}

function changeInterval(chart, text) {
    removeData(chart)
    addData(chart, labelsets[text], datasets[text]);
}

timeRange.addEventListener('click', (e) => {
    const button = e.target;
    if (button.tagName === 'BUTTON') {
        changeActive(button);
        const text = button.textContent.toLowerCase();
        changeInterval(trafficChart, text);
    }
});

// ===================================
//      Notification Functions
// ===================================

const notifList = [
    "You have 12 unread messages",
    "You have 3 new followers",
    "Someone commented on your post",
    "54 people liked your post"
];

const notificationArea = document.getElementById('notification-area');
const notifications = notificationArea.children;
const header = document.querySelector('header');
const bellSVG = header.querySelector('svg');
const bellPath = bellSVG.querySelector('path');
const bellButton = document.getElementById('notifications');

header.addEventListener('click', (e) => {
    button = e.target;
    if (button === bellButton || button === bellSVG || button === bellPath) {
        notifDisplay();
        moveNotifWindow();
    }
});

function createNotification(notif) {
    const div = createElement('div', 'className', 'notification');
    const p = createElement('p', 'textContent', notif);
    const button = createElement('button', 'textContent', 'x');
    div.appendChild(p);
    div.appendChild(button);
    return div;
}

const divOffset = (divHeight) => {
    const totalOffset = divHeight / 2;
    return totalOffset;
}
function moveNotifWindow() {
    const divHeight = notificationArea.offsetHeight;
    const offset = divOffset(divHeight);
    const offsetStyle = `${offset}px`;
    notificationArea.style.transform = `translateY(${offsetStyle})`;
}

function getNotifications() {
    while (notifList.length > 0) {
        const notif = notifList.shift();
        const notification = createNotification(notif);
        notification.classList.add('hidden');
        notificationArea.appendChild(notification);
        moveNotifWindow();
    }
}
getNotifications();

function notifDisplay() {
    for (let i = 0; i < notifications.length; i++) {
        const notification = notifications[i];
        if (notification.classList.contains('show')) {
            notification.classList.remove('show');
            notification.classList.add('hidden');
        } else if (notification.classList.contains('hidden')) {
            notification.classList.remove('hidden');
            notification.classList.add('show');
        }
    }
}

notificationArea.addEventListener("click", (e) => {
    const button = e.target;
    if (button.tagName === 'BUTTON' && button.textContent === 'x') {
        const notification = button.parentNode;
        notification.parentNode.removeChild(notification);
        moveNotifWindow();
    }
});

// ===================================
//      User Message Functions
// ===================================

// Simulate message submit
// Display error when empty field
// Autocomplete search field


// ===================================
//      Settings Functions
// ===================================

// Save settings to local storage when save is clicked
// Reset settings when reset is clicked
// Make sure all settings are remembered when page is loaded