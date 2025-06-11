import SignUpForm from "../components/Home/SignUpForm";
import LoginForm from "../components/Home/LoginForm";
import "./Home.css";

export default function Home() {
  return (
    <>
      <div className="home-titles">
        <h1 className="brainboy-title">BrainBoy</h1>
        <h1 className="advance-title">Advance</h1>
      </div>
      <div className="forms-container">
        <SignUpForm />
        <LoginForm />
      </div>
    </>
  );
}
