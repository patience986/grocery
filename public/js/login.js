document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Here you would typically send a request to your server to authenticate the user
    // For this example, we'll just log the values and show an alert
    console.log('Username:', username);
    console.log('Password:', password);

    alert('login successful.');

    // Redirect to dashboard (this is just for demonstration)
    // In a real application, you would only redirect after successful authentication
    window.location.href = 'dashboard.html';
});