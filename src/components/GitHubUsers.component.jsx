import React, { useState, useEffect } from "react";

const url = "https://api.github.com/users";

const GitHubUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  //itt a fetch nem a .then() -el történik, hanem az async-await -el,hogy kiküszöböljük azt a hibát, hogy előbb akarunk az adathoz hozzáférni mielőtt megérkezett volna
  const getUsers = async () => {
    //isLoading state felel azért, hogy ha hiba van a fetch.elésben akkor ne egy alapértelmezett hibaüzenet jelenjen meg az oldalon hanem egy általunk készített.
    setIsLoading(true);
    setError(false);

    try {
      const respons = await fetch(url);
      console.log(respons);

      if (!respons.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await respons.json();
      console.log(data);

      //a fetch-elt adatot itt adom hozzá a useState-hez
      setUsers(data);

      //isLoading state-et false-ra kell rakni ha már megvan az adat
      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
      setError(true);
      setIsLoading(false);
    }
  };

  // üres [] szükséges, hogy csak egyszer fusson le az oldal betöltődésekor csak
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="--bg-primary --py2">
      <div className="container">
        <header>
          <h1 className="--text-center --text-light">GitHub Users</h1>
          <div className="--line"></div>
        </header>

        {isLoading && (
          <div className="--center-all --p">
            <h4 className="--text-light">Loading...</h4>
          </div>
        )}

        <div className="--grid-25 --py">
          {error ? (
            <h4 className="--text-light --text-center --my2">
              Something went wrong!
            </h4>
          ) : (
            users.map((item) => {
              // destruktúrálással kiszedem a users-ből propery-ket
              const { id, login, avatar_url, html_url } = item;

              return (
                <div key={id} className="--card --bg-light --p --flex-start">
                  <img
                    src={avatar_url}
                    alt="image"
                    className="--profile-img --mx"
                  />
                  <span>
                    <h4>{login}</h4>
                    <a href={html_url}>View Profile</a>
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default GitHubUsers;
