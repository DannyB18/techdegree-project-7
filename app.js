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
        const userName = user.fullName;
        const picture = user.picture;
        const email = user.email;
        const dateJoined = user.dateJoined;
        const li = createNewMemberCard(userName, picture, email, dateJoined);
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


function removeActive() {
    for (let i = 0; i < timeRange.children.length; i++) {
        const button = timeRange.children[i];
        button.removeAttribute('class');
    }
}

timeRange.addEventListener('click', (e) => {
    const button = e.target;
    if (button.tagName === 'BUTTON') {
        removeActive();
        button.className = 'active';
    }
});

const pendingNotifications = [
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
        showNotifications();
        for (let i = 0; i < notifications.length; i++) {
            const notification = notifications[i];
            console.log(notification);
            if (notification.style === "display: flex;") {
                notification.style = "display: none";
            }
        }
    }
});

header.addEventListener('click', (e) => {
    button = e.target;
    for (let i = 0; i < notifications.length; i++) {
        const notification = notifications[i];
        if (notification.style === "display: flex") {
            notification.style = "display: none";

        }
    }
});

// Finish Notifications
// Kick Notifications from array
// iterate and display none if button is clicked while shown

function classToBell(addRemove, className) {
    bellButton.classList[addRemove](`${className}`);
    bellSVG.classList[addRemove](`${className}`);
    bellPath.classList[addRemove](`${className}`);
}

function createNotification(notif) {
    const div = createElement('div', 'className', 'notification');
    const p = createElement('p', 'textContent', notif);
    const button = createElement('button', 'textContent', 'x');
    div.appendChild(p);
    div.appendChild(button);
    div.style = "display: none"
    return div;
}
function showNotifications() {
    for (let i = 0; i < pendingNotifications.length; i++) {
        const notif = createNotification(pendingNotifications[i]);
        notificationArea.appendChild(notif);
        notif.style = "display: flex";
        moveNotifWindow();
    }
}

function hideNotifications() {
    for (let i = 0; i < pendingNotifications.length; i++) {
        const notification = pendingNotifications[i];
        notification.style = "display: none";
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
