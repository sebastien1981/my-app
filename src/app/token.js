fetch("https://accounts.spotify.com/api/token", {
        method: 'POST',
        headers: new Headers({
          "Content-Type": "application/x-www-form-urlencoded",
        }),
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: 'bfbc3a1aeba940d3b2063be72412225f',
          client_secret: '6598b344399f41e18a863f43ecd9ec71',
        }),
      }).then(response => response.json()).then(response => console.log(response));
