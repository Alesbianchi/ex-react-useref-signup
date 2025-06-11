import { useState, useRef } from 'react';
import './App.css';

function App() {
  // campi CONTROLLATI
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userDescription, setUserDescription] = useState("");

  const [userNameError, setUserNameError] = useState("");
  const [userPasswordError, setUserPasswordError] = useState("");
  const [userDescriptionError, setUserDescriptionError] = useState("");

  // campi NON CONTROLLATI
  const fullNameRef = useRef();
  const specializationRef = useRef();
  const experienceRef = useRef();

  const letters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

  // VALIDAZIONI in tempo reale
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUserName(value);

    const valid = /^[a-zA-Z0-9]{6,}$/.test(value);
    setUserNameError(valid
      ? "Username valido."
      : "Username non valido: solo lettere e numeri, minimo 6 caratteri.");
  };

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

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setUserDescription(value);

    const trimmed = value.trim();
    setUserDescriptionError(trimmed.length >= 100 && trimmed.length <= 1000
      ? "Descrizione valida."
      : "La descrizione deve essere tra 100 e 1000 caratteri.");
  };

  const submit = (e) => {
    e.preventDefault();

    const fullName = fullNameRef.current.value.trim();
    const userSpecialization = specializationRef.current.value;
    const userExperience = experienceRef.current.value.trim();
    const experienceNumber = parseFloat(userExperience);

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
          <input type="text" ref={fullNameRef} />
        </div>

        <div>
          <label>Username</label>
          <input type="text" value={userName} onChange={handleUsernameChange} />
          <p className={userNameError.includes("non valido") ? "error" : "success"}>
            {userNameError}
          </p>
        </div>

        <div>
          <label>Password</label>
          <input type="password" value={userPassword} onChange={handlePasswordChange} />
          <p className={userPasswordError.includes("non valida") ? "error" : "success"}>
            {userPasswordError}
          </p>
        </div>

        <div>
          <label>Specializzazione</label>
          <select ref={specializationRef}>
            <option value="">-- Seleziona --</option>
            <option value="Full Stack">Full Stack</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
          </select>
        </div>

        <div>
          <label>Anni di esperienza</label>
          <input type="number" ref={experienceRef} />
        </div>

        <div>
          <label>Descrizione</label>
          <textarea value={userDescription} onChange={handleDescriptionChange} />
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
