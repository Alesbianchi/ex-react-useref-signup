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

  const [userNameError, setUserNameError] = useState("");
  const [userPasswordError, setUserPasswordError] = useState("");
  const [userDescriptionError, setUserDescriptionError] = useState("");

  const letters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

  // Validazione username in tempo reale
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUserName(value);

    const valid = /^[a-zA-Z0-9]{6,}$/.test(value);
    if (!valid) {
      setUserNameError("Username non valido: solo lettere e numeri, minimo 6 caratteri.");
    } else {
      setUserNameError("Username valido.");
    }
  };

  // Validazione password in tempo reale
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setUserPassword(value);

    let hasLetter = false;
    let hasNumber = false;
    let hasSymbol = false;

    for (let char of value) {
      if (letters.includes(char.toLowerCase())) hasLetter = true;
      if (numbers.includes(char)) hasNumber = true;
      if (symbols.includes(char)) hasSymbol = true;
    }

    if (value.length >= 8 && hasLetter && hasNumber && hasSymbol) {
      setUserPasswordError("Password valida.");
    } else {
      setUserPasswordError("Password non valida: min. 8 caratteri, 1 lettera, 1 numero, 1 simbolo.");
    }
  };

  // Validazione descrizione in tempo reale
  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setUserDescription(value);

    const trimmed = value.trim();
    if (trimmed.length >= 100 && trimmed.length <= 1000) {
      setUserDescriptionError("Descrizione valida.");
    } else {
      setUserDescriptionError("La descrizione deve essere tra 100 e 1000 caratteri.");
    }
  };

  const submit = (e) => {
    e.preventDefault();

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

    const experienceNumber = parseFloat(userExperience);
    if (isNaN(experienceNumber) || experienceNumber <= 0) {
      alert("Inserisci un numero positivo per gli anni di esperienza.");
      return;
    }

    if (userSpecialization === "") {
      alert("Seleziona una specializzazione valida.");
      return;
    }

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
            onChange={handleUsernameChange}
          />
          <p className={userNameError.includes("non valido") ? "error" : "success"}>
            {userNameError}
          </p>
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={userPassword}
            onChange={handlePasswordChange}
          />
          <p className={userPasswordError.includes("non valida") ? "error" : "success"}>
            {userPasswordError}
          </p>
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
            onChange={handleDescriptionChange}

          />
          <p className={userDescriptionError.includes("valida") ? "success" : "error"}>
            {userDescriptionError}
          </p>
        </div>

        <button type="submit">Registrati</button>
      </form>
    </div>
  );
}

export default App;
