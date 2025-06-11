import { useState } from 'react';
import './App.css';

function App() {
  // stato per ogni campo
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userSpecialization, setUserSpecialization] = useState("");
  const [userExperience, setUserExperience] = useState("");
  const [userDescription, setUserDescription] = useState("");

  // funzione di submit del form
  const submit = (e) => {
    e.preventDefault();

    // controllo che tutti i campi siano compilati
    if (
      !fullName ||
      !userName ||
      !userPassword ||
      !userSpecialization ||
      !userExperience ||
      !userDescription
    ) {
      alert("Compila tutti i campi");
      return;
    }

    // controllo che l'esperienza sia un numero positivo
    const experienceNumber = parseFloat(userExperience);
    if (isNaN(experienceNumber) || experienceNumber <= 0) {
      alert("Inserisci un numero positivo per gli anni di esperienza.");
      return;
    }

    // controllo che sia stata selezionata una specializzazione
    if (userSpecialization === "") {
      alert("Seleziona una specializzazione valida.");
      return;
    }

    // stampa dei dati
    console.log("I tuoi dati sono stati inviati", {
      fullName,
      userName,
      userPassword,
      userSpecialization,
      userExperience,
      userDescription,
    });
  };

  return (
    <div className="container">
      <h1>Form di Registrazione</h1>

      <form onSubmit={submit}>
        <div>
          <label>Nome completo</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div>
          <label>Username</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </div>

        <div>
          <label>Specializzazione</label>
          <select
            value={userSpecialization}
            onChange={(e) => setUserSpecialization(e.target.value)}
          >
            <option value="">-- Seleziona --</option>
            <option value="Full Stack">Full Stack</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
          </select>
        </div>

        <div>
          <label>Anni di esperienza</label>
          <input
            type="number"
            value={userExperience}
            onChange={(e) => setUserExperience(e.target.value)}
          />
        </div>

        <div>
          <label>Descrizione</label>
          <textarea
            value={userDescription}
            onChange={(e) => setUserDescription(e.target.value)}
          />
        </div>

        <button type="submit">Registrati</button>
      </form>
    </div>
  );
}

export default App;
