const initialState = {
    username: '',
    password: '',
  };
  
  const Login = ({loginUser, setCurrentUser}) => {
    const [formData, setFormData] = useState(initialState);
  
    const updateFormData = (e) => {
      const { name, value } = e.target;
      const changeFormData = { ...formData, [name]: value };
      setFormData(changeFormData);
    };
  
    return (
      <div>
        <h1>LOGIN PAGE</h1>
        <form onSubmit={(e) =>{
            e.preventDefault()
            loginUser(formData)
            setFormData(initialState)
            }
        }>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={updateFormData}
            name="username"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={updateFormData}
            name="password"
          />
        </div>
        <div>
          <button type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
  };
  
  export default Login;