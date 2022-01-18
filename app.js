const alertZone = document.getElementById('alert-area');

alertZone.addEventListener("click", (e) => {
    const button = e.target;
    const alert = button.parentNode;
    if (button.tagName === 'BUTTON' && button.textContent === 'x') {
        alert.parentNode.removeChild(alert);
        console.log(alert.parentNode);
    }
});