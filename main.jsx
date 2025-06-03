const WeatherWidget = () => {
  const [weather, setWeather] = React.useState(null);

  React.useEffect(() => {
    fetch("https://samples.openweathermap.org/data/2.5/weather?q=London&appid=b1b15e88fa797225412429c1c50c122a1")
      .then(res => res.json())
      .then(data => setWeather(data))
      .catch(err => console.error("Помилка погоди:", err));
  }, []);

  if (!weather) return <div style={{ marginTop: 20 }}>Завантаження погоди...</div>;

  const temp = (weather.main.temp - 273.15).toFixed(1);
  const desc = weather.weather[0].description;
  const icon = weather.weather[0].icon;
  const iconUrl = "https://openweathermap.org/img/wn/${icon}@2x.png";

  return (
    <div style={{ marginTop: 20, padding: 10, border: "1px solid #ccc", borderRadius: 8 }}>
      <h3>Погода в {weather.name}</h3>
      <img src= {iconUrl} alt={desc} />
      <p><strong>Температура:</strong> {temp}°C</p>
      <p><strong> Опис:</strong> {desc}</p>
    </div>
  );
};


const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    const list = [];
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) list.push("Невірний email.");
    if (password.length < 8) list.push("Мінімум 8 символів.");
    if (!/[A-Z]/.test(password)) list.push("Потрібна велика літера.");
    if (!/[^A-Za-z0-9]/.test(password)) list.push("Потрібен спецсимвол.");
    if (/[а-яА-ЯіІїЇєЄ]/.test(password)) list.push("Кирилиця заборонена.");
    return list;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (errs.length) return setErrors(errs);

    setErrors([]);
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/form-api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      alert("Успішно!");
      console.log(data);
    } catch (err) {
      alert(" Сервер недоступний");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={{ width: 300, position: "relative" }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <img src="https://via.placeholder.com/300x120" alt="logo" />

        {errors.length > 0 && (
          <div style={{ background: "#FF6C55", color: "#fff", padding: 6, borderRadius: 4 }}>
            {errors.map((e, i) => <div key={i}>• {e}</div>)}
          </div>
        )}

        <label>Email:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />

        <label>Password:</label>
        <input type="password" value={password} onChange={e =>setPassword(e.target.value)} required />

        <a href="#">Forgot password?</a>

        <button type="submit" disabled={loading} style={{
          background: "#3FFF5A", color: "#fff", fontWeight: "bold", padding: "5px 10px",
          border: "none", borderRadius: 4, cursor: "pointer"
        }}>
          {loading ? "Зачекайте..." : "Submit"}
        </button>
      </form>

      {loading && (
        <div style={{
          position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
          background: "rgba(255,255,255,0.6)", display: "flex", justifyContent: "center", alignItems: "center"
        }}>
          <div style={{
            border: "5px solid #f3f3f3", borderTop: "5px solid #3FFF5A", borderRadius: "50%",
            width: 30, height: 30, animation: "spin 1s linear infinite"
          }} />
        </div>
      )}

      <WeatherWidget />
    </div>
  );
};
ReactDOM.createRoot(document.getElementById("root")).render(<LoginForm />);

//npm init -y
//npm install express cors
//node server.js