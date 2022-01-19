const alertZone = document.getElementById('alert-area');
const newMembersSection = document.getElementById('new-members');
const memberList = newMembersSection.querySelector('.member-list');
const recentActivitySection = document.getElementById('new-members');
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

const createElement = (elementName, property = null, value = null) => {
    const element = document.createElement(elementName);
    element[property] = value;
    return element;
}

alertZone.addEventListener("click", (e) => {
    const button = e.target;
    const alert = button.parentNode;
    if (button.tagName === 'BUTTON' && button.textContent === 'x') {
        alert.parentNode.removeChild(alert);
    }
});

function createMemberCard(userName, picture, email, dateJoined) {
    const li = createElement('li', 'className', 'member-card');
    const img = createElement('img', 'className', 'user-pic');
    const user = createElement('span', 'textContent', userName)
    const emailAddress = createElement('a', 'textContent', email)
    img.setAttribute('src', picture);
    img.setAttribute('alt', `Profile picture of ${userName}`)
    const joinDate = createElement('span', 'textContent', dateJoined);
    li.appendChild(img);
    li.appendChild(user);
    li.appendChild(emailAddress);
    li.appendChild(joinDate)
    return li;
}

function populateNewMemberList() {
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        const userName = user.fullName;
        const picture = user.picture;
        const email = user.email;
        const dateJoined = user.dateJoined;
        const li = createMemberCard(userName, picture, email, dateJoined)
        memberList.appendChild(li);
    }
}

populateNewMemberList();

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
        button.className = 'active'
    }
});