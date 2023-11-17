fetch("https://accounts.spotify.com/api/token", {
        method: 'POST',
        headers: new Headers({
          "Content-Type": "application/x-www-form-urlencoded",
        }),
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: '',
          client_secret: '',
        }),
      }).then(response => response.json()).then(response => console.log(response));
