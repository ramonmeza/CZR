async function add_subscriber() {
    const email = document.getElementById('subscriber-email').value;
    const resp = await fetch('https://speoovq9o2.execute-api.us-east-1.amazonaws.com/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'email': email,
        })
    });

    console.log(resp);
}

async function remove_subscriber() {
    const email = document.getElementById('subscriber-email').value;
    const resp = await fetch('https://speoovq9o2.execute-api.us-east-1.amazonaws.com/subscribe', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'email': email
        })
    });
}


