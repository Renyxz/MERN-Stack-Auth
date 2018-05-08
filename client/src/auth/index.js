export const login = (formData) => {
    
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: formData.get('email'),
            password: formData.get('password'),
          })
    })
    .then( res => {
        if(res.ok === true) {
            window.location = '/';
        }

        console.log(res.statusText);
    });

};

